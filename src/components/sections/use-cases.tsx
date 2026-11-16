import { Reveal } from "@/components/motion/reveal";
import { UseCasesTabs } from "@/components/sections/use-cases-tabs";
import { Section, SectionHeading } from "@/components/ui/section";

export function UseCases() {
  return (
    <Section id="cas-usage">
      <SectionHeading
        sectionId="cas-usage"
        eyebrow="Cas d'usage"
        title="Concrètement, dans votre métier"
        description="Cinq exemples de ce que l'automatisation peut prendre en charge, secteur par secteur."
      />

      <Reveal>
        <UseCasesTabs />
        <p className="mt-5 text-center text-sm text-subtle">
          Scénarios illustratifs : les chiffres sont des estimations indicatives, qui varient
          selon votre organisation et vos volumes.
        </p>
      </Reveal>
    </Section>
  );
}
