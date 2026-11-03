import { drivers } from "@/data/drivers";

export type Brand = {
  mark: string;
  part: string;
  role: string;
  lines: string;
  about: string;
  href: string;
};

const listed = (b: string) => drivers.filter(d => d.brand === b).length;

// Wording stays at "stocked" and "inside our fittings". Don't say "authorised" until it is confirmed.
export const brands: Brand[] = [
  {
    mark: "Philips", part: "LED drivers and Fortimo modules", role: "Drivers",
    lines: `Xitanium and indoor drivers, 5–150 W · ${listed("Philips")} listed`,
    about: "Hans started out distributing Philips LED OEM products. Philips drivers are stocked from 5 W to 150 W and fitted to most of our range.",
    href: "/drivers/philips"
  },
  {
    mark: "Fulham", part: "Constant-current and DALI-2 drivers", role: "Drivers",
    lines: `Workhorse, Thoroled, DALI-2 DT6, Pony · ${listed("Fulham")} listed`,
    about: "Fulham drivers cover our dimmable and IP67 options, including DALI-2 DT6 and magnetic-track supplies.",
    href: "/drivers/fulham"
  },
  {
    mark: "Osram", part: "Optotronic drivers", role: "Drivers",
    lines: `Optotronic OTe, OTi DALI, OT FIT · ${listed("Osram")} listed`,
    about: "Osram Optotronic drivers are stocked for phase-cut and DALI dimming, and for 24 V constant-voltage strips.",
    href: "/drivers/osram"
  },
  {
    mark: "Cree", part: "COB light sources", role: "Chips",
    lines: "COB chips matched to wattage and heat sink",
    about: "Cree COBs are the default light engine in our spotlights and track lights.",
    href: "/products/cob-spotlights"
  },
  {
    mark: "Bridgelux", part: "COB light sources", role: "Chips",
    lines: "COB chips across 2700–6500 K",
    about: "Bridgelux COBs are offered as an alternative light engine across the spotlight, downlight and wall ranges.",
    href: "/products/cob-downlights"
  }
];
