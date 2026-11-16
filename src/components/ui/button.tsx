import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-black shadow-[0_0_0_1px_rgb(255_255_255/0.9),0_8px_30px_-8px_rgb(59_123_255/0.55)] hover:bg-zinc-200",
  secondary:
    "border border-line-strong bg-white/[0.03] text-foreground hover:border-white/30 hover:bg-white/[0.07]",
  ghost: "text-muted hover:bg-white/[0.06] hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

type StyleProps = { variant?: Variant; size?: Size; className?: string };

export function buttonStyles({ variant = "primary", size = "md", className }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & StyleProps;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & StyleProps;

/** Lien stylé comme un bouton. Les URL externes s'ouvrent dans un nouvel onglet. */
export function ButtonLink({ variant, size, className, href, children, ...props }: ButtonLinkProps) {
  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyles({ variant, size, className })}
      >
        {children}
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}
