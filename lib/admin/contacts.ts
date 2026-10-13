export const contactCategories = ["tourist", "retiree", "referrer", "partner"] as const;
export type ContactCategory = (typeof contactCategories)[number];
export const contactCategoryLabels: Record<ContactCategory, string> = {
  tourist: "Touriste", retiree: "Retraité", referrer: "Apporteur d'affaires", partner: "Partenaire",
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  city: string;
  categories: ContactCategory[];
  notes: string;
};
export type ContactFile = { version: 1; contacts: Contact[] };
export const MAX_CONTACTS = 1000;
export const MAX_IMPORT_BYTES = 16_000_000;

export function isContactCategory(value: string): value is ContactCategory {
  return contactCategories.some((category) => category === value);
}

export function validateContact(contact: Contact): string | null {
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(contact.id)) return "Identifiant de fiche invalide.";
  if (!contact.name.trim() || contact.name.length > 120) return "Le nom est obligatoire (120 caractères maximum).";
  if (contact.email.length > 254 || (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))) return "Adresse e-mail invalide.";
  if (contact.phone.length > 60 || contact.organization.length > 160 || contact.city.length > 100 || contact.notes.length > 2000) return "Un champ dépasse la longueur autorisée.";
  if (!contact.categories.length || contact.categories.some((category) => !isContactCategory(category)) || new Set(contact.categories).size !== contact.categories.length) return "Choisissez au moins une catégorie valide, sans doublon.";
  return null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseContact(value: unknown, index: number): Contact {
  if (!isRecord(value)) throw new Error(`Fiche ${index + 1} invalide.`);
  const keys = ["id", "name", "email", "phone", "organization", "city", "notes", "categories"];
  if (Object.keys(value).some((key) => !keys.includes(key))) throw new Error(`Fiche ${index + 1} : champ inconnu.`);
  const { id, name, email, phone, organization, city, notes, categories } = value;
  if (typeof id !== "string" || typeof name !== "string" || typeof email !== "string" ||
      typeof phone !== "string" || typeof organization !== "string" || typeof city !== "string" ||
      typeof notes !== "string" || !Array.isArray(categories) || !categories.every((category): category is ContactCategory => typeof category === "string" && isContactCategory(category))) {
    throw new Error(`Fiche ${index + 1} : champs ou catégories invalides.`);
  }
  const contact: Contact = { id, name, email, phone, organization, city, notes, categories };
  const problem = validateContact(contact);
  if (problem) throw new Error(`Fiche ${index + 1} : ${problem}`);
  return contact;
}

export function parseContactFile(text: string): Contact[] {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Le fichier n'est pas un JSON valide.");
  }
  if (!isRecord(data) || data.version !== 1 || !Array.isArray(data.contacts) || Object.keys(data).some((key) => !["version", "contacts"].includes(key))) {
    throw new Error("Format attendu : version 1 et liste contacts.");
  }
  if (data.contacts.length > MAX_CONTACTS) throw new Error(`Limite de ${MAX_CONTACTS} fiches par fichier.`);
  const contacts = data.contacts.map(parseContact);
  if (new Set(contacts.map((contact) => contact.id)).size !== contacts.length) throw new Error("Le fichier contient des identifiants en double.");
  return contacts;
}

export function serializeContactFile(contacts: Contact[]) {
  const file: ContactFile = { version: 1, contacts };
  const text = JSON.stringify(file, null, 2);
  parseContactFile(text);
  return text;
}

export function filterContacts(contacts: Contact[], query: string, category: ContactCategory | "") {
  const search = query.trim().toLocaleLowerCase("fr");
  return contacts.filter((contact) =>
    (!category || contact.categories.includes(category)) &&
    [contact.name, contact.email, contact.phone, contact.organization, contact.city, contact.notes]
      .some((field) => field.toLocaleLowerCase("fr").includes(search)),
  );
}
