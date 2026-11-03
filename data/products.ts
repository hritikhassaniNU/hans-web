export type Spec = [label: string, value: string];

export type Product = {
  slug: string;
  category: string;
  name: string;
  summary: string;
  specs: Spec[];
  variants?: string[];
};

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  listed?: number;
};

const driverChoice: Spec = ["Driver", "Philips · Fulham · Osram"];
const chip: Spec = ["Chip", "Cree / Bridgelux"];

export const categories: Category[] = [
  { slug: "cob-spotlights", name: "COB spotlights", blurb: "Recessed spots from 3 W to 30 W, including front-openable, trimless and IP65 versions.", listed: 56 },
  { slug: "surface-dome", name: "Surface & dome lights", blurb: "Surface-mounted COB cylinders and dome fittings, single or twin gimbal.", listed: 39 },
  { slug: "cob-downlights", name: "COB downlights", blurb: "Deep and extra-deep downlights in black, gold and rose gold finishes.", listed: 24 },
  { slug: "gimbal", name: "Gimbal multi-head", blurb: "Adjustable square gimbals in one to four heads." },
  { slug: "track-lights", name: "Track lights", blurb: "Three-wire track heads from 20 W to 40 W, plus magnetic track drivers.", listed: 20 },
  { slug: "wall-architectural", name: "Wall & architectural", blurb: "Wall washers and up-and-down facade lights for interiors and exteriors." },
  { slug: "street-outdoor", name: "Street & outdoor", blurb: "Street lights, flood lights, high bays, spike lights and bollards.", listed: 30 },
  { slug: "panels", name: "LED panels", blurb: "Backlit panels for offices, schools and retail.", listed: 15 },
  { slug: "components", name: "Components", blurb: "Philips Fortimo modules, reflectors and parts for assemblers." }
];

