import type { Metadata } from "next";

import { LegalArticle } from "@/components/layout/legal-article";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Comment ${siteConfig.name} collecte, utilise et protège vos données personnelles, conformément à la LPD suisse et au RGPD.`,
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default function PolitiqueConfidentialitePage() {
  const { legal, contact } = siteConfig;

  return (
    <LegalArticle title="Politique de confidentialité">
      <p>
        La protection de vos données personnelles nous tient à cœur. Cette politique explique
        quelles données nous traitons lorsque vous utilisez ce site, pourquoi, et quels sont vos
        droits. Elle s&apos;appuie sur la loi fédérale suisse sur la protection des données (LPD)
        et, lorsqu&apos;il s&apos;applique, sur le Règlement général sur la protection des données
        de l&apos;Union européenne (RGPD).
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        <strong>{siteConfig.legalName}</strong>, {legal.address}
        <br />
        Contact pour toute question relative à vos données :{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>

      <h2>2. Données que nous traitons</h2>
      <ul>
        <li>
          <strong>Formulaire de contact</strong> : nom, adresse e-mail, description de votre
          besoin, et, si vous les indiquez, numéro de téléphone et nom de votre société.
        </li>
        <li>
          <strong>Données techniques</strong> : adresse IP, date et heure de la requête, type de
          navigateur. Elles sont traitées par notre hébergeur pour assurer la sécurité et le bon
          fonctionnement du site, et brièvement par notre système de protection contre les envois
          abusifs.
        </li>
        <li>
          <strong>Préférences de cookies</strong> : votre choix est enregistré dans un cookie sur
          votre appareil.
        </li>
      </ul>
      <p>Nous ne collectons aucune donnée sensible et n&apos;effectuons aucun profilage.</p>

      <h2>3. Finalités et bases juridiques</h2>
      <ul>
        <li>
          <strong>Répondre à votre demande</strong> et vous proposer une démonstration : votre
          consentement et l&apos;exécution de mesures précontractuelles.
        </li>
        <li>
          <strong>Assurer la sécurité du site</strong> (prévention du spam et des abus) : notre
          intérêt légitime.
        </li>
        <li>
          <strong>Mesurer l&apos;audience</strong> de manière anonyme : uniquement avec votre
          consentement.
        </li>
      </ul>

      <h2>4. Destinataires et sous-traitants</h2>
      <p>
        Vos données ne sont ni vendues ni louées. Elles sont accessibles uniquement aux personnes
        qui en ont besoin pour traiter votre demande, ainsi qu&apos;à nos prestataires techniques,
        liés par contrat :
      </p>
      <ul>
        <li>l&apos;hébergeur du site : {legal.hostingProvider} ;</li>
        <li>le service d&apos;envoi d&apos;e-mails qui nous transmet les demandes du formulaire.</li>
      </ul>

      <h2>5. Transferts à l&apos;étranger</h2>
      <p>
        Certains prestataires peuvent traiter des données hors de Suisse et de l&apos;Espace
        économique européen, notamment aux États-Unis. Ces transferts sont encadrés par des
        garanties reconnues : cadre de protection des données Suisse–États-Unis lorsque le
        prestataire est certifié, ou clauses contractuelles types.
      </p>

      <h2>6. Durée de conservation</h2>
      <ul>
        <li>
          Demandes de contact : pendant la durée des échanges, puis 24 mois au maximum sans suite
          commerciale.
        </li>
        <li>Journaux techniques : selon la politique de l&apos;hébergeur, pour une durée limitée.</li>
        <li>Préférences de cookies : 6 mois.</li>
      </ul>

      <h2>7. Cookies</h2>
      <p>
        Le site fonctionne avec les seuls cookies strictement nécessaires : la mémorisation de
        votre choix en matière de cookies. Aucun cookie publicitaire n&apos;est utilisé. Une
        mesure d&apos;audience n&apos;est activée que si vous l&apos;acceptez, et vous pouvez
        modifier votre choix à tout moment via le lien « Gérer les cookies » en bas de page.
      </p>

      <h2>8. Sécurité</h2>
      <p>
        Nous appliquons des mesures techniques et organisationnelles adaptées : chiffrement des
        échanges (HTTPS), politique de sécurité du contenu, validation et filtrage des données
        saisies, limitation des envois automatisés et accès restreints aux données.
      </p>

      <h2>9. Vos droits</h2>
      <p>
        Vous pouvez à tout moment demander l&apos;accès à vos données, leur rectification, leur
        effacement, la limitation de leur traitement ou leur remise dans un format courant, vous
        opposer à un traitement et retirer votre consentement. Écrivez-nous à{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> : nous répondons dans un délai de
        30 jours.
      </p>
      <p>
        Vous pouvez également vous adresser au Préposé fédéral à la protection des données et à
        la transparence (PFPDT) ou, si vous résidez dans l&apos;Union européenne, à l&apos;autorité
        de protection des données de votre pays.
      </p>

      <h2>10. Modifications</h2>
      <p>
        Cette politique peut évoluer, notamment en cas de changement légal ou d&apos;ajout de
        fonctionnalités. La date de dernière mise à jour figure en haut de cette page.
      </p>
    </LegalArticle>
  );
}
