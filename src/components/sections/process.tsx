import { DrawLine } from "@/components/motion/draw-line";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { processSteps } from "@/content/process";

export function Process() {
  return (
    <Section id="methode" className="border-y border-white/60 bg-white/30">
      <SectionHeading
        sectionId="methode"
        eyebrow="Comment ça fonctionne"
        title="De l'analyse à la mise en production, en quatre étapes"
        description="Une méthode claire, des points de validation à chaque étape et un seul interlocuteur du début à la fin."
      />

      <div className="relative mt-16">
        {/* Ligne de progression (grand écran) */}
        <DrawLine className="absolute inset-x-0 top-5 hidden h-px origin-left bg-linear-to-r from-accent via-line-strong to-line lg:block" />

        <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 0.12}
              className="relative flex gap-5 lg:block"
            >
              {/* Ligne verticale reliant les étapes (mobile et tablette) */}
              {index < processSteps.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute -bottom-10 left-5 top-10 w-px bg-linear-to-b from-line-strong to-line lg:hidden"
                />
              ) : null}

              <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-white bg-white font-mono text-sm text-accent-soft shadow-[0_6px_16px_-8px_rgb(60_50_150/0.45)]">
                <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="lg:mt-7">
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-subtle">
                  <step.icon className="size-3.5" aria-hidden />
                  Étape {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.description}</p>
                <p className="mt-4 inline-flex rounded-full border border-white/80 bg-white/60 px-3 py-1 text-xs text-muted">
                  {step.deliverable}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
