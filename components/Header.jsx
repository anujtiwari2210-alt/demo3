"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import constants from "@/data/constants.json";
import { useIntroReady } from "./Intro";

const { brand, nav } = constants;
const left = nav.slice(0, 2);
const right = nav.slice(2);

export default function Header() {
  const ready = useIntroReady();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const Link = ({ n }) => (
    <a href={n.href} className="group relative py-1 text-sm font-semibold text-moss">
      {n.label}
      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-paper/85 shadow-card backdrop-blur-lg" : "bg-transparent"}`}
    >
      <div className="container-x grid h-20 grid-cols-3 items-center">
        <nav className="hidden items-center gap-8 md:flex">{left.map((n) => <Link key={n.href} n={n} />)}</nav>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-full border border-moss/20 md:hidden"><Menu size={18} /></button>

        {/* Centered logo */}
        <a href="#top" className="justify-self-center text-center">
          <span className="block font-display text-3xl italic leading-none text-moss">{brand.name}</span>
          <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.3em] text-terracotta sm:block">{brand.location}</span>
        </a>

        <div className="flex items-center justify-end gap-8">
          <nav className="hidden items-center gap-8 md:flex">{right.map((n) => <Link key={n.href} n={n} />)}</nav>
          <a href="#brief" className="btn-moss hidden px-5 py-2.5 lg:inline-flex">Plan my event</a>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-blush md:hidden">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-moss/30"><X size={18} /></button>
            <motion.div initial={{ y: 40 }} animate={{ y: 0 }} className="flex h-full flex-col justify-center gap-2 px-8">
              {nav.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
                  className="border-b border-moss/15 py-3 font-display text-5xl italic text-moss">{n.label}</motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
