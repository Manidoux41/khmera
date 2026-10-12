import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSeo } from "@/components/page-seo";
import { RouteSkeleton } from "@/components/route-skeleton";
import { getDictionary, isLocale } from "@/lib/i18n";
import { publishedPosts } from "@/lib/blog/posts";

type BlogPageProps = { params: Promise<{ locale: string }> };

export default function BlogPage(props: BlogPageProps) {
  return <Suspense fallback={<RouteSkeleton />}><BlogContent {...props} /></Suspense>;
}

async function BlogContent({ params }: BlogPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getDictionary(locale).blog;
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <PageSeo locale={locale} route={{ page: "blog" }} />
      <h1 className="text-4xl font-semibold text-white">{copy.title}</h1>
      <p className="mt-4 text-lg text-slate-300">{copy.description}</p>
      {publishedPosts.length === 0 ? (
        <section className="mt-10 rounded-3xl border border-slate-700 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">{copy.comingSoon}</h2>
          <p className="mt-4 text-slate-300">{copy.draftNotice}</p>
        </section>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {publishedPosts.map((post) => <article key={post.slug} className="rounded-3xl border border-slate-700 bg-slate-900/60 p-8">
            <h2 className="text-2xl font-semibold text-white">{post.translations[locale].title}</h2>
            <p className="mt-4 text-slate-300">{post.translations[locale].excerpt}</p>
            <Link href={`/${locale}/blog/${post.slug}`} className="mt-6 inline-flex text-emerald-300">{copy.read}</Link>
          </article>)}
        </div>
      )}
    </div>
  );
}
