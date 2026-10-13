import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RouteSkeleton } from "@/components/route-skeleton";
import { ContentReportForm } from "@/components/content-report-form";
import { isLocale } from "@/lib/i18n";
import { legalCopy, type LegalPage } from "@/lib/legal/copy";
import { legalOperator } from "@/lib/legal/config";
import { languageAlternates, localizedUrl } from "@/lib/seo";

export type InformationPageProps = { params: Promise<{ locale: string }> };
export function LegalInformationPage(props: InformationPageProps & { page: LegalPage }) {
  return <Suspense fallback={<RouteSkeleton />}><InformationContent {...props} /></Suspense>;
}
async function InformationContent({ params, page }: InformationPageProps & { page: LegalPage }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = legalCopy[locale];
  const content = copy.pages[page];
  const path = `/${page}`;
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <title>{content.title} | KHMERA</title>
      <meta name="description" content={content.sections[0].text} />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href={localizedUrl(locale, path)} />
      {Object.entries(languageAlternates(path)).map(([language, href]) => <link key={language} rel="alternate" hrefLang={language} href={href} />)}
      <h1 className="text-3xl font-semibold text-white">{content.title}</h1>
      <p className="my-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">{copy.warning}</p>
      <p className="text-xs text-slate-400">Version 2026-10-13</p>
      {content.sections.map(section => <section key={section.heading} className="mt-8">
        <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
        <p className="mt-3 leading-7 text-slate-300">{section.text}</p>
      </section>)}
      {page === "legal-notice" && <dl className="mt-8 divide-y divide-slate-700">
        {Object.values(legalOperator).map((value, index) => <div key={copy.operatorLabels[index]} className="py-4">
          <dt className="font-semibold">{copy.operatorLabels[index]}</dt><dd className="mt-1 whitespace-pre-line break-words text-slate-300">{value || copy.missing}</dd>
        </div>)}
      </dl>}
      {(page === "contact" || page === "privacy" || page === "report" || page === "listing-terms") && <a className="mt-6 inline-block text-emerald-300 underline" href={`mailto:${legalOperator.email}`}>{legalOperator.email}</a>}
      {page === "report" && <ContentReportForm locale={locale} contact={legalOperator.email} />}
    </div>
  );
}
