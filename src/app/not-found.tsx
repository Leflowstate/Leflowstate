import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden py-32">
      <Container className="text-center">
        <p className="font-mono text-sm text-accent-soft">Erreur 404</p>
        <h1 className="text-gradient mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Cette page n&apos;existe pas
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">
          Le lien est peut-être erroné ou la page a été déplacée. Revenez à l&apos;accueil pour
          retrouver nos solutions.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
          <ButtonLink href="/#contact" variant="secondary">
            Nous contacter
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
