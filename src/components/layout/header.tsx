"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { EASE_OUT_EXPO } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";
import { CONTACT_HREF, mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile : fermeture avec Échap, au passage en grand écran,
  // et blocage du défilement de la page tant qu'il est ouvert.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => desktop.matches && setIsMenuOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        isScrolled || isMenuOpen
          ? "border-line bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — retour à l'accueil`}
          className="flex items-center rounded-md"
          onClick={() => setIsMenuOpen(false)}
        >
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={CONTACT_HREF} size="sm" className="hidden sm:inline-flex">
            Réserver une démonstration
          </ButtonLink>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:bg-white/[0.06] lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isMenuOpen ? (
          <m.div
            id="menu-mobile"
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-background lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
          >
            <Container className="pb-8 pt-4">
              <nav aria-label="Navigation mobile">
                <ul className="flex flex-col">
                  {mainNav.map((item) => (
                    <li key={item.href} className="border-b border-line">
                      <Link
                        href={item.href}
                        className="block py-4 text-lg font-medium text-foreground"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <ButtonLink
                href={CONTACT_HREF}
                size="lg"
                className="mt-6 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Réserver une démonstration
              </ButtonLink>
            </Container>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
