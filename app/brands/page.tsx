import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import BrandRegister from "@/components/BrandRegister";
import { brands } from "@/data/brands";
import { drivers } from "@/data/drivers";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Brands and components",
  description: "The Philips, Fulham and Osram drivers and Cree and Bridgelux COB chips stocked by Hans Enterprises and used inside its LED fittings."
};

const records: [string, string][] = [
  ["GSTIN", site.gstin],
  ["Established", String(site.founded)],
  ["Buyer rating", "4.4 / 5 · 47 IndiaMART reviews"],
  ["Works", `${site.address.locality}, ${site.address.district}`]
];

export default function BrandsPage() {
  const driverBrands = brands.filter(b => b.role === "Drivers");
  return (
    <>
      <section className="block vault">
        <div className="vhero">
          <div>
            <span className="eyebrow"><b>[01]</b><span>Brands &amp; components</span></span>
            <h1>Branded parts. <em>Inside every fitting.</em></h1>
            <p>A fitting is only as reliable as its driver. Every Hans light is built around a branded driver and COB chip, and the same parts are stocked in Vasai for assemblers and contractors.</p>
            <div className="ctas">
              <Link className="btn solid" href="#register">Open the register <i aria-hidden="true">→</i></Link>
              <Link className="btn" href="/drivers">Find a driver <i aria-hidden="true">→</i></Link>
            </div>
            <dl className="counts">
              <div><dt>Driver brands</dt><dd>{String(driverBrands.length).padStart(2, "0")}</dd></div>
              <div><dt>Chip brands</dt><dd>{String(brands.length - driverBrands.length).padStart(2, "0")}</dd></div>
              <div><dt>Drivers listed</dt><dd>{drivers.length}</dd></div>
            </dl>
          </div>
          <aside className="card credential">
            <div className="qhead"><span><i className="dot" />Inside every fitting</span><span>Component spec</span></div>
            <div className="cr-body">
              <div>
                <span className="eyebrow"><b>Drivers by</b></span>
                <h2>Philips · Fulham · Osram</h2>
                <p className="mono">Chips · Cree &amp; Bridgelux<br />CCT · 2700 K – 6500 K</p>
              </div>
              <div className="seal" aria-hidden="true">
                <svg viewBox="0 0 48 48"><path d="M24 3 42 13v22L24 45 6 35V13Z" fill="var(--accent)" /><path d="m15 24 6 6 12-13" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <dl className="sc-meta">
              <div><dt>Status</dt><dd><i className="dot" />Stocked in Vasai</dd></div>
              <div><dt>Company</dt><dd>{site.name}</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="block" id="register" aria-labelledby="reg-h">
        <SectionHead sheet="02" label="Component register" title={<>The parts <em>we build with</em></>} id="reg-h">
          Drivers and light sources stocked and fitted by Hans. Prices and stock change often, so ask us for the model you need.
        </SectionHead>
        <BrandRegister />
      </section>

      <section className="block" aria-labelledby="rec-h">
        <SectionHead sheet="03" label="Business records" title={<>On <em>record</em></>} id="rec-h">
          Registration and trade details for vendor onboarding.
        </SectionHead>
        <dl className="records">
          {records.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className={k === "GSTIN" ? "mono" : undefined}>{v}</dd></div>)}
        </dl>
        <div className="more"><a href={site.indiamart} target="_blank" rel="noopener">See Hans on IndiaMART <i aria-hidden="true">→</i></a></div>
      </section>
    </>
  );
}
