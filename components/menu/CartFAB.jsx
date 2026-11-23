"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function CartFAB() {
  const { count } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-5 z-50 bg-secondary text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center"
            aria-label="View Cart"
          >
            <HiOutlineShoppingBag size={24} />
            <span className="absolute -top-1 -right-1 bg-ink text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
              {count}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

     <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}