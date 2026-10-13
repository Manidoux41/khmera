import { getDictionary, type Locale } from "@/lib/i18n";
import type { Offer } from "@/lib/services/offers";

export type BookingRequestDetails = {
  name: string;
  email: string;
  city: string;
  date: string;
  project: string;
};

export function formatBookingDate(value: string, locale: Locale) {
  const date = new Date(`${value}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new RangeError("Invalid booking date");
  }
  return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(date);
}

export function createBookingEmail(locale: Locale, offer: Pick<Offer, "slug">, details: BookingRequestDetails) {
  const copy = getDictionary(locale).commerce;
  const labels = copy.form;
  const email = copy.email;
  const item = copy.offers[offer.slug];
  const subject = `${labels.subject} - ${item.name}`;
  const body = [
    email.greeting,
    "",
    email.introduction,
    "",
    `${email.offer}: ${item.name}`,
    `${email.price}: ${copy.quoteLabel}`,
    `${copy.included}:`,
    ...item.includes.map((detail) => `- ${detail}`),
    "",
    `${labels.name}: ${details.name.trim()}`,
    `${labels.email}: ${details.email.trim()}`,
    `${labels.city}: ${details.city.trim()}`,
    ...(details.date ? [`${email.preferredDate}: ${formatBookingDate(details.date, locale)}`] : []),
    `${email.language}: ${email.languageName} (${locale})`,
    `${labels.project}:\n${details.project.trim()}`,
    "",
    labels.consent,
    copy.pricingNote,
    copy.exclusions,
    "",
    email.closing,
  ].join("\n");
  return { subject, body };
}
