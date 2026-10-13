import { redirect } from "next/navigation";
import { Suspense } from "react";
import { RouteSkeleton } from "@/components/route-skeleton";
import { adminHref } from "@/lib/admin/config";
import { getCurrentAdmin } from "@/lib/admin/session";
import { ContactManager } from "./contact-manager";

export default function ContactsAdminPage() {
  return <Suspense fallback={<RouteSkeleton />}><ContactsAdminContent /></Suspense>;
}

async function ContactsAdminContent() {
  if (!await getCurrentAdmin()) redirect(adminHref("/login"));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <a href={adminHref()} className="text-emerald-300">Retour au tableau de bord</a>
      <h1 className="my-6 text-3xl font-semibold text-white">Répertoire privé — clients et partenaires</h1>
      <ContactManager />
    </div>
  );
}
