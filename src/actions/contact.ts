"use server";

import { headers } from "next/headers";

import { siteConfig } from "@/config/site";
import { sendContactEmail } from "@/lib/email";
import { verifyFormToken } from "@/lib/security/form-token";
import { rateLimit } from "@/lib/security/rate-limit";
import {
  HONEYPOT_FIELD,
  TOKEN_FIELD,
  parseContactForm,
  type ContactFormState,
} from "@/lib/validation/contact";

const SUCCESS: ContactFormState = {
  status: "success",
  message:
    "Merci, votre demande est bien arrivée. Nous vous répondons sous 24 heures ouvrées.",
};

const fallbackMessage = `Vous pouvez aussi nous écrire directement à ${siteConfig.contact.email}.`;

/** L'origine de la requête doit correspondre à l'hôte servi (anti-CSRF). */
function isSameOrigin(requestHeaders: Headers): boolean {
  const origin = requestHeaders.get("origin");
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function getClientIp(requestHeaders: Headers): string {
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Traite l'envoi du formulaire de contact.
 *
 * Défenses, dans l'ordre : contrôle d'origine → limitation de débit →
 * champ piège (honeypot) → jeton signé + piège temporel → sanitisation et
 * validation Zod → envoi. Les Server Actions n'acceptent que POST et
 * vérifient déjà Origin/Host ; le contrôle explicite est une défense
 * en profondeur.
 */
export async function submitContact(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const requestHeaders = await headers();

  if (!isSameOrigin(requestHeaders)) {
    return { status: "error", message: "Requête refusée. Rechargez la page et réessayez." };
  }

  const limit = rateLimit(`contact:${getClientIp(requestHeaders)}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.allowed) {
    const minutes = Math.ceil(limit.retryAfter / 60);
    return {
      status: "error",
      message: `Trop de tentatives. Réessayez dans ${minutes} minute${minutes > 1 ? "s" : ""}. ${fallbackMessage}`,
    };
  }

  // Robot détecté : on simule un succès pour ne donner aucun indice.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.length > 0) return SUCCESS;

  const tokenStatus = verifyFormToken(formData.get(TOKEN_FIELD));
  if (tokenStatus === "too-fast") return SUCCESS;
  if (tokenStatus !== "valid") {
    return {
      status: "error",
      message: "Votre session a expiré. Rechargez la page, puis envoyez à nouveau le formulaire.",
    };
  }

  const parsed = parseContactForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs sont à corriger avant l'envoi.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const delivery = await sendContactEmail(parsed.data);
  if (!delivery.ok) {
    return {
      status: "error",
      message: `L'envoi n'a pas abouti de notre côté. Réessayez dans un instant. ${fallbackMessage}`,
    };
  }

  return SUCCESS;
}
