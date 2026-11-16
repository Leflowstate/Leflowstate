"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Point d'entrée pour un outil de suivi d'erreurs (Sentry, etc.).
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80dvh] items-center py-32">
      <Container className="text-center">
        <p className="font-mono text-sm text-accent-soft">Erreur</p>
        <h1 className="text-gradient mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Une erreur est survenue
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">
          Le problème vient de notre côté. Réessayez dans un instant.
        </p>
        <Button className="mt-9" onClick={reset}>
          Réessayer
        </Button>
      </Container>
    </section>
  );
}
