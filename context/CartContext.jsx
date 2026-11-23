"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "bakery_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ _id, title, price, imageUrl, qty }]
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* corrupt data — ignore */
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after initial hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full / disabled — ignore */
    }
  }, [items, hydrated]);

  const add = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          _id: product._id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          qty,
        },
      ];
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i._id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, qty } : i))
    );
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const qtyOf = (id) => items.find((i) => i._id === id)?.qty || 0;

  return (
    <CartContext.Provider
      value={{ items, add, setQty, remove, clear, count, total, qtyOf }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};