// Furniture and props for the colour-temperature scenes (900 × 420 viewBox).
// Surfaces use the shared gradients defined in CctScene; `.hl` edges pick up the light colour.

export function SceneDefs() {
  return (
    <>
      <linearGradient id="pr-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5d646d" /><stop offset="1" stopColor="#2f3338" /></linearGradient>
      <linearGradient id="pr-side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2f3338" /><stop offset=".55" stopColor="#4d535b" /><stop offset="1" stopColor="#2a2e33" /></linearGradient>
      <linearGradient id="pr-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6e5a48" /><stop offset="1" stopColor="#3d3129" /></linearGradient>
      <linearGradient id="pr-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffffff" stopOpacity=".05" /><stop offset=".4" stopColor="#ffffff" stopOpacity=".22" /><stop offset="1" stopColor="#ffffff" stopOpacity=".04" /></linearGradient>
      <radialGradient id="pr-plate" cx=".5" cy=".4" r=".6"><stop offset="0" stopColor="#d9dcdf" /><stop offset=".7" stopColor="#a9aeb4" /><stop offset="1" stopColor="#7d838a" /></radialGradient>
      <radialGradient id="pr-fruit" cx=".35" cy=".3" r=".7"><stop offset="0" stopColor="#d9884a" /><stop offset="1" stopColor="#7a3f1c" /></radialGradient>
      <radialGradient id="pr-apple" cx=".35" cy=".3" r=".7"><stop offset="0" stopColor="#a8423a" /><stop offset="1" stopColor="#4d1a17" /></radialGradient>
      <radialGradient id="pr-leaf" cx=".4" cy=".3" r=".8"><stop offset="0" stopColor="#5c7a52" /><stop offset="1" stopColor="#253522" /></radialGradient>
      <filter id="pr-soft" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur stdDeviation="3" /></filter>
    </>
  );
}

// Soft contact shadow under an object sitting on a surface.
const Shadow = ({ cx, cy, rx }: { cx: number; cy: number; rx: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.14} className="pr-shadow" filter="url(#pr-soft)" />
);

