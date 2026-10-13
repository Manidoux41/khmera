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
use a development mock or server-configured account; localized names come from `lib/i18n.ts`.

- Secret link: `http://localhost:3000/khm-console-7f3a9c` (override with the
  `ADMIN_ACCESS_PATH` env variable, 8+ chars `[a-zA-Z0-9-_]`). `proxy.ts`
  rewrites it to the internal `/admin` routes; `/admin` itself returns a 404.
- Mock account: `admin@khmera.local` / `Khmera#Admin2026` (dev only, stored as a
  scrypt hash). **Production no longer accepts this fallback.** Set `ADMIN_EMAIL`,
  `ADMIN_PASSWORD_HASH`, `ADMIN_PASSWORD_SALT`, optionally `ADMIN_NAME`, in addition
  to the session secret. Missing or malformed credentials fail closed with `503`
  (`admin_credentials_missing`). A partially supplied account also disables the
  development fallback. Never reuse the example password for a real account.
- Sessions use an HMAC-signed, `httpOnly` cookie valid for 8 hours. Set
  `ADMIN_SESSION_SECRET` (32+ chars) in production; without it the login form
  shows "Connexion indisponible" and the API answers `503` (`session_secret_missing` or `session_secret_too_short`).
- On Vercel: Project → Settings → Environment Variables, add
  `ADMIN_SESSION_SECRET` (e.g. output of `openssl rand -hex 32`) and the account variables above for
  Production, then redeploy. If you set `ADMIN_ACCESS_PATH` there, the secret
  link becomes `https://<your-domain>/<ADMIN_ACCESS_PATH>`.

Generate the scrypt salt/hash locally without writing the password to a file or
passing it in process arguments (macOS default zsh):

```zsh
read -s 'admin_password?Unique administrator password (12+ characters): '
printf '\n'
printf '%s' "$admin_password" | node scripts/admin-password.mjs
unset admin_password
```

Keep the resulting hash/salt and session secret in server-side environment
configuration, never in `NEXT_PUBLIC_*`, source control or exported catalogues.
Rotate `ADMIN_SESSION_SECRET` to invalidate all cookies after account/password
changes. Login rejects cross-origin requests, bodies over 4096 bytes, invalid
JSON and oversized credential fields. Its bounded per-process limiter allows
10 attempts per email per 15 minutes. This is **not distributed protection**:
configure platform/edge throttling before launch, especially on Vercel.
`KHMERA_BUILD_DIR=.next/launch-validation npm run build` creates an isolated
preview build without overwriting the user's development build; use the same
variable with `next start` for that preview.

## Commercial launch preparation (no connected database)

- Eight public pages in EN/FR/ES/DE: `about`, `contact`, `legal-notice`, `terms`,
  `privacy`, `listing-terms`, `advertising`, `report`. Footer links are localized.
  Copy is centralized in `lib/legal/copy.ts`. These are explicitly **drafts**,
  with `noindex, follow` and canonical/language alternatives; they are deliberately
  excluded from the indexable sitemap until legal review.
- Complete `LEGAL_OPERATOR_NAME`, `LEGAL_OPERATOR_FORM`, `LEGAL_OPERATOR_ADDRESS`,
  `LEGAL_OPERATOR_REGISTRATION`, `LEGAL_OPERATOR_TAX`,
  `LEGAL_PUBLICATION_DIRECTOR`, `LEGAL_HOSTING_DETAILS`, and validate
  `LEGAL_CONTACT_EMAIL`. Absent official fields visibly say they must be completed.
  The contact defaults to the existing founder email, not a newly provisioned mailbox.
  These values are public legal disclosures. Rebuild/redeploy after changing them.
- Marketplace cards/details disclose their illustrative, unverified,
  non-sponsored nature. Directory introductions and Khmera's own quote-based
  advice packages are distinguished. Unsupported verified-provider and active
  payment claims have been removed; existing tariff sheets remain private.
- Reporting links prepare a mail draft with a bounded internal content path,
  reason, optional reply email and details. No network submission, receipt or
  case number is created. The user must send the email; an administrator must
  acknowledge and register its actual receipt manually. Copyable text is provided
  if no mail application is configured.
- Private `/launch` has dedicated sidebar submenus for professionals, reports,
  campaigns and the regulatory checklist. Fiches can be added, edited, suspended
  (professionals/campaigns) and deleted. Review approval never publishes anything.
  Professional validation requires category, description, address and contact;
  approval requires publishing consent/evidence. Verification badges require
  dated evidence; an official partnership requires written permission, checked
  by the administrator, not automatically certified by the software.
