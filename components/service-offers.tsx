import Link from "next/link";

import type { Locale, Messages } from "@/lib/i18n";
import { offers } from "@/lib/services/offers";

export function ServiceOffers({ locale, messages, primary = false }: { locale: Locale; messages: Messages; primary?: boolean }) {
  const copy = messages.commerce;
  const Heading = primary ? "h1" : "h2";
  const CardHeading = primary ? "h2" : "h3";

  return (
    <section aria-labelledby="offers-heading">
      <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">{copy.eyebrow}</p>
      <Heading id="offers-heading" className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white">{copy.heading}</Heading>
      <p className="mt-4 max-w-3xl leading-7 text-slate-300">{copy.description}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {offers.map((offer) => {
          const item = copy.offers[offer.slug];
          return (
            <article key={offer.slug} className="flex flex-col rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
              <p className="text-sm text-emerald-300">{item.audience}</p>
              <CardHeading className="mt-3 text-2xl font-semibold text-white">{item.name}</CardHeading>
              <p className="mt-4 text-sm text-emerald-300">{copy.quoteLabel}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.summary}</p>
              <ul className="my-6 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-300">
                {item.includes.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
              <Link href={`/${locale}/services/${offer.slug}`} className="mt-auto inline-flex justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-400">
                {copy.request}
              </Link>
            </article>
          );
        })}
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-400">{copy.pricingNote}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{copy.exclusions}</p>
    </section>
  );
}
