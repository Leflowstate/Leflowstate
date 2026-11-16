export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Les réponses sont aussi publiées en données structurées (FAQPage) :
 * gardez-les exactes et à jour — notamment tarifs et délais.
 */
export const faqItems: FaqItem[] = [
  {
    question: "Combien coûte une automatisation ?",
    answer:
      "Chaque projet est chiffré sur mesure, car le prix dépend du nombre d'outils à connecter et de la complexité du processus. Après une analyse gratuite de vos besoins, vous recevez une offre à prix fixe, sans surprise. La maintenance et le suivi font l'objet d'un forfait mensuel clair, résiliable.",
  },
  {
    question: "Combien de temps prend le déploiement ?",
    answer:
      "Une automatisation ciblée, comme la relance de factures ou la prise de rendez-vous, est généralement en production en deux à quatre semaines. Les projets plus complexes sont découpés en étapes, afin que vous profitiez d'un premier résultat concret rapidement.",
  },
  {
    question: "Les données sont-elles sécurisées ?",
    answer:
      "Oui. Les échanges sont chiffrés, les accès sont limités au strict nécessaire et nous ne collectons que les données utiles au fonctionnement de l'automatisation. Les traitements respectent la loi suisse sur la protection des données (LPD) et le RGPD, et un contrat de sous-traitance peut être signé sur demande.",
  },
  {
    question: "Utilisez-vous l'IA générative ?",
    answer:
      "Oui, lorsqu'elle apporte une réelle valeur : rédaction de brouillons, classification d'e-mails, extraction d'informations. Nous utilisons des modèles comme Claude ou ceux d'OpenAI via leurs offres professionnelles, dont les conditions prévoient que vos données ne servent pas à entraîner les modèles. Les actions sensibles restent soumises à une validation humaine.",
  },
  {
    question: "Puis-je conserver mes outils actuels ?",
    answer:
      "Absolument. Notre approche consiste à connecter les outils que vous utilisez déjà — Bexio, Gmail, Google Workspace, Microsoft 365, Airtable, Google Sheets et bien d'autres — plutôt qu'à vous imposer un nouveau logiciel. Vos équipes gardent leurs habitudes, les tâches répétitives en moins.",
  },
];
