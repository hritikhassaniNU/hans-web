import { drivers, type Driver } from "@/data/drivers";

// Fittings offered in each scene of the colour-temperature demo. Wattages and beams come
// from data/products.ts; `angle` is only the drawn spread where a product lists no beam.
export type Kind = "spot" | "downlight" | "track" | "gimbal" | "highbay" | "flood";
export type SceneFitting = { slug: string; href: string; name: string; kind: Kind; watts: number[]; beams?: number[]; angle: number };

export const sceneFittings: Record<"dining" | "retail" | "workshop", SceneFitting[]> = {
  dining: [
    { slug: "extra-deep-downlight-12w", href: "/products/cob-downlights/extra-deep-downlight-12w", name: "12 W extra-deep downlight", kind: "downlight", watts: [12], beams: [24, 36, 60], angle: 36 },
    { slug: "fb-deep-cone-spotlight", href: "/products/cob-spotlights/fb-deep-cone-spotlight", name: "FB deep cone spotlight", kind: "spot", watts: [4, 7, 12], angle: 40 },
    { slug: "cob-downlight-25w", href: "/products/cob-downlights/cob-downlight-25w", name: "25 W COB downlight", kind: "downlight", watts: [25], angle: 60 }
  ],
  retail: [
    { slug: "cht-008-009-track-light", href: "/products/track-lights/cht-008-009-track-light", name: "CHT 008/009 track light", kind: "track", watts: [24, 36], angle: 30 },
    { slug: "fb25-track-light", href: "/products/track-lights/fb25-track-light", name: "FB25 track light", kind: "track", watts: [25], angle: 34 },
    { slug: "duke-gimbal", href: "/products/gimbal/duke-gimbal", name: "Duke gimbal", kind: "gimbal", watts: [7, 12, 20], angle: 26 }
  ],
  workshop: [
    { slug: "high-bay-50w", href: "/products/street-outdoor/high-bay-50w", name: "50 W high bay", kind: "highbay", watts: [50], angle: 90 },
    { slug: "economy-flood-light", href: "/products/street-outdoor/economy-flood-light", name: "Economy flood light", kind: "flood", watts: [30, 50], angle: 100 }
  ]
};

export type Dimming = "None" | "Phase" | "DALI";
export const dimmingModes: { key: Dimming; label: string }[] = [
  { key: "None", label: "Non-dim" },
  { key: "Phase", label: "Phase-cut" },
  { key: "DALI", label: "DALI" }
];

// Smallest listed driver of the brand that covers the fitting's wattage with the chosen dimming.
// Matched on wattage only: the output current still has to suit the COB, so we confirm on enquiry.
export function matchDriver(brand: Driver["brand"], watts: number, dim: Dimming): Driver | undefined {
  return drivers
    .filter(d => d.brand === brand && d.watts >= watts && (dim === "None" ? d.dimming === undefined || d.dimming === "None" : d.dimming === dim))
    .sort((a, b) => a.watts - b.watts)[0];
}
