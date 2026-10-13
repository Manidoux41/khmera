import { defaultLocale, getDictionary, listingSlugs, locales, type Locale, type Messages } from "@/lib/i18n";
import { getOffer, offerSlugs } from "@/lib/services/offers";
import { isIndexableDeployment, siteUrl } from "@/lib/site";
import { getPublishedPost, publishedPosts } from "@/lib/blog/posts";

export const pagePaths = {
  home: "",
  services: "/services",
  guide: "/visa-guide",
  business: "/business",
  marketplace: "/marketplace",
  testimonials: "/testimonials",
  credits: "/credits",
  blog: "/blog",
} as const;

type PageKey = keyof typeof pagePaths;
export type SeoPage =
  | { page: PageKey }
  | { page: "offer"; slug: (typeof offerSlugs)[number] }
  | { page: "article"; slug: string }
  | { page: "listing"; slug: (typeof listingSlugs)[number] };

export function localizedUrl(locale: Locale, path: string) {
  return new URL(`/${locale}${path}`, siteUrl).toString();
}

export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, localizedUrl(locale, path)])),
    "x-default": localizedUrl(defaultLocale, path),
  };
}

export const indexablePaths = [
  pagePaths.home,
  pagePaths.services,
  pagePaths.guide,
  pagePaths.business,
  pagePaths.credits,
  ...offerSlugs.map((slug) => `/services/${slug}`),
  ...(publishedPosts.length ? ["/blog", ...publishedPosts.map((post) => `/blog/${post.slug}`)] : []),
];

export function getPageSeo(locale: Locale, route: SeoPage) {
  const messages = getDictionary(locale);
  let path: string;
  let copy: { title: string; description: string };
  if (route.page === "article") {
    const post = getPublishedPost(route.slug);
    if (!post) throw new Error(`Unpublished blog article: ${route.slug}`);
    path = `/blog/${post.slug}`;
    copy = { title: post.translations[locale].title, description: post.translations[locale].excerpt };
  } else if (route.page === "offer") {
    path = `/services/${route.slug}`;
    const offer = messages.commerce.offers[route.slug];
    copy = { title: offer.name, description: offer.summary };
  } else if (route.page === "listing") {
    path = `/marketplace/${route.slug}`;
    const index = listingSlugs.indexOf(route.slug);
    copy = { title: messages.marketplace.listings[index].title, description: messages.marketplace.descriptions[index] };
  } else {
    path = pagePaths[route.page];
    copy = messages.seo[route.page];
  }

  return {
    title: `${copy.title} | KHMERA`,
    description: copy.description,
    canonical: localizedUrl(locale, path),
    alternates: languageAlternates(path),
    index: isIndexableDeployment && indexablePaths.includes(path),
    image: new URL("/images/photos/angkor-wat-sunrise.jpg", siteUrl).toString(),
    imageAlt: messages.photos.alt["angkor-wat-sunrise"],
    socialLocale: { en: "en_US", fr: "fr_FR", es: "es_ES", de: "de_DE" }[locale],
  };
}

export function pageStructuredData(locale: Locale, route: SeoPage) {
  const seo = getPageSeo(locale, route);
  const messages: Messages = getDictionary(locale);
  const organizationId = new URL("/#organization", siteUrl).toString();
  const websiteId = new URL("/#website", siteUrl).toString();
  const pageId = `${seo.canonical}#webpage`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "KHMERA",
      url: siteUrl.toString(),
      logo: new URL("/khmera-mark.svg", siteUrl).toString(),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "KHMERA",
      url: siteUrl.toString(),
      publisher: { "@id": organizationId },
      inLanguage: [...locales],
    },
    {
      "@type": "WebPage",
      "@id": pageId,
      url: seo.canonical,
      name: seo.title,
      description: seo.description,
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      ...(route.page !== "home" ? { breadcrumb: { "@id": `${seo.canonical}#breadcrumb` } } : {}),
    },
  ];

  if (route.page !== "home") {
    const crumbs = [{ name: messages.nav.home, url: localizedUrl(locale, "") }];
    if (route.page === "offer") crumbs.push({ name: messages.nav.services, url: localizedUrl(locale, "/services") });
    if (route.page === "article") crumbs.push({ name: messages.blog.title, url: localizedUrl(locale, "/blog") });
    crumbs.push({ name: seo.title.replace(" | KHMERA", ""), url: seo.canonical });
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${seo.canonical}#breadcrumb`,
      itemListElement: crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    });
  }

  if (route.page === "article") {
    const post = getPublishedPost(route.slug);
    if (!post) throw new Error(`Unpublished blog article: ${route.slug}`);
    const articleId = `${seo.canonical}#article`;
    graph[2].mainEntity = { "@id": articleId };
    graph.push({
      "@type": "BlogPosting",
      "@id": articleId,
      headline: post.translations[locale].title,
      description: post.translations[locale].excerpt,
      articleBody: post.translations[locale].body,
      inLanguage: locale,
      author: { "@type": "Person", name: post.author },
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": pageId },
      url: seo.canonical,
    });
  }
  if (route.page === "offer") {
    const offer = getOffer(route.slug);
    if (!offer) throw new Error(`Unknown service offer: ${route.slug}`);
    const copy = messages.commerce.offers[route.slug];
    const serviceId = `${seo.canonical}#service`;
    graph[2].mainEntity = { "@id": serviceId };
    graph.push({
      "@type": "Service",
      "@id": serviceId,
      name: copy.name,
      description: `${copy.summary} ${copy.includes.join(". ")} ${messages.commerce.pricingNote} ${messages.commerce.exclusions}`,
      url: seo.canonical,
      provider: { "@id": organizationId },
      areaServed: { "@type": "City", name: "Siem Reap", containedInPlace: { "@type": "Country", name: "Cambodia" } },
      offers: {
        "@type": "Offer",
        url: seo.canonical,
        description: messages.commerce.pricingNote,
        seller: { "@id": organizationId },
      },
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
