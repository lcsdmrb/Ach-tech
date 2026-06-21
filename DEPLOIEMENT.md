# Guide de déploiement — Ach'Tech sur Vercel (gratuit)

## Pourquoi Vercel ?

- **Gratuit** pour un site vitrine (plan Hobby, 100 GB/mois de bande passante)
- Créé par l'équipe Next.js — compatibilité parfaite
- SSL automatique (Let's Encrypt) — HTTPS sans configuration
- CDN mondial (vitesse optimale depuis la Belgique)
- Domaine custom gratuit (`ach-tech.com`)
- Déploiement automatique à chaque `git push`

---

## Étape 1 — Préparer le dépôt GitHub

1. Créer un compte GitHub si vous n'en avez pas : https://github.com
2. Créer un nouveau dépôt (privé recommandé) : **ach-tech-site**
3. Dans le terminal, depuis le dossier du projet :

```bash
git init  # si pas encore initialisé
git add .
git commit -m "feat: site Ach'Tech prêt pour déploiement"
git remote add origin https://github.com/VOTRE_USERNAME/ach-tech-site.git
git push -u origin main
```

---

## Étape 2 — Créer un compte Vercel

1. Aller sur https://vercel.com
2. Cliquer **Sign Up** → choisir **Continue with GitHub**
3. Autoriser Vercel à accéder à vos dépôts GitHub

---

## Étape 3 — Déployer le projet

1. Sur Vercel, cliquer **Add New Project**
2. Sélectionner votre dépôt **ach-tech-site**
3. Framework : **Next.js** (détecté automatiquement)
4. Cliquer **Deploy** — le premier déploiement prend ~2 minutes

---

## Étape 4 — Configurer les variables d'environnement

Dans Vercel → votre projet → **Settings → Environment Variables** :

| Nom | Valeur | Environnement |
|-----|--------|---------------|
| `NEXT_PUBLIC_SITE_URL` | `https://ach-tech.com` | Production |
| `RESEND_API_KEY` | `re_votre_cle_api` | Production |
| `CONTACT_TO_EMAIL` | `info@ach-tech.com` | Production |
| `CONTACT_FROM_EMAIL` | `noreply@ach-tech.com` | Production |
| `NODE_ENV` | `production` | Production |

> ⚠️ Ne jamais mettre ces valeurs dans le code ou Git.

Après avoir ajouté les variables → **Redeploy** (Deployments → kebab menu → Redeploy).

---

## Étape 5 — Connecter le domaine ach-tech.com

1. Vercel → votre projet → **Settings → Domains**
2. Taper `ach-tech.com` → Add
3. Vercel vous donne des valeurs DNS à configurer :

### Chez votre registraire de domaine (ex. Hostinger Domains) :

| Type | Nom | Valeur |
|------|-----|--------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

4. Attendez la propagation DNS (5 à 30 minutes)
5. Vercel génère automatiquement le certificat SSL Let's Encrypt ✅

---

## Étape 6 — Configurer Resend pour l'envoi d'emails

1. Créer un compte sur https://resend.com (gratuit : 100 emails/jour)
2. **API Keys** → créer une clé → copier dans `RESEND_API_KEY` (Vercel)
3. **Domains** → ajouter `ach-tech.com` → suivre les instructions DNS
4. Une fois le domaine vérifié, changer `CONTACT_FROM_EMAIL` en `noreply@ach-tech.com`

---

## Déploiements futurs

Chaque `git push` sur la branche `main` déclenche automatiquement un redéploiement sur Vercel. Aucune action manuelle nécessaire.

```bash
# Workflow habituel
git add .
git commit -m "fix: ..."
git push origin main
# → Vercel déploie automatiquement en ~1 minute
```

---

## Vérifications post-déploiement

- [ ] https://ach-tech.com répond en HTTPS (cadenas vert)
- [ ] https://www.ach-tech.com redirige vers https://ach-tech.com
- [ ] Formulaire de contact envoie bien un email
- [ ] Pages légales accessibles : /mentions-legales, /politique-de-confidentialite, /cgu
- [ ] Bandeau cookies s'affiche au premier chargement
- [ ] Logo sans fond noir dans la navbar
- [ ] Images chargent correctement (réalisations, hero)

---

## Plan Vercel — Limites du plan gratuit

| Ressource | Limite gratuite |
|-----------|----------------|
| Bande passante | 100 GB/mois |
| Fonctions serverless (API /contact) | 100 000 invocations/mois |
| Timeout fonction | 10 secondes |
| Domaines custom | Illimité |
| Projets | Illimité |
| Déploiements | Illimité |

Pour un site vitrine de chauffagiste, ces limites sont largement suffisantes.

---

## Alternative VPS (si besoin futur)

Si vous souhaitez passer sur un VPS (plus de contrôle, volumes importants) :

1. Réactiver `output: 'standalone'` dans `next.config.mjs`
2. VPS recommandé : **Hostinger VPS KVM 1** (4-5€/mois) ou **Hetzner CX22** (4€/mois)
3. Les configurations Nginx + PM2 + Certbot sont disponibles sur demande

---

*Guide rédigé le 21 juin 2026 — valide pour Next.js 16.x et Vercel Hobby plan*
