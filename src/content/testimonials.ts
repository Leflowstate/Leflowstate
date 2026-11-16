export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

/**
 * ⚠️ Témoignages FICTIFS servant d'exemples de mise en page.
 * Ils sont affichés avec la mention « Exemple de démonstration ».
 * Remplacez-les par de vrais retours clients (avec leur accord écrit),
 * puis passez `TESTIMONIALS_ARE_DEMO` à `false`.
 */
export const TESTIMONIALS_ARE_DEMO = true;

export const testimonials: Testimonial[] = [
  {
    quote:
      "Les relances de factures partent toutes seules et le ton reste le nôtre. Nous avons récupéré une demi-journée par semaine dès le premier mois.",
    name: "Claire M.",
    role: "Associée",
    company: "Fiduciaire, Sion",
  },
  {
    quote:
      "Je ne décroche plus le téléphone entre deux véhicules. Les clients réservent en ligne et reçoivent leur rappel la veille.",
    name: "Julien R.",
    role: "Gérant",
    company: "Garage automobile, Martigny",
  },
  {
    quote:
      "Chaque demande de visite reçoit une réponse dans les minutes qui suivent, même le week-end. Nos prospects le remarquent.",
    name: "Sophie D.",
    role: "Courtière",
    company: "Agence immobilière, Sierre",
  },
];
