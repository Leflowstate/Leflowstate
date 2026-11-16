import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Jeton de formulaire signé (HMAC-SHA256), généré au rendu de la page.
 *
 * Il remplit deux rôles :
 *  1. Anti-CSRF complémentaire — une requête forgée ne peut pas fournir de
 *     jeton valide (en plus du contrôle d'origine des Server Actions).
 *  2. Piège temporel — un envoi quelques instants après l'affichage du
 *     formulaire trahit un robot ; un jeton trop ancien est refusé.
 */

const MIN_FILL_TIME_MS = 3_000;
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

// Secret de secours partagé par tout le processus : la page et la Server
// Action peuvent être chargées dans des instances de module distinctes.
const FALLBACK_KEY = Symbol.for("site.form-secret-fallback");
type GlobalWithFallback = typeof globalThis & { [FALLBACK_KEY]?: string };

function getSecret(): string {
  const secret = process.env.FORM_SECRET;
  if (secret && secret.length >= 16) return secret;

  // Sans FORM_SECRET, on utilise un secret propre au processus. Suffisant en
  // développement ; en production multi-instances (serverless), le jeton
  // serait rejeté par une autre instance → définissez toujours FORM_SECRET.
  const store = globalThis as GlobalWithFallback;
  if (!store[FALLBACK_KEY]) {
    store[FALLBACK_KEY] = randomBytes(32).toString("hex");
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[sécurité] FORM_SECRET n'est pas défini : un secret temporaire est utilisé. " +
          "Définissez FORM_SECRET dans les variables d'environnement.",
      );
    }
  }
  return store[FALLBACK_KEY];
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createFormToken(): string {
  const issuedAt = Date.now().toString(36);
  const nonce = randomBytes(8).toString("base64url");
  const payload = `${issuedAt}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export type FormTokenStatus = "valid" | "invalid" | "too-fast" | "expired";

export function verifyFormToken(token: unknown): FormTokenStatus {
  if (typeof token !== "string" || token.length > 200) return "invalid";

  const parts = token.split(".");
  if (parts.length !== 3) return "invalid";
  const [issuedAt, nonce, signature] = parts as [string, string, string];

  const expected = Buffer.from(sign(`${issuedAt}.${nonce}`));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return "invalid";
  }

  const age = Date.now() - parseInt(issuedAt, 36);
  if (!Number.isFinite(age) || age < 0) return "invalid";
  if (age < MIN_FILL_TIME_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "expired";
  return "valid";
}
