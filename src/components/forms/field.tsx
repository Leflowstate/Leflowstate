import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const controlClass =
  "w-full rounded-xl border bg-white/80 px-4 text-[0.95rem] text-foreground placeholder:text-subtle/70 " +
  "transition-[border-color,box-shadow] duration-200 " +
  "focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15";

type FieldMeta = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  optional?: boolean;
};

/** Identifiants et attributs ARIA reliant le contrôle à son aide et à son erreur. */
function fieldA11y({ name, error, hint }: FieldMeta) {
  const id = `contact-${name}`;
  const hintId = hint ? `${id}-aide` : undefined;
  const errorId = error ? `${id}-erreur` : undefined;

  return {
    id,
    hintId,
    errorId,
    control: {
      id,
      name,
      "aria-invalid": error ? (true as const) : undefined,
      "aria-describedby": [errorId, hintId].filter(Boolean).join(" ") || undefined,
    },
    borderClass: error ? "border-danger/70" : "border-line-strong",
  };
}

function FieldShell({
  meta,
  ids,
  children,
}: {
  meta: FieldMeta;
  ids: ReturnType<typeof fieldA11y>;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={ids.id} className="text-sm font-medium text-foreground">
          {meta.label}
          {meta.optional ? <span className="sr-only"> (facultatif)</span> : null}
        </label>
        {meta.optional ? (
          <span aria-hidden className="text-xs text-subtle">
            Facultatif
          </span>
        ) : null}
      </div>
      <div className="mt-2">{children}</div>
      {meta.hint ? (
        <p id={ids.hintId} className="mt-2 text-xs text-subtle">
          {meta.hint}
        </p>
      ) : null}
      {meta.error ? (
        <p id={ids.errorId} className="mt-2 text-sm text-danger">
          {meta.error}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = FieldMeta & Omit<ComponentPropsWithoutRef<"input">, "name" | "id">;

export function TextField({ label, name, error, hint, optional, className, ...props }: TextFieldProps) {
  const meta = { label, name, error, hint, optional };
  const ids = fieldA11y(meta);

  return (
    <FieldShell meta={meta} ids={ids}>
      <input
        type="text"
        {...props}
        {...ids.control}
        className={cn(controlClass, ids.borderClass, "h-12", className)}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = FieldMeta & Omit<ComponentPropsWithoutRef<"textarea">, "name" | "id">;

export function TextAreaField({
  label,
  name,
  error,
  hint,
  optional,
  className,
  ...props
}: TextAreaFieldProps) {
  const meta = { label, name, error, hint, optional };
  const ids = fieldA11y(meta);

  return (
    <FieldShell meta={meta} ids={ids}>
      <textarea
        {...props}
        {...ids.control}
        className={cn(controlClass, ids.borderClass, "min-h-36 resize-y py-3 leading-relaxed", className)}
      />
    </FieldShell>
  );
}
