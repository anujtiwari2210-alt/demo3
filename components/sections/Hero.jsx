"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import content from "@/data/content.json";
import { EASE_LUXE, fadeUp, stagger } from "@/lib/motion";
import { useIntroReady } from "../Intro";
import Media from "../ui/Media";

const h = content.hero;

// Floating petals (fixed values: SSR/client mismatch na ho)
const PETALS = [
  { x: "8%", y: "18%", s: 28, d: 7, r: 25 }, { x: "46%", y: "10%", s: 20, d: 9, r: -30 },
  { x: "88%", y: "30%", s: 24, d: 8, r: 50 }, { x: "30%", y: "78%", s: 22, d: 10, r: -15 }, { x: "64%", y: "86%", s: 30, d: 6, r: 70 },
];

export default function Hero() {
  const ready = useIntroReady();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const archY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-gradient-to-b from-blush/60 via-paper to-paper pb-16 pt-32 md:pt-36">
      {PETALS.map((p, i) => (
        <motion.svg key={i} viewBox="0 0 24 24" className="pointer-events-none absolute text-rose/60" style={{ left: p.x, top: p.y, width: p.s, height: p.s, rotate: p.r }}
          animate={{ y: [0, -22, 0], rotate: [p.r, p.r + 25, p.r] }} transition={{ repeat: Infinity, duration: p.d, ease: "easeInOut" }}>
          <path d="M12 2C6 8 4 14 12 22c8-8 6-14 0-20z" fill="currentColor" />
        </motion.svg>
      ))}

      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <motion.div variants={stagger(0.14, 0.1)} initial="hidden" animate={ready ? "show" : "hidden"} className="relative z-10 lg:col-span-7">
          <motion.span variants={fadeUp} className="eyebrow mb-6">{h.eyebrow}</motion.span>
          <motion.h1 variants={fadeUp} className="font-display text-mega text-moss">
            {h.line1} <br /><span className="italic text-terracotta">{h.accent}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg text-ink/70">{h.subtitle}</motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href="#brief" className="btn-moss">{h.primaryCta}</a>
            <a href="#palettes" className="btn-line">{h.secondaryCta}</a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-3">
            <div className="flex text-terracotta">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
            <span className="text-sm font-semibold text-moss">{h.trust}</span>
          </motion.div>
        </motion.div>

        {/* Arch-framed video */}
        <motion.div style={{ y: archY }} className="relative mx-auto w-full max-w-md lg:col-span-5">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, delay: 0.2, ease: EASE_LUXE }} className="relative">
            <div className="absolute -inset-3 rounded-t-full border border-terracotta/40" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-blush shadow-soft">
              <Media src={h.poster} alt={h.eyebrow} className="h-full w-full" priority />
            </div>

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -left-6 top-1/3 hidden rotate-[-6deg] rounded-2xl bg-paper px-5 py-4 shadow-card sm:block">
              <p className="text-[10px] font-bold uppercase tracking-widest text-terracotta">{h.sticker.title}</p>
              <p className="font-display text-xl text-moss">{h.sticker.text}</p>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -right-4 bottom-12 rotate-[5deg] rounded-2xl bg-moss px-5 py-4 text-paper shadow-card">
              <p className="text-[10px] font-bold uppercase tracking-widest text-rose">{h.dateCard.label}</p>
              <p className="font-display text-lg">{h.dateCard.value}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
