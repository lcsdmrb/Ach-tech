# PROGRESS — Site Ach'Tech
> Résumé de la session de développement et déploiement
> Date : 22 juin 2026

---

## ✅ Phase 1 — Sécurité

### Terminé / Validé
- [x] **CSRF** : vérification `Origin`/`Referer` sur `/api/contact`
- [x] **Rate limiting** : 3 req/min/IP sur le formulaire de contact (en mémoire)
- [x] **Sanitisation inputs** : suppression balises HTML, encodage caractères spéciaux, limite 2000 chars
- [x] **Honeypot anti-bot** : champ `_trap` dans le formulaire
- [x] **Headers HTTP** : X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS, CSP
- [x] **CSP corrigée** : source `/((?!_next/static|_next/image|favicon.ico).*)` — exclut les assets Next.js du matcher (cause racine du 503 Hostinger identifiée avec Kodee)
- [x] **Secrets** : aucun secret en dur, variables d'environnement via `.env.local` (ignoré par git)
- [x] **SECURITY.md** créé à la racine
- [x] **npm audit** : 2 vulnérabilités modérées résiduelles (postcss interne Next.js — non corrigeable sans casser le framework)

### Reste à faire
- [ ] Passer à Redis pour le rate limiter en cas de multi-instance
- [ ] Envisager des nonces CSP pour supprimer `unsafe-inline` (complexe)

---

## ✅ Phase 2 — Conformité RGPD

### Terminé / Validé
- [x] **Bandeau cookies** (`CookieBanner.tsx`) : refus = acceptation, aucun cookie avant consentement
- [x] **Lien "Gérer les cookies"** dans le footer : réinitialise le consentement
- [x] **Page /mentions-legales** : dénomination, TVA belge, hébergeur Hostinger
- [x] **Page /politique-de-confidentialite** : conforme Art. 13 RGPD, droits des personnes, APD belge
- [x] **Page /cgu** : droit belge, pas de vente en ligne
- [x] **Sitemap.xml et robots.txt** générés automatiquement
- [x] **Métadonnées SEO** : OpenGraph, Twitter Card, canonical
- [x] **RGPD.md** créé avec registre des traitements et procédures

### Coordonnées intégrées
- Téléphone : 0491 64 91 96
- Email : info@ach-tech.com
- Zone : Wallonie & Bruxelles
- TVA : BE1022.715.243

### Reste à faire
- [ ] ⚠️ **Faire relire les pages légales par un juriste/avocat belge** (obligation légale — RGPD.md le précise explicitement)
- [ ] Signer/vérifier les DPA avec Resend et Hostinger
- [ ] Tester formulaire de contact avec vraie clé Resend en production

---

## ✅ Phase 3 — Performance

### Terminé / Validé
- [x] **Images optimisées** : 30 MB → ~1.5 MB (-95%) via script Sharp
- [x] **Images inutilisées supprimées** : anciens placeholders hero (exploded/mid/assembled), kitchen-close, kitchen-island
- [x] **PNGs convertis en JPEG** : chaudiere.jpg, chaufferie.jpg
- [x] **Favicon** : logo Ach'Tech comme icône du site (`app/icon.png`)
- [x] **Composants morts supprimés** : ClientShell, SmoothScroll, ImageWithFallback
- [x] **script d'optimisation** : `scripts/optimize-images.mjs` conservé pour usage futur
- [x] **Next.js Image** : formats AVIF/WebP, lazy loading, deviceSizes optimisés

### Photos intégrées
- Hero background : photo intérieure Pexels (pexels-artbovich-6970052.jpg)
- Réalisations : mix Pexels local + Unsplash
- Services : Unsplash thématiques (chauffage, finitions, salle de bain)

### Reste à faire
- [ ] Remplacer les photos Unsplash par de vraies photos client quand disponibles
- [ ] Ajouter les vrais logos partenaires en SVG local (évite les requêtes externes)

---

## ✅ Phase 4 — Déploiement Hostinger

### Architecture découverte (clé pour futurs déploiements)
```
/home/u521029585/domains/ach-tech.com/
  nodejs/        ← app Next.js (code source + build)
  public_html/   ← web root (LiteSpeed sert les fichiers ici)
  DO_NOT_UPLOAD_HERE
```

- **Serveur web** : LiteSpeed avec Phusion Passenger
- **Démarrage** : `PassengerStartupFile server.js` → cherche `nodejs/server.js`
- **Port** : 3000 (via `process.env.PORT || 3000`)
- **Logs** : `LSNODE_CONSOLE_LOG=console.log` → fichier dans `nodejs/`

