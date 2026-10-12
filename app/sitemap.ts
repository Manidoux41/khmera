import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { offerSlugs } from "@/lib/services/offers";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) => ["", "/services", ...offerSlugs.map((slug) => `/services/${slug}`)].map((path) => ({
    url: new URL(`/${locale}${path}`, siteUrl).toString(),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  })));
}
