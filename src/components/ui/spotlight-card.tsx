"use client";

import type { ComponentPropsWithoutRef, PointerEvent } from "react";

import { cn } from "@/lib/utils";

/**
 * Carte dont le reflet lumineux suit le pointeur.
 * La position est transmise au CSS via deux variables (`.spotlight`).
 */
export function SpotlightCard({ className, children, ...props }: ComponentPropsWithoutRef<"div">) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn(
        "spotlight relative overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong",
        className,
      )}
      {...props}
    >
      <div className="relative h-full">{children}</div>
    </div>
  );
}
