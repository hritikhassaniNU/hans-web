import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type Dim = { a: THREE.Object3D; b: THREE.Object3D; text: string };
// A callout: a label pinned to a corner of the stage (x, y as fractions), with a leader line to `at`.
export type Note = { at: THREE.Object3D; text: string; x: number; y: number };

const V = (x: number, y: number) => new THREE.Vector2(Math.max(x, 0.0001), y);

export function makeMaterials() {
  const std = (p: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(p);
  return {
    metal: std({ color: 0xc7cbd0, metalness: 0.85, roughness: 0.3 }),
    shell: std({ color: 0xf1f1ee, metalness: 0.05, roughness: 0.5 }),
    alu: std({ color: 0xd5d8db, metalness: 0.6, roughness: 0.38 }),
    graphite: std({ color: 0x2c3035, metalness: 0.5, roughness: 0.42 }),
    anod: std({ color: 0x3a3e44, metalness: 0.85, roughness: 0.22, side: THREE.DoubleSide }),
    mirror: std({ color: 0xe8e8e8, metalness: 1, roughness: 0.12, side: THREE.DoubleSide }),
    label: std({ color: 0x1f2a33, roughness: 0.7 }),
    accent: std({ color: 0xc23b2b, roughness: 0.5 }),
    glow: std({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1, roughness: 0.4 }),
    beam: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide })
  };
}

type Mats = ReturnType<typeof makeMaterials>;

const lathe = (pts: THREE.Vector2[], m: THREE.Material) => new THREE.Mesh(new THREE.LatheGeometry(pts, 64), m);
function mesh(geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0) {
  const o = new THREE.Mesh(geo, m);
  o.position.set(x, y, z);
  return o;
}
function dim(parent: THREE.Object3D, a: number[], b: number[], text: string, out: Dim[]) {
  const pa = new THREE.Object3D(), pb = new THREE.Object3D();
  pa.position.fromArray(a);
  pb.position.fromArray(b);
  parent.add(pa, pb);
  out.push({ a: pa, b: pb, text });
}

function note(parent: THREE.Object3D, at: number[], text: string, x: number, y: number, out: Note[]) {
  const o = new THREE.Object3D();
  o.position.fromArray(at);
  parent.add(o);
  out.push({ at: o, text, x, y });
}

export type Built = { root: THREE.Group; dims: Dim[]; notes: Note[]; box?: THREE.Box3 };

function deepCone(m: Mats): Built {
  const root = new THREE.Group(), g = new THREE.Group(), dims: Dim[] = [], notes: Note[] = [];
  g.rotation.x = Math.PI / 2;
  root.add(g);
  g.add(lathe([V(23.5, -2.5), V(25.5, 0.5), V(29.5, 0.5), V(29.5, -2), V(26, -4)], m.shell));
  g.add(lathe([V(9.5, -46), V(17, -24), V(24, -2.5)], m.anod));
  const chip = mesh(new THREE.CircleGeometry(9.5, 40), m.glow, 0, -45.8, 0);
  chip.rotation.x = -Math.PI / 2;
  g.add(chip);
  g.add(mesh(new THREE.CylinderGeometry(22, 24, 34, 48), m.alu, 0, -64, 0));
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const fin = mesh(new THREE.BoxGeometry(9, 28, 1.6), m.alu, Math.cos(a) * 26, -66, Math.sin(a) * 26);
    fin.rotation.y = -a;
    g.add(fin);
  }
  g.add(mesh(new THREE.CylinderGeometry(16, 16, 4, 32), m.graphite, 0, -82, 0));
  for (const s of [-1, 1]) {
    const leg = mesh(new THREE.BoxGeometry(1.4, 22, 9), m.metal, s * 26.5, -14, 0);
    leg.rotation.z = -s * 0.25;
    const arm = mesh(new THREE.BoxGeometry(14, 1.4, 9), m.metal, s * 33, -4, 0);
    arm.rotation.z = s * 0.35;
    g.add(leg, arm);
  }
  dim(g, [-29.5, 0, -40], [29.5, 0, -40], "Ø59", dims);
  dim(g, [40, 0, 0], [40, -84, 0], "82", dims);
  note(g, [0, -45.8, 0], "Cree / Bridgelux COB", 0.06, 0.1, notes);
  note(g, [26, -66, 0], "Heat sink", 0.78, 0.8, notes);
  note(g, [-33, -4, 0], "Spring clips", 0.06, 0.78, notes);
  return { root, dims, notes };
}