function Chair({ x, flip }: { x: number; flip?: boolean }) {
  const s = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} 0) scale(${s} 1)`}>
      <path d="M 0 380 V 232 q 0 -8 8 -8 h 4 q 6 0 6 8 V 312" className="pr-frame" />
      <path d="M 4 246 h 10 M 4 270 h 10" className="pr-frame thin" />
      <path d="M -2 312 H 56 q 6 0 6 6 v 4 H -2 Z" fill="url(#pr-wood)" />
      <path d="M -2 312 H 56" className="hl" />
      <path d="M 4 322 V 380 M 54 322 V 380" className="pr-frame" />
    </g>
  );
}

function Plate({ cx }: { cx: number }) {
  return (
    <g>
      <Shadow cx={cx} cy={266} rx={40} />
      <ellipse cx={cx} cy={262} rx={38} ry={6.5} fill="url(#pr-plate)" />
      <ellipse cx={cx} cy={261.5} rx={25} ry={4} className="pr-plate-well" />
      <path d={`M ${cx - 36} 261 q ${36} -8 72 0`} className="hl" />
      {/* fork and knife */}
      <path d={`M ${cx - 52} 264 h 8 M ${cx - 46} 262 v 4`} className="pr-metal" />
      <path d={`M ${cx + 44} 264 h 12`} className="pr-metal" />
    </g>
  );
}

function WineGlass({ x }: { x: number }) {
  return (
    <g>
      <Shadow cx={x} cy={266} rx={10} />
      <path d={`M ${x - 9} 224 q -1 16 9 20 q 10 -4 9 -20 Z`} fill="url(#pr-glass)" className="pr-glass" />
      <path d={`M ${x - 7.5} 236 q 1 7 7.5 8.5 q 6.5 -1.5 7.5 -8.5 Z`} className="pr-wine" />
      <path d={`M ${x} 244 V 262 M ${x - 8} 264 h 16`} className="pr-glass" />
      <path d={`M ${x - 6} 226 q -1 8 2 13`} className="hl thin" />
    </g>
  );
}

function FruitBowl({ cx }: { cx: number }) {
  return (
    <g>
      <Shadow cx={cx} cy={266} rx={34} />
      <circle cx={cx - 12} cy={238} r={10} fill="url(#pr-fruit)" />
      <circle cx={cx + 11} cy={237} r={11} fill="url(#pr-apple)" />
      <circle cx={cx} cy={230} r={9.5} fill="url(#pr-fruit)" />
      <path d={`M ${cx + 11} 226 q 2 -5 6 -6`} className="pr-stem" />
      <path d={`M ${cx - 30} 242 h 60 q -4 20 -30 22 q -26 -2 -30 -22 Z`} fill="url(#pr-body)" />
      <path d={`M ${cx - 30} 242 h 60`} className="hl" />
      <path d={`M ${cx - 8} 264 h 16`} className="pr-frame thin" />
    </g>
  );
}

function Carafe({ x }: { x: number }) {
  return (
    <g>
      <Shadow cx={x} cy={266} rx={14} />
      <path d={`M ${x - 5} 214 h 10 v 12 q 10 8 10 22 v 10 q 0 6 -6 6 h -18 q -6 0 -6 -6 v -10 q 0 -14 10 -22 Z`} fill="url(#pr-glass)" className="pr-glass" />
      <path d={`M ${x - 13} 244 h 26 v 14 q 0 4 -4 4 h -18 q -4 0 -4 -4 Z`} className="pr-water" />
      <path d={`M ${x - 9} 232 q -3 10 -2 26`} className="hl thin" />
    </g>
  );
}

export function DiningProps() {
  return (
    <g className="props">
      <Chair x={196} />
      <Chair x={704} flip />
      {/* table */}
      <path d="M 252 266 H 648 l -6 9 H 258 Z" fill="url(#pr-wood)" />
      <path d="M 252 266 H 648" className="hl" />
      <path d="M 282 275 L 276 380 M 618 275 L 624 380 M 300 275 L 304 360 M 600 275 L 596 360" className="pr-frame" />
      <Plate cx={360} />
      <Plate cx={540} />
      <WineGlass x={410} />
      <WineGlass x={590} />
      <FruitBowl cx={460} />
      <Carafe x={500} />
    </g>
  );
}

function Books({ x, y }: { x: number; y: number }) {
  const spines = [[0, 34, "#5a4636"], [9, 40, "#3e4a57"], [19, 30, "#5d3b38"], [27, 37, "#4a5246"], [37, 28, "#5b5f66"]] as const;
  return (
    <g>
      {spines.map(([dx, h, c], i) => (
        <g key={i}>
          <rect x={x + dx} y={y - h} width={i === 4 ? 12 : 8} height={h} rx="1" fill={c} />
          <path d={`M ${x + dx + 1} ${y - h + 6} h ${i === 4 ? 10 : 6} M ${x + dx + 1} ${y - 7} h ${i === 4 ? 10 : 6}`} className="pr-band" />
        </g>
      ))}
      <path d={`M ${x} ${y - 40} h 49`} className="hl thin" />
    </g>
  );
}

function Handbag({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Shadow cx={x + 24} cy={y} rx={28} />
      <path d={`M ${x + 12} ${y - 34} q 12 -24 24 0`} className="pr-strap" />
      <path d={`M ${x + 4} ${y - 34} h 40 l 4 34 h -48 Z`} fill="url(#pr-wood)" />
      <path d={`M ${x + 4} ${y - 34} h 40`} className="hl" />
      <path d={`M ${x + 6} ${y - 22} h 36`} className="pr-band" />
      <rect x={x + 21} y={y - 26} width="6" height="5" rx="1" className="pr-clasp" />
    </g>
  );
}

function Perfume({ x, y, h, w }: { x: number; y: number; h: number; w: number }) {
  return (
    <g>
      <Shadow cx={x + w / 2} cy={y} rx={w * 0.7} />
      <rect x={x} y={y - h} width={w} height={h} rx="3" fill="url(#pr-glass)" className="pr-glass" />
      <rect x={x + 2} y={y - h * 0.62} width={w - 4} height={h * 0.62 - 2} rx="2" className="pr-amber" />
      <rect x={x + w / 2 - 4} y={y - h - 8} width="8" height="8" rx="1.5" className="pr-clasp" />
      <path d={`M ${x + 3} ${y - h + 3} v ${h * 0.5}`} className="hl thin" />
    </g>
  );
}

function Vase({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Shadow cx={x} cy={y} rx={16} />
      <path d={`M ${x - 2} ${y - 70} q -6 -16 -18 -22 M ${x + 2} ${y - 70} q 4 -20 16 -28 M ${x} ${y - 70} v -26`} className="pr-stem" />
      <ellipse cx={x - 20} cy={y - 93} rx="8" ry="5" fill="url(#pr-leaf)" transform={`rotate(-30 ${x - 20} ${y - 93})`} />
      <ellipse cx={x + 18} cy={y - 99} rx="8" ry="5" fill="url(#pr-leaf)" transform={`rotate(30 ${x + 18} ${y - 99})`} />
      <circle cx={x} cy={y - 98} r="6" className="pr-bloom" />
      <path d={`M ${x - 6} ${y - 70} h 12 q 0 10 8 22 q 6 12 0 26 q -4 8 -14 8 q -10 0 -14 -8 q -6 -14 0 -26 q 8 -12 8 -22 Z`} fill="url(#pr-side)" />
      <path d={`M ${x - 6} ${y - 70} h 12`} className="hl" />
    </g>
  );
}

function Plant({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Shadow cx={x} cy={y} rx={14} />
      {[[-12, -30, -40], [10, -32, 35], [0, -40, 0], [-6, -24, -70], [8, -22, 70]].map(([dx, dy, rot], i) => (
        <ellipse key={i} cx={x + dx} cy={y + dy} rx="5" ry="12" fill="url(#pr-leaf)" transform={`rotate(${rot} ${x + dx} ${y + dy})`} />
      ))}
      <path d={`M ${x - 12} ${y - 16} h 24 l -3 16 h -18 Z`} fill="url(#pr-body)" />
      <path d={`M ${x - 12} ${y - 16} h 24`} className="hl" />
    </g>
  );
}

export function RetailProps({ track }: { track: boolean }) {
  return (
    <g className="props">
      {track && <rect x="180" y="58" width="540" height="6" rx="2" className="fit" />}
      {/* display unit: two shelves */}
      <path d="M 360 300 H 680 v 6 H 360 Z" fill="url(#pr-wood)" />
      <path d="M 360 300 H 680" className="hl" />
      <path d="M 460 230 H 610 v 5 H 460 Z" fill="url(#pr-wood)" />
      <path d="M 460 230 H 610" className="hl" />
      <path d="M 380 306 V 380 M 660 306 V 380 M 470 235 V 300 M 600 235 V 300" className="pr-frame" />
      <Handbag x={382} y={300} />
      <Perfume x={446} y={300} w={18} h={30} />
      <Perfume x={468} y={300} w={14} h={22} />
      <Books x={540} y={300} />
      <Vase x={636} y={300} />
      <Books x={472} y={230} />
      <Plant x={570} y={230} />
    </g>
  );
}

function Toolbox({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Shadow cx={x + 36} cy={y} rx={40} />
      <path d={`M ${x + 22} ${y - 34} v -8 h 28 v 8`} className="pr-strap" />
      <rect x={x} y={y - 34} width="72" height="34" rx="3" className="pr-red" />
      <path d={`M ${x} ${y - 22} h 72`} className="pr-band dark" />
      <rect x={x + 10} y={y - 26} width="7" height="6" rx="1" className="pr-clasp" />
      <rect x={x + 55} y={y - 26} width="7" height="6" rx="1" className="pr-clasp" />
      <path d={`M ${x} ${y - 34} h 72`} className="hl" />
    </g>
  );
}

function Drill({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Shadow cx={x + 18} cy={y} rx={24} />
      <rect x={x + 4} y={y - 10} width="30" height="10" rx="3" fill="url(#pr-body)" />
      <path d={`M ${x + 12} ${y - 10} l 4 -20 h 10 l -2 20 Z`} className="pr-amber-solid" />
      <rect x={x + 6} y={y - 46} width="40" height="16" rx="5" className="pr-amber-solid" />
      <rect x={x + 46} y={y - 42} width="8" height="8" rx="1" fill="url(#pr-body)" />
      <path d={`M ${x + 54} ${y - 38} h 12`} className="pr-metal" />
      <path d={`M ${x + 8} ${y - 46} h 36`} className="hl" />
    </g>
  );
}

function Mug({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Shadow cx={x + 10} cy={y} rx={13} />
      <path d={`M ${x + 20} ${y - 20} q 9 0 9 7 q 0 7 -9 7`} className="pr-strap" />
      <rect x={x} y={y - 24} width="20" height="24" rx="3" fill="url(#pr-side)" />
      <path d={`M ${x} ${y - 24} h 20`} className="hl" />
    </g>
  );
}

export function WorkshopProps() {
  return (
    <g className="props">
      {/* pegboard with hanging tools */}
      <rect x="120" y="120" width="190" height="130" rx="4" className="board" />
      {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={138 + (i % 6) * 31} cy={138 + Math.floor(i / 6) * 25} r="2" className="hole" />)}
      <path d="M 150 140 v 62 M 140 140 h 20 v 12 h -20 Z" className="pr-tool" />
      <path d="M 190 140 l 6 0 l 4 6 v 56 h -8 v -56 Z" className="pr-tool" />
      <path d="M 232 140 v 40 M 226 180 h 12 l -2 26 h -8 Z" className="pr-tool" />
      <path d="M 262 146 a 10 10 0 1 1 14 0 l -3 3 v 52 h -8 v -52 Z" className="pr-tool" />
      {/* bench */}
      <path d="M 296 290 H 704 v 10 H 296 Z" fill="url(#pr-wood)" />
      <path d="M 296 290 H 704" className="hl" />
      <path d="M 316 300 V 380 M 684 300 V 380 M 316 342 H 684" className="pr-frame" />
      <rect x="330" y="350" width="70" height="30" rx="3" fill="url(#pr-body)" />
      <rect x="600" y="352" width="60" height="28" rx="3" fill="url(#pr-body)" />
      <Toolbox x={338} y={290} />
      <Drill x={452} y={290} />
      <path d="M 540 290 h 70 v -8 h -70 Z" fill="url(#pr-wood)" />
      <path d="M 540 282 h 70" className="hl thin" />
      <Mug x={640} y={290} />
    </g>
  );
}
