"use client";

import { useEffect, useRef, useState } from "react";
import { kelvinToRgb } from "@/components/viewer/kelvin";

type Row = [label: string, value: string, unit?: string];

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const CCT_MIN = 2700, CCT_MAX = 6500;
const cctName = (k: number) => k < 3400 ? "Warm white" : k < 4500 ? "Neutral white" : k < 5800 ? "Cool white" : "Daylight";

// Returns a 0–1 progress that runs over `ms` once the element first scrolls into view.
function useReveal(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setP(1); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / ms);
        setP(t);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [ms]);
  return [ref, p] as const;
}

function Rivets() {
  return <>{["tl", "tr", "bl", "br"].map(c => <span key={c} className={`rivet ${c}`} aria-hidden="true" />)}</>;
}

export function YearsCard({ founded }: { founded: number }) {
  const now = new Date().getFullYear();
  const years = now - founded;
  const [ref, p] = useReveal(1800);
  const e = ease(p);
  const span = now - founded;
  const pos = (y: number) => ((y - founded) / span) * 100;
  const labels = [founded, ...[1990, 2000, 2010, 2020].filter(y => y >= founded + 9 && y <= now - 5), now];

  return (
    <article className="card nb-years" ref={ref}>
      <Rivets />
      <div className="qhead"><span><b className="mono">01</b><s className="dash" /> Years in lighting</span><span>HE / YRS-01</span></div>
      <div className="nb-body">
        <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
        <span className="mono nb-kicker">Years supplying · since {founded}</span>
        <p className="nb-big">
          <span className="sr-only">{years}+ years</span>
          <span className="metal" aria-hidden="true">{Math.round(years * e)}</span>
          <span className="nb-plus" aria-hidden="true"><b>+</b><span className="mono">YRS</span></span>
        </p>
        <div className="ruler" aria-hidden="true">
          <div className="ticks">
            {Array.from({ length: span + 1 }, (_, k) => {
              const y = founded + k;
              const cls = y % 10 === 0 || k === 0 || y === now ? "maj" : y % 5 === 0 ? "mid" : "min";
              return <i key={y} className={cls} style={{ left: `${pos(y)}%` }} />;
            })}
          </div>
          <span className="bar" style={{ transform: `scaleX(${e})` }} />
          <span className="marker" style={{ left: `${e * 100}%` }} />
          {labels.map((y, k) => (
            <em key={y} className={k === 0 ? "first" : y === now ? "last" : undefined} style={{ left: `${pos(y)}%` }}>
              {y === now ? "Today" : k === 0 ? `Est. ${y}` : y}
            </em>
          ))}
        </div>
      </div>
    </article>
  );
}

export function Datasheet({ rows }: { rows: Row[] }) {
  return (
    <article className="card">
      <Rivets />
      <div className="qhead"><span><i className="dot" />Company datasheet</span><span>HE / DATA-04</span></div>
      <dl className="datasheet">
        {rows.map(([k, v, u], n) => <div key={k}><dt><b>{String(n + 2).padStart(2, "0")}</b> {k}</dt><dd>{v}{u && <i>{u}</i>}</dd></div>)}
      </dl>
    </article>
  );
}

export function CctGauge() {
  const [ref, p] = useReveal(2400);
  // Sweeps warm to cool, then settles on 4000 K once the card comes into view.
  const raw = p < 0.7 ? CCT_MIN + (CCT_MAX - CCT_MIN) * ease(p / 0.7) : CCT_MAX - (CCT_MAX - 4000) * ease((p - 0.7) / 0.3);
  const k = Math.round(raw / 100) * 100;
  const f = (k - CCT_MIN) / (CCT_MAX - CCT_MIN);
  const ang = Math.PI * (1 - f);
  const cx = 70, cy = 70, r = 54;
  const pt = (a: number, rr: number) => [cx + Math.cos(a) * rr, cy - Math.sin(a) * rr];
  const [nx, ny] = pt(ang, r - 12);
  const [rr, gg, bb] = kelvinToRgb(k);

  return (
    <article className="card gauge" ref={ref}>
      <Rivets />
      <div className="qhead"><span><i className="dot" />Colour range</span><span>HE / CCT</span></div>
      <div className="gg-body">
        <svg viewBox="0 0 140 84" aria-hidden="true">
          <defs>
            <linearGradient id="cct" x1="0" x2="1"><stop offset="0" stopColor="#ffb46b" /><stop offset=".5" stopColor="#ffe4c4" /><stop offset="1" stopColor="#c9d6ff" /></linearGradient>
          </defs>
          <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="url(#cct)" strokeWidth="9" strokeLinecap="round" />
          {Array.from({ length: 20 }, (_, i) => {
            const a = Math.PI * (1 - i / 19), major = i % 19 === 0 || i === 7;
            const [x1, y1] = pt(a, r - 9), [x2, y2] = pt(a, r - (major ? 17 : 13));
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={major ? "tk maj" : "tk"} />;
          })}
          <text x={cx - r} y={cy + 13} textAnchor="middle" className="tl">2700</text>
          <text x={cx + r} y={cy + 13} textAnchor="middle" className="tl">6500</text>
          <line x1={cx} y1={cy} x2={nx} y2={ny} className="needle" />
          <circle cx={cx} cy={cy} r="6" className="hub" />
          <circle cx={cx} cy={cy} r="2.2" fill="var(--sheet)" />
        </svg>
        <div>
          <span className="mono">Colour temperature</span>
          <b>2700–6500<i>K</i></b>
          <span className="mono gg-read"><i style={{ background: `rgb(${rr}, ${gg}, ${bb})` }} />{k} K · {cctName(k)}</span>
        </div>
      </div>
    </article>
  );
}
