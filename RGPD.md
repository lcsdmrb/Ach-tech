# Conformité RGPD — Ach'Tech

> ⚠️ **Ce document ne remplace pas une relecture par un professionnel du droit.**  
> Les mesures décrites ci-dessous constituent un point de départ sérieux mais une validation  
> par un avocat ou juriste spécialisé RGPD/droit belge est recommandée avant mise en production.

Dernière mise à jour : 2026-06-21

---

## 1. Responsable du traitement

**Ach'Tech** — entreprise individuelle belge  
TVA : BE1022.715.243  
Contact DPO : info@ach-tech.com *(le gérant remplit le rôle de responsable du traitement)*

---

## 2. Registre des traitements (Article 30 RGPD)

| Traitement | Finalité | Base légale | Durée | Sous-traitants |
|-----------|---------|------------|-------|---------------|
| Formulaire de contact/devis | Répondre aux demandes de devis et établir des contrats de service | Exécution d'un précontrat (art. 6.1.b) + Intérêt légitime (art. 6.1.f) | 3 ans max | Resend, Hostinger |
| Logs serveur (IP) | Sécurité, détection de fraude | Intérêt légitime (art. 6.1.f) | 30 jours | Hostinger |
| Cookie de consentement | Mémoriser les préférences cookies | Intérêt légitime / nécessité technique | 12 mois | Aucun (localStorage) |

---

## 3. Mesures de conformité appliquées

### 3.1 Cookies et traceurs
- [x] **Bandeau de consentement** conforme créé (`components/CookieBanner.tsx`)
  - Refus aussi simple que l'acceptation (deux boutons de même importance visuelle)
  - Aucun cookie non essentiel déposé avant consentement
  - Le seul cookie déposé (`achtech_cookie_consent`) est techniquement nécessaire au bandeau
- [x] **Lien "Gérer les cookies"** dans le pied de page (efface le consentement et rouvre le bandeau)
- [x] Polices Outfit **auto-hébergées** via `next/font/google` → aucune requête vers fonts.googleapis.com
- [x] Aucun script de tracking (Google Analytics, Meta Pixel, etc.) présent sur le site
- [x] Aucune vidéo YouTube ou autre iframe tiers embarqué

### 3.2 Pages légales
- [x] **Mentions légales** : `/mentions-legales` — identité, TVA, hébergeur, propriété intellectuelle
- [x] **Politique de confidentialité** : `/politique-de-confidentialite` — conforme Art. 13 RGPD
- [x] **CGU** : `/cgu` — objet, propriété intellectuelle, limitation de responsabilité, droit belge
- [x] Liens vers ces pages dans le **pied de page** de toutes les pages du site

### 3.3 Formulaire de contact
- [x] Mention d'information présente dans le formulaire (finalité, lien vers politique)
- [x] Principe de **minimisation** : seuls les champs nécessaires à l'établissement d'un devis
- [x] Pas de case newsletter pré-cochée (aucune newsletter sur ce site)
- [x] Honeypot anti-bot pour éviter le spam

### 3.4 Sécurité des données (Art. 32 RGPD)
- [x] Transmission chiffrée via HTTPS (HSTS configuré)
- [x] Données de contact reçues par email (Resend) — pas de stockage en base de données
- [x] Accès restreint : seul le gérant de Ach'Tech reçoit les demandes de devis
- [x] Rate limiting sur l'API de contact (3 req/min)
- [x] Sanitisation de tous les inputs côté serveur

---

## 4. Droits des personnes (Art. 15-22 RGPD)

Les utilisateurs peuvent exercer leurs droits par email à **info@ach-tech.com**.

### Procédure interne à suivre :

1. **Réception de la demande** → accuser réception dans les 5 jours ouvrables.
2. **Vérification de l'identité** → demander une preuve d'identité si nécessaire (pas systématiquement).
3. **Traitement** → localiser les données dans la boîte email, effectuer l'action demandée.
4. **Réponse** → dans un délai maximum d'**un mois** (prorogeable de 2 mois si complexité).
5. **Documentation** → noter la demande et la réponse dans un registre interne.

**Délais légaux** :
- Droit d'accès : 1 mois
- Droit à l'effacement : sans délai injustifié
- Droit de rectification : sans délai injustifié

---

## 5. Sous-traitants (Art. 28 RGPD)

| Sous-traitant | Rôle | Localisation | Garanties |
|--------------|------|--------------|-----------|
| **Resend Inc.** | Envoi d'emails transactionnels | États-Unis | CCT + EU-US DPF |
| **Hostinger** | Hébergement VPS | UE (datacenter disponible) | DPA disponible |

> **Action recommandée** : Signer ou vérifier les DPA (Data Processing Agreement) avec Resend et Hostinger.
> - Resend DPA : https://resend.com/dpa
> - Hostinger DPA : disponible dans l'espace client Hostinger

---

## 6. Notification de violation de données (Art. 33-34 RGPD)

En cas de violation de données personnelles (piratage, fuite, perte) :

1. **Évaluer** le risque pour les personnes concernées.
2. Si risque probable → notifier l'**APD belge** dans les **72 heures** : https://www.autoriteprotectiondonnees.be/violations-de-donnees
3. Si risque élevé → informer également les **personnes concernées** sans délai.
4. Documenter l'incident dans un registre interne.

---

## 7. Points nécessitant une action humaine / validation juridique

- [ ] **Validation juridique** des pages Mentions légales, CGU et Politique de confidentialité par un avocat belge.
- [ ] **Signature des DPA** avec Resend et Hostinger.
- [ ] **Vérification de la forme juridique exacte** de Ach'Tech (indépendant, SRL, etc.) pour les mentions légales.
- [ ] Si Ach'Tech traite des données de plus de 250 personnes/an → tenir un registre formel des traitements.
- [ ] Si expansion vers des cookies analytics → ajouter les finalités et granularité dans le bandeau.

---

## 8. Contact APD Belge

**Autorité de Protection des Données (APD)**  
Rue de la Presse 35, 1000 Bruxelles  
📧 contact@apd-gba.be  
🌐 https://www.autoriteprotectiondonnees.be  
📞 +32 2 274 48 00
