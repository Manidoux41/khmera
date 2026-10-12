export const offerSlugs = ["cambodia-diagnostic", "settle-in", "business-launch", "discovery-trip"] as const;
export type OfferSlug = (typeof offerSlugs)[number];

export const bookingEmail = "manfredparbatia@gmail.com";

export const offers = [
  { slug: "cambodia-diagnostic", priceUsd: 49, category: "advisory" },
  { slug: "settle-in", priceUsd: 249, category: "relocation" },
  { slug: "business-launch", priceUsd: 399, category: "business" },
  { slug: "discovery-trip", priceUsd: 99, category: "tourism" },
] as const;

export type Offer = (typeof offers)[number];

export function getOffer(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}

export function formatOfferPrice(priceUsd: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceUsd);
}

export function bookingMailto(subject: string, body: string) {
  return `mailto:${bookingEmail}?subject=${encodeURIComponent(subject.replace(/[\r\n]/g, " "))}&body=${encodeURIComponent(body)}`;
}
