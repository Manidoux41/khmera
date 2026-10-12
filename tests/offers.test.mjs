import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

function load(path, dependencies = {}) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    Intl,
    require(name) {
      assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  return exports;
}

const i18n = load("lib/i18n.ts");
const pricing = load("lib/services/offers.ts");
const booking = load("lib/services/booking-email.ts", {
  "@/lib/i18n": i18n,
  "@/lib/services/offers": pricing,
});
const catalog = load("lib/services/catalog.ts", {
  "@/lib/i18n": i18n,
  "@/lib/services/offers": pricing,
});

test("four agreed packages have stable unique slugs and fees in USD", () => {
  assert.deepEqual(Array.from(pricing.offers, (offer) => offer.priceUsd), [49, 249, 399, 99]);
  assert.equal(new Set(pricing.offerSlugs).size, 4);
  assert.deepEqual(Array.from(pricing.offers, (offer) => offer.slug), Array.from(pricing.offerSlugs));
  for (const offer of pricing.offers) assert.equal(pricing.getOffer(offer.slug), offer);
  for (const slug of ["unknown", "", "__proto__", "toString"]) assert.equal(pricing.getOffer(slug), undefined);
});

test("discovery travel is a tourism planning offer with localized email requests", async () => {
  const offer = pricing.getOffer("discovery-trip");
  assert.equal(offer.priceUsd, 99);
  assert.equal(offer.category, "tourism");
  for (const locale of i18n.locales) {
    const copy = i18n.dictionaries[locale].commerce;
    const item = copy.offers[offer.slug];
    assert.match(item.summary, /Phnom Penh/);
    assert.match(item.summary, /Siem Reap/);
    assert.match(item.includes[0], /45/);
    const services = await catalog.listServices(locale, { kind: "core", status: "active" });
    const record = services.find((service) => service.id === "offer_discovery-trip");
    assert.equal(record.category, "tourism");
    assert.equal(record.publicPath, `/${locale}/services/discovery-trip`);
    const subject = `${copy.form.subject} - ${item.name}`;
    const link = new URL(pricing.bookingMailto(subject, item.includes.join("\n")));
    assert.equal(link.searchParams.get("subject"), subject);
    assert.equal(link.searchParams.get("body"), item.includes.join("\n"));
  }
});

test("each package is translated with explicit deliverables in all four locales", () => {
  for (const locale of i18n.locales) {
    const copy = i18n.dictionaries[locale].commerce;
    assert.deepEqual(Object.keys(copy.offers), Array.from(pricing.offerSlugs));
    assert.equal(copy.steps.length, 3);
    for (const offer of pricing.offers) {
      assert.equal(copy.offers[offer.slug].includes.length, 3);
      assert.ok(copy.offers[offer.slug].name);
      assert.ok(pricing.formatOfferPrice(offer.priceUsd, locale).includes(String(offer.priceUsd)));
    }
  }
});

test("admin catalog exposes the public package prices and localized paths", async () => {
  for (const locale of i18n.locales) {
    const records = await catalog.listServices(locale);
    assert.equal(new Set(records.map((record) => record.id)).size, records.length);
    for (const offer of pricing.offers) {
      const record = records.find((item) => item.id === `offer_${offer.slug}`);
      assert.ok(record);
      assert.equal(record.name, i18n.dictionaries[locale].commerce.offers[offer.slug].name);
      assert.equal(record.publicPath, `/${locale}/services/${offer.slug}`);
      assert.ok(record.pricing.startsWith(pricing.formatOfferPrice(offer.priceUsd, locale)));
    }
    const inactive = await catalog.listServices(locale, { status: "inactive", kind: "core" });
    assert.equal(inactive.length, 0);
    const marketplace = await catalog.listServices(locale, { kind: "marketplace" });
    assert.equal(marketplace.length, 4);
    assert.ok(marketplace.every((record) => !record.id.startsWith("offer_")));
  }
});

test("email draft links preserve Unicode and encode user input without extra headers", () => {
  const body = "Nom: André & Léa\nProjet: Phnom Penh? budget=500#USD\nDate: 2026-11-01";
  const subject = "Diagnostic Cambodge\r\nBcc: nobody@example.test";
  const link = new URL(pricing.bookingMailto(subject, body));
  assert.equal(link.protocol, "mailto:");
  assert.equal(link.pathname, "manfredparbatia@gmail.com");
  assert.equal(link.searchParams.get("body"), body);
  assert.equal(link.searchParams.get("subject"), subject.replace(/[\r\n]/g, " "));
  assert.deepEqual(Array.from(link.searchParams.keys()), ["subject", "body"]);
});

test("complete booking emails follow the locale for every package and preserve visitor text", () => {
  const details = {
    name: " André & Léa ",
    email: "test@example.test",
    city: "Siem Reap",
    date: "2026-11-01",
    project: "Mon projet reste dans sa langue d'origine : 東京 & découverte.",
  };
  const expectedDates = {
    en: "November 1, 2026",
    fr: "1 novembre 2026",
    es: "1 de noviembre de 2026",
    de: "1. November 2026",
  };
  for (const locale of i18n.locales) {
    const copy = i18n.dictionaries[locale].commerce;
    for (const offer of pricing.offers) {
      const draft = booking.createBookingEmail(locale, offer, details);
      assert.equal(draft.subject, `${copy.form.subject} - ${copy.offers[offer.slug].name}`);
      assert.ok(draft.body.startsWith(copy.email.greeting));
      assert.ok(draft.body.endsWith(copy.email.closing));
      for (const text of [
        copy.email.introduction,
        `${copy.email.offer}: ${copy.offers[offer.slug].name}`,
        `${copy.email.price}: ${pricing.formatOfferPrice(offer.priceUsd, locale)}`,
        `${copy.email.preferredDate}: ${expectedDates[locale]}`,
        `${copy.email.language}: ${copy.email.languageName} (${locale})`,
        `${copy.form.name}: André & Léa`,
        details.project,
        copy.form.consent,
        copy.pricingNote,
        copy.exclusions,
        ...copy.offers[offer.slug].includes,
      ]) assert.ok(draft.body.includes(text), `${locale}/${offer.slug}: ${text}`);
      const link = new URL(pricing.bookingMailto(draft.subject, draft.body));
      assert.equal(link.searchParams.get("subject"), draft.subject);
      assert.equal(link.searchParams.get("body"), draft.body);
      const withoutDate = booking.createBookingEmail(locale, offer, { ...details, date: "" });
      assert.ok(!withoutDate.body.includes(`${copy.email.preferredDate}:`));
      if (locale !== "en") {
        assert.ok(!draft.body.includes(i18n.dictionaries.en.commerce.email.introduction));
      }
    }
  }
});

test("booking dates reject malformed or impossible dates instead of silently shifting days", () => {
  for (const value of ["2026-02-30", "2026-13-01", "not-a-date", "11/01/2026"]) {
    assert.throws(() => booking.formatBookingDate(value, "fr"), /Invalid booking date/);
  }
});
