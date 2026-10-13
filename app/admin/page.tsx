import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { AdminWorkspace } from "./admin-workspace";
import { BusinessCardEditor } from "@/app/admin/business-card-editor";
import { blogPosts } from "@/lib/blog/posts";
import { RouteSkeleton } from "@/components/route-skeleton";
import { adminHref } from "@/lib/admin/config";
import { getCurrentAdmin } from "@/lib/admin/session";
import { defaultLocale, getDictionary, isLocale, localeLabels, locales, type Locale } from "@/lib/i18n";
import { bookingEmail, formatOfferPrice, offers } from "@/lib/services/offers";
import { siteUrl } from "@/lib/site";
import {
  isServiceKind,
  isServiceStatus,
  listServices,
  type ServiceCategory,
  type ServiceKind,
  type ServiceStatus,
} from "@/lib/services/catalog";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const statusLabels: Record<ServiceStatus, string> = { active: "Actif", beta: "Bêta", inactive: "Inactif" };
const statusStyles: Record<ServiceStatus, string> = {
  active: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  beta: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  inactive: "border-slate-600 bg-slate-800/60 text-slate-300",
};
const kindLabels: Record<ServiceKind, string> = { core: "Service KHMERA", marketplace: "Marketplace" };
const categoryLabels: Record<ServiceCategory, string> = {
  visa: "Visa",
  housing: "Logement",
  business: "Entreprise",
  advisory: "Conseil",
  relocation: "Relocation",
  transport: "Transport",
  tourism: "Tourisme",
};

export default function AdminDashboardPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <AdminDashboard searchParams={searchParams} />
    </Suspense>
  );
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

