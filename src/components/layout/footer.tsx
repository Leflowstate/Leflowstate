import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { CookieSettingsButton } from "@/components/cookies/cookie-settings-button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { InstagramIcon, LinkedInIcon, XIcon } from "@/components/ui/social-icons";
import { siteConfig } from "@/config/site";
import { legalNav, mainNav } from "@/content/navigation";

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedInIcon },
  { label: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon },
  { label: "X", href: siteConfig.social.x, icon: XIcon },
].filter((link) => link.href.length > 0);

const linkClass = "text-sm text-muted transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white/40">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" aria-label={`${siteConfig.name} — accueil`} className="inline-block rounded-md">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Automatisation et agents IA sur mesure pour les PME de Suisse romande.
            </p>
            {socialLinks.length > 0 ? (
              <ul className="mt-6 flex gap-2" aria-label="Réseaux sociaux">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${siteConfig.name} sur ${label} (nouvel onglet)`}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Plan du site">
            <h2 className="text-sm font-medium text-foreground">Navigation</h2>
            <ul className="mt-4 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Informations légales">
            <h2 className="text-sm font-medium text-foreground">Légal</h2>
            <ul className="mt-4 space-y-3">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className={linkClass} />
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium text-foreground">Contact</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <Mail className="size-4 shrink-0 text-subtle" aria-hidden />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.phoneHref}`} className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <Phone className="size-4 shrink-0 text-subtle" aria-hidden />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-sm text-muted">
                <MapPin className="size-4 shrink-0 text-subtle" aria-hidden />
                {siteConfig.contact.region}, {siteConfig.contact.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Tous droits réservés.
          </p>
          <p>Conçu en {siteConfig.contact.region}, {siteConfig.contact.country}.</p>
        </div>
      </Container>
    </footer>
  );
}
