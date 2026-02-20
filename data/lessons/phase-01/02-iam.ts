import { Lesson } from '../../types';

export const iam: Lesson = {
  id: 'p1-iam',
  phaseId: 'phase-01',
  title: 'Gestion des identites et des acces (IAM)',
  content: `
## Introduction a l'IAM

La gestion des identites et des acces (Identity and Access Management - IAM) est un pilier fondamental de la cybersecurite. Elle repond a deux questions essentielles : **Qui etes-vous ?** (authentification) et **Que pouvez-vous faire ?** (autorisation). L'IAM est omniprésent dans l'examen Security+ SY0-701 et dans la pratique quotidienne de la securite.

L'IAM couvre un spectre large : des protocoles d'authentification reseau (Kerberos, RADIUS) aux standards modernes de federation (OAuth 2.0, SAML), en passant par la biometrie, les politiques de mots de passe et la gouvernance des identites.

---

## 1. Les facteurs d'authentification

L'authentification verifie l'identite d'un utilisateur ou d'un systeme. Elle repose sur un ou plusieurs **facteurs d'authentification** :

| Facteur | Description | Exemples | Forces | Faiblesses |
|---|---|---|---|---|
| **Quelque chose que vous savez** | Connaissance | Mot de passe, PIN, question secrete | Simple, pas de materiel | Phishing, brute force, oubli |
| **Quelque chose que vous avez** | Possession | Carte a puce, token, telephone | Difficile a voler a distance | Vol physique, SIM swapping |
| **Quelque chose que vous etes** | Inherence | Empreinte, iris, visage, voix | Unique, difficile a falsifier | Faux positifs/negatifs, non revocable |
| **Quelque part ou vous etes** | Localisation | Geolocalisation, IP source | Contextuel | VPN, spoofing GPS |
| **Quelque chose que vous faites** | Comportement | Dynamique de frappe, demarche | Transparent pour l'utilisateur | Variabilite, stade experimental |

> **Point Security+ :** Le MFA (Multi-Factor Authentication) exige au moins **deux facteurs differents**. Deux mots de passe = un seul facteur (savoir). Un mot de passe + un code TOTP sur telephone = deux facteurs (savoir + avoir).

---

## 2. Protocoles d'authentification reseau

### Kerberos - Flux detaille

Kerberos est le protocole d'authentification par defaut de **Windows Active Directory**. Il fonctionne avec un systeme de **tickets** et n'envoie jamais le mot de passe sur le reseau.

**Composants :**
- **KDC (Key Distribution Center)** : serveur central qui comprend l'AS et le TGS
- **AS (Authentication Service)** : authentifie l'utilisateur et delivre le TGT
- **TGS (Ticket Granting Service)** : delivre des tickets de service
- **TGT (Ticket Granting Ticket)** : ticket initial prouvant l'identite
- **Service Ticket (ST)** : ticket pour acceder a un service specifique

\`\`\`
Flux Kerberos complet :

Utilisateur                    KDC (AS + TGS)              Serveur de fichiers
     |                              |                              |
     |  1. AS-REQ                   |                              |
     |  (username, timestamp        |                              |
     |   chiffre avec hash du MDP)  |                              |
     |----------------------------->|                              |
     |                              |                              |
     |  2. AS-REP                   |                              |
     |  (TGT chiffre avec cle      |                              |
     |   du KDC + cle de session    |                              |
     |   chiffree avec hash MDP)   |                              |
     |<-----------------------------|                              |
     |                              |                              |
     |  3. TGS-REQ                  |                              |
     |  (TGT + authenticator +      |                              |
     |   nom du service demande)    |                              |
     |----------------------------->|                              |
     |                              |                              |
     |  4. TGS-REP                  |                              |
     |  (Service Ticket chiffre     |                              |
     |   avec cle du serveur +      |                              |
     |   cle de session service)    |                              |
     |<-----------------------------|                              |
     |                              |                              |
     |  5. AP-REQ                                                  |
     |  (Service Ticket + authenticator)                           |
     |------------------------------------------------------------>|
     |                                                             |
     |  6. AP-REP (optionnel - authentification mutuelle)          |
     |<------------------------------------------------------------|
     |                                                             |
     |  === Acces accorde ===                                      |
\`\`\`

**Points cles Kerberos pour Security+ :**
- Utilise le **port 88** (TCP/UDP)
- Base sur le **chiffrement symetrique** (AES-256 par defaut dans les AD modernes)
- Les TGT ont une duree de vie limitee (par defaut 10 heures)
- Vulnerable aux attaques : **Kerberoasting** (extraction de tickets de service pour cracking offline), **Golden Ticket** (forge de TGT avec la cle du compte krbtgt), **Pass-the-Ticket** (reutilisation de tickets voles)
- Necessite une **synchronisation horaire** stricte (tolerance de 5 minutes par defaut)

### NTLM vs Kerberos

| Critere | NTLM | Kerberos |
|---|---|---|
| Generation | Ancien (Windows NT) | Moderne (Active Directory) |
| Mecanisme | Challenge-response (hash NTLMv2) | Tickets via KDC |
| Authentification mutuelle | **Non** | **Oui** |
| Delegation | Non | Oui (delegation Kerberos) |
| Securite | Faible (Pass-the-Hash, relay NTLM) | Forte (mais vulnerable au Kerberoasting) |
| Dependance | Aucune | Necessite un KDC et DNS fonctionnels |
| Utilisation actuelle | Fallback quand Kerberos echoue | **Standard par defaut dans AD** |
| Port | 445 (SMB), 389 (LDAP) | 88 |

> **Point Security+ :** NTLM devrait etre desactive autant que possible. Il est conserve pour la compatibilite avec les anciens systemes. Les attaques Pass-the-Hash et NTLM Relay sont des vecteurs majeurs d'attaque dans les environnements AD.

### Protocoles d'authentification distante

| Protocole | Description | Chiffrement | Port | Utilisation |
|---|---|---|---|---|
| **PAP** | Password Authentication Protocol - MDP en clair | **Aucun** | Variable | **Deprecie**, jamais en production |
| **CHAP** | Challenge-Handshake - challenge-response avec hash | Hash du MDP (pas en clair) | Variable | PPP, VPN legacy |
| **MS-CHAPv2** | Version Microsoft de CHAP | Hash NT | Variable | PPTP VPN (vulnerable) |
| **EAP** | Extensible Authentication Protocol - framework | Depend de la methode | Variable | Wi-Fi 802.1X, VPN |
| **PEAP** | Protected EAP - tunnel TLS + EAP interieur | **TLS tunnel** | Variable | Wi-Fi entreprise (courant) |
| **EAP-TLS** | EAP avec certificats client et serveur | **TLS mutuel** | Variable | Wi-Fi haute securite |
| **EAP-TTLS** | EAP avec tunnel TLS (certificat serveur seul) | **TLS tunnel** | Variable | Wi-Fi entreprise |

\`\`\`
Hierarchie de securite des protocoles d'authentification :

  EAP-TLS (certificats mutuels) ← Le plus securise
     |
  PEAP / EAP-TTLS (tunnel TLS + credentials)
     |
  CHAP / MS-CHAPv2 (challenge-response)
     |
  PAP (mot de passe en clair) ← Le moins securise, JAMAIS utiliser
\`\`\`

### RADIUS vs TACACS+

| Critere | RADIUS | TACACS+ |
|---|---|---|
| Standard | RFC 2865 (ouvert) | Proprietaire Cisco (ouvert depuis) |
| Transport | UDP (1812/1813) | TCP (49) |
| Chiffrement | Mot de passe uniquement | **Paquet entier** |
| AAA | Combine Authentication + Authorization | **Separe** Auth, Authz et Accounting |
| Utilisation | Wi-Fi, VPN, acces reseau general | **Administration des equipements reseau** |
| Granularite | Moins granulaire | Controle commande par commande |

> **Point Security+ :** RADIUS est pour l'acces reseau (utilisateurs Wi-Fi, VPN). TACACS+ est pour l'administration des equipements (routeurs, switches). TACACS+ chiffre TOUT le paquet, RADIUS ne chiffre que le mot de passe.

---

## 3. Authentification 802.1X

802.1X est un standard de **controle d'acces reseau (NAC)** qui authentifie les appareils avant de leur accorder l'acces au reseau (filaire ou Wi-Fi).

\`\`\`
Flux 802.1X :

Supplicant              Authenticator           Authentication Server
(Client Wi-Fi)          (Point d'acces/Switch)  (Serveur RADIUS)
     |                        |                        |
     |-- EAPOL-Start -------->|                        |
     |                        |                        |
     |<- EAP-Request/Identity-|                        |
     |                        |                        |
     |-- EAP-Response/Identity->                       |
     |                        |-- RADIUS Access-Req -->|
     |                        |                        |
     |                        |<- RADIUS Access-      |
     |                        |   Challenge ----------|
     |<- EAP-Request --------|                        |
     |                        |                        |
     |-- EAP-Response ------>|                        |
     |                        |-- RADIUS Access-Req -->|
     |                        |                        |
     |                        |<- RADIUS Access-      |
     |                        |   Accept -------------|
     |<- EAP-Success --------|                        |
     |                        |                        |
     | === PORT OUVERT ===    |                        |
     | (acces reseau accorde) |                        |
\`\`\`

**Composants 802.1X :**
- **Supplicant** : logiciel client qui demande l'acces (integre dans l'OS)
- **Authenticator** : point d'acces Wi-Fi ou switch qui controle l'acces physique
- **Authentication Server** : serveur RADIUS (FreeRADIUS, Microsoft NPS)

---

## 4. Federation et SSO

### Concepts de federation

La federation permet a des organisations differentes de partager l'authentification via des **relations de confiance**.

| Composant | Role | Exemple |
|---|---|---|
| **IdP (Identity Provider)** | Fournit l'identite et authentifie l'utilisateur | Azure AD, Okta, Google |
| **SP (Service Provider)** | Application qui fait confiance a l'IdP | Salesforce, Slack, AWS |
| **Trust Relationship** | Accord entre IdP et SP (echange de metadonnees, certificats) | Configuration SAML/OIDC |
| **Assertion/Token** | Preuve d'identite emise par l'IdP | SAML Assertion, JWT |

### SAML 2.0

SAML (Security Assertion Markup Language) est un standard **XML** pour le SSO en entreprise.

\`\`\`
Flux SAML (SP-initiated) :

Utilisateur          SP (Salesforce)         IdP (Azure AD)
     |                     |                       |
     |-- Acces Salesforce ->|                       |
     |                     |-- Redirect SAML AuthnRequest -->|
     |                     |                       |
     |<----------- Redirect vers page de login IdP ----------|
     |                                             |
     |-- Credentials (login/MDP) ----------------->|
     |                                             |
     |<-- SAML Response (Assertion signee XML) ----|
     |     contenant : identite, attributs,        |
     |     conditions de validite, signature       |
     |                                             |
     |-- POST SAML Response -->|                   |
     |                         |                   |
     |<-- Acces accorde -------|                   |
\`\`\`

### OAuth 2.0 - Flux detailles

OAuth 2.0 est un framework d'**autorisation** (pas d'authentification). Il permet a une application tierce d'acceder a des ressources au nom d'un utilisateur.

#### Flux Authorization Code (le plus courant et securise)

\`\`\`
Utilisateur     Client App        Authorization Server    Resource Server
     |               |                    |                      |
     |-- Clic "Login with Google" ->      |                      |
     |               |                    |                      |
     |<-- Redirect vers /authorize -------|                      |
     |    ?response_type=code             |                      |
     |    &client_id=xxx                  |                      |
     |    &redirect_uri=https://app/cb    |                      |
     |    &scope=profile email            |                      |
     |    &state=random123                |                      |
     |                                    |                      |
     |-- Login + consentement ----------->|                      |
     |                                    |                      |
     |<-- Redirect vers /callback --------|                      |
     |    ?code=AUTH_CODE&state=random123  |                      |
     |                                    |                      |
     |--- code envoyé au Client App -->   |                      |
     |               |                    |                      |
     |               |-- POST /token ---->|                      |
     |               |   code=AUTH_CODE   |                      |
     |               |   client_secret=yyy|                      |
     |               |                    |                      |
     |               |<-- access_token ---|                      |
     |               |    refresh_token   |                      |
     |               |                    |                      |
     |               |-- GET /api/user ---|--------------------->|
     |               |   Authorization:   |                      |
     |               |   Bearer <token>   |                      |
     |               |                    |                      |
     |               |<-- Donnees utilisateur -------------------|
\`\`\`

#### Autres flux OAuth 2.0

| Flux | Description | Cas d'usage | Securite |
|---|---|---|---|
| **Authorization Code** | Code echange contre token (backend) | Applications web server-side | **Le plus securise** |
| **Authorization Code + PKCE** | Code + code_verifier/code_challenge | Applications mobiles et SPA | **Recommande pour mobile/SPA** |
| **Implicit** | Token retourne directement dans l'URL | **Deprecie** | Faible (token expose dans l'URL) |
| **Client Credentials** | Application s'authentifie directement (pas d'utilisateur) | Communication machine-to-machine | Bon (pas d'utilisateur implique) |
| **Resource Owner Password** | Username/password envoyes directement | **Deprecie** | Faible (credentials exposees a l'app) |

> **Point Security+ :** PKCE (Proof Key for Code Exchange, prononce "pixie") est essentiel pour les applications mobiles et SPA car elles ne peuvent pas garder un client_secret confidentiel.

### JWT (JSON Web Token)

JWT est le format de token utilise par OpenID Connect et souvent par OAuth 2.0.

\`\`\`
Structure JWT : header.payload.signature

HEADER (Base64URL) :
{
  "alg": "RS256",        ← Algorithme de signature
  "typ": "JWT",          ← Type de token
  "kid": "key-id-123"    ← ID de la cle de signature
}

PAYLOAD (Base64URL) :
{
  "sub": "user123",      ← Sujet (identifiant utilisateur)
  "name": "Jean Dupont", ← Nom de l'utilisateur
  "email": "jean@ex.com",← Email
  "iss": "https://auth.example.com",  ← Emetteur
  "aud": "app-client-id",             ← Audience (application)
  "iat": 1700000000,     ← Issued At (timestamp)
  "exp": 1700003600,     ← Expiration (1 heure)
  "scope": "profile email"            ← Permissions
}

SIGNATURE :
RS256(
  base64url(header) + "." + base64url(payload),
  cle_privee_du_serveur
)
\`\`\`

**Securite JWT :**
- Toujours verifier la signature avant de faire confiance au contenu
- Verifier les claims : exp (expiration), iss (emetteur), aud (audience)
- Ne JAMAIS utiliser alg: "none" (attaque de desactivation de signature)
- Preferer RS256 (asymetrique) a HS256 (symetrique) pour les tokens partages

### OpenID Connect (OIDC)

OIDC est une couche d'**authentification** construite sur OAuth 2.0.

\`\`\`
OAuth 2.0 = "Cette application peut acceder a vos photos Google" (AUTORISATION)
OIDC      = "Connectez-vous avec votre compte Google" (AUTHENTIFICATION)

OAuth 2.0 delivre un access_token (opaque, pour acceder aux ressources)
OIDC ajoute un id_token (JWT, contient l'identite de l'utilisateur)
\`\`\`

---

## 5. Services d'annuaire

### LDAP (Lightweight Directory Access Protocol)

LDAP est le protocole standard pour interroger et modifier les annuaires (Active Directory, OpenLDAP).

| Aspect | Detail |
|---|---|
| Port | 389 (LDAP), **636 (LDAPS - chiffre TLS)** |
| Structure | Arborescence hierarchique (DIT - Directory Information Tree) |
| Format | DN (Distinguished Name) : CN=Jean Dupont,OU=IT,DC=example,DC=com |
| Operations | Bind (auth), Search, Add, Modify, Delete, Compare |
| Securite | LDAPS (port 636) ou StartTLS (port 389 puis upgrade) |

\`\`\`
Exemple de DN LDAP :
CN=Jean Dupont,OU=Informatique,OU=Departements,DC=entreprise,DC=fr

CN = Common Name (nom de l'objet)
OU = Organizational Unit (unite organisationnelle)
DC = Domain Component (composant du domaine)
\`\`\`

### Active Directory (AD)

Active Directory est l'implementation Microsoft des services d'annuaire, base sur LDAP et Kerberos.

**Composants AD essentiels :**
- **Domaine** : unite administrative de base (ex: entreprise.local)
- **Foret** : ensemble de domaines partageant un schema et un catalogue global
- **OU (Organizational Unit)** : conteneur pour organiser les objets (utilisateurs, groupes, ordinateurs)
- **GPO (Group Policy Object)** : politiques appliquees aux OU (politiques de mots de passe, restrictions logicielles)
- **Domain Controller (DC)** : serveur hebergeant l'AD et le KDC Kerberos

---

## 6. Modeles de controle d'acces

| Modele | Principe | Qui decide | Exemple | Utilisation |
|---|---|---|---|---|
| **DAC** | Le proprietaire controle les acces | Proprietaire de la ressource | Permissions fichiers Linux (chmod) | Systemes d'exploitation |
| **MAC** | Etiquettes de classification imposees par le systeme | Administrateur systeme / politique | Top Secret > Secret > Confidentiel | Militaire, gouvernemental |
| **RBAC** | Permissions attribuees a des roles | Administrateur | Role "Analyste SOC" → lire les logs | **Le plus courant en entreprise** |
| **ABAC** | Decisions basees sur des attributs multiples | Politiques | Si departement=RH ET heure=9h-18h ET localisation=bureau ALORS acces | Cloud (AWS IAM), applications complexes |
| **Rule-based** | Regles predefinies par l'administrateur | Regles automatiques | Regles de firewall, ACLs | Equipements reseau |

\`\`\`
Exemple ABAC - Politique d'acces :

SI :
  - utilisateur.departement = "Finance"
  - utilisateur.niveau_habilitation >= 3
  - ressource.classification <= "Confidentiel"
  - environnement.heure ENTRE 08:00 ET 19:00
  - environnement.localisation = "Reseau_interne"
ALORS :
  AUTORISER l'acces en lecture
SINON :
  REFUSER et journaliser la tentative
\`\`\`

**Principes fondamentaux :**
- **Moindre privilege (Least Privilege)** : chaque utilisateur n'a que les droits strictement necessaires
- **Separation des taches (Separation of Duties)** : aucune personne ne peut accomplir seule une action critique
- **Need-to-know** : l'acces aux informations n'est accorde qu'a ceux qui en ont besoin pour leur travail
- **Implicit deny** : tout ce qui n'est pas explicitement autorise est refuse

---

## 7. Types de comptes et risques

| Type de compte | Description | Risques | Bonnes pratiques |
|---|---|---|---|
| **Utilisateur standard** | Compte personnel d'un employe | Phishing, credentials volees | MFA, moindre privilege |
| **Administrateur** | Droits eleves sur les systemes | Cible privilegiee, impact maximal | Comptes separes (admin vs quotidien), PAM |
| **Service** | Compte non-humain pour les applications | Mots de passe rarement changes, pas de MFA | Mots de passe longs, rotation automatique, managed service accounts |
| **Partage** | Compte utilise par plusieurs personnes | **Pas de responsabilite individuelle**, audit impossible | **Eliminer autant que possible** |
| **Invite** | Acces temporaire et limite | Droits excessifs oublies, pas de suivi | Expiration automatique, acces minimal |
| **Par defaut** | Comptes preconfigures (admin, root, sa) | Mots de passe connus, cibles d'attaque | **Renommer ou desactiver immediatement** |
| **Privilegié** | Root, Domain Admin, etc. | Mouvement lateral, compromission totale | PAM, JIT access, surveillance renforcee |

> **Point Security+ :** Les comptes partages sont une violation du principe de responsabilite individuelle (accountability). Les comptes par defaut doivent etre desactives ou renommes car leurs credentials sont publiquement connues.

---

## 8. Privileged Access Management (PAM)

Le PAM gere et securise les acces privilegies (administrateurs, comptes root, service accounts).

**Fonctionnalites PAM :**
- **Coffre-fort de mots de passe (Password Vault)** : stockage securise et rotation automatique des mots de passe privilegies
- **Session recording** : enregistrement video/texte de toutes les sessions administratives
- **Just-In-Time (JIT) access** : les droits d'administrateur ne sont accordes que temporairement, pour une tache specifique
- **Elevation de privileges** : les utilisateurs demandent des droits eleves via un workflow d'approbation
- **Break-glass accounts** : comptes d'urgence scelles, utilises uniquement en cas de crise (audit de chaque utilisation)

**Solutions courantes :** CyberArk, BeyondTrust, Delinea (Thycotic), HashiCorp Vault

---

## 9. Politiques de mots de passe

| Parametre | Recommandation NIST SP 800-63B | Recommandation traditionnelle |
|---|---|---|
| Longueur minimale | **8 caracteres (14+ recommandes)** | 8 caracteres |
| Complexite | **Non obligatoire** si longueur suffisante | Majuscules + minuscules + chiffres + speciaux |
| Expiration | **Pas d'expiration periodique** (sauf compromission) | 60-90 jours |
| Historique | Empecher la reutilisation | 12-24 mots de passe memorises |
| Verrouillage | Apres N tentatives echouees | 3-5 tentatives, verrouillage 15-30 min |
| Verification | Comparer contre les listes de MDP compromis | Non |

> **Point Security+ :** Le NIST a change ses recommandations ! Plus d'expiration periodique obligatoire, plus de complexite forcee. L'accent est mis sur la **longueur** (passphrases), le **MFA** et la verification contre les listes de mots de passe compromis (Have I Been Pwned).

---

## 10. Authentification sans mot de passe (Passwordless)

### FIDO2 / WebAuthn

FIDO2 est le standard d'authentification sans mot de passe, resistant au phishing.

\`\`\`
Flux FIDO2/WebAuthn :

ENREGISTREMENT :
1. Le serveur envoie un challenge aleatoire
2. L'authenticator (cle USB, telephone) genere une paire de cles asymetriques
3. La cle privee reste dans l'authenticator (jamais transmise)
4. La cle publique + attestation sont envoyees au serveur
5. Le serveur stocke la cle publique

AUTHENTIFICATION :
1. Le serveur envoie un challenge + credential ID
2. L'utilisateur deverrouille l'authenticator (biometrie, PIN)
3. L'authenticator signe le challenge avec la cle privee
4. Le serveur verifie la signature avec la cle publique
\`\`\`

**Passkeys :**
- Evolution de FIDO2, synchronisee entre les appareils (iCloud Keychain, Google Password Manager)
- Remplace le mot de passe par une cle cryptographique
- Resistant au phishing car lie au domaine (origin binding)
- Adopte par Apple, Google, Microsoft

### Biometrie

| Metrique | Description | Signification |
|---|---|---|
| **FAR (False Acceptance Rate)** | Taux de faux positifs | Frequence a laquelle un imposteur est accepte a tort |
| **FRR (False Rejection Rate)** | Taux de faux negatifs | Frequence a laquelle un utilisateur legitime est rejete a tort |
| **CER / EER (Crossover Error Rate)** | Point ou FAR = FRR | **Mesure globale de precision** - plus le CER est bas, meilleur est le systeme |

\`\`\`
Graphique conceptuel FAR/FRR :

Taux d'erreur
     ^
     |  FRR \\          / FAR
     |       \\        /
     |        \\      /
     |         \\    /
     |          \\  /
     |           \\/  ← CER (Crossover Error Rate)
     |           /\\
     |          /  \\
     +-----|---|---|-------> Sensibilite du capteur
         Laxiste  Stricte

Sensibilite laxiste → FAR eleve (trop d'acceptations)
Sensibilite stricte → FRR eleve (trop de rejets)
CER = point d'equilibre optimal
\`\`\`

**Types de biometrie pour Security+ :**
- **Empreinte digitale** : le plus courant, bon equilibre cout/precision
- **Reconnaissance faciale** : pratique (smartphone), vulnerable aux photos/masques
- **Scan de l'iris** : tres precis, couteux
- **Scan retinien** : le plus precis mais intrusif
- **Reconnaissance vocale** : pratique mais vulnerable aux enregistrements/deepfakes
- **Geometrie de la main** : ancien, remplace par d'autres methodes

> **Point Security+ :** La biometrie ne peut pas etre revoquee. Si votre empreinte digitale est compromise, vous ne pouvez pas en "generer une nouvelle". C'est pourquoi la biometrie doit toujours etre combinee avec un autre facteur.

---

## 11. Identity Governance and Administration (IGA)

L'IGA couvre la gouvernance du cycle de vie des identites :

| Phase | Description | Actions |
|---|---|---|
| **Provisioning** | Creation de comptes et attribution des droits | Automatise via SCIM, connecteurs AD/LDAP |
| **Joiner** | Nouvel employe | Compte cree, droits selon le role, equipement configure |
| **Mover** | Changement de poste | Revue des droits, suppression des anciens, ajout des nouveaux |
| **Leaver** | Depart de l'employe | Desactivation immediate, revocation des acces, archivage |
| **Access Review** | Revue periodique des acces | Certification par les managers (trimestrielle/annuelle) |
| **Access Recertification** | Confirmation que les acces sont toujours necessaires | Les managers attestent ou revoquent |

**Concepts cles :**
- **Role mining** : analyse des acces existants pour definir des roles RBAC
- **SoD (Separation of Duties)** : regles empechant les combinaisons de roles incompatibles
- **Orphan accounts** : comptes sans proprietaire identifie → risque de securite majeur
- **Privilege creep** : accumulation progressive de droits au fil des changements de poste → necessite des revues regulieres

---

## 12. Scenarios pratiques Security+

**Scenario 1 :** *Un utilisateur signale qu'il peut acceder a des fichiers du departement Finance alors qu'il travaille aux RH. Que s'est-il passe ?*
→ Probablement du **privilege creep** : l'utilisateur a change de poste et ses anciens droits n'ont pas ete revoques. Solution : effectuer une **revue d'acces** (access review), appliquer le processus **Mover** (revoquer les anciens droits, attribuer les nouveaux).

**Scenario 2 :** *Votre entreprise veut deployer le Wi-Fi pour 500 employes de maniere securisee. Quelle architecture ?*
→ **802.1X avec PEAP-MSCHAPv2** (ou EAP-TLS pour une securite maximale). Composants : supplicant sur les postes, points d'acces comme authenticators, serveur RADIUS (Microsoft NPS ou FreeRADIUS) comme authentication server, lie a Active Directory.

**Scenario 3 :** *Un auditeur decouvre 47 comptes de service avec des mots de passe qui n'ont pas change depuis 3 ans. Quelle recommandation ?*
→ Deployer une solution **PAM** (CyberArk ou equivalent) pour la rotation automatique des mots de passe des comptes de service. Utiliser des **Managed Service Accounts (MSA)** dans Active Directory quand possible. Chaque compte de service doit avoir un proprietaire identifie.

**Scenario 4 :** *Un employe a ete licencie ce matin. Quelles actions immediates ?*
→ Desactivation immediate du compte AD (pas suppression pour conserver les logs). Revocation de tous les tokens d'acces et sessions actives. Revocation des acces VPN, cloud, applications SaaS. Recuperation du materiel (laptop, cles, badges). Changement des mots de passe des comptes partages auxquels il avait acces.
`,
  keyPoints: [
    'Kerberos utilise un systeme de tickets (TGT + Service Tickets) via le KDC. Il ne transmet jamais le mot de passe sur le reseau. Vulnerable au Kerberoasting et Golden Ticket.',
    'NTLM est un protocole ancien et vulnerable (Pass-the-Hash, relay) qui doit etre desactive au profit de Kerberos dans les environnements Active Directory.',
    'EAP-TLS (certificats mutuels) est la methode 802.1X la plus securisee. PEAP encapsule EAP dans un tunnel TLS. PAP transmet le mot de passe en clair et ne doit jamais etre utilise.',
    'OAuth 2.0 est un framework d\'autorisation (access tokens), OIDC ajoute l\'authentification (id_token JWT). SAML est le standard XML pour le SSO en entreprise.',
    'FIDO2/WebAuthn et les passkeys sont resistants au phishing grace au origin binding. La biometrie se mesure par FAR, FRR et CER (point d\'equilibre optimal).',
    'Le PAM (Privileged Access Management) securise les comptes privilegies avec le JIT access, les coffres-forts de mots de passe et l\'enregistrement des sessions.',
    'Le NIST SP 800-63B recommande des mots de passe longs sans expiration periodique, avec verification contre les listes de mots de passe compromis et MFA obligatoire.',
    'Le cycle de vie des identites (Joiner/Mover/Leaver) et les revues d\'acces regulieres sont essentiels pour prevenir le privilege creep et les comptes orphelins.',
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
      title: 'NIST SP 800-63B - Digital Identity Guidelines (Authentication)',
      url: 'https://pages.nist.gov/800-63-3/sp800-63b.html',
      type: 'article',
    },
    {
      title: 'FIDO Alliance - Passkeys Documentation',
      url: 'https://fidoalliance.org/passkeys/',
      type: 'article',
    },
  ],
  estimatedMinutes: 45,
};
