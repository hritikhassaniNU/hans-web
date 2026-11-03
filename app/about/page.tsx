import type { Metadata } from "next";
import SectionHead from "@/components/SectionHead";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Hans Enterprises has supplied LED fittings and drivers from Vasai since 1984."
};

const timeline = [
  ["1984", "Hans Enterprises is founded."],
  ["Philips era", "The company distributes Philips LED OEM products: drivers, Fortimo modules and downlights."],
  ["Own range", "It launches Hans fittings built around Philips, Fulham and Osram drivers with Cree and Bridgelux COBs."],
  ["Today", "It operates from Laxmi Industrial Estate, Vasai East, supplying complete fittings, SKD kits and drivers across India."]
];

export default function AboutPage() {
  return (
    <section className="block">
      <SectionHead sheet="A" label="About Hans" title={<>Four decades <em>in Vasai</em></>} as="h1">
        Started in {site.founded} and run today by {site.owner}, Hans Enterprises supplies LED fittings and drivers to offices, homes, contractors and lighting brands.
      </SectionHead>
      <div className="about">
        <div className="text">
          <p>We began by distributing Philips LED OEM products. That work taught us that a fitting is only as reliable as its driver, so when we built our own range we kept branded drivers inside it.</p>
          <p>Every vendor we buy from is checked for quality, capacity and on-time delivery before we place an order. Stock is held at our warehouse in Vasai East and dispatched by road, air, cargo or sea.</p>
        </div>
        <dl className="facts">
          {site.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </div>
      <ol className="timeline">
        {timeline.map(([y, t]) => <li key={y}><b>{y}</b><span>{t}</span></li>)}
      </ol>
    </section>
  );
}
