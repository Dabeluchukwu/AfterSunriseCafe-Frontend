"use client";

import Image from "next/image";
import { HiPlus } from "react-icons/hi";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function MenuCard({ product, onOpen }) {
  const { add, qtyOf } = useCart();
  const qty = qtyOf(product._id);

  const handleAdd = (e) => {
    e.stopPropagation(); // prevent opening the modal
    add(product, 1);
  };

  return (
    <div
      onClick={() => onOpen(product)}
      className="group cursor-pointer bg-white rounded-card overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col"
    >
      <div className="relative h-52 w-full overflow-hidden bg-accent-50">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge tone="pink">{product.category}</Badge>
        </div>
        {qty > 0 && (
          <div className="absolute top-3 right-3 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded-pill shadow">
            {qty} in order
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink">
            {product.title}
          </h3>
          <span className="text-secondary font-semibold whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="mt-2 text-sm text-ink-muted line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-secondary-600"
          >
            <HiPlus size={16} /> Add to order
          </button>
        </div>
      </div>
    </div>
  );
}