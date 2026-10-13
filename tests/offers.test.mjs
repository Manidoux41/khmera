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

const partnerCopy = load("lib/partners/copy.ts");
const i18n = load("lib/i18n.ts", { "./partners/copy": partnerCopy });
const pricing = load("lib/services/offers.ts");
const booking = load("lib/services/booking-email.ts", {
  "@/lib/i18n": i18n,
  "@/lib/services/offers": pricing,
});
const partnerEmail = load("lib/partners/email.ts", { "@/lib/i18n": i18n });
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
    assert.doesNotMatch(item.summary, /Phnom Penh/);
    assert.match(item.summary, /Siem Reap/);
    assert.match(item.summary, /Angkor/);
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

test("launch positioning focuses all four locales and packages on Siem Reap", () => {
  for (const locale of i18n.locales) {
    const copy = i18n.dictionaries[locale];
    assert.equal(copy.home.city, "Siem Reap");
    for (const text of [
      copy.hero.title, copy.hero.description, copy.site.description,
      copy.commerce.heading, copy.commerce.description, copy.services.heading,
      copy.services.planDescription, copy.visa.heading, copy.business.heading,
      copy.cta.heading, copy.photos.galleryHeading,
    ]) {
      assert.match(text, /Siem Reap/, locale);
      assert.doesNotMatch(text, /Phnom Penh/, locale);
    }
    for (const offer of pricing.offers) {
      assert.match(copy.commerce.offers[offer.slug].summary, /Siem Reap/);
    }
    for (const page of ["home", "services", "guide", "business"]) {
      assert.match(copy.seo[page].title, /Siem Reap/);
      assert.match(copy.seo[page].description, /Siem Reap/);
    }
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

test("partner enquiries use localized fields and preserve details without booking language", () => {
  const details = {
    name: " André & Léa ", email: "demo@example.test",
    organization: " Maison & voyages\r\nSiem Reap ", activity: "Hébergement",
    city: " Siem Reap ", project: "Proposition personnelle : découverte & accueil 東京.",
  };
  for (const locale of i18n.locales) {
    const copy = i18n.dictionaries[locale];
    const draft = partnerEmail.createPartnerEmail(locale, details);
    assert.equal(draft.subject, `${copy.partners.form.subject} - Maison & voyages  Siem Reap`);
    assert.doesNotMatch(draft.subject, /[\r\n]/);
    assert.ok(draft.body.startsWith(copy.commerce.email.greeting));
    assert.ok(draft.body.endsWith(copy.partners.form.closing));
    for (const line of [
      `${copy.commerce.form.name}: André & Léa`,
      `${copy.commerce.form.email}: demo@example.test`,
      `${copy.partners.form.organization}: ${details.organization.trim()}`,
      `${copy.partners.form.activity}: Hébergement`,
      `${copy.commerce.form.city}: Siem Reap`,
      `${copy.commerce.email.language}: ${copy.commerce.email.languageName} (${locale})`,
      `${copy.partners.form.project}: ${details.project}`,
      copy.partners.form.consent,
      copy.partners.form.introduction,
    ]) assert.ok(draft.body.includes(line), `${locale}: ${line}`);
    assert.ok(!draft.body.includes(copy.commerce.form.subject));
    const link = new URL(pricing.bookingMailto(draft.subject, draft.body));
    assert.equal(link.pathname, pricing.bookingEmail);
    assert.equal(link.searchParams.get("subject"), draft.subject);
    assert.equal(link.searchParams.get("body"), draft.body);
    assert.deepEqual(Array.from(link.searchParams.keys()), ["subject", "body"]);
  }
});

test("partner presentation targets local providers and explains future client introductions", () => {
  const sectors = {
    en: [/travel agencies/i, /guesthouses.*hotels/i, /real estate agencies/i],
    fr: [/agences de voyages/i, /guesthouses.*hôtels/i, /agences immobilières/i],
    es: [/agencias de viajes/i, /guesthouses.*hoteles/i, /agencias inmobiliarias/i],
    de: [/reisebüros/i, /guesthouses.*hotels/i, /immobilienagenturen/i],
  };
  for (const locale of i18n.locales) {
    const copy = i18n.dictionaries[locale].partners;
    assert.match(copy.title, /Siem Reap/);
    assert.equal(copy.audiences.length, 3);
    sectors[locale].forEach((sector, index) => assert.match(copy.audiences[index], sector));
    assert.equal(copy.referralSteps.length, 3);
    assert.ok(copy.responsibilities);
    assert.ok(copy.transparency);
    const presentation = [
      copy.title, copy.pitch, ...copy.audiences, ...copy.referralSteps,
      copy.responsibilities, copy.collaboration, copy.transparency,
    ].join("\n");
    assert.doesNotMatch(presentation, /49|249|399|99|USD/);
    assert.ok(!Object.hasOwn(copy, "packagesHeading"));
    assert.ok(!Object.hasOwn(copy, "pricing"));
  }
});
