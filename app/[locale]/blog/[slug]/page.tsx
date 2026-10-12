import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSeo } from "@/components/page-seo";
import { RouteSkeleton } from "@/components/route-skeleton";
import { getDictionary, isLocale } from "@/lib/i18n";
import { blogPosts, getPublishedPost } from "@/lib/blog/posts";

type ArticleProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function ArticlePage(props: ArticleProps) {
  return <Suspense fallback={<RouteSkeleton />}><ArticleContent {...props} /></Suspense>;
}

async function ArticleContent({ params }: ArticleProps) {
  const { locale, slug } = await params;
  const post = getPublishedPost(slug);
  if (!isLocale(locale) || !post) notFound();
  const copy = getDictionary(locale).blog;
  const article = post.translations[locale];
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PageSeo locale={locale} route={{ page: "article", slug }} />
      <Link href={`/${locale}/blog`} className="text-emerald-300">{copy.back}</Link>
      <h1 className="mt-8 text-4xl font-semibold text-white">{article.title}</h1>
      <p className="mt-4 text-sm text-slate-400">{copy.by} {post.author}</p>
      <p className="mt-6 text-xl leading-8 text-slate-300">{article.excerpt}</p>
      {article.body.split(/\n\s*\n/).filter((paragraph) => paragraph.trim()).map((paragraph, index) => <p key={index} className="mt-6 whitespace-pre-wrap leading-8 text-slate-200">{paragraph}</p>)}
    </article>
  );
}
