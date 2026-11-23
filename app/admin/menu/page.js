"use client";

import { useEffect, useState } from "react";
import {
  HiOutlinePlusCircle,
  HiOutlineViewGrid,
  HiOutlineTag,
} from "react-icons/hi";
import toast from "react-hot-toast";
import Topbar from "@/components/admin/Topbar";
import ProductRow from "@/components/admin/ProductRow";
import RenameCategoryDialog from "@/components/admin/RenameCategoryDialog";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import api from "@/lib/api";

export default function AdminMenuPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [renameOpen, setRenameOpen] = useState(false);

  // --- New state for custom delete dialog ---
  const [productToDelete, setProductToDelete] = useState(null);

  const load = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get("/products"),
        api.get("/products/categories"),
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const executeDelete = async () => {
    if (!productToDelete) return;
    setDeletingId(productToDelete._id);
    try {
      await api.delete(`/products/${productToDelete._id}`);
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
      toast.success("Product deleted");
      // Refresh categories in case that was the last item in its category
      const { data } = await api.get("/products/categories");
      setCategories(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
      setProductToDelete(null);
    }
  };

  return (
    <>
      <div>
        <Topbar title="Menu" />
        <div className="p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-ink-muted">
                {products.length} item{products.length === 1 ? "" : "s"} in{" "}
                {categories.length} categor{categories.length === 1 ? "y" : "ies"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setRenameOpen(true)}
                disabled={categories.length === 0}
              >
                <HiOutlineTag /> Rename Category
              </Button>
              <Button href="/admin/menu/new" variant="primary" size="sm">
                <HiOutlinePlusCircle /> Add Item
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Spinner size={36} />
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-card border border-gray-100">
              <EmptyState
                icon={HiOutlineViewGrid}
                title="No menu items yet"
                description="Start by adding your first product."
                action={
                  <Button href="/admin/menu/new" variant="primary">
                    <HiOutlinePlusCircle /> Add Item
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="bg-white rounded-card border border-gray-100 p-2">
              <div className="divide-y divide-gray-100">
                {products.map((p) => (
                  <ProductRow
                    key={p._id}
                    product={p}
                    // We no longer call onDelete directly; we set the product to delete
                    onDelete={(prod) => setProductToDelete(prod)}
                    deleting={deletingId === p._id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <RenameCategoryDialog
          open={renameOpen}
          onClose={() => setRenameOpen(false)}
          categories={categories}
          onRenamed={load}
        />
      </div>

      <ConfirmDialog
        open={!!productToDelete}
        title={`Delete "${productToDelete?.title}"?`}
        description="This will permanently remove the item and its image. This action cannot be undone."
        confirmText="Yes, delete"
        onConfirm={executeDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </>
  );
}