import Link from "next/link";
import SectionHead from "@/components/SectionHead";

export default function NotFound() {
  return (
    <section className="block">
      <SectionHead sheet="404" title="This page isn’t on the drawing" as="h1">
        The link may be old or mistyped.
      </SectionHead>
      <div className="more" style={{ justifyContent: "flex-start", gap: 12, borderTop: 0 }}>
        <Link className="btn solid" href="/products">Browse products</Link>
        <Link className="btn" href="/contact">Contact us</Link>
      </div>
    </section>
  );
}
