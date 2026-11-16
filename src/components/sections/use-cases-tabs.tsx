"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check, Clock, ListChecks, TrendingUp } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import { EASE_OUT_EXPO } from "@/components/motion/reveal";
import { useCases } from "@/content/use-cases";
import { cn } from "@/lib/utils";

const PANEL_ID = "cas-usage-panneau";
const tabId = (id: string) => `cas-usage-onglet-${id}`;

/** Onglets accessibles (pattern WAI-ARIA « Tabs », navigation aux flèches). */
export function UseCasesTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = useCases[activeIndex] ?? useCases[0]!;

  function selectTab(index: number) {
    const next = (index + useCases.length) % useCases.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({ block: "nearest", inline: "center" });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const actions: Record<string, () => void> = {
      ArrowRight: () => selectTab(activeIndex + 1),
      ArrowLeft: () => selectTab(activeIndex - 1),
      Home: () => selectTab(0),
      End: () => selectTab(useCases.length - 1),
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  const metrics = [
    { icon: Clock, label: "Temps économisé", ...active.metrics.timeSaved },
    { icon: ListChecks, label: "Tâches automatisées", ...active.metrics.tasks },
    { icon: TrendingUp, label: "Retour sur investissement", ...active.metrics.roi },
  ];

  return (
    <div className="mt-14">
      <div
        role="tablist"
        aria-label="Secteurs d'activité"
        onKeyDown={handleKeyDown}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {useCases.map((useCase, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={useCase.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={tabId(useCase.id)}
              aria-selected={isActive}
              aria-controls={PANEL_ID}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "border-transparent bg-foreground text-white shadow-[0_8px_20px_-8px_rgb(23_21_58/0.6)]"
                  : "border-white/80 bg-white/55 text-muted backdrop-blur-md hover:bg-white/85 hover:text-foreground",
              )}
            >
              <useCase.icon className="size-4" aria-hidden />
              {useCase.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={PANEL_ID}
        aria-labelledby={tabId(active.id)}
        tabIndex={0}
        className="glass mt-8 overflow-hidden rounded-3xl"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="grid lg:grid-cols-[1.25fr_1fr]"
          >
            <div className="p-6 sm:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-soft">
                {active.label}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                {active.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{active.context}</p>

              <p className="mt-8 text-sm font-medium text-foreground">Ce que nous automatisons</p>
              <ul className="mt-4 space-y-3">
                {active.automations.map((automation) => (
                  <li key={automation} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-soft">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {automation}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid border-t border-line sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-t-0">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="border-b border-line p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0 lg:px-10 lg:py-7"
                >
                  <dt className="flex items-center gap-2 text-sm text-subtle">
                    <metric.icon className="size-4" aria-hidden />
                    {metric.label}
                  </dt>
                  <dd className="mt-3">
                    <span className="text-gradient text-4xl font-semibold tracking-tight">
                      {metric.value}
                    </span>
                    <span className="ml-2 text-sm text-muted">{metric.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