export const products: Product[] = [
  {
    slug: "glanza-cob-spotlight", category: "cob-spotlights", name: "Glanza COB spotlight",
    summary: "Front-openable recessed spot, so the light engine can be serviced from below without removing the fitting.",
    specs: [["Wattage", "5–30 W"], ["Type", "Front-openable, recessed"], chip, driverChoice],
    variants: ["5 W", "7 W", "10 W", "12 W", "15 W", "18 W", "20 W", "25 W", "30 W"]
  },
  {
    slug: "glanza-pro-spotlight", category: "cob-spotlights", name: "Glanza Pro spotlight",
    summary: "The updated Glanza body. Details on request.",
    specs: [chip, driverChoice]
  },
  {
    slug: "aqua-ip65-cob-spotlight", category: "cob-spotlights", name: "Aqua IP65 COB spotlight",
    summary: "Sealed spotlight for bathrooms, kitchens, canopies and covered outdoor areas.",
    specs: [["Rating", "IP65"], chip, driverChoice]
  },
  {
    slug: "eco-trimless-spotlight", category: "cob-spotlights", name: "Eco trimless spotlight",
    summary: "Plaster-in spot that sits flush with the ceiling, with no visible trim.",
    specs: [["Mount", "Trimless, plaster-in"], chip, driverChoice]
  },
  {
    slug: "sunflower-cob-spotlight", category: "cob-spotlights", name: "Sunflower COB spotlight",
    summary: "Finned recessed spot for general and accent lighting.",
    specs: [["Wattage", "7 / 12 / 18 W"], chip, driverChoice],
    variants: ["7 W", "12 W", "18 W"]
  },
  {
    slug: "fb-deep-cone-spotlight", category: "cob-spotlights", name: "FB deep cone spotlight",
    summary: "A deeply recessed COB keeps the source out of sight and cuts glare.",
    specs: [["Wattage", "3–12 W"], ["Front", "Ø40 / 40 / 59 mm"], ["Height", "55 / 55 / 82 mm"], ["Cut-out", "Ø35 / 35 / 55 mm"], chip, driverChoice, ["CCT", "2700 / 3000 / 4000 / 6500 K"], ["Warranty", "2 years"]],
    variants: ["3–4 W", "7 W", "10–12 W"]
  },
  {
    slug: "fb-2022-surface", category: "surface-dome", name: "FB 2022 surface light",
    summary: "Surface-mounted COB cylinder for ceilings where recessing isn’t possible.",
    specs: [["Wattage", "7–40 W"], chip, driverChoice],
    variants: ["7 W", "10 W", "12 W", "15 W", "18 W", "20 W", "22 W", "25 W", "30 W", "36 W", "40 W"]
  },
  {
    slug: "dome", category: "surface-dome", name: "Dome",
    summary: "Surface dome fitting. Details on request.",
    specs: [chip, driverChoice]
  },
  {
    slug: "dome-square-snout", category: "surface-dome", name: "Dome square snout",
    summary: "Square-nosed surface dome with a deep recessed source.",
    specs: [["Wattage", "12 W"], ["Finish", "White"], chip, driverChoice]
  },
  {
    slug: "dome-gimbal-12x2", category: "surface-dome", name: "Dome gimbal 12 × 2",
    summary: "Twin-head surface gimbal with heads that aim independently.",
    specs: [["Wattage", "12 W × 2"], ["Finish", "White"], chip, driverChoice]
  },
  {
    slug: "delta-series-downlight", category: "cob-downlights", name: "Delta series COB downlight",
    summary: "Black-bodied downlight with a choice of reflector finish, fitted with a Philips driver.",
    specs: [["Driver", "Philips"], ["Finishes", "Shining black, gold, rose gold"]],
    variants: ["Black / shining black", "Black / gold", "Black / rose gold"]
  },
  {
    slug: "extra-deep-downlight-12w", category: "cob-downlights", name: "12 W COB extra-deep downlight",
    summary: "Extra-deep cone for low glare, with three beam options.",
    specs: [["Wattage", "12 W"], ["Efficacy", "130 lm/W"], ["CRI", "80"], ["Beam", "24° / 36° / 60°"], ["Driver", "Philips"]]
  },
  {
    slug: "cob-downlight-25w", category: "cob-downlights", name: "25 W COB downlight",
    summary: "Higher-output downlight for retail and double-height spaces.",
    specs: [["Wattage", "25 W"], chip, driverChoice]
  },
  {
    slug: "duke-gimbal", category: "gimbal", name: "Duke gimbal",
    summary: "Recessed square gimbal in one to four heads, for retail displays and feature walls.",
    specs: [["Wattage", "7 / 12 / 20 W per head"], ["Mount", "Recessed"], chip, driverChoice, ["Warranty", "2 years"]],
    variants: ["7 W · 55 × 55", "7 W × 2 · 55 × 115", "7 W × 3 · 55 × 175", "7 W × 4 · 115 × 115", "12 W · 75 × 75", "12 W × 2 · 75 × 160", "12 W × 3 · 75 × 240", "12 W × 4 · 150 × 150", "20 W · 95 × 95", "20 W × 2 · 95 × 195"]
  },
  {
    slug: "cht-008-009-track-light", category: "track-lights", name: "CHT 008/009 track light",
    summary: "Three-wire COB track head with a Cree chip and a branded driver.",
    specs: [["Wattage", "20–40 W (24 / 36 W)"], ["Height", "125 / 140 mm"], ["Track", "3-wire"], ["Chip", "Cree COB"], driverChoice]
  },
  {
    slug: "fb25-track-light", category: "track-lights", name: "FB25 track light",
    summary: "Compact 25 W track spot.",
    specs: [["Wattage", "25 W"], chip, driverChoice]
  },
  {
    slug: "cob-track-light", category: "track-lights", name: "COB track light",
    summary: "General-purpose COB track head for shops and galleries.",
    specs: [chip, driverChoice]
  },
  {
    slug: "up-down-15-15", category: "wall-architectural", name: "Up & down 15 + 15 W",
    summary: "Cylindrical wall light that throws beams up and down. Sealed for facades and gate pillars.",
    specs: [["Wattage", "15 + 15 W"], ["Efficacy", "120–140 lm/W"], ["Rating", "IP65"], ["Size", "90 × 190 mm"], ["LED voltage", "36 V"], chip, driverChoice, ["CCT", "3000 / 3500 / 4000 / 5000 / 6500 K"], ["Warranty", "2 years"], ["Supply", "Housing, SKD, complete"]]
  },
  {
    slug: "jazz-wall-washer", category: "wall-architectural", name: "Jazz wall washer",
    summary: "Washes walls evenly with light for lobbies, corridors and facades.",
    specs: [chip, driverChoice]
  },
  {
    slug: "rocket-street-light", category: "street-outdoor", name: "Rocket street light",
    summary: "Pole-top street light for internal roads and campuses.",
    specs: [["Mount", "Pole"]]
  },
  {
    slug: "led-street-light", category: "street-outdoor", name: "LED street light 20–110 W",
    summary: "Street lights for lanes, parking and main roads.",
    specs: [["Wattage", "20 W to 110 W"]],
    variants: ["20 W", "110 W"]
  },
  {
    slug: "sp8-spike-light", category: "street-outdoor", name: "SP8 spike light",
    summary: "Garden spike light for trees, planters and landscape features.",
    specs: [["Wattage", "7–12 W"], ["Mount", "Ground spike"]]
  },
  {
    slug: "economy-flood-light", category: "street-outdoor", name: "Economy series flood light",
    summary: "Flood lights for building fronts, signage and yards.",
    specs: [["Wattage", "30 / 50 W"]],
    variants: ["30 W", "50 W"]
  },
  {
    slug: "high-bay-50w", category: "street-outdoor", name: "50 W high bay",
    summary: "High bay for warehouses and workshops.",
    specs: [["Wattage", "50 W"]]
  },
  {
    slug: "garden-bollard", category: "street-outdoor", name: "Garden bollard",
    summary: "Bollard lights for pathways and driveways.",
    specs: [["Finish", "Black and white"]]
  },
  {
    slug: "backlit-panel", category: "panels", name: "Backlit LED panel",
    summary: "Backlit panel for even, low-glare office lighting.",
    specs: [driverChoice]
  },
  {
    slug: "philips-fortimo", category: "components", name: "Philips Fortimo modules",
    summary: "Philips Fortimo LED disks and line modules for OEM fittings.",
    specs: [["Brand", "Philips"]]
  },
  {
    slug: "darkoo-reflector-dk2245", category: "components", name: "Darkoo reflector DK2245",
    summary: "Aluminium reflector set for small COB spots.",
    specs: [["Beam", "45°"], ["Diameter", "22 mm"], ["Height", "12.8 mm"], ["Material", "Aluminium"], ["Fixing", "Side lock"]]
  }
];

export const getCategory = (slug: string) => categories.find(c => c.slug === slug);
export const getProduct = (category: string, slug: string) =>
  products.find(p => p.category === category && p.slug === slug);
export const productsIn = (category: string) => products.filter(p => p.category === category);
