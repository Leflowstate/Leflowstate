/**
 * Configuration centrale du site.
 *
 * ➜ Tout ce qui identifie votre entreprise (nom, coordonnées, réseaux
 *   sociaux, informations légales) se modifie ICI et nulle part ailleurs.
 */

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const siteConfig = {
  /** Nom commercial. */
  name: "Leflowstate",
  legalName: "Leflowstate",
  url: siteUrl,
  locale: "fr_CH",
  lang: "fr-CH",

  title: "Automatisation & agents IA pour PME en Suisse",
  description:
    "Agence d'automatisation et d'agents IA basée en Valais. Nous créons des solutions sur mesure qui réduisent les tâches administratives des PME : relance de factures, gestion des e-mails, prise de rendez-vous et workflows personnalisés.",
  keywords: [
    "automatisation PME",
    "agents IA",
    "agence IA Suisse",
    "automatisation Valais",
    "n8n",
    "relance factures Bexio",
    "automatisation e-mails",
    "intelligence artificielle PME",
    "workflow automation",
  ],

  contact: {
    email: "elouan.guerin@icloud.com",
    phone: "+41 77 269 08 60",
    /** Version sans espaces pour les liens `tel:`. */
    phoneHref: "+41772690860",
    region: "Valais",
    country: "Suisse",
    countryCode: "CH",
  },

  /** Informations légales affichées dans les mentions légales. */
  legal: {
    owner: "[Prénom Nom]",
    legalForm: "[Raison individuelle / Sàrl]",
    address: "[Rue et numéro], [NPA] [Localité], Valais, Suisse",
    ide: "CHE-000.000.000",
    hostingProvider: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    lastUpdated: "2026-11-16",
  },

  /** Lien de réservation direct (Calendly, Cal.com…). Vide = formulaire. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",

  /** Laisser une chaîne vide pour masquer un réseau. */
  social: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    x: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
