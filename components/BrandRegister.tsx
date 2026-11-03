"use client";

import Link from "next/link";
import { useState } from "react";
import { brands } from "@/data/brands";

export default function BrandRegister() {
  const [i, setI] = useState(0);
  const b = brands[i];
  const no = (n: number) => String(n + 1).padStart(2, "0");
  return (
    <div className="bregister">
      <table className="register">
        <thead><tr><th className="ref">No.</th><th>Mark</th><th>Component</th><th className="count">Role</th></tr></thead>
        <tbody>
          {brands.map((r, n) => (
            <tr key={r.mark} aria-selected={n === i} onMouseEnter={() => setI(n)} onClick={() => setI(n)}>
              <td className="ref">{no(n)}</td>
              <td className="cat"><button type="button" onFocus={() => setI(n)}>{r.mark}</button></td>
              <td className="models">{r.part}<small>{r.lines}</small></td>
              <td className="count">{r.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <aside className="card sheetcard" aria-live="polite">
        <div className="qhead"><span><i className="dot" />HE—BR—{no(i)}</span><span>{no(i)} / {no(brands.length - 1)}</span></div>
        <div className="sc-body">
          <span className="eyebrow"><b>Inside our fittings</b></span>
          <h3>{b.mark}</h3>
          <p className="mono">{b.part}</p>
          <p>{b.about}</p>
        </div>
        <dl className="sc-meta">
          <div><dt>Status</dt><dd><i className="dot" />Stocked in Vasai</dd></div>
          <div><dt>Range</dt><dd>{b.lines}</dd></div>
        </dl>
        <Link className="sc-link" href={b.href}>See the {b.role === "Drivers" ? "drivers" : "fittings"} <i aria-hidden="true">→</i></Link>
      </aside>
      <p className="hoverhint mono">Hover or click a row to pull its sheet</p>
    </div>
  );
}
