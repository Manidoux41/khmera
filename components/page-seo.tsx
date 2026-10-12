import type { Locale } from "@/lib/i18n";
import { getPageSeo, pageStructuredData, serializeStructuredData, type SeoPage } from "@/lib/seo";

export function PageSeo({ locale, route }: { locale: Locale; route: SeoPage }) {
  const seo = getPageSeo(locale, route);
  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={seo.index ? "index, follow, max-image-preview:large" : "noindex, follow"} />
      <link rel="canonical" href={seo.canonical} />
      {Object.entries(seo.alternates).map(([language, href]) => (
        <link key={language} rel="alternate" hrefLang={language} href={href} />
      ))}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="KHMERA" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:locale" content={seo.socialLocale} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.imageAlt} />
      {seo.index && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(pageStructuredData(locale, route)) }} />}
    </>
  );
}
