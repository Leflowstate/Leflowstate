"use client";

import type { ReactNode } from "react";

import { useConsent } from "@/components/cookies/consent";

/**
 * N'affiche ses enfants que si la personne a accepté la catégorie demandée.
 *
 * Exemple — charger un outil de mesure d'audience uniquement après accord :
 *
 *   <ConsentGate category="analytics">
 *     <Script src="https://…/script.js" strategy="afterInteractive" />
 *   </ConsentGate>
 *
 * Pensez à autoriser le domaine concerné dans la CSP (`src/middleware.ts`).
 */
export function ConsentGate({
  category,
  children,
}: {
  category: "analytics";
  children: ReactNode;
}) {
  const { consent } = useConsent();
  return consent?.[category] ? <>{children}</> : null;
}
