import { site } from "@/data/site";

// Homepage sections. Every claim here comes from data/products.ts, data/site.ts or the OEM and About copy.

export type Capability = {
  code: string;
  name: string;
  short: string;
  text: string;
  pick: { label: string; options: { key: string; note: string; swatch?: string }[] };
  // Shows the FB deep cone technical drawing beside the card text, tinted by the picked finish.
  drawing?: boolean;
};

export const capabilities: Capability[] = [
  {
    code: "CAP-01", name: "Housing for every ceiling", short: "Spot · deep cone · trimless · track",
    drawing: true,
    text: "Spot, deep cone, trimless, dome, gimbal, track and outdoor bodies, in white, black or gold finishes.",
    pick: { label: "Finish", options: [
      { key: "White", note: "Spot, dome, gimbal and surface bodies", swatch: "#f1f1ee" },
      { key: "Black", note: "Delta downlights, bollards, track heads", swatch: "#1c1e21" },
      { key: "Gold", note: "Gold and rose-gold Delta reflectors", swatch: "#c9a45c" }
    ] }
  },
  {
    code: "CAP-02", name: "Matched COB light source", short: "Cree · Bridgelux",
    text: "Each COB is matched to the wattage and to the heat sink of the housing, so the chip runs cool.",
    pick: { label: "Chip", options: [
      { key: "Cree", note: "Default in spotlights and track lights" },
      { key: "Bridgelux", note: "Offered across spot, downlight and wall ranges" }
    ] }
  },
  {
    code: "CAP-03", name: "Branded driver inside", short: "Philips · Fulham · Osram",
    text: "Non-dimmable, phase-cut or DALI drivers from the brands we have stocked for decades.",
    pick: { label: "Driver", options: [
      { key: "Philips", note: "Xitanium and indoor drivers, 5–150 W" },
      { key: "Fulham", note: "Workhorse, Thoroled, DALI-2 DT6, IP67" },
      { key: "Osram", note: "Optotronic phase-cut, DALI and 24 V CV" }
    ] }
  },
  {
    code: "CAP-04", name: "Optics for the beam you need", short: "24° · 36° · 60°",
    text: "A reflector or lens sets the beam. Deep downlights come in 24°, 36° or 60°.",
    pick: { label: "Beam", options: [
      { key: "24°", note: "Narrow accent on displays and artwork" },
      { key: "36°", note: "Medium beam for general retail lighting" },
      { key: "60°", note: "Wide flood for rooms and corridors" }
    ] }
  },
  {
    code: "CAP-05", name: "Colour from warm to cool", short: "2700 K – 6500 K",
    text: "From warm white for homes and hotels to cool daylight for offices and workshops.",
    pick: { label: "CCT", options: [
      { key: "2700 K", note: "Warm white", swatch: "#ffb46b" },
      { key: "3000 K", note: "Warm white", swatch: "#ffc890" },
      { key: "4000 K", note: "Neutral white", swatch: "#ffe4c4" },
      { key: "5000 K", note: "Cool white", swatch: "#fff6ed" },
      { key: "6500 K", note: "Daylight", swatch: "#e6ecff" }
    ] }
  },
  {
    code: "CAP-06", name: "Supplied the way you build", short: "Complete · SKD · housing",
    text: "Assembled and boxed, shipped as an SKD kit for your own line, or as bare housings and parts.",
    pick: { label: "Supply", options: [
      { key: "Complete", note: "Assembled, tested and boxed, ready to install" },
      { key: "SKD kit", note: "Housing, COB, driver and optics shipped together" },
      { key: "Housing", note: "Bare bodies and reflectors for your own light engine" }
    ] }
  }
];

export type Application = { name: string; text: string; tags: string[]; href: string; icon: string };

