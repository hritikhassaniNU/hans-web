export type Driver = {
  brand: "Philips" | "Fulham" | "Osram";
  model: string;
  watts: number;
  output: string;
  note?: string;
  dimming?: "DALI" | "Phase" | "None";
};

export const drivers: Driver[] = [
  { brand: "Philips", model: "Indoor driver 12 W", watts: 12, output: "350 mA" },
  { brand: "Philips", model: "15 W driver", watts: 15, output: "700 mA" },
  { brand: "Philips", model: "Xitanium 17 W", watts: 17, output: "—" },
  { brand: "Philips", model: "Indoor driver 23 W", watts: 23, output: "700 mA" },
  { brand: "Philips", model: "25 W constant current", watts: 25, output: "CC" },
  { brand: "Philips", model: "30 W driver", watts: 30, output: "800 mA" },
  { brand: "Philips", model: "36 W driver", watts: 36, output: "800 mA – 1 A" },
  { brand: "Fulham", model: "8 W driver", watts: 8, output: "700 mA" },
  { brand: "Fulham", model: "8 W IP67", watts: 8, output: "700 mA", note: "IP67" },
  { brand: "Fulham", model: "15 W IP67", watts: 15, output: "700 mA", note: "IP67" },
  { brand: "Fulham", model: "10EE DALI 2–10 W", watts: 10, output: "350 mA", note: "DALI DT6", dimming: "DALI" },
  { brand: "Fulham", model: "10EE DALI 2–10 W", watts: 10, output: "700 mA", note: "DALI DT6", dimming: "DALI" },
  { brand: "Fulham", model: "Workhorse 24DB 600J", watts: 24, output: "600 mA", note: "Round" },
  { brand: "Fulham", model: "Thoroled 25LB", watts: 25, output: "500 mA", note: "Linear · non-dim", dimming: "None" },
  { brand: "Fulham", model: "28FE 75S", watts: 28, output: "DIP switch", note: "DALI-2 DT6", dimming: "DALI" },
  { brand: "Fulham", model: "Workhorse 30EB 800S", watts: 30, output: "800 mA", note: "Linear" },
  { brand: "Fulham", model: "30FB5", watts: 30, output: "700 mA", note: "Flicker-free" },
  { brand: "Fulham", model: "36W-P", watts: 36, output: "850 mA" },
  { brand: "Fulham", model: "Workhorse 45FBE", watts: 45, output: "1050 mA", note: "Compact" },
  { brand: "Fulham", model: "Pony 150ME", watts: 150, output: "48 V CV", note: "Magnetic track" },
  { brand: "Osram", model: "Optotronic OTe 18/220-240/450 PC", watts: 18, output: "450 mA", note: "Phase-dim", dimming: "Phase" },
  { brand: "Osram", model: "Optotronic OTi DALI 15/220-240/1A0 LT2", watts: 15, output: "1 A", note: "DALI", dimming: "DALI" },
  { brand: "Osram", model: "Optotronic OTi DALI 25/220-240/700 LT2", watts: 25, output: "700 mA", note: "DALI", dimming: "DALI" },
  { brand: "Osram", model: "Optotronic OTi DALI 35/220-240/1A0 LT2", watts: 35, output: "1 A", note: "DALI", dimming: "DALI" },
  { brand: "Osram", model: "Optotronic OTe 50/220-240/1A4 CS", watts: 50, output: "1.4 A" },
  { brand: "Osram", model: "Optotronic OT FIT 80/220-240/24 P", watts: 80, output: "24 V CV" }
];

export const driverBrands = ["Philips", "Fulham", "Osram"] as const;
export const brandSlug = (b: string) => b.toLowerCase();
