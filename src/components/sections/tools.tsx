import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { tools } from "@/content/services";

/** Bandeau des outils compatibles — noms en texte, sans logos tiers. */
export function Tools() {
  return (
    <section aria-labelledby="outils-title" className="border-y border-white/60 bg-white/30 py-10">
      <Container>
        <Reveal>
          <h2 id="outils-title" className="text-center text-sm text-subtle">
            Nous connectons les outils que vous utilisez déjà
          </h2>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10">
            {tools.map((tool) => (
              <li
                key={tool}
                className="text-base font-medium tracking-tight text-muted transition-colors duration-300 hover:text-foreground sm:text-lg"
              >
                {tool}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
