"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { onOpenCookieSettings, saveConsent, useConsent } from "@/components/cookies/consent";
import { EASE_OUT_EXPO } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

/**
 * Bannière de consentement.
 * « Refuser » et « Accepter » ont le même poids visuel et le refus se fait
 * en un clic, conformément aux recommandations des autorités de protection
 * des données. Aucun cookie non essentiel n'est déposé avant le choix.
 */
export function CookieBanner() {
  const { status, consent } = useConsent();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const titleId = useId();

  useEffect(
    () =>
      onOpenCookieSettings(() => {
        setShowDetails(true);
        setIsSettingsOpen(true);
      }),
    [],
  );

  const isVisible = status === "pending" || (status === "decided" && isSettingsOpen);

  function decide(choice: { analytics: boolean }) {
    saveConsent(choice);
    setIsSettingsOpen(false);
    setShowDetails(false);
  }

  function openDetails() {
    setAnalytics(consent?.analytics ?? false);
    setShowDetails(true);
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <m.div
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="fixed inset-x-3 bottom-3 z-[60] glass glass-strong rounded-2xl p-4 shadow-[0_24px_70px_-16px_rgb(40_30_120/0.45)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[26rem] sm:p-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          <h2 id={titleId} className="text-sm font-semibold text-foreground">
            Respect de votre vie privée
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Nous utilisons uniquement les cookies nécessaires au fonctionnement du site. Avec votre
            accord, une mesure d&apos;audience anonyme nous aide à l&apos;améliorer.{" "}
            <Link
              href="/politique-de-confidentialite"
              className="text-accent-soft underline underline-offset-4 hover:text-foreground"
            >
              En savoir plus
            </Link>
          </p>

          {showDetails ? (
            <fieldset className="mt-4 space-y-3 rounded-xl border border-white/80 bg-white/60 p-4">
              <legend className="sr-only">Préférences de cookies</legend>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-0.5 size-4 accent-[var(--color-accent)]"
                />
                <span>
                  <span className="font-medium text-foreground">Nécessaires</span>
                  <span className="block text-muted">
                    Sécurité du site et mémorisation de votre choix. Toujours actifs.
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="mt-0.5 size-4 accent-[var(--color-accent)]"
                />
                <span>
                  <span className="font-medium text-foreground">Mesure d&apos;audience</span>
                  <span className="block text-muted">
                    Statistiques de fréquentation anonymes, sans publicité ni revente.
                  </span>
                </span>
              </label>
            </fieldset>
          ) : null}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="secondary" size="sm" onClick={() => decide({ analytics: false })}>
              Tout refuser
            </Button>
            <Button variant="secondary" size="sm" onClick={() => decide({ analytics: true })}>
              Tout accepter
            </Button>
          </div>
          <div className="mt-2">
            {showDetails ? (
              <Button size="sm" className="w-full" onClick={() => decide({ analytics })}>
                Enregistrer mes choix
              </Button>
            ) : (
              <button
                type="button"
                onClick={openDetails}
                className="w-full rounded-full py-1.5 text-center text-xs text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Personnaliser mes choix
              </button>
            )}
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
