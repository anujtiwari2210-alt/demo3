"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";

const f = content.faq;

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-y container-x">
      <Reveal className="mb-10 text-center">
        <span className="eyebrow">{f.eyebrow}</span>
        <h2 className="mt-4 font-display text-display text-moss">{f.title}</h2>
      </Reveal>
      <Reveal className="mx-auto max-w-3xl">
        {f.items.map((it, i) => (
          <div key={it.q} className="border-b border-moss/15">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
              <span className={`font-display text-2xl transition-colors md:text-3xl ${open === i ? "text-terracotta" : "text-moss"}`}>{it.q}</span>
              <motion.span animate={{ rotate: open === i ? 135 : 0 }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush text-moss"><Plus size={18} /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <p className="pb-6 text-ink/70">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
