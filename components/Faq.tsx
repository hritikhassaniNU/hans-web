"use client";

import Link from "next/link";
import { useState } from "react";
import { faqs } from "@/data/home";

const no = (n: number) => String(n + 1).padStart(2, "0");

export default function Faq() {
  const [open, setOpen] = useState(0);
  const go = (n: number) => {
    setOpen(n);
    document.getElementById(`faq-${n}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return (
    <div className="faq">
      <div className="faq-side">
        <span className="eyebrow"><b>[09]</b><span>FAQ</span></span>
        <h2>Frequently asked <em>questions</em></h2>
        <p>Drivers, chips, kits, delivery and payment. Can’t find your answer?</p>
        <Link className="btn" href="/contact">Talk to our sales team <i aria-hidden="true">→</i></Link>
        <div className="faq-index">
          <span className="mono">Index · {faqs.length} items</span>
          <div>{faqs.map((_, n) => <button key={n} type="button" aria-pressed={n === open} onClick={() => go(n)}>Q{no(n)}</button>)}</div>
        </div>
      </div>
      <ol className="faq-list">
        {faqs.map(([q, a], n) => (
          <li key={q} id={`faq-${n}`} className={n === open ? "open" : undefined}>
            <h3>
              <button type="button" aria-expanded={n === open} aria-controls={`faq-a-${n}`} onClick={() => setOpen(n === open ? -1 : n)}>
                <span className="mono">Q{no(n)}</span>{q}<i aria-hidden="true" />
              </button>
            </h3>
            <div id={`faq-a-${n}`} className="faq-a" role="region" hidden={n !== open}>
              <span className="mono">A{no(n)}</span><p>{a}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
