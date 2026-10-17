"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import constants from "@/data/constants.json";
import content from "@/data/content.json";

/**
 * Opening: ek "mehrab" (arch) draw hota hai, brand uske andar aata hai,
 * phir arch itna bada hota hai ki poori screen blush se bhar jati hai aur page khulta hai.
 * `useIntroReady()` baaki sections ko batata hai kab animate karna hai.
 */
const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);

const { enabled, oncePerSession, durationMs } = constants.intro;
const EASE = [0.76, 0, 0.24, 1];

export default function IntroProvider({ children }) {
  const [showing, setShowing] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;
    let seen = false;
    try { seen = oncePerSession && sessionStorage.getItem("mh-intro") === "1"; } catch {}
    if (seen) { setShowing(false); return; }
    const t = setTimeout(() => {
      setShowing(false);
      try { sessionStorage.setItem("mh-intro", "1"); } catch {}
    }, durationMs);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showing ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showing]);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={!showing}>
        {children}
        <AnimatePresence>
          {showing && (
            <motion.div key="intro" aria-hidden className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-paper"
              exit={{ opacity: 0, transition: { delay: 0.85, duration: 0.5 } }}>
              {/* Arch: exit par scale hoke screen bhar deta hai */}
              <motion.div
                initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                exit={{ scale: 18, transition: { duration: 1.1, ease: EASE } }}
                style={{ transformOrigin: "50% 65%" }}
                className="relative flex h-[22rem] w-[15rem] flex-col items-center justify-end rounded-t-full bg-blush pb-10 text-center md:h-[28rem] md:w-[19rem]"
              >
                <span className="absolute inset-3 rounded-t-full border border-moss/30" />
                <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
                  className="mb-auto mt-20 font-display text-7xl italic text-moss md:mt-24 md:text-8xl">{constants.brand.monogram}</motion.span>
                <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
                  className="font-display text-2xl text-moss">{constants.brand.name}</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
                  className="mt-1 px-6 text-xs uppercase tracking-[0.2em] text-moss/70">{content.intro.line}</motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </IntroContext.Provider>
    </MotionConfig>
  );
}
