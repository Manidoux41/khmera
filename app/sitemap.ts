import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.map((locale) => ({
    url: new URL(`/${locale}`, siteUrl).toString(),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  }));
}
