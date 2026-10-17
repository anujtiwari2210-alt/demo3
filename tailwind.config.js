/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      // "Botanical Atelier": soft, garden-inspired light theme
      colors: {
        paper: "#FBF7F2",
        bone: "#F3ECE3",
        blush: "#F2D4CC",
        rose: "#E7A9A0",
        terracotta: "#C4654A",
        sage: "#8A9A82",
        moss: "#2F4237",
        forest: "#1E2D25",
        ink: "#1F2A24",
      },
      fontFamily: {
        display: ["var(--font-instrument)", "Georgia", "serif"],
        body: ["var(--font-figtree)", "system-ui", "sans-serif"],
      },
      fontSize: {
        mega: ["clamp(3.2rem,8.2vw,7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        display: ["clamp(2.5rem,5.4vw,4.8rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        title: ["clamp(2rem,3.8vw,3.2rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        soft: "0 30px 60px -25px rgba(47,66,55,0.35)",
        card: "0 18px 40px -20px rgba(47,66,55,0.25)",
      },
    },
  },
  plugins: [],
};
