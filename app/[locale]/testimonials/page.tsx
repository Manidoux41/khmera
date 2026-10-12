import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { RouteSkeleton } from "@/components/route-skeleton";
import { PageSeo } from "@/components/page-seo";
import { TestimonialCard } from "@/components/testimonial-card";
import { getDictionary, isLocale } from "@/lib/i18n";
import { testimonialIds } from "@/lib/testimonials";

type TestimonialsPageProps = { params: Promise<{ locale: string }> };

export default function TestimonialsPage(props: TestimonialsPageProps) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <TestimonialsPageContent {...props} />
    </Suspense>
  );
}

async function TestimonialsPageContent({ params }: TestimonialsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getDictionary(locale);
  const copy = messages.testimonials;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <PageSeo locale={locale} route={{ page: "testimonials" }} />
      <div className="mb-12 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">{copy.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{copy.heading}</h1>
        <p className="mt-4 text-lg text-slate-300">{copy.description}</p>
        <p className="mt-6 inline-flex items-start gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          <span aria-hidden="true">ⓘ</span>
          <span>{copy.disclaimer}</span>
        </p>
      </div>

      <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {testimonialIds.map((id) => (
          <li key={id} className="flex">
            <TestimonialCard id={id} messages={messages} />
          </li>
        ))}
      </ul>

      <section className="mt-16 rounded-[2rem] border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-slate-900 to-cyan-500/10 p-8 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white">{copy.ctaHeading}</h2>
            <p className="mt-4 text-slate-300">{copy.ctaDescription}</p>
          </div>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
          >
            {copy.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
