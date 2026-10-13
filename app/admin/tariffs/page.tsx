import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { PrintPresentationButton } from "@/components/print-presentation-button";
import { RouteSkeleton } from "@/components/route-skeleton";
import { adminHref } from "@/lib/admin/config";
import { getCurrentAdmin } from "@/lib/admin/session";
import { getDictionary, isLocale, locales, localeLabels } from "@/lib/i18n";
import { bookingEmail, formatOfferPrice, getOffer, offers } from "@/lib/services/offers";
import { AdminWorkspace } from "../admin-workspace";
import { businessCardCopy } from "@/lib/admin/business-card-copy";
import { tariffCopy } from "@/lib/admin/tariff-copy";
import { TariffRecipient } from "./tariff-recipient";
import "./tariffs.css";

type TariffPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function TariffPage(props: TariffPageProps) {
  return <Suspense fallback={<RouteSkeleton />}><TariffContent {...props} /></Suspense>;
}

async function TariffContent({ searchParams }: TariffPageProps) {
  if (!await getCurrentAdmin()) redirect(adminHref("/login"));
  const params = await searchParams;
  const value = (Array.isArray(params.locale) ? params.locale[0] : params.locale) ?? "fr";
  const locale = isLocale(value) ? value : "fr";
  const slug = Array.isArray(params.offer) ? params.offer[0] : params.offer;
  const offer = getOffer(slug ?? offers[0].slug);
  if (!offer) notFound();
  const copy = getDictionary(locale).commerce;
  const labels = tariffCopy[locale];
  const item = copy.offers[offer.slug];

  return (
    <AdminWorkspace baseHref={adminHref()} page="tariffs">
      <div className="tariff-page" lang={locale}>
        <div className="tariff-controls">
          <p className="text-sm leading-6 text-slate-300">
            {labels.introduction}
          </p>
          <nav aria-label={labels.language} className="my-5 flex flex-wrap gap-3" data-tariff-languages>
            {locales.map(language => (
              <Link key={language} href={adminHref(`/tariffs?locale=${language}&offer=${offer.slug}`)}
                hrefLang={language} aria-current={locale === language ? "page" : undefined}
                className={`rounded-xl border px-4 py-2 text-sm ${locale === language ? "border-emerald-400 text-emerald-200" : "border-slate-700 text-slate-300"}`}>
                {localeLabels[language]}
              </Link>
            ))}
          </nav>
          <nav aria-label={labels.choose} className="my-5 flex flex-wrap gap-3" data-tariff-offers>
            {offers.map(entry => (
              <Link key={entry.slug} href={adminHref(`/tariffs?locale=${locale}&offer=${entry.slug}`)}
                aria-current={entry.slug === offer.slug ? "page" : undefined}
                className={`rounded-xl border px-4 py-3 text-sm ${entry.slug === offer.slug ? "border-emerald-400 bg-emerald-500/15 text-emerald-200" : "border-slate-700 text-slate-300 hover:border-emerald-400"}`}>
                {copy.offers[entry.slug].name} · {formatOfferPrice(entry.priceUsd, locale)}
              </Link>
            ))}
          </nav>
          <PrintPresentationButton label={labels.print} />
          <p className="my-4 text-xs leading-6 text-slate-400">
            {labels.printHelp}
          </p>
        </div>
        <article className="tariff-sheet" data-offer={offer.slug} lang={locale}>
          <header className="tariff-sheet-header">
            <div className="tariff-letterhead">
              <Image src="/khmera-mark.svg" alt="KHMERA" width={52} height={52} loading="eager" unoptimized />
              <div>
                <p className="tariff-brand">KHMERA · SIEM REAP</p>
                <p className="tariff-slogan">{businessCardCopy[locale].tagline}</p>
              </div>
            </div>
            <TariffRecipient copy={labels.recipient} />
            <p className="tariff-private">{labels.privateNotice}</p>
            <h2>{item.name}</h2>
            <p>{item.audience}</p>
          </header>
          <div className="tariff-price">
            <p>{labels.fee}</p>
            <p className="tariff-amount">{formatOfferPrice(offer.priceUsd, locale)}</p>
            <p>{labels.currency}</p>
          </div>
          <section>
            <h3>{labels.objective}</h3>
            <p>{item.summary}</p>
          </section>
          <section>
            <h3>{copy.included}</h3>
            <ul>{item.includes.map(detail => <li key={detail}>{detail}</li>)}</ul>
          </section>
          <section>
            <h3>{labels.exclusions}</h3>
            <p>{copy.exclusions}</p>
          </section>
          <section>
            <h3>{labels.conditions}</h3>
            <p>{copy.pricingNote}</p>
            <ul>
              {labels.steps.map(step => <li key={step}>{step}</li>)}
            </ul>
          </section>
          <footer>
            <p>{labels.contact} : <a href={`mailto:${bookingEmail}`}>{bookingEmail}</a></p>
            <p>{labels.footer}</p>
          </footer>
        </article>
      </div>
    </AdminWorkspace>
  );
}
