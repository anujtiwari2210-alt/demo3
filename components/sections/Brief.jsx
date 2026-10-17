"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { Icon, waLink } from "@/lib/helpers";
import Reveal from "../ui/Reveal";

const b = content.brief;
const EMPTY = { event: "", palette: "", venue: "", guests: "", name: "", phone: "", date: "" };

// Selectable option (component ke bahar: re-render par remount na ho)
function Choice({ active, onClick, children, className = "" }) {
  return (
    <button type="button" onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${active ? "border-moss bg-moss text-paper shadow-card" : "border-moss/15 bg-white text-moss hover:border-moss/50"} ${className}`}>
      {children}
    </button>
  );
}

const slide = {
  enter: (d) => ({ opacity: 0, x: d * 40 }),
  center: { opacity: 1, x: 0 },
  exit: (d) => ({ opacity: 0, x: d * -40 }),
};

/** 4-step brief wizard: end me WhatsApp par complete message bhejta hai */
export default function Brief() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState(EMPTY);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
    const onEvent = (e) => { setData((d) => ({ ...d, event: e.detail })); setStep(0); setDone(false); };
    const onPalette = (e) => { setData((d) => ({ ...d, palette: e.detail })); };
    window.addEventListener("dw:event-type", onEvent);
    window.addEventListener("dw:palette", onPalette);
    return () => { window.removeEventListener("dw:event-type", onEvent); window.removeEventListener("dw:palette", onPalette); };
  }, []);

  const set = (k, v) => { setData((d) => ({ ...d, [k]: v })); setError(""); };

  const valid = [
    () => !!data.event,
    () => !!data.palette,
    () => !!data.venue && !!data.guests,
    () => data.name.trim().length >= 2 && data.phone.replace(/\D/g, "").length >= 10 && !!data.date,
  ];

  const next = () => {
    if (!valid[step]()) return setError(step === 3 ? b.needsDetails : b.needsChoice);
    if (step < 3) { setDir(1); setStep(step + 1); return; }
    const ev = content.events.find((x) => x.value === data.event)?.label;
    const msg = [`Hello ${constants.brand.name}, here is my brief:`, `Event: ${ev}`, `Palette: ${data.palette}`, `Venue: ${data.venue}`, `Guests: ${data.guests}`, `Date: ${data.date}`, `Name: ${data.name}`, `Phone: ${data.phone}`].join("\n");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setDone(true);
  };
  const back = () => { setDir(-1); setStep(step - 1); setError(""); };
  const reset = () => { setData(EMPTY); setStep(0); setDone(false); };

  return (
    <section id="brief" className="section-y bg-blush/50">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <span className="eyebrow">{b.eyebrow}</span>
          <h2 className="mt-4 font-display text-display text-moss">{b.title}</h2>
          <p className="mt-4 max-w-md text-ink/70">{b.text}</p>
          <ul className="mt-8 flex flex-col gap-3">
            {b.bullets.map((x) => <li key={x.text} className="flex items-center gap-3 text-moss"><Icon name={x.icon} size={18} className="shrink-0 text-terracotta" /> {x.text}</li>)}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-[2rem] bg-paper p-6 shadow-soft md:p-10">
            {done ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-10 text-center">
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.15 }} className="flex h-20 w-20 items-center justify-center rounded-full bg-moss text-paper"><Check size={36} /></motion.span>
                <h3 className="mt-6 font-display text-4xl text-moss">{b.doneTitle}</h3>
                <p className="mt-2 max-w-sm text-ink/70">{b.doneText}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button onClick={next} className="btn-moss"><Send size={16} /> {b.submit}</button>
                  <button onClick={reset} className="btn-line">{b.again}</button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Progress */}
                <div className="mb-8 flex items-center gap-2">
                  {b.steps.map((s, i) => (
                    <div key={s} className="flex-1">
                      <div className="h-1 overflow-hidden rounded-full bg-moss/10"><motion.div animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.5 }} className="h-full bg-terracotta" /></div>
                      <span className={`mt-2 block text-[11px] font-bold uppercase tracking-widest ${i <= step ? "text-moss" : "text-moss/40"}`}>{s}</span>
                    </div>
                  ))}
                </div>

                <h3 className="mb-6 font-display text-3xl text-moss md:text-4xl">{b.titles[step]}</h3>

                <div className="min-h-[15rem]">
                  <AnimatePresence mode="wait" custom={dir} initial={false}>
                    <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                      {step === 0 && (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {content.events.map((e) => (
                            <Choice key={e.value} active={data.event === e.value} onClick={() => set("event", e.value)} className="flex flex-col gap-3 py-5">
                              <Icon name={e.icon} size={22} /> {e.label}
                            </Choice>
                          ))}
                        </div>
                      )}
                      {step === 1 && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {content.palettes.items.map((p) => (
                            <Choice key={p.name} active={data.palette === p.name} onClick={() => set("palette", p.name)} className="flex items-center justify-between gap-3">
                              {p.name}
                              <span className="flex -space-x-1.5">{p.colors.map((c) => <span key={c} className="h-6 w-6 rounded-full border-2 border-paper" style={{ background: c }} />)}</span>
                            </Choice>
                          ))}
                        </div>
                      )}
                      {step === 2 && (
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-wrap gap-2">{b.venues.map((v) => <Choice key={v} active={data.venue === v} onClick={() => set("venue", v)}>{v}</Choice>)}</div>
                          <div className="flex flex-wrap gap-2">{b.guests.map((g) => <Choice key={g} active={data.guests === g} onClick={() => set("guests", g)}>{g} guests</Choice>)}</div>
                        </div>
                      )}
                      {step === 3 && (
                        <div className="flex flex-col gap-4">
                          <input value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" aria-label="Name" className="field" />
                          <input value={data.phone} onChange={(e) => set("phone", e.target.value)} type="tel" placeholder="WhatsApp number" aria-label="Phone" className="field" />
                          <input value={data.date} onChange={(e) => set("date", e.target.value)} type="date" min={today} aria-label="Event date" className="field" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <AnimatePresence>{error && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 text-sm font-semibold text-terracotta">{error}</motion.p>}</AnimatePresence>

                <div className="mt-6 flex items-center justify-between">
                  <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 text-sm font-semibold text-moss transition disabled:pointer-events-none disabled:opacity-0"><ArrowLeft size={16} /> {b.back}</button>
                  <button onClick={next} className="btn-moss">{step === 3 ? <><Send size={16} /> {b.submit}</> : <>{b.next} <ArrowRight size={16} /></>}</button>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
