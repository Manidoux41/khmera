import { scryptSync, timingSafeEqual } from "node:crypto";

export type AdminRole = "superadmin";

export type AdminAccount = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
};

type StoredAdminAccount = AdminAccount & {
  passwordSalt: string;
  passwordHash: string;
};

// Mock account store, to be replaced by a database table.
// Development password: Khmera#Admin2026 (scrypt-hashed below, never stored in clear).
const mockAdminAccounts: StoredAdminAccount[] = [
  {
    id: "adm_001",
    name: "Administrateur KHMERA",
    email: "admin@khmera.local",
    role: "superadmin",
    passwordSalt: "289f20d95750a4060080c30cd3880043",
    passwordHash:
      "6ca11572dfc4b68e1b1597962648d5ab0a2552d4a390d1bc54a6c69e0aa9d34f0bb4dc6cf80997c61d872f3306d60281fdf80781d240897dc00c4d1d49a09e43",
  },
];

function toPublicAccount({ id, name, email, role }: StoredAdminAccount): AdminAccount {
  return { id, name, email, role };
}

function configuredAccounts(): StoredAdminAccount[] {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const passwordSalt = process.env.ADMIN_PASSWORD_SALT?.trim();
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && email.length <= 254
    && passwordHash && /^[a-f0-9]{128}$/i.test(passwordHash)
    && passwordSalt && /^[a-f0-9]{32,128}$/i.test(passwordSalt)) {
    return [{ id: "configured_admin", name: process.env.ADMIN_NAME?.trim() || "Administrateur KHMERA", email, role: "superadmin", passwordHash, passwordSalt }];
  }
  const supplied = [process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD_HASH, process.env.ADMIN_PASSWORD_SALT].some(value => value !== undefined);
  return process.env.NODE_ENV === "production" || supplied ? [] : mockAdminAccounts;
}

export function adminCredentialsConfigured() {
  return configuredAccounts().length > 0;
}

export function findAdminById(id: string): AdminAccount | null {
  const account = configuredAccounts().find((candidate) => candidate.id === id);
  return account ? toPublicAccount(account) : null;
}

export function verifyAdminCredentials(email: string, password: string): AdminAccount | null {
  const account = configuredAccounts().find(
    (candidate) => candidate.email === email.trim().toLowerCase(),
  );
  // Hash even when the account is unknown to keep response timing uniform.
  const salt = account?.passwordSalt ?? "00000000000000000000000000000000";
  const expected = Buffer.from(account?.passwordHash ?? "00".repeat(64), "hex");
  const actual = scryptSync(password, salt, 64);

  if (!account || !timingSafeEqual(actual, expected)) {
    return null;
  }

  return toPublicAccount(account);
}
