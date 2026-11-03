import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import { clients, segments } from "@/data/clients";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Clients and who we supply",
  description: "Hans Enterprises supplies LED fittings, drivers and OEM kits to lighting brands, assemblers, contractors, offices and homes across India."
};

const no = (n: number) => String(n + 1).padStart(2, "0");

export default function ClientsPage() {
  const years = new Date().getFullYear() - site.founded;
  return (
    <>
      <section className="block vault">
        <div className="vhero">
          <div>
            <span className="eyebrow"><b>[01]</b><span>LED lighting clients · India</span></span>
            <h1>Trusted by the people <em>who light India.</em></h1>
            <p>Lighting brands, assemblers, contractors, offices and homes have bought Hans fittings and drivers for {years} years, from a single spotlight to full OEM runs.</p>
            <dl className="counts">
              {segments.slice(0, 3).map(s => <div key={s.name}><dt>Sector</dt><dd className="small">{s.name}</dd></div>)}
            </dl>
            <div className="ctas">
              <Link className="btn solid" href="/contact">Request a quote <i aria-hidden="true">→</i></Link>
              <Link className="btn" href="#register">See who we supply <i aria-hidden="true">→</i></Link>
            </div>
          </div>
          <aside className="card rating">
            <div className="qhead"><span><i className="dot" />Buyer rating</span><span>On IndiaMART</span></div>
            <div className="rt-body">
              <span className="score">4.4<small>/5</small></span>
              <span className="stars" aria-label="4.4 out of 5"><i style={{ width: "88%" }} /></span>
              <p className="mono">47 buyer reviews</p>
            </div>
            <dl className="sc-meta">
              <div><dt>Since</dt><dd>{site.founded}</dd></div>
              <div><dt>Company</dt><dd>{site.name}</dd></div>
            </dl>
            <a className="sc-link" href={site.indiamart} target="_blank" rel="noopener">Read the reviews <i aria-hidden="true">→</i></a>
          </aside>
        </div>
      </section>

      <section className="block" id="register" aria-labelledby="reg-h">
        <SectionHead sheet="02" label="Client register" title={<>Who we <em>supply</em></>} id="reg-h">
          The five kinds of buyer we work with most, and what each usually orders.
        </SectionHead>
        <table className="register">
          <thead><tr><th className="ref">No.</th><th>Sector</th><th>What they buy</th><th className="count">Supply as</th><th /></tr></thead>
          <tbody>
            {segments.map((s, n) => (
              <tr key={s.name}>
                <td className="ref">{no(n)}</td>
                <td className="cat"><Link href={s.href}>{s.name}</Link><small>{s.buys}</small></td>
                <td className="models">{s.buys}</td>
                <td className="count">{s.supply}</td>
                <td className="ask"><Link href={s.href}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {clients.length > 0 && (
        <section className="block" aria-labelledby="wall-h">
          <SectionHead sheet="03" label="On the register" title={<>Clients <em>on record</em></>} id="wall-h" />
          <ul className="wall">
            {clients.map((c, n) => (
              <li key={c.name}><span className="mono">{String(n + 1).padStart(3, "0")}</span>
                {c.logo ? <img src={c.logo} alt={c.name} loading="lazy" /> : <b>{c.name}</b>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="ticker" aria-hidden="true">
        <div>
          {[0, 1].map(n => <span key={n}>{segments.map(s => <b key={s.name}>{s.name}</b>)}</span>)}
        </div>
      </div>
    </>
  );
}
