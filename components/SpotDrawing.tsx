"use client";

import { useEffect, useRef, useState } from "react";

// FB deep cone spotlight, 10–12 W size: front Ø59, cut-out Ø55, height 82 (data/products.ts).
// Drawn at 2 px per mm. `finish` tints the trim to match the picked housing finish.
// Rounded so server and browser render identical attributes.
const rd = (v: number) => Math.round(v * 100) / 100;
const tints: Record<string, string> = { White: "#f1f1ee", Black: "#2a2d31", Gold: "#c9a45c" };

export default function SpotDrawing({ finish = "White" }: { finish?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const S = 2, cx = 92, cy = 132;
  const r = (mm: number) => (mm / 2) * S;
  const fins = Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2);
  // side elevation: trim at top, body below, x-centred at sx
  const sx = 290, top = 58, trimH = 4 * S, bodyW = 46 * S, h = 82 * S;
  const cone = Math.round(46 * S * 0.62); // depth of the recessed cone below the trim
  const tint = tints[finish] ?? tints.White;

  return (
    <svg ref={ref} className={`drw${on ? " on" : ""}`} viewBox="0 0 400 260" role="img" aria-label="Technical drawing of the FB deep cone spotlight: front Ø59 mm, cut-out Ø55 mm, height 82 mm">
      <defs>
        <pattern id="drw-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" className="hatch" />
        </pattern>
        <radialGradient id="drw-glow"><stop offset="0" stopColor="#ffb46b" stopOpacity=".55" /><stop offset="1" stopColor="#ffb46b" stopOpacity="0" /></radialGradient>
      </defs>

      {/* front view */}
      <g className="cl">
        <line x1={cx - 78} y1={cy} x2={cx + 78} y2={cy} /><line x1={cx} y1={cy - 78} x2={cx} y2={cy + 78} />
      </g>
      {fins.map(a => (
        <line key={a} className="d thin" pathLength={1} x1={rd(cx + Math.cos(a) * r(48))} y1={rd(cy + Math.sin(a) * r(48))} x2={rd(cx + Math.cos(a) * r(64))} y2={rd(cy + Math.sin(a) * r(64))} />
      ))}
      <circle cx={cx} cy={cy} r={r(59)} className="d trim" pathLength={1} style={{ fill: tint }} />
      <circle cx={cx} cy={cy} r={r(59)} className="d" pathLength={1} fill="url(#drw-hatch)" />
      <circle cx={cx} cy={cy} r={r(55)} className="d cut" pathLength={1} />
      <circle cx={cx} cy={cy} r={r(47)} className="d" pathLength={1} />
      <circle cx={cx} cy={cy} r={r(34)} className="d thin" pathLength={1} />
      <circle cx={cx} cy={cy} r={r(19)} className="glow" fill="url(#drw-glow)" />
      <circle cx={cx} cy={cy} r={r(19)} className="d acc" pathLength={1} />
      {[-1, 1].map(s => <rect key={s} className="d" x={s < 0 ? cx - r(59) - 14 : cx + r(59)} y={cy - 5} width="14" height="10" rx="1.5" pathLength={1} />)}

      {/* front view dimensions */}
      <g className="dim">
        <line x1={cx - r(59)} y1={cy - r(59) - 16} x2={cx + r(59)} y2={cy - r(59) - 16} />
        <line x1={cx - r(59)} y1={cy - r(59) - 22} x2={cx - r(59)} y2={cy - 8} className="ext" />
        <line x1={cx + r(59)} y1={cy - r(59) - 22} x2={cx + r(59)} y2={cy - 8} className="ext" />
        <path d={`M ${cx - r(59)} ${cy - r(59) - 16} l 6 -3 v 6 Z M ${cx + r(59)} ${cy - r(59) - 16} l -6 -3 v 6 Z`} className="arrow" />
        <text x={cx} y={cy - r(59) - 21} textAnchor="middle">Ø59 FRONT</text>
        <polyline points={`${cx - r(55) * 0.7},${cy + r(55) * 0.7} ${cx - 70},${cy + 76} ${cx - 92},${cy + 76}`} className="lead" />
        <text x={cx - 92} y={cy + 72}>CUT-OUT Ø55</text>
        <polyline points={`${cx + 12},${cy - 12} ${cx + 52},${cy - 60} ${cx + 84},${cy - 60}`} className="lead acc" />
        <text x={cx + 56} y={cy - 64} className="acc">COB</text>
      </g>

      {/* side elevation */}
      <g className="cl"><line x1={sx} y1={top - 14} x2={sx} y2={top + h + 10} /></g>
      <rect x={sx - r(59)} y={top} width={59 * S} height={trimH} rx="2" className="d trim" pathLength={1} style={{ fill: tint }} />
      <path className="d" pathLength={1} fill="url(#drw-hatch)"
        d={`M ${sx - r(47)} ${top + trimH} L ${sx - r(20)} ${top + trimH + cone} L ${sx + r(20)} ${top + trimH + cone} L ${sx + r(47)} ${top + trimH} Z`} />
      <rect x={sx - bodyW / 2} y={top + trimH + cone} width={bodyW} height={h - trimH - cone - 8} rx="3" className="d" pathLength={1} />
      {Array.from({ length: 7 }, (_, i) => {
        const y = top + trimH + cone + 8 + i * 8;
        return <line key={i} className="d thin" pathLength={1} x1={sx - bodyW / 2 - 6} y1={y} x2={sx + bodyW / 2 + 6} y2={y} />;
      })}
      <rect x={sx - r(32)} y={top + h - 8} width={32 * S} height="8" rx="2" className="d" pathLength={1} />
      <line x1={sx - r(55) - 10} y1={top} x2={sx + r(55) + 10} y2={top} className="ceiling" />

      <g className="dim">
        <line x1={sx + r(59) + 16} y1={top} x2={sx + r(59) + 16} y2={top + h} />
        <line x1={sx + r(59) + 4} y1={top} x2={sx + r(59) + 22} y2={top} className="ext" />
        <line x1={sx + bodyW / 2 + 4} y1={top + h} x2={sx + r(59) + 22} y2={top + h} className="ext" />
        <path d={`M ${sx + r(59) + 16} ${top} l -3 6 h 6 Z M ${sx + r(59) + 16} ${top + h} l -3 -6 h 6 Z`} className="arrow" />
        <text x={sx + r(59) + 24} y={top + h / 2} transform={`rotate(90 ${sx + r(59) + 24} ${top + h / 2})`} textAnchor="middle">H 82</text>
        <text x={sx} y={top - 20} textAnchor="middle">SIDE ELEVATION</text>
        <text x={sx - r(55) - 10} y={top - 6}>CEILING</text>
      </g>
      <text x={cx} y={250} textAnchor="middle" className="cap">FRONT VIEW</text>
      <text x={sx} y={250} textAnchor="middle" className="cap">DIMS IN MM · NTS</text>
    </svg>
  );
}
