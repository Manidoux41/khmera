import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CreditedPhoto } from "@/components/credited-photo";
import { RouteSkeleton } from "@/components/route-skeleton";
import { PageSeo } from "@/components/page-seo";
import { getDictionary, isLocale, listingSlugs } from "@/lib/i18n";
import { listingPhotoIds, photos } from "@/lib/photos";
import { legalCopy } from "@/lib/legal/copy";

type ListingPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return listingSlugs.map((slug) => ({ slug }));
}

export default function ListingPage(props: ListingPageProps) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <ListingContent {...props} />
    </Suspense>
  );
}

async function ListingContent({ params }: ListingPageProps) {
  const { locale, slug } = await params;
  const index = listingSlugs.findIndex((value) => value === slug);
  if (!isLocale(locale) || index === -1) {
    notFound();
  }

  const messages = getDictionary(locale);
  const listing = messages.marketplace.listings[index];
  const photoId = listingPhotoIds[index];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <PageSeo locale={locale} route={{ page: "listing", slug: listingSlugs[index] }} />
      <Link href={`/${locale}/marketplace`} className="text-sm font-medium text-emerald-300 hover:text-emerald-200">
        {messages.marketplace.back}
      </Link>
      <article className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
        <CreditedPhoto
          photo={photos[photoId]}
          alt={messages.photos.alt[photoId]}
          sizes="(min-width: 896px) 896px, 100vw"
          eager
          className="h-64 sm:h-80"
        />
        <div className="p-8">
          <p className="rounded-xl border border-amber-500/40 p-3 text-sm text-amber-200">{legalCopy[locale].demo}</p>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">{messages.pageTitles.marketplace}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">{listing.title}</h1>
          <p className="mt-4 text-lg text-emerald-200">{listing.subtitle}</p>
          <p className="mt-6 leading-8 text-slate-300">{messages.marketplace.descriptions[index]}</p>
          <p className="mt-8 rounded-2xl border border-slate-700 bg-slate-950 p-5 text-sm leading-7 text-slate-300">
            {messages.marketplace.availability}
          </p>
          <p className="mt-6 text-sm leading-7 text-slate-300">{legalCopy[locale].role}</p>
          <Link href={`/${locale}/report?target=${encodeURIComponent(`/${locale}/marketplace/${slug}`)}`} className="mt-4 inline-block text-emerald-300 underline">{legalCopy[locale].reportLink}</Link>
        </div>
      </article>
    </div>
  );
}
