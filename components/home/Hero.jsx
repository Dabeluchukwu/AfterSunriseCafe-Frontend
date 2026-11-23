"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src="/hero-bread.jpg"
        alt="Fresh bread and pastries at After Sunrise Bakery"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/80 to-transparent" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-block bg-accent-100 text-secondary text-sm font-medium px-3 py-1 rounded-pill mb-5">
            Made fresh daily Since 2024
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Freshly baked,
            <br />
            <span className="text-accent">just for you.</span>
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-xl">
            Artisan breads, deserts cakes, savory and sweet pastries, and cookies — made every
            morning with real ingredients and a whole lot of love.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/menu" variant="primary" size="lg">
              Explore Menu <HiArrowRight />
            </Button>
            <Button
              href={WHATSAPP_LINK}
              variant="secondary"
              size="lg"
              className="bg-white/10 border-white text-white hover:bg-white/20"
            >
              <FaWhatsapp /> Order on WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
