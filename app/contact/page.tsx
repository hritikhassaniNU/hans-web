import type { Metadata } from "next";
import { Suspense } from "react";
import SectionHead from "@/components/SectionHead";
import EnquiryForm from "@/components/EnquiryForm";
import { ContactDetails } from "@/components/ContactDetails";

export const metadata: Metadata = {
  title: "Contact and enquiries",
  description: "Ask Hans Enterprises for prices and stock on LED fittings, drivers and OEM kits. Laxmi Industrial Estate, Vasai East."
};

export default function ContactPage() {
  return (
    <section className="block">
      <SectionHead sheet="C" label="Request for quotation" title={<>Send an <em>enquiry</em></>} as="h1">
        Tell us what you need and we’ll reply with prices and stock. The form opens WhatsApp with your message filled in, so you can check it before sending.
      </SectionHead>
      <div className="contact">
        <ContactDetails />
        <Suspense><EnquiryForm /></Suspense>
      </div>
    </section>
  );
}
