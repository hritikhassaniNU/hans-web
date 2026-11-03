import type { ReactNode } from "react";

const cols = ["1", "2", "3", "4", "5", "6", "7", "8"];
const rows = ["A", "B", "C"];

export default function Sheet({ children }: { children: ReactNode }) {
  const h = (pos: string) => (
    <div className={`refs h ${pos}`} aria-hidden="true">{cols.map(c => <span key={c}>{c}</span>)}</div>
  );
  const v = (pos: string) => (
    <div className={`refs v ${pos}`} aria-hidden="true">{rows.map(r => <span key={r}>{r}</span>)}</div>
  );
  return (
    <div className="sheet">
      {h("top")}
      {v("left")}
      <div className="inner">{children}</div>
      {v("right")}
      {h("bot")}
    </div>
  );
}
