"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { dispatch, indiaOutline, islands, works, zones } from "@/data/reach";

const W = 860, H = 820, LON0 = 63.2, LON1 = 98, LAT0 = 6.5, LAT1 = 37.5;
const merc = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const Y0 = merc(LAT1), Y1 = merc(LAT0);
const project = ([lon, lat]: [number, number]): [number, number] =>
  [((lon - LON0) / (LON1 - LON0)) * W, ((Y0 - merc(lat)) / (Y0 - Y1)) * H];

function inside([x, y]: [number, number], poly: [number, number][]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

// Quadratic arc from the works to a destination, bowed to the left of travel.
function arc(a: [number, number], b: [number, number]) {
  const [x1, y1] = a, [x2, y2] = b;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, len = Math.hypot(x2 - x1, y2 - y1);
  const cx = mx + ((y1 - y2) / len) * len * 0.28, cy = my + ((x2 - x1) / len) * len * 0.28 - len * 0.12;
  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, mid: [0.25 * x1 + 0.5 * cx + 0.25 * x2, 0.25 * y1 + 0.5 * cy + 0.25 * y2] as [number, number] };
}

export default function IndiaMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dots = useMemo(() => {
    const poly = indiaOutline.map(project);
    const out: [number, number][] = [];
    for (let y = 6; y < H; y += 13) for (let x = 6; x < W; x += 13) if (inside([x, y], poly)) out.push([x, y]);
    return [...out, ...islands.map(project)];
  }, []);

  const hq = project(works.at);
  const routes = zones.flatMap((z, zi) => z.cities.map(c => ({ ...c, zone: zi, xy: project(c.at), ...arc(hq, project(c.at)) })));
  const cityCount = routes.length;

  return (
    <div className={`reach${on ? " on" : ""}`} ref={ref}>
      <div className="reach-bar mono">
        <span><i className="cross-mark" />Origin · {works.label}</span>
        <span className="hide-sm">Proj. Web Mercator · NTS</span>
        <span className="north">N <b>▲</b></span>
      </div>
      <div className="reach-map">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Map of India with dispatch routes from our works in Vasai">
          <g className="grat" aria-hidden="true">
            {[10, 15, 20, 25, 30, 35].map(l => { const y = project([LON0, l])[1]; return <line key={l} x1="0" x2={W} y1={y} y2={y} />; })}
            {[65, 70, 75, 80, 85, 90, 95].map(l => { const x = project([l, LAT0])[0]; return <line key={l} y1="0" y2={H} x1={x} x2={x} />; })}
          </g>
          <g className="land" aria-hidden="true">
            {dots.map(([x, y], k) => <circle key={k} cx={x} cy={y} r="2.6" />)}
          </g>
          {routes.map((r, k) => (
            <g key={r.name} className={`route${hover === r.zone ? " hot" : hover !== null ? " dim" : ""}`} style={{ ["--d" as string]: `${0.15 + k * 0.07}s` }}>
              <path d={r.d} className="glow" pathLength={1} />
              <path d={r.d} className="line" pathLength={1} />
              <path d={r.d} className="flow" />
              <g className="dest" transform={`translate(${r.xy[0]} ${r.xy[1]})`}>
                <circle r="8" className="ring" /><circle r="3.4" className="core" />
              </g>
              <text className="tag" x={r.xy[0] + (r.side === "l" ? -14 : 14)} y={r.xy[1] + 4} textAnchor={r.side === "l" ? "end" : "start"}>{r.name}</text>
            </g>
          ))}
          <g className="hq" transform={`translate(${hq[0]} ${hq[1]})`}>
            <circle r="18" className="pulse" /><circle r="11" className="ring" /><circle r="5" className="core" />
            {/* label sits out over the Arabian Sea, clear of the routes */}
            <line x1="-12" y1="0" x2="-34" y2="0" />
            <g transform="translate(-182 -26)">
              <rect width="148" height="52" rx="6" />
              <text x="74" y="21" textAnchor="middle" className="hq-name">VASAI WORKS</text>
              <text x="74" y="39" textAnchor="middle">{works.label}</text>
            </g>
          </g>
        </svg>
        <aside className="card reach-legend">
          <div className="qhead"><span>Dispatch network</span><span>{cityCount} cities</span></div>
          <ul>
            {zones.map((z, k) => (
              <li key={z.code} onMouseEnter={() => setHover(k)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(k)} onBlur={() => setHover(null)} tabIndex={0}>
                <span className="mono">{z.code}</span>
                <span><b>{z.name}</b><small>{z.cities.map(c => c.name).join(" · ")}</small></span>
                <i aria-hidden="true">↗</i>
              </li>
            ))}
          </ul>
          <div className="reach-modes"><span className="mono">Dispatch by</span>{dispatch.map(d => <em key={d}>{d}</em>)}</div>
        </aside>
      </div>
    </div>
  );
}
