# CWS Lawn and Garden Care — Website

Static, SEO/GEO/AEO-optimised website for CWS Lawn and Garden Care, a family-run
lawn and garden business based in Willunga, South Australia, servicing the
Fleurieu Peninsula.

Built from the approved Claude Design mockup (`CWS Website.dc.html`), with real
client job photos sourced from the CWS Google Drive Photos folder.

## Pages

Clean, extensionless URLs. Each page is written as `<slug>/index.html`, so the
URL works on any static host without rewrite rules. Service pages are named for
the service only, with no suburb in the path.

| Page | URL | File |
|---|---|---|
| Home | `/` | `index.html` |
| Lawn Mowing | `/lawn-mowing/` | `lawn-mowing/index.html` |
| Acreage Mowing | `/acreage-mowing/` | `acreage-mowing/index.html` |
| Gardening & Pruning | `/gardening-pruning/` | `gardening-pruning/index.html` |
| Lawn Renovations | `/lawn-renovations/` | `lawn-renovations/index.html` |
| Weed Control & Block Slashing | `/weed-control-block-slashing/` | `weed-control-block-slashing/index.html` |
| About | `/about/` | `about/index.html` |
| Contact | `/contact/` | `contact/index.html` |
| Thank You (noindex) | `/thank-you/` | `thank-you/index.html` |

Assets and internal links are root-relative (`/css/…`, `/img/…`, `/about/`), so
the site must be served from the domain root.

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

## Forms (GoHighLevel)

The quote modal and contact form are wired for GHL external form tracking:

- The GHL tracking script (`link.msgsndr.com/js/external-tracking.js`,
  tracking id `tk_c75c0c68581c413f905aab04b2b973c5`) is loaded in the
  `<head>` of every page.
- Every field has a `name` + `data-ghl-field` mapping: `full_name`,
  `email`, `phone`, `service_needed`, `property_address`,
  `property_size`, `job_notes` → `contact.*`.
- Forms submit through the native submit event (nothing calls
  `preventDefault`), so GHL captures the submission, then the browser
  follows the form action to `/thank-you/`.
- `/thank-you/` (noindex, excluded from the sitemap) personalises the
  greeting and summarises what was submitted from the query string (with a
  `sessionStorage` fallback), then strips the query from the URL/history.

In the GHL sub-account, enable **Form Analytics** and **Form Submissions**
in Settings for submissions to sync to contacts.

The canonical domain is set to `https://www.cwslawnandgardencare.com.au` —
update `BASE` references in the HTML head, `sitemap.xml` and `robots.txt` if
the site is deployed to a different domain.
