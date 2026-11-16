import "server-only";

import { siteConfig } from "@/config/site";
import { escapeHtml } from "@/lib/security/sanitize";
import type { ContactInput } from "@/lib/validation/contact";

type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

/**
 * Transmet une demande de contact par e-mail via l'API Resend.
 * Aucune dépendance : un simple appel HTTPS, facile à remplacer par un autre
 * fournisseur (Postmark, Brevo, Infomaniak…) ou par un webhook n8n.
 */
export async function sendContactEmail(lead: ContactInput): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      // En développement, on affiche la demande au lieu de l'envoyer.
      console.info("[contact] E-mail non configuré — demande reçue :", lead);
      return { ok: true };
    }
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL ou CONTACT_FROM_EMAIL manquant.");
    return { ok: false, reason: "not-configured" };
  }

  const rows: Array<[string, string]> = [
    ["Nom", lead.name],
    ["E-mail", lead.email],
    ["Téléphone", lead.phone || "—"],
    ["Société", lead.company || "—"],
  ];

  const text = [
    `Nouvelle demande de démonstration — ${siteConfig.name}`,
    "",
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    "Besoin :",
    lead.message,
  ].join("\n");

  const html = `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:24px;background:#f4f4f5;font-family:Helvetica,Arial,sans-serif;color:#18181b;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;">
      <tr><td>
        <h1 style="font-size:18px;margin:0 0 16px;">Nouvelle demande de démonstration</h1>
        <table role="presentation" width="100%" style="font-size:14px;line-height:1.6;">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="color:#71717a;width:110px;vertical-align:top;">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`,
            )
            .join("")}
        </table>
        <h2 style="font-size:14px;margin:20px 0 8px;color:#71717a;font-weight:normal;">Besoin</h2>
        <p style="font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${escapeHtml(lead.message)}</p>
      </td></tr>
    </table>
  </body>
</html>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `Demande de démonstration — ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      // On journalise le statut, jamais le contenu de la demande.
      console.error(`[contact] Échec de l'envoi (HTTP ${response.status}).`);
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[contact] Erreur réseau lors de l'envoi :", (error as Error).name);
    return { ok: false, reason: "provider-error" };
  }
}
