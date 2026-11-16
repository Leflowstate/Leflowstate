"use client";

import { m } from "framer-motion";

import { EASE_OUT_EXPO } from "@/components/motion/reveal";

/** Trait horizontal qui se dessine de gauche à droite à l'entrée dans la fenêtre. */
export function DrawLine({ className }: { className?: string }) {
  return (
    <m.span
      aria-hidden
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -72px 0px" }}
      transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
    />
  );
}
