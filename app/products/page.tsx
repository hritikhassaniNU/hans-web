import type { Metadata } from "next";
import SectionHead from "@/components/SectionHead";
import RangeTable from "@/components/RangeTable";

export const metadata: Metadata = {
  title: "LED lights and fittings",
  description: "COB spotlights, downlights, gimbals, track lights, wall lights, street lights and panels from Hans Enterprises, Vasai."
};

export default function ProductsPage() {
  return (
    <section className="block" style={{ borderTop: 0 }}>
      <SectionHead sheet="P" label="Product register" title={<>Prime <em>products</em></>} as="h1">
        Every fitting can be ordered complete, as an SKD kit or as a bare housing. Prices depend on wattage, driver and quantity, so ask us for a quote.
      </SectionHead>
      <RangeTable />
    </section>
  );
}
