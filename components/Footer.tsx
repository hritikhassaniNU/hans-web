import Link from "next/link";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import Wordmark from "@/components/Wordmark";

const company = [
  ["/about", "About us"],
  ["/manufacturing", "Manufacturing"],
  ["/clients", "Our clients"],
  ["/brands", "Brands & components"],
  ["/oem", "OEM supply"],
  ["/drivers", "Driver finder"]
];

export default function Footer() {
  const a = site.address;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="ft-top mono">
          <span><b>[HE]</b> — LED lights &amp; drivers</span>
          <span>{a.locality}, {a.district} · {a.region}</span>
        </div>
        <div className="wm-rule mono" aria-hidden="true"><i /><span>Lighting Vasai since {site.founded}</span><i /></div>
        <Wordmark text={site.short} />
        <div className="ft-cols">
          <div className="ft-brand">
            <Link className="logo" href="/"><b>{site.short}</b><span>Enterprises<br />Est. {site.founded}</span></Link>
            <p>COB spotlights, downlights, track, wall and street lights with Philips, Fulham and Osram drivers inside. Complete fittings, SKD kits and housings.</p>
            <address>{a.lines.join(", ")}, {a.locality}, {a.district} {a.postcode}, {a.region}</address>
          </div>
          <nav aria-label="Products">
            <h2 className="eyebrow"><b>[01]</b><span>Products</span></h2>
            <ul>{categories.map(c => <li key={c.slug}><Link href={`/products/${c.slug}`}>{c.name}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Company">
            <h2 className="eyebrow"><b>[02]</b><span>Company</span></h2>
            <ul>{company.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
          </nav>
          <div>
            <h2 className="eyebrow"><b>[03]</b><span>Contact</span></h2>
            <dl>
              <dt>Phone</dt><dd><a href={`tel:+${site.phone}`}>{site.phoneDisplay}</a></dd>
              {site.email && (<><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></>)}
              <dt>GSTIN</dt><dd className="mono">{site.gstin}</dd>
              <dt>Also on</dt><dd><a href={site.indiamart} target="_blank" rel="noopener">IndiaMART</a></dd>
            </dl>
          </div>
        </div>
        <div className="ft-base mono">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Drg. no. HE-WEB-{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
