import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { advantages } from "@/content/advantages";

export function WhyUs() {
  return (
    <Section id="avantages" className="border-y border-line bg-surface/40">
      <SectionHeading
        sectionId="avantages"
        eyebrow="Pourquoi nous choisir"
        title="Un partenaire de proximité, une exigence d'ingénieur"
        description="Nous construisons des automatisations sur lesquelles vous pouvez compter au quotidien — et nous restons à vos côtés après la mise en service."
      />

      {/* Grille à filets partagés : l'espacement de 1 px laisse voir le fond. */}
      <Reveal className="mt-14 overflow-hidden rounded-2xl border border-line bg-line">
        <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage) => (
            <li
              key={advantage.title}
              className="group bg-background p-7 transition-colors duration-300 hover:bg-surface sm:p-8"
            >
              <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-white/[0.04] text-accent-soft transition-colors duration-300 group-hover:border-accent/40">
                <advantage.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                {advantage.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{advantage.description}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
