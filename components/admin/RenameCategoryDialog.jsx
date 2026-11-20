"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import api from "@/lib/api";

export default function RenameCategoryDialog({ open, onClose, categories, onRenamed }) {
  const [oldCategory, setOldCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!oldCategory || !newCategory) {
      toast.error("Pick the old and enter the new category");
      return;
    }
    if (oldCategory === newCategory) {
      toast.error("New category must be different");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await api.put("/products/categories/rename", {
        oldCategory,
        newCategory,
      });
      toast.success(data.message);
      onRenamed?.();
      onClose();
      setOldCategory("");
      setNewCategory("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Rename failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink/50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-card shadow-lg w-full max-w-md p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  Rename a category
                </h3>
                <p className="text-sm text-ink-muted mt-1">
                  This will update every product in the chosen category.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-ink-muted hover:text-ink p-1"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">
                  Old category
                </label>
                <select
                  value={oldCategory}
                  onChange={(e) => setOldCategory(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-ink focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                >
                  <option value="">Select a category...</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g. Cakes"
              />

              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? "Renaming..." : "Rename"}
                </Button>
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}