function track(m: Mats): Built {
  const root = new THREE.Group(), dims: Dim[] = [], notes: Note[] = [];
  root.add(mesh(new THREE.BoxGeometry(260, 12, 34), m.alu, 0, 131, 0));
  root.add(mesh(new THREE.BoxGeometry(92, 26, 30), m.graphite, 0, 112, 0));
  root.add(mesh(new THREE.CylinderGeometry(6, 6, 26, 20), m.graphite, 0, 86, 0));
  const head = new THREE.Group();
  head.position.y = 38;
  head.rotation.x = 0.28;
  const body = mesh(new THREE.CylinderGeometry(36, 36, 112, 48), m.graphite);
  body.rotation.x = Math.PI / 2;
  head.add(body);
  for (let i = 0; i < 7; i++) {
    const fin = mesh(new THREE.CylinderGeometry(39, 39, 2.4, 48), m.graphite, 0, 0, -58 - i * 5.5);
    fin.rotation.x = Math.PI / 2;
    head.add(fin);
  }
  const front = new THREE.Group();
  front.rotation.x = Math.PI / 2;
  front.position.z = 56;
  front.add(lathe([V(28, 0.2), V(36, 0.2)], m.anod));
  front.add(lathe([V(13, -18), V(28, 0)], m.mirror));
  const chip = mesh(new THREE.CircleGeometry(13, 40), m.glow, 0, -17.8, 0);
  chip.rotation.x = -Math.PI / 2;
  front.add(chip);
  head.add(front, mesh(new THREE.BoxGeometry(10, 30, 16), m.graphite, 0, 40, 0));
  root.add(head);
  dim(root, [-150, 2, 0], [-150, 125, 0], "125", dims);
  note(root, [40, 112, 0], "3-wire adaptor", 0.72, 0.1, notes);
  note(front, [0, -17.8, 0], "Cree COB", 0.08, 0.8, notes);
  note(head, [0, 0, -70], "24 / 36 W", 0.76, 0.78, notes);
  return { root, dims, notes };
}

function upDown(m: Mats): Built {
  const root = new THREE.Group(), dims: Dim[] = [], notes: Note[] = [];
  root.add(mesh(new THREE.CylinderGeometry(45, 45, 190, 56), m.graphite));
  for (const s of [-1, 1]) {
    const ring = lathe([V(30, 0), V(45, 0)], m.anod);
    ring.position.y = s * 95.1;
    const lens = mesh(new THREE.CircleGeometry(30, 48), m.glow, 0, s * 94, 0);
    lens.rotation.x = s > 0 ? -Math.PI / 2 : Math.PI / 2;
    const beam = mesh(new THREE.CylinderGeometry(s > 0 ? 120 : 30, s > 0 ? 30 : 120, 240, 48, 1, true), m.beam, 0, s * 215, 0);
    root.add(ring, lens, beam);
  }
  root.add(mesh(new THREE.BoxGeometry(30, 30, 14), m.graphite, 0, 0, -50));
  root.add(mesh(new THREE.BoxGeometry(80, 130, 6), m.shell, 0, 0, -60));
  dim(root, [62, -95, 0], [62, 95, 0], "190", dims);
  dim(root, [-45, 0, 54], [45, 0, 54], "Ø90", dims);
  note(root, [0, 94, 0], "15 W up", 0.08, 0.1, notes);
  note(root, [0, -94, 0], "15 W down", 0.08, 0.82, notes);
  note(root, [32, 40, 32], "IP65 body", 0.76, 0.32, notes);
  return { root, dims, notes, box: new THREE.Box3(new THREE.Vector3(-60, -100, -64), new THREE.Vector3(60, 100, 50)) };
}

