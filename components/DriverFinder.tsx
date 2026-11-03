"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { drivers, driverBrands, type Driver } from "@/data/drivers";

const squash = (s: string) => s.toLowerCase().replace(/\s+/g, "");

export default function DriverFinder({ initialBrand = "All" }: { initialBrand?: string }) {
  const [brand, setBrand] = useState(initialBrand);
  const [query, setQuery] = useState("");
  const [dimmable, setDimmable] = useState(false);

  const rows = useMemo(() => {
    const q = squash(query);
    return drivers.filter(d => {
      if (brand !== "All" && d.brand !== brand) return false;
      if (dimmable && (d.dimming === undefined || d.dimming === "None")) return false;
      return !q || squash(`${d.brand}${d.model}${d.watts}w${d.output}${d.note ?? ""}`).includes(q);
    });
  }, [brand, query, dimmable]);

  const enquire = (d: Driver) =>
    `/contact?cat=${encodeURIComponent("LED drivers")}&item=${encodeURIComponent(`${d.brand} ${d.model} (${d.output})`)}`;

  return (
    <div className="finder">
      <div className="filters">
        <div>
          <label htmlFor="driver-q">Search model, wattage or current</label>
          <input id="driver-q" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. 700 mA, DALI, 36 W" />
        </div>
        <fieldset>
          <legend>Brand</legend>
          <div className="chips">
            {["All", ...driverBrands].map(b => (
              <button key={b} type="button" className="chip" aria-pressed={brand === b} onClick={() => setBrand(b)}>{b}</button>
            ))}
          </div>
        </fieldset>
        <label className="toggle">
          <input type="checkbox" checked={dimmable} onChange={e => setDimmable(e.target.checked)} /> Dimmable only
        </label>
        <p className="note" aria-live="polite">{rows.length} of {drivers.length} listed drivers shown</p>
      </div>
      <div className="tablewrap">
        <table className="drivers">
          <thead><tr><th>Brand</th><th>Model</th><th>Power</th><th>Output</th><th>Notes</th><th /></tr></thead>
          <tbody>
            {rows.length ? rows.map((d, i) => (
              <tr key={`${d.model}-${d.output}-${i}`}>
                <td className="b">{d.brand}</td>
                <td>{d.model}</td>
                <td className="w">{d.watts} W</td>
                <td className="o">{d.output}</td>
                <td>{d.note && <span className="tag">{d.note}</span>}</td>
                <td><Link className="linkish" href={enquire(d)}>Enquire</Link></td>
              </tr>
            )) : (
              <tr className="empty"><td colSpan={6}>No listed driver matches. Send us the wattage and current and we’ll check stock.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
