import { verifyAdminCredentials } from "@/lib/admin/accounts";
import { clearAdminSession, getCurrentAdmin, sessionSecretProblem, setAdminSession } from "@/lib/admin/session";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  return Response.json({ data: admin }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: unknown; password?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return Response.json({ error: "missing_credentials" }, { status: 400 });
  }

  const secretProblem = sessionSecretProblem();
  if (secretProblem) {
    return Response.json({ error: `session_secret_${secretProblem}` }, { status: 503 });
  }

  const admin = verifyAdminCredentials(email, password);
  if (!admin) {
    return Response.json({ error: "invalid_credentials" }, { status: 401 });
  }

  await setAdminSession(admin.id);
  return Response.json({ data: admin });
}

export async function DELETE() {
  await clearAdminSession();
  return new Response(null, { status: 204 });
}
