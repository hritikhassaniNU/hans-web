"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { kelvinToRgb } from "@/components/viewer/kelvin";
import { dimmingModes, matchDriver, sceneFittings, type Dimming, type Kind, type SceneFitting } from "@/data/cctScene";
import { driverBrands } from "@/data/drivers";
import { DiningProps, RetailProps, SceneDefs, WorkshopProps } from "@/components/SceneProps";

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

// Where each fitting hangs and what it is aimed at, per scene.
type Mount = { x: number; aim: [number, number] };
const scenes = [
  { key: "dining" as const, name: "Dining", mounts: [{ x: 360, aim: [360, 266] }, { x: 540, aim: [540, 266] }] as Mount[] },
  { key: "retail" as const, name: "Retail", mounts: [{ x: 300, aim: [470, 300] }, { x: 450, aim: [560, 230] }, { x: 600, aim: [650, 300] }] as Mount[] },
  { key: "workshop" as const, name: "Workshop", mounts: [{ x: 450, aim: [450, 380] }] as Mount[] }
];

const r1 = (v: number) => Math.round(v * 10) / 10;

// Point the light leaves from, for each kind of fitting.
function source(kind: Kind, x: number): [number, number] {
  if (kind === "track") return [x, 98];
  if (kind === "highbay") return [x, 118];
  if (kind === "flood") return [x, 112];
  return [x, 48];
}

function beamShape(kind: Kind, [sx, sy]: [number, number], [tx, ty]: [number, number], angle: number) {
  const dx = tx - sx, dy = ty - sy, L = Math.hypot(dx, dy) || 1;
  const ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const lens = kind === "highbay" ? 34 : kind === "flood" ? 22 : kind === "downlight" ? 13 : 10;
  const spread = lens + L * Math.tan((angle * Math.PI) / 360);
  const p = (x: number, y: number) => `${r1(x)},${r1(y)}`;
  return {
    poly: [p(sx + nx * lens, sy + ny * lens), p(sx - nx * lens, sy - ny * lens), p(tx - nx * spread, ty - ny * spread), p(tx + nx * spread, ty + ny * spread)].join(" "),
    lens: { x1: r1(sx + nx * (lens - 2)), y1: r1(sy + ny * (lens - 2)), x2: r1(sx - nx * (lens - 2)), y2: r1(sy - ny * (lens - 2)) },
    pool: { cx: tx, cy: ty, rx: r1(spread * 1.15), ry: r1(Math.max(6, spread * 0.12)) },
    rot: r1((Math.atan2(dy, dx) * 180) / Math.PI - 90)
  };
}

// The fitting body, drawn in its own frame with the lens at the origin and the beam along +y.
function Body({ kind, x, rot }: { kind: Kind; x: number; rot: number }) {
  switch (kind) {
    case "spot":
      return <path d={`M ${x - 16} 40 h 32 l -5 8 h -22 Z`} className="fit" />;
    case "downlight":
      return <path d={`M ${x - 24} 40 h 48 l -7 8 h -34 Z`} className="fit" />;
    case "gimbal":
      return <g><rect x={x - 18} y="40" width="36" height="5" className="fit" /><g transform={`rotate(${rot} ${x} 48)`}><rect x={x - 11} y="38" width="22" height="12" rx="2" className="fit" /></g></g>;
    case "track":
      return <g><rect x={x - 3} y="64" width="6" height="14" className="fit" /><g transform={`rotate(${rot} ${x} 98)`}><rect x={x - 11} y="74" width="22" height="24" rx="4" className="fit" /><rect x={x - 12} y="92" width="24" height="6" rx="2" className="fit2" /></g></g>;
    case "highbay":
      return <g><path d={`M ${x} 40 V 84`} className="stroke" /><path d={`M ${x - 12} 84 h 24 v 10 l 24 24 h -72 l 24 -24 Z`} className="fit" /></g>;
    case "flood":
      return <g><path d={`M ${x} 40 V 86`} className="stroke" /><g transform={`rotate(${rot} ${x} 112)`}><rect x={x - 26} y="88" width="52" height="24" rx="3" className="fit" />{[-16, -8, 0, 8, 16].map(o => <rect key={o} x={x + o - 1} y="84" width="2" height="5" className="fit2" />)}</g></g>;
  }
}

