"use client";

import { useState, useEffect, useRef } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "@/components/ui/FadeUp";

const TESTIMONIALS = [
  {
    name: "Chubi",
    role: "Onitsha, Anambra state.",
    text: "Your samosas are divine.",
  },
  {
    name: "Danny",
    role: "Ago, Lagos State.",
    text: "Got small chops for my mother and she absolutely loved it.",
  },
  {
    name: "Chinny",
    role: "Igbariam, Anambra state.",
    text: "I just found my pastry spot. You’ve earned yourself a customer.",
  },
  {
    name: "Mmesoma E.",
    role: "Awka Anambra State.",
    text: "I love it.",
  },
  {
    name: "Jennifer S.",
    role: "Oshodi, Lagos state.",
    text: "I ordered the puff puff fusion and I love it.",
  },
];

// Helper to determine how many cards to show based on screen width
// (We use a simple state approach to avoid hydration mismatch errors)
function useCardsPerView() {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 768) setPerView(2);
      else setPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return perView;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardsPerView = useCardsPerView();
  const maxIndex = Math.max(0, TESTIMONIALS.length - cardsPerView);

  // Auto-play logic
   // Auto-play logic
  useEffect(() => {
    if (isHovered || maxIndex === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        // If we've reached the end, loop back to 0
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [isHovered, maxIndex]); 
 

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="py-24 bg-accent-50 relative overflow-hidden">
      {/* Background Blur Blobs for the Glass effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-300/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-2">
            What our customers say
          </h2>
          <p className="mt-3 text-ink-muted">
            Real reviews from real pastry lovers.
          </p>
        </FadeUp>

        {/* Carousel Container */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Carousel Window */}
          <div className="overflow-hidden px-2 py-4">
            <motion.div
              className="flex gap-6"
              animate={{ x: `calc(-${currentIndex * (100 / cardsPerView)}% - ${currentIndex * (24 / cardsPerView)}px)` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] h-full"
                >
                  {/* Glassmorphic Card */}
                  <div className="h-full bg-white/70 backdrop-blur-lg rounded-card p-8 border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col transition-transform hover:-translate-y-1">
                    <FaQuoteLeft className="text-accent/80 mb-5" size={28} />
                    <p className="text-lg text-ink-soft flex-1 leading-relaxed">
                      "{t.text}"
                    </p>
                    <div className="mt-6 flex items-center gap-1 text-secondary">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <FaStar key={k} size={16} />
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-display font-semibold text-ink text-base">
                          {t.name}
                        </div>
                        <div className="text-sm text-ink-muted">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shadow-sm border border-gray-100 hover:bg-secondary hover:text-white hover:border-secondary transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-ink disabled:hover:border-gray-100"
            >
              <HiChevronLeft size={24} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === i
                      ? "w-8 bg-secondary"
                      : "w-2.5 bg-ink-muted/30 hover:bg-ink-muted/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={currentIndex === maxIndex}
              className="w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shadow-sm border border-gray-100 hover:bg-secondary hover:text-white hover:border-secondary transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-ink disabled:hover:border-gray-100"
            >
              <HiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}