# Hans Enterprises: website plan

Domain: hanslights.in (already linked from the IndiaMART listing)
Prototype: the one-page site built alongside this plan, using the drawing-sheet style adapted from parasengineeringworks.com

## 1. What we know (research, November 2026)

Sources: IndiaMART store and profile (indiamart.com/hansenterprises-mumbai) and the TradeIndia listing.

**Company**
- Hans Enterprises, established 1984, a proprietorship
- Run by Lavesh Hassani (IndiaMART’s fact sheet also lists “R Hassani” as CEO)
- 26–50 employees
- GSTIN 27AADPH8093D3ZO
- Address: Ground Floor, Gala No. 10, Plot No. 7, S. No. 77, Laxmi Industrial Estate, Sativali, Vasai (E), Palghar 401208
- IndiaMART: 13 years on the platform, TrustSEAL, 4.4★ from 47 reviews, 91% response rate
- Trading brands: Philips, Osram, Fulham, Delta. LED chips: Cree, Bridgelux
- Supplies housing only, SKD kits or complete fittings
- Ships by road, air, cargo and sea
- Accepts cheque, DD, online payment and RTGS
- Facility listed as quality testing, warehousing, production and R&D units

**Product categories (IndiaMART listing counts)**

| Category | Listed | Example models |
|---|---|---|
| Spotlights | 56 | Glanza (front-openable 5–30 W), Glanza Pro, Aqua IP65, Eco trimless, Jazz wall washer |
| COB lights | 39 | Sunflower 7/12/18 W, FB 2022 surface 7–40 W, Dome, Dome square snout, Dome gimbal 12×2 |
| COB downlights | 24 | Delta series (black, gold, rose gold), 12 W extra-deep (24/36/60°), 25 W |
| Track lights | 20 | CHT 008/009 20–40 W 3-wire, FB25 25 W, COB track light |
| Street lights | 30 | Rocket, 20 W, 110 W, SP8 spike light |
| Panels | 15 | Backlit panels |
| Philips drivers | 33 + 26 | Xitanium 17 W, 12–36 W CC drivers; stocked from 5 W to 150 W |
| Fulham drivers | 42 | Workhorse, Thoroled, 10EE/28FE DALI, Pony 150ME magnetic track, IP67 |
| Osram drivers | 23 | Optotronic OTe, OTi DALI, OT FIT |
| Generic LED drivers | 26 | — |
| Philips Fortimo | 25 | Modules, up-down architectural, wall lights |
| Also on TradeIndia | — | Flood lights 30/50 W, 50 W high bay, garden bollards |

**Typical spec language**
- 2700–6500 K
- 120–140 lm/W on newer fittings
- 2-year warranty
- IP65 on outdoor fittings
- Driver choice of Philips, Fulham or Osram

## 2. Verify before launch

1. **Brand claims.** Confirm whether Hans is an *authorised* Philips, Osram or Fulham distributor. Get it in writing before using that word or any logos. The prototype only says “drivers stocked” and “inside our fittings.”
2. **Phone and WhatsApp.** +91 79493 22065 is an IndiaMART-routed number and may not take WhatsApp. Get a direct business number and a sales email.
3. **Owner name and wording.** Confirm the CEO name and whether to state the team size and GSTIN publicly.
4. **Specs.** Check every dimension and spec against current datasheets. Some IndiaMART fields are wrong, for example “1050 A” on an Osram driver.
5. **Prices.** Decide whether to show them. The recommendation is “Ask for price” plus a WhatsApp quote, because listing prices go stale.
6. **Ratings.** Confirm the reviews may be quoted, with a link to the IndiaMART reviews page.

## 3. Who the site is for

1. **Electrical contractors and electricians** need the right driver or fitting fast. They want a phone or WhatsApp contact and stock availability.
2. **Interior designers and architects** need to see finishes, beam angles and CCT. They want datasheets and photos.
3. **OEM and private-label brands** buy SKD kits and housings in volume. They want MOQ, lead times and customisation options.

Primary action: send an enquiry on WhatsApp. Secondary actions: call, or download the catalogue.

## 4. Sitemap

```
/                         Home (hero viewer, range, driver finder, OEM, about, enquiry)
/products                 All categories
/products/[category]      e.g. /products/cob-spotlights
/products/[category]/[slug]   Product page with datasheet and enquiry
/drivers                  Full driver finder (Philips / Fulham / Osram)
/drivers/[brand]          Brand landing pages (good for SEO)
/oem                      OEM, SKD and housing supply, MOQ, process
/projects                 Installed work with photos (add once collected)
/about                    History since 1984, facility, team
/contact                  Address, map, hours, enquiry form
/catalogue                PDF download
```

## 5. Page content checklist

- **Home:** use the prototype as the base. Swap the procedural 3D models for real GLB models once available. Keep the four tabs (spotlight, track, wall, driver).
- **Product page:** include gallery, a spec table (wattage, size, cut-out, CCT, CRI, beam, IP, driver, warranty), variants, related drivers, a “Get price on WhatsApp” button, and a datasheet PDF.
- **Driver finder:** filter by brand, wattage, output current or voltage, dimming (none, phase, DALI) and IP rating. Add a “need X W at Y mA” request option.
- **OEM:** include the 5-step build (housing → COB → driver → optics → CCT), the three supply modes, MOQ, lead time and a packaging photo.
- **About:** cover the timeline from 1984 as a Philips OEM distributor to today’s own range, plus warehouse photos and team photos.
- **Contact:** include an embedded Google Map (the prototype can’t embed one), hours, and a direct number.

