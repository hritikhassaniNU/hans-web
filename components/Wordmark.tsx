"use client";

import { useEffect, useRef, useState } from "react";

// Outlined wordmark that fills with hatching as it scrolls into view, led by a dashed "A–A" section line.
export default function Wordmark({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setP(1); return; }
    let raf = 0;
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        setP(Math.min(1, Math.max(0, (innerHeight - r.top - r.height * 0.2) / (innerHeight * 0.55))));
      });
    };
    tick();
    addEventListener("scroll", tick, { passive: true });
    addEventListener("resize", tick);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", tick); removeEventListener("resize", tick); };
  }, []);

  const glyphs = (fill: string, stroke: string, width: number) => (
    <text x="-14" y="188" textLength="1028" lengthAdjust="spacingAndGlyphs" fill={fill} stroke={stroke} strokeWidth={width} vectorEffect="non-scaling-stroke">{text}</text>
  );
  const scan = Math.min(1, p * 10, (1 - p) * 10);

  return (
    <div className="wm" ref={ref} role="img" aria-label={text}>
      <svg viewBox="0 0 1000 196" className="wm-out" aria-hidden="true">{glyphs("none", "currentColor", 1)}</svg>
      <div className="wm-in" style={{ clipPath: `inset(-6% ${(100 - p * 100).toFixed(2)}% -6% 0%)` }} aria-hidden="true">
        <svg viewBox="0 0 1000 196">
          <defs>
            <pattern id="wm-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="9" stroke="currentColor" strokeOpacity=".35" strokeWidth="1.4" />
            </pattern>
          </defs>
          {glyphs("url(#wm-hatch)", "currentColor", 1.25)}
        </svg>
      </div>
      <div className="wm-scan" style={{ opacity: scan, transform: `translateX(${(p * 100 - 100).toFixed(2)}%)` }} aria-hidden="true">
        <span className="wm-cut" />
        <span className="wm-tag top">A</span>
        <span className="wm-tag bot">A</span>
      </div>
    </div>
  );
}
