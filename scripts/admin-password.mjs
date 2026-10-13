import { randomBytes, scryptSync } from "node:crypto";

const chunks = [];
let bytes = 0;
for await (const chunk of process.stdin) {
  bytes += chunk.length;
  if (bytes > 1024) throw new Error("Password input is too long.");
  chunks.push(chunk);
}
const password = Buffer.concat(chunks).toString("utf8").replace(/\r?\n$/, "");
if (password.length < 12 || password.length > 256 || password === "Khmera#Admin2026") {
  throw new Error("Choose a unique password of 12–256 characters, not the development password.");
}
const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
console.log(`ADMIN_PASSWORD_SALT=${salt}\nADMIN_PASSWORD_HASH=${hash}`);
