const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://khmera.vercel.app";
const parsedUrl = new URL(configuredUrl);

if (!["http:", "https:"].includes(parsedUrl.protocol) || parsedUrl.username || parsedUrl.password || parsedUrl.pathname !== "/" || parsedUrl.search || parsedUrl.hash) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without a path, credentials, query or fragment.");
}

export const siteUrl = new URL(parsedUrl.origin);
export const isIndexableDeployment = process.env.VERCEL_ENV !== "preview" && process.env.VERCEL_ENV !== "development";
