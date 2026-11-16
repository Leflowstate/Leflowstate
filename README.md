# Site vitrine — agence d'automatisation & agents IA

Site Next.js 15 (App Router) pour une agence d'automatisation basée en Valais.
Objectif : générer des demandes de démonstration et des rendez-vous.

**Stack** : Next.js 15 · React 19 · TypeScript (strict) · Tailwind CSS 4 · Framer Motion · Zod

---

## 1. Démarrage

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Le site est servi sur http://localhost:3000. En développement, les demandes du
formulaire ne sont pas envoyées par e-mail : elles s'affichent dans le terminal.

| Commande            | Rôle                                  |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Serveur de développement              |
| `npm run build`     | Compilation de production             |
| `npm run start`     | Sert la compilation de production     |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | Vérification TypeScript               |

---

## 2. À personnaliser avant la mise en ligne

Tout ce qui est propre à votre entreprise est regroupé à deux endroits.

### `src/config/site.ts`

- [ ] **Nom de l'agence** — actuellement `Leflowstate`. Vérifiez la
      disponibilité du nom définitif (registre du commerce, marque, domaine).
- [ ] E-mail, téléphone, région.
- [ ] Bloc `legal` : responsable, forme juridique, adresse, numéro IDE.
- [ ] Liens des réseaux sociaux (chaîne vide = icône masquée).

### `src/content/`

| Fichier           | Contenu                         | Point d'attention                                                        |
| ----------------- | ------------------------------- | ------------------------------------------------------------------------ |
| `services.ts`     | Les 4 cartes de services        | —                                                                        |
| `process.ts`      | Les 4 étapes                    | —                                                                        |
| `use-cases.ts`    | Les 5 cas d'usage chiffrés      | Chiffres **illustratifs** : remplacez-les par vos vrais résultats.       |
| `advantages.ts`   | « Pourquoi nous choisir »       | Vérifiez que chaque promesse (hébergement, support…) reflète votre offre. |
| `testimonials.ts` | Témoignages                     | **Fictifs**, affichés comme « Exemple de démonstration ».                |
| `faq.ts`          | Questions fréquentes            | Tarifs, délais et engagements IA à valider : ils vous engagent.          |

Quand vous aurez de vrais témoignages (avec accord écrit des clients),
remplacez-les dans `testimonials.ts` et passez `TESTIMONIALS_ARE_DEMO` à `false`.

### Pages légales

Les trois pages de `src/app/(legal)/` sont des modèles rédigés pour le droit
suisse (LPD) et le RGPD. **Faites-les relire par un juriste** : elles doivent
refléter vos traitements réels (prestataires, durées de conservation, etc.).

---

## 3. Architecture

```
src/
├── app/                          Routes (App Router)
│   ├── layout.tsx                Layout racine : polices, métadonnées, nonce CSP
│   ├── page.tsx                  Page d'accueil (assemblage des sections)
│   ├── globals.css               Design tokens Tailwind 4 + animations CSS
│   ├── (legal)/                  Mentions légales, confidentialité, conditions
│   ├── robots.ts · sitemap.ts · manifest.ts
│   ├── opengraph-image.tsx       Image de partage générée à la compilation
│   ├── icon.svg · apple-icon.tsx
│   └── not-found.tsx · error.tsx
├── actions/
│   └── contact.ts                Server Action du formulaire
├── components/
│   ├── layout/                   Header, Footer, gabarit des pages légales
│   ├── sections/                 Une section de page = un fichier
│   ├── hero/                     Aperçu animé du workflow
│   ├── forms/                    Formulaire de contact, champs
│   ├── cookies/                  Bannière, stockage du consentement, ConsentGate
│   ├── motion/                   Fournisseur Framer Motion, Reveal, DrawLine
│   ├── seo/                      Données structurées JSON-LD
│   └── ui/                       Button, Container, Section, Badge, Logo…
├── config/site.ts                Identité de l'entreprise (source unique)
├── content/                      Tous les textes, séparés des composants
├── lib/
│   ├── security/                 Sanitisation, jeton signé, limitation de débit
│   ├── validation/contact.ts     Schéma Zod partagé client/serveur
│   ├── email.ts                  Envoi via Resend
│   └── utils.ts
└── middleware.ts                 Content-Security-Policy avec nonce
```

Principes :

- **Composants serveur par défaut.** Seuls les éléments interactifs sont des
  composants client (`"use client"`) : menu, onglets, accordéon, formulaire,
  bannière cookies, animations.
