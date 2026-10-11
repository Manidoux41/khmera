import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../lib/i18n.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
});
const exports = {};
runInNewContext(outputText, { exports });
const { dictionaries, locales, listingSlugs } = exports;

test("marketplace links have unique slugs and translated detail content", () => {
  assert.equal(new Set(listingSlugs).size, listingSlugs.length);
  for (const locale of locales) {
    assert.equal(dictionaries[locale].marketplace.listings.length, listingSlugs.length);
    assert.equal(dictionaries[locale].marketplace.descriptions.length, listingSlugs.length);
  }
});

function leaves(value, prefix = "") {
  if (typeof value === "string") return [[prefix, value]];
  return Object.entries(value).flatMap(([key, child]) =>
    leaves(child, `${prefix}.${key}`),
  );
}

test("all locales have the same translation keys and non-empty text", () => {
  const keys = leaves(dictionaries.en).map(([key]) => key);
  for (const locale of locales) {
    const entries = leaves(dictionaries[locale]);
    assert.deepEqual(entries.map(([key]) => key), keys, locale);
    for (const [key, value] of entries) {
      assert.ok(value.trim().length > 0, `${locale}${key} is empty`);
    }
  }
});

test("new page copy is translated rather than falling back to English", () => {
  for (const locale of locales.filter((locale) => locale !== "en")) {
    for (const section of ["home", "services", "marketplace", "visa", "business", "testimonials", "languageNames", "notFound"]) {
      const english = new Map(leaves(dictionaries.en[section]));
      for (const [key, value] of leaves(dictionaries[locale][section])) {
        if (section === "home" && key === ".city") continue;
        if (section === "testimonials" && key.endsWith(".place")) continue;
        assert.notEqual(value, english.get(key), `${locale}.${section}${key}`);
      }
    }
  }
});

test("public components contain no hard-coded prose in JSX", () => {
  const paths = [
    "app/[locale]/page.tsx",
    "app/[locale]/services/page.tsx",
    "app/[locale]/marketplace/page.tsx",
    "app/[locale]/marketplace/[slug]/page.tsx",
    "app/[locale]/visa-guide/page.tsx",
    "app/[locale]/business/page.tsx",
    "app/[locale]/credits/page.tsx",
    "app/[locale]/testimonials/page.tsx",
    "components/testimonial-card.tsx",
    "components/credited-photo.tsx",
    "app/not-found.tsx",
    "components/not-found-content.tsx",
    "components/language-switcher.tsx",
  ];
  for (const path of paths) {
    const content = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
    const file = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      if (ts.isJsxText(node)) {
        assert.doesNotMatch(node.text, /[a-zA-Z]/, `${path}: untranslated JSX text`);
      }
      if (ts.isJsxAttribute(node) && ["aria-label", "title", "placeholder", "alt"].includes(node.name.getText(file))) {
        const element = node.parent.parent;
        const imagePlaceholder = node.name.getText(file) === "placeholder" &&
          element.tagName.getText(file) === "Image";
        if (imagePlaceholder) return;
        const decorativeImage = node.name.getText(file) === "alt" &&
          node.initializer && ts.isStringLiteral(node.initializer) &&
          node.initializer.text === "";
        assert.ok(decorativeImage || !node.initializer || !ts.isStringLiteral(node.initializer), `${path}: untranslated ${node.name.getText(file)}`);
      }
      ts.forEachChild(node, visit);
    }
    visit(file);
  }
});
