import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import { OemSteps, SupplyModes } from "@/components/Oem";
import { waLink } from "@/data/site";

export const metadata: Metadata = {
  title: "OEM, SKD and housing supply",
  description: "LED fittings built to your specification: choose the housing, Cree or Bridgelux COB, Philips, Fulham or Osram driver, optics and colour temperature."
};

export default function OemPage() {
  return (
    <>
      <section className="block">
        <SectionHead sheet="O" label="OEM · SKD supply" title={<>Built to <em>your spec</em></>} as="h1">
          For lighting brands, contractors and assemblers. Choose each part of the fitting and we’ll assemble it, or ship the parts as a kit for your own line.
        </SectionHead>
        <OemSteps />
        <SupplyModes />
      </section>
      <section className="block">
        <SectionHead sheet="O2" label="How to order" title={<>Starting an <em>OEM order</em></>}>
          Send us the fitting type, wattage, driver preference, finish and the quantity you need. We’ll confirm the parts list, price and lead time, and can send a sample before a bulk order.
        </SectionHead>
        <div className="more" style={{ justifyContent: "flex-start", gap: 12, borderTop: 0 }}>
          <a className="btn wa" href={waLink("Hello Hans Enterprises, I’d like to discuss an OEM / SKD order.")} target="_blank" rel="noopener">Discuss on WhatsApp</a>
          <Link className="btn" href="/contact?cat=COB%20spotlights">Send specifications</Link>
        </div>
      </section>
    </>
  );
}