async function AdminDashboard({ searchParams }: { searchParams: SearchParams }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect(adminHref("/login"));
  }

  const params = await searchParams;
  const statusParam = first(params.status) ?? null;
  const kindParam = first(params.kind) ?? null;
  const localeParam = first(params.locale) ?? "fr";
  const status = isServiceStatus(statusParam) ? statusParam : undefined;
  const kind = isServiceKind(kindParam) ? kindParam : undefined;
  const locale: Locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const commerce = getDictionary(locale).commerce;

  const [allServices, services] = await Promise.all([
    listServices(locale),
    listServices(locale, { status, kind }),
  ]);

  const counts = {
    total: allServices.length,
    active: allServices.filter((service) => service.status === "active").length,
    beta: allServices.filter((service) => service.status === "beta").length,
    inactive: allServices.filter((service) => service.status === "inactive").length,
  };

  const hrefWith = (next: { status?: ServiceStatus | null; kind?: ServiceKind | null; locale?: Locale }) => {
    const query = new URLSearchParams();
    const nextStatus = next.status === undefined ? status : next.status;
    const nextKind = next.kind === undefined ? kind : next.kind;
    const nextLocale = next.locale ?? locale;
    if (nextStatus) query.set("status", nextStatus);
    if (nextKind) query.set("kind", nextKind);
    if (nextLocale !== "fr") query.set("locale", nextLocale);
    const search = query.toString();
    return adminHref(`${search ? `?${search}` : ""}#services`);
  };

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs transition ${active ? "border-emerald-400 bg-emerald-500/15 text-emerald-100" : "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"}`;

  return (
    <AdminWorkspace baseHref={adminHref()}>
    <div className="admin-dashboard mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div data-admin-panel="overview" className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Tableau de bord</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Bienvenue dans votre espace privé</h2>
          <p className="mt-2 text-sm text-slate-400">
            Connecté en tant que <span className="text-slate-200">{admin.name}</span> ({admin.email})
          </p>
        </div>
      </div>

      <dl data-admin-panel="overview" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Services au total", value: counts.total },
          { label: "Actifs", value: counts.active },
          { label: "En bêta", value: counts.beta },
          { label: "Inactifs", value: counts.inactive },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <dt className="text-sm text-slate-400">{stat.label}</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <section data-admin-panel="overview" className="mt-8 rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
        <h2 className="text-2xl font-semibold text-white">Clients et partenaires</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">Gérez vos futurs contacts : touristes, retraités, apporteurs d&apos;affaires et partenaires. Plusieurs catégories sont possibles par fiche. Sans base de données, exportez vos modifications avant de quitter l&apos;onglet.</p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link href={adminHref("/contacts")} className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white">Gérer le répertoire privé</Link>
          <Link href={adminHref("/partners")} className="rounded-full border border-slate-600 px-5 py-3 text-sm font-medium text-white">Présentation partenaires — aperçu et impression</Link>
          <a href="#business-cards" className="rounded-full border border-slate-600 px-5 py-3 text-sm font-medium text-white">Créer une carte de visite</a>
        </div>
      </section>

      <div data-admin-panel="business-cards"><BusinessCardEditor publicUrl={siteUrl.toString()} /></div>

      <section data-admin-panel="data" className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
        <h2 className="text-2xl font-semibold text-white">Préparation de la future base Prisma</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">Schéma PostgreSQL préparé, aucune base connectée. Exportez le catalogue et ses quatre langues pour une future importation contrôlée. Les contacts temporaires et les agents se téléchargent séparément depuis leurs éditeurs ; les photos de profil restent des fichiers à conserver à part. Aucun identifiant de connexion, session ou demande e-mail non envoyée n&apos;est exporté.</p>
        <a href="/api/admin/data-export" download className="mt-5 inline-flex rounded-full border border-slate-600 px-5 py-3 text-sm font-medium text-white">Exporter le catalogue pour Prisma</a>
      </section>

      <section data-admin-panel="overview" className="mt-8 rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
        <h2 className="text-2xl font-semibold text-white">Blog</h2>
        <p className="mt-4 text-lg text-slate-200">{blogPosts[0].translations.fr.title}</p>
        <p className="mt-2 text-sm text-slate-400">
          {blogPosts[0].status === "draft" ? "Brouillon privé — récit à compléter" : "Article publié"}
          {" · "}Auteur : {blogPosts[0].author}
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-300">Complétez le récit et ses traductions, consultez l&apos;aperçu et exportez le JSON. Les modifications ne sont pas sauvegardées sur le serveur.</p>
        <Link href={adminHref("/blog")} className="mt-5 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white">Modifier et prévisualiser l&apos;article</Link>
      </section>

      <section data-admin-panel="offers" className="rounded-3xl border border-emerald-500/30 bg-slate-900/60 p-6">
        <h2 className="text-2xl font-semibold text-white">Vos offres commerciales</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          KHMERA facture ses prestations de conseil : diagnostic, installation, préparation business et voyage découverte.
          Les prix ci-dessous sont des honoraires proposés par vente, pas un chiffre d&apos;affaires encaissé.
          Les offres marketplace restent des exemples, sans commission ni réservation active.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {offers.map((offer) => (
            <Link key={offer.slug} href={`/${locale}/services/${offer.slug}`} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-emerald-200 hover:border-emerald-400">
              {formatOfferPrice(offer.priceUsd, locale)} · {commerce.offers[offer.slug].name}
            </Link>
          ))}
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-300">
          Les clients préparent un e-mail qu&apos;ils doivent envoyer à{" "}
          <a href={`mailto:${bookingEmail}`} className="text-emerald-300">{bookingEmail}</a>.
          Répondez pour qualifier le besoin, confirmer votre capacité à fournir la prestation et proposer un devis écrit
          précisant les taxes éventuelles, le montant final, le calendrier et les modalités de paiement et d&apos;annulation.
          Ne confirmez un rendez-vous qu&apos;après accord du client.
        </p>
        <p className="mt-3 text-xs leading-6 text-slate-400">
          Aucun stockage client sur le serveur ni encaissement en ligne. Le répertoire privé est temporaire,
          avec import/export JSON ; les demandes reçues par e-mail n&apos;y sont pas ajoutées automatiquement.
        </p>
      </section>

      <div data-admin-panel="services" className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <nav aria-label="Filtrer par statut" className="flex flex-wrap gap-2">
          <Link href={hrefWith({ status: null })} className={chip(!status)}>Tous les statuts</Link>
          {(Object.keys(statusLabels) as ServiceStatus[]).map((value) => (
            <Link key={value} href={hrefWith({ status: value })} className={chip(status === value)}>{statusLabels[value]}</Link>
          ))}
        </nav>
        <nav aria-label="Filtrer par type" className="flex flex-wrap gap-2">
          <Link href={hrefWith({ kind: null })} className={chip(!kind)}>Tous les types</Link>
          {(Object.keys(kindLabels) as ServiceKind[]).map((value) => (
            <Link key={value} href={hrefWith({ kind: value })} className={chip(kind === value)}>{kindLabels[value]}</Link>
          ))}
        </nav>
        <nav aria-label="Langue des contenus" className="flex flex-wrap gap-2">
          {locales.map((value) => (
            <Link key={value} href={hrefWith({ locale: value })} className={chip(locale === value)} title={localeLabels[value]}>
              {value.toUpperCase()}
            </Link>
          ))}
        </nav>
      </div>

      <div data-admin-panel="services" className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Service</th>
              <th scope="col" className="px-4 py-3 font-medium">Type</th>
              <th scope="col" className="px-4 py-3 font-medium">Catégorie</th>
              <th scope="col" className="px-4 py-3 font-medium">Statut</th>
              <th scope="col" className="px-4 py-3 font-medium">Prestataire</th>
              <th scope="col" className="px-4 py-3 font-medium">Tarif</th>
              <th scope="col" className="px-4 py-3 font-medium">Mis à jour</th>
              <th scope="col" className="px-4 py-3 font-medium"><span className="sr-only">Lien public</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-950/40">
            {services.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-slate-400">Aucun service ne correspond à ces filtres.</td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="align-top">
                  <td className="px-4 py-4">
                    <p className="font-medium text-white">{service.name}</p>
                    <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">{service.description}</p>
                    <p className="mt-1 font-mono text-[11px] text-slate-500">{service.id}</p>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{kindLabels[service.kind]}</td>
                  <td className="px-4 py-4 text-slate-300">{categoryLabels[service.category]}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${statusStyles[service.status]}`}>
                      {statusLabels[service.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{service.provider}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-300">{service.pricing}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-400">
                    {new Date(`${service.updatedAt}T00:00:00Z`).toLocaleDateString("fr-FR", { timeZone: "UTC" })}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link href={service.publicPath} className="whitespace-nowrap text-emerald-300 hover:text-emerald-200">
                      Voir la page ↗
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p data-admin-panel="services" className="mt-4 text-xs text-slate-500">
        Données de démonstration (mock en mémoire) — également exposées via <code className="font-mono">GET /api/admin/services</code>.
      </p>
    </div>
    </AdminWorkspace>
  );
}