## 6. Design system (from the prototype)

- **Concept:** a lighting datasheet drawn as an engineering sheet. It uses grid references, figure captions, dimension lines and a title-block footer. The live CCT glow is the only accent colour.
- **Colours:**

  | Role | Hex |
  |---|---|
  | Paper | `#E6E9EA` |
  | Sheet | `#F3F5F5` |
  | Ink | `#161B20` |
  | Secondary ink | `#4D5761` |
  | Rules | `#A0A8AE` |
  | Dimension blue | `#2B5F80` |
  | WhatsApp green | `#1F7A4C` |

  Dark mode is included.
- **Type:** Archivo (variable width; condensed for headings) and IBM Plex Mono (labels and specs only).
- **Motion:** only the 3D viewer moves, with a slow idle spin. Respect reduced-motion settings.

## 7. Tech stack

- **Next.js** (App Router) + **Tailwind** + **React Three Fiber / drei** for the viewer, deployed on **Vercel** with the domain hanslights.in
- **Catalogue data:** start with a JSON or MDX file per product in the repo. Move to Sanity or a Google Sheet → API only if the team needs to edit without a developer.
- **3D models:** export GLB from the manufacturer’s CAD, or model the 4 hero products in Blender. Compress with `gltf-transform` (Draco/Meshopt). Keep each file under 1 MB.
- **Enquiries:**
  - Keep the WhatsApp deep link (`wa.me`) with a prefilled message.
  - Add a form that posts to email using Resend or Formspree, and log enquiries to a Google Sheet.
- **Analytics:** Google Analytics 4 or Plausible. Track clicks on WhatsApp, call and catalogue download as conversions.

## 8. SEO

- **Target keywords:**
  - LED driver supplier Mumbai
  - Philips LED driver Vasai
  - Fulham DALI driver India
  - Osram Optotronic driver Mumbai
  - COB spotlight manufacturer Vasai
  - COB downlight Mumbai
  - track light supplier Mumbai
  - SKD LED light kits India
- **Pages:** one page per driver brand and per category, each with a unique title and meta description.
- **Schema:** `LocalBusiness` (name, address, phone, geo, hours) and `Product` on product pages.
- **Google Business Profile:** claim or update it with photos, hours and the website link, and ask happy buyers for reviews.
- **Links:** link the site from IndiaMART, TradeIndia and LinkedIn.
- **Performance:** keep Core Web Vitals green. Lazy-load the 3D viewer, serve WebP/AVIF images, and use a static fallback image on low-end phones.

## 9. Assets to collect from Hans

- [ ] Logo in vector format (SVG/AI)
- [ ] Product photos on a plain background, plus installed photos
- [ ] Datasheets and the current catalogue PDF
- [ ] CAD or GLB files for the 4 hero products
- [ ] Finish swatches (white, black, gold, rose gold)
- [ ] MOQ, lead times and warranty terms in writing
- [ ] Client or project list, if they’re allowed to be named
- [ ] Direct phone, WhatsApp, email and business hours
- [ ] Brand authorisation letters, if any

## 10. Phases

| Phase | Work | Time |
|---|---|---|
| 1. Content | Collect the assets above, verify claims, write copy | 1 week |
| 2. Build | Next.js setup, home page from the prototype, product data model, category and product templates | 1–2 weeks |
| 3. Catalogue | Enter the top 40 products and all listed drivers, then add datasheet PDFs | 1 week |
| 4. Launch | Domain/DNS, analytics, schema, Google Business Profile, IndiaMART link, test on low-end Android phones | 2–3 days |
| 5. After launch | Projects page, more 3D models, a monthly product update, review requests | Ongoing |

## 11. Launch checklist

- [ ] Every phone, WhatsApp and email link has been tested on a real phone
- [ ] No unverified “authorised” claims and no unapproved logos
- [ ] Specs have been checked against datasheets
- [ ] The site is fast on 4G: hero under 2.5 s LCP, 3D lazy-loaded
- [ ] Meta titles, OG image, favicon, sitemap.xml and robots.txt are in place
- [ ] The enquiry form arrives in the inbox and the Sheet
- [ ] Privacy note sits next to the form

## 12. Reusable prompt for later

```
Rebuild the Hans Enterprises site (hanslights.in) in Next.js + Tailwind + React Three Fiber, following plan.md. Use the attached prototype index.html as the visual reference: an engineering drawing-sheet style with grid references, figure captions, dimension lines and a title-block footer, using Archivo + IBM Plex Mono. Load products and drivers from /data/*.json. Build: home (3D viewer with tabs, CCT slider, specs), category and product pages, a driver finder with brand, wattage, current and dimming filters, OEM, about and contact. Every product has a WhatsApp enquiry with a prefilled message. Add LocalBusiness and Product schema, lazy-load the 3D viewer with an image fallback, and support dark mode and reduced motion.
```
