import { redirect } from "next/navigation";
import { Suspense } from "react";
import { RouteSkeleton } from "@/components/route-skeleton";
import { adminHref } from "@/lib/admin/config";
import { getCurrentAdmin } from "@/lib/admin/session";
import { ContactManager } from "./contact-manager";
import { AdminWorkspace } from "../admin-workspace";

export default function ContactsAdminPage() {
  return <Suspense fallback={<RouteSkeleton />}><ContactsAdminContent /></Suspense>;
}

async function ContactsAdminContent() {
  if (!await getCurrentAdmin()) redirect(adminHref("/login"));
  return (
    <AdminWorkspace baseHref={adminHref()} page="contacts">
    <div className="admin-page">
      <ContactManager />
    </div>
    </AdminWorkspace>
  );
}
