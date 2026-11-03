import Link from "next/link";
import Sheet from "@/components/Sheet";
import SectionHead from "@/components/SectionHead";
import ProductShowcase from "@/components/ProductShowcase";
import CapabilityIndex from "@/components/CapabilityIndex";
import Applications from "@/components/Applications";
import Faq from "@/components/Faq";
import IndiaMap from "@/components/IndiaMap";
import CctScene from "@/components/CctScene";
import { YearsCard, Datasheet, CctGauge } from "@/components/Numbers";
import JsonLd from "@/components/JsonLd";
import DriverFinder from "@/components/DriverFinder";
import Viewer from "@/components/viewer/LazyViewer";
import { categories } from "@/data/products";
import { faqs } from "@/data/home";
import { site } from "@/data/site";

const now = new Date().getFullYear();
const years = now - site.founded;

const timeline = [
  ["1984", "Hans Enterprises is founded in Vasai."],
  ["Philips era", "Distributes Philips LED OEM products: drivers, Fortimo modules and downlights."],
  ["Own range", "Launches Hans fittings built around Philips, Fulham and Osram drivers."],
  ["Today", "Supplies complete fittings, SKD kits and drivers across India."]
];

const fact = (k: string) => site.facts.find(([key]) => key === k)?.[1] ?? "";
const datasheet: [string, string, string?][] = [
  ["Experience", String(years), "years"],
  ["Team", fact("Team").replace(" people", ""), "people"],
  ["Driver listings", "150", "+"],
  ["Product lines", String(categories.length).padStart(2, "0")],
  ["Buyer rating", "4.4", "/ 5"]
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
};

