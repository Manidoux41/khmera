import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

function load(path, dependencies = {}, env = {}) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports, URL, process: { env },
    require(name) {
      assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  return exports;
}

const i18n = load("lib/i18n.ts");
const offers = load("lib/services/offers.ts");
const founderStory = JSON.parse(readFileSync(new URL("../lib/blog/founder-story.json", import.meta.url), "utf8"));
const blog = load("lib/blog/posts.ts", { "./founder-story.json": { default: founderStory } });

function setup(env = {}) {
  const site = load("lib/site.ts", {}, env);
  const seo = load("lib/seo.ts", {
    "@/lib/i18n": i18n,
    "@/lib/services/offers": offers,
    "@/lib/site": site,
    "@/lib/blog/posts": blog,
  });
  const dependencies = { "@/lib/seo": seo, "@/lib/site": site, "@/lib/i18n": i18n };
  return {
    site, seo,
    sitemap: load("app/sitemap.ts", dependencies).default,
    robots: load("app/robots.ts", dependencies).default,
  };
}

test("canonical origin defaults to the live domain and accepts a custom origin", () => {
  assert.equal(setup().site.siteUrl.origin, "https://khmera.vercel.app");
  assert.equal(setup({ NEXT_PUBLIC_SITE_URL: " https://khmera.test " }).site.siteUrl.origin, "https://khmera.test");
  for (const value of ["not-a-url", "ftp://khmera.test", "https://user:pass@khmera.test", "https://khmera.test/fr", "https://khmera.test?preview=1", "https://khmera.test/#fragment"]) {
    assert.throws(() => setup({ NEXT_PUBLIC_SITE_URL: value }));
  }
});

test("founder draft is private and exports round-trip without inventing a story", () => {
  assert.equal(blog.blogPosts[0].status, "draft");
  assert.equal(blog.publishedPosts.length, 0);
  assert.equal(blog.getPublishedPost(founderStory.slug), undefined);
  for (const translation of Object.values(founderStory.translations)) assert.equal(translation.body, "");
  assert.deepEqual(JSON.parse(blog.serializeBlogPost(blog.blogPosts[0])), founderStory);
  const edited = structuredClone(founderStory);
  edited.translations.fr.body = "Notre récit réel.\n\nUn second paragraphe.";
  assert.equal(JSON.parse(blog.serializeBlogPost(edited)).translations.fr.body, edited.translations.fr.body);
  edited.status = "published";
  assert.throws(() => blog.serializeBlogPost(edited), /Complétez le récit/);
  for (const translation of Object.values(edited.translations)) translation.body = "A real story supplied by the author.";
  assert.equal(blog.validateBlogPost(edited), null);
  assert.equal(JSON.parse(blog.serializeBlogPost(edited)).status, "published");
});

test("published founder article gains blog routes and accurate structured data", () => {
  const published = structuredClone(founderStory);
  published.status = "published";
  for (const translation of Object.values(published.translations)) translation.body = "The author's verified account.";
  const publishedBlog = load("lib/blog/posts.ts", { "./founder-story.json": { default: published } });
  const seo = load("lib/seo.ts", {
    "@/lib/i18n": i18n,
    "@/lib/services/offers": offers,
    "@/lib/site": setup().site,
    "@/lib/blog/posts": publishedBlog,
  });
  assert.ok(seo.indexablePaths.includes("/blog"));
  assert.ok(seo.indexablePaths.includes(`/blog/${published.slug}`));
  for (const locale of i18n.locales) {
    const route = { page: "article", slug: published.slug };
    assert.equal(seo.getPageSeo(locale, route).index, true);
    const article = seo.pageStructuredData(locale, route)["@graph"].find((item) => item["@type"] === "BlogPosting");
    assert.equal(article.author.name, published.author);
    assert.equal(article.articleBody, published.translations[locale].body);
    assert.equal(article.datePublished, undefined);
  }
});

test("every page has unique localized SEO and reciprocal same-page alternates", () => {
  const { seo } = setup();
  for (const locale of i18n.locales) {
    const titles = new Set();
    const routes = [
      ...Object.keys(seo.pagePaths).map((page) => ({ page })),
      ...offers.offerSlugs.map((slug) => ({ page: "offer", slug })),
      ...i18n.listingSlugs.map((slug) => ({ page: "listing", slug })),
    ];
    for (const route of routes) {
      const metadata = seo.getPageSeo(locale, route);
      assert.ok(metadata.description.trim());
      assert.ok(!titles.has(metadata.title), `${locale}: duplicate title ${metadata.title}`);
      titles.add(metadata.title);
      assert.ok(metadata.canonical.startsWith(`https://khmera.vercel.app/${locale}`));
      assert.equal(metadata.alternates[locale], metadata.canonical);
      const path = new URL(metadata.canonical).pathname.slice(locale.length + 1);
      for (const alternate of i18n.locales) {
        assert.equal(metadata.alternates[alternate], `https://khmera.vercel.app/${alternate}${path}`);
        assert.deepEqual(seo.getPageSeo(alternate, route).alternates, metadata.alternates);
      }
      assert.equal(metadata.alternates["x-default"], metadata.alternates.en);
      assert.equal(metadata.index, !["marketplace", "listing", "testimonials", "blog"].includes(route.page));
    }
  }
});

