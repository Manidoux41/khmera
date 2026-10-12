This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Each localized page wraps its parameter-dependent content in Suspense with the
shared `RouteSkeleton` fallback. The localized layout also has its own boundary.
Page-level boundaries are necessary for instant client navigation: a boundary
above a shared layout cannot handle content suspending below it during a transition.
Keep parameter-dependent rendering inside these boundaries when adding routes.
Do not read `params` in `generateMetadata()`: with partial prefetching the
`/[locale]` App Shell is shared by every locale, so URL data in metadata blocks it.
Locale-independent metadata (icons, verification) is a static `metadata`
export; page-specific titles, descriptions, canonical and hreflang links are
rendered by `PageSeo` inside each page's Suspense boundary and hoisted into
`<head>` by React. Keep this component at the page level, not in a shared layout,
so navigation between pages updates the tags without duplicate home-page metadata.
The root layout therefore defines no title, to avoid duplicate `<title>` tags.
Root paths containing a dot (`/sw.js`, `/apple-touch-icon.png`…) that match no
public file are rewritten by an `afterFiles` rule in `next.config.ts` to the
plain 404 handler `app/asset-not-found/route.ts`, so they never render `[locale]`.
`public/sw.js` is a kill-switch that unregisters any service worker left on
`localhost:3000` by another project. KHMERA itself does not use a service worker.

All public-page copy, listing descriptions and accessibility labels are defined
in `lib/i18n.ts` for English, French, Spanish and German. Add new UI text to the
typed dictionary for every locale rather than embedding it in a component.
Not-found pages use the URL locale and preserve it on the return-home link.
Run `node --test tests/i18n.test.mjs` to check translation coverage.
Marketplace detail links use stable slugs defined in `lib/i18n.ts` and open
localized detail pages at `/[locale]/marketplace/[slug]`. These illustrative
offers are informational; booking, availability and payments are not active.

The original vector brand mark in `public/khmera-mark.svg` combines a globe,
travel arc and plane with a stylized Angkor temple. The Cambodian palette uses
navy blue, red and white, with lighter accents for dark-background legibility.
Existing accent utilities map to this palette in `app/globals.css`.
`components/pictogram.tsx` provides shared decorative service icons.
Language links keep their explicit EN/FR/ES/DE labels alongside stylized flags
(UK, France, Spain, Germany); flags are visual cues, not definitions of a language.
The header and manifest use the same logo. A manifest alone does not implement
offline support or guarantee PWA installation.

## Admin area (mock backend)

The admin area lists every service available on the platform (core KHMERA
services and marketplace offers). There is no database yet: the admin account
(`lib/admin/accounts.ts`) and the service registry (`lib/services/catalog.ts`)
are in-memory mocks; localized names come from `lib/i18n.ts`.

- Secret link: `http://localhost:3000/khm-console-7f3a9c` (override with the
  `ADMIN_ACCESS_PATH` env variable, 8+ chars `[a-zA-Z0-9-_]`). `proxy.ts`
  rewrites it to the internal `/admin` routes; `/admin` itself returns a 404.
- Mock account: `admin@khmera.local` / `Khmera#Admin2026` (dev only, stored as a
  scrypt hash).
- Sessions use an HMAC-signed, `httpOnly` cookie valid for 8 hours. Set
  `ADMIN_SESSION_SECRET` (32+ chars) in production; without it the login form
  shows "Connexion indisponible" and the API answers `503` (`session_secret_missing` or `session_secret_too_short`).
- On Vercel: Project → Settings → Environment Variables, add
  `ADMIN_SESSION_SECRET` (e.g. output of `openssl rand -hex 32`) for
  Production, then redeploy. If you set `ADMIN_ACCESS_PATH` there, the secret
  link becomes `https://<your-domain>/<ADMIN_ACCESS_PATH>`.

