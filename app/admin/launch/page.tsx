import { Suspense } from "react";
import { redirect } from "next/navigation";
import { RouteSkeleton } from "@/components/route-skeleton";
import { adminHref } from "@/lib/admin/config";
import { getCurrentAdmin } from "@/lib/admin/session";
import { AdminWorkspace } from "../admin-workspace";
import { LaunchManager } from "./launch-manager";

export default function LaunchPage() {
  return <Suspense fallback={<RouteSkeleton />}><LaunchContent /></Suspense>;
}
async function LaunchContent() {
  if (!await getCurrentAdmin()) redirect(adminHref("/login"));
  return <AdminWorkspace baseHref={adminHref()} page="launch"><LaunchManager /></AdminWorkspace>;
}