test("sitemap includes all 36 real localized pages, no placeholders or private routes", () => {
  const { sitemap, seo, robots } = setup();
  const entries = sitemap();
  assert.equal(entries.length, 36);
  assert.equal(new Set(entries.map((entry) => entry.url)).size, 36);
  for (const entry of entries) {
    assert.doesNotMatch(entry.url, /example|admin|api|marketplace|testimonials|console/);
    assert.equal(entry.lastModified, undefined);
    const url = new URL(entry.url);
    const [, locale, ...segments] = url.pathname.split("/");
    const path = segments.length ? `/${segments.join("/")}` : "";
    assert.equal(entry.url, seo.localizedUrl(locale, path));
    assert.deepEqual(entry.alternates.languages, seo.languageAlternates(path));
  }
  assert.equal(robots().sitemap, "https://khmera.vercel.app/sitemap.xml");
  assert.deepEqual(Array.from(robots().rules.disallow), ["/api/", "/admin"]);
});

test("preview deployments cannot be indexed and canonical URLs never use a preview host", () => {
  for (const VERCEL_ENV of ["preview", "development"]) {
    const { sitemap, seo, robots } = setup({ VERCEL_ENV });
    assert.equal(sitemap().length, 0);
    assert.equal(robots().rules.disallow, "/");
    assert.equal(seo.getPageSeo("fr", { page: "home" }).index, false);
    assert.equal(seo.getPageSeo("fr", { page: "home" }).canonical, "https://khmera.vercel.app/fr");
  }
  assert.equal(setup({ VERCEL_ENV: "production" }).seo.getPageSeo("fr", { page: "home" }).index, true);
});

test("service JSON-LD describes real quote-based prices, not fabricated ratings or availability", () => {
  const { seo } = setup();
  for (const locale of i18n.locales) {
    for (const offer of offers.offers) {
      const data = seo.pageStructuredData(locale, { page: "offer", slug: offer.slug });
      assert.equal(data["@context"], "https://schema.org");
      const service = data["@graph"].find((item) => item["@type"] === "Service");
      const webpage = data["@graph"].find((item) => item["@type"] === "WebPage");
      const breadcrumb = data["@graph"].find((item) => item["@type"] === "BreadcrumbList");
      assert.equal(service.offers.price, offer.priceUsd);
      assert.equal(service.offers.priceCurrency, "USD");
      assert.equal(service.areaServed["@type"], "City");
      assert.equal(service.areaServed.name, "Siem Reap");
      assert.equal(service.areaServed.containedInPlace["@type"], "Country");
      assert.equal(service.areaServed.containedInPlace.name, "Cambodia");
      assert.equal(service.offers.description, i18n.dictionaries[locale].commerce.pricingNote);
      assert.ok(service.description.includes(i18n.dictionaries[locale].commerce.exclusions));
      assert.equal(webpage.inLanguage, locale);
      assert.equal(webpage.mainEntity["@id"], service["@id"]);
      assert.equal(breadcrumb.itemListElement.length, 3);
      assert.equal(breadcrumb.itemListElement[2].item, service.url);
      assert.doesNotMatch(JSON.stringify(data), /aggregateRating|reviewRating|"availability"|"address"/);
    }
  }
  const serialized = seo.serializeStructuredData({ text: "</script><script>alert(1)</script>" });
  assert.ok(!serialized.includes("<"));
  assert.equal(JSON.parse(serialized).text, "</script><script>alert(1)</script>");
});

test("crawler HTML exposes single page-specific head tags, alternates and valid schema", {
  skip: !process.env.SEO_TEST_BASE_URL,
}, async () => {
  const { seo } = setup();
  const base = process.env.SEO_TEST_BASE_URL;
  const routes = [
    ...Object.keys(seo.pagePaths).map((page) => ({ page })),
    ...offers.offerSlugs.map((slug) => ({ page: "offer", slug })),
    ...i18n.listingSlugs.map((slug) => ({ page: "listing", slug })),
  ];
  for (const locale of i18n.locales) {
    for (const route of routes) {
      const expected = seo.getPageSeo(locale, route);
      const path = new URL(expected.canonical).pathname;
      const response = await fetch(new URL(path, base), { headers: { "User-Agent": "Googlebot" } });
      assert.equal(response.status, 200, path);
      const html = await response.text();
      const head = html.split("</head>")[0];
      assert.equal((html.match(/<title>/g) ?? []).length, 1, path);
      assert.equal((head.match(/<meta name="description"/g) ?? []).length, 1, path);
      assert.equal((head.match(/rel="canonical"/g) ?? []).length, 1, path);
      assert.ok(head.includes(`href="${expected.canonical}"`), path);
      assert.ok(head.includes(expected.index ? 'content="index, follow, max-image-preview:large"' : 'content="noindex, follow"'), path);
      assert.ok(head.includes('property="og:url"'), path);
      assert.ok(head.includes('name="twitter:card"'), path);
      for (const [language, href] of Object.entries(expected.alternates)) {
        assert.ok(head.includes(`hrefLang="${language}" href="${href}"`), `${path}: alternate ${language}`);
      }
      const schemas = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g));
      assert.equal(schemas.length, expected.index ? 1 : 0, path);
      if (expected.index) {
        const data = JSON.parse(schemas[0][1]);
        assert.equal(data["@graph"].find((item) => item["@type"] === "WebPage").url, expected.canonical);
        if (route.page === "offer") {
          assert.equal(data["@graph"].find((item) => item["@type"] === "Service").areaServed.name, "Siem Reap");
          assert.match(html, /name="city"[^>]*value="Siem Reap"/);
        }
      }
    }
  }
  const robots = await fetch(new URL("/robots.txt", base));
  assert.equal(robots.status, 200);
  assert.ok((await robots.text()).includes("Sitemap: https://khmera.vercel.app/sitemap.xml"));
  const sitemap = await fetch(new URL("/sitemap.xml", base));
  assert.equal(sitemap.status, 200);
  assert.equal(((await sitemap.text()).match(/<loc>/g) ?? []).length, 36);
  for (const path of ["/khm-console-7f3a9c/login", "/api/admin/services"]) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
  }
});
