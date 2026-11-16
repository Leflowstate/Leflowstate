import type { Metadata } from "next";
import Link from "next/link";

import { LegalArticle } from "@/components/layout/legal-article";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: `Conditions d'utilisation du site ${siteConfig.name}.`,
  alternates: { canonical: "/conditions-utilisation" },
};

export default function ConditionsUtilisationPage() {
  return (
    <LegalArticle title="Conditions d'utilisation">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent l&apos;utilisation du site de {siteConfig.legalName}.
        En naviguant sur le site, vous les acceptez sans réserve. Elles ne régissent pas les
        prestations d&apos;automatisation, qui font l&apos;objet d&apos;une offre et d&apos;un
        contrat distincts.
      </p>

      <h2>2. Accès au site</h2>
      <p>
        Le site est accessible gratuitement. Nous nous efforçons d&apos;en assurer la
        disponibilité, sans pouvoir la garantir : l&apos;accès peut être interrompu pour
        maintenance ou pour des raisons indépendantes de notre volonté.
      </p>

      <h2>3. Utilisation autorisée</h2>
      <p>Vous vous engagez à utiliser le site de bonne foi et, en particulier, à ne pas :</p>
      <ul>
        <li>tenter de contourner ses mesures de sécurité ou d&apos;en perturber le fonctionnement ;</li>
        <li>utiliser le formulaire de contact pour des envois automatisés ou non sollicités ;</li>
        <li>extraire ou réutiliser massivement ses contenus sans autorisation.</li>
      </ul>

      <h2>4. Contenus et informations</h2>
      <p>
        Les contenus du site ont une vocation informative. Les cas d&apos;usage, les chiffres
        associés et les témoignages signalés comme « exemples de démonstration » sont
        illustratifs : ils ne constituent ni une offre ferme ni une garantie de résultat. Seule
        une offre écrite engage {siteConfig.legalName}.
      </p>

      <h2>5. Propriété intellectuelle</h2>
      <p>
        Les textes, éléments graphiques, logo et code du site sont protégés par le droit
        d&apos;auteur. Toute reproduction ou réutilisation sans accord écrit préalable est
        interdite. Les marques de tiers citées restent la propriété de leurs détenteurs.
      </p>

      <h2>6. Liens externes</h2>
      <p>
        Le site peut contenir des liens vers des sites tiers. Nous n&apos;exerçons aucun contrôle
        sur leur contenu et déclinons toute responsabilité à leur égard.
      </p>

      <h2>7. Limitation de responsabilité</h2>
      <p>
        Dans les limites autorisées par la loi, {siteConfig.legalName} ne saurait être tenu
        responsable des dommages directs ou indirects résultant de l&apos;utilisation du site ou
        de l&apos;impossibilité d&apos;y accéder.
      </p>

      <h2>8. Données personnelles</h2>
      <p>
        Le traitement de vos données est décrit dans notre{" "}
        <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>

      <h2>9. Droit applicable et for</h2>
      <p>
        Les présentes conditions sont soumises au droit suisse. Le for est au siège de{" "}
        {siteConfig.legalName}, dans le canton du Valais, sous réserve des fors impératifs prévus
        par la loi.
      </p>

      <h2>10. Contact</h2>
      <p>
        Pour toute question :{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
      </p>
    </LegalArticle>
  );
}
