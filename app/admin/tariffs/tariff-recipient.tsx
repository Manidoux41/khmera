"use client";

import { useState } from "react";
import type { tariffCopy } from "@/lib/admin/tariff-copy";

export function TariffRecipient({ copy }: { copy: typeof tariffCopy.fr.recipient }) {
  const [recipient, setRecipient] = useState("");
  return (
    <div className="tariff-recipient">
      <label className="tariff-recipient-editor" htmlFor="tariff-recipient">
        {copy.label}
        <input id="tariff-recipient" value={recipient} maxLength={160}
          placeholder={copy.placeholder}
          onChange={event => setRecipient(event.target.value)} />
        <span>{copy.help}</span>
      </label>
      <div className="tariff-recipient-print">
        <p>{copy.attention}</p>
        <p className="tariff-recipient-value">{recipient.trim() || "\u00a0"}</p>
      </div>
    </div>
  );
}
