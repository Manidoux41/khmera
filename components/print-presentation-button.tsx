"use client";

export function PrintPresentationButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="rounded-full border border-slate-600 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800">
      {label}
    </button>
  );
}
