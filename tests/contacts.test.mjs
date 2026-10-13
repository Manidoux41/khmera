import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../lib/admin/contacts.ts", import.meta.url), "utf8");
const exports = {};
runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports });
const { parseContactFile, serializeContactFile, filterContacts, validateContact, MAX_CONTACTS } = exports;
const contact = {
  id: "test-1", name: "Contact fictif", email: "demo@example.test", phone: "",
  organization: "Hôtel Démo", city: "Siem Reap", categories: ["retiree", "partner"], notes: "Test & découverte 東京",
};

test("private contact JSON round-trips multicategory details and empty lists", () => {
  assert.deepEqual(JSON.parse(serializeContactFile([contact])), { version: 1, contacts: [contact] });
  assert.deepEqual(JSON.parse(JSON.stringify(parseContactFile(serializeContactFile([contact])))), [contact]);
  assert.equal(parseContactFile(serializeContactFile([])).length, 0);
  assert.equal(validateContact(contact), null);
});

test("imports reject malformed, oversized, duplicate or invalid records without partial data", () => {
  for (const value of ["not json", "null", "[]", '{"version":2,"contacts":[]}', '{"version":1,"contacts":[{}]}']) {
    assert.throws(() => parseContactFile(value));
  }
  for (const patch of [
    { name: "   " }, { email: "not-an-email" }, { categories: [] },
    { categories: ["tourist", "unknown"] }, { categories: ["partner", "partner"] },
    { id: "../file" }, { notes: "a".repeat(2001) }, { phone: 12 }, { unexpected: "value" },
  ]) assert.throws(() => parseContactFile(JSON.stringify({ version: 1, contacts: [{ ...contact, ...patch }] })));
  assert.throws(() => parseContactFile(JSON.stringify({ version: 1, contacts: [contact, contact] })), /double/);
  assert.throws(() => parseContactFile(JSON.stringify({ version: 1, contacts: Array(MAX_CONTACTS + 1).fill(contact) })), /Limite/);
});

test("search and category filters combine without hiding multicategory matches", () => {
  const contacts = [contact, { ...contact, id: "test-2", name: "Voyageur", organization: "Agence", categories: ["tourist", "referrer"] }];
  assert.equal(filterContacts(contacts, " HÔTEL ", "partner").length, 1);
  assert.equal(filterContacts(contacts, "", "retiree")[0].id, "test-1");
  assert.equal(filterContacts(contacts, "Voyageur", "referrer")[0].id, "test-2");
  assert.equal(filterContacts(contacts, "Voyageur", "partner").length, 0);
  assert.equal(filterContacts(contacts, "", "").length, 2);
});
