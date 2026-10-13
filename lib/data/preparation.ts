import type { Prisma } from "../generated/prisma/client";
import type { BusinessCardDetails, PortraitTreatment } from "../admin/business-card";
import { validateBusinessCard, validateCardRoles } from "../admin/business-card";
import { defaultCardRoles, type CardRoleTranslations } from "../admin/business-card-copy";
import type { Contact } from "../admin/contacts";
import { parseContactFile, serializeContactFile } from "../admin/contacts";
import type { BlogPost } from "../blog/posts";
import { validateBlogPost } from "../blog/posts";
import type { ServiceRecord } from "../services/catalog";
import type { Locale } from "../i18n";

const supportedLocales: readonly Locale[] = ["en", "fr", "es", "de"];

export function prepareContacts(contacts: Contact[]): Prisma.ContactCreateInput[] {
  return parseContactFile(serializeContactFile(contacts)).map(contact => ({
    ...contact,
    email: contact.email || null,
    phone: contact.phone || null,
    organization: contact.organization || null,
    city: contact.city || null,
    notes: contact.notes || null,
  }));
}

export function prepareAgent(details: BusinessCardDetails, portraitTreatment: PortraitTreatment, locale: Locale = "fr", roles: CardRoleTranslations = defaultCardRoles()): Prisma.AgentCreateInput {
  const error = validateBusinessCard(details);
  if (error) throw new Error(error);
  if (portraitTreatment !== "fade" && portraitTreatment !== "transparent") throw new Error("Traitement du portrait invalide.");
  return {
    firstName: details.firstName.trim(),
    lastName: details.lastName.trim(),
    role: details.role.trim(),
    telegram: details.telegram.trim(),
    whatsapp: details.whatsapp.trim(),
    email: details.email.trim(),
    translations: { create: validateCardRoles(locale, { ...roles, [locale]: details.role }) },
    cards: { create: {
      background: { connect: { id: "angkor-wat-sunrise" } },
      portraitTreatment,
      locale,
    } },
  };
}

export function prepareBlogPost(post: BlogPost): Prisma.BlogPostCreateInput {
  const error = validateBlogPost(post);
  if (error) throw new Error(error);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) throw new Error("Identifiant d'article invalide.");
  if (post.status !== "draft" && post.status !== "published") throw new Error("Statut d'article invalide.");
  if (Object.keys(post.translations).length !== supportedLocales.length || supportedLocales.some(locale => !post.translations[locale])) {
    throw new Error("Les quatre traductions de l'article sont requises.");
  }
  return {
    slug: post.slug,
    status: post.status,
    authorName: post.author,
    translations: { create: supportedLocales.map(locale => ({ locale, ...post.translations[locale] })) },
  };
}

export function prepareService(translations: Record<Locale, ServiceRecord>): Prisma.ServiceCreateInput {
  const service = translations.fr;
  for (const locale of supportedLocales) {
    const record = translations[locale];
    if (!record || record.id !== service.id || record.slug !== service.slug || record.kind !== service.kind ||
        record.category !== service.category || record.status !== service.status || record.provider !== service.provider) {
      throw new Error("Les traductions doivent correspondre au même service.");
    }
  }
  const updatedAt = new Date(`${service.updatedAt}T00:00:00Z`);
  if (!Number.isFinite(updatedAt.getTime()) || updatedAt.toISOString().slice(0, 10) !== service.updatedAt) throw new Error("Date du service invalide.");
  return {
    id: service.id,
    slug: service.slug ?? null,
    kind: service.kind,
    category: service.category,
    status: service.status,
    providerName: service.provider,
    isDemo: service.kind === "marketplace",
    updatedAt,
    translations: { create: supportedLocales.map(locale => ({
      locale, name: translations[locale].name, description: translations[locale].description,
      pricing: translations[locale].pricing, publicPath: translations[locale].publicPath,
    })) },
  };
}
