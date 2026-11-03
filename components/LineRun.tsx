"use client";

import { useEffect, useState } from "react";
import { stations } from "@/data/works";

const no = (n: number) => String(n + 1).padStart(2, "0");

export default function LineRun() {
  const [i, setI] = useState(0);
  const [running, setRunning] = useState(false);
  const s = stations[i];

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setI(n => {
      if (n === stations.length - 1) { setRunning(false); return n; }
      return n + 1;
    }), 1800);
    return () => clearInterval(t);
  }, [running]);

  const run = () => { if (i === stations.length - 1) setI(0); setRunning(r => !r); };

  return (
    <div className="line">
      <div className="rail" aria-hidden="true"><span style={{ width: `${((i + 1) / stations.length) * 100}%` }} /></div>
      <ol className="stations">
        {stations.map((st, n) => (
          <li key={st.name}>
            {(n === 0 || stations[n - 1].phase !== st.phase) && <span className="phase">{st.phase}</span>}
            <button type="button" aria-pressed={n === i} className={n < i ? "done" : undefined} onClick={() => { setRunning(false); setI(n); }}>
              <b>{no(n)}</b>{st.name}
            </button>
          </li>
        ))}
      </ol>
      <article className="card station" aria-live="polite">
        <div className="qhead"><span><i className="dot" />Station {i + 1} of {stations.length}</span><span>{s.phase}</span></div>
        <div className="st-body">
          <span className="big" aria-hidden="true">{no(i)}</span>
          <div>
            <span className="eyebrow"><b>{s.tag}</b></span>
            <h3>{s.name}</h3>
            <p>{s.text}</p>
            <ul>{s.kit.map(k => <li key={k}>{k}</li>)}</ul>
          </div>
        </div>
        <div className="qfoot">
          <span className="mono">Out · {s.out}</span>
          <button type="button" className="btn solid" onClick={run}>
            {running ? "Pause" : i === stations.length - 1 ? "Run it again" : "Run the line"} <i aria-hidden="true">{running ? "❚❚" : "→"}</i>
          </button>
        </div>
      </article>
    </div>
  );
}
