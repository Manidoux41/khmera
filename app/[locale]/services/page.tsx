import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CreditedPhoto } from "@/components/credited-photo";
import { RouteSkeleton } from "@/components/route-skeleton";
import { getDictionary, isLocale } from "@/lib/i18n";
import { photos } from "@/lib/photos";
import { Pictogram, serviceIcons } from "@/components/pictogram";

type ServicesPageProps = { params: Promise<{ locale: string }> };

export default function ServicesPage(props: ServicesPageProps) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <ServicesPageContent {...props} />
    </Suspense>
  );
}

async function ServicesPageContent({
  params,
}: ServicesPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getDictionary(locale);
  const services = messages.services.items;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <CreditedPhoto
        photo={photos["street-food"]}
        alt={messages.photos.alt["street-food"]}
        sizes="(min-width: 1152px) 1152px, 100vw"
        eager
        className="mb-10 h-56 rounded-[2rem] border border-slate-800 sm:h-72"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <p className="absolute bottom-4 left-5 text-sm font-medium text-white">{messages.photos.places["street-food"]}</p>
      </CreditedPhoto>
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">{messages.pageTitles.services}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">{messages.services.heading}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
          <article key={service.name} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-lg font-semibold text-emerald-200">
              <Pictogram name={serviceIcons[index]} />
            </div>
            <h2 className="text-xl font-semibold text-white">{service.name}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{service.detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-[2rem] border border-slate-800 bg-slate-900/40 p-8">
        <h2 className="text-2xl font-semibold text-white">{messages.services.planHeading}</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          {messages.services.planDescription}
        </p>
        <Link href={`/${locale}/visa-guide`} className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white">
          {messages.services.advisor}
        </Link>
      </div>
    </div>
  );
}
