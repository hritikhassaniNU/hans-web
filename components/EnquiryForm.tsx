"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { categories } from "@/data/products";
import { waLink } from "@/data/site";

const ccts = ["Not sure yet", "2700 K warm", "3000 K warm", "4000 K neutral", "5000 K", "6500 K cool"];
const supplyModes = ["Complete fitting", "SKD kit", "Housing only", "Driver only"];
const productOptions = [...categories.map(c => c.name), "LED drivers"];

export default function EnquiryForm() {
  const params = useSearchParams();
  const item = params?.get("item") ?? "";
  const presetCat = params?.get("cat") ?? "";
  const [form, setForm] = useState({
    product: productOptions.includes(presetCat) ? presetCat : productOptions[0],
    qty: "",
    cct: ccts[0],
    supply: presetCat === "LED drivers" ? "Driver only" : supplyModes[0],
    name: "",
    city: "",
    details: item ? `Item: ${item}` : ""
  });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm(f => ({ ...f, [k]: e.target.value }));

  const send = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hello Hans Enterprises, I’d like a quote.",
      `Product: ${form.product}`,
      form.qty && `Quantity: ${form.qty}`,
      `CCT: ${form.cct}`,
      `Supply as: ${form.supply}`,
      form.details && `Details: ${form.details}`,
      form.name && `From: ${form.name}`,
      form.city && `Deliver to: ${form.city}`
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  };

  return (
    <form className="rfq" onSubmit={send}>
      <div>
        <label htmlFor="f-cat">Product</label>
        <select id="f-cat" value={form.product} onChange={set("product")}>
          {productOptions.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-qty">Quantity</label>
        <input id="f-qty" value={form.qty} onChange={set("qty")} inputMode="numeric" placeholder="e.g. 200 pcs" />
      </div>
      <div>
        <label htmlFor="f-cct">Colour temperature</label>
        <select id="f-cct" value={form.cct} onChange={set("cct")}>{ccts.map(o => <option key={o}>{o}</option>)}</select>
      </div>
      <div>
        <label htmlFor="f-sup">Supply as</label>
        <select id="f-sup" value={form.supply} onChange={set("supply")}>{supplyModes.map(o => <option key={o}>{o}</option>)}</select>
      </div>
      <div>
        <label htmlFor="f-name">Your name and company</label>
        <input id="f-name" value={form.name} onChange={set("name")} autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="f-city">Delivery city</label>
        <input id="f-city" value={form.city} onChange={set("city")} autoComplete="address-level2" />
      </div>
      <div className="full">
        <label htmlFor="f-msg">Details</label>
        <textarea id="f-msg" value={form.details} onChange={set("details")} placeholder="Wattage, beam angle, finish, driver model or anything else" />
      </div>
      <div className="full sendrow">
        <button className="btn wa" type="submit">Open in WhatsApp</button>
        <small>Your message opens in WhatsApp so you can check it before sending.</small>
      </div>
    </form>
  );
}
