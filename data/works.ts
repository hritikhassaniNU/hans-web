export type Station = {
  phase: string;
  name: string;
  tag: string;
  text: string;
  out: string;
  kit: string[];
};

// Each station is drawn from what Hans already states about its process.
// Add `photo` fields here once shop-floor photos are in /public/works.
export const stations: Station[] = [
  {
    phase: "Parts in", name: "Vendor check", tag: "Before an order",
    text: "Every vendor is checked for quality, capacity and on-time delivery before we place an order with them.",
    out: "Approved vendors", kit: ["Quality", "Capacity", "Delivery record"]
  },
  {
    phase: "Parts in", name: "Warehouse", tag: "Vasai East",
    text: "Housings, COB chips, drivers and optics are held at our warehouse in Laxmi Industrial Estate, Vasai East.",
    out: "Parts in stock", kit: ["Housings", "COB chips", "Drivers", "Optics"]
  },
  {
    phase: "Build", name: "Housing", tag: "Body & finish",
    text: "The body is chosen for the job: spot, deep cone, trimless, dome, gimbal, track or outdoor, in white, black or gold.",
    out: "Finished housing", kit: ["Spot", "Deep cone", "Trimless", "Dome", "Gimbal", "Track", "Outdoor"]
  },
  {
    phase: "Build", name: "Light source", tag: "COB",
    text: "A Cree or Bridgelux COB is matched to the wattage and to the heat sink of the housing.",
    out: "Light engine fitted", kit: ["Cree", "Bridgelux"]
  },
  {
    phase: "Build", name: "Driver", tag: "Branded",
    text: "A Philips, Fulham or Osram driver goes in, non-dimmable, phase-cut or DALI.",
    out: "Driver wired", kit: ["Philips", "Fulham", "Osram", "Phase-cut", "DALI"]
  },
  {
    phase: "Build", name: "Optics & colour", tag: "Beam · CCT",
    text: "A reflector or lens sets the beam, such as 24°, 36° or 60° on deep downlights, in 2700 K to 6500 K.",
    out: "Beam and colour set", kit: ["24°", "36°", "60°", "2700–6500 K"]
  },
  {
    phase: "Out", name: "Test & pack", tag: "Complete fitting",
    text: "Complete fittings are assembled, tested and boxed, ready to install. SKD kits and bare housings are packed as parts instead.",
    out: "Boxed fitting or kit", kit: ["Complete", "SKD kit", "Housing only"]
  },
  {
    phase: "Out", name: "Dispatch", tag: "Across India",
    text: "Orders leave Vasai by road, air, cargo or sea, paid online, by RTGS, cheque or DD.",
    out: "Delivered", kit: ["Road", "Air", "Cargo", "Sea"]
  }
];
