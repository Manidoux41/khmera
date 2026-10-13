import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import { openTestBrowser } from "./support/chrome.mjs";

function copy(path) {
  const exports = {};
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
  runInNewContext(outputText, { exports });
  return exports;
}
const { tariffCopy } = copy("lib/admin/tariff-copy.ts");
const { businessCardCopy } = copy("lib/admin/business-card-copy.ts");

test("tariff language/package navigation keeps recipient and prints sixteen one-page A4 PDFs", {
  skip: !process.env.ADMIN_TEST_BASE_URL || !process.env.CARD_CDP_URL,
}, async () => {
  const base = process.env.ADMIN_TEST_BASE_URL;
  const browser = await openTestBrowser(base, process.env.CARD_CDP_URL);
  const recipient = `Mme Andréa / Organisation ${"W".repeat(135)}`.slice(0, 160);
  let cookie;
  try {
    const login = await fetch(new URL("/api/admin/session", base), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: process.env.ADMIN_TEST_EMAIL || "admin@khmera.local", password: process.env.ADMIN_TEST_PASSWORD || "Khmera#Admin2026" }),
    });
    assert.equal(login.status, 200);
    cookie = login.headers.get("set-cookie").split(";")[0];
    await browser.command("Network.setCookie", { name: "khmera_admin_session", value: cookie.split("=").slice(1).join("="), url: base, httpOnly: true });
    await browser.navigate("/khm-console-7f3a9c/tariffs", "!!document.querySelector('#tariff-recipient') && Object.keys(document.querySelector('#tariff-recipient')).some(key=>key.startsWith('__reactProps$'))");
    await browser.fill("#tariff-recipient", recipient);
    for (const locale of ["fr", "en", "es", "de"]) {
      await browser.click(`[data-tariff-languages] a[hreflang="${locale}"]`);
      await browser.until(`document.querySelector('.tariff-sheet')?.lang === '${locale}'`);
      assert.equal(await browser.evaluate("document.querySelector('#tariff-recipient').value"), recipient);
      assert.equal(await browser.evaluate("document.querySelector('[data-tariff-languages] a[aria-current=page]').hreflang"), locale);
      for (const slug of ["cambodia-diagnostic", "settle-in", "business-launch", "discovery-trip"]) {
        await browser.click(`[data-tariff-offers] a[href$="offer=${slug}"]`);
        await browser.until(`document.querySelector('.tariff-sheet')?.dataset.offer === '${slug}' && document.querySelector('.tariff-sheet')?.lang === '${locale}'`);
        assert.equal(await browser.evaluate("document.querySelector('#tariff-recipient').value"), recipient);
        assert.equal(await browser.evaluate("document.querySelector('.tariff-recipient-print > p').textContent"), tariffCopy[locale].recipient.attention);
        assert.equal(await browser.evaluate("document.querySelector('.tariff-slogan').textContent"), businessCardCopy[locale].tagline);
        await browser.until("document.querySelector('.tariff-letterhead img').complete && document.querySelector('.tariff-letterhead img').naturalWidth > 0");
        await browser.command("Emulation.setEmulatedMedia", { media: "print" });
        const layout = await browser.evaluate(`(() => {
          const recipient = document.querySelector('.tariff-recipient-print');
          return {
            hidden: ['.admin-banner','.admin-sidebar','.admin-section-header','.tariff-controls','.tariff-recipient-editor'].every(selector=>getComputedStyle(document.querySelector(selector)).display==='none'),
            recipient: document.querySelector('.tariff-recipient-value').textContent,
            overflow: document.querySelector('.tariff-recipient-value').scrollWidth>recipient.clientWidth,
            sheets: document.querySelectorAll('.tariff-sheet').length,
          };
        })()`);
        assert.equal(layout.hidden, true); assert.equal(layout.overflow, false);
        assert.equal(layout.recipient, recipient); assert.equal(layout.sheets, 1);
        const pdf = await browser.command("Page.printToPDF", { preferCSSPageSize: true, displayHeaderFooter: false, printBackground: true });
        const text = Buffer.from(pdf.data, "base64").toString("latin1");
        assert.equal((text.match(/\/Type\s*\/Page\b/g) ?? []).length, 1, `${locale}/${slug} must fit one A4 page with a 160-character recipient`);
        const dimensions = text.match(/\/MediaBox\s*\[0 0 ([\d.]+) ([\d.]+)\]/);
        assert.ok(dimensions, "PDF page dimensions must be available");
        assert.ok(Math.abs(Number(dimensions[1]) - 595.28) < 1, "A4 width");
        assert.ok(Math.abs(Number(dimensions[2]) - 841.89) < 1, "A4 height");
        await browser.command("Emulation.setEmulatedMedia", { media: "screen" });
      }
    }
    await browser.command("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    assert.equal(await browser.evaluate("document.documentElement.scrollWidth <= 390"), true);
    await browser.command("Page.reload");
    await browser.until("document.querySelector('.tariff-sheet')?.lang==='de' && !!document.querySelector('#tariff-recipient')");
    assert.equal(await browser.evaluate("document.querySelector('#tariff-recipient').value"), "");
    await browser.evaluate("window.__tariffPrintCalls=0; window.print=()=>{window.__tariffPrintCalls++;}; true");
    await browser.click(".tariff-controls button");
    await browser.until("window.__tariffPrintCalls===1");
  } finally {
    await browser.close();
    if (cookie) await fetch(new URL("/api/admin/session", base), { method: "DELETE", headers: { Cookie: cookie } });
  }
});
