import { redirect } from "next/navigation";
import { Suspense } from "react";
import { RouteSkeleton } from "@/components/route-skeleton";
import { adminHref } from "@/lib/admin/config";
import { getCurrentAdmin } from "@/lib/admin/session";
import { blogPosts } from "@/lib/blog/posts";
import { BlogEditor } from "./blog-editor";
import { AdminWorkspace } from "../admin-workspace";

export default function BlogAdminPage() {
  return <Suspense fallback={<RouteSkeleton />}><BlogAdminContent /></Suspense>;
}

async function BlogAdminContent() {
  if (!await getCurrentAdmin()) redirect(adminHref("/login"));
  return (
    <AdminWorkspace baseHref={adminHref()} page="blog">
    <div className="admin-page">
      <BlogEditor initialPost={blogPosts[0]} />
    </div>
    </AdminWorkspace>
  );
}
