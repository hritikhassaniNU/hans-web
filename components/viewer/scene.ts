import * as THREE from "three";
import { builders, makeMaterials, type Dim, type Note } from "./models";
import { kelvinToRgb } from "./kelvin";

type Opts = { stage: HTMLElement; svg: SVGSVGElement; reduced: boolean };

export function createScene({ stage, svg, reduced }: Opts) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  stage.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0.3, 8);
  camera.lookAt(0, 0, 0);

  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(3, 5, 4);
  const rim = new THREE.DirectionalLight(0xdfe8ff, 1.4);
  rim.position.set(-4, 2, -3);
  const bloom = new THREE.PointLight(0xffffff, 4, 6, 1);
  bloom.position.set(0, 0.2, 1.5);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x3a4048, 2.2), key, rim, bloom);

  const mats = makeMaterials();
  const pivot = new THREE.Group();
  scene.add(pivot);

  const models = builders.map(build => {
    const { root, dims, notes, box: preset } = build(mats);
    const holder = new THREE.Group();
    holder.add(root);
    const box = preset ?? new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    holder.scale.setScalar(2.5 / Math.max(size.x, size.y, size.z));
    root.position.sub(box.getCenter(new THREE.Vector3()));
    holder.visible = false;
    pivot.add(holder);
    return { holder, dims, notes };
  });

  const rot = { x: 0, y: 0, tx: 0, ty: 0 };
  let current = -1, pop = 1, w = 1, h = 1;
  let dimEls: { d: Dim; line: SVGLineElement; t1: SVGLineElement; t2: SVGLineElement; text: SVGTextElement }[] = [];
  let noteEls: { n: Note; box: HTMLSpanElement; lead: SVGLineElement; ring: SVGCircleElement; w: number; h: number }[] = [];
  let shownAt = 0;

  const ns = "http://www.w3.org/2000/svg";
  function show(i: number, preset: [number, number], lit: boolean) {
    if (i === current) return;
    if (current >= 0) models[current].holder.visible = false;
    current = i;
    models[i].holder.visible = true;
    bloom.intensity = lit ? 4 : 0;
    rot.tx = preset[0];
    rot.ty = preset[1];
    if (reduced) { rot.x = rot.tx; rot.y = rot.ty; } else pop = 0.82;
    svg.replaceChildren();
    stage.querySelectorAll(".callout").forEach(el => el.remove());
    shownAt = performance.now();
    dimEls = models[i].dims.map(d => {
      const mk = <K extends "line" | "text">(tag: K) => svg.appendChild(document.createElementNS(ns, tag)) as SVGElementTagNameMap[K];
      const text = mk("text");
      const el = { d, line: mk("line"), t1: mk("line"), t2: mk("line"), text };
      text.textContent = d.text;
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      return el;
    });
    noteEls = models[i].notes.map((n, k) => {
      const box = document.createElement("span");
      box.className = "callout";
      box.textContent = n.text;
      box.style.left = `${n.x * 100}%`;
      box.style.top = `${n.y * 100}%`;
      box.style.animationDelay = `${(reduced ? 0 : 450 + k * 140)}ms`;
      stage.append(box);
      const lead = svg.appendChild(document.createElementNS(ns, "line"));
      lead.setAttribute("class", "lead");
      const ring = svg.appendChild(document.createElementNS(ns, "circle"));
      ring.setAttribute("class", "ring");
      ring.setAttribute("r", "5");
      return { n, box, lead, ring, w: box.offsetWidth, h: box.offsetHeight };
    });
  }

  function setCct(k: number) {
    const [r, g, b] = kelvinToRgb(k);
    const col = new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
    mats.glow.emissive.copy(col);
    mats.beam.color.copy(col);
    bloom.color.copy(col);
    return `${r}, ${g}, ${b}`;
  }

  function resize() {
    for (const el of noteEls) { el.w = el.box.offsetWidth; el.h = el.box.offsetHeight; }
    w = stage.clientWidth;
    h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w / h < 1 ? (8 / (w / h)) * 0.85 : 8;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(stage);

  let dragging = false, lx = 0, ly = 0, idleAt = 0, onScreen = true;
  const down = (e: PointerEvent) => {
    dragging = true; lx = e.clientX; ly = e.clientY;
    stage.setPointerCapture(e.pointerId);
    stage.classList.add("grabbing");
  };
  const move = (e: PointerEvent) => {
    if (!dragging) return;
    rot.ty += (e.clientX - lx) * 0.009;
    rot.tx = Math.max(-0.9, Math.min(0.9, rot.tx + (e.clientY - ly) * 0.006));
    lx = e.clientX; ly = e.clientY;
  };
  const up = () => { dragging = false; idleAt = performance.now(); stage.classList.remove("grabbing"); };
  stage.addEventListener("pointerdown", down);
  stage.addEventListener("pointermove", move);
  stage.addEventListener("pointerup", up);
  stage.addEventListener("pointercancel", up);
  const io = new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; });
  io.observe(stage);

  const tmp = new THREE.Vector3();
  const toScreen = (o: THREE.Object3D): [number, number] => {
    o.getWorldPosition(tmp).project(camera);
    return [((tmp.x + 1) / 2) * w, ((1 - tmp.y) / 2) * h];
  };
  const attrs = (n: Element, a: Record<string, number>) => { for (const k in a) n.setAttribute(k, a[k].toFixed(1)); };

  let raf = 0;
  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (!onScreen) return;
    if (!reduced && !dragging && now - idleAt > 1800) rot.ty += 0.0035;
    rot.x += (rot.tx - rot.x) * 0.12;
    rot.y += (rot.ty - rot.y) * 0.12;
    pivot.rotation.set(rot.x, rot.y, 0);
    pop += (1 - pop) * 0.14;
    pivot.scale.setScalar(pop);
    renderer.render(scene, camera);
    // Draw-in: dimensions over ~0.9 s after a model appears, each callout leader shortly after.
    const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
    const since = reduced ? 1e6 : now - shownAt;
    const pd = ease((since - 250) / 900);
    for (const el of dimEls) {
      const [x1, y1] = toScreen(el.d.a), [x2, y2] = toScreen(el.d.b);
      const len = Math.hypot(x2 - x1, y2 - y1) || 1;
      const nx = -(y2 - y1) / len, ny = (x2 - x1) / len, f = ny > 0 ? -1 : 1;
      attrs(el.line, { x1, y1, x2, y2 });
      attrs(el.t1, { x1: x1 - nx * 5, y1: y1 - ny * 5, x2: x1 + nx * 5, y2: y1 + ny * 5 });
      attrs(el.t2, { x1: x2 - nx * 5, y1: y2 - ny * 5, x2: x2 + nx * 5, y2: y2 + ny * 5 });
      attrs(el.text, { x: (x1 + x2) / 2 + nx * 14 * f, y: (y1 + y2) / 2 + ny * 14 * f });
      el.line.style.strokeDasharray = `${len * pd} ${len}`;
      el.t1.style.opacity = el.t2.style.opacity = el.text.style.opacity = String(pd);
    }
    noteEls.forEach((el, k) => {
      const [px, py] = toScreen(el.n.at);
      const bx = el.n.x * w, by = el.n.y * h;
      // Leader starts at the point on the label box nearest the anchor.
      const sx = Math.min(Math.max(px, bx), bx + el.w), sy = Math.min(Math.max(py, by), by + el.h);
      const pl = ease((since - 500 - k * 140) / 700);
      attrs(el.lead, { x1: px, y1: py, x2: px + (sx - px) * pl, y2: py + (sy - py) * pl });
      attrs(el.ring, { cx: px, cy: py });
      el.ring.style.opacity = String(pl);
    });
  }
  resize();
  raf = requestAnimationFrame(frame);

  function dispose() {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    stage.removeEventListener("pointerdown", down);
    stage.removeEventListener("pointermove", move);
    stage.removeEventListener("pointerup", up);
    stage.removeEventListener("pointercancel", up);
    scene.traverse(o => {
      if (!(o instanceof THREE.Mesh)) return;
      o.geometry.dispose();
      // Materials made inside a builder (printed labels, wire insulation) aren't in `mats`.
      for (const mt of [o.material].flat()) { (mt as THREE.MeshStandardMaterial).map?.dispose(); mt.dispose(); }
    });
    Object.values(mats).forEach(m => m.dispose());
    renderer.dispose();
    renderer.domElement.remove();
    stage.querySelectorAll(".callout").forEach(el => el.remove());
  }

  return { show, setCct, dispose };
}
