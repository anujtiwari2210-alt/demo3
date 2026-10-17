import { Mail, Phone } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";

const { brand, contact, nav } = constants;
const f = content.footer;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest pb-24 pt-20 text-paper/80 md:pb-10">
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[28rem] w-[22rem] -translate-x-1/2 rounded-t-full border border-paper/10" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[24rem] w-[18rem] -translate-x-1/2 rounded-t-full border border-paper/10" />
      <div className="container-x relative">
        <p className="max-w-2xl font-display text-title italic text-paper">{brand.name}</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <p className="max-w-xs">{f.about}</p>
          <div className="flex flex-col gap-2">
            <span className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-rose">{f.navTitle}</span>
            {nav.map((n) => <a key={n.href} href={n.href} className="w-fit transition hover:text-rose">{n.label}</a>)}
          </div>
          <div className="flex flex-col gap-2">
            <span className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-rose">{f.contactTitle}</span>
            <a href={`tel:${contact.phoneRaw}`} className="flex items-center gap-2 hover:text-rose"><Phone size={15} /> {contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-rose"><Mail size={15} /> {contact.email}</a>
            <p>{contact.address}</p>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-paper/10 pt-6 text-xs text-paper/50 md:flex-row">
          <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          <span>{f.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
