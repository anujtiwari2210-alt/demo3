"use client";

import { motion } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";

/** Scroll karne par smoothly fade-up hone wala wrapper */
export default function Reveal({ children, delay = 0, y = 32, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE_LUXE }}
    >
      {children}
    </motion.div>
  );
}
