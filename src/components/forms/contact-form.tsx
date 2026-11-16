"use client";

import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { submitContact } from "@/actions/contact";
import { TextAreaField, TextField } from "@/components/forms/field";
import { Button } from "@/components/ui/button";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  TOKEN_FIELD,
  initialContactState,
  parseContactForm,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/validation/contact";

const FIELD_ORDER: ContactField[] = ["name", "email", "phone", "company", "message", "consent"];

/**
 * Formulaire de contact.
 *
 * - Validation immédiate côté client (même schéma Zod que le serveur), puis
 *   validation définitive dans la Server Action : le client n'est jamais cru.
 * - Fonctionne sans JavaScript : le <form> poste directement vers l'action.
 * - `token` est un jeton signé généré au rendu de la page (anti-CSRF + piège
 *   temporel) ; le champ piège est invisible pour les humains.
 */
export function ContactForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(submitContact, initialContactState);
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const errors: ContactFieldErrors = clientErrors ?? state.fieldErrors ?? {};

  // Après une réponse du serveur : focus sur la confirmation ou sur le
  // premier champ en erreur, pour les lecteurs d'écran et le clavier.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error" && state.fieldErrors) focusFirstInvalid(state.fieldErrors);
  }, [state]);

  function focusFirstInvalid(fieldErrors: ContactFieldErrors) {
    const first = FIELD_ORDER.find((field) => fieldErrors[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) return;

    const formData = new FormData(event.currentTarget);
    const parsed = parseContactForm(formData);

    if (!parsed.success) {
      setClientErrors(parsed.fieldErrors);
      focusFirstInvalid(parsed.fieldErrors);
      return;
    }

    setClientErrors(null);
    startTransition(() => formAction(formData));
  }

  /** Efface l'erreur d'un champ dès que la personne le corrige. */
  function clearError(field: ContactField) {
    if (!errors[field]) return;
    setClientErrors({ ...errors, [field]: undefined });
  }

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-success/25 bg-success/[0.06] p-8 text-center outline-none"
      >
        <CircleCheck className="size-10 text-success" aria-hidden />
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">Demande envoyée</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-muted">{state.message}</p>
      </div>
    );
  }

  const hasFieldErrors = Object.values(errors).some(Boolean);
  const formMessage =
    clientErrors && hasFieldErrors
      ? "Certains champs sont à corriger avant l'envoi."
      : !clientErrors && state.status === "error"
        ? state.message
        : undefined;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="contact-form-title"
      className="relative space-y-5"
    >
      <h3 id="contact-form-title" className="sr-only">
        Formulaire de demande de démonstration
      </h3>

      <input type="hidden" name={TOKEN_FIELD} value={token} />

      {/* Champ piège anti-robots : hors écran, hors tabulation, ignoré des lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="contact-reference">Ne pas remplir ce champ</label>
        <input
          id="contact-reference"
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Nom"
          name="name"
          autoComplete="name"
          required
          maxLength={CONTACT_LIMITS.name.max}
          placeholder="Marie Dupont"
          error={errors.name}
          onChange={() => clearError("name")}
        />
        <TextField
          label="E-mail"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          maxLength={CONTACT_LIMITS.email.max}
          placeholder="marie@entreprise.ch"
          error={errors.email}
          onChange={() => clearError("email")}
        />
        <TextField
          label="Téléphone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          optional
          maxLength={CONTACT_LIMITS.phone.max}
          placeholder="+41 79 123 45 67"
          error={errors.phone}
          onChange={() => clearError("phone")}
        />
        <TextField
          label="Société"
          name="company"
          autoComplete="organization"
          optional
          maxLength={CONTACT_LIMITS.company.max}
          placeholder="Entreprise Sàrl"
          error={errors.company}
          onChange={() => clearError("company")}
        />
      </div>

      <TextAreaField
        label="Description du besoin"
        name="message"
        required
        rows={5}
        maxLength={CONTACT_LIMITS.message.max}
        placeholder="Ex. : nous passons trop de temps à relancer les factures impayées depuis Bexio…"
        hint="Quelques lignes suffisent : la tâche qui vous prend du temps et les outils que vous utilisez."
        error={errors.message}
        onChange={() => clearError("message")}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "contact-consent-erreur" : undefined}
            onChange={() => clearError("consent")}
            className="mt-1 size-4 shrink-0 accent-[var(--color-accent)]"
          />
          <span>
            J&apos;accepte que mes données soient utilisées pour répondre à ma demande, conformément à
            la{" "}
            <Link
              href="/politique-de-confidentialite"
              className="text-accent-soft underline underline-offset-4 hover:text-foreground"
            >
              politique de confidentialité
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id="contact-consent-erreur" className="mt-2 text-sm text-danger">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {/* Zone d'annonce : toujours présente pour être lue dès qu'un message apparaît. */}
      <div role="alert" aria-live="assertive">
        {formMessage ? (
          <p className="flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/[0.07] px-4 py-3 text-sm text-danger">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            {formMessage}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isPending} aria-busy={isPending}>
        {isPending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer ma demande
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
              aria-hidden
            />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-subtle">
        Réponse sous 24 heures ouvrées. Vos données ne sont jamais revendues.
      </p>
    </form>
  );
}
