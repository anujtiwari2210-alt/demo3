"use client";

import { useState } from "react";
import Image from "next/image";

/** Image + fallback: file na mile to soft gradient + title dikhta hai, layout kabhi nahi tootta. */
export default function Media({ src, alt, className = "", imgClassName = "", sizes = "100vw", priority = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-blush via-bone to-sage/50 ${className}`}>
      {!failed && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} onError={() => setFailed(true)} className={`object-cover ${imgClassName}`} />}
      {failed && <span className="absolute inset-0 flex items-center justify-center p-4 text-center font-display text-xl italic text-moss/60">{alt}</span>}
    </div>
  );
}
