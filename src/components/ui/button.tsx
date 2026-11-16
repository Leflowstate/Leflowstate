import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium " +
  "transition-[background-color,border-color,color,transform,box-shadow,filter] duration-200 ease-out " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "cta-primary hover:-translate-y-0.5",
  secondary:
    "border border-white/80 bg-white/55 text-foreground shadow-[0_6px_20px_-10px_rgb(60_50_150/0.35)] backdrop-blur-md hover:bg-white/85",
  ghost: "text-muted hover:bg-white/70 hover:text-foreground",
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
