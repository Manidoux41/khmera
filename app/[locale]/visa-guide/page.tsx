import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CreditedPhoto } from "@/components/credited-photo";
import { RouteSkeleton } from "@/components/route-skeleton";
import { getDictionary, isLocale } from "@/lib/i18n";
import { photos } from "@/lib/photos";
import { Pictogram } from "@/components/pictogram";

type VisaGuidePageProps = { params: Promise<{ locale: string }> };

export default function VisaGuidePage(props: VisaGuidePageProps) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <VisaGuidePageContent {...props} />
    </Suspense>
  );
}

async function VisaGuidePageContent({
  params,
}: VisaGuidePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getDictionary(locale);
  const steps = messages.visa.steps;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <CreditedPhoto
        photo={photos["royal-palace"]}
        alt={messages.photos.alt["royal-palace"]}
        sizes="(min-width: 1024px) 1024px, 100vw"
        eager
        className="mb-10 h-56 rounded-[2rem] border border-slate-800 sm:h-72"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <p className="absolute bottom-4 left-5 text-sm font-medium text-white">{messages.photos.places["royal-palace"]}</p>
      </CreditedPhoto>
      <div className="mb-10 max-w-2xl">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-200">
          <Pictogram name="visa" className="h-8 w-8" />
        </div>
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">{messages.pageTitles.guide}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">{messages.visa.heading}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <div key={step} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-semibold text-emerald-200">
              {index + 1}
            </div>
            <p className="text-base leading-7 text-slate-200">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
