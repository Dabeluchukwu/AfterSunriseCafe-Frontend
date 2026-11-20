import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/format";

export default function MenuCard({ product }) {
  return (
    <article className="group bg-white rounded-card overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
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
      </div>
      <div className="p-5">
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
      </div>
    </article>
  );
}