- Reports require a real reception date and support received/in-progress/closed
  tracking and comments. Future free/premium/sponsored campaigns prepare
  placement, dates, review and billing-proof references, without invoices,
  checkout, subscriptions, payments or public ad activation. Images are reference
  URLs only, never downloaded/uploaded by this editor.
- The nine-question **Cambodia Regulatory Checklist** starts at “À vérifier”.
  Documented confirmation or non-applicability requires authority, date,
  source and evidence. Refer to `docs/CAMBODIA-REGULATORY-CHECKLIST.md` for official
  starting sites and the pre-production checklist. Written answers and local
  legal review remain outstanding; no licence or compliance is claimed.
- Editor records/history live only in page memory. Submenus keep unapplied
  drafts; leaving/reloading loses all of it. A browser unload warning is provided
  after changes. Apply each form before export. Version-1 private JSON import
  replaces records/history only after validation and confirmation (2 MB,
  500 records, 2000 events maximum). Strict fields, dates, safe HTTP(S) URLs and
  evidence gates apply to imported records too. This JSON is not a Prisma seed
  or a tamper-proof audit log. New Prisma models prepare a future durable store
  and review backend; no migration/client/database query is introduced.
- Keep exports and evidence documents in access-controlled storage; define
  backups and remove obsolete copies manually, including mailbox copies where
  applicable. Hosting/mailbox log retention, countries of processing, legal bases,
  rights handling and transfers still require provider/legal validation.
  Do not store sensitive identity or banking documents in the temporary editor.
- No analytics, marketing cookies or embedded media are installed. Existing
  admin session cookies are essential. No dummy consent banner is introduced.
  Future trackers require inventory and blocking before the required consent
  with accept/refuse/customise/revise controls.

Targeted tests: `node --test tests/admin-security.test.mjs tests/launch-preparation.test.mjs`.
Live tests use `ADMIN_TEST_BASE_URL` (localhost only) and optional
`ADMIN_TEST_EMAIL` / `ADMIN_TEST_PASSWORD` for an explicitly configured preview
account. Never run the development-password test against production.

The private administration uses a left sidebar with collapsible menu groups:
activity (service catalogue and commercial offers), relationships (contact
directory, partner presentation, business cards), content (blog) and data
(future Prisma export). The selected section appears in the central workspace;
the menu moves above the content on narrow screens. Login remains separate.
Dashboard sections use hash navigation (`#services`, `#offers`,
`#business-cards`, `#data`) without reloading or unmounting the card editor.
Browser back/forward restores the section. Visiting another page or reloading
still discards temporary data; export first. Navigation is excluded from PDFs.

The "Fiches tarifaires" submenu (`/tariffs` under the secret admin URL) contains
one private reference sheet per commercial package. Select a package to see its
USD reference fee, audience, deliverables, exclusions and written-quote
conditions. Print the selected sheet as a single A4 page or save it as PDF;
menus and controls are excluded. These are internal references, not client
quotes or confirmed bookings. Fees are read-only and reuse the existing offer
registry; no database or separate pricing store is introduced. Public pages
continue to display quote-only labels without numeric fees.
Printed tariff sheets include the Khmera logo and the card slogan in the
letterhead. An optional recipient field prints below it; leave it empty for
a handwritten recipient. It stays in page memory only, never in a URL,
database or request. Reloading or leaving the page clears it.
Tariff sheets support FR/EN/ES/DE using a language menu that keeps the selected
package. Package links retain the selected language (`locale` query parameter).
French remains the administration default; unsupported languages fall back to
French, as with the private partner presentation. Package content reuses the
public localized dictionaries, while private labels and recipient instructions
are centralized in `lib/admin/tariff-copy.ts`. The printed slogan and USD amount
format follow the selected language. The recipient is not translated and remains
in page memory when changing language or package through these links.
Tariff printing uses a dedicated named A4 page with zero outer margins and a
14 mm inset built into the sheet on every side. This keeps the left/right margin
visible even when browser margins are disabled, and isolates tariffs from other
admin print page settings. Use 100% scale with browser headers/footers disabled.

