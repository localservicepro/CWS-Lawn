# CWS Lawn and Garden Care — Website

Static, SEO/GEO/AEO-optimised website for CWS Lawn and Garden Care, a family-run
lawn and garden business based in Willunga, South Australia, servicing the
Fleurieu Peninsula.

Built from the approved Claude Design mockup (`CWS Website.dc.html`), with real
client job photos sourced from the CWS Google Drive Photos folder.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Lawn Mowing (Willunga) | `lawn-mowing-willunga.html` |
| Acreage Mowing (Fleurieu Peninsula) | `acreage-mowing-fleurieu-peninsula.html` |
| Gardening & Pruning (McLaren Vale) | `gardening-mclaren-vale.html` |
| Lawn Renovations (Willunga) | `lawn-renovations-willunga.html` |
| Weed Control & Block Slashing | `weed-control-block-slashing.html` |
| About | `about.html` |
| Contact | `contact.html` |

## SEO / GEO / AEO features

- Unique, keyword-targeted `<title>` + meta description + canonical per page
- JSON-LD structured data on every page: `LocalBusiness` (with service areas,
  geo coordinates, opening hours), `Service`, `FAQPage`, `BreadcrumbList`,
  `WebSite`
- Open Graph + Twitter Card tags, `geo.region` / `geo.placename` meta
- Crawlable `<a>` navigation, semantic headings (one `<h1>` per page),
  descriptive image alt text with suburb names
- `sitemap.xml` + `robots.txt`
- Self-hosted fonts (preloaded), compressed images with intrinsic
  width/height, lazy loading below the fold — fast Core Web Vitals

## Structure

- `css/site.css` — global styles, font-faces, responsive nav
- `js/site.js` — hover/focus styling, mobile nav, quote modal, form states
- `img/` — optimised photos (client job photos + approved design imagery)
- `fonts/` — self-hosted Lato + Playfair Display (woff2)

## Forms

The quote modal and contact form show a front-end success state and carry
`data-ghl-field` attributes ready for GoHighLevel/CRM wiring. Update the form
handler in `js/site.js` when the endpoint is available.

The canonical domain is set to `https://www.cwslawnandgardencare.com.au` —
update `BASE` references in the HTML head, `sitemap.xml` and `robots.txt` if
the site is deployed to a different domain.
