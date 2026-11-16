"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Délai en secondes — utile pour échelonner les éléments d'une grille. */
  delay?: number;
  /** Décalage vertical initial en pixels. */
  y?: number;
  as?: "div" | "li" | "article";
};

/**
 * Fait apparaître son contenu lorsqu'il entre dans la fenêtre (une seule fois).
 * L'attribut `data-reveal` permet de forcer l'affichage sans JavaScript
 * (voir la règle <noscript> dans `app/layout.tsx`).
 */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: RevealProps) {
  const Component = m[as];

  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -72px 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Component>
  );
}
