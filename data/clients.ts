export type Segment = { name: string; buys: string; supply: string; href: string };

// Who Hans supplies, as stated on the About page.
export const segments: Segment[] = [
  { name: "Lighting brands", buys: "Fittings under their own name, SKD kits and bare housings", supply: "OEM · SKD", href: "/oem" },
  { name: "Assemblers", buys: "Drivers, COB chips, reflectors and Philips Fortimo modules", supply: "Components", href: "/products/components" },
  { name: "Contractors", buys: "Spotlights, downlights, track and street lights by the project", supply: "Complete fittings", href: "/products" },
  { name: "Offices & retail", buys: "Panels, downlights, track and spot lighting", supply: "Complete fittings", href: "/products/panels" },
  { name: "Homes", buys: "Spotlights, trimless and IP65 fittings, wall lights", supply: "Complete fittings", href: "/products/cob-spotlights" }
];

// Named clients for the logo wall. Leave empty until each client has agreed to be listed;
// the wall is hidden while this is empty. Logos go in /public/clients/<file>.
export const clients: { name: string; logo?: string }[] = [];
