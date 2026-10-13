import assert from "node:assert/strict";

export async function openTestBrowser(base, cdp) {
  for (const url of [base, cdp]) assert.ok(["localhost", "127.0.0.1"].includes(new URL(url).hostname));
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
    pending.delete(message.id); clearTimeout(request.timer);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  });
  function command(method, params = {}) {
    return new Promise((resolve, reject) => {
      const requestId = ++id;
      const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`${method} timeout`)); }, 20000);
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
    for (let attempt = 0; attempt < 150; attempt++) {
      if (await evaluate(expression)) return;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.fail(`Timed out: ${expression}`);
  }
  async function navigate(path, ready) {
    await command("Page.navigate", { url: new URL(path, base).href });
    await until(ready);
  }
  async function fill(selector, value) {
    await evaluate(`(() => {
      const field = document.querySelector(${JSON.stringify(selector)});
      const prototype = field instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : field instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(prototype, 'value').set.call(field, ${JSON.stringify(value)});
      field.dispatchEvent(new Event(field instanceof HTMLSelectElement ? 'change' : 'input', {bubbles:true}));
    })()`);
  }
  async function click(selector) { await evaluate(`document.querySelector(${JSON.stringify(selector)}).click(); true`); }
  async function close() {
    socket.close();
    await fetch(new URL(`/json/close/${target.id}`, cdp));
  }
  await command("Page.enable");
  return { command, evaluate, until, navigate, fill, click, close };
}
