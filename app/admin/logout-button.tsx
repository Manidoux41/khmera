"use client";

import { useState } from "react";

export function LogoutButton({ loginHref }: { loginHref: string }) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    await fetch("/api/admin/session", { method: "DELETE", credentials: "same-origin" }).catch(() => null);
    window.location.assign(loginHref);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white disabled:opacity-60"
    >
      Se déconnecter
    </button>
  );
}
