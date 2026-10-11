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
Locale-independent metadata (hreflang alternates, icons) is a static `metadata`
export; the localized `<title>`, description and canonical link are rendered by
`LocaleHead` inside the layout's Suspense boundary and hoisted into `<head>` by React.
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
