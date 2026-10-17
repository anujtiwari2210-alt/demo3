// Shared framer-motion presets: ek jagah se saari animation tune ho jati hai
export const EASE_LUXE = [0.22, 1, 0.36, 1];

export const stagger = (gap = 0.14, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_LUXE } },
};
