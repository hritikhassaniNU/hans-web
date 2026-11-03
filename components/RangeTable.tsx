import Link from "next/link";
import { categories, productsIn } from "@/data/products";

export default function RangeTable() {
  return (
    <table className="register">
      <thead>
        <tr><th className="ref">Ref.</th><th>Category</th><th>Models</th><th className="count">Listed</th><th /></tr>
      </thead>
      <tbody>
        {categories.map((c, i) => {
          const names = productsIn(c.slug).map(p => p.name).join(", ");
          return (
            <tr key={c.slug}>
              <td className="ref">R—{String(i + 1).padStart(2, "0")}</td>
              <td className="cat">
                <Link href={`/products/${c.slug}`}>{c.name}</Link>
                <small>{names}</small>
              </td>
              <td className="models">{names}</td>
              <td className="count">{c.listed ? `${c.listed} models` : "—"}</td>
              <td className="ask"><Link href={`/contact?cat=${encodeURIComponent(c.name)}`}>Ask for prices</Link></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
