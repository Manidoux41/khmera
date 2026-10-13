import type { Locale } from "../i18n";

export const businessCardCopy: Record<Locale, { role: string; tagline: string; email: string; portrait: string; credit: string }> = {
  fr: { role: "Conseiller en mise en relation", tagline: "INSTALLATION · VOYAGE · BUSINESS", email: "E-mail", portrait: "Portrait de", credit: "Photo recadrée/teintée" },
  en: { role: "Professional connections advisor", tagline: "RELOCATION · TRAVEL · BUSINESS", email: "Email", portrait: "Portrait of", credit: "Cropped/tinted photo" },
  es: { role: "Asesor de conexiones profesionales", tagline: "INSTALACIÓN · VIAJES · NEGOCIOS", email: "Correo", portrait: "Retrato de", credit: "Foto recortada/teñida" },
  de: { role: "Berater für professionelle Kontakte", tagline: "UMZUG · REISEN · BUSINESS", email: "E-Mail", portrait: "Porträt von", credit: "Foto zugeschnitten/getönt" },
};

export type CardRoleTranslations = Record<Locale, string>;

export function defaultCardRoles(): CardRoleTranslations {
  return {
    fr: businessCardCopy.fr.role, en: businessCardCopy.en.role,
    es: businessCardCopy.es.role, de: businessCardCopy.de.role,
  };
}
