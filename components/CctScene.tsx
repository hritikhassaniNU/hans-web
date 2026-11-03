"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { kelvinToRgb } from "@/components/viewer/kelvin";

const MIN = 2700, MAX = 6500;

// Hans fittings are offered from 2700 K to 6500 K (data/products.ts).
const stops = [
  { k: 2700, name: "Warm white", use: "Homes, hotels and dining" },
  { k: 3000, name: "Soft white", use: "Living rooms, cafés and retail" },
  { k: 4000, name: "Neutral white", use: "Offices, kitchens and showrooms" },
  { k: 5000, name: "Cool white", use: "Workshops, clinics and display" },
  { k: 6500, name: "Daylight", use: "Warehouses, task and security lighting" }
];
const nearest = (k: number) => stops.reduce((a, b) => (Math.abs(b.k - k) < Math.abs(a.k - k) ? b : a));

type Beam = { x: number; y: number; w: number; tx: number; ty: number; tw: number };
const scenes: { key: string; name: string; fitting: string; link: string; href: string; beams: Beam[] }[] = [
  { key: "dining", name: "Dining", fitting: "COB downlights", link: "See COB downlights", href: "/products/cob-downlights",
    beams: [{ x: 360, y: 48, w: 26, tx: 300, ty: 266, tw: 190 }, { x: 540, y: 48, w: 26, tx: 480, ty: 266, tw: 190 }] },
  { key: "retail", name: "Retail", fitting: "Track lights", link: "See track lights", href: "/products/track-lights",
    beams: [{ x: 300, y: 92, w: 22, tx: 420, ty: 300, tw: 120 }, { x: 450, y: 92, w: 22, tx: 520, ty: 230, tw: 120 }, { x: 600, y: 92, w: 22, tx: 610, ty: 300, tw: 120 }] },
  { key: "workshop", name: "Workshop", fitting: "50 W high bay", link: "See outdoor & industrial", href: "/products/street-outdoor",
    beams: [{ x: 450, y: 118, w: 70, tx: 210, ty: 380, tw: 480 }] }
];

