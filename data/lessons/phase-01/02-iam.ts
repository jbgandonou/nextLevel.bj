import { Lesson } from '../../types';

export const iam: Lesson = {
  id: 'p1-iam',
  phaseId: 'phase-01',
  title: 'Gestion des identités et des accès (IAM)',
  content: `
## Introduction à l'IAM

La gestion des identités et des accès (Identity and Access Management - IAM) est un pilier fondamental de la cybersécurité. Elle répond à deux questions essentielles : **Qui êtes-vous ?** (authentification) et **Que pouvez-vous faire ?** (autorisation). L'IAM est omniprésent dans l'examen Security+ et dans la pratique quotidienne de la sécurité.

## Authentification

L'authentification vérifie l'identité d'un utilisateur ou d'un système. Elle repose sur un ou plusieurs **facteurs d'authentification** :

**Les 5 facteurs :**
- **Quelque chose que vous savez** : mot de passe, PIN, question secrète
- **Quelque chose que vous avez** : carte à puce, token matériel, téléphone (SMS, application)
- **Quelque chose que vous êtes** : biométrie (empreinte digitale, reconnaissance faciale, iris)
- **Quelque part où vous êtes** : géolocalisation, adresse IP
- **Quelque chose que vous faites** : dynamique de frappe, comportement utilisateur

**Protocoles d'authentification :**
- **Kerberos** : protocole d'authentification réseau basé sur des tickets. Utilisé dans Active Directory.
  - KDC (Key Distribution Center) émet des TGT (Ticket Granting Tickets)
  - Authentification mutuelle, pas de transmission de mots de passe en clair
- **LDAP / LDAPS** : protocole d'annuaire pour interroger et modifier les services d'annuaire
- **RADIUS** : authentification centralisée pour l'accès réseau (Wi-Fi, VPN)
- **TACACS+** : similaire à RADIUS mais chiffre l'intégralité du paquet (utilisé par Cisco)

## Authentification Multi-Facteurs (MFA)

Le MFA exige **au moins deux facteurs différents** pour s'authentifier. C'est l'une des mesures les plus efficaces contre le vol d'identifiants.

**Méthodes MFA courantes :**
- **TOTP (Time-based One-Time Password)** : codes à 6 chiffres générés toutes les 30 secondes (Google Authenticator, Authy)
- **HOTP (HMAC-based OTP)** : codes basés sur un compteur
- **Push notifications** : validation sur une application mobile (Microsoft Authenticator, Duo)
- **Clés matérielles FIDO2/WebAuthn** : YubiKey, Titan Key — résistantes au phishing
- **SMS/Appel** : considéré comme le moins sécurisé (vulnérable au SIM swapping)

\`\`\`
Hiérarchie de sécurité MFA (du plus au moins sécurisé) :
1. Clé matérielle FIDO2 (phishing-resistant)
2. Application TOTP / Push notification
3. SMS / Appel téléphonique
\`\`\`

## Autorisation et modèles de contrôle d'accès

Une fois authentifié, l'autorisation détermine **les ressources accessibles** et **les actions permises**.

**Modèles de contrôle d'accès :**
- **RBAC (Role-Based Access Control)** : les permissions sont attribuées à des rôles, les utilisateurs sont assignés à des rôles. Le plus courant en entreprise.
- **ABAC (Attribute-Based Access Control)** : décisions basées sur des attributs (utilisateur, ressource, environnement, action). Plus flexible que RBAC.
- **MAC (Mandatory Access Control)** : contrôle imposé par le système basé sur des étiquettes de classification (Confidentiel, Secret, Top Secret). Utilisé dans le militaire.
- **DAC (Discretionary Access Control)** : le propriétaire de la ressource contrôle les accès (ex : permissions fichiers Linux).
- **Rule-Based Access Control** : accès basé sur des règles prédéfinies (ex : règles de firewall).

\`\`\`
Exemple RBAC :
Rôle "Analyste SOC" → Permissions :
  ✓ Lire les logs de sécurité
  ✓ Créer des incidents
  ✗ Modifier les règles de firewall
  ✗ Accéder aux données RH
\`\`\`

**Principe du moindre privilège (Least Privilege)** : chaque utilisateur ne doit avoir que les droits strictement nécessaires à ses fonctions.

**Séparation des tâches (Separation of Duties)** : aucune personne ne doit pouvoir accomplir seule une action critique (ex : celui qui demande un paiement ne peut pas l'approuver).

## SSO (Single Sign-On)

Le SSO permet à un utilisateur de s'authentifier **une seule fois** pour accéder à plusieurs applications.

**Avantages :**
- Réduction de la fatigue des mots de passe
- Centralisation de la gestion des accès
- Facilité de révocation (un seul compte à désactiver)

**Risques :**
- Point de défaillance unique : si le compte SSO est compromis, toutes les applications sont exposées
- Nécessite impérativement le MFA

## OAuth 2.0 et OpenID Connect

**OAuth 2.0** est un framework d'**autorisation** (pas d'authentification). Il permet à une application tierce d'accéder à des ressources au nom d'un utilisateur sans partager ses identifiants.

**Flux OAuth 2.0 (Authorization Code) :**
1. L'utilisateur est redirigé vers le serveur d'autorisation
2. Il s'authentifie et consent au partage de données
3. Un code d'autorisation est retourné à l'application
4. L'application échange ce code contre un **access token**
5. L'access token est utilisé pour accéder aux ressources protégées

**OpenID Connect (OIDC)** est une couche d'**authentification** construite sur OAuth 2.0. Il ajoute un **ID token** (JWT) contenant les informations d'identité de l'utilisateur.

\`\`\`
OAuth 2.0 = "Cette application peut accéder à vos photos Google"
OIDC      = "Connectez-vous avec votre compte Google"
\`\`\`

**SAML (Security Assertion Markup Language)** : standard XML pour le SSO en entreprise. Plus ancien qu'OIDC, encore très répandu.

## Gestion du cycle de vie des identités

- **Provisioning** : création de comptes et attribution des droits
- **Review** : revue périodique des accès (attestation)
- **Deprovisioning** : désactivation/suppression lors du départ d'un employé
- **Accounts de service** : comptes non-humains pour les applications, nécessitent une gestion spécifique des secrets
`,
  keyPoints: [
    'L\'authentification repose sur 5 facteurs : savoir, avoir, être, localisation et comportement. Le MFA combine au moins deux facteurs différents.',
    'Les clés FIDO2/WebAuthn sont les méthodes MFA les plus résistantes au phishing. Le SMS est le moins sécurisé.',
    'RBAC est le modèle de contrôle d\'accès le plus courant en entreprise ; MAC est utilisé dans les contextes militaires et gouvernementaux.',
    'OAuth 2.0 gère l\'autorisation, OpenID Connect ajoute l\'authentification. SAML est le standard SSO XML en entreprise.',
    'Le principe du moindre privilège et la séparation des tâches sont des contrôles fondamentaux de l\'IAM.',
    'Le cycle de vie des identités (provisioning, review, deprovisioning) est critique pour maintenir une posture de sécurité saine.',
  ],
  resources: [
    {
      title: 'CompTIA Security+ SY0-701 - Identity and Access Management (Professor Messer)',
      url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/identity-and-access-management-overview/',
      type: 'video',
    },
    {
      title: 'OAuth 2.0 Simplified (Aaron Parecki)',
      url: 'https://www.oauth.com/',
      type: 'article',
    },
    {
      title: 'NIST SP 800-63 - Digital Identity Guidelines',
      url: 'https://pages.nist.gov/800-63-3/',
      type: 'article',
    },
  ],
  estimatedMinutes: 25,
};
