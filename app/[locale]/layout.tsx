import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { RouteSkeleton } from "@/components/route-skeleton";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default function LocaleLayout(props: LocaleLayoutProps) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <LocaleLayoutContent {...props} />
    </Suspense>
  );
}

async function LocaleLayoutContent({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getDictionary(locale);

  return (
    <div lang={locale} className="brand-shell min-h-screen text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-lg font-bold tracking-[0.14em] text-white">
            <Image src="/khmera-mark.svg" width={52} height={52} alt="" className="h-11 w-11 sm:h-13 sm:w-13" />
            <span>{messages.site.name}<span aria-hidden="true" className="text-emerald-400">.</span></span>
          </Link>

          <nav className="order-3 flex w-full items-center gap-5 overflow-x-auto border-t border-slate-800 pt-3 pb-1 text-sm whitespace-nowrap text-slate-300 xl:order-none xl:w-auto xl:border-0 xl:py-0">
            <Link href={`/${locale}`} className="transition hover:text-white">{messages.nav.home}</Link>
            <Link href={`/${locale}/services`} className="transition hover:text-white">{messages.nav.services}</Link>
            <Link href={`/${locale}/marketplace`} className="transition hover:text-white">{messages.nav.marketplace}</Link>
            <Link href={`/${locale}/visa-guide`} className="transition hover:text-white">{messages.nav.guide}</Link>
            <Link href={`/${locale}/business`} className="transition hover:text-white">{messages.nav.business}</Link>
            <Link href={`/${locale}/testimonials`} className="transition hover:text-white">{messages.nav.testimonials}</Link>
            <Link href={`/${locale}/blog`} className="transition hover:text-white">{messages.blog.title}</Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={`/${locale}/services`}
              className="hidden rounded-full bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-400 lg:inline-flex"
            >
              {messages.nav.cta}
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image src="/khmera-mark.svg" width={40} height={40} alt="" />
            <p>{messages.site.name} · {messages.footer.rights}</p>
          </div>
          <div className="flex items-center gap-5">
            <Link href={`/${locale}/services`} className="hover:text-white">{messages.nav.services}</Link>
            <Link href={`/${locale}/marketplace`} className="hover:text-white">{messages.nav.marketplace}</Link>
            <Link href={`/${locale}/visa-guide`} className="hover:text-white">{messages.nav.guide}</Link>
            <Link href={`/${locale}/testimonials`} className="hover:text-white">{messages.nav.testimonials}</Link>
            <Link href={`/${locale}/credits`} className="hover:text-white">{messages.photos.creditsLink}</Link>
            <Link href={`/${locale}/blog`} className="hover:text-white">{messages.blog.title}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
