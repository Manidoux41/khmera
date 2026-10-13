import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { scryptSync } from "node:crypto";
import * as crypto from "node:crypto";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

function load(path, env = {}, dependencies = {}) {
  const exports = {};
  const { outputText } = ts.transpileModule(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  runInNewContext(outputText, { exports, Buffer, TextDecoder, Response, URL, process: { env }, require(name) {
    assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency ${name}`);
    return dependencies[name];
  } });
  return exports;
}
const path = "lib/admin/accounts.ts";
const salt = "00000000000000000000000000001234";
const password = "Synthetic_Test_Password_Only";
const env = { NODE_ENV: "production", ADMIN_EMAIL: "operator@example.com", ADMIN_PASSWORD_SALT: salt, ADMIN_PASSWORD_HASH: scryptSync(password, salt, 64).toString("hex") };
test("production never falls back to the known development account", () => {
  for (const config of [{ NODE_ENV: "production" }, { ...env, ADMIN_PASSWORD_HASH: "bad" }, { ...env, ADMIN_EMAIL: "bad" }, { NODE_ENV: "development", ADMIN_EMAIL: "partial@example.com" }]) {
    const accounts = load(path, config, { "node:crypto": crypto });
    assert.equal(accounts.adminCredentialsConfigured(), false);
    assert.equal(accounts.verifyAdminCredentials("admin@khmera.local", "Khmera#Admin2026"), null);
    assert.equal(accounts.findAdminById("adm_001"), null);
  }
});
test("development mock and explicitly configured credentials remain distinct", () => {
  const development = load(path, { NODE_ENV: "development" }, { "node:crypto": crypto });
  assert.equal(development.verifyAdminCredentials("admin@khmera.local", "Khmera#Admin2026").id, "adm_001");
  const production = load(path, env, { "node:crypto": crypto });
  assert.equal(production.verifyAdminCredentials(" Operator@example.com ", password).id, "configured_admin");
  assert.equal(production.verifyAdminCredentials("operator@example.com", "wrong-password"), null);
  assert.equal(production.verifyAdminCredentials("unknown@example.com", password), null);
  assert.equal(production.findAdminById("adm_001"), null);
});
test("per-process throttling expires and bounds the key map", () => {
  const limiter = load("lib/admin/login-limiter.ts");
  for (let i = 0; i < 10; i++) assert.equal(limiter.allowLoginAttempt("a", 1000), true);
  assert.equal(limiter.allowLoginAttempt("a", 1000), false);
  assert.equal(limiter.allowLoginAttempt("a", 901000), true);
  for (let i = 0; i < 1999; i++) assert.equal(limiter.allowLoginAttempt(`b${i}`, 901000), true);
  assert.equal(limiter.allowLoginAttempt("overflow", 901000), false);
  assert.equal(limiter.allowLoginAttempt("overflow", 1801000), true);
});
test("login rejects cross-origin, oversized, malformed and excessive attempts", async () => {
  let created = 0; let configured = true;
  const route = load("app/api/admin/session/route.ts", {}, {
    "@/lib/admin/accounts": { adminCredentialsConfigured: () => configured, verifyAdminCredentials: (email, value) => value === password ? { id: "test" } : null },
    "@/lib/admin/session": { sessionSecretProblem: () => null, setAdminSession: async () => { created++; } },
    "@/lib/admin/login-limiter": load("lib/admin/login-limiter.ts"),
  });
  const request = (body, headers = {}) => new Request("http://localhost:3100/api/admin/session", { method: "POST", headers, body });
  assert.equal((await route.POST(request("{}", { origin: "https://example.com" }))).status, 403);
  assert.equal((await route.POST(request("{}", { "content-length": "4097" }))).status, 413);
  assert.equal((await route.POST(request("x".repeat(4097)))).status, 413);
  assert.equal((await route.POST(request("{"))).status, 400);
  assert.equal((await route.POST(request("null"))).status, 400);
  configured = false;
  assert.equal((await route.POST(request(JSON.stringify({ email: "a@example.com", password })))).status, 503);
  configured = true;
  assert.equal((await route.POST(request(JSON.stringify({ email: "a@example.com", password })))).status, 200);
  for (let i = 0; i < 9; i++) assert.equal((await route.POST(request(JSON.stringify({ email: "a@example.com", password: "wrong" })))).status, 401);
  const limited = await route.POST(request(JSON.stringify({ email: "a@example.com", password })));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "900");
  assert.equal(created, 1);
});