- **Contenu séparé du code.** Modifier un texte ne demande pas de toucher à un
  composant.
- **Animations.** Framer Motion est chargé en version allégée
  (`LazyMotion` + `m.*`). Le hero est animé en CSS pur pour s'afficher sans
  attendre JavaScript. `prefers-reduced-motion` est respecté partout.

---

## 4. Variables d'environnement

| Variable                  | Obligatoire en production | Rôle                                                            |
| ------------------------- | ------------------------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | Oui                       | URL publique (canonical, sitemap, Open Graph)                   |
| `FORM_SECRET`             | Oui                       | Secret de signature du jeton de formulaire                      |
| `RESEND_API_KEY`          | Oui                       | Clé API Resend pour l'envoi des demandes                        |
| `CONTACT_TO_EMAIL`        | Oui                       | Adresse qui reçoit les demandes                                 |
| `CONTACT_FROM_EMAIL`      | Oui                       | Expéditeur (domaine vérifié dans Resend)                        |
| `NEXT_PUBLIC_BOOKING_URL` | Non                       | Lien Calendly / Cal.com affiché dans la section contact         |

Générer `FORM_SECRET` :

```bash
openssl rand -base64 32
```

Sans `RESEND_API_KEY`, `CONTACT_TO_EMAIL` et `CONTACT_FROM_EMAIL`, le
formulaire de production affiche un message d'erreur invitant à écrire par
e-mail : aucune demande n'est perdue en silence.

---

## 5. Déploiement sur Vercel

1. Poussez le projet sur un dépôt GitHub, GitLab ou Bitbucket.
2. Sur vercel.com : **Add New → Project**, importez le dépôt. Le framework
   Next.js est détecté automatiquement, aucun réglage de build n'est nécessaire.
3. **Settings → Environment Variables** : ajoutez les variables du tableau
   ci-dessus pour l'environnement *Production* (et *Preview* si souhaité).
4. **Settings → Domains** : ajoutez votre domaine, puis créez chez votre
   registraire les enregistrements DNS indiqués par Vercel. Le certificat
   HTTPS est émis automatiquement.
5. **Settings → Functions → Region** : choisissez `fra1` (Francfort) ou
   `cdg1` (Paris), les régions les plus proches de la Suisse.
6. Dans Resend : vérifiez votre domaine d'envoi (enregistrements SPF et DKIM),
   sans quoi les e-mails partiront en indésirables.

Vérifications après la mise en ligne :

- [ ] Envoyer une vraie demande depuis le formulaire et confirmer sa réception.
- [ ] Contrôler les en-têtes sur securityheaders.com.
- [ ] Déclarer `https://votre-domaine.ch/sitemap.xml` dans Google Search Console.
- [ ] Tester l'aperçu de partage (LinkedIn Post Inspector).
- [ ] Lancer Lighthouse sur l'URL de production.

> L'en-tête HSTS est configuré avec `preload`. Ne soumettez le domaine à
> hstspreload.org que si **tous** ses sous-domaines sont servis en HTTPS :
> l'inscription est difficile à annuler.

---

## 6. Sécurité

### Mesures en place

| Risque                | Protection                                                                                                                             | Fichier                               |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| XSS                   | CSP stricte à nonce (`strict-dynamic`, sans `unsafe-inline` ni `unsafe-eval` pour les scripts) ; échappement natif de React             | `src/middleware.ts`                   |
| XSS (e-mail)          | Échappement HTML de toutes les valeurs insérées dans l'e-mail                                                                           | `src/lib/email.ts`                    |
| CSRF                  | Server Action (POST uniquement, contrôle Origin/Host par Next.js) + contrôle d'origine explicite + jeton signé HMAC-SHA256              | `src/actions/contact.ts`              |
| Spam / robots         | Champ piège invisible, piège temporel (envoi < 3 s), limitation à 5 envois / 10 min par IP                                              | `src/lib/security/`                   |
| Données invalides     | Validation Zod côté serveur (source de vérité) et côté client (confort)                                                                 | `src/lib/validation/contact.ts`       |
| Injection d'en-têtes  | Suppression des retours à la ligne et caractères de contrôle dans les champs sur une ligne                                              | `src/lib/security/sanitize.ts`        |
| Clickjacking          | `frame-ancestors 'none'` + `X-Frame-Options: DENY`                                                                                      | `src/middleware.ts`, `next.config.ts` |
| Rétrogradation HTTPS  | HSTS (2 ans, sous-domaines) + `upgrade-insecure-requests`                                                                               | `next.config.ts`                      |
| Fuite d'informations  | `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`, en-tête `X-Powered-By` retiré, aucune donnée personnelle journalisée | `next.config.ts`                      |
| Vie privée            | Aucun traceur par défaut, consentement préalable, refus en un clic, choix modifiable depuis le footer                                   | `src/components/cookies/`             |

