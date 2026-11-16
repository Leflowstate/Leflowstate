import {
  BrainCircuit,
  Puzzle,
  Server,
  ShieldCheck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Advantage = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const advantages: Advantage[] = [
  {
    icon: Puzzle,
    title: "Solutions sur mesure",
    description:
      "Pas de produit générique : chaque automatisation est conçue autour de vos processus, de vos outils et de votre vocabulaire métier.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité",
    description:
      "Accès limités au strict nécessaire, données chiffrées en transit et traitement conforme à la LPD suisse et au RGPD.",
  },
  {
    icon: Server,
    title: "Hébergement fiable",
    description:
      "Vos workflows tournent sur une infrastructure surveillée en continu, avec sauvegardes et alertes en cas d'anomalie.",
  },
  {
    icon: Wrench,
    title: "Maintenance continue",
    description:
      "Les outils évoluent, vos automatisations aussi. Nous assurons les mises à jour et les ajustements dans la durée.",
  },
  {
    icon: BrainCircuit,
    title: "Expertise IA",
    description:
      "Nous choisissons le bon modèle pour chaque tâche et l'encadrons par des règles claires et une validation humaine.",
  },
  {
    icon: Zap,
    title: "Support rapide",
    description:
      "Un interlocuteur unique, basé en Valais, qui connaît votre installation et répond rapidement en cas de besoin.",
  },
];
