import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import DriverFinder from "@/components/DriverFinder";
import { driverBrands, brandSlug } from "@/data/drivers";

export const metadata: Metadata = {
  title: "LED driver finder · Philips, Fulham, Osram",
  description: "Constant-current, constant-voltage and DALI LED drivers from Philips, Fulham and Osram, stocked in Vasai near Mumbai."
};

export default function DriversPage() {
  return (
    <section className="block">
      <SectionHead sheet="D" label="Stocked drivers" title={<>LED <em>drivers</em></>} as="h1">
        Philips drivers from 5 W to 150 W, plus Fulham Workhorse, Thoroled and DALI-2 ranges and Osram Optotronic. Search by wattage or output current, or ask for a rating that isn’t listed.
      </SectionHead>
      <DriverFinder />
      <div className="more" style={{ gap: 22, justifyContent: "flex-start" }}>
        {driverBrands.map(b => <Link key={b} href={`/drivers/${brandSlug(b)}`}>{b} drivers</Link>)}
      </div>
    </section>
  );
}