// Draws onto a canvas and returns it as a texture, for printed labels.
function printed(w: number, h: number, draw: (c: CanvasRenderingContext2D, w: number, h: number) => void) {
  const cv = document.createElement("canvas");
  cv.width = w; cv.height = h;
  const c = cv.getContext("2d")!;
  draw(c, w, h);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

// Grey bars standing in for the small print on a real label.
function finePrint(c: CanvasRenderingContext2D, x: number, y: number, rows: number, width: number, step = 15) {
  c.fillStyle = "#8a9096";
  for (let r = 0; r < rows; r++) {
    let cx = x;
    const end = x + width * (0.7 + ((r * 37) % 30) / 100);
    while (cx < end) {
      const wd = 10 + ((r * 13 + cx) % 34);
      c.fillRect(cx, y + r * step, Math.min(wd, end - cx), 6);
      cx += wd + 6;
    }
  }
}

const mono = (px: number, weight = 600) => `${weight} ${px}px "JetBrains Mono", Menlo, monospace`;
const sans = (px: number, weight = 800, style = "") => `${style} ${weight} ${px}px "Helvetica Neue", Arial, sans-serif`;

function driverLabels() {
  const top = printed(1600, 400, (c, w, h) => {
    c.fillStyle = "#f4f4f1"; c.fillRect(0, 0, w, h);
    // input / power block on the left
    c.fillStyle = "#111"; c.fillRect(30, 40, 150, 130);
    c.fillStyle = "#fff"; c.font = sans(64); c.textAlign = "center"; c.fillText("28W", 105, 128);
    c.fillStyle = "#111"; c.font = mono(22); c.fillText("CC · DALI", 105, 210);
    finePrint(c, 30, 250, 8, 150, 16);
    // spec column
    c.textAlign = "left";
    finePrint(c, 220, 50, 16, 230, 19);
    // brand and model
    c.fillStyle = "#111"; c.font = sans(118, 900, "italic"); c.fillText("FULHAM", 500, 140);
    c.fillRect(500, 162, 600, 54);
    c.fillStyle = "#fff"; c.font = sans(40, 800); c.fillText("DALI-2 · DT6", 520, 203);
    c.fillStyle = "#111"; c.font = sans(38, 700); c.fillText("CONSTANT CURRENT LED DRIVER", 500, 262);
    c.font = mono(34, 700); c.fillText("MODEL: 28FE 75S", 500, 306);
    c.font = sans(24, 600); c.fillText("OUTPUT CURRENT SET BY DIP SWITCH", 500, 344);
    // barcode
    for (let x = 0, k = 0; x < 300; k++) {
      const bw = 2 + ((k * 7) % 5);
      if (k % 2 === 0) c.fillRect(500 + x, 360, bw, 30);
      x += bw;
    }
    // wiring diagram
    c.strokeStyle = "#111"; c.lineWidth = 3;
    c.strokeRect(1180, 60, 220, 120);
    c.font = mono(24, 700); c.textAlign = "center"; c.fillText("LED", 1290, 112); c.fillText("DRIVER", 1290, 142);
    for (const y of [80, 110, 140, 165]) { c.beginPath(); c.moveTo(1400, y); c.lineTo(1470, y); c.stroke(); }
    for (const y of [95, 145]) { c.beginPath(); c.moveTo(1110, y); c.lineTo(1180, y); c.stroke(); }
    c.textAlign = "left"; c.font = mono(18, 600);
    ["RED +", "BLU −", "VIO DA", "GRY DA"].forEach((t, k) => c.fillText(t, 1478, 86 + k * 28));
    finePrint(c, 1120, 220, 8, 440, 18);
  });
  const side = printed(1600, 240, (c, w, h) => {
    c.fillStyle = "#f4f4f1"; c.fillRect(0, 0, w, h);
    c.fillStyle = "#111"; c.font = mono(30, 700); c.fillText("SUITABLE FOR DRY OR DAMP LOCATIONS", 60, 62);
    finePrint(c, 60, 92, 7, 900, 18);
    c.strokeStyle = "#111"; c.lineWidth = 3; c.strokeRect(1140, 40, 380, 150);
    c.font = mono(26, 700); c.fillText("Tc 75°C MAX", 1170, 92);
    finePrint(c, 1170, 120, 3, 320, 20);
  });
  return { top, side };
}

function wire(points: number[][], radius: number, mat: THREE.Material, tip?: THREE.Material) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 64, radius, 12, false), mat));
  if (tip) {
    const end = curve.getPoint(1), dir = curve.getTangent(1);
    const cu = mesh(new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, 7, 10), tip);
    cu.position.copy(end).addScaledVector(dir, 3.5);
    cu.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    g.add(cu);
  }
  return g;
}

