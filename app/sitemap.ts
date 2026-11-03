import type { MetadataRoute } from "next";
import { categories, products } from "@/data/products";
import { driverBrands, brandSlug } from "@/data/drivers";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/products", "/drivers", "/oem", "/manufacturing", "/clients", "/brands", "/about", "/contact",
    ...categories.map(c => `/products/${c.slug}`),
    ...products.map(p => `/products/${p.category}/${p.slug}`),
    ...driverBrands.map(b => `/drivers/${brandSlug(b)}`)
  ];
  return paths.map(p => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
