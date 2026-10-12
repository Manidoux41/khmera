import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CreditedPhoto } from "@/components/credited-photo";
import { RouteSkeleton } from "@/components/route-skeleton";
import { getDictionary, isLocale } from "@/lib/i18n";
import { photos } from "@/lib/photos";
import { Pictogram } from "@/components/pictogram";

type BusinessPageProps = { params: Promise<{ locale: string }> };

export default function BusinessPage(props: BusinessPageProps) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <BusinessPageContent {...props} />
    </Suspense>
  );
}

async function BusinessPageContent({
  params,
}: BusinessPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getDictionary(locale);
  const pillars = messages.business.pillars;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <CreditedPhoto
        photo={photos["phnom-penh-skyline"]}
        alt={messages.photos.alt["phnom-penh-skyline"]}
        sizes="(min-width: 1024px) 1024px, 100vw"
        eager
        className="mb-10 h-56 rounded-[2rem] border border-slate-800 sm:h-72"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <p className="absolute bottom-4 left-5 text-sm font-medium text-white">{messages.photos.places["phnom-penh-skyline"]}</p>
      </CreditedPhoto>
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">{messages.pageTitles.business}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">{messages.business.heading}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-lg font-semibold text-sky-200">
              <Pictogram name="business" />
            </div>
            <Link href={`/${locale}/services/business-launch`} className="mt-8 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-white">
              {messages.commerce.request} · {messages.commerce.offers["business-launch"].name}
            </Link>
            <p className="text-base leading-7">{pillar}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
import Link from "next/link";
