"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import QuantityStepper from "./QuantityStepper";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function MenuDetailModal({ product, onClose }) {
  const { add, qtyOf, setQty } = useCart();
  const currentQty = product ? qtyOf(product._id) : 0;

  // Lock body scroll and close on Escape
  useEffect(() => {
    if (!product) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-card shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="relative h-64 w-full bg-accent-50 shrink-0">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 512px"
                className="object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white shadow"
                aria-label="Close details"
              >
                <HiX size={18} />
              </button>
              <div className="absolute top-3 left-3">
                <Badge tone="pink">{product.category}</Badge>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-2xl font-bold text-ink">
                  {product.title}
                </h2>
                <span className="text-secondary text-xl font-bold whitespace-nowrap">
                  {formatPrice(product.price)}
                </span>
              </div>
              <p className="mt-3 text-ink-soft whitespace-pre-wrap">
                {product.description}
              </p>

              <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-100 pt-6">
                {currentQty > 0 ? (
                  <QuantityStepper
                    value={currentQty}
                    onChange={(q) => setQty(product._id, q)}
                    size="md"
                  />
                ) : (
                  <span className="text-sm text-ink-muted">Not in your order yet</span>
                )}
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    add(product, 1);
                    onClose();
                  }}
                >
                  {currentQty > 0 ? "Add Another" : "Add to Order"}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}