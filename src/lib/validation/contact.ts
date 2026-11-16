import { z } from "zod";

import { sanitizeLine, sanitizeMultiline } from "@/lib/security/sanitize";

/**
 * Schéma de validation du formulaire de contact.
 * Partagé entre le client (retour immédiat) et le serveur (source de vérité).
 */

// Zod optimise ses schémas avec `new Function`, ce que notre CSP interdit
// (pas de `unsafe-eval`). Le mode « jitless » désactive cette optimisation.
z.config({ jitless: true });

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  phone: { max: 20 },
  company: { max: 120 },
  message: { min: 20, max: 2000 },
} as const;

/**
 * Nom du champ piège : invisible pour les humains, rempli par les robots.
 * Le nom est volontairement neutre pour que le remplissage automatique des
 * navigateurs ne le complète jamais (ce qui écarterait de vrais prospects).
 */
export const HONEYPOT_FIELD = "reference_code";
export const TOKEN_FIELD = "formToken";

const PHONE_PATTERN = /^\+?[\d\s().\-/]{7,20}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .min(CONTACT_LIMITS.name.min, "Indiquez votre nom (2 caractères au minimum).")
    .max(CONTACT_LIMITS.name.max, "Ce nom est trop long (80 caractères au maximum)."),
  email: z
    .string()
    .min(1, "Indiquez votre adresse e-mail.")
    .max(CONTACT_LIMITS.email.max, "Cette adresse e-mail est trop longue.")
    .pipe(z.email("Cette adresse e-mail ne semble pas valide (ex. nom@entreprise.ch).")),
  phone: z
    .string()
    .max(CONTACT_LIMITS.phone.max, "Ce numéro est trop long.")
    .refine(
      (value) => value === "" || (PHONE_PATTERN.test(value) && value.replace(/\D/g, "").length >= 7),
      "Ce numéro ne semble pas valide (ex. +41 79 123 45 67).",
    ),
  company: z
    .string()
    .max(CONTACT_LIMITS.company.max, "Ce nom de société est trop long (120 caractères au maximum)."),
  message: z
    .string()
    .min(
      CONTACT_LIMITS.message.min,
      "Décrivez votre besoin en quelques mots (20 caractères au minimum).",
    )
    .max(
      CONTACT_LIMITS.message.max,
      "Votre message est trop long (2000 caractères au maximum).",
    ),
  consent: z.literal(true, "Votre accord est nécessaire pour que nous puissions vous répondre."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: ContactFieldErrors;
};

export const initialContactState: ContactFormState = { status: "idle" };

type ParseResult =
  | { success: true; data: ContactInput }
  | { success: false; fieldErrors: ContactFieldErrors };

/** Nettoie puis valide les données brutes d'un FormData. */
export function parseContactForm(formData: FormData): ParseResult {
  const candidate = {
    name: sanitizeLine(formData.get("name"), 200),
    email: sanitizeLine(formData.get("email"), 320).toLowerCase(),
    phone: sanitizeLine(formData.get("phone"), 40),
    company: sanitizeLine(formData.get("company"), 200),
    message: sanitizeMultiline(formData.get("message"), 5000),
    consent: formData.get("consent") === "on",
  };

  const result = contactSchema.safeParse(candidate);
  if (result.success) return { success: true, data: result.data };

  const fieldErrors: ContactFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
  }
  return { success: false, fieldErrors };
}
