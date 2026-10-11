import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

import { CreditedPhoto } from "@/components/credited-photo";
import { RouteSkeleton } from "@/components/route-skeleton";
import { getDictionary, isLocale, listingSlugs } from "@/lib/i18n";
import { listingPhotoIds, photos } from "@/lib/photos";
import { Pictogram, listingIcons } from "@/components/pictogram";

type MarketplacePageProps = { params: Promise<{ locale: string }> };

export default function MarketplacePage(props: MarketplacePageProps) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <MarketplacePageContent {...props} />
    </Suspense>
  );
}

async function MarketplacePageContent({
  params,
}: MarketplacePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getDictionary(locale);
  const listings = messages.marketplace.listings;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">{messages.pageTitles.marketplace}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">{messages.marketplace.heading}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {listings.map((listing, index) => (
          <article key={listing.title} className="rounded-[1.75rem] border border-slate-800 bg-slate-900/60 p-6">
            <CreditedPhoto
              photo={photos[listingPhotoIds[index]]}
              alt={messages.photos.alt[listingPhotoIds[index]]}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="mb-5 h-48 rounded-2xl border border-slate-700/50"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/70 text-sky-200 backdrop-blur">
                <Pictogram name={listingIcons[index]} className="h-6 w-6" />
              </div>
            </CreditedPhoto>
            <h2 className="text-2xl font-semibold text-white">{listing.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{listing.subtitle}</p>
            <Link href={`/${locale}/marketplace/${listingSlugs[index]}`} className="mt-6 inline-flex rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:border-emerald-400 hover:text-emerald-200">
              {messages.marketplace.details}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
