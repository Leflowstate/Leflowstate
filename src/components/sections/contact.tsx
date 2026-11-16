import { CalendarCheck, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createFormToken } from "@/lib/security/form-token";

const nextSteps = [
  {
    title: "Réponse sous 24 heures ouvrées",
    description: "Nous revenons vers vous pour convenir d'un créneau.",
  },
  {
    title: "Démonstration de 30 minutes",
    description: "En visio ou sur place : vos processus, nos pistes d'automatisation.",
  },
  {
    title: "Proposition chiffrée",
    description: "Une offre claire à prix fixe, sans engagement de votre part.",
  },
];

export function Contact() {
  // Jeton signé, propre à chaque affichage de la page (voir form-token.ts).
  const token = createFormToken();

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            sectionId="contact"
            align="left"
            eyebrow="Contact"
            title="Réservez votre démonstration"
            description="Décrivez-nous votre besoin en quelques lignes. Nous vous montrons, sur un cas concret, ce que l'automatisation peut faire pour votre entreprise."
          />

          <Reveal delay={0.05}>
            <ol className="mt-10 space-y-6">
              {nextSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-accent-soft"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="mt-10 space-y-3 border-t border-line pt-8 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-3 text-muted transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 text-subtle" aria-hidden />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="inline-flex items-center gap-3 text-muted transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 text-subtle" aria-hidden />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <MapPin className="size-4 text-subtle" aria-hidden />
                {siteConfig.contact.region}, {siteConfig.contact.country}
              </li>
            </ul>

            {siteConfig.bookingUrl ? (
              <div className="mt-8">
                <p className="text-sm text-muted">Vous préférez choisir directement un créneau ?</p>
                <ButtonLink href={siteConfig.bookingUrl} variant="secondary" className="mt-3">
                  <CalendarCheck className="size-4" aria-hidden />
                  Prendre rendez-vous en ligne
                </ButtonLink>
              </div>
            ) : null}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="glass glass-strong relative rounded-3xl p-6 sm:p-9">
            <div aria-hidden className="edge-highlight absolute inset-x-12 top-0 h-px" />
            <ContactForm token={token} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
