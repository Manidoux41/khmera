export const launchKinds = ["professionals", "reports", "campaigns", "regulatory"] as const;
export type LaunchKind = typeof launchKinds[number];
export const reportReasons = ["fraudulent-business", "incorrect-contact", "misleading-ad", "illegal-content", "third-party-rights", "correction-deletion"] as const;
export const reportReasonLabels = ["Entreprise inexistante / frauduleuse", "Coordonnées incorrectes", "Publicité trompeuse", "Contenu illégal", "Droits de tiers", "Correction / suppression"];
export const kindLabels: Record<LaunchKind, string> = {
  professionals: "Professionnels", reports: "Signalements", campaigns: "Annonces et campagnes", regulatory: "Cambodia Regulatory Checklist",
};
export const statuses: Record<LaunchKind, string[]> = {
  professionals: ["draft", "pending", "approved", "suspended"],
  reports: ["new", "in_progress", "closed"],
  campaigns: ["draft", "pending", "approved", "suspended", "expired"],
  regulatory: ["to_verify", "in_progress", "confirmed", "not_applicable"],
};
export const statusLabels: Record<string, string> = {
  draft: "Brouillon", pending: "À approuver", approved: "Approuvé pour préparation (non publié)",
  suspended: "Suspendu", new: "Reçu", in_progress: "En cours", closed: "Clôturé",
  expired: "Terminé", to_verify: "À vérifier", confirmed: "Réponse documentée", not_applicable: "Non applicable documenté",
};
export type LaunchRecord = {
  id: string; kind: LaunchKind; name: string; description: string; contact: string;
  website: string; status: string; verification: "unverified" | "checked" | "official";
  category: string; address: string; phone: string; imageUrl: string; billingReference: string;
  permission: boolean; evidence: string; authority: string; source: string;
  date: string; endDate: string; plan: "free" | "premium" | "sponsored"; placement: string;
};
export type LaunchAudit = { id: string; at: string; entityId: string; action: "create" | "update" | "delete"; detail: string };
export type LaunchFile = { version: 1; records: LaunchRecord[]; history: LaunchAudit[] };
export const MAX_LAUNCH_BYTES = 2_000_000;
const keys = ["id", "kind", "name", "description", "contact", "website", "status", "verification", "category", "address", "phone", "imageUrl", "billingReference", "permission", "evidence", "authority", "source", "date", "endDate", "plan", "placement"];
const stringFields = keys.filter(key => key !== "permission");
export function emptyLaunchRecord(kind: LaunchKind): LaunchRecord {
  return { id: "", kind, name: "", description: "", contact: "", website: "", status: statuses[kind][0],
    verification: "unverified", category: "", address: "", phone: "", imageUrl: "", billingReference: "",
    permission: false, evidence: "", authority: "", source: "", date: "", endDate: "", plan: "free", placement: "" };
}
export function safeWebsite(value: string) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !!url.hostname && !url.username && !url.password;
  } catch { return false; }
}
function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
export function validateLaunchRecord(value: LaunchRecord): string | null {
  if (!launchKinds.includes(value.kind) || !/^[a-zA-Z0-9_-]{1,100}$/.test(value.id)) return "Identifiant ou type invalide.";
  if (!value.name.trim() || value.name.length > 160 || value.description.length > 2000 || value.evidence.length > 2000) return "Nom requis (160 caractères), description et justificatif limités à 2000 caractères.";
  if ([value.contact, value.website, value.authority, value.source, value.placement, value.category, value.address, value.phone, value.imageUrl, value.billingReference].some(field => field.length > 300)) return "Champ trop long (300 caractères maximum).";
  if (value.contact && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.contact)) return "E-mail invalide.";
  if ([value.website, value.source, value.imageUrl].some(url => url && !safeWebsite(url))) return "URL HTTP(S) valide requise, sans identifiants.";
  if (!statuses[value.kind].includes(value.status) || !["free", "premium", "sponsored"].includes(value.plan) || !["unverified", "checked", "official"].includes(value.verification)) return "Statut, offre ou vérification invalide.";
  if ([value.date, value.endDate].some(date => date && !validDate(date))) return "Date invalide.";
  if (value.date && value.endDate && value.endDate < value.date) return "La date de fin précède le début.";
  if (value.kind === "professionals") {
    if (!value.description.trim() || !value.contact.trim() || !value.category.trim() || !value.address.trim()) return "Description, catégorie, adresse et contact professionnel requis.";
    if (value.status === "approved" && (!value.permission || !value.evidence.trim())) return "Approbation : autorisation de publier et justificatif de contrôle requis.";
    if (value.verification !== "unverified" && (!value.evidence.trim() || !value.date)) return "Vérification : justificatif et date de contrôle requis ; partenariat officiel exige une autorisation écrite.";
  }
  if (value.kind === "reports") {
    if (!value.date) return "Indiquez la date réelle de réception du signalement.";
    if (!reportReasons.some(reason => reason === value.category)) return "Choisissez un motif de signalement.";
  }
  if (value.kind === "campaigns" && value.status === "approved" && (!value.permission || !value.evidence.trim() || !value.date || !value.endDate || !value.placement)) return "Campagne : autorisation, contrôle, dates et emplacement requis. Activation publique désactivée.";
  if (value.kind === "regulatory" && ["confirmed", "not_applicable"].includes(value.status) && (!value.date || !value.evidence.trim() || !value.source || !value.authority.trim())) return "Décision réglementaire : date, autorité, source et justificatif obligatoires.";
  return null;
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
export function parseLaunchFile(text: string): LaunchFile {
  if (new TextEncoder().encode(text).length > MAX_LAUNCH_BYTES) throw new Error("Fichier trop volumineux (2 Mo maximum).");
  let raw: unknown;
  try { raw = JSON.parse(text); } catch { throw new Error("JSON invalide."); }
  if (!isRecord(raw) || raw.version !== 1 || !Array.isArray(raw.records) || !Array.isArray(raw.history) || Object.keys(raw).some(key => !["version", "records", "history"].includes(key))) throw new Error("Format version 1, records et history requis.");
  if (raw.records.length > 500 || raw.history.length > 2000) throw new Error("Maximum 500 fiches et 2000 événements.");
  const records = raw.records.map((entry): LaunchRecord => {
    if (!isRecord(entry) || Object.keys(entry).length !== keys.length || Object.keys(entry).some(key => !keys.includes(key)) || stringFields.some(key => typeof entry[key] !== "string") || typeof entry.permission !== "boolean") throw new Error("Fiche : champs invalides.");
    const record = entry as LaunchRecord;
    const problem = validateLaunchRecord(record);
    if (problem) throw new Error(problem);
    return record;
  });
  if (new Set(records.map(record => record.id)).size !== records.length) throw new Error("Identifiants en double.");
  const history = raw.history.map((entry): LaunchAudit => {
    if (!isRecord(entry) || Object.keys(entry).length !== 5 || Object.keys(entry).some(key => !["id", "at", "entityId", "action", "detail"].includes(key)) || ["id", "at", "entityId", "action", "detail"].some(key => typeof entry[key] !== "string")) throw new Error("Historique invalide.");
    const audit = entry as LaunchAudit;
    if (!/^[a-zA-Z0-9_-]{1,100}$/.test(audit.id) || !/^[a-zA-Z0-9_-]{1,100}$/.test(audit.entityId) || !Number.isFinite(Date.parse(audit.at)) || audit.detail.length > 500 || !["create", "update", "delete"].includes(audit.action)) throw new Error("Événement invalide.");
    return audit;
  });
  if (new Set(history.map(event => event.id)).size !== history.length) throw new Error("Historique : identifiants en double.");
  return { version: 1, records, history };
}
export function serializeLaunchFile(file: LaunchFile) {
  const text = JSON.stringify(file, null, 2);
  parseLaunchFile(text);
  return text;
}
