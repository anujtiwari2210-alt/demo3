"use client";

import content from "@/data/content.json";
import Reveal from "../ui/Reveal";

const t = content.testimonials;
// Har card ka rang + staggered vertical offset (desktop)
const STYLE = ["bg-blush md:translate-y-0", "bg-sage/30 md:translate-y-10", "bg-bone md:translate-y-0"];

export default function Testimonials() {
  return (
    <section className="section-y overflow-hidden bg-bone">
      <div className="container-x">
        <Reveal className="mb-14 text-center">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-display text-moss">{t.title}</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3 md:pb-10">
          {t.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.12}>
              <figure className={`flex h-full flex-col justify-between rounded-[2rem] p-8 transition-transform duration-500 hover:-translate-y-2 ${STYLE[i % 3]}`}>
                <span className="font-display text-7xl leading-none text-terracotta">“</span>
                <blockquote className="mb-8 font-display text-2xl leading-snug text-moss">{it.quote}</blockquote>
                <figcaption><p className="font-bold text-moss">{it.name}</p><p className="text-sm text-ink/60">{it.event}</p></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
