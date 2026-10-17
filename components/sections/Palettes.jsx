"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";
import Media from "../ui/Media";

const p = content.palettes;

/** Palette picker: choose karte hi poora preview card us palette ke rang me badal jata hai */
export default function Palettes() {
  const [i, setI] = useState(0);
  const cur = p.items[i];
  const use = () => window.dispatchEvent(new CustomEvent("dw:palette", { detail: cur.name }));

  return (
    <section id="palettes" className="section-y container-x">
      <Reveal className="mb-12 max-w-2xl">
        <span className="eyebrow">{p.eyebrow}</span>
        <h2 className="mt-4 font-display text-display text-moss">{p.title}</h2>
        <p className="mt-4 text-ink/70">{p.text}</p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-4">
          {p.items.map((it, idx) => (
            <button key={it.name} onClick={() => setI(idx)}
              className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all ${idx === i ? "border-moss bg-white shadow-card" : "border-moss/10 hover:border-moss/40"}`}>
              <div>
                <p className="font-display text-2xl text-moss">{it.name}</p>
                <p className="text-sm text-ink/60">{it.mood}</p>
              </div>
              <div className="flex -space-x-2">
                {it.colors.map((c) => <span key={c} className="h-8 w-8 rounded-full border-2 border-paper" style={{ background: c }} />)}
              </div>
            </button>
          ))}
        </div>

        <motion.div animate={{ backgroundColor: cur.bg, color: cur.text }} transition={{ duration: 0.7 }}
          className="grid items-center gap-8 overflow-hidden rounded-[2rem] p-6 md:grid-cols-2 md:p-10 lg:col-span-8">
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={cur.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
                <p className="text-xs font-bold uppercase tracking-[0.22em] opacity-70">{p.idealLabel}</p>
                <p className="mt-1 font-display text-5xl italic">{cur.mood}</p>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] opacity-70">{p.flowersLabel}</p>
                <p className="mt-1 text-lg">{cur.flowers}</p>
                <div className="mt-6 flex gap-2">{cur.colors.map((c) => <span key={c} className="h-10 flex-1 rounded-xl border border-black/10" style={{ background: c }} />)}</div>
              </motion.div>
            </AnimatePresence>
            <a href="#brief" onClick={use} className="mt-8 inline-flex rounded-full bg-black/80 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black">{p.cta}</a>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs">
            <AnimatePresence mode="popLayout">
              <motion.div key={cur.name} className="absolute inset-0" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                <Media src={cur.image} alt={cur.name} className="h-full w-full rounded-t-full shadow-soft" sizes="(min-width:768px) 25vw, 80vw" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
