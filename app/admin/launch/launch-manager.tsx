"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  emptyLaunchRecord, kindLabels, launchKinds, MAX_LAUNCH_BYTES, parseLaunchFile,
  reportReasons, reportReasonLabels, serializeLaunchFile, statusLabels, statuses, validateLaunchRecord,
  type LaunchAudit, type LaunchKind, type LaunchRecord,
} from "@/lib/launch/preparation";
import { regulatoryTopics } from "@/lib/launch/regulatory";

const initialRecords = (): LaunchRecord[] => regulatoryTopics.map(topic => ({
  ...emptyLaunchRecord("regulatory"), id: topic.id, name: topic.subject, authority: topic.authority,
  source: topic.source, description: topic.question,
}));

export function LaunchManager() {
  const [records, setRecords] = useState<LaunchRecord[]>(initialRecords);
  const [history, setHistory] = useState<LaunchAudit[]>([]);
  const [kind, setKind] = useState<LaunchKind>("professionals");
  const [drafts, setDrafts] = useState<Record<LaunchKind, LaunchRecord>>(() => ({
    professionals: emptyLaunchRecord("professionals"), reports: emptyLaunchRecord("reports"),
    campaigns: emptyLaunchRecord("campaigns"), regulatory: emptyLaunchRecord("regulatory"),
  }));
  const draft = drafts[kind];
  const setDraft = (entry: LaunchRecord) => setDrafts(current => ({ ...current, [entry.kind]: entry }));
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const inputClass = "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white";

  useEffect(() => {
    const sync = () => {
      const selected = launchKinds.find(value => window.location.hash === `#${value}`);
      if (selected) setKind(selected);
    };
    sync(); window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function update<K extends keyof LaunchRecord>(field: K, value: LaunchRecord[K]) {
    setDrafts(current => ({ ...current, [kind]: { ...current[kind], [field]: value } }));
    setDirty(true); setError(""); setNotice("");
  }
  function recordEvent(entityId: string, action: LaunchAudit["action"], detail: string) {
    if (history.length >= 2000) { setError("Historique complet : exportez et archivez avant de continuer."); return false; }
    setHistory([...history, { id: crypto.randomUUID(), at: new Date().toISOString(), entityId, action, detail }]);
    setDirty(true);
    return true;
  }
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const entry = { ...draft, id: draft.id || crypto.randomUUID(), name: draft.name.trim() };
    const problem = validateLaunchRecord(entry);
    if (problem) { setError(problem); return; }
    if (!draft.id && records.length >= 500) { setError("Maximum 500 fiches."); return; }
    const old = records.find(record => record.id === entry.id);
    const changed = Object.keys(entry).filter(key => entry[key as keyof LaunchRecord] !== old?.[key as keyof LaunchRecord]).join(", ");
    if (!recordEvent(entry.id, old ? "update" : "create", `${entry.kind} : ${changed}`)) return;
    setRecords(old ? records.map(record => record.id === entry.id ? entry : record) : [...records, entry]);
    setDraft(emptyLaunchRecord(kind));
    setNotice("Fiche appliquée dans cette page. Aucune publication ni sauvegarde serveur. Exportez pour conserver.");
    setError("");
  }
  function remove(entry: LaunchRecord) {
    if (!window.confirm("Supprimer cette fiche de la préparation locale ?")) return;
    if (!recordEvent(entry.id, "delete", entry.kind)) return;
    setRecords(records.filter(record => record.id !== entry.id));
    if (draft.id === entry.id) setDraft(emptyLaunchRecord(kind));
    setNotice("Fiche supprimée localement ; les anciens exports doivent être supprimés séparément.");
  }
  function exportData() {
    try {
      const text = serializeLaunchFile({ version: 1, records, history });
      const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url; link.download = "khmera-launch-preparation.json"; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice("Export privé téléchargé. Conservez-le dans un emplacement sécurisé ; le formulaire non appliqué n'est pas inclus.");
    } catch (problem) { setError(problem instanceof Error ? problem.message : "Export impossible."); }
  }
  const fields: { key: "name" | "description" | "contact" | "website" | "evidence" | "authority" | "source" | "date" | "endDate" | "placement" | "category" | "address" | "phone" | "imageUrl" | "billingReference"; label: string; type?: string; multiline?: boolean; max?: number }[] = [
    { key: "name", label: kind === "reports" ? "Objet / contenu signalé" : "Nom / sujet", max: 160 },
    { key: "description", label: "Description / commentaires", multiline: true, max: 2000 },
    ...(kind === "professionals" ? [
      { key: "category" as const, label: "Catégorie de service", max: 300 },
      { key: "address" as const, label: "Adresse professionnelle", max: 300 },
      { key: "phone" as const, label: "Téléphone professionnel", max: 300 },
      { key: "imageUrl" as const, label: "Référence image autorisée (URL, jamais chargée ici)", type: "url", max: 300 },
    ] : []),
    { key: "contact", label: "E-mail de contact (ne pas importer de documents sensibles)", type: "email", max: 254 },
    { key: "website", label: "Site du professionnel / URL du contenu", type: "url", max: 300 },
    { key: "evidence", label: "Justificatif / référence du document / contrôle effectué", multiline: true, max: 2000 },
    { key: "authority", label: kind === "regulatory" ? "Autorité compétente" : "Responsable du contrôle / tiers concerné", max: 300 },
    { key: "source", label: "Source officielle / justificatif (URL HTTP(S))", type: "url", max: 300 },
    { key: "date", label: kind === "reports" ? "Date réelle de réception (obligatoire)" : kind === "campaigns" ? "Date de début" : "Date de vérification", type: "date" },
    ...(kind === "campaigns" ? [{ key: "endDate" as const, label: "Date de fin", type: "date" }, { key: "placement" as const, label: "Format et emplacement publicitaire prévu (inactif)", max: 300 }, { key: "billingReference" as const, label: "Référence justificatif de facturation (aucune facture générée)", max: 300 }] : []),
  ];
  return (
    <div id="launch-manager" className="space-y-6">
      <p className="rounded-2xl border border-amber-500/40 p-5 text-sm leading-7 text-amber-100">
        Préparation uniquement : aucune base connectée, publication et monétisation désactivées.
        Signalements reçus par e-mail à saisir manuellement ; aucun accusé automatique.
        Les données et l&apos;historique sont temporaires et modifiables : ce n&apos;est pas un journal d&apos;audit probant.
        Aucun statut ne certifie la conformité juridique. Exportez avant de quitter ou recharger.
      </p>
      <div className="flex flex-wrap gap-3">
        {launchKinds.map(value => <button key={value} type="button" aria-pressed={kind === value}
          onClick={() => {
            window.location.hash = value; setKind(value); setError("");
          }} className={`rounded-xl border px-4 py-3 text-sm ${kind === value ? "border-emerald-400 text-emerald-200" : "border-slate-700"}`}>{kindLabels[value]}</button>)}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={exportData} className="rounded-full border border-slate-600 px-5 py-3">Exporter la préparation privée</button>
        <label className="text-sm">Importer JSON (remplace les fiches et l&apos;historique)
          <input type="file" accept=".json,application/json" className="mt-2 block" onChange={async event => {
            const file = event.target.files?.[0]; event.target.value = "";
            if (!file) return;
            if (file.size > MAX_LAUNCH_BYTES) { setError("Fichier trop volumineux (2 Mo)."); return; }
            try {
              const imported = parseLaunchFile(await file.text());
              if (!window.confirm("Remplacer toutes les fiches et l'historique locaux par ce fichier ?")) return;
              setRecords(imported.records); setHistory(imported.history);
              setDrafts({ professionals: emptyLaunchRecord("professionals"), reports: emptyLaunchRecord("reports"), campaigns: emptyLaunchRecord("campaigns"), regulatory: emptyLaunchRecord("regulatory") });
              setDirty(true); setError("");
              setNotice("Import appliqué localement. Les preuves restent à vérifier ; aucun statut importé ne vaut validation réelle.");
            } catch (problem) { setError(problem instanceof Error ? problem.message : "Import impossible."); }
          }} />
        </label>
      </div>
      {error && <p role="alert" className="text-red-300">{error}</p>}
      {notice && <p role="status" className="text-emerald-200">{notice}</p>}
      <form onSubmit={save} className="grid gap-5 rounded-2xl border border-slate-700 p-5 md:grid-cols-2">
        <h2 className="text-xl font-semibold md:col-span-2">{draft.id ? "Modifier" : "Ajouter"} · {kindLabels[kind]}</h2>
        {fields.map(field => <label key={field.key} className={`text-sm ${field.multiline ? "md:col-span-2" : ""}`}>{field.label}
          {field.multiline ? <textarea value={draft[field.key]} maxLength={field.max} rows={3} onChange={event => update(field.key, event.target.value)} className={inputClass} />
            : <input value={draft[field.key]} type={field.type ?? "text"} required={field.key === "name" || (kind === "reports" && field.key === "date")} maxLength={field.max} onChange={event => update(field.key, event.target.value)} className={inputClass} />}
        </label>)}
        <label className="text-sm">Statut<select value={draft.status} onChange={event => update("status", event.target.value)} className={inputClass}>
          {statuses[kind].map(value => <option key={value} value={value}>{statusLabels[value]}</option>)}
        </select></label>
        {kind === "reports" && <label className="text-sm">Motif du signalement<select value={draft.category} required onChange={event => update("category", event.target.value)} className={inputClass}>
          <option value="">Choisir le motif</option>
          {reportReasons.map((reason, index) => <option key={reason} value={reason}>{reportReasonLabels[index]}</option>)}
        </select></label>}
        {(kind === "professionals" || kind === "campaigns") && <>
          <label className="text-sm">Offre future (inactive)<select value={draft.plan} onChange={event => update("plan", event.target.value as LaunchRecord["plan"])} className={inputClass}>
            <option value="free">Gratuite</option><option value="premium">Premium (inactif)</option><option value="sponsored">Sponsorisée (inactive)</option>
          </select></label>
          <label className="flex items-start gap-3 text-sm md:col-span-2"><input type="checkbox" checked={draft.permission} onChange={event => update("permission", event.target.checked)} />Autorisation écrite de publier les coordonnées, textes et images reçue et documentée</label>
        </>}
        {kind === "professionals" && <label className="text-sm">Vérification (jamais automatique)<select value={draft.verification} onChange={event => update("verification", event.target.value as LaunchRecord["verification"])} className={inputClass}>
          <option value="unverified">Non vérifié</option><option value="checked">Informations contrôlées avec justificatif</option><option value="official">Partenaire officiel avec autorisation écrite</option>
        </select></label>}
        <div className="flex flex-wrap gap-4 md:col-span-2">
          <button className="rounded-full bg-emerald-600 px-5 py-3">Appliquer la fiche localement</button>
          <button type="button" onClick={() => {
            if (window.confirm("Vider le formulaire non appliqué ?")) setDraft(emptyLaunchRecord(kind));
          }} className="rounded-full border border-slate-600 px-5 py-3">Vider le formulaire</button>
        </div>
      </form>
      <label className="block text-sm">Rechercher<input value={query} onChange={event => setQuery(event.target.value)} className={inputClass} /></label>
      <ul className="space-y-3">
        {records.filter(record => record.kind === kind && `${record.name} ${record.description}`.toLowerCase().includes(query.toLowerCase())).map(entry => <li key={entry.id} className="rounded-2xl border border-slate-700 p-5">
          <h3 className="font-semibold">{entry.name}</h3><p className="mt-2 text-sm text-slate-300">{statusLabels[entry.status]} · {entry.plan} · {entry.verification}</p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-slate-400">{entry.description}</p>
          {entry.kind === "regulatory" && <p className="mt-2 text-sm">{entry.authority} · {entry.source} · {entry.date || "Date à renseigner"} · Justificatif : {entry.evidence || "À fournir"}</p>}
          <div className="mt-4 flex gap-4">
            <button type="button" onClick={() => { setDraft({ ...entry }); setError(""); }} className="text-emerald-300 underline">Modifier {entry.name}</button>
            <button type="button" onClick={() => remove(entry)} className="text-red-300 underline">Supprimer {entry.name}</button>
          </div>
        </li>)}
      </ul>
      {!records.some(record => record.kind === kind) && <p className="text-sm text-slate-400">Aucune fiche dans cette section.</p>}
      <details className="rounded-2xl border border-slate-700 p-5">
        <summary>Historique temporaire des modifications ({history.length})</summary>
        <ul className="mt-4 space-y-2 text-xs">{history.map(event => <li key={event.id}>{event.at} · {event.action} · {event.entityId} · {event.detail}</li>)}</ul>
      </details>
    </div>
  );
}
