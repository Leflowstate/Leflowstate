import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage (Open Graph / X) générée à la compilation. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(900px 480px at 50% -10%, rgba(59,123,255,0.32), rgba(10,10,10,0) 70%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#fff" />
            <path d="M10 21.5c5 0 3.5-11 12-11" stroke="#0a0a0a" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="10" cy="21.5" r="3.1" fill="#0a0a0a" />
            <circle cx="22" cy="10.5" r="3.1" fill="#3b7bff" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2.5, maxWidth: 980 }}>
            Automatisez votre entreprise grâce à l&apos;intelligence artificielle.
          </div>
          <div style={{ fontSize: 30, color: "#a1a1aa" }}>
            Automatisation &amp; agents IA sur mesure pour les PME · Valais, Suisse
          </div>
        </div>
      </div>
    ),
    size,
  );
}
