import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { RouteSkeleton } from "@/components/route-skeleton";
import { adminHref } from "@/lib/admin/config";
import { getCurrentAdmin } from "@/lib/admin/session";
import { blogPosts } from "@/lib/blog/posts";
import { BlogEditor } from "./blog-editor";

export default function BlogAdminPage() {
  return <Suspense fallback={<RouteSkeleton />}><BlogAdminContent /></Suspense>;
}

async function BlogAdminContent() {
  if (!await getCurrentAdmin()) redirect(adminHref("/login"));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href={adminHref()} className="text-emerald-300">Retour au tableau de bord</Link>
      <h1 className="my-6 text-3xl font-semibold text-white">Blog — le récit du créateur</h1>
      <BlogEditor initialPost={blogPosts[0]} />
    </div>
  );
}
