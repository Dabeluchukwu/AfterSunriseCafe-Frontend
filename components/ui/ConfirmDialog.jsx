"use client";

import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDanger = true,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // CHANGED z-[100] TO z-[10000]
          className="fixed inset-0 z-[10000] bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-card shadow-2xl w-full max-w-sm p-6 text-center"
          >
            <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isDanger ? "bg-secondary-50 text-secondary" : "bg-accent-50 text-accent-500"}`}>
              <HiOutlineExclamationCircle size={28} />
            </div>
            <h3 className="font-display text-xl font-bold text-ink mb-2">{title}</h3>
            <p className="text-sm text-ink-muted mb-6">{description}</p>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={onCancel} className="flex-1 border border-gray-200">
                {cancelText}
              </Button>
              <Button variant="primary" onClick={onConfirm} className="flex-1">
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}