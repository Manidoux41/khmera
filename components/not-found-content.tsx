"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";

export function NotFoundContent() {
  const pathname = usePathname();
  const prefix = pathname.split("/")[1];
  const locale = isLocale(prefix) ? prefix : defaultLocale;
  const messages = getDictionary(locale);

  return (
    <div lang={locale} className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <title>{`404 · ${messages.site.name}`}</title>
      <div className="max-w-md text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">404</p>
        <h1 className="mt-4 text-4xl font-semibold">{messages.notFound.heading}</h1>
        <p className="mt-3 text-slate-300">{messages.notFound.description}</p>
        <Link href={`/${locale}`} className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white">
          {messages.notFound.home}
        </Link>
      </div>
    </div>
  );
}
