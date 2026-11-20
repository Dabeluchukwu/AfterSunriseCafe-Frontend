"use client";

import { useEffect, useState } from "react";
import { HiCake } from "react-icons/hi";
import MenuCard from "./MenuCard";
import CategoryFilter from "./CategoryFilter";
import FadeUp from "@/components/ui/FadeUp";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import api from "@/lib/api";

export default function MenuGrid() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(true);

  // Load all products + categories once
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get("/products"),
          api.get("/products/categories"),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch {
        // swallow — empty state handles it
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = active
    ? products.filter((p) => p.category === active)
    : products;

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size={36} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={HiCake}
        title="Our menu is being prepared"
        description="Fresh items are on the way — check back soon!"
      />
    );
  }

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-10">
          <CategoryFilter
            categories={categories}
            active={active}
            onChange={setActive}
          />
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <FadeUp key={p._id} delay={i * 0.04}>
            <MenuCard product={p} />
          </FadeUp>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-ink-muted py-12">
          No items in this category yet.
        </p>
      )}
    </div>
  );
}