API (JSON, same session cookie):

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/admin/session` | Log in with `{ "email", "password" }` |
| `GET` | `/api/admin/session` | Current admin, or `401` |
| `DELETE` | `/api/admin/session` | Log out |
| `GET` | `/api/admin/services` | List services; optional `locale`, `status` (`active`/`beta`/`inactive`), `kind` (`core`/`marketplace`) |

## Commercial packages and booking requests

The home page and `/{locale}/services` present four KHMERA launch packages:

| Package | Proposed fee (USD) | Deliverables |
| --- | --- | --- |
| Cambodia diagnostic | 49 | One 45-minute remote consultation and a written roadmap |
| Settle in with confidence | 249 | Two 45-minute remote consultations, arrival checklist and relocation plan |
| Business project | 399 | Three 45-minute remote consultations, budget review and launch plan |
| Discovery trip | 99 | One 45-minute remote consultation, personalised itinerary, estimated travel budget and departure checklist |

Prices and stable slugs are shared in `lib/services/offers.ts`; package copy,
deliverables, exclusions and form labels are translated in `lib/i18n.ts`.
Package detail pages at `/{locale}/services/{slug}` prepare a request email to
`manfredparbatia@gmail.com`. The visitor must send the email from their own mail
app. A selectable text preview provides a fallback if no mail app is configured.
**Preparing or opening the email does not send a request, reserve a service or
take a payment.** No client data is stored or automatically transmitted.

The request email follows the page language (EN/FR/ES/DE), including its subject,
greeting, package details, field labels, consent, exclusions and closing.
`lib/services/booking-email.ts` generates the shared template. Optional dates use
the locale's long date format in UTC (no day shift), and the email identifies
the preferred reply language. Visitor-written text is preserved, not translated.
Both subject and body can be copied from the preview if no mail app is configured.
There are no automatic outgoing emails or translated auto-replies yet.

The admin dashboard and services API list these packages using the same prices
as the public pages. The dashboard explains manual qualification, written
quotes and invoicing. There is no orders table, payment ledger or claimed revenue.
Marketplace listings remain illustrative; no partner commissions are collected.
The old fictional home-page customer counts have been replaced with package fees.

Before accepting a request, confirm that you can deliver the package and agree
on scope, dates, any applicable taxes, final price, payment and cancellation terms
in a written quote. Guidance does not include visa/government fees, housing,
travel or external professionals, and guarantees no administrative outcome.
No legal or tax advice is sold.

The tourism planning package is available at
`/{locale}/services/discovery-trip`, translated in all four locales and listed
under Tourism in the admin catalog. It covers Phnom Penh, Siem Reap, Angkor and
the traveller's chosen stops. The 99 USD fee is for planning only, subject to a
written quote: KHMERA does not book a tour or include flights, hotels, transport,
guides or admission tickets. Travellers book and pay for those services themselves.

Future in-app booking and checkout require durable storage, an email provider,
an appropriately configured payment provider, webhook verification and agreed
commercial/privacy terms. Do not use process-memory mocks to accept real orders
on Vercel. Run `node --test tests/*.test.mjs` to validate catalog consistency,
mail links and translation coverage.

## SEO and search engine indexing

The canonical production origin defaults to `https://khmera.vercel.app`.
Set `NEXT_PUBLIC_SITE_URL` to your public origin (e.g. `https://khmera.com`, no
path/query/fragment) when moving to a custom domain, then rebuild/redeploy.
Do not use a Vercel preview URL as the canonical origin.

- `lib/seo.ts` centralizes URLs, alternate languages, indexable paths and JSON-LD.
- `components/page-seo.tsx` renders unique, translated page titles and descriptions,
  self-canonical URLs, reciprocal EN/FR/ES/DE and `x-default` alternates, Open Graph
  and Twitter cards with an existing credited Cambodia image.
- `app/sitemap.ts` lists the 36 indexable localized pages: home, services, visa
  guide, business, photo credits and four packages. Each entry includes language
  alternates. No fabricated `lastModified` timestamps or private routes.
- `app/robots.ts` publishes `/robots.txt` with the canonical sitemap URL and
  excludes APIs/internal admin paths. The secret admin URL is not disclosed there.
  Admin/API responses additionally carry `X-Robots-Tag: noindex, nofollow, noarchive`.
- Vercel preview/development deployments use noindex metadata, block crawlers
  in robots.txt and publish an empty sitemap.
- Marketplace examples and fictional testimonials are `noindex, follow`, absent
  from the sitemap, and have no structured data. Replace these with genuine
  validated content before changing their indexing policy.
- Public pages provide `Organization`, `WebSite`, `WebPage` and breadcrumb JSON-LD.
  Package details additionally provide `Service`/`Offer`, with actual proposed
  USD fees and quote conditions. No invented ratings, customer reviews, office
  address, accreditation or guaranteed availability is included.

After production deployment:

1. Verify `/robots.txt`, `/sitemap.xml` and the final canonical hostname.
2. Add the site in Google Search Console (and optionally Bing Webmaster Tools).
   Verify domain ownership with DNS, or set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   to the Google HTML-tag verification value and redeploy for a URL-prefix
   property. Never supply an entire HTML tag as the variable value.
3. Submit `https://<your-domain>/sitemap.xml` in Search Console and inspect/request
   indexing for the homepage and package URLs.
4. Validate schema with Google's Rich Results Test or Schema.org's validator.
   Service schema is descriptive; it does not guarantee a Google rich result.
5. Publish original useful Cambodia guidance and real service/customer information;
   acquire legitimate mentions/links and monitor indexing, queries and Core Web Vitals.

These changes make the site crawlable and describe its pages accurately. They
do not submit it to Google automatically or guarantee indexing, ranking or traffic.
No Search Console registration or production deployment is performed by these edits.
Run `node --test tests/*.test.mjs` for SEO and translation regression tests.
For rendered HTML checks, start a production build locally, then run
`SEO_TEST_BASE_URL=http://127.0.0.1:3100 node --test tests/seo.test.mjs`
(adjust the port). This checks all 60 public localized URLs, single head tags,
same-page language alternates, JSON-LD and admin/API noindex headers. Run against
the default canonical-origin configuration and default admin access path.

## Photos

Photos of Cambodia (Siem Reap, Phnom Penh, Tonlé Sap…) come from [Wikimedia Commons](https://commons.wikimedia.org) under CC0 or Creative Commons (CC BY / CC BY-SA) licenses. They are stored in `public/images/photos/` (resized to 1600px) and cataloged in `lib/photos.ts` with author, license and source. The `CreditedPhoto` component (`components/credited-photo.tsx`) renders each image with its attribution, and all credits are listed at `/{locale}/credits`.

To add a photo:

1. Save the file in `public/images/photos/` and import it in `lib/photos.ts`.
2. Add its id to `photoIds` and an entry (author, license, URLs) to `photos`.
3. Add its `alt` text and place name under `photos.alt` / `photos.places` for every locale in `lib/i18n.ts`.

## Testimonials

`/{locale}/testimonials` lists the testimonials. The three featured ones (`featuredTestimonialIds`) also appear on the home page. **The testimonials are illustrative:** the people and stories are fictional, the photos never show identifiable faces, and a disclaimer is shown on both pages.

To add a testimonial:

1. Add an id and a persona (name, initials, `photoId`) in `lib/testimonials.ts`.
2. Add `role`, `place`, `service`, `quote` and `result` under `testimonials.items` for every locale in `lib/i18n.ts`.
3. If the persona needs a new photo, register it in `lib/photos.ts` (see above).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
