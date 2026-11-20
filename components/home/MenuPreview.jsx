import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import FadeUp from "@/components/ui/FadeUp";
import MenuCard from "@/components/menu/MenuCard";
import EmptyState from "@/components/ui/EmptyState";
import { HiCake } from "react-icons/hi";
import { api } from "@/lib/api";

async function getProducts() {
  try {
    const { data } = await api.get("/products");
    return data.slice(0, 6);
  } catch {
    return [];
  }
}

export default async function MenuPreview() {
  const products = await getProducts();

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Our Menu
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-2">
            A taste of what we bake
          </h2>
          <p className="mt-3 text-ink-muted">
            From breakfast loaves to celebration cakes — everything is made
            fresh, every day.
          </p>
        </FadeUp>

        {products.length === 0 ? (
          <EmptyState
            icon={HiCake}
            title="Menu coming soon"
            description="We're just setting up our online menu. Check back shortly!"
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <FadeUp key={p._id} delay={i * 0.06}>
                <MenuCard product={p} />
              </FadeUp>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-secondary font-medium hover:gap-3 transition-all"
          >
            See full menu <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}