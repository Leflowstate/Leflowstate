import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

/** Section de page : ancre, espacement vertical et étiquette accessible. */
export function Section({ id, children, className, containerClassName }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative py-20 sm:py-28 lg:py-32", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  /** Identifiant de la section parente (sert à `aria-labelledby`). */
  sectionId: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  sectionId,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">{eyebrow}</p>
      <h2
        id={`${sectionId}-title`}
        className="text-gradient mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}
