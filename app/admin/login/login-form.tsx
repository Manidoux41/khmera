"use client";

import { useState, type FormEvent } from "react";

const errorMessages: Record<string, string> = {
  missing_credentials: "Veuillez saisir votre e-mail et votre mot de passe.",
  invalid_credentials: "Identifiants invalides.",
  session_secret_too_short:
    "Connexion indisponible : la variable ADMIN_SESSION_SECRET est trop courte (32 caractères minimum).",
  session_secret_missing:
    "Connexion indisponible : la variable ADMIN_SESSION_SECRET n'est pas visible par ce déploiement.",
};
const fallbackError = "Connexion impossible pour le moment. Veuillez réessayer.";

// Logs in through the stable /api/admin/session endpoint (not a Server Action,
// whose id changes on every deployment) and then does a full navigation so the
// proxy rewrites the secret admin link.
export function LoginForm({ dashboardHref }: { dashboardHref: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      setError(errorMessages.missing_credentials);
      return;
    }

    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "same-origin",
      });
      if (response.ok) {
        window.location.assign(dashboardHref);
        return;
      }
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError((body?.error && errorMessages[body.error]) || fallbackError);
    } catch {
      setError(fallbackError);
    }
    setPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-200">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-400"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-200">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-400"
        />
      </div>

      {error ? (
        <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-400 disabled:opacity-60"
      >
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
