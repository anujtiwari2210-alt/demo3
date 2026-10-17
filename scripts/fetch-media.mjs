const SRC = {
  logo: "https://lh3.googleusercontent.com/aida/AEtjO1XISAnqFWJuuFcOnNHG_a3H6XHbkmmEOV0WmBRuv-ehRYhdm0xrw4PCNVHs0401etBWRiZSabZWG40mkxRQTzY29TpHQx__QAsptxwqcZGpgKKzcS9Z_INynHxzXdGyufTGXOyZvblB2mtAFiXDkBGfJDVnTPiSxyZm7C5dnmSRgAG33BikCKpURa7Hg7uIuIpVaA4mWvHsSPnNhBYVa--Ad6kym4gQWZV_Ae79D6QKKeoijIHGIQRvDhY",
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZraPe0CTSGjve3wcfkeD3Hu50HQj_1ll9fymCNefrzafYgoyTbCypnUpHpbRDDllyWCC6iC79w5I5hEfiXcRuAVy9xVMGXa9XfCwpi1VR3kfuLC8MZ2SHZITOtPyEhk0oGPadN2x7fFnER4pvdvOBl-0K7lvWhKMWotzM57HV_NqQaV4wLlsFQIbUrwLVuIi-ul-Jp6-frr6oEuynwrJyYYedlC6WP6_dXVpd54byEbQi4ZfLrgWP",
  recep: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHJXmul5p4FzlRuiOCNXJ70DVLNfvOTVbJDy1_2Higmbi1IX-ezwL_THlLlEbVlLxecexjBaZBJABgB1ZzdnIxWACQ_RgFwajBoDPKty1NbDkyLjNQ0Z1mqTYJlx73nJD50UydMPjp5XOfrNiEeRU_vAu-k2OwQsOeJVJgZLGd6N84arqjugom4LVqZXnMJG44Kmf_pGawFFg7p0EjxuOT8J8_vAzx_XXJmFI3IlrR6y2UYYXhbEC9",
  haldi: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz0LyyWg7BGDQXoUMy8mIg4K6tsgOzZLZSJYV85SDqalsU7czLDxCpich1cOOLX1pmUR67MXSoFDCzkNAmZCy-TKDhaCUMrdEVF1lJScpY9G1jHrv9cN80lgnNmoJuhoxTF4BemvIHMaV7ooLYnW5XGZIV0Kt26h7eys938SjzECg4J9JxcbAwYzxuyPl3fbD8-vA_hPwcIalbVTsKk07aq_LAPN2tq1GVb3Ipw_nvMqfNsuBK896J",
  bday: "https://lh3.googleusercontent.com/aida-public/AB6AXuB89S1ifRYZbygVBopBAQcfL3JDosBSOAx8x71yfh38aP3HEWf0n6PH3FprHrpuFxRsYjyh9OUsTjVBFCeIcCcfpeR01ay9J9QIGl8aomzqJbpvtMeTVa9Td0ITeAM3YLBNQLzqge0v-Y4XCZNsKxz0y-5pZPk-gIZD34eke2F7wr7HyU1O0yiEWZoOLE-yfTyvJ0MdbHB6mcDFhoX6qRvFfRtXxQ5evMbvwp246c-2IR57MVVnCbkf",
  custom: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq7pqoeeA7SbyNnlMqTRvsV-arH6eTfi6WObjF76begpbbauHEix48p5xt2w8k_HuXtk8cSONP08lUPENdroqBCPKkWNiGTRTRnEN_gsVfqFhnGOt28zs9H7FL5lkCXnOf_SxKCEnapxYPBMRy7kuMf9fybulZsnqnL0Ii2GW93Y1b0PVIb_Y3I2a0pxlpxnKqOSM7DJuFfq-OKvaXu4apev2gBgIcFBL0PrVG_0bwwINS1eJcevzN"
};

// Usage: node scripts/fetch-media.mjs
// Original design ki 5 photos se saare placeholders public/ me bana deta hai (repeat honge,
// apni asli photos isi naam se replace kar do). ffmpeg ho to hero.mp4 bhi banata hai.
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname } from "node:path";

const P = [SRC.hero, SRC.recep, SRC.haldi, SRC.bday, SRC.custom].map((u) => `${u}=w1920-rj`);
const names = [
  "hero",
  "services/s1", "services/s2", "services/s3", "services/s4", "services/s5", "services/s6",
  "process/step1", "process/step2", "process/step3",
  "gallery/g1", "gallery/g2", "gallery/g3", "gallery/g4", "gallery/g5", "gallery/g6", "gallery/g7", "gallery/g8",
  "palettes/p1", "palettes/p2", "palettes/p3", "palettes/p4",
];
const FILES = Object.fromEntries(names.map((n, i) => [`public/images/${n}.jpg`, P[i % P.length]]));

const cache = new Map();
for (const [path, url] of Object.entries(FILES)) {
  mkdirSync(dirname(path), { recursive: true });
  if (!cache.has(url)) {
    const res = await fetch(url);
    if (!res.ok) { console.error(`FAILED ${res.status}: ${path}`); continue; }
    cache.set(url, Buffer.from(await res.arrayBuffer()));
  }
  writeFileSync(path, cache.get(url));
  console.log("saved", path);
}

// Hero video: 3 photos ka slow-zoom crossfade (~16s loop)
mkdirSync("public/videos", { recursive: true });
const imgs = ["public/images/hero.jpg", "public/images/gallery/g3.jpg", "public/images/gallery/g2.jpg"];
if (imgs.every(existsSync)) {
  const F = 25, SEC = 6;
  const zoom = imgs.map((_, i) =>
    `[${i}:v]scale=2400:-2,zoompan=z='min(zoom+0.0004,1.15)':d=${F * SEC}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1280x720:fps=${F},setsar=1[v${i}]`).join(";");
  const filter = `${zoom};[v0][v1]xfade=transition=fade:duration=1:offset=5[x1];[x1][v2]xfade=transition=fade:duration=1:offset=10,format=yuv420p[out]`;
  try {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...imgs.flatMap((i) => ["-i", i]), "-filter_complex", filter,
      "-map", "[out]", "-c:v", "libx264", "-crf", "26", "-preset", "veryfast", "-movflags", "+faststart", "-an", "public/videos/hero.mp4"]);
    console.log("saved public/videos/hero.mp4");
  } catch {
    console.log("ffmpeg nahi mila: video skip. Hero poster image dikhayega.");
  }
}
