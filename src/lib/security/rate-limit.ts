import "server-only";

/**
 * Limiteur de débit à fenêtre glissante, en mémoire.
 *
 * ⚠️ En environnement serverless (Vercel), la mémoire n'est pas partagée
 * entre les instances : cette protection est un premier filet efficace
 * contre les rafales, mais pas une garantie stricte. Pour une limite
 * globale, remplacez l'implémentation par un stockage partagé
 * (Upstash Redis / Vercel KV) en conservant la même signature.
 */

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Secondes à attendre avant la prochaine tentative autorisée. */
  retryAfter: number;
};

const store = new Map<string, number[]>();
const MAX_KEYS = 5000;

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;
  const hits = (store.get(key) ?? []).filter((time) => time > windowStart);

  if (hits.length >= limit) {
    store.set(key, hits);
    const oldest = hits[0] ?? now;
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  hits.push(now);
  store.set(key, hits);

  // Évite une croissance illimitée de la mémoire.
  if (store.size > MAX_KEYS) {
    for (const [storedKey, times] of store) {
      if (times.every((time) => time <= windowStart)) store.delete(storedKey);
    }
    if (store.size > MAX_KEYS) store.clear();
  }

  return { allowed: true, remaining: limit - hits.length, retryAfter: 0 };
}
