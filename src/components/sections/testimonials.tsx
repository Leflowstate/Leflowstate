import { Info } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { TESTIMONIALS_ARE_DEMO, testimonials } from "@/content/testimonials";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  return (
    <Section id="temoignages">
      <SectionHeading
        sectionId="temoignages"
        eyebrow="Témoignages"
        title="Ce que l'automatisation change au quotidien"
      />

      {TESTIMONIALS_ARE_DEMO ? (
        <Reveal className="mx-auto mt-6 flex max-w-xl items-start justify-center gap-2.5 rounded-xl border border-white/80 bg-white/55 px-4 py-3 text-sm text-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-accent-soft" aria-hidden />
          <p>
            Les témoignages ci-dessous sont des <strong className="font-medium text-foreground">exemples de démonstration</strong>,
            fictifs, présentés à titre d&apos;illustration.
          </p>
        </Reveal>
      ) : null}

      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal as="li" key={testimonial.name} delay={index * 0.1}>
            <figure className="glass flex h-full flex-col rounded-3xl p-7">
              {TESTIMONIALS_ARE_DEMO ? (
                <p className="mb-5 inline-flex self-start rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-soft">
                  Exemple de démonstration
                </p>
              ) : null}
              <blockquote className="flex-1 text-[0.97rem] leading-relaxed text-foreground/90">
                <p>« {testimonial.quote} »</p>
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <span
                  aria-hidden
                  className="flex size-10 items-center justify-center rounded-full border border-white/80 bg-accent/10 text-sm font-medium text-muted"
                >
                  {initials(testimonial.name)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-foreground">{testimonial.name}</span>
                  <span className="block text-sm text-subtle">
                    {testimonial.role} · {testimonial.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
