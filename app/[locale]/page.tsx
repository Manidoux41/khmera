import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CreditedPhoto } from "@/components/credited-photo";
import { RouteSkeleton } from "@/components/route-skeleton";
import { ServiceOffers } from "@/components/service-offers";
import { TestimonialCard } from "@/components/testimonial-card";
import { getDictionary, isLocale } from "@/lib/i18n";
import { galleryPhotoIds, photos } from "@/lib/photos";
import { featuredTestimonialIds } from "@/lib/testimonials";
import { Pictogram, categoryIcons, featureIcons } from "@/components/pictogram";

type LocaleHomePageProps = { params: Promise<{ locale: string }> };

export default function LocaleHomePage(props: LocaleHomePageProps) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <LocaleHomePageContent {...props} />
    </Suspense>
  );
}

async function LocaleHomePageContent({
  params,
}: LocaleHomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getDictionary(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <section className="journey-hero overflow-hidden rounded-[2rem] border border-slate-700/60">
        <div className="grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-14">
          <div className="space-y-7">
            <div className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-200">
              {messages.hero.eyebrow}
            </div>
            <div className="space-y-5">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {messages.hero.title}
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300">{messages.hero.description}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-400"
              >
                {messages.hero.primaryCta}
                <Pictogram name="plane" className="h-5 w-5" />
              </Link>
              <Link
                href={`/${locale}/services/cambodia-diagnostic`}
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-medium text-white transition hover:border-slate-500 hover:bg-slate-800"
              >
                {messages.hero.secondaryCta}
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {messages.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/60 p-5 shadow-2xl shadow-emerald-950/30">
            <CreditedPhoto
              photo={photos["angkor-wat-sunrise"]}
              alt={messages.photos.alt["angkor-wat-sunrise"]}
              sizes="(min-width: 1024px) 40vw, 100vw"
              eager
              className="mb-5 h-56 rounded-2xl border border-slate-800 sm:h-64"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <Image src="/khmera-mark.svg" alt="" width={48} height={48} className="h-12 w-12 drop-shadow-lg" />
                <span className="text-sm font-medium text-white">{messages.photos.places["angkor-wat-sunrise"]}</span>
              </div>
            </CreditedPhoto>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{messages.home.nextMove}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{messages.home.city}</h2>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-200">
                {messages.home.ready}
              </span>
            </div>
            <div className="mt-5 space-y-4">
              {messages.categories.map((category, index) => (
                <div key={category.title} className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-200">
                    <Pictogram name={categoryIcons[index]} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{category.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-20">
        <ServiceOffers locale={locale} messages={messages} />
      </div>

      <section className="mt-20">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">{messages.home.explore}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {messages.home.heading}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {messages.categories.map((category, index) => (
            <div key={category.title} className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-slate-900">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-lg font-semibold text-emerald-200">
                <Pictogram name={categoryIcons[index]} />
              </div>
              <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{category.description}</p>
              <Link href={`/${locale}/services`} className="mt-6 inline-flex text-sm font-medium text-emerald-300 hover:text-emerald-200">
                {messages.home.discover} <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">{messages.photos.galleryEyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {messages.photos.galleryHeading}
          </h2>
          <p className="mt-4 text-slate-300">{messages.photos.galleryDescription}</p>
        </div>
        <div className="grid auto-rows-[14rem] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryPhotoIds.map((id) => (
            <CreditedPhoto
              key={id}
              photo={photos[id]}
              alt={messages.photos.alt[id]}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="group rounded-3xl border border-slate-800"
              imageClassName="transition duration-500 group-hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
              <p className="absolute top-4 left-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {messages.photos.places[id]}
              </p>
            </CreditedPhoto>
          ))}
        </div>
        <Link href={`/${locale}/credits`} className="mt-4 inline-flex gap-1 text-xs text-slate-400 hover:text-slate-200">
          {messages.photos.creditsLink} <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="mt-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">{messages.testimonials.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {messages.testimonials.homeHeading}
            </h2>
          </div>
          <Link
            href={`/${locale}/testimonials`}
            className="inline-flex shrink-0 gap-1 text-sm font-medium text-emerald-300 transition hover:text-emerald-200"
          >
            {messages.testimonials.readAll} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredTestimonialIds.map((id) => (
            <li key={id} className="flex">
              <TestimonialCard id={id} messages={messages} />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-slate-500">{messages.testimonials.disclaimer}</p>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-3">
        {messages.features.map((feature, index) => (
          <div key={feature.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-200">
              <Pictogram name={featureIcons[index]} />
            </div>
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{feature.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 rounded-[2rem] border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-slate-900 to-cyan-500/10 p-8 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">{messages.site.name}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{messages.cta.heading}</h2>
            <p className="mt-4 text-slate-300">{messages.cta.description}</p>
          </div>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
          >
            {messages.commerce.back}
          </Link>
        </div>
      </section>
    </div>
  );
}
