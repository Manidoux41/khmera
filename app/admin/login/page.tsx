import { redirect } from "next/navigation";
import { Suspense } from "react";

import { LoginForm } from "@/app/admin/login/login-form";
import { RouteSkeleton } from "@/components/route-skeleton";
import { adminHref } from "@/lib/admin/config";
import { getCurrentAdmin } from "@/lib/admin/session";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-white">Espace administrateur</h1>
      <p className="mt-2 text-sm text-slate-400">Connectez-vous pour gérer les services de la plateforme.</p>
      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <Suspense fallback={<RouteSkeleton />}>
          <RedirectIfSignedIn>
            <LoginForm />
          </RedirectIfSignedIn>
        </Suspense>
      </div>
    </div>
  );
}

async function RedirectIfSignedIn({ children }: { children: React.ReactNode }) {
  if (await getCurrentAdmin()) {
    redirect(adminHref());
  }
  return children;
}
