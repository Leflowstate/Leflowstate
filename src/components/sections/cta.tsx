import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CONTACT_HREF } from "@/content/navigation";

/** Bandeau d'appel à l'action intermédiaire. */
export function Cta() {
  return (
    <section aria-labelledby="cta-title" className="py-20 sm:py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="bg-grid absolute inset-0" />
          <div
            aria-hidden
            className="hero-glow absolute left-1/2 top-[-14rem] h-[28rem] w-[44rem] -translate-x-1/2"
          />
          <div aria-hidden className="edge-highlight absolute inset-x-16 top-0 h-px" />

          <div className="relative">
            <h2
              id="cta-title"
              className="text-gradient mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Et si vous récupériez plusieurs heures chaque semaine ?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              En 30 minutes, nous identifions ensemble les tâches que vous pouvez automatiser en
              priorité. C&apos;est gratuit et sans engagement.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={CONTACT_HREF} size="lg" className="w-full sm:w-auto">
                Réserver une démonstration
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
                  aria-hidden
                />
              </ButtonLink>
              <ButtonLink href="/#cas-usage" variant="secondary" size="lg" className="w-full sm:w-auto">
                Voir les cas d&apos;usage
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
