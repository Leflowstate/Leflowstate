import {
  Building2,
  Calculator,
  Car,
  HardHat,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export type UseCase = {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  context: string;
  automations: string[];
  metrics: {
    timeSaved: { value: string; unit: string };
    tasks: { value: string; unit: string };
    roi: { value: string; unit: string };
  };
};

/**
 * Scénarios illustratifs. Les chiffres sont des ordres de grandeur estimés,
 * pas des résultats clients : remplacez-les par vos études de cas réelles
 * dès que vous en disposez.
 */
export const useCases: UseCase[] = [
  {
    id: "fiduciaire",
    icon: Calculator,
    label: "Fiduciaire",
    title: "Moins de relances manuelles, des dossiers complets à temps",
    context:
      "Une fiduciaire de 6 collaborateurs perd des heures à réclamer les pièces comptables et à relancer les factures de ses mandats.",
    automations: [
      "Collecte automatique des pièces justificatives auprès des clients",
      "Relance des factures ouvertes depuis Bexio",
      "Tri des e-mails entrants par mandat et par urgence",
      "Rappels d'échéances TVA et bouclements",
    ],
    metrics: {
      timeSaved: { value: "12 h", unit: "par semaine" },
      tasks: { value: "480", unit: "par mois" },
      roi: { value: "3 mois", unit: "pour rentabiliser" },
    },
  },
  {
    id: "garage",
    icon: Car,
    label: "Garage automobile",
    title: "Un atelier plein, sans passer la journée au téléphone",
    context:
      "Un garage indépendant gère les rendez-vous par téléphone et oublie régulièrement de rappeler les clients pour le service ou l'expertise.",
    automations: [
      "Prise de rendez-vous en ligne synchronisée avec l'atelier",
      "Rappels SMS et e-mail avant chaque rendez-vous",
      "Relance automatique pour le service annuel et les pneus",
      "Envoi du devis et suivi d'acceptation",
    ],
    metrics: {
      timeSaved: { value: "8 h", unit: "par semaine" },
      tasks: { value: "320", unit: "par mois" },
      roi: { value: "4 mois", unit: "pour rentabiliser" },
    },
  },
  {
    id: "immobilier",
    icon: Building2,
    label: "Courtier immobilier",
    title: "Chaque demande reçoit une réponse en quelques minutes",
    context:
      "Un courtier reçoit des dizaines de demandes par portail et par e-mail. Les prospects les plus sérieux attendent parfois plusieurs jours.",
    automations: [
      "Qualification automatique des demandes entrantes",
      "Réponse personnalisée avec dossier du bien",
      "Planification des visites selon les disponibilités",
      "Suivi des prospects dans Airtable",
    ],
    metrics: {
      timeSaved: { value: "10 h", unit: "par semaine" },
      tasks: { value: "250", unit: "par mois" },
      roi: { value: "2 mois", unit: "pour rentabiliser" },
    },
  },
  {
    id: "cabinet-medical",
    icon: Stethoscope,
    label: "Cabinet médical",
    title: "Un secrétariat soulagé, des patients mieux informés",
    context:
      "Le secrétariat d'un cabinet de groupe est saturé par les appels de prise de rendez-vous, les rappels et les demandes administratives.",
    automations: [
      "Prise et déplacement de rendez-vous en ligne",
      "Rappels automatiques pour limiter les absences",
      "Tri des demandes administratives entrantes",
      "Aucune donnée médicale confiée à l'IA",
    ],
    metrics: {
      timeSaved: { value: "15 h", unit: "par semaine" },
      tasks: { value: "600", unit: "par mois" },
      roi: { value: "3 mois", unit: "pour rentabiliser" },
    },
  },
  {
    id: "construction",
    icon: HardHat,
    label: "Entreprise de construction",
    title: "Des devis envoyés plus vite, des chantiers mieux suivis",
    context:
      "Une PME du bâtiment jongle entre demandes de devis, rapports de chantier et factures fournisseurs, souvent traités le soir.",
    automations: [
      "Pré-rédaction des devis à partir des demandes reçues",
      "Rapports de chantier générés depuis les notes terrain",
      "Saisie et classement des factures fournisseurs",
      "Relance des devis sans réponse",
    ],
    metrics: {
      timeSaved: { value: "9 h", unit: "par semaine" },
      tasks: { value: "180", unit: "par mois" },
      roi: { value: "5 mois", unit: "pour rentabiliser" },
    },
  },
];
