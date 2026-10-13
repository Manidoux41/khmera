import assert from "node:assert/strict";
import test from "node:test";

test("private presentation and directory require a valid admin session", {
  skip: !process.env.ADMIN_TEST_BASE_URL,
}, async () => {
  const base = process.env.ADMIN_TEST_BASE_URL;
  assert.ok(["localhost", "127.0.0.1"].includes(new URL(base).hostname), "Run mock login tests only against a local preview");
  const login = (password) => fetch(new URL("/api/admin/session", base), {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@khmera.local", password }),
  });
  assert.equal((await login("wrong-password")).status, 401);
  assert.equal((await fetch(new URL("/api/admin/data-export", base))).status, 401);
  assert.equal((await fetch(new URL("/api/admin/data-export", base), { headers: { Cookie: "khmera_admin_session=invalid" } })).status, 401);
  const paths = ["/khm-console-7f3a9c/partners", "/khm-console-7f3a9c/contacts", "/khm-console-7f3a9c", "/khm-console-7f3a9c/blog"];
  for (const path of paths) {
    for (const headers of [{}, { Cookie: "khmera_admin_session=invalid" }]) {
      const response = await fetch(new URL(path, base), { headers });
      const html = await response.text();
      assert.ok(!html.includes('class="partner-presentation'));
      assert.ok(!html.includes("Répertoire privé — clients et partenaires"));
      assert.ok(!html.includes('id="business-cards"'));
      assert.ok(!html.includes('class="admin-sidebar"'));
      assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
    }
  }
  const response = await login("Khmera#Admin2026");
  assert.equal(response.status, 200);
  const cookie = response.headers.get("set-cookie")?.split(";")[0];
  assert.ok(cookie);
  try {
    const exported = await fetch(new URL("/api/admin/data-export", base), { headers: { Cookie: cookie } });
    assert.equal(exported.status, 200);
    assert.equal(exported.headers.get("cache-control"), "no-store");
    assert.match(exported.headers.get("content-disposition"), /attachment/);
    const catalog = await exported.json();
    assert.equal(catalog.databaseConnected, false);
    assert.equal(catalog.version, 1);
    assert.equal(catalog.data.services.length, 12);
    assert.equal(catalog.data.offers.length, 4);
    assert.equal(catalog.data.siteTranslations.length, 4);
    assert.equal(catalog.data.mediaAssets.length, 16);
    assert.equal(catalog.data.blogPosts[0].status, "draft");
    assert.equal(catalog.data.testimonials.every(item => item.fictional === true), true);
    assert.equal(catalog.data.services.filter(item => item.kind === "marketplace").every(item => item.isDemo), true);
    assert.doesNotMatch(JSON.stringify(catalog), /Khmera#Admin2026|passwordHash|passwordSalt|ADMIN_SESSION_SECRET|blob:/);
    const assetIds = new Set(catalog.data.mediaAssets.map(asset => asset.id));
    assert.ok(assetIds.has("angkor-wat-sunrise"));
    assert.ok(catalog.data.testimonials.every(item => assetIds.has(item.photo.connect.id)));
    for (const service of catalog.data.services) assert.equal(service.translations.create.length, 4);
    const dashboard = await fetch(new URL(paths[2], base), { headers: { Cookie: cookie } });
    const dashboardHtml = await dashboard.text();
    assert.ok(dashboardHtml.includes('id="business-cards"'));
    assert.ok(dashboardHtml.includes("076-252-3154"));
    assert.ok(dashboardHtml.includes('aria-label="Navigation administration"'));
    const loginPage = await fetch(new URL("/khm-console-7f3a9c/login", base));
    assert.ok(!(await loginPage.text()).includes('class="admin-sidebar"'));
    const contacts = await fetch(new URL(paths[1], base), { headers: { Cookie: cookie } });
    assert.ok((await contacts.text()).includes("Répertoire privé — clients et partenaires"));
    for (const locale of ["fr", "en", "es", "de"]) {
      const page = await fetch(new URL(`${paths[0]}?locale=${locale}`, base), { headers: { Cookie: cookie } });
      const html = await page.text();
      assert.ok(html.includes('class="partner-presentation'));
      const article = html.match(/<article class="partner-presentation[\s\S]*?<\/article>/)?.[0];
      assert.ok(article);
      assert.doesNotMatch(article, /khm-console|\/admin|\/partners|49|249|399|99|USD/);
      assert.ok(article.includes(`https://khmera.vercel.app/${locale}`));
      assert.equal(page.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
    }
    const home = await fetch(new URL("/fr", base), { headers: { Cookie: cookie } });
    const homeHtml = await home.text();
    assert.ok(!homeHtml.includes('href="/fr/partners"'));
    assert.ok(!homeHtml.includes('id="business-cards"'));
    assert.equal((await fetch(new URL("/fr/partners", base), { headers: { Cookie: cookie } })).status, 404);
    assert.equal((await fetch(new URL("/admin/partners", base), { headers: { Cookie: cookie } })).status, 404);
  } finally {
    assert.equal((await fetch(new URL("/api/admin/session", base), { method: "DELETE", headers: { Cookie: cookie } })).status, 204);
  }
});
