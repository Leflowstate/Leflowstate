"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Fournit Framer Motion à toute l'application.
 *
 * - `LazyMotion` + composants `m.*` : seul le sous-ensemble `domAnimation`
 *   est embarqué (≈ 3× plus léger que `motion.*`).
 * - `reducedMotion="user"` : les déplacements sont désactivés pour les
 *   personnes ayant activé « réduire les animations ».
 */
export function MotionProvider({ children, nonce }: { children: ReactNode; nonce?: string }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" nonce={nonce}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
