import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductPlate from "@/components/ProductPlate";
import JsonLd from "@/components/JsonLd";
import { getCategory, getProduct, products, productsIn } from "@/data/products";
import { site, waLink } from "@/data/site";

type Params = { params: { category: string; slug: string } };

export const dynamicParams = false;
export const generateStaticParams = () => products.map(p => ({ category: p.category, slug: p.slug }));

export function generateMetadata({ params }: Params): Metadata {
  const p = getProduct(params.category, params.slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default function ProductPage({ params }: Params) {
  const p = getProduct(params.category, params.slug);
  const c = getCategory(params.category);
  if (!p || !c) notFound();
  const others = productsIn(c.slug).filter(o => o.slug !== p.slug);
  const message = `Hello Hans Enterprises, please send the price and stock for: ${p.name}.`;

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/products">Products</Link><span>/</span>
        <Link href={`/products/${c.slug}`}>{c.name}</Link><span>/</span>
        <span aria-current="page">{p.name}</span>
      </nav>
      <section className="block">
        <div className="head">
          <div>
            <span className="eyebrow"><b>[{p.slug.slice(0, 3).toUpperCase()}]</b><span>{c.name}</span></span>
            <h1>{p.name}</h1>
          </div>
          <span />
        </div>
        <div className="pd">
          <figure>
            <div className="plate"><ProductPlate label={p.name} /></div>
            <figcaption>Fig. 01 · {p.name}</figcaption>
          </figure>
          <div className="info">
            <p className="lede">{p.summary}</p>
            <dl className="specs">
              {p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            {p.variants && (
              <div className="variants">
                <h3>Available sizes</h3>
                <ul>{p.variants.map(v => <li key={v}>{v}</li>)}</ul>
              </div>
            )}
            <div className="ctas">
              <a className="btn wa" href={waLink(message)} target="_blank" rel="noopener">Get price on WhatsApp</a>
              <Link className="btn" href={`/contact?cat=${encodeURIComponent(c.name)}&item=${encodeURIComponent(p.name)}`}>Detailed enquiry</Link>
            </div>
          </div>
        </div>
        {others.length > 0 && (
          <div className="related" style={{ borderTop: "1px solid var(--rule)" }}>
            <h3>Also in {c.name.toLowerCase()}</h3>
            <ul>{others.map(o => <li key={o.slug}><Link href={`/products/${c.slug}/${o.slug}`}>{o.name}</Link></li>)}</ul>
          </div>
        )}
      </section>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name,
        description: p.summary,
        category: c.name,
        brand: { "@type": "Brand", name: site.short },
        additionalProperty: p.specs.map(([name, value]) => ({ "@type": "PropertyValue", name, value }))
      }} />
    </>
  );
}
