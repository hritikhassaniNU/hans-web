"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createScene } from "./scene";
import { viewerItems } from "./items";

type SceneApi = ReturnType<typeof createScene>;

// Seconds each fitting stays on screen before the viewer moves to the next.
const DWELL = 6;

export default function Viewer() {
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const api = useRef<SceneApi | null>(null);
  const [index, setIndex] = useState(0);
  const [cct, setCct] = useState(3000);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [auto, setAuto] = useState(false);
  const item = viewerItems[index];

  useEffect(() => {
    const stage = stageRef.current, svg = svgRef.current;
    if (!stage || !svg) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAuto(!reduced);
    try {
      api.current = createScene({ stage, svg, reduced });
    } catch {
      setFailed(true);
    }
    // Hold the cycle while the visitor drags the model or the viewer is off screen.
    const down = () => setHeld(true), up = () => setHeld(false);
    stage.addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    const io = new IntersectionObserver(([e]) => setHeld(!e.isIntersecting));
    io.observe(stage);
    return () => {
      api.current?.dispose(); api.current = null;
      stage.removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    api.current?.show(index, item.rot, item.lit);
  }, [index, item]);

  useEffect(() => {
    const rgb = api.current?.setCct(cct);
    if (rgb) document.documentElement.style.setProperty("--glow", rgb);
  }, [cct]);

  const next = () => setIndex(i => (i + 1) % viewerItems.length);
  const playing = auto && !failed;

  return (
    <div className={`viewer${playing ? " auto" : ""}${paused || held ? " held" : ""}`} style={{ ["--dwell" as string]: `${DWELL}s` }}>
      <div className="tabs" role="group" aria-label="Choose a product">
        {viewerItems.map((p, i) => (
          <button key={p.code} type="button" className="tab" aria-pressed={i === index} onClick={() => setIndex(i)}>
            <b>{p.code}</b><span>{p.name}</span>
            {i === index && <i className="prog" key={`${index}`} onAnimationEnd={next} aria-hidden="true" />}
          </button>
        ))}
        {playing && (
          <button type="button" className="tab play" aria-pressed={paused} aria-label={paused ? "Play the product tour" : "Pause the product tour"} onClick={() => setPaused(p => !p)}>
            {paused ? "▶" : "❚❚"}
          </button>
        )}
      </div>
      <div ref={stageRef} className={`stage${item.lit ? "" : " off"}`}>
        <span className="cross tl" /><span className="cross br" />
        {!failed && <span className="hint">Drag to rotate</span>}
        {failed && <p className="fallback">3D preview isn’t available in this browser. The specs below still apply.</p>}
        <svg ref={svgRef} className="dims" aria-hidden="true" />
      </div>
      <dl className="specs">
        {item.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
      <div className="vfoot">
        <p className="cap" key={index}>
          <b>Fig. 0{index + 1}</b> · {item.code} · {item.fig}{item.lit ? " · dims in mm" : ""} · <Link href={item.href}>Details</Link>
        </p>
        {item.lit && (
          <label className="cct">
            CCT
            <input type="range" min={2700} max={6500} step={100} value={cct} onChange={e => setCct(+e.target.value)} aria-label="Colour temperature in kelvin" />
            <output>{cct} K</output>
          </label>
        )}
      </div>
    </div>
  );
}
