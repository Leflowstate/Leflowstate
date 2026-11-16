import { CalendarCheck, Mail, Receipt, Workflow, type LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  /** Outils ou capacités affichés sous forme de pastilles. */
  tags: string[];
};

export const services: Service[] = [
  {
    id: "relance-factures",
    icon: Receipt,
    title: "Relance automatique des factures",
    description:
      "Vos factures impayées sont détectées et relancées au bon moment, avec un message adapté à chaque client. Vous gardez la main sur les cas sensibles.",
    features: [
      "Détection des échéances dépassées",
      "Relances graduées et personnalisées par l'IA",
      "Tableau de suivi mis à jour en continu",
    ],
    tags: ["Bexio", "Google Sheets", "Gmail", "IA"],
  },
  {
    id: "gestion-emails",
    icon: Mail,
    title: "Gestion intelligente des e-mails",
    description:
      "Votre boîte de réception est triée, priorisée et pré-traitée. Les réponses sont préparées en brouillon : il ne vous reste qu'à relire et envoyer.",
    features: [
      "Classification automatique par type et urgence",
      "Réponses proposées dans votre ton",
      "Brouillons automatiques prêts à valider",
    ],
    tags: ["Classification", "Réponses proposées", "Brouillons automatiques"],
  },
  {
    id: "prise-rendez-vous",
    icon: CalendarCheck,
    title: "Prise de rendez-vous automatisée",
    description:
      "Vos clients réservent en autonomie, les confirmations et rappels partent seuls, et votre agenda reste synchronisé sur tous vos outils.",
    features: [
      "Réservation en ligne 24 h/24",
      "Confirmations et rappels automatiques",
      "Synchronisation bidirectionnelle des agendas",
    ],
    tags: ["Google Calendar", "Outlook", "Calendly"],
  },
  {
    id: "sur-mesure",
    icon: Workflow,
    title: "Automatisations sur mesure",
    description:
      "Un processus propre à votre métier ? Nous concevons le workflow qui relie vos outils et confie les tâches répétitives à un agent IA.",
    features: [
      "Workflows personnalisés de bout en bout",
      "Connexions API entre vos logiciels",
      "IA conversationnelle pour vos clients et équipes",
    ],
    tags: ["Workflows personnalisés", "Connexions API", "IA conversationnelle"],
  },
];

/** Outils avec lesquels nous travaillons (bandeau sous le hero). */
export const tools = [
  "n8n",
  "Claude",
  "OpenAI",
  "Gmail",
  "Google Workspace",
  "Microsoft 365",
  "Bexio",
  "Airtable",
  "Google Sheets",
] as const;