export default function Home() {
  return (
    <>
      <Sheet>
        <div className="hero">
          <div className="copy">
            <span className="since"><i className="dot" />LED lights &amp; drivers · Vasai, Palghar <em>/</em> Since {site.founded}</span>
            <h1>
              Good light starts <em>at the driver.</em>
            </h1>
            <p className="lede">COB spotlights, downlights, track, wall and street lights, built with <b>Philips, Fulham and Osram</b> drivers and <b>Cree or Bridgelux</b> chips. Supplied as complete fittings, SKD kits or bare housings.</p>
            <div className="ctas">
              <Link className="btn solid" href="/products">Explore products <i aria-hidden="true">→</i></Link>
              <Link className="btn" href="/contact">Request a quote <i aria-hidden="true">→</i></Link>
            </div>
            <div className="inside">
              <p>Inside our fittings</p>
              <ul>{site.inside.map(b => <li key={b}>{b}</li>)}</ul>
            </div>
          </div>
          <Viewer />
        </div>
      </Sheet>

      <dl className="stats">
        <div><dt><b>01</b> Spotlights</dt><dd>3–30<small>W</small></dd><p>Recessed, trimless &amp; IP65</p></div>
        <div><dt><b>02</b> Drivers</dt><dd>150<small>+</small></dd><p>Philips, Fulham &amp; Osram models</p></div>
        <div><dt><b>03</b> Colour</dt><dd>2700–6500<small>K</small></dd><p>Warm white to daylight</p></div>
        <div><dt><b>04</b> Street</dt><dd>20–110<small>W</small></dd><p>Street, flood &amp; high bay</p></div>
        <div className="sign"><dt>{site.name}</dt><Link href="/products">Inspect the range <i aria-hidden="true">↓</i></Link></div>
      </dl>

      <div className="ticker" aria-hidden="true">
        <div>
          {[0, 1].map(n => (
            <span key={n}>
              {["Philips Xitanium drivers", "Fulham Workhorse & DALI-2", "Osram Optotronic", "Cree COB", "Bridgelux COB", "SKD kits", "Housings only", "Delta downlights"].map(t => <b key={t}>{t}</b>)}
            </span>
          ))}
        </div>
      </div>

      <section className="block" aria-labelledby="range-h">
        <SectionHead sheet="02" label="Product register" title={<>Prime <em>products</em></>} id="range-h">
          Indoor and outdoor fittings in warm, neutral and cool white, from 3 W spots to 110 W street lights. Most are offered with a choice of driver brand and colour temperature.
        </SectionHead>
        <dl className="counts inline">
          <div><dt>Lines</dt><dd>{String(categories.length).padStart(2, "0")}</dd></div>
          <div><dt>Wattage</dt><dd className="small">3 – 110 W</dd></div>
          <div><dt>Colour</dt><dd className="small">2700 – 6500 K</dd></div>
        </dl>
        <ProductShowcase />
      </section>

      <section className="block" aria-labelledby="who-h">
        <SectionHead sheet="03" label="Who we are" title={<>Four decades <em>of good light</em></>} id="who-h">
          Hans Enterprises has supplied LED fittings and drivers from Vasai since {site.founded}, to offices, homes, contractors and lighting brands across India.
        </SectionHead>
        <div className="dossier">
          <article className="card">
            <div className="qhead"><span><i className="dot" />Dossier · HE/{site.founded}</span><span>Sheet 01 / 01</span></div>
            <div className="ds-body">
              <span className="eyebrow"><b>Founded in {site.founded} · run today by</b></span>
              <p className="ds-name"><span className="mono">01</span>{site.owner}</p>
              <p>We began by distributing Philips LED OEM products. That taught us a fitting is only as reliable as its driver, so when we built our own range we kept branded drivers inside it.</p>
            </div>
            <dl className="sc-meta four">
              <div><dt>Lines</dt><dd>Fittings · drivers · OEM kits</dd></div>
              <div><dt>Drivers</dt><dd>Philips · Fulham · Osram</dd></div>
              <div><dt>Chips</dt><dd>Cree · Bridgelux</dd></div>
              <div><dt>Works</dt><dd>{site.address.locality}, {site.address.district}</dd></div>
            </dl>
            <div className="qfoot"><span className="mono"><i className="dot" />{site.name}</span><Link href="/about">Our story <i aria-hidden="true">→</i></Link></div>
          </article>
          <figure className="card ds-time">
            <ol>
              {timeline.map(([y, t]) => <li key={y}><b className="mono">{y}</b><span>{t}</span></li>)}
            </ol>
            <figcaption className="mono">Fig. 03 — Four decades in Vasai</figcaption>
          </figure>
        </div>
      </section>

      <section className="block" aria-labelledby="num-h">
        <div className="numbers">
          <div className="nb-main">
            <span className="eyebrow"><b>[04]</b><span>By the numbers</span></span>
            <h2 id="num-h">The scale behind <em>every fitting</em></h2>
            <YearsCard founded={site.founded} />
          </div>
          <div className="nb-side">
            <Datasheet rows={datasheet} />
            <CctGauge />
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="cap-h">
        <SectionHead sheet="05" label="Built to your spec" title={<>Built for good light, <em>backed by branded parts</em></>} id="cap-h">
          Pick each part of the fitting and we put it together, or send you the parts to assemble yourself.
        </SectionHead>
        <CapabilityIndex />
        <div className="more"><Link href="/oem">More on OEM supply</Link></div>
      </section>

      <section className="block" aria-labelledby="cct-h">
        <SectionHead sheet="06" label="Colour temperature" title={<>Warm for the dining table, <em>crisp for the workbench</em></>} id="cct-h">
          The same fitting can be ordered anywhere from 2700 K to 6500 K. Drag the slider, or pick a space, to see how each one looks.
        </SectionHead>
        <CctScene />
      </section>

      <section className="block" aria-labelledby="use-h">
        <SectionHead sheet="07" label="Where our lights go" title={<>Lighting for <em>every space</em></>} id="use-h">
          From a single bathroom spot to a campus of street lights, these are the spaces our fittings are made for.
        </SectionHead>
        <Applications />
      </section>

      <section className="block" aria-labelledby="reach-h">
        <SectionHead sheet="08" label="Dispatch" title={<>Delivering <em>across India</em></>} id="reach-h">
          From our works in Vasai, orders leave by road, air, cargo or sea for nearly every major city in India, from Chandigarh to Kochi and Ahmedabad to Guwahati.
        </SectionHead>
        <IndiaMap />
      </section>

      <section className="block" aria-labelledby="drivers-h">
        <SectionHead sheet="09" label="Stocked drivers" title={<>Driver <em>finder</em></>} id="drivers-h">
          A selection of the constant-current, constant-voltage and DALI drivers we keep. Philips drivers are stocked from 5 W to 150 W. If you don’t see the rating you need, ask us.
        </SectionHead>
        <DriverFinder />
      </section>

      <section className="block" aria-label="Frequently asked questions">
        <Faq />
      </section>
      <JsonLd data={faqLd} />
    </>
  );
}
