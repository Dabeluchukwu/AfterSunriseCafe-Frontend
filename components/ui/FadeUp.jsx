"use client";

import { motion } from "framer-motion";

export default function FadeUp({
  children,
  delay = 0,
  className = "",
  as = "div",
  amount = 0.2,
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}