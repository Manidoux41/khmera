import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, readdirSync, rmdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { openTestBrowser } from "./support/chrome.mjs";

const base = process.env.ADMIN_TEST_BASE_URL;
const cdp = process.env.CARD_CDP_URL;
const enabled = !!base && !!cdp;
const hydrated = selector => `!!document.querySelector(${JSON.stringify(selector)}) && Object.keys(document.querySelector(${JSON.stringify(selector)})).some(key=>key.startsWith('__reactProps$'))`;

test("localized report links prepare but never submit a message", { skip: !enabled }, async () => {
  const browser = await openTestBrowser(base, cdp);
  try {
    for (const locale of ["en", "fr", "es", "de"]) {
      const target = `/${locale}/marketplace/private-transfers`;
      await browser.navigate(`/${locale}/report?target=${encodeURIComponent(target)}`, hydrated('[name="target"]'));
      await browser.until(`document.querySelector('[name="target"]').value === ${JSON.stringify(target)}`);
      await browser.fill('[name="email"]', "synthetic@example.com");
      await browser.fill('[name="details"]', "Synthetic report: incorrect business contact information.");
      await browser.click('[name="consent"]');
      await browser.click("form button");
      await browser.until("!!document.querySelector('[role=status]')");
      const result = await browser.evaluate(`(() => {
        const link = document.querySelector('[role=status]').parentElement.querySelector('a');
        return { href: link.href, status: document.querySelector('[role=status]').textContent, draft: document.querySelector('textarea[readonly]').value };
      })()`);
      const email = new URL(result.href);
      assert.equal(email.protocol, "mailto:");
      assert.equal(email.pathname, "manfredparbatia@gmail.com");
      assert.ok(email.searchParams.get("body").includes(target));
      assert.ok(result.draft.includes("Synthetic report"));
      assert.ok(result.status.length > 100);
      await browser.fill('[name="details"]', "Changed report after preparing: old draft must disappear.");
      await browser.until("!document.querySelector('textarea[readonly]')");
    }
    await browser.command("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await browser.navigate("/fr/privacy", "document.querySelector('h1')?.textContent.includes('confidentialité')");
    assert.equal(await browser.evaluate("document.documentElement.scrollWidth <= 390"), true);
  } finally { await browser.close(); }
});

test("private launch CRUD, evidence gates, exports, imports and draft retention", { skip: !enabled }, async () => {
  const browser = await openTestBrowser(base, cdp);
  const directory = mkdtempSync(join(tmpdir(), "khmera-launch-test-"));
  try {
    const login = await fetch(new URL("/api/admin/session", base), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: process.env.ADMIN_TEST_EMAIL, password: process.env.ADMIN_TEST_PASSWORD }),
    });
    assert.equal(login.status, 200);
    const cookie = login.headers.get("set-cookie").split(";")[0];
    await browser.command("Network.setCookie", { name: "khmera_admin_session", value: cookie.split("=").slice(1).join("="), url: base, httpOnly: true });
    await browser.command("Browser.setDownloadBehavior", { behavior: "allow", downloadPath: directory });
    await browser.navigate("/khm-console-7f3a9c/launch", hydrated('#launch-manager form input'));
    await browser.fill('#launch-manager form input[type=text]', "Synthetic travel agency");
    await browser.fill('#launch-manager form textarea', "Synthetic agency for acceptance testing only.");
    // Fields follow the shared form order: category, address, phone and image reference.
    await browser.evaluate(`(() => {
      const fields = document.querySelectorAll('#launch-manager form input[type=text]');
      for (const [index,value] of [[1,'Travel agency'],[2,'Siem Reap']]) {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(fields[index],value);
        fields[index].dispatchEvent(new Event('input',{bubbles:true}));
      }
    })()`);
    await browser.fill('#launch-manager form input[type=email]', "synthetic@example.com");
    await browser.fill("#launch-manager form select", "approved");
    await browser.click("#launch-manager form button");
    await browser.until("document.querySelector('[role=alert]')?.textContent.includes('Approbation')");
    await browser.click("#launch-manager form input[type=checkbox]");
    await browser.fill("#launch-manager form label:nth-of-type(9) textarea", "Synthetic written authorization and identity check");
    await browser.click("#launch-manager form button");
    await browser.until("document.querySelector('#launch-manager ul')?.textContent.includes('Synthetic travel agency')");
    await browser.evaluate("document.querySelector('#launch-manager ul button').click(); true");
    await browser.fill("#launch-manager form select", "suspended");
    await browser.click("#launch-manager form button");
    await browser.until("document.querySelector('#launch-manager ul')?.textContent.includes('Suspendu')");
    await browser.evaluate(`(() => {
      const links = [...document.querySelectorAll('.admin-sidebar a')];
      links.find(link=>link.href.endsWith('#reports')).click();
    })()`);
    await browser.until("document.querySelector('#launch-manager form h2')?.textContent.includes('Signalements')");
    await browser.fill('#launch-manager form input[type=text]', "Synthetic received report");
    await browser.fill('#launch-manager form input[type=date]', "2026-10-13");
    await browser.fill('#launch-manager form label:last-of-type select', "incorrect-contact");
    await browser.click("#launch-manager form button");
    await browser.until("document.querySelector('#launch-manager ul')?.textContent.includes('Synthetic received report')");
    await browser.fill('#launch-manager form input[type=text]', "Unapplied report draft");
    await browser.evaluate("document.querySelector('.admin-sidebar a[href$=\"#campaigns\"]').click(); true");
    await browser.until("document.querySelector('#launch-manager form h2')?.textContent.includes('campagnes')");
    await browser.fill('#launch-manager form input[type=text]', "Synthetic future campaign");
    await browser.fill('#launch-manager form select', "approved");
    await browser.click("#launch-manager form button");
    await browser.until("document.querySelector('[role=alert]')?.textContent.includes('Campagne')");
    await browser.click("#launch-manager form input[type=checkbox]");
    await browser.fill('#launch-manager form textarea:nth-of-type(1)', "Synthetic campaign permission and content check");
    await browser.evaluate(`(() => {
      const areas = document.querySelectorAll('#launch-manager form textarea');
      Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(areas[1],'Synthetic authorization reference');
      areas[1].dispatchEvent(new Event('input',{bubbles:true}));
      const dates = document.querySelectorAll('#launch-manager form input[type=date]');
      for (const [index,value] of [[0,'2026-10-13'],[1,'2026-11-13']]) {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(dates[index],value);
        dates[index].dispatchEvent(new Event('input',{bubbles:true}));
      }
      const fields = document.querySelectorAll('#launch-manager form input[type=text]');
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(fields[fields.length-2],'Directory top (inactive)');
      fields[fields.length-2].dispatchEvent(new Event('input',{bubbles:true}));
    })()`);
    await browser.click("#launch-manager form button");
    await browser.until("document.querySelector('#launch-manager ul')?.textContent.includes('Synthetic future campaign')");
    await browser.evaluate("document.querySelector('.admin-sidebar a[href$=\"#reports\"]').click(); true");
    await browser.until("document.querySelector('#launch-manager form input[type=text]')?.value === 'Unapplied report draft'");
    await browser.evaluate("document.querySelector('.admin-sidebar a[href$=\"#regulatory\"]').click(); true");
    await browser.until("document.querySelector('#launch-manager ul')?.children.length === 9");
    await browser.evaluate("document.querySelector('#launch-manager ul button').click(); true");
    await browser.fill("#launch-manager form select", "confirmed");
    await browser.click("#launch-manager form button");
    await browser.until("document.querySelector('[role=alert]')?.textContent.includes('réglementaire')");
    await browser.command("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    assert.equal(await browser.evaluate("document.documentElement.scrollWidth <= 390"), true);
    await browser.evaluate(`(() => { [...document.querySelectorAll('#launch-manager button')].find(button=>button.textContent.includes('Exporter')).click(); })()`);
    let file;
    for (let i = 0; i < 100; i++) {
      file = readdirSync(directory).find(name => name.endsWith(".json"));
      if (file) break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.ok(file);
    const exported = JSON.parse(readFileSync(join(directory, file), "utf8"));
    assert.equal(exported.version, 1);
    assert.equal(exported.records.length, 12);
    assert.equal(exported.history.length, 4);
    assert.equal(exported.records.find(record => record.kind === "professionals").status, "suspended");
    assert.equal(exported.records.find(record => record.kind === "reports").date, "2026-10-13");
    assert.equal(exported.records.find(record => record.kind === "campaigns").placement, "Directory top (inactive)");
    assert.ok(!JSON.stringify(exported).includes("Unapplied report draft"));
    const invalidFile = join(directory, "invalid.json");
    writeFileSync(invalidFile, '{"version":2,"records":[],"history":[]}');
    const { root } = await browser.command("DOM.getDocument");
    const { nodeId } = await browser.command("DOM.querySelector", { nodeId: root.nodeId, selector: '#launch-manager input[type=file]' });
    await browser.command("DOM.setFileInputFiles", { nodeId, files: [invalidFile] });
    await browser.until("document.querySelector('[role=alert]')?.textContent.includes('version 1')");
    // Auto-confirm only this isolated target's import/delete and unload dialogs.
    await browser.command("Page.setLifecycleEventsEnabled", { enabled: true });
    await browser.evaluate("window.confirm = () => true; true");
    await browser.command("DOM.setFileInputFiles", { nodeId, files: [join(directory, file)] });
    await browser.until("document.querySelector('[role=status]')?.textContent.includes('Import appliqué')");
    await browser.evaluate("document.querySelector('.admin-sidebar a[href$=\"#professionals\"]').click(); true");
    await browser.until("document.querySelector('#launch-manager ul')?.textContent.includes('Synthetic travel agency')");
    await browser.evaluate("document.querySelector('#launch-manager ul li button:nth-of-type(2)').click(); true");
    await browser.until("document.querySelector('[role=status]')?.textContent.includes('supprimée')");
    assert.equal(await browser.evaluate("document.querySelector('#launch-manager ul').children.length"), 0);
    await browser.command("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  } finally {
    await browser.close();
    for (const file of readdirSync(directory)) rmSync(join(directory, file));
    rmdirSync(directory);
  }
});
