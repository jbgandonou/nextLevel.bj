import { Lesson } from '../../types';

export const cloudSecurity: Lesson = {
  id: 'p1-cloud-security',
  phaseId: 'phase-01',
  title: 'Sécurité cloud et virtualisation',
  content: `
## Introduction à la sécurité cloud

Le cloud computing a transformé la manière dont les organisations déploient et gèrent leurs infrastructures. Cependant, cette transformation s'accompagne de défis de sécurité spécifiques. Pour le Security+ SY0-701, il est essentiel de comprendre les modèles de service, les responsabilités partagées, les vulnérabilités courantes du cloud et les contrôles de sécurité appropriés.

## Modèles de service cloud en détail

### IaaS (Infrastructure as a Service)

Le fournisseur fournit l'infrastructure de base : serveurs, stockage, réseau. Le client gère tout ce qui se trouve au-dessus : OS, middleware, applications, données.

**Exemples :** AWS EC2, Azure Virtual Machines, Google Compute Engine

**Responsabilités du client :**
- Installation et configuration de l'OS
- Patching des systèmes d'exploitation
- Configuration des pare-feu (Security Groups)
- Gestion des accès et des identités
- Chiffrement des données

### PaaS (Platform as a Service)

Le fournisseur gère l'infrastructure ET la plateforme (OS, runtime, middleware). Le client se concentre sur ses applications et ses données.

**Exemples :** AWS Elastic Beanstalk, Azure App Service, Google App Engine, Heroku

**Responsabilités du client :**
- Code de l'application et ses dépendances
- Configuration de la plateforme
- Gestion des données et des accès
- Sécurité de l'application elle-même

### SaaS (Software as a Service)

Le fournisseur gère tout : infrastructure, plateforme et application. Le client consomme l'application.

**Exemples :** Microsoft 365, Salesforce, Google Workspace, Dropbox

**Responsabilités du client :**
- Configuration des accès utilisateurs
- Protection des données saisies
- Paramètres de sécurité de l'application
- Formation des utilisateurs

### XaaS (Anything as a Service)

Terme englobant toutes les variantes : FaaS (Function), DaaS (Desktop), SECaaS (Security), BaaS (Backup), etc.

## Modèle de responsabilité partagée - Détail par type de service

\`\`\`
                    IaaS          PaaS          SaaS
                 ──────────    ──────────    ──────────
 Données         │ CLIENT │    │ CLIENT │    │ CLIENT │
                 ├────────┤    ├────────┤    ├────────┤
 Applications    │ CLIENT │    │ CLIENT │    │FOURNIS.│
                 ├────────┤    ├────────┤    ├────────┤
 Runtime         │ CLIENT │    │FOURNIS.│    │FOURNIS.│
                 ├────────┤    ├────────┤    ├────────┤
 Middleware      │ CLIENT │    │FOURNIS.│    │FOURNIS.│
                 ├────────┤    ├────────┤    ├────────┤
 OS              │ CLIENT │    │FOURNIS.│    │FOURNIS.│
                 ├────────┤    ├────────┤    ├────────┤
 Virtualisation  │FOURNIS.│    │FOURNIS.│    │FOURNIS.│
                 ├────────┤    ├────────┤    ├────────┤
 Serveurs        │FOURNIS.│    │FOURNIS.│    │FOURNIS.│
                 ├────────┤    ├────────┤    ├────────┤
 Réseau/Stockage │FOURNIS.│    │FOURNIS.│    │FOURNIS.│
                 ├────────┤    ├────────┤    ├────────┤
 Datacenter      │FOURNIS.│    │FOURNIS.│    │FOURNIS.│
                 └────────┘    └────────┘    └────────┘
\`\`\`

**Point critique Security+ :** Quel que soit le modèle, le client est **toujours** responsable de la classification et de la protection de ses données, de la gestion des identités et de la conformité réglementaire.

## Identité cloud et contrôle d'accès

### Identité fédérée

La fédération d'identité permet aux utilisateurs de s'authentifier auprès de services cloud en utilisant les identifiants de leur organisation. Les protocoles courants sont :

- **SAML 2.0** : standard pour le SSO d'entreprise (XML-based)
- **OpenID Connect** : couche d'authentification sur OAuth 2.0 (JSON-based)
- **WS-Federation** : utilisé dans les environnements Microsoft

\`\`\`
Flux d'authentification fédérée (SAML) :

Utilisateur → Application Cloud (SP)
                    │
                    │ Redirection vers l'IdP
                    ▼
            Identity Provider (IdP)
            (Active Directory, Okta)
                    │
                    │ Authentification réussie
                    │ Assertion SAML signée
                    ▼
            Application Cloud (SP)
            → Accès autorisé
\`\`\`

### CASB (Cloud Access Security Broker)

Un **CASB** est un point de contrôle entre les utilisateurs et les services cloud. Il offre une visibilité et un contrôle sur l'utilisation du cloud.

**Fonctions principales :**
- **Visibilité** : découverte du Shadow IT (services cloud non autorisés)
- **Conformité** : vérification des politiques de sécurité dans le cloud
- **Protection des données** : DLP (Data Loss Prevention) pour les données cloud
- **Protection contre les menaces** : détection des comportements anormaux

**Modes de déploiement :**
- **Forward proxy** : intercepte le trafic vers le cloud (agent sur les endpoints)
- **Reverse proxy** : placé devant l'application cloud (sans agent)
- **API-based** : se connecte directement aux API des services cloud (hors bande)

**Question type Security+ :** *Votre organisation découvre que des employés utilisent des services cloud non autorisés pour stocker des données de l'entreprise. Quelle solution permet de détecter et contrôler cette situation ?*
→ Réponse : Un CASB (Cloud Access Security Broker).

## Sécurité du stockage cloud

### Chiffrement des données

| Type | Description | Contrôle des clés |
|------|-------------|-------------------|
| **SSE-S3** (AWS) | Chiffrement côté serveur avec clés gérées par le fournisseur | Fournisseur |
| **SSE-KMS** | Chiffrement avec clés gérées par le client via KMS | Client (via service) |
| **SSE-C** | Chiffrement avec clés fournies par le client | Client (complet) |
| **Côté client** | Chiffrement avant l'envoi au cloud | Client (complet) |

**Chiffrement au repos (at rest) :** Les données stockées sont chiffrées sur les disques du fournisseur. AES-256 est le standard.

**Chiffrement en transit :** Les données en mouvement sont protégées par TLS 1.2 ou 1.3. Toute communication avec les API cloud doit utiliser HTTPS.

### Permissions au niveau des objets

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mon-bucket-sensible/*",
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
\`\`\`

Cette politique S3 refuse tout accès aux objets si la connexion n'utilise pas HTTPS (SecureTransport).

## Réseau cloud

### VPC (Virtual Private Cloud)

Un VPC est un réseau virtuel isolé dans le cloud, permettant un contrôle complet sur l'adressage IP, le routage et les règles de sécurité.

\`\`\`
┌─────────────────────── VPC (10.0.0.0/16) ───────────────────────┐
│                                                                   │
│  ┌─── Sous-réseau public (10.0.1.0/24) ───┐                     │
│  │  ┌──────────┐  ┌──────────┐             │  Internet Gateway   │
│  │  │ Serveur  │  │   NAT    │             │◄──────────────────► │
│  │  │   Web    │  │ Gateway  │             │      Internet       │
│  │  └──────────┘  └──────────┘             │                     │
│  └─────────────────────────────────────────┘                     │
│                                                                   │
│  ┌─── Sous-réseau privé (10.0.2.0/24) ────┐                     │
│  │  ┌──────────┐  ┌──────────┐             │                     │
│  │  │ Serveur  │  │  Base de │             │  Pas d'accès        │
│  │  │  App     │  │ données  │             │  direct à Internet  │
│  │  └──────────┘  └──────────┘             │                     │
│  └─────────────────────────────────────────┘                     │
└───────────────────────────────────────────────────────────────────┘
\`\`\`

### Contrôles réseau cloud

| Contrôle | Niveau | Stateful ? | Description |
|----------|--------|-----------|-------------|
| **Security Groups** | Instance/Interface | Oui (stateful) | Pare-feu virtuel au niveau de l'instance |
| **NACLs** | Sous-réseau | Non (stateless) | Règles entrantes/sortantes au niveau du sous-réseau |
| **VPC Peering** | VPC à VPC | - | Connexion directe entre deux VPC |
| **Transit Gateway** | Multi-VPC | - | Hub central pour connecter plusieurs VPC et réseaux on-premises |

**Point Security+ :** Les Security Groups sont **stateful** (si le trafic entrant est autorisé, la réponse sortante l'est automatiquement). Les NACLs sont **stateless** (il faut explicitement autoriser le trafic dans les deux sens).

## Outils de sécurité cloud natifs

### AWS

- **GuardDuty** : détection de menaces intelligente basée sur le machine learning (analyse des logs VPC Flow, DNS, CloudTrail)
- **Security Hub** : tableau de bord centralisé de la posture de sécurité
- **Inspector** : scan de vulnérabilités des instances EC2 et images de conteneurs
- **Macie** : découverte et classification des données sensibles dans S3
- **CloudTrail** : journalisation de toutes les actions API (audit)

### Azure

- **Microsoft Defender for Cloud** : gestion de la posture de sécurité cloud (CSPM) et protection des charges de travail
- **Sentinel** : SIEM cloud natif avec capacités SOAR
- **Policy** : gouvernance et conformité des ressources Azure
- **Key Vault** : gestion centralisée des clés et des secrets

### GCP

- **Security Command Center** : tableau de bord centralisé de sécurité
- **Chronicle** : SIEM cloud pour la détection et l'investigation
- **Cloud Armor** : protection DDoS et WAF
- **BeyondCorp** : implémentation Zero Trust de Google

## Conformité cloud

| Framework | Description | Applicable à |
|-----------|-------------|-------------|
| **CSA STAR** | Évaluation de la sécurité des fournisseurs cloud | Fournisseurs cloud |
| **FedRAMP** | Autorisation de sécurité pour le gouvernement américain | Cloud pour le gouvernement US |
| **SOC 2** | Audit des contrôles de sécurité, disponibilité, intégrité | Tout fournisseur de services |
| **ISO 27017** | Extension de l'ISO 27001 pour le cloud | Fournisseurs et clients cloud |
| **RGPD** | Protection des données personnelles (UE) | Toute organisation traitant des données EU |

**Question type Security+ :** *Quel framework permet d'évaluer la posture de sécurité d'un fournisseur cloud avant de lui confier des données ?*
→ Réponse : CSA STAR (Cloud Security Alliance - Security, Trust, Assurance, and Risk).

## Vulnérabilités cloud courantes

### Buckets S3 mal configurés

L'une des vulnérabilités cloud les plus fréquentes : des buckets S3 (ou équivalent) configurés avec un accès public non intentionnel.

\`\`\`bash
# Vérifier si un bucket est public (AWS CLI)
aws s3api get-bucket-acl --bucket mon-bucket
aws s3api get-public-access-block --bucket mon-bucket

# Bloquer tout accès public sur un bucket
aws s3api put-public-access-block --bucket mon-bucket \\
  --public-access-block-configuration \\
  BlockPublicAcls=true,IgnorePublicAcls=true,\\
  BlockPublicPolicy=true,RestrictPublicBuckets=true
\`\`\`

**Cas réels :** Des expositions massives de données ont résulté de buckets S3 publics (données de santé, informations clients, logs d'applications).

### Autres vulnérabilités fréquentes

- **API exposées sans authentification** : endpoints d'API cloud accessibles sans contrôle d'accès
- **Fonctions serverless avec permissions excessives** : une Lambda avec un rôle administrateur complet
- **Secrets dans les variables d'environnement** : clés API stockées en clair dans les configurations
- **Métadonnées d'instance accessibles** : l'endpoint 169.254.169.254 peut exposer des credentials IAM (attaque SSRF)

## Sécurité des conteneurs - Approfondissement

### Cycle de vie sécurisé des conteneurs

\`\`\`
Build Time                    Run Time
──────────                    ────────
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  Image   │→ │  Scan    │→ │ Registry │→ │ Runtime  │
│  Build   │  │ Vulnéra- │  │ Sécurisé │  │Protection│
│          │  │ bilités  │  │          │  │          │
│ Dockerfile│ │ Trivy,   │  │ Signature│  │ Falco,   │
│ Multi-   │  │ Clair,   │  │ d'images │  │ Sysdig   │
│ stage    │  │ Snyk     │  │ Notary   │  │          │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
\`\`\`

### Bonnes pratiques

- **Images minimales** : utiliser des images de base comme Alpine ou distroless pour réduire la surface d'attaque
- **Scan d'images** : intégrer le scan dans le pipeline CI/CD (Trivy, Clair, Anchore)
- **Registry privé** : héberger les images dans un registre privé avec authentification
- **Signature d'images** : vérifier l'intégrité et l'origine avec Docker Content Trust ou cosign
- **Immutabilité** : ne jamais modifier un conteneur en production, reconstruire l'image
- **Limites de ressources** : configurer des limites CPU/mémoire pour prévenir le déni de service
- **Security context** : exécuter en tant que non-root, filesystem en lecture seule, pas de privilege escalation

## Forensique cloud

La forensique dans le cloud présente des défis uniques :

**Défis :**
- **Volatilité** : les instances peuvent être éphémères (auto-scaling, serverless)
- **Multi-tenancy** : les preuves sont mélangées avec celles d'autres clients
- **Juridiction** : les données peuvent être stockées dans différents pays
- **Accès limité** : pas d'accès physique aux serveurs du fournisseur
- **Logs distribués** : les journaux proviennent de nombreuses sources différentes

**Stratégies :**
- Activer la journalisation complète dès le départ (CloudTrail, VPC Flow Logs, Access Logs)
- Utiliser des snapshots de disques et de mémoire pour préserver les preuves
- Mettre en place une politique de rétention des logs adaptée
- Documenter la chaîne de possession des preuves numériques

## Multi-tenancy et isolation des données

En cloud public, plusieurs clients partagent la même infrastructure physique. L'isolation est assurée par :

- **Isolation réseau** : VPC, VLAN, micro-segmentation
- **Isolation de calcul** : hyperviseurs, conteneurs, sandboxing
- **Isolation des données** : chiffrement par client, clés distinctes
- **Isolation logique** : RBAC, politiques IAM, comptes séparés

**Risque résiduel :** Des attaques side-channel (Spectre, Meltdown) ont démontré que l'isolation logique peut être contournée au niveau matériel. Les charges de travail ultra-sensibles peuvent nécessiter des instances dédiées (dedicated hosts).

## Migration cloud et considérations de sécurité

### Stratégies de migration (les 6 R)

- **Rehost** (lift-and-shift) : migration directe sans modification. Risque : les vulnérabilités on-premises sont transportées dans le cloud.
- **Replatform** : adaptations mineures pour tirer profit du cloud. Opportunité d'améliorer la sécurité.
- **Refactor** : réécriture pour une architecture cloud-native. Meilleure sécurité mais coût plus élevé.
- **Repurchase** : remplacement par une solution SaaS.
- **Retain** : maintien on-premises pour les systèmes inadaptés au cloud.
- **Retire** : décommissionnement des systèmes obsolètes.

### SLA et vendor lock-in

- **SLA (Service Level Agreement)** : garanties de disponibilité, performance et support. Vérifier les clauses de compensation et les exclusions.
- **Vendor lock-in** : dépendance excessive envers un fournisseur. Mitigations : standards ouverts, multi-cloud, abstraction des services propriétaires, portabilité des données.

**Question type Security+ :** *Lors d'une migration vers le cloud, quel est le risque principal d'une stratégie lift-and-shift ?*
→ Réponse : Les vulnérabilités et les mauvaises configurations existantes sont transférées dans le cloud sans être corrigées.
`,
  keyPoints: [
    'Les trois modèles de service cloud (IaaS, PaaS, SaaS) définissent des niveaux croissants de responsabilité pour le fournisseur, mais le client reste toujours responsable de ses données et de la gestion des identités.',
    'Un CASB (Cloud Access Security Broker) offre visibilité et contrôle sur l\'utilisation du cloud, incluant la détection du Shadow IT et la prévention des fuites de données.',
    'Les Security Groups sont stateful (le retour est automatique) tandis que les NACLs sont stateless (il faut configurer les règles dans les deux sens).',
    'Les buckets S3 mal configurés avec un accès public sont l\'une des vulnérabilités cloud les plus courantes et les plus exploitées.',
    'Les outils cloud natifs (GuardDuty, Defender, Security Command Center) fournissent une détection des menaces spécifique à chaque plateforme cloud.',
    'La sécurité des conteneurs couvre tout le cycle de vie : images minimales, scan de vulnérabilités, registre privé, signature d\'images et protection runtime.',
    'La forensique cloud est compliquée par la volatilité des instances, le multi-tenancy, les questions de juridiction et l\'accès limité à l\'infrastructure physique.',
    'Le CSA STAR est le framework de référence pour évaluer la posture de sécurité d\'un fournisseur cloud.',
  ],
  resources: [
    {
      title: 'CompTIA Security+ SY0-701 - Cloud Security (Professor Messer)',
      url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/cloud-security/',
      type: 'video',
    },
    {
      title: 'CSA - Cloud Security Alliance - Security Guidance',
      url: 'https://cloudsecurityalliance.org/research/guidance/',
      type: 'article',
    },
    {
      title: 'AWS Well-Architected Framework - Security Pillar',
      url: 'https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html',
      type: 'article',
    },
    {
      title: 'NIST SP 800-144 - Guidelines on Security and Privacy in Cloud Computing',
      url: 'https://csrc.nist.gov/publications/detail/sp/800-144/final',
      type: 'article',
    },
  ],
  estimatedMinutes: 40,
};
