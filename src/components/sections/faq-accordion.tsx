"use client";

import { m } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

import { EASE_OUT_EXPO } from "@/components/motion/reveal";
import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/utils";

/**
 * Accordéon accessible. Les réponses restent dans le DOM (bon pour le SEO) ;
 * `inert` les retire de la tabulation et des lecteurs d'écran une fois repliées.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `faq-question-${index}`;
        const panelId = `faq-reponse-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-medium text-foreground transition-colors hover:text-accent-soft sm:text-lg"
              >
                {item.question}
                <span
                  aria-hidden
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-transform duration-300",
                    isOpen && "rotate-45 border-line-strong text-foreground",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="overflow-hidden"
            >
              <p className="max-w-2xl pb-7 leading-relaxed text-muted">{item.answer}</p>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
