"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";
import Media from "../ui/Media";

const g = content.gallery;
const RATIO = { tall: "aspect-[3/4]", square: "aspect-square", wide: "aspect-[4/3]" };

/** Masonry grid + full-screen lightbox (arrow keys / Esc support) */
export default function Gallery() {
  const [idx, setIdx] = useState(null);
  const n = g.items.length;
  const go = useCallback((d) => setIdx((i) => (i + d + n) % n), [n]);

  useEffect(() => {
    if (idx === null) return;
    const key = (e) => { if (e.key === "Escape") setIdx(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [idx, go]);

  const cur = idx !== null ? g.items[idx] : null;

  return (
    <section id="gallery" className="section-y bg-bone">
      <div className="container-x">
        <Reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><span className="eyebrow">{g.eyebrow}</span><h2 className="mt-4 font-display text-display text-moss">{g.title}</h2></div>
          <span className="text-sm font-semibold text-moss/60">{g.hint}</span>
        </Reveal>

        <div className="columns-2 gap-4 md:columns-3 md:gap-6">
          {g.items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid md:mb-6">
              <button onClick={() => setIdx(i)} className="group relative block w-full overflow-hidden rounded-3xl text-left">
                <Media src={it.image} alt={it.title} className={`w-full ${RATIO[it.ratio]}`} imgClassName="transition-transform duration-[1200ms] group-hover:scale-110" sizes="(min-width:768px) 33vw, 50vw" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div><span className="text-[10px] font-bold uppercase tracking-widest text-rose">{it.tag}</span><p className="font-display text-xl text-paper">{it.title}</p></div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIdx(null)}
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-forest/95 p-4 backdrop-blur-sm">
            <button onClick={() => setIdx(null)} aria-label="Close" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 text-paper hover:bg-paper/20"><X size={20} /></button>
            <AnimatePresence mode="wait">
              <motion.div key={idx} onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}
                className="relative h-[70vh] w-full max-w-4xl overflow-hidden rounded-3xl">
                <Media src={cur.image} alt={cur.title} className="h-full w-full" imgClassName="!object-contain" sizes="90vw" />
              </motion.div>
            </AnimatePresence>
            <div onClick={(e) => e.stopPropagation()} className="mt-5 flex w-full max-w-4xl items-center justify-between text-paper">
              <div><span className="text-xs font-bold uppercase tracking-widest text-rose">{cur.tag}</span><p className="font-display text-2xl">{cur.title}</p></div>
              <div className="flex gap-2">
                <button onClick={() => go(-1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 hover:bg-paper/20"><ArrowLeft size={18} /></button>
                <button onClick={() => go(1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 hover:bg-paper/20"><ArrowRight size={18} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