### Terminé / Validé
- [x] **server.js créé** à la racine du projet (point d'entrée Passenger obligatoire)
- [x] **`output: 'standalone'` retiré** (non nécessaire, Passenger gère)
- [x] **Build standard** : `npm run build` (next build)
- [x] **Variables d'environnement** configurées dans hPanel → Environment Variables
- [x] **SSL + CDN** actifs sur Hostinger
- [x] **Auto-déploiement** depuis GitHub (branche `main`)
- [x] **Performance desktop : 100/100** (Hostinger Analytics)
- [x] **Site accessible** sur Chrome, Safari, Firefox, Brave, Edge, Explorer

### Cause racine du 503 (résolu)
Le header `source: '/(.*)'` dans `next.config.mjs` appliquait les security headers à TOUTES les routes **y compris `/_next/static/`**. Sur Hostinger/LiteSpeed, cela cassait le serving des assets statiques. Fix : exclure `_next/static`, `_next/image`, `favicon.ico` du matcher.

### Reste à faire
- [ ] Vider le cache Hostinger manuellement après chaque déploiement majeur (hPanel → Dashboard → Clear cache)
- [ ] Configurer Resend avec le domaine `ach-tech.com` (vérification DNS) pour utiliser `noreply@ach-tech.com` comme expéditeur
- [ ] Tester le formulaire de contact en production (envoi réel de devis)
- [ ] Configurer email professionnel `info@ach-tech.com` (hPanel → Emails)
- [ ] Scanner performance mobile (Hostinger Performance → Run speed test)

---

## 🎨 Design & Fonctionnalités

### Sections implémentées
- **Navbar** : logo transparent, liens, tel 0491 64 91 96, CTA "Devis gratuit"
- **Hero** : photo intérieure + Ken Burns, typographie éditoriale, badge rotatif, compteurs animés
- **Values** : accordéon 2 colonnes (stats + FAQ expandable)
- **Brands** : marquee partenaires (Viessmann, Grohe, Buderus, Vaillant, Ideal Standard, Porcelanosa, Roca, Daikin, Atlantic, De Dietrich)
- **Services** : grille 3 cartes avec photos thématiques
- **Guarantees** : bento grid (grande carte + cartes secondaires + CTA)
- **Realizations** : éventail 6 cartes cliquables (photos Pexels/Unsplash)
- **Reviews** : carrousel avis clients
- **ContactForm** : formulaire validé, honeypot, rate limiter, Resend
- **Footer** : édito grand nom + liens légaux + coordonnées + RGPD

### Fonctionnalités techniques
- Grain cinématique global (CSS SVG filter)
- Film grain overlay
- Curseur custom orange
- Progress bar scroll
- Loader avec logo et animation glow
- Cookie consent RGPD

---

## 🔧 Décisions Techniques Importantes

| Décision | Raison |
|---|---|
| Next.js 16.x | Compatibilité Hostinger LiteSpeed, supérieur à 15 pour Passenger |
| `output: 'standalone'` retiré | Non nécessaire avec Passenger standard |
| `server.js` custom obligatoire | Passenger cherche ce fichier (`PassengerStartupFile`) |
| Headers exclure `/_next/static` | Causa le 503 sur Hostinger — fix Kodee |
| Resend pour emails | API simple, 100 emails/jour gratuits, pas de serveur SMTP |
| Pexels photos locales | Plus fiables que Unsplash pour les assets critiques |
| Sharp pour compression | -95% sur les images, script réutilisable |
| `framer-motion` | Animations premium compatibles SSR Next.js |

---

## 📝 Infos de Configuration (sans secrets)

- **Domaine** : ach-tech.com
- **Hébergeur** : Hostinger Sites Web (LiteSpeed + Passenger)
- **Dépôt GitHub** : github.com/lcsdmrb/Ach-tech (branche `main`)
- **Auto-deploy** : activé (push → build → deploy automatique)
- **Email contact** : info@ach-tech.com
- **Service email** : Resend (clé API dans hPanel → Environment Variables)
- **Node.js** : v20.x (LTS)
- **Stack** : Next.js 16, React 19, TypeScript, Tailwind CSS 3, Framer Motion 12

### Variables d'environnement à configurer (hPanel)
```
NEXT_PUBLIC_SITE_URL=https://ach-tech.com
RESEND_API_KEY=[dans hPanel seulement - ne jamais commiter]
CONTACT_TO_EMAIL=info@ach-tech.com
CONTACT_FROM_EMAIL=onboarding@resend.dev  (passer à noreply@ach-tech.com après vérif DNS)
NODE_ENV=production
```

---

## 📋 Checklist Post-Déploiement

- [x] Site accessible sur tous navigateurs
- [x] Logo affiché correctement (sans fond noir)
- [x] Photos hero et réalisations affichées
- [x] SSL actif (https)
- [x] CDN actif
- [ ] Tester formulaire de contact (envoi email réel)
- [ ] Vérifier mentions légales accessibles `/mentions-legales`
- [ ] Tester sur mobile (iPhone Safari + Android Chrome)
- [ ] Scanner vitesse mobile (Hostinger Performance)
- [ ] Configurer Resend avec domaine ach-tech.com
- [ ] Relecture pages légales par juriste belge

---

*Document généré le 22 juin 2026 — à mettre à jour au fil des évolutions du site.*
