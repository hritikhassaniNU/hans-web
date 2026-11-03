"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site, waLink } from "@/data/site";

const kinds = [
  { name: "Spotlights", cat: "COB spotlights", watts: "3 – 30 W", fit: "Recessed · trimless · IP65" },
  { name: "Downlights", cat: "COB downlights", watts: "12 – 25 W", fit: "Deep · extra-deep cone" },
  { name: "Track", cat: "Track lights", watts: "20 – 40 W", fit: "3-wire · magnetic" },
  { name: "Outdoor", cat: "Street & outdoor", watts: "7 – 110 W", fit: "Street · flood · spike · bollard" },
  { name: "Drivers", cat: "LED drivers", watts: "5 – 150 W (Philips)", fit: "CC · CV · DALI" }
];
const drivers = ["Philips", "Fulham", "Osram"];

export default function RfqBand() {
  const path = usePathname();
  const [kind, setKind] = useState(kinds[0]);
  const [driver, setDriver] = useState(drivers[0]);
  if (path?.startsWith("/contact")) return null;

  const subject = `${kind.cat} · ${driver} driver`;
  const message = `Hello Hans Enterprises, I’d like a quote for ${kind.cat} with a ${driver} driver.`;

  return (
    <section className="rfqband" aria-labelledby="rfq-h">
      <div className="wrap rfqgrid">
        <div className="rfqcopy">
          <span className="eyebrow light"><b>[RFQ]</b><span>Request for quotation</span></span>
          <h2 id="rfq-h">Ready to light your next project?</h2>
          <p>Share the fitting, wattage and quantity and we’ll reply with prices and stock — standard range, SKD kits or built to your spec.</p>
          <div className="ctas">
            <Link className="btn dark" href={`/contact?cat=${encodeURIComponent(kind.cat)}`}>Request a quote <i aria-hidden="true">→</i></Link>
            <a className="btn ghost" href={`tel:+${site.phone}`}>{site.phoneDisplay}</a>
          </div>
          <p className="tick">Spotlights · Downlights · Track · Outdoor · Drivers — Philips, Fulham and Osram inside</p>
        </div>
        <div className="quick">
          <div className="qhead"><span><i className="dot" />Quick RFQ</span><span>HE / RFQ-01</span></div>
          <dl>
            <div>
              <dt><b>01</b> Product</dt>
              <dd className="chips">
                {kinds.map(k => (
                  <button key={k.name} type="button" className="chip" aria-pressed={k === kind} onClick={() => setKind(k)}>{k.name}</button>
                ))}
              </dd>
            </div>
            <div>
              <dt><b>02</b> Driver</dt>
              <dd className="chips">
                {drivers.map(d => (
                  <button key={d} type="button" className="chip mono" aria-pressed={d === driver} onClick={() => setDriver(d)}>{d}</button>
                ))}
              </dd>
            </div>
            <div><dt><b>03</b> Wattage</dt><dd className="mono">{kind.watts}</dd></div>
            <div><dt><b>04</b> Types</dt><dd className="mono">{kind.fit}</dd></div>
            <div><dt><b>05</b> CCT</dt><dd className="mono">2700 K – 6500 K</dd></div>
          </dl>
          <div className="qfoot">
            <span className="mono">Subject · RFQ — {subject}</span>
            <a className="btn solid" href={waLink(message)} target="_blank" rel="noopener">Send on WhatsApp <i aria-hidden="true">→</i></a>
          </div>
        </div>
      </div>
    </section>
  );
}
