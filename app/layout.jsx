import { Instrument_Serif, Figtree } from "next/font/google";
import IntroProvider from "@/components/Intro";
import constants from "@/data/constants.json";
import "./globals.css";

const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata = { title: constants.seo.title, description: constants.seo.description };
export const viewport = { themeColor: "#FBF7F2" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${instrument.variable} ${figtree.variable}`}>
      <body>
        <IntroProvider>{children}</IntroProvider>
      </body>
    </html>
  );
}
