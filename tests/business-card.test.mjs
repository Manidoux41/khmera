import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../lib/admin/business-card.ts", import.meta.url), "utf8");
const copy = {};
runInNewContext(ts.transpileModule(readFileSync(new URL("../lib/admin/business-card-copy.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: copy });
const exports = {};
runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports, require: () => copy });
const { defaultBusinessCard, validateBusinessCard, serializeBusinessCard } = exports;

test("founder card preserves supplied local numbers and supports other agents", () => {
  assert.equal(validateBusinessCard(defaultBusinessCard), null);
  assert.equal(defaultBusinessCard.telegram, "076-252-3154");
  assert.equal(defaultBusinessCard.whatsapp, "076-252-3154");
  assert.equal(defaultBusinessCard.role, "Conseiller en mise en relation");
  assert.equal(validateBusinessCard({ ...defaultBusinessCard, firstName: "Sok", lastName: "Chan", role: "Agent · Siem Reap", telegram: "@khmera_agent", whatsapp: "+855 76 252 3154" }), null);
});

test("agent export prepares identity and portrait treatment without local blobs or credentials", () => {
  const file = JSON.parse(serializeBusinessCard(defaultBusinessCard, "transparent"));
  assert.equal(file.version, 2);
  assert.deepEqual(file.agent, { ...defaultBusinessCard });
  assert.deepEqual(file.card, { backgroundAssetId: "angkor-wat-sunrise", portraitTreatment: "transparent", locale: "fr" });
  assert.equal(file.translations.length, 4);
  assert.equal(file.agent.email, "manfredparbatia@gmail.com");
  assert.equal(file.portrait, null);
  assert.throws(() => serializeBusinessCard({ ...defaultBusinessCard, firstName: "" }, "fade"));
  assert.throws(() => serializeBusinessCard(defaultBusinessCard, "invalid"));
});

test("card validation rejects missing, oversized and invalid printable contacts", () => {
  for (const patch of [
    { firstName: " " }, { lastName: "" }, { role: "" }, { telegram: "" },
    { whatsapp: "bad" }, { telegram: "not-a-contact" }, { telegram: "@ab" },
    { whatsapp: "123" }, { whatsapp: "1".repeat(16) },
    { firstName: "a".repeat(27) }, { lastName: "a".repeat(27) }, { role: "a".repeat(41) },
    { email: "" }, { email: "invalid" }, { email: "a".repeat(65) },
  ]) assert.ok(validateBusinessCard({ ...defaultBusinessCard, ...patch }));
});

test("all card languages translate the printed copy and preserve per-language custom titles", () => {
  for (const locale of ["fr", "en", "es", "de"]) {
    const translated = copy.businessCardCopy[locale];
    assert.ok(translated.role.length <= 40);
    for (const text of Object.values(translated)) assert.ok(text.trim());
    const roles = { ...copy.defaultCardRoles(), en: "Local partnership advisor" };
    const file = JSON.parse(serializeBusinessCard({ ...defaultBusinessCard, role: translated.role }, "fade", locale, roles));
    assert.equal(file.card.locale, locale);
    assert.equal(file.translations.find(item => item.locale === locale).role, translated.role);
    assert.equal(file.agent.firstName, "Manfred");
  }
  assert.throws(() => serializeBusinessCard(defaultBusinessCard, "fade", "xx"));
});
