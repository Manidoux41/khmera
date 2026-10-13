import type { Prisma } from "../generated/prisma/client";
import { blogPosts } from "../blog/posts";
import { getDictionary, locales, type Locale } from "../i18n";
import { photoIds, photos } from "../photos";
import { listServices, type ServiceRecord } from "../services/catalog";
import { bookingEmail, offers } from "../services/offers";
import { siteUrl } from "../site";
import { testimonialIds, testimonials } from "../testimonials";
import { prepareBlogPost, prepareService } from "./preparation";

export async function prepareCatalog() {
  const catalogs = await Promise.all(locales.map(async locale => ({ locale, services: await listServices(locale) })));
  const services = catalogs[0].services.map(service => {
    const find = (locale: Locale): ServiceRecord => {
      const record = catalogs.find(catalog => catalog.locale === locale)?.services.find(candidate => candidate.id === service.id);
      if (!record) throw new Error(`Traduction manquante du service ${service.id} (${locale}).`);
      return record;
    };
    return prepareService({ en: find("en"), fr: find("fr"), es: find("es"), de: find("de") });
  });
  const assets: Prisma.MediaAssetCreateInput[] = photoIds.map(id => ({
    id, storageKey: `public/images/photos/${id}.jpg`, visibility: "public", mimeType: "image/jpeg",
    author: photos[id].author, license: photos[id].license,
    licenseUrl: photos[id].licenseUrl, sourceUrl: photos[id].sourceUrl,
    modification: id === "angkor-wat-sunrise" ? "Recadrage et teinte sur les cartes ; autres usages redimensionnés." : "Redimensionnement.",
    translations: { create: locales.map(locale => ({
      locale, alt: getDictionary(locale).photos.alt[id], caption: getDictionary(locale).photos.places[id],
    })) },
  }));
  const preparedOffers: Prisma.OfferCreateInput[] = offers.map(offer => ({
    id: `package_${offer.slug}`, slug: offer.slug, service: { connect: { id: `offer_${offer.slug}` } },
    priceUsd: offer.priceUsd.toFixed(2), quoteOnly: true,
    translations: { create: locales.map(locale => ({
      locale, ...getDictionary(locale).commerce.offers[offer.slug],
      exclusions: getDictionary(locale).commerce.exclusions, pricingNote: getDictionary(locale).commerce.pricingNote,
    })) },
  }));
  const preparedTestimonials: Prisma.TestimonialCreateInput[] = testimonialIds.map(id => ({
    id, name: testimonials[id].name, initials: testimonials[id].initials,
    fictional: true, status: "published", photo: { connect: { id: testimonials[id].photoId } },
    translations: { create: locales.map(locale => {
      const copy = getDictionary(locale).testimonials.items[id];
      return { locale, role: copy.role, location: copy.place, service: copy.service, quote: copy.quote, outcome: copy.result };
    }) },
  }));
  const siteTranslations: Prisma.SiteTranslationCreateInput[] = locales.map(locale => ({
    locale, version: 1, content: getDictionary(locale),
  }));
  const presentations: Prisma.PartnerPresentationCreateInput[] = [{
    id: "local-partners",
    translations: { create: locales.map(locale => ({ locale, version: 1, content: getDictionary(locale).partners })) },
  }];
  const settings: Prisma.SiteSettingCreateInput[] = [
    { key: "public-site-url", value: siteUrl.toString() },
    { key: "booking-email", value: bookingEmail },
  ];
  return {
    version: 1,
    purpose: "offline-prisma-preparation",
    databaseConnected: false,
    excluded: ["credentials", "sessions", "browser-only-contacts", "browser-only-agents", "unsent-email-requests", "portrait-files"],
    importOrder: ["mediaAssets", "siteTranslations", "siteSettings", "services", "offers", "blogPosts", "testimonials", "partnerPresentations"],
    data: {
      mediaAssets: assets, siteTranslations, siteSettings: settings, services, offers: preparedOffers,
      blogPosts: blogPosts.map(prepareBlogPost), testimonials: preparedTestimonials, partnerPresentations: presentations,
    },
  };
}
