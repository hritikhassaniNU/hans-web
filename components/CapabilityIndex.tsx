"use client";

import { useEffect, useRef, useState } from "react";
import SpotDrawing from "@/components/SpotDrawing";
import { capabilities, type Capability } from "@/data/home";

const no = (n: number) => String(n + 1).padStart(2, "0");

function CapCard({ cap, n }: { cap: Capability; n: number }) {
  const [pick, setPick] = useState(0);
  const opt = cap.pick.options[pick];
  return (
    <>
      <div className="qhead"><span><i className="dot" />HE—{cap.code}</span><span>{no(n)} / {no(capabilities.length - 1)}</span></div>
      <div className={`cap-body${cap.drawing ? " with-drw" : ""}`}>
        {cap.drawing && (
          <figure className="drw-card">
            <SpotDrawing finish={opt.key} />
            <figcaption className="mono"><span>FB deep cone · 10–12 W</span><span>Finish · {opt.key}</span></figcaption>
          </figure>
        )}
        <h3>{cap.name}</h3>
        <p>{cap.text}</p>
        <div className="cap-pick" role="group" aria-label={cap.pick.label}>
          {cap.pick.options.map((o, k) => (
            <button key={o.key} type="button" aria-pressed={k === pick} onClick={() => setPick(k)}>
              <span className="mono">{no(k)}</span>
              {o.swatch && <i style={{ background: o.swatch }} />}
              <b>{o.key}</b>
            </button>
          ))}
        </div>
        <p className="cap-note mono"><span>{cap.pick.label} — {opt.key}</span>{opt.note}</p>
      </div>
    </>
  );
}

// Pipe run drawn like the reference: enters top-left, bends down the rail, bends out at the foot.
function Pipe({ h, ys, active, done }: { h: number; ys: number[]; active: number; done: boolean }) {
  const x = 22, r = 12, top = 12, bot = h - 12;
  const d = `M 0 ${top} H ${x - r} A ${r} ${r} 0 0 1 ${x} ${top + r} V ${bot - r} A ${r} ${r} 0 0 0 ${x + r} ${bot} H ${x + 30}`;
  // Path length, so a flange lights once the fill passes it.
  const run = (x - r) + (Math.PI * r) / 2 + (bot - r - top - r) + (Math.PI * r) / 2 + 30;
  const at = (y: number) => ((x - r) + (Math.PI * r) / 2 + (y - top - r)) / run;
  // The fill runs to the active item's flange, and out through the foot once the last card is passed.
  const fill = done ? 1 : ys.length ? at(ys[active]) : 0;
  const dash = { strokeDasharray: `${fill} 1` };
  return (
    <svg className="pipe" width={x + 30} height={h} viewBox={`0 0 ${x + 30} ${h}`} aria-hidden="true">
      <defs>
        <linearGradient id="cap-grad" x1="0" y1="0" x2="0" y2={h} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff7c33" /><stop offset="1" stopColor="#b94205" />
        </linearGradient>
        <mask id="cap-mask" maskUnits="userSpaceOnUse" x="-10" y="-10" width={x + 50} height={h + 20}>
          <path d={d} fill="none" stroke="#fff" strokeWidth="10" pathLength="1" style={dash} />
        </mask>
      </defs>
      <path d={d} className="p-wall" fill="none" strokeWidth="17" />
      <path d={d} className="p-bore" fill="none" strokeWidth="14.5" />
      <path d={d} fill="none" stroke="url(#cap-grad)" strokeWidth="9" pathLength="1" style={dash} />
      <path d={d} className="p-flow" fill="none" strokeWidth="2" strokeDasharray="3 15" strokeLinecap="round" mask="url(#cap-mask)" />
      {ys.map(y => {
        const lit = fill >= at(y) - 0.002;
        return (
          <g key={y} className={lit ? "flange lit" : "flange"}>
            <rect x={x - 15} y={y - 4} width="30" height="8" rx="1" />
            <circle cx={x - 11} cy={y} r="1.3" /><circle cx={x + 11} cy={y} r="1.3" />
          </g>
        );
      })}
    </svg>
  );
}

export default function CapabilityIndex() {
  const wrap = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const [geo, setGeo] = useState<{ h: number; ys: number[] }>({ h: 0, ys: [] });

  // Flanges sit level with each item's title; re-measure when the list reflows.
  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const measure = () => setGeo({
      h: ol.offsetHeight,
      ys: [...ol.querySelectorAll("b")].map(b => { const r = b.getBoundingClientRect(); return r.top - ol.getBoundingClientRect().top + r.height / 2; })
    });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
    }, { rootMargin: "-40% 0px -50% 0px" });
    cards.current.forEach(el => el && io.observe(el));
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.current?.getBoundingClientRect();
        if (!r) return;
        const p = (innerHeight * 0.5 - r.top) / r.height;
        setFill(Math.min(1, Math.max(0, p)));
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const go = (n: number) => cards.current[n]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="capidx" ref={wrap}>
      <aside className="card cap-nav">
        <div className="qhead"><span>Fig. 05 — Capability index</span><span><i className="dot" />{no(active)} / {no(capabilities.length - 1)}</span></div>
        <div className="cap-rail">
          {geo.h > 0 && <Pipe h={geo.h} ys={geo.ys} active={active} done={fill >= 0.98} />}
          <ol ref={list}>
            {capabilities.map((c, n) => (
              <li key={c.code} className={n <= active ? "lit" : undefined}>
                <button type="button" aria-current={n === active ? "step" : undefined} onClick={() => go(n)}>
                  <span className="mono">{c.code}</span>
                  <b>{c.name}</b>
                  <small className="mono">{c.short}</small>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="cap-foot mono"><span>Drg HE/CAP-01</span><span>Scroll or select</span><span>Scale NTS</span></div>
      </aside>
      <div className="cap-cards">
        {capabilities.map((c, n) => (
          <article key={c.code} className="card cap-card" data-i={n} ref={el => { cards.current[n] = el; }}>
            <CapCard cap={c} n={n} />
          </article>
        ))}
      </div>
    </div>
  );
}
