# 🚀 Guide de démarrage — Site Ach'Tech

Pas de panique ! Suivez ces étapes dans l'ordre, une par une.

---

## ÉTAPE 1 — Installer Node.js (une seule fois)

1. Allez sur https://nodejs.org
2. Téléchargez la version **LTS** (bouton vert)
3. Installez-le en cliquant "Suivant" jusqu'à la fin
4. Redémarrez votre ordinateur

---

## ÉTAPE 2 — Ouvrir le dossier du site dans un terminal

1. Ouvrez le dossier `C:\Users\demie\Desktop\Ach'tech` dans l'explorateur Windows
2. Dans la barre d'adresse en haut, tapez `cmd` et appuyez sur Entrée
3. Un terminal noir s'ouvre dans le bon dossier ✅

---

## ÉTAPE 3 — Installer les dépendances du site

Dans le terminal, tapez exactement ceci et appuyez sur Entrée :

```
npm install
```

Attendez que ça se termine (quelques minutes). Vous verrez beaucoup de texte défiler, c'est normal.

---

## ÉTAPE 4 — Configurer les emails (pour recevoir les devis)

### 4a. Créer un compte Resend (gratuit)
1. Allez sur https://resend.com
2. Cliquez "Sign Up", créez un compte gratuit
3. Allez dans **"API Keys"** (menu de gauche)
4. Cliquez **"Create API Key"**, donnez un nom (ex: "achtech"), copiez la clé

### 4b. Créer le fichier de configuration
1. Dans le dossier du site, créez un fichier nommé exactement `.env.local`
   (pas `.env.local.txt`, juste `.env.local`)
2. Ouvrez-le avec le Bloc-notes et collez-y ceci en adaptant vos infos :

```
RESEND_API_KEY=re_VotreCléCopiéeIci
CONTACT_TO_EMAIL=votre-email@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

3. Sauvegardez et fermez

> ⚠️ Sur le plan gratuit Resend, gardez `CONTACT_FROM_EMAIL=onboarding@resend.dev`.
> Vous pourrez mettre votre propre email plus tard en vérifiant votre domaine.

---

## ÉTAPE 5 — Ajouter votre logo

Copiez votre fichier logo (nommé `logo.png`) dans :
```
C:\Users\demie\Desktop\Ach'tech\public\logo.png
```

---

## ÉTAPE 6 — Lancer le site en local (pour tester)

Dans le terminal, tapez :
```
npm run dev
```

Puis ouvrez votre navigateur et allez sur :
**http://localhost:3000**

Le site est là ! ✅

---

## ÉTAPE 7 — Mettre le site en ligne (optionnel)

### Option la plus simple : Vercel (gratuit)
1. Allez sur https://vercel.com et créez un compte gratuit
2. Glissez-déposez le dossier du site **OU** connectez votre GitHub
3. Dans Vercel, allez dans **Settings → Environment Variables**
4. Ajoutez les 3 variables de votre `.env.local` (RESEND_API_KEY, etc.)
5. Cliquez "Deploy" → votre site est en ligne avec une URL gratuite !

---

## En cas de problème

| Symptôme | Solution |
|---|---|
| `npm: command not found` | Réinstaller Node.js et redémarrer le PC |
| Page blanche | Regarder les messages d'erreur dans le terminal |
| Emails non reçus | Vérifier que `.env.local` existe et que la clé Resend est correcte |
| Logo absent | Vérifier que `public/logo.png` existe |

---

## Raccourcis utiles

| Commande | Action |
|---|---|
| `npm run dev` | Démarrer le site en local |
| `npm run build` | Préparer pour la mise en ligne |
| Ctrl+C dans terminal | Arrêter le serveur |
