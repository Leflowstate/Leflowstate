import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Symbole : deux nœuds reliés par un flux — l'automatisation en un trait. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <rect width="32" height="32" rx="8" fill="#fff" />
      <path
        d="M10 21.5c5 0 3.5-11 12-11"
        stroke="#0a0a0a"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="10" cy="21.5" r="3.1" fill="#0a0a0a" />
      <circle cx="22" cy="10.5" r="3.1" fill="#3b7bff" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[1.05rem] font-semibold tracking-tight text-foreground">
        {siteConfig.name}
      </span>
    </span>
  );
}
