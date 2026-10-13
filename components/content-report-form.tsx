"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { legalCopy } from "@/lib/legal/copy";
import { validReportTarget, validateReport } from "@/lib/legal/report";

export function ContentReportForm({ locale, contact }: { locale: Locale; contact: string }) {
  const copy = legalCopy[locale].report;
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const targetInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get("target");
    if (target && validReportTarget(target) && targetInput.current) targetInput.current.value = target;
  }, []);
  const inputClass = "mt-2 block w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white";
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const target = String(form.get("target") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const reason = Number(form.get("reason"));
    const details = String(form.get("details") ?? "").trim();
    if (form.get("website") || !form.get("consent") || !validateReport(target, email, reason, details)) {
      setError(copy.invalid); setDraft(""); return;
    }
    setError("");
    setDraft(`${copy.target}: ${target}\n${copy.reason}: ${copy.reasons[reason]}\n${copy.email}: ${email}\n\n${details}`);
  }
  return (
    <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
      <form onSubmit={prepare} onChange={() => { setDraft(""); setError(""); }} className="space-y-5">
        <label className="block">{copy.target}
          <input ref={targetInput} name="target" maxLength={300} required defaultValue={`/${locale}`} className={inputClass} />
        </label>
        <label className="block">{copy.email}<input name="email" type="email" maxLength={254} className={inputClass} /></label>
        <label className="block">{copy.reason}<select name="reason" className={inputClass}>
          {copy.reasons.map((reason, index) => <option key={reason} value={index}>{reason}</option>)}
        </select></label>
        <label className="block">{copy.details}<textarea name="details" required minLength={20} maxLength={2000} rows={5} className={inputClass} /></label>
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <label className="flex gap-3 text-sm"><input name="consent" type="checkbox" required />{copy.consent}</label>
        <button className="rounded-full bg-emerald-600 px-5 py-3 text-white">{copy.prepare}</button>
      </form>
      {error && <p role="alert" className="mt-4 text-red-300">{error}</p>}
      {draft && <div className="mt-6 space-y-4">
        <p role="status" className="text-sm text-amber-200">{copy.notice}</p>
        <a className="inline-block text-emerald-300 underline" href={`mailto:${contact}?subject=${encodeURIComponent(`KHMERA — ${legalCopy[locale].pages.report.title}`)}&body=${encodeURIComponent(draft)}`}>{copy.prepare}</a>
        <textarea aria-label={copy.details} readOnly value={draft} rows={10} className={inputClass} />
        <a href={`mailto:${contact}`} className="text-sm text-emerald-300">{contact}</a>
      </div>}
    </div>
  );
}