Les réponses aux robots détectés sont de **faux succès** : le robot n'apprend
pas qu'il a été filtré.

### Limites connues et recommandations

1. **Limitation de débit en mémoire.** Sur Vercel, chaque instance serverless
   a sa propre mémoire : la limite freine les rafales mais n'est pas globale.
   Pour une limite stricte, branchez Upstash Redis dans
   `src/lib/security/rate-limit.ts` (la signature de la fonction est prévue
   pour cela).
2. **Captcha.** Si le spam passe malgré tout, ajoutez Cloudflare Turnstile
   (gratuit, sans cookie publicitaire) et autorisez son domaine dans la CSP.
3. **Pare-feu.** Activez le Vercel Firewall et la protection contre les robots
   dans les réglages du projet.
4. **Dépendances.** Activez Dependabot ou Renovate et lancez régulièrement
   `npm audit`. `package.json` force une version corrigée de PostCSS via
   `overrides` ; retirez cette entrée lorsque Next.js l'embarquera.
5. **Secrets.** Ne commitez jamais `.env.local`. Renouvelez `FORM_SECRET` et
   la clé Resend en cas de doute.
6. **Ajout d'un script tiers.** Tout nouveau domaine (mesure d'audience,
   Calendly embarqué…) doit être autorisé explicitement dans
   `src/middleware.ts`, et chargé dans `<ConsentGate>` s'il dépose des cookies.
7. **Sous-traitants.** Signez un accord de traitement des données (DPA) avec
   Vercel et Resend, et tenez la politique de confidentialité à jour.

---

## 7. SEO

- Métadonnées complètes (titre, description, Open Graph, carte X) dans
  `src/app/layout.tsx`, URL canonique par page.
- `sitemap.xml`, `robots.txt` et manifeste générés par le code.
- Données structurées JSON-LD : `ProfessionalService`, `WebSite`, `FAQPage`.
- Image Open Graph générée automatiquement (`opengraph-image.tsx`).
- HTML sémantique, hiérarchie de titres propre, langue `fr-CH`.

À faire de votre côté : créer une fiche Google Business Profile, obtenir
quelques liens locaux (annuaires valaisans, associations professionnelles) et
renseigner les vraies coordonnées pour le référencement local.

---

## 8. Résultats mesurés

Lighthouse sur la compilation de production, en local :

| Profil     | Performance | Accessibilité | Bonnes pratiques | SEO |
| ---------- | ----------- | ------------- | ---------------- | --- |
| Mobile     | 95 – 98     | 100           | 100              | 100 |
| Ordinateur | 100         | 100           | 100              | 100 |

LCP 1,1 s sur mobile simulé (0,3 s sur ordinateur), CLS 0. Le score de
performance mobile varie de quelques points d'une passe à l'autre selon la
charge de la machine ; refaites la mesure sur l'URL de production.

Le rendu est dynamique (nécessaire à la CSP à nonce) : le temps de réponse
dépend donc de la région des fonctions Vercel, d'où le choix de Francfort ou
Paris.

---

## 9. Améliorations possibles

**Conversion**

- Intégrer la réservation en ligne (Cal.com ou Calendly) directement dans la page.
- Envoyer un e-mail de confirmation automatique au prospect.
- Pousser chaque demande vers un CRM ou un workflow n8n (webhook dans `email.ts`).
- Ajouter un simulateur de temps gagné comme aimant à prospects.
- Mettre en place une mesure d'audience respectueuse (Plausible, Vercel
  Analytics) et suivre le taux de conversion du formulaire.

**Contenu**

- Pages dédiées par service et par secteur, pour le référencement local.
- Études de cas réelles avec chiffres vérifiés, blog ou ressources.
- Versions allemande et anglaise (`next-intl`) pour le Haut-Valais et le reste de la Suisse.

**Technique**

- Tests de bout en bout Playwright (envoi du formulaire, navigation clavier).
- Limitation de débit distribuée (Upstash) et Turnstile.
- Suivi d'erreurs (Sentry) et alertes de disponibilité.
- CI GitHub Actions : lint, typecheck, build et Lighthouse CI à chaque PR.
- CMS headless (Sanity, Payload) si le contenu doit être édité sans développeur.
