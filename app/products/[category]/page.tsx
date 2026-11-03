import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionHead from "@/components/SectionHead";
import { categories, getCategory, productsIn } from "@/data/products";

type Params = { params: { category: string } };

export const dynamicParams = false;
export const generateStaticParams = () => categories.map(c => ({ category: c.slug }));

export function generateMetadata({ params }: Params): Metadata {
  const c = getCategory(params.category);
  return c ? { title: c.name, description: c.blurb } : {};
}

export default function CategoryPage({ params }: Params) {
  const c = getCategory(params.category);
  if (!c) notFound();
  const items = productsIn(c.slug);
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/products">Products</Link><span>/</span><span aria-current="page">{c.name}</span>
      </nav>
      <section className="block">
        <SectionHead sheet={String(categories.indexOf(c) + 1).padStart(2, "0")} title={c.name} as="h1">
          {c.blurb}{c.listed ? ` ${c.listed} models are listed in this category; the main ones are below.` : ""}
        </SectionHead>
        <table className="register">
          <thead><tr><th className="ref">Ref.</th><th>Model</th><th>About</th><th className="count">Options</th><th /></tr></thead>
          <tbody>
            {items.map((p, i) => (
              <tr key={p.slug}>
                <td className="ref">{c.slug.slice(0, 3).toUpperCase()}—{String(i + 1).padStart(2, "0")}</td>
                <td className="cat"><Link href={`/products/${c.slug}/${p.slug}`}>{p.name}</Link><small>{p.summary}</small></td>
                <td className="models">{p.summary}</td>
                <td className="count">{p.variants ? `${p.variants.length} sizes` : "—"}</td>
                <td className="ask"><Link href={`/products/${c.slug}/${p.slug}`}>View specs</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
