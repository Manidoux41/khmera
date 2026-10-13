"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  contactCategories, contactCategoryLabels, filterContacts, isContactCategory,
  MAX_CONTACTS, MAX_IMPORT_BYTES, parseContactFile, serializeContactFile, validateContact,
  type Contact, type ContactCategory,
} from "@/lib/admin/contacts";

const emptyContact = (): Contact => ({
  id: "", name: "", email: "", phone: "", organization: "", city: "Siem Reap", categories: [], notes: "",
});

export function ContactManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [draft, setDraft] = useState<Contact>(emptyContact);
  const [editing, setEditing] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ContactCategory | "">("");
  const [dirty, setDirty] = useState(false);
  const [formDirty, setFormDirty] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [pendingImport, setPendingImport] = useState<Contact[] | null>(null);
  const [importing, setImporting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputClass = "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white";
  const visible = filterContacts(contacts, query, category);

  useEffect(() => {
    if (!dirty && !formDirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, formDirty]);

  function update(field: "name" | "email" | "phone" | "organization" | "city" | "notes", value: string) {
    setDraft({ ...draft, [field]: value });
    setFormDirty(true);
    setError("");
    setNotice("");
  }

  function resetEditor() {
    setDraft(emptyContact());
    setEditing(null);
    setFormDirty(false);
  }

  function canDiscardEditor() {
    return !formDirty || window.confirm("Abandonner les modifications non appliquées de cette fiche ?");
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const contact: Contact = {
      ...draft, id: editing ?? crypto.randomUUID(),
      name: draft.name.trim(), email: draft.email.trim(), phone: draft.phone.trim(),
      organization: draft.organization.trim(), city: draft.city.trim(), notes: draft.notes.trim(),
    };
    const problem = validateContact(contact);
    if (problem) { setError(problem); return; }
    if (!editing && contacts.length >= MAX_CONTACTS) { setError(`Limite de ${MAX_CONTACTS} fiches atteinte.`); return; }
    setContacts(editing ? contacts.map((item) => item.id === editing ? contact : item) : [...contacts, contact]);
    setDirty(true);
    setError("");
    setNotice("Fiche appliquée dans cet onglet uniquement. Exportez le répertoire pour la conserver.");
    resetEditor();
  }

  function edit(contact: Contact) {
    if (!canDiscardEditor()) return;
    setDraft({ ...contact, categories: [...contact.categories] });
    setEditing(contact.id);
    setFormDirty(false);
    setError("");
    setNotice("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function remove(id: string) {
    if (editing === id && !canDiscardEditor()) return;
    setContacts(contacts.filter((contact) => contact.id !== id));
    if (editing === id) resetEditor();
    setPendingDelete(null);
    setDirty(true);
    setNotice("Fiche supprimée de cet onglet. Exportez la nouvelle version du répertoire.");
  }

  async function readImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    setError("");
    setNotice("");
    setPendingImport(null);
    if (file.size > MAX_IMPORT_BYTES) { setError("Fichier trop volumineux : 16 Mo maximum."); return; }
    setImporting(true);
    try {
      const imported = parseContactFile(await file.text());
      setPendingImport(imported);
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Impossible de lire le fichier JSON.");
    } finally {
      setImporting(false);
    }
  }

  function applyImport() {
    if (pendingImport === null || !canDiscardEditor()) return;
    setContacts(pendingImport);
    setPendingImport(null);
    setPendingDelete(null);
    resetEditor();
    setDirty(false);
    setNotice("Fichier importé dans cet onglet uniquement. Le serveur n'a reçu aucune fiche.");
  }

  function exportContacts() {
    if (formDirty) { setError("Appliquez ou annulez les modifications de la fiche avant d'exporter."); return; }
    try {
      const url = URL.createObjectURL(new Blob([serializeContactFile(contacts)], { type: "application/json;charset=utf-8" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "khmera-contacts-prives.json";
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setError("");
      setNotice("Export déclenché. Vérifiez le téléchargement avant de quitter : aucune sauvegarde serveur. Gardez le fichier privé.");
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Impossible d'exporter le répertoire.");
    }
  }

  return (
    <div className="space-y-8">
      <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm leading-7 text-amber-100">
        Sans base de données : aucun enregistrement serveur ni stockage automatique dans le navigateur.
        Les fiches disparaissent au rechargement, à la fermeture ou en quittant cette page.
        Exportez le JSON puis réimportez-le pour reprendre votre travail. Gardez ces fichiers privés, hors du dépôt et du site public.
        Aucune demande reçue par e-mail n&apos;est ajoutée automatiquement. N&apos;enregistrez pas de documents sensibles.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={exportContacts} className="rounded-full border border-slate-600 px-5 py-3">Exporter toutes les fiches JSON ({contacts.length})</button>
        <label className="text-sm text-slate-300">Importer un fichier JSON privé (remplace le répertoire)
          <input type="file" accept=".json,application/json" onChange={readImport} disabled={importing} className="mt-2 block max-w-full" />
        </label>
        {importing && <p role="status">Lecture du fichier…</p>}
      </div>
      {pendingImport !== null && (
        <div className="rounded-xl border border-amber-500 p-4">
          <p>Remplacer les {contacts.length} fiches actuelles par les {pendingImport.length} fiches importées ? Exportez d&apos;abord toute donnée à conserver.</p>
          <button type="button" onClick={applyImport} className="mr-4 mt-3 rounded-full bg-emerald-500 px-4 py-2">Confirmer le remplacement</button>
          <button type="button" onClick={() => setPendingImport(null)} className="rounded-full border border-slate-600 px-4 py-2">Annuler l&apos;import</button>
        </div>
      )}
      {error && <p role="alert" className="text-red-300">{error}</p>}
      {notice && <p role="status" className="text-emerald-200">{notice}</p>}
      <form ref={formRef} onSubmit={save} className="space-y-5 rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
        <h2 className="text-2xl font-semibold">{editing ? "Modifier la fiche" : "Ajouter une fiche"}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>Nom / contact principal
            <input value={draft.name} onChange={(event) => update("name", event.target.value)} required maxLength={120} className={inputClass} />
          </label>
          <label>E-mail
            <input type="email" value={draft.email} onChange={(event) => update("email", event.target.value)} maxLength={254} className={inputClass} />
          </label>
          <label>Téléphone
            <input type="tel" value={draft.phone} onChange={(event) => update("phone", event.target.value)} maxLength={60} className={inputClass} />
          </label>
          <label>Structure / entreprise
            <input value={draft.organization} onChange={(event) => update("organization", event.target.value)} maxLength={160} className={inputClass} />
          </label>
          <label>Ville
            <input value={draft.city} onChange={(event) => update("city", event.target.value)} maxLength={100} className={inputClass} />
          </label>
        </div>
        <fieldset>
          <legend>Catégories — au moins une, plusieurs possibles</legend>
          <div className="mt-3 flex flex-wrap gap-5">
            {contactCategories.map((value) => (
              <label key={value} className="flex items-center gap-2">
                <input type="checkbox" checked={draft.categories.includes(value)} onChange={(event) => {
                  setDraft({ ...draft, categories: event.target.checked ? [...draft.categories, value] : draft.categories.filter((item) => item !== value) });
                  setFormDirty(true); setError(""); setNotice("");
                }} />{contactCategoryLabels[value]}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block">Notes / besoins / activité du partenaire
          <textarea value={draft.notes} onChange={(event) => update("notes", event.target.value)} rows={4} maxLength={2000} className={inputClass} />
        </label>
        <div className="flex flex-wrap gap-4">
          <button type="submit" className="rounded-full bg-emerald-500 px-5 py-3">{editing ? "Appliquer les modifications" : "Ajouter au répertoire"}</button>
          <button type="button" onClick={() => { if (canDiscardEditor()) { resetEditor(); setError(""); } }} className="rounded-full border border-slate-600 px-5 py-3">Annuler / vider la fiche</button>
        </div>
      </form>
      <section aria-labelledby="contact-list-heading">
        <h2 id="contact-list-heading" className="text-2xl font-semibold">Fiches ({visible.length} / {contacts.length})</h2>
        <div className="my-5 grid gap-4 sm:grid-cols-2">
          <label>Rechercher
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} className={inputClass} />
          </label>
          <label>Filtrer par catégorie
            <select value={category} onChange={(event) => { const value = event.target.value; setCategory(isContactCategory(value) ? value : ""); }} className={inputClass}>
              <option value="">Toutes les catégories</option>
              {contactCategories.map((value) => <option key={value} value={value}>{contactCategoryLabels[value]}</option>)}
            </select>
          </label>
        </div>
        {!visible.length && <p className="text-slate-400">{contacts.length ? "Aucune fiche ne correspond aux filtres." : "Répertoire vide. Ajoutez une fiche ou importez un export privé."}</p>}
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((contact) => (
            <article key={contact.id} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
              <h3 className="text-xl font-semibold">{contact.name}</h3>
              <p className="mt-2 text-sm text-emerald-200">{contact.categories.map((value) => contactCategoryLabels[value]).join(" · ")}</p>
              <dl className="mt-4 space-y-2 text-sm text-slate-300">
                <div><dt className="inline font-semibold">Structure : </dt><dd className="inline">{contact.organization || "Non renseignée"}</dd></div>
                <div><dt className="inline font-semibold">E-mail : </dt><dd className="inline break-all">{contact.email || "Non renseigné"}</dd></div>
                <div><dt className="inline font-semibold">Téléphone : </dt><dd className="inline">{contact.phone || "Non renseigné"}</dd></div>
                <div><dt className="inline font-semibold">Ville : </dt><dd className="inline">{contact.city || "Non renseignée"}</dd></div>
                {contact.notes && <div><dt className="font-semibold">Notes : </dt><dd className="whitespace-pre-wrap break-words">{contact.notes}</dd></div>}
              </dl>
              <div className="mt-4 flex gap-4">
                <button type="button" onClick={() => edit(contact)} className="rounded-full border border-slate-600 px-4 py-2">Modifier</button>
                <button type="button" onClick={() => setPendingDelete(contact.id)} className="rounded-full border border-red-400/50 px-4 py-2 text-red-200">Supprimer</button>
              </div>
              {pendingDelete === contact.id && <div className="mt-4 rounded-xl border border-red-400/50 p-4">
                <p>Supprimer cette fiche de l&apos;onglet ? Cette suppression ne modifie pas vos anciens exports.</p>
                <button type="button" onClick={() => remove(contact.id)} className="mr-4 mt-3 text-red-200">Confirmer la suppression</button>
                <button type="button" onClick={() => setPendingDelete(null)}>Annuler la suppression</button>
              </div>}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
