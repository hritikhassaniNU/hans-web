import type { Spec } from "@/data/products";

export type ViewerItem = {
  code: string;
  name: string;
  fig: string;
  href: string;
  rot: [number, number];
  lit: boolean;
  specs: Spec[];
};

export const viewerItems: ViewerItem[] = [
  {
    code: "HE—01", name: "Deep cone spot", fig: "FB deep cone COB spotlight · recessed · 10–12 W size",
    href: "/products/cob-spotlights/fb-deep-cone-spotlight", rot: [0.45, 0.6], lit: true,
    specs: [["Wattage", "3–12 W"], ["Front", "Ø40–59 mm"], ["Height", "55–82 mm"], ["Cut-out", "Ø35–55 mm"], ["Chip", "Cree / Bridgelux"], ["Driver", "Philips · Fulham · Osram"], ["CCT", "2700–6500 K"], ["Warranty", "2 years"]]
  },
  {
    code: "HE—02", name: "Track light", fig: "CHT 008/009 COB track light · 3-wire adaptor",
    href: "/products/track-lights/cht-008-009-track-light", rot: [0.12, 0.65], lit: true,
    specs: [["Wattage", "24 / 36 W"], ["Height", "125 / 140 mm"], ["Track", "3-wire"], ["Chip", "Cree COB"], ["Driver", "Philips · Fulham · Osram"], ["Range", "20–40 W"]]
  },
  {
    code: "HE—03", name: "Up & down", fig: "Up & down COB wall light · 15 + 15 W · IP65",
    href: "/products/wall-architectural/up-down-15-15", rot: [0.1, 0.75], lit: true,
    specs: [["Wattage", "15 + 15 W"], ["Efficacy", "120–140 lm/W"], ["Rating", "IP65"], ["Size", "90 × 190 mm"], ["Chip", "Cree / Bridgelux"], ["Driver", "Philips · Fulham · Osram"], ["CCT", "3000–6500 K"], ["Supply", "Housing, SKD, complete"]]
  },
  {
    code: "HE—04", name: "LED driver", fig: "Fulham 28FE · 28 W DALI-2 DT6 constant-current driver",
    href: "/drivers", rot: [0.62, 0.22], lit: false,
    specs: [["Power", "28 W"], ["Type", "Constant current"], ["Dimming", "DALI-2 DT6"], ["Output", "Set by DIP switch"], ["Also stocked", "Philips Xitanium, Osram Optotronic"]]
  }
];
