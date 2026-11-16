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
          background: "#f6f5fc",
          backgroundImage:
            "radial-gradient(700px 500px at 0% 0%, rgba(167,190,255,0.85), rgba(246,245,252,0) 70%), radial-gradient(700px 500px at 100% 0%, rgba(214,190,255,0.8), rgba(246,245,252,0) 70%), radial-gradient(700px 450px at 90% 100%, rgba(255,206,190,0.75), rgba(246,245,252,0) 70%)",
          color: "#17153a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="9" fill="#5b4ef0" />
            <path d="M10 21.5c5 0 3.5-11 12-11" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="10" cy="21.5" r="3.1" fill="#fff" />
            <circle cx="22" cy="10.5" r="3.1" fill="#ffd0c2" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2.5, maxWidth: 980 }}>
            Automatisez votre entreprise grâce à l&apos;intelligence artificielle.
          </div>
          <div style={{ fontSize: 30, color: "#4a4868" }}>
            Automatisation &amp; agents IA sur mesure pour les PME · Valais, Suisse
          </div>
        </div>
      </div>
    ),
    size,
  );
}
