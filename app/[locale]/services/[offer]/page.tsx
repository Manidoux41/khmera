import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BookingRequestForm } from "@/components/booking-request-form";
import { RouteSkeleton } from "@/components/route-skeleton";
import { getDictionary, isLocale } from "@/lib/i18n";
import { formatOfferPrice, getOffer, offerSlugs } from "@/lib/services/offers";

type OfferPageProps = { params: Promise<{ locale: string; offer: string }> };

export function generateStaticParams() {
  return offerSlugs.map((offer) => ({ offer }));
}

export default function OfferPage(props: OfferPageProps) {
  return <Suspense fallback={<RouteSkeleton />}><OfferContent {...props} /></Suspense>;
}

async function OfferContent({ params }: OfferPageProps) {
  const { locale, offer: slug } = await params;
  const offer = getOffer(slug);
  if (!isLocale(locale) || !offer) notFound();

  const copy = getDictionary(locale).commerce;
  const item = copy.offers[offer.slug];
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href={`/${locale}/services`} className="text-sm text-emerald-300 hover:text-emerald-200">{copy.back}</Link>
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">{item.audience}</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">{item.name}</h1>
          <p className="mt-5 text-4xl font-semibold text-white">{formatOfferPrice(offer.priceUsd, locale)}</p>
          <p className="mt-5 leading-7 text-slate-300">{item.summary}</p>
          <h2 className="mt-8 text-xl font-semibold text-white">{copy.included}</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-slate-300">
            {item.includes.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
          <p className="mt-6 text-sm leading-6 text-slate-400">{copy.pricingNote}</p>
          <p className="mt-4 text-sm leading-6 text-slate-400">{copy.exclusions}</p>
        </div>
        <BookingRequestForm key={`${locale}/${offer.slug}`} locale={locale} offer={offer} copy={copy} />
      </div>
    </div>
  );
}
