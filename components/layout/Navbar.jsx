"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { NAV_LINKS, PHONE_LINK, WHATSAPP_LINK, CONTACT } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold text-secondary">
              After Sunrise
            </span>
            <span className="hidden sm:inline text-sm text-ink-muted">Café</span>
          </Link>
 
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  pathname === l.href ? "text-secondary" : "text-ink-soft"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={PHONE_LINK}
              className="text-sm font-medium text-ink-soft hover:text-secondary"
            >
              {CONTACT.phoneDisplay}
            </a>
            {isAuthenticated && (
              <Button href="/admin" variant="ghost" size="sm">
                Dashboard
              </Button>
            )}
            <Button href={WHATSAPP_LINK} variant="primary" size="sm">
              Order Now
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-ink"
            aria-label="Toggle menu"
          >
            {open ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-2 text-base font-medium ${
                    pathname === l.href ? "text-secondary" : "text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="py-2 text-base font-medium text-secondary"
                >
                  Dashboard
                </Link>
              )}
              <Button href={WHATSAPP_LINK} variant="primary" className="mt-2">
                Order Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}