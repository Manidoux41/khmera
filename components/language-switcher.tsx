"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { LanguageFlag } from "@/components/language-flag";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const messages = getDictionary(currentLocale);
  const segments = pathname.split("/").filter(Boolean);
  const currentSegments =
    segments.length > 0 && locales.includes(segments[0] as Locale)
      ? segments.slice(1)
      : segments;

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/70 p-1 text-xs text-slate-200">
      {locales.map((locale) => {
        const href = `/${locale}${currentSegments.length > 0 ? `/${currentSegments.join("/")}` : ""}`;
        const active = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={href}
            className={[
              "flex min-h-11 items-center gap-2 rounded-full px-2.5 py-1.5 transition-colors",
              active ? "bg-emerald-500 text-white shadow-sm" : "hover:bg-slate-800 text-slate-200",
            ].join(" ")}
            aria-label={messages.languageNames[locale]}
            hrefLang={locale}
            aria-current={active ? "page" : undefined}
          >
            <LanguageFlag locale={locale} />
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
