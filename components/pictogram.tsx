import type { ReactNode } from "react";

const paths = {
  visa: <><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M9 10h6M12 7v6M9 17h6" /></>,
  home: <><path d="m3 11 9-8 9 8M5 10v11h14V10" /><path d="M9 21v-7h6v7" /></>,
  business: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V3h8v4M3 12l9 4 9-4M12 12v5" /></>,
  plane: <path d="m21 3-6 18-4-8-8-4 18-6ZM11 13l10-10" />,
  job: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-3a8 8 0 0 1 16 0v3M9 15l3 3 3-3" /></>,
  payment: <><rect x="2" y="5" width="20" height="14" rx="3" /><path d="M2 10h20M6 15h4M16 15h2" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-3 5-5 3 3-5 5-3Z" /></>,
} satisfies Record<string, ReactNode>;

export type PictogramName = keyof typeof paths;
export const categoryIcons: PictogramName[] = ["visa", "business", "job", "plane"];
export const serviceIcons: PictogramName[] = ["visa", "home", "business", "compass"];
export const listingIcons: PictogramName[] = ["home", "business", "compass", "plane"];
export const featureIcons: PictogramName[] = ["visa", "business", "payment"];

export function Pictogram({ name, className = "h-6 w-6" }: { name: PictogramName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}
