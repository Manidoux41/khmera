import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "KHMERA · Administration",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="fr" className="admin-shell min-h-screen bg-slate-950 text-slate-100">
      <div className="admin-banner border-b border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Image src="/khmera-mark.svg" width={40} height={40} alt="" />
          <p className="text-lg font-bold tracking-[0.14em] text-white">
            KHMERA<span aria-hidden="true" className="text-emerald-400">.</span>
          </p>
          <span className="rounded-full border border-emerald-500/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-300">
            Admin
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
