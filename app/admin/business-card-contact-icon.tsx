export function BusinessCardContactIcon({ kind }: { kind: "telegram" | "whatsapp" | "email" }) {
  return (
    <svg className={`business-card-contact-icon icon-${kind}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {kind === "telegram" ? <>
        <circle cx="12" cy="12" r="12" fill="#1685b5" />
        <path d="m5 11 14-6-3 14-5-4-3 3 1-5 7-5-8 4Z" fill="white" />
      </> : kind === "whatsapp" ? <>
        <circle cx="12" cy="12" r="12" fill="#14813c" />
        <path d="M6 19l1-4a7 7 0 1 1 3 3Z" fill="none" stroke="white" strokeWidth="1.4" />
        <path d="M9 7c-3 3 5 11 8 7l-3-2-1 1c-1-1-2-2-2-3l1-1Z" fill="white" />
      </> : <>
        <circle cx="12" cy="12" r="12" fill="#284b97" />
        <rect x="5" y="7" width="14" height="10" rx="1" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="m5 7 7 6 7-6" fill="none" stroke="white" strokeWidth="1.5" />
      </>}
    </svg>
  );
}