The private dashboard includes a business-card editor (`#business-cards`),
prefilled for Manfred Parbatia, "Conseiller en mise en relation", with
Telegram/WhatsApp `076-252-3154`. All identity,
role and contact fields are editable for future agents. Optional JPEG/PNG/WebP
portraits (max 5 MiB) stay in browser memory and never upload to the server.
Without a portrait, no photo placeholder is printed. Nothing is persisted.
Print or save a PDF before leaving/reloading the page.
Portraits have no border or rounded frame. Classic photos use feathered contours;
already cut-out transparent PNG/WebP portraits use the transparent mode, with a
subtle bottom fade. No automatic background removal is performed.
The agent JSON export preserves the identity, messaging contacts, background ID
and portrait treatment; no image bytes or temporary `blob:` URL is exported.
Keep portrait files separately for the future private media storage.
The card language selector supports FR/EN/ES/DE, translating the professional
title, tagline, portrait label and printed photo credit. Custom job titles are
kept separately per language in the current editor; names and contact details
stay unchanged. The agent export is now version 2 and includes all four role
translations, the selected card locale and the editable email address (default
`manfredparbatia@gmail.com`). Prisma prepares the same fields with
`AgentTranslation`, `Agent.email` and `BusinessCard.locale`.
Telegram/WhatsApp pictograms and the email envelope print as inline vector
icons. A translucent pale-green overlay keeps Angkor visible with dark navy text.
The complete photo credit is printed vertically in tiny type along the left
edge, away from the contact details.
Only the card's Khmera wordmark uses Taprom, a Khmer handwriting-inspired
typeface by Danh Hong and Neapolitan. The brand remains in Latin letters
(Taprom's Latin design derives from Seaweed Script), with flowing handwritten
forms rather than a Khmer transliteration. The unmodified font is self-hosted
in `public/fonts/taprom/`, with its SIL OFL 1.1 license.
Other card text keeps its readable sans-serif font. Printing waits for fonts
to load; no third-party font request is needed at runtime.

Cards are 85 x 55 mm: print either one or eight on A4 at 100% / actual size,
with browser headers/footers disabled and background graphics enabled. Only
cards print, not the dashboard or editor. Cut along their thin borders; there
is no professional bleed. The Angkor Wat background reuses Vladimir Pankratov's
CC BY-SA 2.0 photo, cropped/tinted under the same license, with source/license
links retained on every printed card. Add an international calling code when
needed; the tool does not infer it or verify messaging-account availability.

Card unit tests are included in `node --test tests/*.test.mjs`. The optional
real-browser/PDF test runs with `ADMIN_TEST_BASE_URL=http://localhost:3100`
and `CARD_CDP_URL=http://127.0.0.1:9337`, against a production preview and an
isolated headless Chrome profile with its local remote-debugging port enabled.
It tests editing, optional-photo rejection/addition/removal, long-field layout,
print-dialog invocation and exactly one A4 PDF page for 1 and 8 cards.
`CARD_PDF_DIR` optionally saves PDF samples outside the repository.

API (JSON, same session cookie):

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/admin/session` | Log in with `{ "email", "password" }` |
| `GET` | `/api/admin/session` | Current admin, or `401` |
| `DELETE` | `/api/admin/session` | Log out |
| `GET` | `/api/admin/services` | List services; optional `locale`, `status` (`active`/`beta`/`inactive`), `kind` (`core`/`marketplace`) |
| `GET` | `/api/admin/data-export` | Authenticated offline catalogue download for future Prisma import; no credentials or browser-only records |

## Future PostgreSQL / Prisma storage (not enabled)

`prisma/schema.prisma` prepares the application's persistent data model using
Prisma 7.10 and PostgreSQL. **There is no database, migration applied, Prisma
client instance, server-side write, or replacement of the mocks today.**
The generated types are used only at compile time by the preparation functions.
The CLI has no datasource unless `DATABASE_URL` is explicitly supplied in the
command environment; it does not auto-load a dotenv file or use a dummy URL.

Prepared models:

- Admin accounts, hashed passwords, future revocable sessions and audit events
  (no cleartext passwords or raw session tokens).
- Agents, optional portrait asset and business-card background/treatment.
- Contacts with several categories, optional assigned agent and partner services.
- Future booking/partnership requests, language, recorded consent, optional
  preferred date, contact, agent and offer. Current mailto drafts are **not**
  captured and do not prove an email was sent or a request accepted.
- Services / marketplace, localized pricing descriptions, quote-only USD offers
  with decimal prices, translations and explicit demo flags.
- Blog drafts/publications and four language variants.
- Media metadata, private/public visibility, storage keys, licensing and
  translated captions; actual media files will need separate storage.
- Testimonials retaining fictional status and translated content.
- Private partner presentation, full nested site dictionaries and site settings.

Commands that work **without any database**:

```bash
npm run db:validate
npm run db:generate
```

`npm run build` generates ignored Prisma types before the Next build, so a clean
checkout also compiles without `DATABASE_URL`. No automatic seed or migration
command is configured. SQL migrations will be generated and reviewed during
the later activation step; the schema is the current source of truth.

`lib/data/preparation.ts` validates and converts existing contact exports,
agent/card details, blog posts and localized service records into generated
Prisma create-input types, without executing writes. Preserve contact IDs
when importing. Empty optional fields become null, multiple categories remain
intact. Database imports must use these validators (the database alone does not
enforce category nonemptiness or uniqueness inside the PostgreSQL array).

The dashboard's private catalogue download prepares media metadata, the twelve
services, four offers, blog draft, illustrative testimonials, partner copy and
four full dictionaries. `version`, `importOrder` and `excluded` document the
offline payload. Dates serialize as ISO strings and must be converted back by
the future validated importer. Assets/services must exist before dependent
`connect` references. Agents and contacts export separately from the browser;
there are no fabricated clients, imported credentials, or unsent requests.
Downloading a catalogue does not transfer or provision the actual media files.

Later activation requires an explicit implementation/deployment step:
provision PostgreSQL, privately configure `DATABASE_URL`, review/generate/apply
migrations, install the PostgreSQL adapter, instantiate Prisma on the server
only, then replace mocks and browser-only CRUD with authenticated repositories.
Create real admin credentials rather than importing the development account;
validate imports transactionally, define duplicate/update policies and preserve
draft/demo/fictional flags. Implement private portrait uploads, permission checks,
consent/retention rules, backups, request submission and integration tests before
claiming persistence. No payments, commissions or customer login are implemented.

Prisma's CLI dependencies `deepmerge-ts` and `mysql2` are pinned via scoped
overrides to patched versions, approved and verified with schema generation and
build. These do not enable MySQL: the selected datasource remains PostgreSQL.

## Commercial packages and booking requests

The home page and `/{locale}/services` present four KHMERA launch packages:

The current launch audience is newcomers, entrepreneurs and travellers planning
a project in **Siem Reap and its surroundings**, including Angkor. Public copy,
local SEO and service structured data reflect this focus in EN/FR/ES/DE.
Other Cambodian destinations are secondary and discussed separately on request,
subject to a written quote. The booking form defaults to Siem Reap but the
destination remains editable. Cambodia visa rules remain national.
Existing route slugs and fees are unchanged; the admin catalog and localized
request emails reuse the updated package copy.

Public package pages, homepage highlights and email drafts use "Sur devis" /
"On request" / "Bajo presupuesto" / "Auf Anfrage" instead of numeric fees.
Public structured data also omits price and currency. The amounts below remain
internal reference fees in the authenticated administration and Prisma export.

| Package | Internal proposed fee (USD) | Deliverables |
| --- | --- | --- |
| Siem Reap diagnostic | 49 | One 45-minute remote consultation and a written roadmap |
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

The admin dashboard and authenticated services API retain these internal prices.
The dashboard explains manual qualification, written
quotes and invoicing. There is no orders table, payment ledger or claimed revenue.
Marketplace listings remain illustrative; no partner commissions are collected.
The home-page highlights describe the service areas without prices or fictional
customer counts.

Before accepting a request, confirm that you can deliver the package and agree
on scope, dates, any applicable taxes, final price, payment and cancellation terms
in a written quote. Guidance does not include visa/government fees, housing,
travel or external professionals, and guarantees no administrative outcome.
No legal or tax advice is sold.

The tourism planning package is available at
`/{locale}/services/discovery-trip`, translated in all four locales and listed
under Tourism in the admin catalog. It focuses on Siem Reap, Angkor and the
surrounding area. The 99 USD fee is for planning only, subject to a
written quote: KHMERA does not book a tour or include flights, hotels, transport,
guides or admission tickets. Travellers book and pay for those services themselves.

Future in-app booking and checkout require durable storage, an email provider,
an appropriately configured payment provider, webhook verification and agreed
commercial/privacy terms. Do not use process-memory mocks to accept real orders
on Vercel. Run `node --test tests/*.test.mjs` to validate catalog consistency,
mail links and translation coverage.

## Private partner launch kit and contact directory

After admin login, the dashboard links to `/<ADMIN_ACCESS_PATH>/partners`
and `/<ADMIN_ACCESS_PATH>/contacts`. Both pages check the session on the server
before rendering. The old `/{locale}/partners` URLs return 404; there are no
public navigation links or sitemap entries. Admin responses remain noindex.
Do not distribute the secret administration link with a PDF.

The private partners page provides a localized (EN/FR/ES/DE, selected with
`?locale=fr` etc.) one-page presentation, an A4 print/PDF button, a guided demo
and an email-draft contact form. Print with browser headers/footers disabled.
The PDF prints only the presentation and links to the public home page, never
the administration path.
The presentation addresses local travel agencies, guesthouses, hotels and real
estate agencies, not end customers. It describes future client introductions,
consent and each party's role, without displaying client package fees.
Partners would quote and contract directly with clients; introductions would
initially be manual and commercial terms remain to be agreed.

Partner enquiries go to the existing shared contact
`manfredparbatia@gmail.com`. Nothing is automatically submitted, saved or sent.
The form previews a localized subject/body, has required consent and lets the
visitor send with their mail app or copy the draft. No partnership or
commission is promised. The demo uses fictional details without sending email.

No professional mailbox has been provisioned: creating one requires a domain,
a mail provider and DNS verification. See the
[launch action plan](docs/plan-lancement.md) for the proposed mailbox format,
setup checklist, outreach script and two-week launch schedule.

The contact directory starts empty and supports adding, listing, editing,
deleting (with confirmation), searching and category filtering. Each contact
can have several categories: tourist, retiree, business referrer and partner.
Fields: name, email, phone, organisation, city and notes. Apply changes in the
tab, then export `khmera-contacts-prives.json` to retain them.
Nothing is persisted on the server or in local/session storage. Reloading,
leaving the page or closing the tab loses the working list; import the JSON to
resume. An unload warning reminds users about unapplied/unexported edits.
Export confirmation is a download trigger, not proof the file was saved.
Never commit these personal-data files or upload them to a public folder.
Imports are validated before replacement (explicit confirmation), reject
invalid categories/duplicate IDs, and are limited to 1000 contacts and 16 MB.
The form is not an automatic inbox, bookings service or client database.

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
  Package details additionally provide `Service`/`Offer` and quote conditions,
  without exposing internal prices or currency. No invented ratings, customer reviews, office
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
The empty blog is also `noindex` until a real article is published. Published blog
pages and articles are added to the sitemap automatically at build time.
For rendered HTML checks, start a production build locally, then run
`SEO_TEST_BASE_URL=http://127.0.0.1:3100 node --test tests/seo.test.mjs`
(adjust the port). This checks all 64 public localized URLs, single head tags,
same-page language alternates, JSON-LD and admin/API noindex headers. Run against
the default canonical-origin configuration and default admin access path.

## Blog and founder story

`/{locale}/blog` is linked in the header and footer in all four languages.
The first article, "How we ended up in Siem Reap", starts as a **private draft**
in `lib/blog/founder-story.json`. Only its proposed title and summary exist;
the creator's personal story has not been invented. Public visitors see a
coming-soon message, not the draft, and the article URL returns not-found.

In the admin dashboard, use **Blog → Modifier et prévisualiser l'article**,
or the secret admin path followed by `/blog`. The editor is session-protected.
It edits author, title, summary and plain-text paragraphs for EN/FR/ES/DE, with
a live preview and JSON download. HTML is rendered as text, never executed.
Nothing is autosaved, stored in a database or published by this editor.
Export before closing/reloading the tab to avoid losing changes.

To integrate an export:

1. Download `founder-story.json` from the editor.
2. Replace `lib/blog/founder-story.json` with that file in the project.
3. Keep `status: "draft"` while preparing the story. To publish, complete the
   real story and all translations, then select the publication-prepared status
   and export (`status: "published"`). This does not translate text automatically.
4. Run tests and build, commit/push and redeploy. Only then will the article appear
   at `/{locale}/blog/notre-arrivee-a-siem-reap`, with canonical/hreflang tags,
   BlogPosting metadata and a sitemap entry. No fabricated publication date is used.

There is no remote save API or durable content-management system yet. Publication
requires integrating the export into the project; the editor explicitly says so.

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
