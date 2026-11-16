import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { CONTACT_HREF } from "@/content/navigation";
import { services } from "@/content/services";

export function Services() {
  return (
    <Section id="solutions">
      <SectionHeading
        sectionId="solutions"
        eyebrow="Solutions"
        title="Les tâches répétitives, enfin automatisées"
        description="Quatre domaines où l'automatisation rend du temps à vos équipes dès les premières semaines."
      />

      <ul className="mt-14 grid gap-5 md:grid-cols-2">
        {services.map((service, index) => (
          <Reveal as="li" key={service.id} delay={(index % 2) * 0.1}>
            <SpotlightCard className="h-full">
              <article className="flex h-full flex-col p-6 sm:p-8">
                <span className="flex size-11 items-center justify-center rounded-xl border border-white/80 bg-accent/10 text-accent-soft">
                  <service.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{service.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent-soft" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label="Outils et capacités">
                  {service.tags.map((tag) => (
                    <li key={tag}>
                      <Badge>{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </article>
            </SpotlightCard>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
        <p className="text-muted">Un autre processus vous fait perdre du temps ?</p>
        <ButtonLink href={CONTACT_HREF} variant="secondary">
          Parlons de votre besoin
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
            aria-hidden
          />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
