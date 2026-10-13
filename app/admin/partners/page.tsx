import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { PartnerContactForm } from "@/components/partner-contact-form";
import { PrintPresentationButton } from "@/components/print-presentation-button";
import { RouteSkeleton } from "@/components/route-skeleton";
import { getDictionary, isLocale, locales, localeLabels } from "@/lib/i18n";
import { adminHref } from "@/lib/admin/config";
import { getCurrentAdmin } from "@/lib/admin/session";
import { bookingEmail } from "@/lib/services/offers";
import { localizedUrl } from "@/lib/seo";
import "./print.css";

type PartnersPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default function PartnersPage(props: PartnersPageProps) {
  return <Suspense fallback={<RouteSkeleton />}><PartnersPageContent {...props} /></Suspense>;
}

async function PartnersPageContent({ searchParams }: PartnersPageProps) {
  if (!await getCurrentAdmin()) redirect(adminHref("/login"));
  const params = await searchParams;
  const value = (Array.isArray(params.locale) ? params.locale[0] : params.locale) ?? "fr";
  const locale = isLocale(value) ? value : "fr";
  const messages = getDictionary(locale);
  const copy = messages.partners;
  const demoPaths = ["", "/services", "/services/discovery-trip"];

  return (
    <div lang={locale} className="partner-page mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      <div className="partner-screen-only flex flex-wrap gap-4">
        <Link href={adminHref()} className="text-emerald-300">Retour au tableau de bord</Link>
        {locales.map((language) => <Link key={language} href={adminHref(`/partners?locale=${language}`)} aria-current={locale === language ? "page" : undefined} className="text-slate-300">{localeLabels[language]}</Link>)}
      </div>
      <div className="partner-screen-only flex flex-wrap gap-4">
        <PrintPresentationButton label={copy.print} />
        <a href="#contact" className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white">{copy.contactHeading}</a>
        <a href="#demo" className="rounded-full border border-slate-600 px-5 py-3 text-sm font-medium text-white">{copy.demoHeading}</a>
      </div>
      <article className="partner-presentation space-y-6 rounded-[2rem] border border-slate-700 bg-slate-900/60 p-6 sm:p-10">
        <div className="flex items-center gap-4">
          <Image src="/khmera-mark.svg" width={56} height={56} alt="" />
          <p className="text-sm uppercase tracking-widest text-emerald-300">{copy.eyebrow}</p>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{copy.title}</h1>
        <p className="leading-7 text-slate-200">{copy.pitch}</p>
        <p className="text-sm text-slate-300">{copy.founder}</p>
        <section>
          <h2 className="text-xl font-semibold text-white">{copy.audienceHeading}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">{copy.audiences.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">{copy.referralHeading}</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">
            {copy.referralSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p className="mt-3 text-xs leading-5 text-slate-400">{copy.responsibilities}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">{copy.collaborationHeading}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">{copy.collaboration}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">{copy.transparency}</p>
        </section>
        <section className="border-t border-slate-700 pt-4">
          <h2 className="text-xl font-semibold text-white">{copy.contactHeading}</h2>
          <p className="mt-2 text-xs leading-5 text-slate-400">{copy.contactNote}</p>
          <a href={`mailto:${bookingEmail}`} className="mt-2 block break-all text-sm text-emerald-300">{bookingEmail}</a>
          <a href={localizedUrl(locale, "")} className="mt-1 block break-all text-sm text-slate-300">{localizedUrl(locale, "")}</a>
        </section>
      </article>
      <section id="demo" className="partner-screen-only" aria-labelledby="partner-demo-heading">
        <h2 id="partner-demo-heading" className="text-3xl font-semibold text-white">{copy.demoHeading}</h2>
        <p className="mt-3 leading-7 text-slate-300">{copy.demoDescription}</p>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {copy.demoSteps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
              <h3 className="font-semibold text-white">{index + 1}. {step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step.text}</p>
              <Link href={`/${locale}${demoPaths[index]}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-emerald-300">{step.action}</Link>
            </li>
          ))}
        </ol>
      </section>
      <div className="partner-screen-only"><PartnerContactForm locale={locale} messages={messages} /></div>
    </div>
  );
}
