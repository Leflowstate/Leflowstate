import { siteConfig } from "@/config/site";
import { faqItems } from "@/content/faq";
import { services } from "@/content/services";
import { serializeJsonLd } from "@/lib/security/sanitize";

/**
 * Balise JSON-LD. `application/ld+json` est un bloc de données : le
 * navigateur ne l'exécute pas, il n'est donc pas soumis à la CSP et n'a pas
 * besoin de nonce. Le contenu est sérialisé avec échappement de `<` ; c'est
 * le seul usage de `dangerouslySetInnerHTML` du projet, et il ne reçoit
 * jamais de saisie utilisateur.
 */
function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/** Données structurées de l'entreprise (toutes les pages). */
export function OrganizationJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter((url) => url.length > 0);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#organisation`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        description: siteConfig.description,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phoneHref,
        image: `${siteConfig.url}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          addressRegion: siteConfig.contact.region,
          addressCountry: siteConfig.contact.countryCode,
        },
        areaServed: [
          { "@type": "Country", name: "Suisse" },
          { "@type": "AdministrativeArea", name: "Valais" },
        ],
        knowsAbout: [
          "Automatisation des processus",
          "Agents IA",
          "Intelligence artificielle générative",
          "n8n",
          "Intégration d'API",
        ],
        ...(sameAs.length > 0 ? { sameAs } : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Solutions d'automatisation",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#site`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: siteConfig.lang,
        publisher: { "@id": `${siteConfig.url}/#organisation` },
      },
    ],
  };

  return <JsonLd data={data} />;
}

/** Données structurées de la FAQ (page d'accueil). */
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return <JsonLd data={data} />;
}
