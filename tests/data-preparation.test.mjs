import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

function load(path, dependencies = {}) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const exports = {};
  runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
    exports, Date,
    require(name) {
      assert.ok(Object.hasOwn(dependencies, name), `Unexpected runtime import ${name}`);
      return dependencies[name];
    },
  });
  return exports;
}
const cardCopy = load("lib/admin/business-card-copy.ts");
const card = load("lib/admin/business-card.ts", { "./business-card-copy": cardCopy });
const contacts = load("lib/admin/contacts.ts");
const founder = JSON.parse(readFileSync(new URL("../lib/blog/founder-story.json", import.meta.url), "utf8"));
const blog = load("lib/blog/posts.ts", { "./founder-story.json": { default: founder } });
const preparation = load("lib/data/preparation.ts", {
  "../admin/business-card": card, "../admin/business-card-copy": cardCopy, "../admin/contacts": contacts, "../blog/posts": blog,
});

test("contact preparation preserves IDs, all classifications and meaningful strings", () => {
  const contact = { id: "test_001", name: "  Démo  ", email: "", phone: "076-252-3154", organization: "", city: "Siem Reap", notes: "", categories: ["tourist", "retiree", "referrer", "partner"] };
  const [prepared] = preparation.prepareContacts([contact]);
  assert.equal(prepared.id, contact.id);
  assert.equal(prepared.name, contact.name);
  assert.equal(prepared.email, null);
  assert.equal(prepared.organization, null);
  assert.equal(prepared.notes, null);
  assert.equal(prepared.phone, contact.phone);
  assert.deepEqual([...prepared.categories], contact.categories);
  assert.throws(() => preparation.prepareContacts([contact, contact]));
});

test("agent preparation links background and excludes transient portrait and authentication data", () => {
  const agent = preparation.prepareAgent(card.defaultBusinessCard, "transparent");
  assert.equal(agent.role, "Conseiller en mise en relation");
  assert.equal(agent.telegram, "076-252-3154");
  assert.equal(agent.email, "manfredparbatia@gmail.com");
  assert.equal(agent.translations.create.length, 4);
  assert.equal(agent.cards.create.locale, "fr");
  const english = preparation.prepareAgent({ ...card.defaultBusinessCard, role: "Local partnership advisor" }, "fade", "en", cardCopy.defaultCardRoles());
  assert.equal(english.cards.create.locale, "en");
  assert.equal(english.translations.create.find(item => item.locale === "en").role, "Local partnership advisor");
  assert.equal(agent.cards.create.background.connect.id, "angkor-wat-sunrise");
  assert.equal(agent.cards.create.portraitTreatment, "transparent");
  assert.ok(!Object.hasOwn(agent, "portrait"));
  assert.ok(!Object.hasOwn(agent, "admin"));
  assert.throws(() => preparation.prepareAgent({ ...card.defaultBusinessCard, lastName: "" }, "fade"));
  assert.throws(() => preparation.prepareAgent(card.defaultBusinessCard, "invalid"));
});

test("blog preparation retains private drafts and four translation bodies without inventing a publish date", () => {
  const post = preparation.prepareBlogPost(founder);
  assert.equal(post.status, "draft");
  assert.equal(post.slug, founder.slug);
  assert.equal(post.translations.create.length, 4);
  assert.equal(post.translations.create.every(copy => copy.body === ""), true);
  assert.ok(!Object.hasOwn(post, "publishedAt"));
  assert.throws(() => preparation.prepareBlogPost({ ...founder, translations: { fr: founder.translations.fr } }));
  assert.throws(() => preparation.prepareBlogPost({ ...founder, slug: "../../invalid" }));
});

test("service preparation validates cross-locale identity and date while keeping translated pricing", () => {
  const base = { id: "svc_test", kind: "core", category: "advisory", status: "active", provider: "KHMERA", updatedAt: "2026-10-12", name: "Test", description: "Detail", pricing: "Sur devis", publicPath: "/fr/services", locales: ["fr"] };
  const records = Object.fromEntries(["en", "fr", "es", "de"].map(locale => [locale, { ...base, publicPath: `/${locale}/services` }]));
  const service = preparation.prepareService(records);
  assert.equal(service.isDemo, false);
  assert.equal(service.translations.create.length, 4);
  assert.equal(service.updatedAt.toISOString(), "2026-10-12T00:00:00.000Z");
  assert.throws(() => preparation.prepareService({ ...records, en: { ...base, id: "wrong" } }));
  assert.throws(() => preparation.prepareService(Object.fromEntries(Object.keys(records).map(locale => [locale, { ...base, updatedAt: "2026-02-30" }]))));
});
