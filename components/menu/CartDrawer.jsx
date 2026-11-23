"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiOutlineTrash } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import QuantityStepper from "./QuantityStepper";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { buildOrderUrl } from "@/lib/whatsappOrder";

export default function CartDrawer({ isOpen, onClose }) {
  const { items, count, total, setQty, clear } = useCart();
  const [name, setName] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  // Load saved name
  useEffect(() => {
    setName(localStorage.getItem("bakery_customer_name") || "");
  }, []);

  const onNameChange = (e) => {
    setName(e.target.value);
    localStorage.setItem("bakery_customer_name", e.target.value);
  };

  const handleOrder = () => {
    if (count === 0) return;
    const url = buildOrderUrl(items, name);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleClear = () => {
    clear();
    setConfirmClear(false);
    onClose(); 
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 bg-white rounded-card shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50 shrink-0">
                <h2 className="font-display text-lg font-bold text-ink">
                  Your Order ({count})
                </h2>
                <div className="flex items-center gap-1">
                  {count > 0 && (
                    <button
                      onClick={() => setConfirmClear(true)}
                      className="p-2 text-ink-muted hover:text-secondary transition-colors"
                      title="Clear cart"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 text-ink-muted hover:text-ink transition-colors"
                  >
                    <HiX size={20} />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {count === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-ink-muted">Your order is empty.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-accent-50 shrink-0 border border-gray-100">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="64px"
                          loading="eager"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-ink text-sm truncate">
                          {item.title}
                        </div>
                        <div className="text-xs text-secondary font-semibold mt-0.5">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                      <QuantityStepper
                        value={item.qty}
                        onChange={(q) => setQty(item._id, q)}
                      />
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Checkout */}
              {count > 0 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-ink-soft font-medium">Total</span>
                    <span className="text-xl font-bold text-ink">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-soft mb-1">
                      Your Name (optional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={onNameChange}
                      placeholder="e.g. John Doe"
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-ink text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition"
                    />
                  </div>

                  <Button
                    onClick={handleOrder}
                    className="w-full bg-[#25D366] hover:bg-[#1fbe5b] text-white border-none"
                  >
                    <FaWhatsapp size={18} /> Order on WhatsApp
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={confirmClear}
        title="Clear your order?"
        description="This will remove all items from your cart."
        confirmText="Yes, clear"
        onConfirm={handleClear}
        onCancel={() => setConfirmClear(false)}
      />
    </>
  );
}