# hanslights.in

Website for Hans Enterprises, Vasai. Built with Next.js 14 (App Router), TypeScript, and Three.js for the hero viewer.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Deploy by importing the repo on Vercel and pointing `hanslights.in` at it.

## Where things live

| Path | What |
|---|---|
| `data/site.ts` | Company details, phone/WhatsApp number, facts |
| `data/products.ts` | Categories and products (specs, sizes) |
| `data/drivers.ts` | Driver finder list |
| `components/viewer/` | 3D viewer: `models.ts` (procedural fittings), `scene.ts` (renderer, drag, dimension lines), `items.ts` (tabs and specs) |
| `app/` | Routes: `/`, `/products`, `/products/[category]`, `/products/[category]/[slug]`, `/drivers`, `/drivers/[brand]`, `/oem`, `/about`, `/contact` |
| `app/globals.css` | All styles and theme tokens (light and dark) |

Adding a product means adding one object to `data/products.ts`. Its page, its sitemap entry and its category listing are generated from that object.

## Before launch

- Set a direct number in `data/site.ts`. The current one is routed through IndiaMART and may not work with WhatsApp. Add a sales email there too.
- Confirm wording about Philips, Fulham and Osram. The site says “stocked” and “inside our fittings”, not “authorised”.
- Product photos: drop them into `public/products/<slug>.webp` and replace `ProductPlate` on the product page with `next/image`.
- Real 3D models: export GLB files, load them with `GLTFLoader` in `scene.ts`, and remove the matching builder in `models.ts`.
- Add a Google Map embed on `/contact` and analytics for WhatsApp and call clicks.

See `plan.md` for the full plan.
