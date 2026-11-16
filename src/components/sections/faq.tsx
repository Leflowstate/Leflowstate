import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { faqItems } from "@/content/faq";
import { CONTACT_HREF } from "@/content/navigation";

export function Faq() {
  return (
    <Section id="faq" className="border-t border-line bg-surface/40">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            sectionId="faq"
            align="left"
            eyebrow="FAQ"
            title="Questions fréquentes"
            description="Les réponses aux questions que l'on nous pose le plus souvent avant de démarrer."
          />
          <Reveal className="mt-8">
            <p className="text-sm text-muted">Vous ne trouvez pas votre réponse ?</p>
            <ButtonLink href={CONTACT_HREF} variant="secondary" className="mt-4">
              Posez-nous votre question
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
                aria-hidden
              />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <FaqAccordion items={faqItems} />
        </Reveal>
      </div>
    </Section>
  );
}
