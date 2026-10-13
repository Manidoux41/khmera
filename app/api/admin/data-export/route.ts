import { getCurrentAdmin } from "@/lib/admin/session";
import { prepareCatalog } from "@/lib/data/catalog-preparation";

export async function GET() {
  const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" };
  if (!await getCurrentAdmin()) {
    return Response.json({ error: "unauthorized" }, { status: 401, headers });
  }
  return Response.json(await prepareCatalog(), {
    headers: { ...headers, "Content-Disposition": 'attachment; filename="khmera-catalogue-prisma.json"' },
  });
}
