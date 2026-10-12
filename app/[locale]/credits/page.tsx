import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { RouteSkeleton } from "@/components/route-skeleton";
import { PageSeo } from "@/components/page-seo";
import { getDictionary, isLocale } from "@/lib/i18n";
import { photoIds, photos } from "@/lib/photos";

type CreditsPageProps = { params: Promise<{ locale: string }> };

export default function CreditsPage(props: CreditsPageProps) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <CreditsPageContent {...props} />
    </Suspense>
  );
}

async function CreditsPageContent({ params }: CreditsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <PageSeo locale={locale} route={{ page: "credits" }} />
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">{messages.site.name}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">{messages.photos.creditsHeading}</h1>
        <p className="mt-4 text-slate-300">{messages.photos.creditsDescription}</p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photoIds.map((id) => {
          const photo = photos[id];
          return (
            <li key={id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
              <div className="relative h-44">
                <Image
                  src={photo.image}
                  alt={messages.photos.alt[id]}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
              <dl className="space-y-1 p-5 text-sm text-slate-300">
                <dt className="font-medium text-white">{messages.photos.places[id]}</dt>
                <dd>
                  {messages.photos.author}{photo.author}
                </dd>
                <dd>
                  {messages.photos.license}
                  <a href={photo.licenseUrl} target="_blank" rel="noreferrer license" className="text-emerald-300 hover:text-emerald-200">
                    {photo.license}
                  </a>
                </dd>
                <dd>
                  <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="text-emerald-300 hover:text-emerald-200">
                    {messages.photos.source} <span aria-hidden="true">↗</span>
                  </a>
                </dd>
              </dl>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
