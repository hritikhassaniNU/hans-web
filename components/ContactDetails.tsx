import { site } from "@/data/site";

export function ContactDetails() {
  const a = site.address;
  return (
    <div className="addr">
      <address>
        {site.name}<br />
        {a.lines.map(l => <span key={l}>{l}<br /></span>)}
        {a.locality}, {a.district} {a.postcode}<br />
        {a.region}, India
      </address>
      <dl>
        <dt>Phone</dt><dd><a href={`tel:+${site.phone}`}>{site.phoneDisplay}</a></dd>
        {site.email && (<><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></>)}
        <dt>Owner</dt><dd>{site.owner}</dd>
        <dt>GSTIN</dt><dd className="mono">{site.gstin}</dd>
        <dt>Also on</dt><dd><a href={site.indiamart} target="_blank" rel="noopener">IndiaMART</a></dd>
      </dl>
    </div>
  );
}
