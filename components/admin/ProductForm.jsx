"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlinePhotograph, HiOutlineX } from "react-icons/hi";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import api from "@/lib/api";

export default function ProductForm({ initial = null }) {
  const router = useRouter();
  const isEditing = Boolean(initial?._id);

  const [form, setForm] = useState({
    title: initial?.title || "",
    category: initial?.category || "",
    description: initial?.description || "",
    price: initial?.price ?? "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.imageUrl || "");
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing categories to populate the datalist
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/products/categories");
        setCategories(data);
      } catch {
        /* silent */
      }
    };
    load();
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const clearFile = () => {
    setFile(null);
    setPreview(initial?.imageUrl || "");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!form.title || !form.category || !form.description || form.price === "") {
      toast.error("Please fill in all fields");
      return;
    }
    if (!isEditing && !file) {
      toast.error("Please select an image");
      return;
    }

    const data = new FormData();
    data.append("title", form.title.trim());
    data.append("category", form.category.trim());
    data.append("description", form.description.trim());
    data.append("price", String(form.price));
    if (file) data.append("image", file);

    setSubmitting(true);
    try {
      if (isEditing) {
        await api.put(`/products/${initial._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated");
      } else {
        await api.post("/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product added");
      }
      router.push("/admin/menu");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      {/* Image upload */}
      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Image {!isEditing && "*"}
        </label>

        {preview ? (
          <div className="relative w-full aspect-[3/2] max-w-md rounded-card overflow-hidden bg-accent-50 border border-gray-100">
            <Image
              src={preview}
              alt="Preview"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              unoptimized={preview.startsWith("blob:")}
            />
            <button
              type="button"
              onClick={clearFile}
              className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white shadow"
              aria-label="Remove image"
            >
              <HiOutlineX size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full aspect-[3/2] max-w-md rounded-card border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:border-secondary hover:bg-secondary-50/30 transition-colors">
            <HiOutlinePhotograph size={36} className="text-ink-muted mb-2" />
            <span className="text-sm text-ink-soft font-medium">
              Click to upload image
            </span>
            <span className="text-xs text-ink-muted mt-1">PNG, JPG up to 5MB</span>
            <input
              type="file"
              accept="image/*"
              onChange={onFile}
              className="hidden"
            />
          </label>
        )}

        {preview && (
          <div className="mt-2">
            <label className="text-sm text-secondary cursor-pointer hover:underline">
              Change image
              <input
                type="file"
                accept="image/*"
                onChange={onFile}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      <Input
        label="Title *"
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="e.g. Chocolate Fudge Cake"
        required
      />

      {/* Free-text category with datalist suggestions */}
      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Category *
        </label>
        <input
          list="category-suggestions"
          name="category"
          value={form.category}
          onChange={onChange}
          placeholder="Type or pick a category (e.g. Cakes)"
          required
          className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition"
        />
        <datalist id="category-suggestions">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <p className="mt-1 text-xs text-ink-muted">
          New categories are created automatically when you type them.
        </p>
      </div>

      <Input
        label="Price (₦) *"
        name="price"
        type="number"
        min="0"
        step="1"
        value={form.price}
        onChange={onChange}
        placeholder="e.g. 15000"
        required
      />

      <Textarea
        label="Description *"
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="A short description customers will see..."
        rows={4}
        required
      />

      <div className="flex gap-2 pt-2">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting
            ? isEditing
              ? "Saving..."
              : "Adding..."
            : isEditing
              ? "Save Changes"
              : "Add Product"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/admin/menu")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}