# Sécurité — Ach'Tech

Ce document décrit les mesures de sécurité appliquées au site vitrine Ach'Tech.  
Dernière mise à jour : 2026-06-21

---

## Stack technique

| Composant | Version |
|-----------|---------|
| Next.js   | 16.x (App Router, standalone output) |
| React     | 19.x |
| Node.js   | ≥ 20 LTS |
| Email     | Resend SDK (serverless API route) |

---

## 1. Gestion des secrets

- **Aucun secret hardcodé** dans le code source.
- Toutes les clés sensibles (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`) sont lues via `process.env`.
- Le fichier `.env.local` est exclu du contrôle de version via `.gitignore`.
- `.env.example` contient uniquement des **placeholders** non fonctionnels.
- L'historique Git a été vérifié : aucun secret n'a jamais été commité.

### Variables d'environnement requises

```
NEXT_PUBLIC_SITE_URL=https://ach-tech.com
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=info@ach-tech.com
CONTACT_FROM_EMAIL=noreply@ach-tech.com
NODE_ENV=production
```

---

## 2. En-têtes de sécurité HTTP

Configurés dans `next.config.mjs` et appliqués à toutes les routes (`source: '/(.*)'`) :

| En-tête | Valeur | Protection |
|---------|--------|-----------|
| `Content-Security-Policy` | voir ci-dessous | XSS, injection de contenu |
| `X-Frame-Options` | `DENY` | Clickjacking |
| `X-Content-Type-Options` | `nosniff` | MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Fuite d'URL |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` | APIs sensibles désactivées |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | HTTPS forcé |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolation des fenêtres |
| `Cross-Origin-Resource-Policy` | `same-site` | Vol de ressources |
| `Cross-Origin-Embedder-Policy` | `require-corp` (prod) | Isolation mémoire Spectre |

### Content Security Policy (production)

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
font-src 'self' data:;
img-src 'self' data: blob: https://images.unsplash.com https://picsum.photos;
connect-src 'self';
media-src 'self';
object-src 'none';
frame-src 'none';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests;
```

> **Note** : `'unsafe-inline'` pour `script-src` est requis par le mécanisme d'hydratation de Next.js.  
> Une implémentation basée sur des nonces réduirait ce risque mais complexifie significativement le déploiement.

---

## 3. Protection CSRF

L'endpoint `POST /api/contact` vérifie l'en-tête `Origin` (ou `Referer`) contre une liste blanche :

```
https://ach-tech.com
https://www.ach-tech.com
```

Toute requête provenant d'un autre domaine reçoit un `403 Forbidden`.  
La liste peut être étendue via la variable `NEXT_PUBLIC_SITE_URL`.

---

## 4. Protection contre les injections et XSS

Appliqué dans `app/api/contact/route.ts` :

- **Sanitisation** de tous les champs : suppression balises HTML, encodage des caractères spéciaux (`<`, `>`, `"`, `'`, `` ` ``).
- **Limite de taille** : 2 000 caractères max par champ.
- **Validation email** : regex côté serveur.
- **Validation des champs requis** : prénom, nom, email, service.
- Aucune requête SQL ou NoSQL — pas de risque d'injection SQL (site statique + API Route uniquement).

---

## 5. Protection anti-bot

- **Honeypot** : champ caché `_trap` dans le formulaire. Si rempli, la requête est ignorée silencieusement (réponse `200` pour ne pas alerter le bot).
- **Rate limiting** (en mémoire) : 3 requêtes maximum par adresse IP par tranche de 60 secondes. Au-delà : `429 Too Many Requests`.

> ⚠️ Le rate limiter actuel est en mémoire et se reset au redémarrage du serveur.  
> Pour une production multi-instance, envisager Redis ou un middleware comme `@upstash/ratelimit`.

---

## 6. HTTPS et certificat SSL

- En-tête HSTS configuré (`max-age=63072000; includeSubDomains; preload`).
- Sur le VPS Hostinger : certificat Let's Encrypt via Certbot (voir Phase 4).
- Redirection automatique HTTP → HTTPS à configurer dans Nginx.

---

## 7. Dépendances et vulnérabilités

- Next.js mis à jour vers la dernière version stable lors de l'audit.
- `npm audit` lancé après chaque déploiement.
- 2 vulnérabilités modérées résiduelles dans `postcss` (dépendance interne de Next.js) — aucune action possible sans casser le framework.
- Aucune vulnérabilité dans les dépendances directes du projet.

**Commande à relancer périodiquement :**
```bash
npm audit
npm outdated
```

---

## 8. Authentification et sessions

Ce site **n'a pas de zone d'authentification**. Aucune gestion de session, cookie de session, ou mot de passe utilisateur.

---

## 9. Signalement de vulnérabilités

Si vous découvrez une vulnérabilité de sécurité, veuillez contacter :  
**info@ach-tech.com** — objet : `[SECURITY]`

Ne divulguez pas publiquement la vulnérabilité avant qu'elle ait été corrigée.

---

## 10. Checklist de déploiement sécurisé

- [ ] Variables d'environnement définies sur le VPS (jamais commitées)
- [ ] HTTPS actif avec certificat valide
- [ ] HTTP redirige vers HTTPS (Nginx)
- [ ] `NODE_ENV=production` défini
- [ ] Ports non utilisés fermés (firewall UFW)
- [ ] Accès SSH par clé uniquement (désactiver mot de passe)
- [ ] `npm audit` relancé sur le serveur
- [ ] Logs applicatifs configurés (PM2 ou systemd)
