import type { Locale } from "../i18n";
import { defaultCardRoles, type CardRoleTranslations } from "./business-card-copy";

export type BusinessCardDetails = {
  firstName: string;
  lastName: string;
  role: string;
  telegram: string;
  whatsapp: string;
  email: string;
};

export const defaultBusinessCard: BusinessCardDetails = {
  firstName: "Manfred",
  lastName: "Parbatia",
  role: "Conseiller en mise en relation",
  telegram: "076-252-3154",
  whatsapp: "076-252-3154",
  email: "manfredparbatia@gmail.com",
};

export const cardFieldLimits: Record<keyof BusinessCardDetails, number> = {
  firstName: 26, lastName: 26, role: 40, telegram: 24, whatsapp: 24, email: 64,
};

function isPhone(value: string) {
  return /^\+?[\d ()-]+$/.test(value) && /^\d{6,15}$/.test(value.replace(/\D/g, ""));
}

export function validateBusinessCard(details: BusinessCardDetails): string | null {
  for (const field of Object.keys(cardFieldLimits) as (keyof BusinessCardDetails)[]) {
    if (!details[field].trim()) return "Complétez le prénom, le nom, la fonction, les deux contacts et l'e-mail.";
    if (details[field].trim().length > cardFieldLimits[field]) return "Un champ dépasse la longueur autorisée pour la carte.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) return "E-mail : indiquez une adresse valide.";
  if (!isPhone(details.whatsapp.trim())) return "WhatsApp : indiquez un numéro valide, avec son indicatif international si nécessaire.";
  const telegram = details.telegram.trim();
  if (!isPhone(telegram) && !/^@[a-zA-Z][a-zA-Z0-9_]{4,23}$/.test(telegram)) {
    return "Telegram : indiquez un numéro valide ou un identifiant commençant par @.";
  }
  return null;
}

export type PortraitTreatment = "fade" | "transparent";

export function serializeBusinessCard(details: BusinessCardDetails, portraitTreatment: PortraitTreatment, locale: Locale = "fr", roles: CardRoleTranslations = defaultCardRoles()) {
  const error = validateBusinessCard(details);
  if (error) throw new Error(error);
  if (portraitTreatment !== "fade" && portraitTreatment !== "transparent") throw new Error("Traitement du portrait invalide.");
  const translations = validateCardRoles(locale, { ...roles, [locale]: details.role });
  return JSON.stringify({
    version: 2,
    agent: Object.fromEntries(Object.entries(details).map(([key, value]) => [key, value.trim()])),
    translations,
    card: { backgroundAssetId: "angkor-wat-sunrise", portraitTreatment, locale },
    portrait: null,
  }, null, 2);
}

export function validateCardRoles(locale: Locale, roles: CardRoleTranslations) {
  if (!["fr", "en", "es", "de"].includes(locale)) throw new Error("Langue de carte invalide.");
  return (["fr", "en", "es", "de"] as const).map(language => {
    const role = roles[language];
    if (typeof role !== "string" || !role.trim() || role.trim().length > cardFieldLimits.role) throw new Error(`Fonction invalide (${language}).`);
    return { locale: language, role: role.trim() };
  });
}
