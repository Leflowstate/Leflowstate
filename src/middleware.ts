import { NextResponse, type NextRequest } from "next/server";

/**
 * Content-Security-Policy stricte avec nonce par requête.
 *
 * - Les scripts ne s'exécutent que s'ils portent le nonce (`strict-dynamic`
 *   étend la confiance aux scripts chargés par Next.js). Aucun
 *   `unsafe-inline` côté scripts → une injection XSS ne peut pas s'exécuter.
 * - `style-src-attr 'unsafe-inline'` est requis par Framer Motion, qui anime
 *   via l'attribut `style`. Les balises <style> restent soumises au nonce.
 * - Next.js lit le nonce dans l'en-tête de requête et l'applique
 *   automatiquement à ses propres scripts.
 */
export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const isDev = process.env.NODE_ENV !== "production";

  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    // En développement, le rechargement à chaud injecte des <style> sans nonce.
    isDev ? "style-src 'self' 'unsafe-inline'" : `style-src 'self' 'nonce-${nonce}'`,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ];
  const csp = directives.join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      // Toutes les pages, sauf les fichiers statiques et les images générées.
      source:
        "/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon|opengraph-image|robots.txt|sitemap.xml|manifest.webmanifest).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
