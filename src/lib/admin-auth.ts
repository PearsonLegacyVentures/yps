export type AdminRole = "admin";

export type AdminSession = {
  email: string;
  role: AdminRole;
  expiresAt: number;
};

type AdminUser = {
  email: string;
  role: AdminRole;
  passwordHash: string;
  salt: string;
  iterations: number;
};

const SESSION_KEY = "yps-admin-session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

const initialAdminUsers: AdminUser[] = [
  {
    email: "admin@yps.com",
    role: "admin",
    salt: "yps-directory-admin-dev-v1",
    iterations: 120000,
    passwordHash: "82190c086ae303b3f90e8dc3cfd579741656176010fe139d6cbc1f3136b93a65",
  },
];

const canUseSessionStorage = () => typeof window !== "undefined" && Boolean(window.sessionStorage);

async function hashPassword(password: string, salt: string, iterations: number) {
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  return Array.from(new Uint8Array(derivedBits))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeCompare(value: string, expected: string) {
  if (value.length !== expected.length) return false;

  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result |= value.charCodeAt(index) ^ expected.charCodeAt(index);
  }

  return result === 0;
}

function saveAdminSession(user: AdminUser): AdminSession {
  const session: AdminSession = {
    email: user.email,
    role: user.role,
    expiresAt: Date.now() + SESSION_TTL_MS,
  };

  if (canUseSessionStorage()) {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return session;
}

export function getAdminSession(): AdminSession | null {
  if (!canUseSessionStorage()) return null;

  const stored = window.sessionStorage.getItem(SESSION_KEY);
  if (!stored) return null;

  try {
    const session = JSON.parse(stored) as AdminSession;
    if (!isAdminSession(session) || session.expiresAt <= Date.now()) {
      signOutAdmin();
      return null;
    }

    return session;
  } catch {
    signOutAdmin();
    return null;
  }
}

export function isAdminSession(session: AdminSession | null | undefined): session is AdminSession {
  return Boolean(session?.email && session.role === "admin" && session.expiresAt > Date.now());
}

export async function signInAdmin(email: string, password: string): Promise<AdminSession | null> {
  if (typeof window === "undefined" || !window.crypto?.subtle) return null;

  const normalizedEmail = email.trim().toLowerCase();
  const user = initialAdminUsers.find((item) => item.email === normalizedEmail && item.role === "admin");
  if (!user) return null;

  const passwordHash = await hashPassword(password, user.salt, user.iterations);
  if (!safeCompare(passwordHash, user.passwordHash)) return null;

  return saveAdminSession(user);
}

export function signOutAdmin() {
  if (canUseSessionStorage()) {
    window.sessionStorage.removeItem(SESSION_KEY);
  }
}

export function requireAdminSession(session: AdminSession | null | undefined) {
  if (!isAdminSession(session)) {
    throw new Error("Admin role required.");
  }
}
