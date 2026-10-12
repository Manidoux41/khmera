import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { isIndexableDeployment } from "@/lib/site";
import { indexablePaths, languageAlternates, localizedUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableDeployment) return [];
  return locales.flatMap((locale) => indexablePaths.map((path) => ({
    url: localizedUrl(locale, path),
    alternates: { languages: languageAlternates(path) },
  })));
}
