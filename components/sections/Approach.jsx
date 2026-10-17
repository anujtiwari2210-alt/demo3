"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";

const a = content.approach;

function CountUp({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export default function Approach() {
  return (
    <section className="section-y container-x">
      <Reveal className="mx-auto max-w-4xl text-center">
        <span className="eyebrow">{a.eyebrow}</span>
        <h2 className="mt-5 font-display text-display text-moss">{a.title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/70">{a.text}</p>
      </Reveal>
      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-moss/10 md:grid-cols-4">
        {a.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="bg-paper">
            <div className="flex flex-col items-center px-4 py-10 text-center">
              <span className="font-display text-6xl text-terracotta md:text-7xl"><CountUp to={s.value} suffix={s.suffix} /></span>
              <span className="mt-2 text-sm font-semibold text-moss/70">{s.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
