import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-muted",
        className,
      )}
      {...props}
    />
  );
}
