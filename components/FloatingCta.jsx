"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import constants from "@/data/constants.json";
import { waLink } from "@/lib/helpers";
import { useIntroReady } from "./Intro";

/** Thoda scroll karne ke baad neeche-beech me "Chat with a designer" pill aati hai */
export default function FloatingCta() {
  const ready = useIntroReady();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <AnimatePresence>
      {ready && show && (
        <motion.a
          href={waLink(constants.whatsappMessages.floating)} target="_blank" rel="noopener noreferrer"
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-moss py-3 pl-3 pr-6 text-sm font-semibold text-paper shadow-soft"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-moss">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" /><MessageCircle size={18} className="relative" />
          </span>
          Chat with a designer
        </motion.a>
      )}
    </AnimatePresence>
  );
}
