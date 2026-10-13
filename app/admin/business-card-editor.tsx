"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { cardFieldLimits, defaultBusinessCard, serializeBusinessCard, validateBusinessCard, type BusinessCardDetails, type PortraitTreatment } from "@/lib/admin/business-card";
import { photos } from "@/lib/photos";
import { isLocale, localeLabels, locales, type Locale } from "@/lib/i18n";
import { businessCardCopy, defaultCardRoles } from "@/lib/admin/business-card-copy";
import { BusinessCardContactIcon } from "./business-card-contact-icon";
import "./business-card.css";

const background = photos["angkor-wat-sunrise"];
const fields: { key: keyof BusinessCardDetails; label: string }[] = [
  { key: "firstName", label: "Prénom" },
  { key: "lastName", label: "Nom" },
  { key: "role", label: "Fonction / secteur" },
  { key: "telegram", label: "Telegram — numéro ou @identifiant" },
  { key: "whatsapp", label: "WhatsApp — numéro" },
  { key: "email", label: "Adresse e-mail" },
];

export function BusinessCardEditor({ publicUrl }: { publicUrl: string }) {
  const [details, setDetails] = useState<BusinessCardDetails>(defaultBusinessCard);
  const [photo, setPhoto] = useState<string | null>(null);
  const [copies, setCopies] = useState(8);
  const [error, setError] = useState<string | null>(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [portraitTreatment, setPortraitTreatment] = useState<PortraitTreatment>("fade");
  const [notice, setNotice] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>("fr");
  const [roles, setRoles] = useState(defaultCardRoles);
  const copy = businessCardCopy[locale];
  const photoRequest = useRef(0);
  const photoUrl = useRef<string | null>(null);
  const upload = useRef<HTMLInputElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => () => {
    photoRequest.current += 1;
    if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
  }, []);

  function removePhoto() {
    photoRequest.current += 1;
    if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
    photoUrl.current = null;
    setPhoto(null);
    setPhotoLoading(false);
    if (upload.current) upload.current.value = "";
    setError(null);
  }

  async function loadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";
    const request = ++photoRequest.current;
    setPhotoLoading(false);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Photo refusée : choisissez un JPEG, PNG ou WebP de 5 Mo maximum. La photo précédente est conservée.");
      return;
    }
    setPhotoLoading(true);
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.src = url;
    try {
      await image.decode();
      if (request !== photoRequest.current) { URL.revokeObjectURL(url); return; }
      if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
      photoUrl.current = url;
      setPhoto(url);
      setError(null);
    } catch {
      URL.revokeObjectURL(url);
      if (request === photoRequest.current) setError("Impossible de lire cette photo. Choisissez une autre image ; la photo précédente est conservée.");
    } finally {
      if (request === photoRequest.current) setPhotoLoading(false);
    }
  }

  async function print(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateBusinessCard(details);
    if (validation) { setError(validation); return; }
    setPrinting(true);
    setError(null);
    try {
      await document.fonts.ready;
      await Promise.all(Array.from(sheet.current?.querySelectorAll("img") ?? []).map(image => image.decode()));
      window.print();
    } catch {
      setError("Impression impossible : vérifiez le chargement des images et réessayez. Aucune carte n'a été enregistrée automatiquement.");
    } finally {
      setPrinting(false);
    }
  }

  function exportAgent() {
    try {
      const json = serializeBusinessCard(details, portraitTreatment, locale, roles);
      const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "khmera-agent-carte.json";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setError(null);
      setNotice("Export JSON préparé pour la future base. Vérifiez le téléchargement. La photo n'est pas incluse : conservez son fichier séparément pour le futur stockage privé. Aucune donnée n'a été envoyée.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Impossible de préparer l'export de l'agent.");
    }
  }

  return (
    <section id="business-cards" className="business-card-editor mt-8 rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
      <div className="business-card-controls">
        <h2 className="text-2xl font-semibold text-white">Cartes de visite Khmera</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">Créez une carte pour chaque agent depuis cet accueil privé. Vos champs et photos restent dans cette page, sans envoi au serveur ni sauvegarde : imprimez ou enregistrez en PDF avant de partir.</p>
        <label className="mt-5 grid gap-2 text-sm text-slate-200">
          Langue de la carte
          <select id="card-locale" value={locale} onChange={event => {
            const language = event.target.value;
            if (!isLocale(language)) { setError("Langue de carte invalide."); return; }
            setRoles({ ...roles, [locale]: details.role });
            setDetails({ ...details, role: roles[language] });
            setLocale(language);
            setError(null);
          }} className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-white">
            {locales.map(language => <option key={language} value={language}>{localeLabels[language]}</option>)}
          </select>
        </label>
        <p className="mt-2 text-xs text-slate-400">Le titre, la présentation et le crédit photo suivent la langue choisie. Personnalisez la fonction dans chaque langue : vos variantes sont conservées dans cette page et dans l&apos;export JSON. Les noms et coordonnées ne sont pas traduits.</p>
        <form onSubmit={print} className="mt-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(({ key, label }) => (
              <label key={key} className="grid gap-2 text-sm text-slate-200">
                {label}
                <input type={key === "email" ? "email" : "text"} required maxLength={cardFieldLimits[key]} value={details[key]}
                  onChange={event => { setDetails({ ...details, [key]: event.target.value }); setError(null); }}
                  className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-white" />
              </label>
            ))}
            <label className="grid gap-2 text-sm text-slate-200">
              Exemplaires par feuille A4
              <select id="card-copies" value={copies} onChange={event => setCopies(Number(event.target.value))} className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-white">
                <option value={1}>1 carte</option><option value={8}>8 cartes à découper</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm text-slate-200">
              Photo de l&apos;agent — facultative
              <input ref={upload} type="file" accept="image/jpeg,image/png,image/webp" onChange={loadPhoto} className="max-w-full rounded-xl border border-slate-600 p-3" />
            </label>
            {photo && <label className="grid gap-2 text-sm text-slate-200">
              Intégration du portrait
              <select id="card-portrait-treatment" value={portraitTreatment} onChange={event => setPortraitTreatment(event.target.value === "transparent" ? "transparent" : "fade")} className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-white">
                <option value="fade">Photo classique — contours fondus</option>
                <option value="transparent">PNG / WebP déjà détouré — fond transparent</option>
              </select>
            </label>}
          </div>
          <p className="mt-3 text-xs leading-6 text-slate-400">Photo : JPEG, PNG ou WebP, 5 Mo maximum, uniquement avec autorisation de la personne. Portrait sans cadre ni bordure ; pour supprimer son arrière-plan, utilisez un PNG/WebP déjà détouré et choisissez le mode transparent. Le fondu des photos classiques adoucit les contours sans détourage automatique. Sans photo, aucun emplacement vide n&apos;est imprimé. Les numéros sont reproduits tels que saisis : ajoutez l&apos;indicatif pour vos contacts internationaux. Le numéro Telegram ne garantit pas que le compte soit joignable ; un @identifiant est préférable si disponible.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="submit" disabled={photoLoading || printing} className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white disabled:opacity-50">{printing ? "Préparation…" : "Imprimer / enregistrer en PDF"}</button>
            <button type="button" onClick={exportAgent} className="rounded-full border border-slate-600 px-5 py-3 text-sm">Exporter l&apos;agent pour la future base</button>
            {photo && <button type="button" onClick={removePhoto} className="rounded-full border border-slate-600 px-5 py-3 text-sm">Retirer la photo</button>}
          </div>
          {photoLoading && <p role="status" className="mt-3 text-sm">Chargement de la photo…</p>}
          {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
          {notice && <p role="status" className="mt-3 text-sm text-slate-300">{notice}</p>}
        </form>
        <p className="my-5 text-sm leading-7 text-slate-300">Format 85 × 55 mm. Dans la fenêtre d&apos;impression : A4, échelle 100 % / taille réelle, désactivez les en-têtes et pieds de page et activez les graphiques d&apos;arrière-plan. Le cadre fin sert de repère de découpe. Faites un essai papier avant le tirage ; ce modèle n&apos;inclut pas de fond perdu professionnel.</p>
        <p className="mb-5 text-xs text-slate-400">Photo Angkor Wat : <a href={background.sourceUrl} className="underline">{background.author}</a>, <a href={background.licenseUrl} className="underline">{background.license}</a>. Arrière-plan recadré et teinté, réutilisé sous la même licence ; crédit conservé sur les cartes.</p>
      </div>
      <div className="business-card-scroll">
        <div ref={sheet} className="business-card-sheet" aria-label="Aperçu imprimable des cartes de visite">
          {Array.from({ length: copies }, (_, index) => (
            <article key={index} lang={locale} className={`khmera-business-card${photo ? " has-agent-photo" : ""}`} aria-hidden={index > 0 ? true : undefined}>
              <Image src={background.image} alt="" fill sizes="322px" className="business-card-background" loading="eager" unoptimized />
              <div className="business-card-tint" />
              <div className="business-card-content">
                <div className="business-card-brand"><Image src="/khmera-mark.svg" width={32} height={32} alt="" loading="eager" unoptimized /><strong>Khmera<span>.</span></strong></div>
                <p className="business-card-tagline">{copy.tagline}</p>
                {photo && <Image src={photo} alt={`${copy.portrait} ${details.firstName.trim()} ${details.lastName.trim()}`} width={62} height={76} className={`business-card-agent-photo${portraitTreatment === "transparent" ? " is-transparent" : ""}`} loading="eager" unoptimized />}
                <h3 className="business-card-name" style={{ fontSize: Math.min(18, (photo ? 200 : 280) / Math.max(1, details.firstName.trim().length, details.lastName.trim().length)) }}>
                  <span>{details.firstName.trim()}</span><span>{details.lastName.trim()}</span>
                </h3>
                <p className="business-card-role">{details.role.trim()}</p>
                <p className="business-card-contact"><BusinessCardContactIcon kind="telegram" /><strong>Telegram</strong> {details.telegram.trim()}</p>
                <p className="business-card-contact"><BusinessCardContactIcon kind="whatsapp" /><strong>WhatsApp</strong> {details.whatsapp.trim()}</p>
                <p className="business-card-contact business-card-email"><BusinessCardContactIcon kind="email" /><span className="sr-only">{copy.email} : </span><a href={`mailto:${details.email.trim()}`} style={{ fontSize: Math.min(9, 260 / Math.max(1, details.email.trim().length)) }}>{details.email.trim()}</a></p>
                <a className="business-card-site" href={publicUrl}>{publicUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a>
                <p className="business-card-credit">{copy.credit} : <a href={background.sourceUrl}>{background.author}</a> · <a href={background.licenseUrl}>{background.license}</a></p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
