import { ArrowRight, Check } from "lucide-react";

import { WorkflowVisual } from "@/components/hero/workflow-visual";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { CONTACT_HREF } from "@/content/navigation";

const reassurances = ["Analyse gratuite", "Sans engagement", "Conforme LPD & RGPD"];

/**
 * Les animations d'entrée du hero sont en CSS pur : elles démarrent dès le
 * premier rendu, sans attendre l'hydratation de React. Le titre utilise
 * `animate-focus-in` (jamais invisible) pour préserver le LCP.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pt-44"
    >
      {/* Taches de couleur organiques, en dérive lente. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="mesh-blob mesh-blob-blue left-[-12%] top-[-18%] size-[34rem] animate-drift-a sm:size-[46rem]" />
        <div className="mesh-blob mesh-blob-violet right-[-14%] top-[2%] size-[30rem] animate-drift-b sm:size-[42rem]" />
        <div className="mesh-blob mesh-blob-peach bottom-[4%] left-[22%] size-[26rem] animate-drift-b sm:size-[38rem]" />
      </div>

      <Container className="text-center">
        <p className="inline-flex animate-rise items-center gap-2 rounded-full border border-white/80 bg-white/55 px-3.5 py-1.5 text-xs text-muted shadow-[0_6px_20px_-10px_rgb(60_50_150/0.35)] backdrop-blur-md sm:text-sm">
          <span className="relative flex size-1.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          Agence d&apos;automatisation IA · {siteConfig.contact.region}, {siteConfig.contact.country}
        </p>

        <h1
          id="hero-title"
          className="text-gradient mx-auto mt-7 max-w-4xl animate-focus-in text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]"
        >
          Automatisez votre entreprise grâce à l&apos;intelligence artificielle.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-rise text-base leading-relaxed text-muted [animation-delay:180ms] sm:text-lg">
          Nous créons des solutions d&apos;automatisation sur mesure qui réduisent les tâches
          administratives et font gagner un temps précieux à votre entreprise.
        </p>

        <div className="mt-9 flex animate-rise flex-col items-center justify-center gap-3 [animation-delay:280ms] sm:flex-row">
          <ButtonLink href={CONTACT_HREF} size="lg" className="h-14 w-full px-8 text-base sm:w-auto">
            Réserver une démonstration
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
              aria-hidden
            />
          </ButtonLink>
          <ButtonLink href="/#solutions" variant="secondary" size="lg" className="w-full sm:w-auto">
            Découvrir nos solutions
          </ButtonLink>
        </div>

        <ul className="mt-8 flex animate-rise flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-subtle [animation-delay:380ms]">
          {reassurances.map((item) => (
            <li key={item} className="inline-flex items-center gap-2">
              <Check className="size-4 text-accent-soft" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <WorkflowVisual className="mt-16 animate-rise-soft [animation-delay:480ms] sm:mt-20" />
      </Container>
    </section>
  );
}