export default function CctScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(3000);
  const [scene, setScene] = useState(0);
  const [fit, setFit] = useState(0);
  const [watt, setWatt] = useState(0);
  const [beam, setBeam] = useState(1);
  const [brand, setBrand] = useState<(typeof driverBrands)[number]>("Philips");
  const [dimMode, setDimMode] = useState<Dimming>("None");
  const [level, setLevel] = useState(100);
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

  const s = scenes[scene];
  const fittings = sceneFittings[s.key];
  const f: SceneFitting = fittings[Math.min(fit, fittings.length - 1)];
  const w = f.watts[Math.min(watt, f.watts.length - 1)];
  const angle = f.beams ? f.beams[Math.min(beam, f.beams.length - 1)] : f.angle;
  const driver = matchDriver(brand, w, dimMode);
  const dimmable = dimMode !== "None" && !!driver;
  const dim = dimmable ? level / 100 : 1;
  // Brightness follows wattage (relative within the demo, not a lumen figure) and dim level.
  const glow = Math.min(1, (0.45 + w / 60) * (0.25 + 0.75 * dim));

  const pick = (v: number) => { touched.current = true; setK(v); };
  const chooseScene = (i: number) => { setScene(i); setFit(0); setWatt(0); setBeam(1); };
  const chooseFit = (i: number) => { setFit(i); setWatt(0); setBeam(1); };

  const [r, g, b] = kelvinToRgb(k);
  const light = `rgb(${r}, ${g}, ${b})`;
  const stop = nearest(k);
  const pct = ((k - MIN) / (MAX - MIN)) * 100;
  const enquiry = `/contact?cat=${encodeURIComponent("LED drivers")}&item=${encodeURIComponent(`${brand} ${dimmingModes.find(d => d.key === dimMode)?.label} driver for ${f.name} ${w} W`)}`;

  return (
    <div className="cct-wrap" ref={ref} style={{ ["--light" as string]: light, ["--lr" as string]: `${r}, ${g}, ${b}`, ["--glow-k" as string]: glow }}>
      <div className="cct-tabs" role="tablist" aria-label="Choose a space">
        {scenes.map((sc, i) => (
          <button key={sc.key} type="button" role="tab" aria-selected={i === scene} onClick={() => chooseScene(i)}>
            <span className="mono">0{i + 1}</span>{sc.name}
          </button>
        ))}
      </div>
      <div className="cct-stage">
        <svg viewBox="0 0 900 420" className="cct-svg" role="img" aria-label={`${s.name} lit by ${f.name}, ${w} W, at ${k} kelvin`}>
          <defs>
            <linearGradient id="cct-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={light} stopOpacity=".8" /><stop offset="1" stopColor={light} stopOpacity=".05" />
            </linearGradient>
            <SceneDefs />
            <radialGradient id="cct-pool"><stop offset="0" stopColor={light} stopOpacity=".6" /><stop offset="1" stopColor={light} stopOpacity="0" /></radialGradient>
          </defs>
          <rect width="900" height="420" className="room" />
          <rect width="900" height="420" className="tint" />
          <line x1="0" y1="40" x2="900" y2="40" className="edge" />
          <line x1="0" y1="380" x2="900" y2="380" className="edge" />

          {s.key === "dining" && <DiningProps />}
          {s.key === "retail" && <RetailProps track={f.kind === "track"} />}
          {s.key === "workshop" && <WorkshopProps />}

          {s.mounts.map((m, i) => {
            const src = source(f.kind, m.x);
            const sh = beamShape(f.kind, src, m.aim, angle);
            return (
              <g key={`${s.key}-${f.slug}-${i}`}>
                <g className="beam" style={{ opacity: glow }}>
                  <polygon points={sh.poly} fill="url(#cct-beam)" />
                  <ellipse {...sh.pool} fill="url(#cct-pool)" />
                </g>
                <Body kind={f.kind} x={m.x} rot={sh.rot} />
                <line {...sh.lens} className="lens" style={{ opacity: 0.35 + 0.65 * dim }} />
              </g>
            );
          })}
        </svg>
        <aside className="cct-read" aria-live="polite">
          <span className="mono">CCT</span>
          <b className="mono">{k}K</b>
          <span className="cct-name">{stop.name}</span>
          <p>{stop.use}</p>
          <dl>
            <div><dt>Fitting</dt><dd>{f.name} · {w} W{f.beams ? ` · ${angle}°` : ""}</dd></div>
            <div>
              <dt>Driver</dt>
              <dd>{driver ? `${driver.brand} ${driver.model}${driver.model.includes(`${driver.watts} W`) ? "" : ` · ${driver.watts} W`} · ${driver.output}` : `${brand} ${dimmingModes.find(d => d.key === dimMode)?.label} driver · on request`}</dd>
            </div>
            {dimmable && <div><dt>Dim level</dt><dd>{level}%</dd></div>}
          </dl>
          {driver
            ? <Link href={f.href}>See the {f.name} <i aria-hidden="true">→</i></Link>
            : <Link href={enquiry}>Ask us for this driver <i aria-hidden="true">→</i></Link>}
        </aside>
      </div>

      <div className="cct-config">
        <div className="cfg">
          <span className="mono">Fitting</span>
          <div className="chips" role="group" aria-label="Fitting">
            {fittings.map((ft, i) => <button key={ft.slug} type="button" className="chip" aria-pressed={ft.slug === f.slug} onClick={() => chooseFit(i)}>{ft.name}</button>)}
          </div>
        </div>
        <div className="cfg-row">
          {f.watts.length > 1 && (
            <div className="cfg">
              <span className="mono">Wattage</span>
              <div className="chips" role="group" aria-label="Wattage">
                {f.watts.map((v, i) => <button key={v} type="button" className="chip mono" aria-pressed={v === w} onClick={() => setWatt(i)}>{v} W</button>)}
              </div>
            </div>
          )}
          {f.beams && (
            <div className="cfg">
              <span className="mono">Beam</span>
              <div className="chips" role="group" aria-label="Beam angle">
                {f.beams.map((v, i) => <button key={v} type="button" className="chip mono" aria-pressed={v === angle} onClick={() => setBeam(i)}>{v}°</button>)}
              </div>
            </div>
          )}
          <div className="cfg">
            <span className="mono">Driver</span>
            <div className="chips" role="group" aria-label="Driver brand">
              {driverBrands.map(b => <button key={b} type="button" className="chip" aria-pressed={b === brand} onClick={() => setBrand(b)}>{b}</button>)}
            </div>
          </div>
          <div className="cfg">
            <span className="mono">Dimming</span>
            <div className="chips" role="group" aria-label="Dimming">
              {dimmingModes.map(d => <button key={d.key} type="button" className="chip" aria-pressed={d.key === dimMode} onClick={() => setDimMode(d.key)}>{d.label}</button>)}
            </div>
          </div>
          {dimmable && (
            <label className="cfg dimmer">
              <span className="mono">Dim · {level}%</span>
              <input type="range" min={10} max={100} step={5} value={level} onChange={e => setLevel(+e.target.value)} aria-label="Dim level" />
            </label>
          )}
        </div>
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
      <p className="cct-note">Drivers are matched from our listed range by wattage; we confirm the output current for your COB when you enquire.</p>
    </div>
  );
}
