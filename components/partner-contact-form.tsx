"use client";

import { useState, type FormEvent } from "react";

import type { Locale, Messages } from "@/lib/i18n";
import { createPartnerEmail } from "@/lib/partners/email";
import { bookingEmail, bookingMailto } from "@/lib/services/offers";

export function PartnerContactForm({ locale, messages }: { locale: Locale; messages: Messages }) {
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);
  const labels = messages.partners.form;
  const common = messages.commerce;
  const inputClass = "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white focus:border-emerald-400 focus:outline-none";

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const project = event.currentTarget.elements.namedItem("project");
    if (project instanceof HTMLTextAreaElement && field("project").length < 20) {
      project.setCustomValidity(labels.project);
      project.reportValidity();
      return;
    }
    setDraft(createPartnerEmail(locale, {
      name: field("name"), email: field("email"), organization: field("organization"),
      activity: field("activity"), city: field("city"), project: field("project"),
    }));
  }

  return (
    <section id="contact" aria-labelledby="partner-contact-heading" className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6 sm:p-8">
      <h2 id="partner-contact-heading" className="text-2xl font-semibold text-white">{labels.heading}</h2>
      <p className="mt-3 leading-7 text-slate-300">{labels.explanation}</p>
      <form onSubmit={prepare} onChange={() => setDraft(null)} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm text-slate-200">{common.form.name}
            <input name="name" autoComplete="name" required minLength={2} maxLength={100} pattern=".*\S.*" className={inputClass} />
          </label>
          <label className="block text-sm text-slate-200">{common.form.email}
            <input name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} />
          </label>
          <label className="block text-sm text-slate-200">{labels.organization}
            <input name="organization" autoComplete="organization" required maxLength={100} pattern=".*\S.*" className={inputClass} />
          </label>
          <label className="block text-sm text-slate-200">{labels.activity}
            <input name="activity" required maxLength={100} pattern=".*\S.*" className={inputClass} />
          </label>
          <label className="block text-sm text-slate-200">{common.form.city}
            <input name="city" defaultValue="Siem Reap" required maxLength={100} pattern=".*\S.*" className={inputClass} />
          </label>
        </div>
        <label className="block text-sm text-slate-200">{labels.project}
          <textarea name="project" required minLength={20} maxLength={1000} rows={5} className={inputClass} onInput={(event) => event.currentTarget.setCustomValidity("")} />
        </label>
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-emerald-500" />
          {labels.consent}
        </label>
        <p className="text-xs leading-6 text-slate-400">{labels.privacy}</p>
        <button type="submit" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-white">{labels.prepare}</button>
      </form>
      {draft && (
        <div className="mt-8 rounded-2xl border border-emerald-500/40 bg-slate-950 p-5">
          <h3 className="text-lg font-semibold text-white">{labels.draftHeading}</h3>
          <p role="status" className="mt-3 text-sm leading-6 text-amber-200">{labels.draftNotice}</p>
          <a href={bookingMailto(draft.subject, draft.body)} className="mt-5 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white">{common.form.openEmail}</a>
          <p className="mt-5 text-sm leading-6 text-slate-300">{common.form.fallback} <a href={`mailto:${bookingEmail}`} className="break-all text-emerald-300">{bookingEmail}</a></p>
          <label className="mt-4 block text-sm text-slate-200">{common.email.subjectLabel}
            <input readOnly value={draft.subject} className={inputClass} />
          </label>
          <label className="mt-4 block text-sm text-slate-200">{labels.draftHeading}
            <textarea readOnly value={draft.body} rows={12} className={inputClass} />
          </label>
        </div>
      )}
    </section>
  );
}