export default function CctScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(3000);
  const [scene, setScene] = useState(0);
  const touched = useRef(false);

  // One warm-to-cool sweep the first time the section comes into view, unless the visitor got there first.
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), ms = 2600;
      const step = (now: number) => {
        if (touched.current) return;
        const t = Math.min(1, (now - t0) / ms);
        const wave = t < 0.6 ? t / 0.6 : 1 - (t - 0.6) / 0.4 * 0.92;
        setK(Math.round((MIN + (MAX - MIN) * (0.5 - Math.cos(Math.PI * wave) / 2)) / 100) * 100);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const pick = (v: number) => { touched.current = true; setK(v); };
  const [r, g, b] = kelvinToRgb(k);
  const light = `rgb(${r}, ${g}, ${b})`;
  const s = scenes[scene];
  const stop = nearest(k);
  const pct = ((k - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="cct-wrap" ref={ref} style={{ ["--light" as string]: light, ["--lr" as string]: `${r}, ${g}, ${b}` }}>
      <div className="cct-tabs" role="tablist" aria-label="Choose a space">
        {scenes.map((sc, i) => (
          <button key={sc.key} type="button" role="tab" aria-selected={i === scene} onClick={() => setScene(i)}>
            <span className="mono">0{i + 1}</span>{sc.name}
          </button>
        ))}
      </div>
      <div className="cct-stage">
        <svg viewBox="0 0 900 420" className="cct-svg" role="img" aria-label={`${s.name} lit by ${s.fitting} at ${k} kelvin`}>
          <defs>
            <linearGradient id="cct-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={light} stopOpacity=".75" /><stop offset="1" stopColor={light} stopOpacity=".05" />
            </linearGradient>
            <radialGradient id="cct-pool"><stop offset="0" stopColor={light} stopOpacity=".55" /><stop offset="1" stopColor={light} stopOpacity="0" /></radialGradient>
          </defs>
          <rect width="900" height="420" className="room" />
          <rect width="900" height="420" className="tint" />
          <line x1="0" y1="40" x2="900" y2="40" className="edge" />
          <line x1="0" y1="380" x2="900" y2="380" className="edge" />

          {s.beams.map((bm, i) => (
            <g key={`${s.key}-${i}`} className="beam">
              <polygon points={`${bm.x - bm.w / 2},${bm.y} ${bm.x + bm.w / 2},${bm.y} ${bm.tx + bm.tw},${bm.ty} ${bm.tx},${bm.ty}`} fill="url(#cct-beam)" />
              <ellipse cx={bm.tx + bm.tw / 2} cy={bm.ty} rx={bm.tw * 0.62} ry={bm.tw * 0.09} fill="url(#cct-pool)" />
              <line x1={bm.x - bm.w / 2 + 2} y1={bm.y} x2={bm.x + bm.w / 2 - 2} y2={bm.y} className="lens" />
            </g>
          ))}

          {s.key === "dining" && (
            <g className="obj">
              {[360, 540].map(x => <path key={x} d={`M ${x - 22} 40 h 44 l -6 8 h -32 Z`} className="fit" />)}
              <rect x="260" y="266" width="380" height="7" rx="2" className="top" />
              <path d="M 285 273 V 380 M 615 273 V 380" className="stroke" />
              <path d="M 200 380 V 250 M 200 318 H 252 V 380 M 700 380 V 250 M 700 318 H 648 V 380" className="stroke" />
              <ellipse cx="360" cy="262" rx="34" ry="6" className="solid" />
              <rect x="512" y="232" width="18" height="34" rx="3" className="solid" />
              <path d="M 430 266 q 6 -26 18 -26 q 12 0 18 26 Z" className="solid" />
            </g>
          )}
          {s.key === "retail" && (
            <g className="obj">
              <rect x="180" y="58" width="540" height="6" rx="2" className="fit" />
              {[300, 450, 600].map(x => (
                <g key={x}><rect x={x - 3} y="64" width="6" height="14" className="fit" /><rect x={x - 11} y="76" width="22" height="18" rx="3" className="fit" /></g>
              ))}
              <rect x="360" y="300" width="320" height="6" rx="2" className="top" />
              <rect x="460" y="230" width="140" height="5" rx="2" className="top" />
              <path d="M 380 306 V 380 M 660 306 V 380" className="stroke" />
              <rect x="390" y="252" width="44" height="48" rx="3" className="solid" />
              <rect x="446" y="268" width="30" height="32" rx="3" className="solid" />
              <path d="M 610 300 q -12 -36 6 -52 h 10 q 18 16 6 52 Z" className="solid" />
              <rect x="490" y="196" width="34" height="34" rx="3" className="solid" />
              <circle cx="560" cy="214" r="16" className="solid" />
            </g>
          )}
          {s.key === "workshop" && (
            <g className="obj">
              <path d="M 450 40 V 86" className="stroke" />
              <path d="M 438 86 h 24 v 10 l 26 22 h -76 l 26 -22 Z" className="fit" />
              <rect x="120" y="120" width="190" height="130" rx="4" className="board" />
              {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={138 + (i % 6) * 31} cy={138 + Math.floor(i / 6) * 25} r="2" className="hole" />)}
              <path d="M 160 150 v 50 M 200 150 l 18 46 M 240 150 v 40 h 20" className="stroke" />
              <rect x="300" y="290" width="400" height="9" rx="2" className="top" />
              <path d="M 320 299 V 380 M 680 299 V 380 M 320 340 H 680" className="stroke" />
              <rect x="360" y="262" width="70" height="28" rx="3" className="solid" />
              <path d="M 470 290 l 30 -40 l 8 6 l -26 34 Z" className="solid" />
              <rect x="560" y="250" width="16" height="40" rx="2" className="solid" />
              <rect x="590" y="270" width="60" height="20" rx="3" className="solid" />
            </g>
          )}
        </svg>
        <aside className="cct-read" aria-live="polite">
          <span className="mono">CCT</span>
          <b className="mono">{k}K</b>
          <span className="cct-name">{stop.name}</span>
          <p>{stop.use}</p>
          <dl>
            <div><dt>Shown with</dt><dd>{s.fitting}</dd></div>
            <div><dt>Range</dt><dd>2700 – 6500 K</dd></div>
          </dl>
          <Link href={s.href}>{s.link} <i aria-hidden="true">→</i></Link>
        </aside>
      </div>
      <div className="cct-slider">
        <input type="range" min={MIN} max={MAX} step={100} value={k} onChange={e => pick(+e.target.value)} aria-label="Colour temperature in kelvin" aria-valuetext={`${k} K, ${stop.name}`} style={{ ["--p" as string]: `${pct}%` }} />
        <ol>
          {stops.map(st => (
            <li key={st.k} style={{ left: `${((st.k - MIN) / (MAX - MIN)) * 100}%` }}>
              <button type="button" aria-pressed={stop.k === st.k} onClick={() => pick(st.k)}><b className="mono">{st.k}K</b><span>{st.name.replace(" white", "")}</span></button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
