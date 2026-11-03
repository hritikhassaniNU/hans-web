const steps = [
  ["Housing", "Spot, deep cone, trimless, dome, gimbal, track or outdoor body, in white, black or gold finishes."],
  ["Light source", "Cree or Bridgelux COB, matched to the wattage and the housing’s heat sink."],
  ["Driver", "Philips, Fulham or Osram, non-dimmable, phase-cut or DALI."],
  ["Optics", "Reflector or lens for the beam you need, such as 24°, 36° or 60° on deep downlights."],
  ["Colour", "2700 K to 6500 K, from warm white to cool daylight."]
];

const modes = [
  ["Complete fitting", "Assembled, tested and boxed, ready to install."],
  ["SKD kit", "Housing, COB, driver and optics shipped together for your own assembly line."],
  ["Housing only", "Bare bodies and components, including reflectors, to pair with your own light engine."]
];

export function OemSteps() {
  return (
    <ol className="build">
      {steps.map(([t, d], i) => (
        <li key={t}><span className="st">Step {i + 1}</span><h3>{t}</h3><p>{d}</p></li>
      ))}
    </ol>
  );
}

export function SupplyModes() {
  return (
    <div className="supply">
      {modes.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}
    </div>
  );
}
