"use client";

import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Topbar from "@/components/admin/Topbar";
import ProductForm from "@/components/admin/ProductForm";

export default function AddProductPage() {
  return (
    <div>
      <Topbar title="Add Menu Item" />
      <div className="p-6">
        <Link
          href="/admin/menu"
          className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-secondary mb-4"
        >
          <HiOutlineArrowLeft size={14} /> Back to Menu
        </Link>
        <div className="bg-white rounded-card border border-gray-100 p-6">
          <ProductForm />
        </div>
      </div>
    </div>
  );
}