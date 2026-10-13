"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LogoutButton } from "./logout-button";
import "./admin-workspace.css";

const dashboardSections = ["overview", "services", "offers", "business-cards", "data"] as const;
type DashboardSection = typeof dashboardSections[number];
type Section = DashboardSection | "contacts" | "blog" | "partners" | "tariffs" | "launch" | "launch-professionals" | "launch-reports" | "launch-campaigns" | "launch-regulatory";

const titles: Record<Section, string> = {
  overview: "Tableau de bord",
  services: "Services disponibles",
  offers: "Vos offres commerciales",
  "business-cards": "Cartes de visite",
  data: "Préparation de la future base Prisma",
  contacts: "Répertoire privé — clients et partenaires",
  blog: "Blog — le récit du créateur",
  partners: "Présentation partenaires",
  tariffs: "Fiches tarifaires",
  launch: "Lancement et modération",
  "launch-professionals": "Professionnels et vérifications",
  "launch-reports": "Suivi des signalements",
  "launch-campaigns": "Annonces et campagnes",
  "launch-regulatory": "Checklist réglementaire",
};

const groups: { label: string; items: Section[] }[] = [
  { label: "Activité et services", items: ["services", "offers", "tariffs"] },
  { label: "Relations et prospection", items: ["contacts", "partners", "business-cards"] },
  { label: "Contenus du site", items: ["blog"] },
  { label: "Préparation du lancement", items: ["launch-professionals", "launch-reports", "launch-campaigns", "launch-regulatory"] },
  { label: "Données et configuration", items: ["data"] },
];

function isDashboardSection(value: string): value is DashboardSection {
  return dashboardSections.some(section => section === value);
}

export function AdminWorkspace({ baseHref, page = "overview", children }: {
  baseHref: string;
  page?: Section;
  children: ReactNode;
}) {
  const dashboard = isDashboardSection(page);
  const [section, setSection] = useState<Section>(page);

  useEffect(() => {
    if (page !== "launch") return;
    const sync = () => {
      const item = `launch-${window.location.hash.slice(1)}`;
      setSection(groups.flatMap(group => group.items).find(value => value === item) ?? "launch");
    };
    sync(); window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [page]);
  useEffect(() => {
    if (!dashboard) return;
    const syncSection = () => {
      const hash = window.location.hash.slice(1);
      setSection(isDashboardSection(hash) ? hash : "overview");
    };
    syncSection();
    window.addEventListener("hashchange", syncSection);
    return () => window.removeEventListener("hashchange", syncSection);
  }, [dashboard]);

  function hrefFor(item: Section) {
    if (item.startsWith("launch-")) return `${baseHref}/launch#${item.slice(7)}`;
    return isDashboardSection(item)
      ? `${baseHref}#${item}`
      : `${baseHref}/${item}`;
  }

  function navigationItem(item: Section) {
    return (
      <a
        key={item}
        href={hrefFor(item)}
        aria-current={section === item ? "page" : undefined}
        onClick={event => {
          if (!dashboard || !isDashboardSection(item) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          window.location.hash = item;
          setSection(item);
          document.getElementById("admin-main")?.focus({ preventScroll: true });
        }}
      >
        {titles[item]}
      </a>
    );
  }

  return (
    <div className="admin-workspace" data-section={section}>
      <a className="admin-skip-link" href="#admin-main" onClick={event => {
        event.preventDefault();
        const main = document.getElementById("admin-main");
        main?.focus({ preventScroll: true });
        main?.scrollIntoView({ block: "start" });
      }}>Aller au contenu</a>
      <aside className="admin-sidebar">
        <nav aria-label="Navigation administration">
          <p className="admin-nav-caption">Votre espace privé</p>
          {navigationItem("overview")}
          {groups.map(group => (
            <details key={group.label} open>
              <summary>{group.label}</summary>
              <div className="admin-submenu">{group.items.map(navigationItem)}</div>
            </details>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <p>Sans base connectée. Exportez les données temporaires avant de quitter leur page.</p>
          <a href="/fr" target="_blank" rel="noopener noreferrer">Voir le site public ↗</a>
          <LogoutButton loginHref={`${baseHref}/login`} />
        </div>
      </aside>
      <main id="admin-main" tabIndex={-1} className="admin-main">
        <header className="admin-section-header">
          <p>Administration · Siem Reap</p>
          <h1>{titles[section]}</h1>
        </header>
        {children}
      </main>
    </div>
  );
}
