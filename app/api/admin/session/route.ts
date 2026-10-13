import { adminCredentialsConfigured, verifyAdminCredentials } from "@/lib/admin/accounts";
import { clearAdminSession, getCurrentAdmin, sessionSecretProblem, setAdminSession } from "@/lib/admin/session";
import { allowLoginAttempt } from "@/lib/admin/login-limiter";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  return Response.json({ data: admin }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) {
    return Response.json({ error: "invalid_origin" }, { status: 403 });
  }
  if (Number(request.headers.get("content-length") ?? 0) > 4096) {
    return Response.json({ error: "request_too_large" }, { status: 413 });
  }
  const reader = request.body?.getReader();
  let text = "";
  let bytes = 0;
  if (reader) {
    const decoder = new TextDecoder();
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 4096) {
        await reader.cancel();
        return Response.json({ error: "request_too_large" }, { status: 413 });
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
  }
  let body: { email?: unknown; password?: unknown } | null;
  try { body = JSON.parse(text); } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password || email.length > 254 || password.length > 256) {
    return Response.json({ error: "missing_credentials" }, { status: 400 });
  }

  if (!adminCredentialsConfigured()) {
    return Response.json({ error: "admin_credentials_missing" }, { status: 503 });
  }
  if (!allowLoginAttempt(email.trim().toLowerCase())) {
    return Response.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": "900" } });
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
