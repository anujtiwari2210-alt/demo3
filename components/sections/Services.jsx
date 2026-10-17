"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";
import Media from "../ui/Media";

const s = content.services;

/** Expanding accordion: hover/tap par panel khulta hai (desktop: horizontal, mobile: vertical) */
export default function Services() {
  const [active, setActive] = useState(0);
  const pick = (type) => window.dispatchEvent(new CustomEvent("dw:event-type", { detail: type }));

  return (
    <section id="services" className="section-y bg-bone">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><span className="eyebrow">{s.eyebrow}</span><h2 className="mt-4 font-display text-display text-moss">{s.title}</h2></div>
          <span className="text-sm font-semibold text-moss/60">{s.hint}</span>
        </Reveal>

        <div className="flex h-[680px] flex-col gap-3 md:h-[580px] md:flex-row">
          {s.items.map((it, i) => {
            const on = active === i;
            return (
              <motion.div key={it.title} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}
                animate={{ flexGrow: on ? 5 : 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-0 min-w-0 basis-0 cursor-pointer overflow-hidden rounded-[2rem] bg-moss">
                <Media src={it.image} alt={it.title} className="absolute inset-0" imgClassName={`transition-transform duration-[1400ms] ${on ? "scale-100" : "scale-110"}`} sizes="(min-width:768px) 50vw, 100vw" />
                <div className={`absolute inset-0 transition-colors duration-500 ${on ? "bg-gradient-to-t from-forest/75 via-forest/10 to-transparent" : "bg-forest/20"}`} />

                {/* Collapsed label */}
                <span className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-2xl text-paper transition-opacity duration-300 md:left-1/2 md:top-auto md:bottom-8 md:-translate-x-1/2 md:translate-y-0 md:[writing-mode:vertical-rl] md:rotate-180 ${on ? "opacity-0" : "opacity-100"}`}>
                  {it.title}
                </span>

                {/* Expanded content */}
                <motion.div animate={{ opacity: on ? 1 : 0, y: on ? 0 : 20 }} transition={{ duration: 0.5, delay: on ? 0.25 : 0 }}
                  className={`absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-8 ${on ? "" : "pointer-events-none"}`}>
                  <div className="flex flex-wrap gap-2">{it.tags.map((t) => <span key={t} className="rounded-full bg-paper/20 px-3 py-1 text-xs font-semibold text-paper backdrop-blur">{t}</span>)}</div>
                  <h3 className="font-display text-4xl text-paper md:text-5xl">{it.title}</h3>
                  <p className="max-w-md text-paper/80">{it.text}</p>
                  <a href="#brief" onClick={() => pick(it.eventType)} className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-moss transition hover:bg-blush">
                    Plan this <ArrowUpRight size={16} />
                  </a>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
