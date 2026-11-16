import type { Metadata } from "next";

import { LegalArticle } from "@/components/layout/legal-article";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${siteConfig.name} : éditeur, contact, hébergement et propriété intellectuelle.`,
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  const { legal, contact } = siteConfig;

  return (
    <LegalArticle title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        <strong>{siteConfig.legalName}</strong> — {legal.legalForm}
        <br />
        Responsable de la publication : {legal.owner}
        <br />
        {legal.address}
        <br />
        Numéro d&apos;identification des entreprises (IDE) : {legal.ide}
      </p>

      <h2>Contact</h2>
      <p>
        E-mail : <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <br />
        Téléphone : <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
      </p>

      <h2>Hébergement</h2>
      <p>Le site est hébergé par {legal.hostingProvider}.</p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus de ce site (textes, éléments graphiques, logo, code) est la
        propriété de {siteConfig.legalName}, sauf mention contraire. Toute reproduction, même
        partielle, nécessite une autorisation écrite préalable.
      </p>
      <p>
        Les noms de produits et de services tiers cités sur ce site (n8n, Claude, OpenAI, Gmail,
        Google Workspace, Microsoft 365, Bexio, Airtable, Google Sheets, Calendly, etc.)
        appartiennent à leurs détenteurs respectifs. Leur mention indique une compatibilité
        technique et n&apos;implique aucun partenariat ni aucune affiliation.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les informations publiées sur ce site sont fournies à titre indicatif. Malgré le soin
        apporté à leur rédaction, {siteConfig.legalName} ne garantit ni leur exhaustivité ni leur
        actualité et décline toute responsabilité quant à l&apos;usage qui pourrait en être fait.
      </p>
      <p>
        Les cas d&apos;usage chiffrés et les témoignages présentés sur le site sont des exemples de
        démonstration : ils ne constituent ni une promesse de résultat ni un engagement
        contractuel.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Le présent site est soumis au droit suisse. Le for juridique est au siège de{" "}
        {siteConfig.legalName}, dans le canton du Valais, sous réserve des fors impératifs prévus
        par la loi.
      </p>
    </LegalArticle>
  );
}
