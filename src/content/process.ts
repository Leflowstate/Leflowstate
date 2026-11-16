import { LineChart, Rocket, Search, Wrench, type LucideIcon } from "lucide-react";

export type ProcessStep = {
  icon: LucideIcon;
  title: string;
  description: string;
  deliverable: string;
};

export const processSteps: ProcessStep[] = [
  {
    icon: Search,
    title: "Analyse de vos processus",
    description:
      "Nous cartographions vos tâches récurrentes avec vous et identifions celles qui offrent le meilleur gain de temps.",
    deliverable: "Plan d'automatisation priorisé",
  },
  {
    icon: Wrench,
    title: "Création de l'automatisation",
    description:
      "Nous concevons le workflow, connectons vos outils et configurons l'IA selon vos règles métier et votre ton.",
    deliverable: "Workflow fonctionnel sur vos outils",
  },
  {
    icon: Rocket,
    title: "Déploiement et tests",
    description:
      "Mise en service progressive, tests sur des cas réels et formation de votre équipe avant le passage en production.",
    deliverable: "Mise en production validée ensemble",
  },
  {
    icon: LineChart,
    title: "Suivi et optimisation continue",
    description:
      "Nous surveillons les exécutions, corrigeons les anomalies et faisons évoluer la solution avec votre activité.",
    deliverable: "Rapport de suivi et améliorations",
  },
];
