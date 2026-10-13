import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

function load(path) {
  const exports = {};
  const { outputText } = ts.transpileModule(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  runInNewContext(outputText, { exports, TextEncoder, URL });
  return exports;
}
const preparation = load("lib/launch/preparation.ts");
const report = load("lib/legal/report.ts");
const copy = load("lib/legal/copy.ts");
const regulatory = load("lib/launch/regulatory.ts");
const professional = () => ({
  ...preparation.emptyLaunchRecord("professionals"), id: "sample_1", name: "Sample agency",
  category: "Travel agency", address: "Siem Reap", description: "Synthetic test, not a real business.",
  contact: "test@example.com",
});

test("private preparation can round-trip records and history without a DB", () => {
  const file = { version: 1, records: [professional()], history: [{ id: "event_1", entityId: "sample_1", at: new Date().toISOString(), action: "create", detail: "Synthetic test" }] };
  const restored = preparation.parseLaunchFile(preparation.serializeLaunchFile(file));
  assert.deepEqual(JSON.parse(JSON.stringify(restored)), file);
  assert.equal(restored.records[0].verification, "unverified");
});
test("approving a professional requires documented publishing consent", () => {
  const entry = { ...professional(), status: "approved" };
  assert.match(preparation.validateLaunchRecord(entry), /Approbation/);
  entry.permission = true; entry.evidence = "Written permission reference";
  assert.equal(preparation.validateLaunchRecord(entry), null);
  entry.verification = "official";
  assert.match(preparation.validateLaunchRecord(entry), /Vérification/);
  entry.date = "2026-10-13";
  assert.equal(preparation.validateLaunchRecord(entry), null);
});
test("reports require the real receipt date and campaigns cannot skip controls", () => {
  const entry = { ...preparation.emptyLaunchRecord("reports"), id: "test", name: "Test report" };
  assert.match(preparation.validateLaunchRecord(entry), /réception/);
  entry.date = "2026-10-13";
  assert.match(preparation.validateLaunchRecord(entry), /motif/);
  entry.category = "incorrect-contact";
  assert.equal(preparation.validateLaunchRecord(entry), null);
  const ad = { ...preparation.emptyLaunchRecord("campaigns"), id: "ad", name: "Test ad", status: "approved" };
  assert.match(preparation.validateLaunchRecord(ad), /Campagne/);
  Object.assign(ad, { date: "2026-10-13", endDate: "2026-11-13", permission: true, evidence: "Proof", placement: "Directory top" });
  assert.equal(preparation.validateLaunchRecord(ad), null);
  ad.endDate = "2026-10-01";
  assert.match(preparation.validateLaunchRecord(ad), /précède/);
});
test("regulatory confirmation and non-applicability require evidence", () => {
  assert.equal(regulatory.regulatoryTopics.length, 9);
  for (const topic of regulatory.regulatoryTopics) {
    const entry = { ...preparation.emptyLaunchRecord("regulatory"), id: topic.id, name: topic.subject, authority: topic.authority, source: topic.source };
    assert.equal(preparation.validateLaunchRecord(entry), null);
    entry.status = "confirmed";
    assert.match(preparation.validateLaunchRecord(entry), /réglementaire/);
    Object.assign(entry, { date: "2026-10-13", evidence: "Synthetic written answer" });
    assert.equal(preparation.validateLaunchRecord(entry), null);
    entry.status = "not_applicable"; entry.evidence = "";
    assert.match(preparation.validateLaunchRecord(entry), /réglementaire/);
  }
});
test("imports fail explicitly for malformed, oversized or invalid entities", () => {
  const valid = { version: 1, records: [professional()], history: [] };
  for (const raw of ["{", "null", JSON.stringify({ ...valid, version: 2 }), JSON.stringify({ ...valid, unexpected: true }), JSON.stringify({ ...valid, records: [professional(), professional()] })]) {
    assert.throws(() => preparation.parseLaunchFile(raw));
  }
  for (const change of [
    { permission: "yes" }, { id: "../path" }, { status: "published" }, { website: "javascript:alert(1)" },
    { imageUrl: "data:image/png;base64,123" }, { source: "https://user:password@example.com" },
    { name: "x".repeat(161) }, { category: null }, { date: "2026-02-30" }, { kind: "__proto__" },
    { contact: "test@example.com\nCC:test2@example.com" },
  ]) assert.throws(() => preparation.parseLaunchFile(JSON.stringify({ ...valid, records: [{ ...professional(), ...change }] })));
  assert.throws(() => preparation.parseLaunchFile(" ".repeat(preparation.MAX_LAUNCH_BYTES + 1)), /volumineux/);
  assert.throws(() => preparation.parseLaunchFile(JSON.stringify({ ...valid, history: [{ id: "a" }] })), /Historique/);
});
test("report drafts accept only safe internal content paths and bounded details", () => {
  assert.equal(report.validateReport("/fr/marketplace/private-transfers", "test@example.com", 0, "A sufficiently detailed test report"), true);
  assert.equal(report.validateReport("/de/marketplace/private-transfers", "", 5, "A sufficiently detailed test report"), true);
  for (const target of ["https://example.com", "//example.com", "/fr/../admin", "/admin", "/fr/report?cc=test", "/fr/marketplace/x\ncc:test"]) assert.equal(report.validReportTarget(target), false);
  for (const change of [
    ["/en", "invalid-email", 0, "This is long enough"],
    ["/en", "", 6, "This is long enough for the form"],
    ["/en", "", 0, "short"],
    ["/en", "", 0, "x".repeat(2001)],
  ]) assert.equal(report.validateReport(...change), false);
});
test("all four languages have eight legal drafts and six reporting reasons", () => {
  assert.equal(copy.legalPages.length, 8);
  for (const locale of ["en", "fr", "es", "de"]) {
    assert.ok(copy.legalCopy[locale].warning);
    assert.equal(copy.legalCopy[locale].operatorLabels.length, 9);
    assert.equal(copy.legalCopy[locale].report.reasons.length, 6);
    for (const page of copy.legalPages) {
      assert.ok(copy.legalCopy[locale].pages[page].title);
      assert.ok(copy.legalCopy[locale].pages[page].sections.length >= 1);
      for (const section of copy.legalCopy[locale].pages[page].sections) {
        assert.ok(section.heading && section.text.length > 50);
      }
    }
  }
});
