// India dispatch map. Coordinates are [longitude, latitude].

// Approximate outline of India as shown on Survey of India maps, traced by hand at
// about half a degree. It only drives the dot pattern, so small errors don't show.
export const indiaOutline: [number, number][] = [
  [68.2, 23.7], [68.8, 24.3], [70.0, 24.6], [71.1, 24.4], [70.6, 25.7], [70.2, 26.5], [69.5, 27.0], [70.4, 28.0],
  [71.9, 27.9], [72.8, 28.9], [73.4, 29.9], [74.5, 30.9], [74.6, 31.9], [75.3, 32.3], [74.4, 32.8], [73.9, 33.6],
  [73.9, 34.4], [74.8, 35.9], [76.0, 36.6], [77.8, 35.5], [79.3, 35.0], [80.2, 35.3], [79.5, 33.0], [78.8, 32.5],
  [79.0, 31.3], [80.3, 30.4], [81.1, 30.0], [80.0, 28.8], [81.9, 27.9], [84.0, 27.4], [85.3, 26.7], [86.9, 26.5],
  [88.1, 26.4], [88.2, 27.9], [88.9, 27.3], [89.8, 26.7], [91.6, 26.8], [91.8, 27.8], [92.5, 27.9], [94.0, 28.7],
  [95.4, 29.3], [96.6, 28.9], [97.3, 28.2], [96.5, 27.2], [95.2, 26.6], [94.7, 25.4], [94.2, 23.8], [93.3, 23.0],
  [93.2, 22.2], [92.6, 21.9], [92.3, 23.6], [91.8, 24.2], [92.2, 24.9], [91.2, 25.2], [90.0, 25.2], [89.8, 25.9],
  [88.7, 26.3], [88.4, 26.0], [88.1, 25.3], [88.0, 24.5], [88.7, 23.6], [88.9, 22.0], [89.0, 21.6], [87.5, 21.6],
  [86.9, 21.0], [86.4, 20.0], [85.1, 19.4], [84.2, 18.4], [82.4, 17.0], [81.3, 16.3], [80.3, 15.8], [80.1, 13.5],
  [79.9, 12.0], [79.8, 10.3], [78.9, 9.3], [78.2, 8.9], [77.5, 8.1], [76.6, 8.9], [76.2, 10.0], [75.7, 11.5],
  [74.8, 12.9], [74.3, 14.5], [73.8, 15.7], [73.4, 16.9], [72.9, 18.9], [72.8, 20.4], [72.6, 21.3], [72.6, 22.2],
  [72.2, 21.7], [71.0, 20.8], [70.0, 21.0], [69.0, 22.3], [69.7, 22.8], [68.9, 23.0]
];

// Andaman & Nicobar Islands, drawn as a short chain of dots.
export const islands: [number, number][] = [
  [92.7, 13.4], [92.8, 12.9], [92.7, 12.4], [92.6, 11.9], [92.6, 11.4], [92.5, 10.8], [93.0, 9.2], [93.6, 8.2]
];

export const works = { name: "Vasai works", at: [72.86, 19.41] as [number, number], label: "19.4° N · 72.9° E" };

// Major cities Hans ships to, grouped by zone for the legend. `side` puts the label
// left of the dot where the right side would crowd a neighbour.
export type City = { name: string; at: [number, number]; side?: "l" };
export const zones: { code: string; name: string; cities: City[] }[] = [
  { code: "R—01", name: "North", cities: [
    { name: "Delhi", at: [77.21, 28.61] },
    { name: "Chandigarh", at: [76.78, 30.73] },
    { name: "Jaipur", at: [75.79, 26.91], side: "l" },
    { name: "Lucknow", at: [80.95, 26.85] }
  ] },
  { code: "R—02", name: "West", cities: [
    { name: "Ahmedabad", at: [72.57, 23.02], side: "l" },
    { name: "Surat", at: [72.83, 21.17], side: "l" },
    { name: "Pune", at: [73.86, 18.52] },
    { name: "Goa", at: [73.83, 15.49], side: "l" }
  ] },
  { code: "R—03", name: "Central", cities: [
    { name: "Indore", at: [75.86, 22.72], side: "l" },
    { name: "Bhopal", at: [77.41, 23.26] },
    { name: "Nagpur", at: [79.09, 21.15] }
  ] },
  { code: "R—04", name: "South", cities: [
    { name: "Hyderabad", at: [78.49, 17.39] },
    { name: "Bengaluru", at: [77.59, 12.97], side: "l" },
    { name: "Chennai", at: [80.27, 13.08] },
    { name: "Kochi", at: [76.27, 9.93], side: "l" }
  ] },
  { code: "R—05", name: "East & North-East", cities: [
    { name: "Kolkata", at: [88.36, 22.57] },
    { name: "Patna", at: [85.14, 25.59] },
    { name: "Bhubaneswar", at: [85.82, 20.3] },
    { name: "Guwahati", at: [91.74, 26.14] }
  ] }
];

export const dispatch = ["Road", "Air", "Cargo", "Sea"];