function driver(m: Mats): Built {
  const root = new THREE.Group(), notes: Note[] = [];
  const L = 200, H = 30, D = 44;
  const paint = new THREE.MeshStandardMaterial({ color: 0xf3f3f0, metalness: 0.12, roughness: 0.48 });
  const steel = new THREE.MeshStandardMaterial({ color: 0xdfe1e2, metalness: 0.55, roughness: 0.42, side: THREE.DoubleSide });
  const { top, side } = driverLabels();
  const topMat = new THREE.MeshStandardMaterial({ map: top, roughness: 0.55 });
  const sideMat = new THREE.MeshStandardMaterial({ map: side, roughness: 0.55 });
  const copper = new THREE.MeshStandardMaterial({ color: 0xc8793f, metalness: 0.9, roughness: 0.3 });
  const ins = (color: number) => new THREE.MeshStandardMaterial({ color, roughness: 0.38, metalness: 0.05 });

  // powder-coated case
  root.add(new THREE.Mesh(new RoundedBoxGeometry(L, H, D, 4, 3.2), paint));
  const lt = mesh(new THREE.PlaneGeometry(L * 0.82, D * 0.82), topMat, -10, H / 2 + 0.05, 0);
  lt.rotation.x = -Math.PI / 2;
  const ls = mesh(new THREE.PlaneGeometry(L * 0.82, H * 0.62), sideMat, -10, 0, D / 2 + 0.05);
  root.add(lt, ls);
  // seam where the lid meets the base tray
  root.add(mesh(new THREE.BoxGeometry(L + 0.4, 0.8, D + 0.4), new THREE.MeshStandardMaterial({ color: 0xc9cbcc, roughness: 0.6 }), 0, -H / 2 + 6, 0));

  // base plate with slotted mounting tabs at both ends
  const tab = new THREE.Shape();
  const half = L / 2 + 20, w2 = D / 2 - 6;
  tab.moveTo(-half, -w2); tab.lineTo(half, -w2); tab.lineTo(half, w2); tab.lineTo(-half, w2); tab.lineTo(-half, -w2);
  for (const s of [-1, 1]) {
    const slot = new THREE.Path();
    const cx = s * (half - 9);
    slot.absarc(cx, 0, 3.4, 0, Math.PI * 2, false);
    tab.holes.push(slot);
  }
  const plate = new THREE.Mesh(new THREE.ExtrudeGeometry(tab, { depth: 1.4, bevelEnabled: false }), steel);
  plate.rotation.x = Math.PI / 2;
  plate.position.y = -H / 2 + 0.2;
  root.add(plate);

  // DIP switch block on the lid
  const dip = new THREE.Group();
  dip.position.set(L / 2 - 16, H / 2, 0);
  dip.add(mesh(new THREE.BoxGeometry(14, 2.4, 24), ins(0x1b1d20)));
  for (let i = 0; i < 4; i++) dip.add(mesh(new THREE.BoxGeometry(5, 1.6, 3), ins(i === 1 ? 0xe35604 : 0xf4f4f1), i % 2 ? 2 : -2, 1.6, -7.5 + i * 5));
  root.add(dip);

  // strain-relief grommets and leads
  const rubber = ins(0x16181a);
  const lead = (x: number, z: number, dirX: number, colors: number[], spread: number, lift: number) => {
    const g = mesh(new THREE.CylinderGeometry(5, 5.5, 6, 20), rubber, x + dirX * 3, -2, z);
    g.rotation.z = Math.PI / 2;
    root.add(g);
    colors.forEach((col, k) => {
      const o = (k - (colors.length - 1) / 2) * 3.4;
      const x0 = x + dirX * 5;
      root.add(wire([
        [x0, -2 + o * 0.3, z + o * 0.4],
        [x0 + dirX * 28, 2 + lift * 0.4 + o, z + o * 1.2],
        [x0 + dirX * 62, lift + o * 2.2, z + spread * (k - 1.5) * 0.6],
        [x0 + dirX * 84, lift * 0.4 - 8 + o * 1.5, z + spread * (k - 1.5)],
        [x0 + dirX * 92, lift * 0.1 - 20 + o, z + spread * (k - 1.5) * 1.15]
      ], 1.7, ins(col), copper));
    });
  };
  lead(-L / 2, 0, -1, [0x1d1f22, 0xeeeeea], 10, 14);
  lead(L / 2, 0, 1, [0xc8342f, 0x2f5fb0, 0x6c4aa0, 0x8b9096], 9, 22);

  // anchors for callouts
  const dipAt = new THREE.Object3D(); dipAt.position.set(L / 2 - 16, H / 2 + 2, 0); root.add(dipAt);
  notes.push({ at: dipAt, text: "Output set by DIP switch", x: 0.06, y: 0.1 });
  note(root, [-40, H / 2, 0], "28 W constant current", 0.06, 0.8, notes);
  note(root, [L / 2 + 66, 26, 6], "DALI-2 DT6 dim leads", 0.7, 0.12, notes);
  note(root, [-L / 2 - 11, -H / 2, 0], "Mounting tab", 0.74, 0.8, notes);
  // Framed on the middle of the case so the body fills the stage and the leads run out towards the edges.
  return { root, dims: [], notes,
    box: new THREE.Box3(new THREE.Vector3(-78, -H / 2 - 4, -D / 2), new THREE.Vector3(78, H / 2 + 4, D / 2)) };
}

export const builders = [deepCone, track, upDown, driver];
