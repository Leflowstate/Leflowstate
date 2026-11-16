"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Gestion du consentement aux cookies (RGPD / LPD).
 *
 * Le choix est enregistré dans un cookie propriétaire, strictement
 * nécessaire, valable 6 mois. Aucun traceur n'est chargé sans accord :
 * enveloppez tout script de mesure d'audience dans <ConsentGate>.
 */

export const CONSENT_COOKIE = "consentement_cookies";
const CONSENT_VERSION = 1;
const SIX_MONTHS_IN_SECONDS = 60 * 60 * 24 * 182;
const OPEN_SETTINGS_EVENT = "cookies:ouvrir-preferences";

export type Consent = {
  version: number;
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readRawCookie(): string | null {
  const entry = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  return entry ? decodeURIComponent(entry.slice(CONSENT_COOKIE.length + 1)) : null;
}

// `document.cookie` est lu une seule fois, puis servi depuis ce cache :
// React appelle `getSnapshot` à chaque rendu.
let cachedCookie: string | null | undefined;

function getSnapshot(): string | null {
  if (cachedCookie === undefined) cachedCookie = readRawCookie();
  return cachedCookie;
}

function parseConsent(raw: string | null | undefined): Consent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<Consent>;
    if (value.version !== CONSENT_VERSION || typeof value.analytics !== "boolean") return null;
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: value.analytics,
      updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : "",
    };
  } catch {
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean }) {
  const consent: Consent = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: choice.analytics,
    updatedAt: new Date().toISOString(),
  };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const value = JSON.stringify(consent);
  document.cookie =
    `${CONSENT_COOKIE}=${encodeURIComponent(value)}` +
    `; Max-Age=${SIX_MONTHS_IN_SECONDS}; Path=/; SameSite=Lax${secure}`;
  cachedCookie = value;
  listeners.forEach((listener) => listener());
}

/**
 * État du consentement.
 * - `status: "unknown"` : rendu serveur / hydratation (rien à afficher).
 * - `status: "pending"` : aucun choix enregistré → afficher la bannière.
 * - `status: "decided"` : choix disponible dans `consent`.
 */
export function useConsent() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => undefined);

  return useMemo(() => {
    if (raw === undefined) return { status: "unknown" as const, consent: null };
    const consent = parseConsent(raw);
    return consent
      ? { status: "decided" as const, consent }
      : { status: "pending" as const, consent: null };
  }, [raw]);
}

/** Rouvre le panneau de préférences (lien « Gérer les cookies » du footer). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function onOpenCookieSettings(handler: () => void) {
  window.addEventListener(OPEN_SETTINGS_EVENT, handler);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handler);
}
