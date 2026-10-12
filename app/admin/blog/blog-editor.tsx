"use client";

import { useState } from "react";
import { locales, localeLabels, type Locale } from "@/lib/i18n";
import { serializeBlogPost, validateBlogPost, type BlogPost } from "@/lib/blog/posts";

export function BlogEditor({ initialPost }: { initialPost: BlogPost }) {
  const [post, setPost] = useState(initialPost);
  const [locale, setLocale] = useState<Locale>("fr");
  const [error, setError] = useState("");
  const [exported, setExported] = useState(false);
  const translation = post.translations[locale];
  const inputClass = "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white";

  function updateTranslation(field: "title" | "excerpt" | "body", value: string) {
    setPost({ ...post, translations: { ...post.translations, [locale]: { ...translation, [field]: value } } });
    setExported(false);
    setError("");
  }

  function exportPost() {
    const problem = validateBlogPost(post);
    if (problem) { setError(problem); return; }
    const url = URL.createObjectURL(new Blob([serializeBlogPost(post)], { type: "application/json;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "founder-story.json";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setExported(true);
    setError("");
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm leading-7 text-amber-100">
        Aucun enregistrement automatique. Les changements restent dans cet onglet et seront perdus si vous le fermez ou rechargez.
        Exportez le fichier JSON, puis remplacez <code>lib/blog/founder-story.json</code> dans le projet et redéployez.
        Le statut « Publication préparée » ne publie rien depuis ce formulaire.
      </div>
      <div className="flex flex-wrap gap-2" aria-label="Langue du récit">
        {locales.map((value) => <button key={value} type="button" onClick={() => setLocale(value)} aria-pressed={locale === value} className={`rounded-full border px-4 py-2 ${locale === value ? "border-emerald-400 text-emerald-200" : "border-slate-700 text-slate-300"}`}>{localeLabels[value]}</button>)}
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <label className="block text-sm text-slate-200">Auteur
            <input value={post.author} onChange={(event) => { setPost({ ...post, author: event.target.value }); setExported(false); setError(""); }} maxLength={120} className={inputClass} />
          </label>
          <label className="block text-sm text-slate-200">Statut de l&apos;export
            <select value={post.status} onChange={(event) => { setPost({ ...post, status: event.target.value === "published" ? "published" : "draft" }); setExported(false); setError(""); }} className={inputClass}>
              <option value="draft">Brouillon privé</option>
              <option value="published">Publication préparée (après intégration et redéploiement)</option>
            </select>
          </label>
          <label className="block text-sm text-slate-200">Titre ({locale.toUpperCase()})
            <input value={translation.title} onChange={(event) => updateTranslation("title", event.target.value)} maxLength={180} className={inputClass} />
          </label>
          <label className="block text-sm text-slate-200">Résumé ({locale.toUpperCase()})
            <textarea value={translation.excerpt} onChange={(event) => updateTranslation("excerpt", event.target.value)} maxLength={500} rows={3} className={inputClass} />
          </label>
          <label className="block text-sm text-slate-200">Récit ({locale.toUpperCase()}) — séparez les paragraphes par une ligne vide
            <textarea value={translation.body} onChange={(event) => updateTranslation("body", event.target.value)} maxLength={30000} rows={14} className={inputClass} />
          </label>
          <p className="text-sm leading-7 text-slate-400">Pour compléter votre récit : d&apos;où êtes-vous partis et avec qui ? Pourquoi Siem Reap ? Quels souvenirs de l&apos;arrivée souhaitez-vous partager ? Comment ce parcours a-t-il inspiré Khmera ? Aucun détail personnel n&apos;a été inventé. Les traductions doivent être complétées avant publication.</p>
        </div>
        <article className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6" lang={locale}>
          <p className="text-sm uppercase tracking-wider text-emerald-300">Aperçu local — non sauvegardé</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">{translation.title}</h2>
          <p className="mt-3 text-sm text-slate-400">{post.author}</p>
          <p className="mt-5 text-lg text-slate-300">{translation.excerpt}</p>
          {translation.body.split(/\n\s*\n/).filter((paragraph) => paragraph.trim()).map((paragraph, index) => <p key={index} className="mt-5 whitespace-pre-wrap leading-8 text-slate-200">{paragraph}</p>)}
        </article>
      </div>
      {error && <p role="alert" className="text-red-300">{error}</p>}
      {exported && <p role="status" className="text-emerald-200">Export déclenché. Vérifiez le téléchargement ; rien n&apos;a été sauvegardé sur le serveur ni publié.</p>}
      <button type="button" onClick={exportPost} className="rounded-full bg-emerald-500 px-6 py-3 font-medium text-white">Exporter le fichier JSON</button>
    </div>
  );
}
