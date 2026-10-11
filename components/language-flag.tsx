import type { Locale } from "@/lib/i18n";

export function LanguageFlag({ locale }: { locale: Locale }) {
  return (
    <svg viewBox="0 0 30 20" className="h-4 w-6 shrink-0 rounded-sm ring-1 ring-white/20" aria-hidden="true" focusable="false">
      {locale === "en" && <>
        <path fill="#12356f" d="M0 0h30v20H0z" />
        <path stroke="#fff" strokeWidth="5" d="m0 0 30 20M30 0 0 20" />
        <path stroke="#c9203b" strokeWidth="2" d="m0 0 30 20M30 0 0 20" />
        <path stroke="#fff" strokeWidth="7" d="M15 0v20M0 10h30" />
        <path stroke="#c9203b" strokeWidth="4" d="M15 0v20M0 10h30" />
      </>}
      {locale === "fr" && <>
        <path fill="#fff" d="M0 0h30v20H0z" /><path fill="#12356f" d="M0 0h10v20H0z" /><path fill="#c9203b" d="M20 0h10v20H20z" />
      </>}
      {locale === "es" && <>
        <path fill="#c9203b" d="M0 0h30v20H0z" /><path fill="#f8c947" d="M0 5h30v10H0z" /><path fill="#c9203b" d="M8 8h4v4l-2 2-2-2z" />
      </>}
      {locale === "de" && <>
        <path fill="#141414" d="M0 0h30v7H0z" /><path fill="#c9203b" d="M0 7h30v6H0z" /><path fill="#f8c947" d="M0 13h30v7H0z" />
      </>}
    </svg>
  );
}
