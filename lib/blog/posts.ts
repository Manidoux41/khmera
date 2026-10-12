import type { Locale } from "@/lib/i18n";
import founderStory from "./founder-story.json";

export type BlogPost = {
  slug: string;
  status: "draft" | "published";
  author: string;
  translations: Record<Locale, { title: string; excerpt: string; body: string }>;
};

export function validateBlogPost(post: BlogPost): string | null {
  if (!post.author.trim()) return "Renseignez le nom de l'auteur.";
  for (const [locale, translation] of Object.entries(post.translations)) {
    if (!translation.title.trim() || !translation.excerpt.trim()) return `Complétez le titre et le résumé (${locale.toUpperCase()}).`;
    if (post.status === "published" && !translation.body.trim()) return `Complétez le récit (${locale.toUpperCase()}) avant de préparer sa publication.`;
  }
  return null;
}

export function serializeBlogPost(post: BlogPost) {
  const error = validateBlogPost(post);
  if (error) throw new Error(error);
  return `${JSON.stringify(post, null, 2)}\n`;
}

function loadFounderStory(): BlogPost {
  if (founderStory.status !== "draft" && founderStory.status !== "published") throw new Error("Invalid blog post status");
  const post: BlogPost = { ...founderStory, status: founderStory.status };
  const error = validateBlogPost(post);
  if (error) throw new Error(error);
  return post;
}

export const blogPosts: BlogPost[] = [loadFounderStory()];
export const publishedPosts = blogPosts.filter((post) => post.status === "published");

export function getPublishedPost(slug: string) {
  return publishedPosts.find((post) => post.slug === slug);
}
