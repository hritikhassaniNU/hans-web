"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductPlate from "@/components/ProductPlate";
import { categories, productsIn } from "@/data/products";

const no = (n: number) => String(n + 1).padStart(2, "0");
const code = (slug: string) => slug.slice(0, 3).toUpperCase();

// The product in a category with the fullest spec sheet stands in for the whole line.
const lines = categories.map(c => {
  const items = productsIn(c.slug);
  const lead = [...items].sort((a, b) => b.specs.length - a.specs.length)[0];
  return { c, items, lead };
});

export default function ProductShowcase() {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) setI(Number((e.target as HTMLElement).dataset.i));
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const { c, items, lead } = lines[i];

  return (
    <div className="showcase">
      <ol className="sc-list">
        {lines.map(({ c, items }, n) => (
          <li key={c.slug} data-i={n} ref={el => { refs.current[n] = el; }} aria-current={n === i ? "true" : undefined}>
            <button type="button" onClick={() => setI(n)}>
              <span className="mono">{no(n)} <s /> HE—{code(c.slug)}—{no(n)}</span>
              <h3>{c.name}</h3>
              <p>{c.blurb}</p>
              <span className="mono cnt">{c.listed ? `${c.listed} models listed` : `${items.length} lines`}</span>
            </button>
            <Link className="sc-go" href={`/products/${c.slug}`}>View range <i aria-hidden="true">→</i></Link>
          </li>
        ))}
      </ol>
      <div className="sc-stick">
        <article className="card sc-card" key={c.slug}>
          <div className="qhead"><span><i className="dot" />HE—{code(c.slug)}—{no(i)}</span><span><i className="dot" />Sheet {no(i)} / {no(lines.length - 1)}</span></div>
          <figure className="sc-fig">
            <span className="cross tl" /><span className="cross br" />
            <ProductPlate label={lead?.name ?? c.name} />
            <figcaption>Fig. {no(i)} — {lead?.name ?? c.name}</figcaption>
          </figure>
          {lead && (
            <dl className="sc-specs">
              {lead.specs.slice(0, 4).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          )}
          <div className="qfoot">
            <span className="sc-items">{items.slice(0, 5).map(p => p.name).join(" · ")}</span>
            <Link className="btn solid" href={`/products/${c.slug}`}>View range <i aria-hidden="true">→</i></Link>
          </div>
        </article>
      </div>
    </div>
  );
}
