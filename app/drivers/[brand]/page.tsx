import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionHead from "@/components/SectionHead";
import DriverFinder from "@/components/DriverFinder";
import { driverBrands, brandSlug } from "@/data/drivers";

type Params = { params: { brand: string } };

const blurbs: Record<string, string> = {
  Philips: "Philips constant-current drivers including Xitanium, stocked from 5 W to 150 W for downlights, spots and track lights.",
  Fulham: "Fulham Workhorse and Thoroled drivers, IP67 outdoor drivers, DALI and DALI-2 DT6 dimmable drivers and Pony magnetic track drivers.",
  Osram: "Osram Optotronic drivers: OTe phase-dimmable, OTi DALI and OT FIT constant-voltage."
};

const find = (slug: string) => driverBrands.find(b => brandSlug(b) === slug);

export const dynamicParams = false;
export const generateStaticParams = () => driverBrands.map(b => ({ brand: brandSlug(b) }));

export function generateMetadata({ params }: Params): Metadata {
  const b = find(params.brand);
  return b ? { title: `${b} LED drivers in Vasai and Mumbai`, description: blurbs[b] } : {};
}

export default function BrandPage({ params }: Params) {
  const b = find(params.brand);
  if (!b) notFound();
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/drivers">Drivers</Link><span>/</span><span aria-current="page">{b}</span>
      </nav>
      <section className="block">
        <SectionHead sheet={`D-${b[0]}`} title={`${b} LED drivers`} as="h1">{blurbs[b]}</SectionHead>
        <DriverFinder initialBrand={b} />
      </section>
    </>
  );
}