// icon: an SVG path in a 120 × 80 box.
export const applications: Application[] = [
  { name: "Offices & schools", text: "Backlit panels and downlights for even, low-glare light over desks and classrooms.", tags: ["Panels", "Downlights"], href: "/products/panels",
    icon: "M10 20h100M20 20v6h80v-6M30 26l-14 44M90 26l14 44M60 26v44" },
  { name: "Retail & galleries", text: "Track heads, gimbals and 25 W downlights for displays, feature walls and double-height stores.", tags: ["Track", "Gimbal"], href: "/products/track-lights",
    icon: "M8 14h104M30 14v10M90 14v10M24 24h12l8 14H16zM84 24h12l8 14H76zM30 38L14 72M30 38l16 34M90 38L74 72M90 38l16 34" },
  { name: "Homes", text: "Spotlights, trimless fittings and IP65 spots for bathrooms, kitchens and covered areas.", tags: ["Spotlights", "IP65"], href: "/products/cob-spotlights",
    icon: "M14 40L60 10l46 30M24 34v38h72V34M50 72V50h20v22M60 22v8M54 30h12M60 30L44 50M60 30l16 20" },
  { name: "Lobbies & facades", text: "Wall washers and sealed up-and-down lights for corridors, gate pillars and building fronts.", tags: ["Wall washer", "IP65"], href: "/products/wall-architectural",
    icon: "M20 8v64M100 8v64M54 30h12v20H54zM60 30L48 8M60 30l12-22M60 50L48 72M60 50l12 22" },
  { name: "Roads & campuses", text: "Pole-top and street lights from 20 W to 110 W for lanes, parking and main roads.", tags: ["Street", "20–110 W"], href: "/products/street-outdoor",
    icon: "M30 74V14h40M62 10h22v8H62zM73 18L52 74M73 18l21 56M10 74h100" },
  { name: "Warehouses & yards", text: "50 W high bays for workshops, and flood lights for yards, signage and building fronts.", tags: ["High bay", "Flood"], href: "/products/street-outdoor",
    icon: "M8 10h104M60 10v8M46 18h28l6 10H40zM44 28L20 74M76 28l24 46M8 74h104" },
  { name: "Gardens & driveways", text: "Spike lights for trees and planters, and bollards along paths and driveways.", tags: ["Spike", "Bollard"], href: "/products/street-outdoor",
    icon: "M24 74V40h12v34M22 36h16v4H22zM30 36L14 20M30 36l16-16M78 74c0-30 10-40 20-46M98 28c4 8 4 20-6 26M70 74h40M8 74h40" },
  { name: "Lighting brands", text: "Your own fittings, built to spec or supplied as SKD kits and housings for your assembly line.", tags: ["OEM", "SKD"], href: "/oem",
    icon: "M14 26h28v28H14zM46 40h10M60 26h28v28H60zM92 40h10M106 30v20M28 26V14M74 26V14M28 54v14M74 54v14" }
];

export const faqs: [string, string][] = [
  ["Which drivers do you use in your fittings?", "Philips, Fulham or Osram, chosen per order. Each is available non-dimmable, phase-cut or DALI, depending on the model."],
  ["Which COB chips do you use?", "Cree or Bridgelux, matched to the wattage and to the heat sink of the housing."],
  ["Can I buy LED drivers on their own?", `Yes. Philips drivers are stocked from 5 W to 150 W, along with Fulham and Osram ranges. Search the driver finder or send us the wattage and current you need.`],
  ["What is an SKD kit?", "A semi-knocked-down kit: housing, COB, driver and optics shipped together so you can assemble the fitting on your own line."],
  ["Do you make fittings to my specification?", "Yes. Send us the fitting type, wattage, driver, finish and quantity. We confirm the parts list, price and lead time, and can send a sample before a bulk order."],
  ["Which colour temperatures are available?", "2700 K to 6500 K, from warm white to cool daylight. Most fittings are offered in several of these."],
  ["What warranty do you give?", "Listed models such as the FB deep cone spotlight, Duke gimbal and Up & down wall light carry a 2-year warranty. Ask us for the terms on other models."],
  ["Where are you, and do you deliver?", `Our works and warehouse are at ${site.address.lines[1]}, ${site.address.locality}. We dispatch across India by road, air, cargo or sea.`],
  ["How can I pay?", "Online transfer, RTGS, cheque or demand draft."],
  ["How do I get a price?", "Prices depend on the wattage, driver and quantity. Send an enquiry or message us on WhatsApp and we’ll reply with prices and stock."]
];
