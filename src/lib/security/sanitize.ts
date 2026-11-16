/**
 * Sanitisation des entrées utilisateur.
 *
 * Principe : on nettoie à l'entrée (caractères de contrôle, espaces,
 * longueur) et on échappe à la sortie (`escapeHtml`) selon le contexte.
 * React échappe déjà tout ce qui est rendu dans le DOM ; `escapeHtml`
 * sert pour les contextes hors React, comme le corps HTML d'un e-mail.
 */

// Caractères de contrôle C0/C1 et séparateurs invisibles (zero-width, bidi).
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;
const INVISIBLE_CHARS = /[​-‏‪-‮⁠-⁤﻿]/g;

/** Nettoie un champ sur une seule ligne (nom, société, téléphone…). */
export function sanitizeLine(input: unknown, maxLength = 200): string {
  if (typeof input !== "string") return "";
  return input
    .normalize("NFKC")
    .replace(CONTROL_CHARS, " ")
    .replace(INVISIBLE_CHARS, "")
    .replace(/[\r\n\t]+/g, " ") // empêche l'injection d'en-têtes e-mail
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, maxLength);
}

/** Nettoie un champ multiligne (message) en conservant les retours à la ligne. */
export function sanitizeMultiline(input: unknown, maxLength = 5000): string {
  if (typeof input !== "string") return "";
  return input
    .normalize("NFKC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS, "")
    .replace(INVISIBLE_CHARS, "")
    .replace(/[^\S\n]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Échappe une chaîne pour une insertion sûre dans du HTML. */
export function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);
}

/**
 * Sérialise des données JSON-LD pour une balise <script>.
 * L'échappement de `<` empêche de fermer la balise depuis une valeur.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
