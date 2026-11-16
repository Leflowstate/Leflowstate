import { Check, Receipt, Send, Sparkles, Table, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Aperçu animé d'un workflow (relance de factures).
 * 100 % HTML/CSS : aucune image à charger, aucune dépendance JavaScript,
 * donc aucun impact sur le temps de chargement du hero.
 */

type Node = { icon: LucideIcon; title: string; meta: string; delay: string };

const nodes: Node[] = [
  { icon: Receipt, title: "Facture en retard", meta: "Bexio · déclencheur", delay: "[animation-delay:0s]" },
  { icon: Sparkles, title: "Relance rédigée", meta: "Claude · IA", delay: "[animation-delay:2s]" },
  { icon: Send, title: "E-mail envoyé", meta: "Gmail", delay: "[animation-delay:4s]" },
  { icon: Table, title: "Suivi mis à jour", meta: "Google Sheets", delay: "[animation-delay:6s]" },
];

const workflows = [
  { name: "Relance des factures", active: true },
  { name: "Tri des e-mails", active: false },
  { name: "Rendez-vous clients", active: false },
  { name: "Rapport hebdomadaire", active: false },
];

const logLines = [
  { time: "08:00:02", text: "Facture F-2041 échue depuis 12 jours" },
  { time: "08:00:03", text: "Relance rédigée · ton cordial, 2ᵉ rappel" },
  { time: "08:00:04", text: "E-mail envoyé au client" },
  { time: "08:00:04", text: "Tableau de suivi mis à jour" },
];

export function WorkflowVisual({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Aperçu d'une automatisation : une facture en retard est détectée dans Bexio, l'IA rédige la relance, l'e-mail est envoyé par Gmail et le suivi est mis à jour dans Google Sheets."
      className={cn(
        "relative mx-auto max-w-5xl overflow-hidden glass rounded-3xl text-left shadow-[0_50px_120px_-40px_rgb(91_78_240/0.45)]",
        className,
      )}
    >
      <div aria-hidden className="edge-highlight absolute inset-x-10 top-0 h-px" />

      {/* Barre de fenêtre */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        <p className="font-mono text-xs text-subtle">relance-factures.workflow</p>
        <p className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-[0.7rem] font-medium text-success">
          <span className="size-1.5 rounded-full bg-success" aria-hidden />
          Actif
        </p>
      </div>

      <div className="grid lg:grid-cols-[13.5rem_1fr]">
        {/* Liste des workflows */}
        <div className="hidden border-r border-line p-4 lg:block">
          <p className="px-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-subtle">
            Workflows
          </p>
          <ul className="mt-3 space-y-1">
            {workflows.map((workflow) => (
              <li
                key={workflow.name}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm",
                  workflow.active ? "bg-white/80 text-foreground shadow-[0_4px_12px_-6px_rgb(60_50_150/0.3)]" : "text-muted",
                )}
              >
                <span
                  className={cn("size-1.5 rounded-full", workflow.active ? "bg-accent" : "bg-foreground/25")}
                  aria-hidden
                />
                {workflow.name}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-lg border border-line p-3">
            <p className="text-xs text-subtle">Temps gagné ce mois</p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">46 h</p>
          </div>
        </div>

        {/* Canevas */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {nodes.map((node, index) => (
              <div key={node.title} className="contents">
                <div className="relative flex-1 rounded-xl border border-white/90 bg-elevated p-3.5 shadow-[0_8px_20px_-12px_rgb(60_50_150/0.35)]">
                  {/* Anneau lumineux : chaque nœud s'active à tour de rôle */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -inset-px animate-node rounded-xl border border-accent/80 opacity-0 shadow-[0_0_28px_-6px_rgb(91_78_240/0.7)]",
                      node.delay,
                    )}
                  />
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/80 bg-accent/10 text-accent-soft">
                      <node.icon className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{node.title}</p>
                      <p className="mt-0.5 truncate text-xs text-subtle">{node.meta}</p>
                    </div>
                  </div>
                </div>

                {index < nodes.length - 1 ? (
                  <span
                    aria-hidden
                    className="relative mx-auto block h-5 w-px shrink-0 overflow-hidden bg-line-strong lg:mx-0 lg:h-px lg:w-7 lg:self-center xl:w-10"
                  >
                    <span
                      className={cn(
                        "absolute inset-0 animate-flow-y bg-linear-to-b from-transparent via-accent to-transparent lg:animate-flow-x lg:bg-linear-to-r",
                        node.delay,
                      )}
                    />
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          {/* Journal d'exécution */}
          <div className="mt-5 hidden rounded-xl border border-white/80 bg-white/50 p-4 sm:block">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-subtle">
                Journal d&apos;exécution
              </p>
              <p className="font-mono text-xs text-subtle">4 étapes · 2,4 s</p>
            </div>
            <ul className="mt-3 space-y-2 font-mono text-xs">
              {logLines.map((line) => (
                <li key={line.text} className="flex items-center gap-3">
                  <span className="text-subtle">{line.time}</span>
                  <span className="min-w-0 flex-1 truncate text-muted">{line.text}</span>
                  <Check className="size-3.5 shrink-0 text-success" aria-hidden />
                </li>
              ))}
              <li className="flex items-center gap-3">
                <span className="text-subtle">08:00:05</span>
                <span className="text-accent-soft">
                  En attente de la prochaine échéance
                  <span className="ml-0.5 inline-block animate-blink" aria-hidden>
                    ▍
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
