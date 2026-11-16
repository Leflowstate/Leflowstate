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
      <defs>
        <linearGradient id="logo-mesh" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4a6cf7" />
          <stop offset="0.6" stopColor="#6d3ff0" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#logo-mesh)" />
      <path
        d="M10 21.5c5 0 3.5-11 12-11"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="10" cy="21.5" r="3.1" fill="#fff" />
      <circle cx="22" cy="10.5" r="3.1" fill="#ffd0c2" />
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
