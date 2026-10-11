// Public, non-guessable entry point of the admin area. The proxy rewrites
// `/<ADMIN_ACCESS_PATH>/*` to the internal `/admin/*` routes, which are not
// reachable directly (they fall through to the localized 404).
const DEFAULT_ADMIN_ACCESS_PATH = "khm-console-7f3a9c";

function normalizeAccessPath(value: string | undefined) {
  const cleaned = (value ?? "").trim().replace(/^\/+|\/+$/g, "");
  return /^[a-zA-Z0-9-_]{8,}$/.test(cleaned) ? cleaned : DEFAULT_ADMIN_ACCESS_PATH;
}

export const adminAccessPath = normalizeAccessPath(process.env.ADMIN_ACCESS_PATH);
export const adminBasePath = `/${adminAccessPath}`;
export const internalAdminPath = "/admin";

export function adminHref(path = "") {
  return `${adminBasePath}${path}`;
}

export const ADMIN_SESSION_COOKIE = "khmera_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8;
