"use client"; // Add this at the top

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import FadeUp from "@/components/ui/FadeUp";
import MenuCard from "@/components/menu/MenuCard";
import MenuDetailModal from "@/components/menu/MenuDetailModal";
import EmptyState from "@/components/ui/EmptyState";
import { HiCake } from "react-icons/hi";
import api from "@/lib/api";

export default function MenuPreview() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.slice(0, 6));
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Our Menu
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-2">
            A taste of what we make
          </h2>
          <p className="mt-3 text-ink-muted">
            From breakfast loaves to celebration cakes — everything is made
            fresh, every day.
          </p>
        </FadeUp>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="text-ink-muted">Loading...</span>
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon={HiCake}
            title="Menu coming soon"
            description="We're just setting up our online menu. Check back shortly!"
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <FadeUp key={p._id} delay={i * 0.06}>
                <MenuCard product={p} onOpen={setDetail} />
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

      <MenuDetailModal product={detail} onClose={() => setDetail(null)} />
    </section>
  );
}