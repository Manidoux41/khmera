import type { NextRequest } from "next/server";

import { getCurrentAdmin } from "@/lib/admin/session";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { isServiceKind, isServiceStatus, listServices } from "@/lib/services/catalog";

export async function GET(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const localeParam = params.get("locale") ?? defaultLocale;
  const status = params.get("status");
  const kind = params.get("kind");

  if (!isLocale(localeParam)) {
    return Response.json({ error: "invalid_locale" }, { status: 400 });
  }
  if (status !== null && !isServiceStatus(status)) {
    return Response.json({ error: "invalid_status" }, { status: 400 });
  }
  if (kind !== null && !isServiceKind(kind)) {
    return Response.json({ error: "invalid_kind" }, { status: 400 });
  }

  const services = await listServices(localeParam, {
    status: status ?? undefined,
    kind: kind ?? undefined,
  });

  return Response.json(
    { data: services, meta: { total: services.length, locale: localeParam } },
    { headers: { "Cache-Control": "no-store" } },
  );
}
