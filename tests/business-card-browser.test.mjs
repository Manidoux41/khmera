import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";

test("admin card editing, optional portrait and one-page A4 printing", {
  skip: !process.env.CARD_CDP_URL || !process.env.ADMIN_TEST_BASE_URL,
}, async () => {
  const base = process.env.ADMIN_TEST_BASE_URL;
  const cdp = process.env.CARD_CDP_URL;
  for (const url of [base, cdp]) assert.ok(["localhost", "127.0.0.1"].includes(new URL(url).hostname), "Only run against isolated local previews");
  const login = await fetch(new URL("/api/admin/session", base), {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@khmera.local", password: "Khmera#Admin2026" }),
  });
  assert.equal(login.status, 200);
  const cookie = login.headers.get("set-cookie").split(";")[0];
  const target = await (await fetch(new URL("/json/new?about:blank", cdp), { method: "PUT" })).json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", event => {
    const message = JSON.parse(event.data);
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    clearTimeout(request.timer);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  });
  function command(method, params = {}) {
    return new Promise((resolve, reject) => {
      const requestId = ++id;
      const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`${method} timeout`)); }, 15000);
      pending.set(requestId, { resolve, reject, timer });
      socket.send(JSON.stringify({ id: requestId, method, params }));
    });
  }
  async function evaluate(expression) {
    const result = await command("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  }
  async function until(expression) {
    for (let attempt = 0; attempt < 100; attempt++) {
      if (await evaluate(expression)) return;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.fail(`Timed out: ${expression}`);
  }
  async function fill(index, value) {
    await evaluate(`(() => {
      const input = document.querySelectorAll('#business-cards input:not([type=file])')[${index}];
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, ${JSON.stringify(value)});
      input.dispatchEvent(new Event('input', {bubbles:true}));
    })()`);
  }
  async function upload(path) {
    const { root } = await command("DOM.getDocument");
    const { nodeId } = await command("DOM.querySelector", { nodeId: root.nodeId, selector: "#business-cards input[type=file]" });
    await command("DOM.setFileInputFiles", { nodeId, files: [fileURLToPath(new URL(path, import.meta.url))] });
  }
  async function printAndCheck(copies, filename) {
    await evaluate(`(() => {
      const select = document.querySelector('#card-copies');
      select.value = '${copies}';
      select.dispatchEvent(new Event('change', {bubbles:true}));
    })()`);
    await until(`document.querySelectorAll('.khmera-business-card').length === ${copies}`);
    await command("Emulation.setEmulatedMedia", { media: "print" });
    const measurements = await evaluate(`(() => {
      const cards = [...document.querySelectorAll('.khmera-business-card')];
      const first = cards[0].getBoundingClientRect();
      const hidden = ['.admin-banner','.business-card-controls','.admin-dashboard > dl']
        .every(selector => getComputedStyle(document.querySelector(selector)).display === 'none');
      return {width:first.width,height:first.height,hidden,visible:cards.filter(c=>c.getBoundingClientRect().height>0).length};
    })()`);
    assert.ok(Math.abs(measurements.width - 85 * 96 / 25.4) < 1);
    assert.ok(Math.abs(measurements.height - 55 * 96 / 25.4) < 1);
    assert.equal(measurements.hidden, true);
    assert.equal(measurements.visible, copies);
    const { data } = await command("Page.printToPDF", { preferCSSPageSize: true, displayHeaderFooter: false, printBackground: true });
    const pdf = Buffer.from(data, "base64");
    const content = pdf.toString("latin1");
    assert.equal((content.match(/\/Type\s*\/Page\b/g) ?? []).length, 1);
    assert.match(content, /\/MediaBox \[0 0 594[\d.]* 841[\d.]*\]/);
    if (process.env.CARD_PDF_DIR) writeFileSync(`${process.env.CARD_PDF_DIR}/${filename}`, pdf);
    await command("Emulation.setEmulatedMedia", { media: "screen" });
  }
  try {
    await command("Network.enable");
    await command("Network.setCacheDisabled", { cacheDisabled: true });
    await command("Page.enable");
    const separator = cookie.indexOf("=");
    assert.equal((await command("Network.setCookie", {
      name: cookie.slice(0, separator), value: cookie.slice(separator + 1), url: base, httpOnly: true, secure: true, sameSite: "Strict",
    })).success, true);
    await command("Page.navigate", { url: new URL("/khm-console-7f3a9c", base).toString() });
    await until("!!document.querySelector('#business-cards input')");
    await until("Object.keys(document.querySelector('#business-cards input')).some(key=>key.startsWith('__reactProps$'))");
    await evaluate("document.fonts.ready");
    assert.equal(await evaluate(`document.fonts.check('30px "Khmera Taprom"', 'Khmera')`), true);
    assert.match(await evaluate("getComputedStyle(document.querySelector('.business-card-brand strong')).fontFamily"), /Khmera Taprom/);
    assert.equal(await evaluate(`(() => {
      const brand = document.querySelector('.business-card-brand');
      const text = brand.querySelector('strong').getBoundingClientRect();
      const bounds = brand.getBoundingClientRect();
      const tagline = document.querySelector('.business-card-tagline').getBoundingClientRect();
      return text.right <= bounds.right && text.bottom <= tagline.top;
    })()`), true, "Khmer-inspired wordmark must fit without overlapping the tagline");
    await until("[...document.querySelectorAll('.khmera-business-card img')].every(img=>img.complete && img.naturalWidth>0)");
    const checkCredit = async () => {
      assert.equal(await evaluate(`(() => {
        const credit = document.querySelector('.business-card-credit');
        const style = getComputedStyle(credit);
        const bounds = credit.getBoundingClientRect();
        const card = credit.closest('.khmera-business-card').getBoundingClientRect();
        const text = document.createRange();
        text.selectNodeContents(credit);
        const textBounds = text.getBoundingClientRect();
        return style.writingMode === 'vertical-rl' && parseFloat(style.fontSize) <= 4
          && bounds.left >= card.left && bounds.right < card.left + 12
          && textBounds.top >= card.top && textBounds.bottom <= card.bottom;
      })()`), true, "Tiny vertical photo credit must fit inside the left edge in every language");
    };
    await checkCredit();
    await evaluate("window.__cardPrintCalls=0; window.print=()=>{window.__cardPrintCalls+=1;}; document.querySelector('#business-cards button[type=submit]').click()");
    await until("window.__cardPrintCalls===1");
    assert.equal(await evaluate("document.querySelectorAll('.business-card-agent-photo').length"), 0);
    assert.match(await evaluate("document.querySelector('.khmera-business-card').innerText"), /Manfred[\s\S]*Parbatia[\s\S]*076-252-3154/);
    await printAndCheck(1, "khmera-carte-manfred.pdf");
    await printAndCheck(8, "khmera-cartes-manfred-a4.pdf");
    for (const [locale, title, tagline] of [
      ["en", "Professional connections advisor", "RELOCATION · TRAVEL · BUSINESS"],
      ["es", "Asesor de conexiones profesionales", "INSTALACIÓN · VIAJES · NEGOCIOS"],
      ["de", "Berater für professionelle Kontakte", "UMZUG · REISEN · BUSINESS"],
    ]) {
      await evaluate(`(() => { const select=document.querySelector('#card-locale'); select.value='${locale}'; select.dispatchEvent(new Event('change',{bubbles:true})); })()`);
      await until(`document.querySelector('.khmera-business-card').lang==='${locale}'`);
      assert.equal(await evaluate("document.querySelector('.business-card-role').innerText"), title);
      assert.equal(await evaluate("document.querySelector('.business-card-tagline').innerText"), tagline);
      assert.equal(await evaluate("document.querySelectorAll('.khmera-business-card:first-child .business-card-contact-icon').length"), 3);
      assert.equal(await evaluate("document.querySelector('.business-card-email a').getAttribute('href')"), "mailto:manfredparbatia@gmail.com");
      await checkCredit();
      await printAndCheck(8, `khmera-cartes-manfred-${locale}-a4.pdf`);
    }
    await fill(2, "Mein lokaler Ansprechpartner");
    await evaluate("document.querySelector('#card-locale').value='fr'; document.querySelector('#card-locale').dispatchEvent(new Event('change',{bubbles:true}))");
    await until("document.querySelector('.khmera-business-card').lang==='fr'");
    assert.equal(await evaluate("document.querySelector('.business-card-role').innerText"), "Conseiller en mise en relation");
    await evaluate("document.querySelector('#card-locale').value='de'; document.querySelector('#card-locale').dispatchEvent(new Event('change',{bubbles:true}))");
    await until("document.querySelector('.business-card-role').innerText==='Mein lokaler Ansprechpartner'");
    await evaluate("document.querySelector('#card-locale').value='fr'; document.querySelector('#card-locale').dispatchEvent(new Event('change',{bubbles:true}))");
    await until("document.querySelector('.khmera-business-card').lang==='fr'");
    await fill(4, "invalid");
    await evaluate("document.querySelector('#business-cards button[type=submit]').click()");
    await until("document.querySelector('#business-cards p[role=alert]')?.innerText.includes('WhatsApp')");
    assert.equal(await evaluate("window.__cardPrintCalls"), 1, "Invalid numbers must not open the print dialog");
    await fill(4, "+855 76 252 3154");
    await fill(0, "Sok");
    await fill(1, "Chan");
    await fill(2, "Agent · Siem Reap");
    await fill(3, "@khmera_agent");
    await until("document.querySelector('.business-card-name').innerText.includes('Sok')");
    await upload("../public/khmera-mark.svg");
    await until("document.querySelector('#business-cards p[role=alert]')?.innerText.includes('Photo refusée')");
    await upload("../public/images/photos/angkor-wat-sunrise.jpg");
    await until("!!document.querySelector('.business-card-agent-photo')");
    assert.equal(await evaluate("getComputedStyle(document.querySelector('.business-card-agent-photo')).borderTopWidth"), "0px");
    assert.equal(await evaluate("getComputedStyle(document.querySelector('.business-card-agent-photo')).borderRadius"), "0px");
    assert.notEqual(await evaluate("getComputedStyle(document.querySelector('.business-card-agent-photo')).maskImage"), "none");
    await evaluate(`(() => {
      const select = document.querySelector('#card-portrait-treatment');
      select.value='transparent'; select.dispatchEvent(new Event('change',{bubbles:true}));
    })()`);
    await until("!!document.querySelector('.business-card-agent-photo.is-transparent')");
    await until("[...document.querySelectorAll('.business-card-agent-photo')].every(img=>img.complete && img.naturalWidth>0)");
    await printAndCheck(8, "khmera-test-agent-photo-a4.pdf");
    await fill(0, "W".repeat(26));
    await fill(1, "W".repeat(26));
    await fill(2, "W".repeat(40));
    await fill(5, `${"w".repeat(52)}@example.com`);
    const layoutFits = await evaluate(`(() => {
      const card = document.querySelector('.khmera-business-card');
      const content = card.querySelector('.business-card-content').getBoundingClientRect();
      const names = [...card.querySelectorAll('.business-card-name span')];
      const credit = card.querySelector('.business-card-credit').getBoundingClientRect();
      const site = card.querySelector('.business-card-site').getBoundingClientRect();
      const photo = card.querySelector('.business-card-agent-photo').getBoundingClientRect();
      const role = card.querySelector('.business-card-role').getBoundingClientRect();
      const email = card.querySelector('.business-card-email a').getBoundingClientRect();
      return names.every(el=>el.scrollWidth<=el.clientWidth) && credit.right<site.left && site.bottom<content.bottom-4 && site.right<=content.right && role.right<photo.left && email.right<content.right;
    })()`);
    assert.equal(layoutFits, true, "Longest supported names/role must not clip or overlap credits");
    await evaluate("[...document.querySelectorAll('#business-cards button')].find(b=>b.innerText==='Retirer la photo').click()");
    await until("document.querySelectorAll('.business-card-agent-photo').length === 0");
    await evaluate("[...document.querySelectorAll('#business-cards button')].find(b=>b.innerText.includes('Exporter')).click()");
    await until("document.querySelector('#business-cards p[role=status]')?.innerText.includes('Export JSON')");
    await command("Page.reload");
    await until("document.querySelector('.business-card-name')?.innerText.includes('Manfred')");
    assert.equal(await evaluate("document.querySelectorAll('.business-card-agent-photo').length"), 0);
  } finally {
    await fetch(new URL("/api/admin/session", base), { method: "DELETE", headers: { Cookie: cookie } });
    await command("Page.close");
    socket.close();
  }
});
