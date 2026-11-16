"use client";

import { openCookieSettings } from "@/components/cookies/consent";

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      Gérer les cookies
    </button>
  );
}
