"use client";

import content from "@/data/content.json";
import Reveal from "../ui/Reveal";
import Media from "../ui/Media";

const p = content.process;

/** Left side sticky rehta hai, right side steps scroll hote hain */
export default function Process() {
  return (
    <section id="process" className="section-y container-x">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <span className="eyebrow">{p.eyebrow}</span>
              <h2 className="mt-4 font-display text-display text-moss">{p.title}</h2>
              <p className="mt-4 max-w-sm text-ink/70">{p.text}</p>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col gap-16 lg:col-span-7 lg:gap-24">
          {p.steps.map((s, i) => (
            <Reveal key={s.title} className={i % 2 ? "lg:pl-16" : ""}>
              <div className="grid items-end gap-6 sm:grid-cols-2">
                <Media src={s.image} alt={s.title} className="aspect-[3/4] w-full rounded-t-full shadow-card" sizes="(min-width:640px) 25vw, 100vw" />
                <div className="pb-4">
                  <span className="font-display text-8xl italic text-terracotta/30">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-4xl text-moss">{s.title}</h3>
                  <p className="mt-3 text-ink/70">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
