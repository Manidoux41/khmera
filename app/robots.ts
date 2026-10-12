import type { MetadataRoute } from "next";

import { isIndexableDeployment, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
