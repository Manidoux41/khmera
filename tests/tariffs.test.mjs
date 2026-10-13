import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

function load(path, dependencies = {}) {
  const exports = {};
  const { outputText } = ts.transpileModule(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  runInNewContext(outputText, { exports, Intl, require(name) {
    assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);
    return dependencies[name];
  } });
  return exports;
}
const { tariffCopy } = load("lib/admin/tariff-copy.ts");
const { businessCardCopy } = load("lib/admin/business-card-copy.ts");
const partners = load("lib/partners/copy.ts");
const { getDictionary, locales } = load("lib/i18n.ts", { "./partners/copy": partners });
const { offers, formatOfferPrice } = load("lib/services/offers.ts");

function leafPaths(value, prefix = "") {
  return Object.entries(value).flatMap(([key, item]) => typeof item === "string" ? [`${prefix}${key}`] : leafPaths(item, `${prefix}${key}.`));
}
test("all private tariff labels are complete and localized in four languages", () => {
  for (const locale of locales) {
    const copy = tariffCopy[locale];
    assert.deepEqual(leafPaths(copy), leafPaths(tariffCopy.fr));
    assert.equal(copy.steps.length, 3);
    for (const value of Object.values(copy)) {
      if (typeof value === "string") assert.ok(value.trim());
      else for (const item of Object.values(value)) assert.ok(item.trim());
    }
    if (locale !== "fr") {
      for (const key of ["print", "privateNotice", "conditions", "objective", "footer"]) assert.notEqual(copy[key], tariffCopy.fr[key]);
      assert.notEqual(copy.recipient.attention, tariffCopy.fr.recipient.attention);
    }
  }
});
test("all sixteen tariff contents use existing translated packages and unchanged USD fees", () => {
  for (const locale of locales) {
    const commerce = getDictionary(locale).commerce;
    for (const offer of offers) {
      const copy = commerce.offers[offer.slug];
      for (const key of ["name", "audience", "summary"]) assert.ok(copy[key].trim());
      assert.equal(copy.includes.length, 3);
      assert.ok(commerce.exclusions && commerce.pricingNote);
      assert.equal(formatOfferPrice(offer.priceUsd, locale), new Intl.NumberFormat(locale, { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(offer.priceUsd));
    }
    assert.ok(businessCardCopy[locale].tagline);
  }
});

test("private tariff responses localize every package and preserve menu context", { skip: !process.env.ADMIN_TEST_BASE_URL }, async () => {
  const base = process.env.ADMIN_TEST_BASE_URL;
  assert.ok(["localhost", "127.0.0.1"].includes(new URL(base).hostname));
  const login = await fetch(new URL("/api/admin/session", base), {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: process.env.ADMIN_TEST_EMAIL || "admin@khmera.local", password: process.env.ADMIN_TEST_PASSWORD || "Khmera#Admin2026" }),
  });
  assert.equal(login.status, 200);
  const cookie = login.headers.get("set-cookie").split(";")[0];
  try {
    for (const locale of locales) for (const offer of offers) {
      const response = await fetch(new URL(`/khm-console-7f3a9c/tariffs?locale=${locale}&offer=${offer.slug}`, base), { headers: { Cookie: cookie } });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
      const html = await response.text();
      const article = html.match(/<article class="tariff-sheet"[\s\S]*?<\/article>/)?.[0]
        .replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
      assert.ok(article);
      assert.ok(article.includes(`lang="${locale}"`));
      assert.ok(article.includes(getDictionary(locale).commerce.offers[offer.slug].name));
      for (const text of [tariffCopy[locale].privateNotice, tariffCopy[locale].objective, tariffCopy[locale].footer, businessCardCopy[locale].tagline, formatOfferPrice(offer.priceUsd, locale)]) assert.ok(article.includes(text), `${locale}/${offer.slug}: ${text}`);
      for (const language of locales) assert.ok(html.includes(`locale=${language}&amp;offer=${offer.slug}`));
      for (const other of offers) assert.ok(html.includes(`locale=${locale}&amp;offer=${other.slug}`));
      assert.doesNotMatch(article, /ADMIN_PASSWORD_HASH|ADMIN_SESSION_SECRET/);
    }
    for (const query of ["", "?locale=unsupported", "?locale=fr&locale=de"]) {
      const html = await (await fetch(new URL(`/khm-console-7f3a9c/tariffs${query}`, base), { headers: { Cookie: cookie } })).text();
      assert.ok(html.includes('class="tariff-sheet" data-offer="cambodia-diagnostic" lang="fr"'));
    }
    const unauthenticated = await (await fetch(new URL("/khm-console-7f3a9c/tariffs?locale=en", base))).text();
    assert.ok(!unauthenticated.includes('class="tariff-sheet"'));
  } finally {
    await fetch(new URL("/api/admin/session", base), { method: "DELETE", headers: { Cookie: cookie } });
  }
});
