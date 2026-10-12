import { getDictionary, listingSlugs, locales, type Locale } from "@/lib/i18n";
import { formatOfferPrice, offers } from "@/lib/services/offers";

export type ServiceKind = "core" | "marketplace";
export type ServiceStatus = "active" | "beta" | "inactive";
export type ServiceCategory = "visa" | "housing" | "business" | "advisory" | "relocation" | "transport" | "tourism";

type ServiceDefinition = {
  id: string;
  kind: ServiceKind;
  category: ServiceCategory;
  status: ServiceStatus;
  provider: string;
  pricing: string;
  updatedAt: string;
  /** Position of the localized copy in `services.items` or `marketplace.listings`. */
  copyIndex: number;
  slug?: (typeof listingSlugs)[number];
};

export type ServiceRecord = Omit<ServiceDefinition, "copyIndex"> & {
  name: string;
  description: string;
  publicPath: string;
  locales: readonly Locale[];
};

// Mock service registry, to be replaced by a database table.
const serviceDefinitions: ServiceDefinition[] = [
  { id: "svc_visa_support", kind: "core", category: "visa", status: "active", provider: "KHMERA", pricing: "Sur devis", updatedAt: "2026-09-28", copyIndex: 0 },
  { id: "svc_property_search", kind: "core", category: "housing", status: "active", provider: "KHMERA", pricing: "Sur devis", updatedAt: "2026-09-21", copyIndex: 1 },
  { id: "svc_business_setup", kind: "core", category: "business", status: "active", provider: "KHMERA", pricing: "Sur devis", updatedAt: "2026-09-30", copyIndex: 2 },
  { id: "svc_local_advisor", kind: "core", category: "advisory", status: "beta", provider: "KHMERA", pricing: "Sur devis", updatedAt: "2026-10-04", copyIndex: 3 },
  { id: "mkt_premium_condo_rentals", kind: "marketplace", category: "housing", status: "active", provider: "Partenaire immobilier", pricing: "1 200 $/mois", updatedAt: "2026-10-02", copyIndex: 0, slug: "premium-condo-rentals" },
  { id: "mkt_business_registration", kind: "marketplace", category: "business", status: "active", provider: "Cabinet partenaire", pricing: "À partir de 500 $", updatedAt: "2026-09-18", copyIndex: 1, slug: "business-registration" },
  { id: "mkt_family_relocation", kind: "marketplace", category: "relocation", status: "beta", provider: "Partenaire relocation", pricing: "Sur devis", updatedAt: "2026-10-06", copyIndex: 2, slug: "family-relocation" },
  { id: "mkt_private_transfers", kind: "marketplace", category: "transport", status: "inactive", provider: "Partenaire transport", pricing: "À partir de 25 $", updatedAt: "2026-08-30", copyIndex: 3, slug: "private-transfers" },
];

function toRecord(definition: ServiceDefinition, locale: Locale): ServiceRecord {
  const messages = getDictionary(locale);
  const { copyIndex, ...rest } = definition;

  if (definition.kind === "marketplace") {
    const listing = messages.marketplace.listings[copyIndex];
    return {
      ...rest,
      name: listing.title,
      description: listing.subtitle,
      publicPath: `/${locale}/marketplace/${definition.slug}`,
      locales,
    };
  }

  const item = messages.services.items[copyIndex];
  return {
    ...rest,
    name: item.name,
    description: item.detail,
    publicPath: `/${locale}/services`,
    locales,
  };
}

export type ServiceFilters = { status?: ServiceStatus; kind?: ServiceKind };

export async function listServices(locale: Locale, filters: ServiceFilters = {}): Promise<ServiceRecord[]> {
  const copy = getDictionary(locale).commerce;
  const paidServices: ServiceRecord[] = offers.map((offer) => ({
    id: `offer_${offer.slug}`,
    kind: "core",
    category: offer.category,
    status: "active",
    provider: "KHMERA",
    pricing: `${formatOfferPrice(offer.priceUsd, locale)} · ${copy.quoteLabel}`,
    updatedAt: "2026-10-12",
    name: copy.offers[offer.slug].name,
    description: copy.offers[offer.slug].summary,
    publicPath: `/${locale}/services/${offer.slug}`,
    locales,
  }));
  return [...paidServices, ...serviceDefinitions.map((service) => toRecord(service, locale))]
    .filter((service) => !filters.status || service.status === filters.status)
    .filter((service) => !filters.kind || service.kind === filters.kind);
}

export function isServiceStatus(value: string | null): value is ServiceStatus {
  return value === "active" || value === "beta" || value === "inactive";
}

export function isServiceKind(value: string | null): value is ServiceKind {
  return value === "core" || value === "marketplace";
}
