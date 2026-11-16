import type { Metadata } from "next";
import { Suspense } from "react";

import { Contact } from "@/components/sections/contact";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Tools } from "@/components/sections/tools";
import { UseCases } from "@/components/sections/use-cases";
import { WhyUs } from "@/components/sections/why-us";
import { FaqJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Chaque section sous la ligne de flottaison est placée dans sa propre
 * frontière <Suspense>. Rien n'y est suspendu : le but est l'hydratation
 * sélective de React, qui traite alors chaque section séparément et à
 * basse priorité au lieu d'une seule longue tâche bloquante (meilleur TBT /
 * INP sur mobile). Le HTML envoyé par le serveur est strictement identique.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense>
        <Tools />
      </Suspense>
      <Suspense>
        <Services />
      </Suspense>
      <Suspense>
        <Process />
      </Suspense>
      <Suspense>
        <UseCases />
      </Suspense>
      <Suspense>
        <WhyUs />
      </Suspense>
      <Suspense>
        <Testimonials />
      </Suspense>
      <Suspense>
        <Cta />
      </Suspense>
      <Suspense>
        <Faq />
      </Suspense>
      <Suspense>
        <Contact />
      </Suspense>
      <FaqJsonLd />
    </>
  );
}
