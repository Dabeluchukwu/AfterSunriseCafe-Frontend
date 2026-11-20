"use client";

import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/format";

export default function ProductRow({ product, onDelete, deleting }) {
  return (
    <div className="flex items-center gap-4 py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-accent-50 shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-ink truncate">{product.title}</div>
        <div className="text-sm text-ink-muted truncate">
          {product.description}
        </div>
      </div>
      <div className="hidden sm:block">
        <Badge tone="pink">{product.category}</Badge>
      </div>
      <div className="hidden sm:block text-secondary font-semibold whitespace-nowrap">
        {formatPrice(product.price)}
      </div>
      <button
        onClick={() => onDelete(product)}
        disabled={deleting}
        className="p-2 text-ink-muted hover:text-secondary hover:bg-secondary-50 rounded-lg transition-colors disabled:opacity-50"
        aria-label={`Delete ${product.title}`}
      >
        <HiOutlineTrash size={18} />
      </button>
    </div>
  );
}