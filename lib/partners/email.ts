import { getDictionary, type Locale } from "@/lib/i18n";

export type PartnerDetails = {
  name: string;
  email: string;
  organization: string;
  activity: string;
  city: string;
  project: string;
};

export function createPartnerEmail(locale: Locale, details: PartnerDetails) {
  const { commerce, partners } = getDictionary(locale);
  const labels = partners.form;
  const fields: [string, string][] = [
    [commerce.form.name, details.name],
    [commerce.form.email, details.email],
    [labels.organization, details.organization],
    [labels.activity, details.activity],
    [commerce.form.city, details.city],
    [commerce.email.language, `${commerce.email.languageName} (${locale})`],
    [labels.project, details.project],
  ];
  return {
    subject: `${labels.subject} - ${details.organization.trim().replace(/[\r\n]/g, " ")}`,
    body: [
      commerce.email.greeting,
      labels.introduction,
      fields.map(([label, value]) => `${label}: ${value.trim()}`).join("\n"),
      labels.consent,
      labels.closing,
    ].join("\n\n"),
  };
}
