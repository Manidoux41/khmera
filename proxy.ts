import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { adminBasePath, internalAdminPath } from "@/lib/admin/config";
import { defaultLocale, locales } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Secret admin link: rewrite to the internal /admin routes. Direct /admin
  // requests are not matched here and end up on the localized 404.
  if (pathname === adminBasePath || pathname.startsWith(`${adminBasePath}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = `${internalAdminPath}${pathname.slice(adminBasePath.length)}`;
    const response = NextResponse.rewrite(url);
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language") ?? "";
    const preferredLocale = locales.find((locale) =>
      acceptLanguage.toLowerCase().includes(locale.toLowerCase()),
    );

    const targetLocale = preferredLocale ?? defaultLocale;
    return NextResponse.redirect(new URL(`/${targetLocale}`, request.url));
  }

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const hasLocalePrefix = segments.length > 0 && locales.includes(segments[0] as (typeof locales)[number]);

  if (segments.length > 0 && !hasLocalePrefix) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  return NextResponse.next();
}
