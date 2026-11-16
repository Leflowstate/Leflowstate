import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";

const dateFormatter = new Intl.DateTimeFormat("fr-CH", { dateStyle: "long" });

/** Gabarit commun aux pages légales : titre, date de mise à jour, contenu. */
export function LegalArticle({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mt-8">
      <h1 className="text-gradient text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 text-sm text-subtle">
        Dernière mise à jour :{" "}
        <time dateTime={siteConfig.legal.lastUpdated}>
          {dateFormatter.format(new Date(siteConfig.legal.lastUpdated))}
        </time>
      </p>
      <div className="prose-legal mt-10">{children}</div>
    </article>
  );
}
