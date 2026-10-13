const contactEmail = process.env.LEGAL_CONTACT_EMAIL?.trim() || "manfredparbatia@gmail.com";
if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(contactEmail) || contactEmail.length > 254) {
  throw new Error("LEGAL_CONTACT_EMAIL must be a valid email address without URL query characters.");
}
export const legalOperator = {
  tradeName: "KHMERA",
  legalName: process.env.LEGAL_OPERATOR_NAME?.trim() || "",
  legalForm: process.env.LEGAL_OPERATOR_FORM?.trim() || "",
  address: process.env.LEGAL_OPERATOR_ADDRESS?.trim() || "",
  registration: process.env.LEGAL_OPERATOR_REGISTRATION?.trim() || "",
  taxInformation: process.env.LEGAL_OPERATOR_TAX?.trim() || "",
  email: contactEmail,
  publicationDirector: process.env.LEGAL_PUBLICATION_DIRECTOR?.trim() || "",
  hosting: process.env.LEGAL_HOSTING_DETAILS?.trim() || "",
};

export const launchPolicy = {
  databaseConnected: false,
  publicPublicationEnabled: false,
  paidListingsEnabled: false,
  advertisingEnabled: false,
  paymentsEnabled: false,
  analyticsEnabled: false,
  marketingCookiesEnabled: false,
  embeddedMediaEnabled: false,
} as const;
