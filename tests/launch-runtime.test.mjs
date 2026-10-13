import assert from "node:assert/strict";
import test from "node:test";

const base = process.env.ADMIN_TEST_BASE_URL;
const closedBase = process.env.ADMIN_CLOSED_TEST_BASE_URL;
const pages = ["about", "contact", "legal-notice", "terms", "privacy", "listing-terms", "advertising", "report"];

test("production without configured account rejects the mock, even with a session secret", { skip: !closedBase }, async () => {
  assert.ok(["localhost", "127.0.0.1"].includes(new URL(closedBase).hostname));
  const response = await fetch(new URL("/api/admin/session", closedBase), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "admin@khmera.local", password: "Khmera#Admin2026" }) });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).error, "admin_credentials_missing");
  assert.equal(response.headers.get("set-cookie"), null);
});
test("32 localized legal drafts expose canonical links, disclosures and missing operator fields", { skip: !base }, async () => {
  assert.ok(["localhost", "127.0.0.1"].includes(new URL(base).hostname));
  for (const locale of ["en", "fr", "es", "de"]) {
    for (const page of pages) {
      const response = await fetch(new URL(`/${locale}/${page}`, base), { headers: { "User-Agent": "Googlebot" } });
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.match(html, /<meta name="robots" content="noindex, follow"/);
      assert.ok(html.includes(`https://khmera.vercel.app/${locale}/${page}`));
      for (const language of ["en", "fr", "es", "de"]) assert.ok(html.includes(`https://khmera.vercel.app/${language}/${page}`));
      assert.ok(html.includes("2026-10-13"));
      for (const footerPage of pages) assert.ok(html.includes(`href="/${locale}/${footerPage}"`));
      if (page === "legal-notice") {
        assert.ok(html.includes("manfredparbatia@gmail.com"));
        assert.doesNotMatch(html, /ADMIN_PASSWORD_HASH|ADMIN_SESSION_SECRET|Local_Launch_Test_2026/);
      }
      if (page === "report") {
        assert.match(html, /name="target"/); assert.match(html, /name="consent"/);
      }
    }
    for (const slug of ["premium-condo-rentals", "business-registration", "family-relocation", "private-transfers"]) {
      const response = await fetch(new URL(`/${locale}/marketplace/${slug}`, base));
      const html = await response.text();
      assert.ok(html.includes(`/${locale}/report?target=`));
    }
  }
  assert.equal((await fetch(new URL("/fr/not-a-legal-page", base))).status, 404);
  const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
  assert.doesNotMatch(sitemap, /\/legal-notice|\/privacy|\/launch|\/tariffs/);
});
test("launch manager is private and synthetic account receives a protected session", { skip: !base }, async () => {
  const unauthenticated = await fetch(new URL("/khm-console-7f3a9c/launch", base));
  assert.equal(unauthenticated.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
  assert.ok(!(await unauthenticated.text()).includes('id="launch-manager"'));
  const login = await fetch(new URL("/api/admin/session", base), {
    method: "POST", headers: { "Content-Type": "application/json", Origin: new URL(base).origin },
    body: JSON.stringify({ email: process.env.ADMIN_TEST_EMAIL, password: process.env.ADMIN_TEST_PASSWORD }),
  });
  assert.equal(login.status, 200);
  const sessionCookie = login.headers.get("set-cookie");
  assert.match(sessionCookie, /HttpOnly/i);
  assert.match(sessionCookie, /Secure/i);
  assert.match(sessionCookie, /SameSite=strict/i);
  const cookie = sessionCookie.split(";")[0];
  try {
    const response = await fetch(new URL("/khm-console-7f3a9c/launch", base), { headers: { Cookie: cookie } });
    const html = await response.text();
    assert.match(html, /id="launch-manager"/);
    for (const section of ["professionals", "reports", "campaigns", "regulatory"]) assert.ok(html.includes(`/launch#${section}`));
    assert.ok(html.includes("Aucune fiche dans cette section"));
    assert.doesNotMatch(html, /ADMIN_PASSWORD_HASH|ADMIN_SESSION_SECRET/);
    assert.equal((await fetch(new URL("/admin/launch", base), { headers: { Cookie: cookie } })).status, 404);
    assert.equal((await fetch(new URL("/fr/launch", base))).status, 404);
  } finally {
    assert.equal((await fetch(new URL("/api/admin/session", base), { method: "DELETE", headers: { Cookie: cookie } })).status, 204);
  }
});
