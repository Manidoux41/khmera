"use server";

import { redirect } from "next/navigation";

import { verifyAdminCredentials } from "@/lib/admin/accounts";
import { adminHref } from "@/lib/admin/config";
import { clearAdminSession, setAdminSession } from "@/lib/admin/session";

export type LoginState = { error?: string; email?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Veuillez saisir votre e-mail et votre mot de passe.", email };
  }

  const admin = verifyAdminCredentials(email, password);
  if (!admin) {
    return { error: "Identifiants invalides.", email };
  }

  await setAdminSession(admin.id);
  redirect(adminHref());
}

export async function logoutAction() {
  await clearAdminSession();
  redirect(adminHref("/login"));
}
