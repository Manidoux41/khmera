import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

import { findAdminById, type AdminAccount } from "@/lib/admin/accounts";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_TTL_SECONDS } from "@/lib/admin/config";

type SessionPayload = { sub: string; exp: number };

const DEV_SESSION_SECRET = "khmera-dev-only-admin-session-secret-change-me";

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_SESSION_SECRET must be set (32+ characters) in production.");
  }
  return DEV_SESSION_SECRET;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function createSessionToken(adminId: string, now = Date.now()) {
  const payload: SessionPayload = {
    sub: adminId,
    exp: Math.floor(now / 1000) + ADMIN_SESSION_TTL_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function readSessionToken(token: string | undefined, now?: number): SessionPayload | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = Buffer.from(sign(encoded));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
    if (typeof payload.sub !== "string" || typeof payload.exp !== "number") return null;
    // Read the clock only once a signed token is present (request-time data).
    if (payload.exp * 1000 <= (now ?? Date.now())) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function setAdminSession(adminId: string) {
  (await cookies()).set(ADMIN_SESSION_COOKIE, createSessionToken(adminId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(ADMIN_SESSION_COOKIE);
}

/** Data Access Layer entry point: returns the signed-in admin or null. */
export async function getCurrentAdmin(): Promise<AdminAccount | null> {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  // Expiry depends on the current time, so the check must run at request time.
  await connection();
  const payload = readSessionToken(token);
  return payload ? findAdminById(payload.sub) : null;
}
