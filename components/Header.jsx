"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import constants from "@/data/constants.json";
import { useIntroReady } from "./Intro";

const { brand, nav } = constants;
const left = nav.slice(0, 2);
const right = nav.slice(2);

// Defined outside Header so it isn't re-created (and remounted) on every render
function NavLink({ n }) {
  return (
    <a href={n.href} className="group relative whitespace-nowrap py-1 text-sm font-semibold text-moss">
      {n.label}
      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

export default function Header() {
  const ready = useIntroReady();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll state
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the menu if the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled || open ? "bg-paper/85 shadow-card backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        {/* auto-width centre column keeps the logo from being squeezed on small screens */}
        <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 sm:h-20">
          {/* Left: hamburger (mobile) / nav (desktop) */}
          <div className="flex items-center">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-moss/20 text-moss md:hidden"
            >
              <Menu size={18} />
            </button>
            <nav className="hidden items-center gap-6 md:flex lg:gap-8">
              {left.map((n) => <NavLink key={n.href} n={n} />)}
            </nav>
          </div>

          {/* Centered logo */}
          <a href="#top" className="text-center">
            <span className="block font-display text-2xl italic leading-none text-moss sm:text-3xl">{brand.name}</span>
            <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.3em] text-terracotta sm:block">
              {brand.location}
            </span>
          </a>

          {/* Right: nav + CTA (desktop) */}
          <div className="flex items-center justify-end gap-6 lg:gap-8">
            <nav className="hidden items-center gap-6 md:flex lg:gap-8">
              {right.map((n) => <NavLink key={n.href} n={n} />)}
            </nav>
            <a href="#brief" className="btn-moss hidden px-5 py-2.5 lg:inline-flex">Plan my event</a>
          </div>
        </div>
      </motion.header>

      {/* Rendered outside <header>: a transformed / backdrop-filter parent would otherwise
          become the containing block and trap this "fixed" overlay inside the header bar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 overflow-y-auto bg-blush md:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-5 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-moss/30 text-moss sm:top-5"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              className="flex min-h-full flex-col justify-center gap-2 px-6 py-24 sm:px-8"
            >
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="border-b border-moss/15 py-3 font-display text-4xl italic text-moss sm:text-5xl"
                >
                  {n.label}
                </motion.a>
              ))}

              {/* CTA is hidden in the bar below lg, so surface it here */}
              <motion.a
                href="#brief"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + nav.length * 0.06 }}
                className="btn-moss mt-6 inline-flex w-full justify-center px-5 py-3"
              >
                Plan my event
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}