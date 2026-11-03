"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { applications } from "@/data/home";

const no = (n: number) => String(n + 1).padStart(2, "0");

export default function Applications() {
  const track = useRef<HTMLOListElement>(null);
  // How far the track has scrolled, 0–1. Several cards fit on screen, so the counter follows
  // overall scroll progress rather than the card nearest the left edge, or the last few are unreachable.
  const [p, setP] = useState(0);
  const total = applications.length;
  const i = Math.round(p * (total - 1));

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setP(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { el.removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, []);

  // Drag to scroll with a mouse; touch and trackpads scroll natively.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let x = 0, start = 0, down = false;
    const dn = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; down = true; x = e.clientX; start = el.scrollLeft; el.classList.add("drag"); };
    const mv = (e: PointerEvent) => { if (down) el.scrollLeft = start - (e.clientX - x); };
    const up = () => { down = false; el.classList.remove("drag"); };
    el.addEventListener("pointerdown", dn); addEventListener("pointermove", mv); addEventListener("pointerup", up);
    return () => { el.removeEventListener("pointerdown", dn); removeEventListener("pointermove", mv); removeEventListener("pointerup", up); };
  }, []);

  const go = (n: number) => {
    const el = track.current;
    if (!el) return;
    const k = Math.max(0, Math.min(total - 1, n));
    el.scrollTo({ left: (k / (total - 1)) * (el.scrollWidth - el.clientWidth), behavior: "smooth" });
  };

  return (
    <div className="apps">
      <ol className="apps-track" ref={track}>
        {applications.map((a, n) => (
          <li key={a.name} className={n === i ? "on" : undefined}>
            <span className="apps-no">{no(n)}</span>
            <span className="apps-ref mono">USE—{no(n)}</span>
            <div className="apps-fig">
              <svg viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={a.icon} /></svg>
              <span className="mono">Fig. 06.{no(n)}</span>
            </div>
            <h3>{a.name}</h3>
            <p>{a.text}</p>
            <div className="apps-tags">{a.tags.map(t => <Link key={t} href={a.href}>{t}</Link>)}</div>
          </li>
        ))}
        <li className="apps-more">
          <span className="mono">USE—{no(total)} · Your project</span>
          <h3>Lighting something else?</h3>
          <Link href="/contact">Talk to us <i aria-hidden="true">→</i></Link>
        </li>
      </ol>
      <div className="apps-bar">
        <span className="apps-count"><b>{no(i)}</b><span className="mono">/ {no(total - 1)}<br /><em>{applications[i].name}</em></span></span>
        <span className="apps-line">
          <span className="apps-fill" style={{ width: `${p * 100}%` }} aria-hidden="true" />
          {applications.map((a, n) => (
            <button key={a.name} type="button" className={n < i ? "past" : n === i ? "now" : undefined} style={{ left: `${(n / (total - 1)) * 100}%` }} aria-label={`Show ${a.name}`} aria-current={n === i ? "true" : undefined} onClick={() => go(n)} />
          ))}
        </span>
        <span className="mono apps-drag">↔ Drag</span>
        <button type="button" aria-label="Previous" onClick={() => go(i - 1)} disabled={i === 0}>←</button>
        <button type="button" aria-label="Next" onClick={() => go(i + 1)} disabled={i === total - 1}>→</button>
      </div>
    </div>
  );
}
