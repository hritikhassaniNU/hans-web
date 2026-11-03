import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import LineRun from "@/components/LineRun";
import { SupplyModes } from "@/components/Oem";
import { stations } from "@/data/works";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Manufacturing and assembly",
  description: "How Hans Enterprises builds LED fittings in Vasai East: vendor checks, branded drivers and COB chips, optics, testing and dispatch across India."
};

const fact = (k: string) => site.facts.find(([key]) => key === k)?.[1] ?? "";

export default function ManufacturingPage() {
  const phases = new Set(stations.map(s => s.phase)).size;
  return (
    <>
      <section className="block vault">
        <div className="vhero">
          <div>
            <span className="eyebrow"><b>[01]</b><span>LED fitting assembly · {site.address.locality}</span></span>
            <h1>Fittings built and checked <em>at our own works.</em></h1>
            <p>Each Hans fitting is put together in Vasai from a branded driver, a matched COB chip, the housing and the optics you choose, then tested and boxed before it ships.</p>
            <div className="ctas">
              <Link className="btn solid" href="#line">Run the line <i aria-hidden="true">→</i></Link>
              <Link className="btn" href="/oem">Order to your spec <i aria-hidden="true">→</i></Link>
            </div>
          </div>
          <dl className="bigfacts">
            <div><dt><b>Made</b> Team</dt><dd>{fact("Team").replace(" people", "")}</dd><p>people at the works</p></div>
            <div><dt><b>Since</b> Works</dt><dd>{site.founded}</dd><p>{site.address.lines[1]}</p></div>
            <div><dt><b>Out</b> Dispatch</dt><dd>04</dd><p>{fact("Dispatch")}</p></div>
            <div><dt><b>Range</b> Drivers</dt><dd>150+</dd><p>Philips, Fulham &amp; Osram models</p></div>
          </dl>
        </div>
      </section>

      <section className="block" id="line" aria-labelledby="line-h">
        <SectionHead sheet="02" label="Assembly line" title={<>From parts rack <em>to packed box</em></>} id="line-h">
          The stations a fitting passes through at our Vasai East works, in shop order. Press run, or pick a station.
        </SectionHead>
        <dl className="counts inline">
          <div><dt>Stations</dt><dd>{String(stations.length).padStart(2, "0")}</dd></div>
          <div><dt>Phases</dt><dd>{String(phases).padStart(2, "0")}</dd></div>
          <div><dt>Supply modes</dt><dd>03</dd></div>
        </dl>
        <LineRun />
      </section>

      <section className="block" aria-labelledby="out-h">
        <SectionHead sheet="03" label="What leaves the works" title={<>Three ways <em>to ship</em></>} id="out-h">
          The same parts, packed the way your project or assembly line needs them.
        </SectionHead>
        <SupplyModes />
        <div className="more"><Link href="/brands">See the parts we build with</Link></div>
      </section>
    </>
  );
}
