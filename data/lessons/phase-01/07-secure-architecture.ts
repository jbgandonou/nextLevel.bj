import { Lesson } from '../../types';

export const secureArchitecture: Lesson = {
  id: 'p1-secure-architecture',
  phaseId: 'phase-01',
  title: 'Architecture sécurisée et principes de conception',
  content: `
## Introduction à l'architecture sécurisée

La conception d'une architecture sécurisée est fondamentale en cybersécurité. Plutôt que d'ajouter la sécurité après coup, une approche **security by design** intègre les contrôles de sécurité dès la phase de conception. Pour le Security+ SY0-701, vous devez maîtriser les principes de conception sécurisée, les architectures réseau défensives, la sécurité cloud et les technologies émergentes comme les conteneurs et les systèmes embarqués.

## Principes de conception sécurisée

Ces principes, issus des travaux de Saltzer et Schroeder, constituent la base théorique de toute architecture sécurisée.

### Défense en profondeur (Defense in Depth)

La défense en profondeur consiste à superposer **plusieurs couches de sécurité** indépendantes. Si une couche est compromise, les autres continuent à protéger le système.

\`\`\`
┌─────────────────────────────────────┐
│          Politiques & Formation     │  ← Couche humaine
│  ┌───────────────────────────────┐  │
│  │      Pare-feu périmétrique    │  │  ← Couche réseau
│  │  ┌─────────────────────────┐  │  │
│  │  │    IDS/IPS + Segments   │  │  │  ← Couche surveillance
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │  Contrôle d'accès │  │  │  │  ← Couche applicative
│  │  │  │  ┌─────────────┐  │  │  │  │
│  │  │  │  │ Chiffrement │  │  │  │  │  ← Couche données
│  │  │  │  └─────────────┘  │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
\`\`\`

**Question type Security+ :** *Votre organisation souhaite protéger ses serveurs critiques. Quelle approche est la plus efficace ?*
→ Réponse : La défense en profondeur, car elle ne repose pas sur un seul point de défaillance.

### Principe du moindre privilège (Least Privilege)

Chaque utilisateur, processus ou service ne doit recevoir que les **permissions minimales** nécessaires à l'accomplissement de sa tâche. Ce principe réduit la surface d'attaque et limite l'impact d'une compromission.

**Exemples concrets :**
- Un développeur n'a pas besoin d'un accès administrateur en production
- Un serveur web ne devrait pas s'exécuter avec les privilèges root
- Les comptes de service doivent avoir des permissions granulaires

### Séparation des tâches (Separation of Duties)

Aucune personne seule ne devrait pouvoir accomplir une action critique de bout en bout. Ce principe prévient la fraude et les erreurs.

- Le développeur qui écrit le code ne devrait pas le déployer en production
- L'administrateur qui crée les comptes ne devrait pas approuver les accès
- En finance : celui qui initie un paiement n'est pas celui qui l'approuve

### Autres principes essentiels

| Principe | Description | Exemple |
|----------|-------------|---------|
| **Fail-safe defaults** | Par défaut, refuser l'accès | Pare-feu : deny all par défaut |
| **Economy of mechanism** | Garder les mécanismes simples | Éviter les règles de pare-feu trop complexes |
| **Complete mediation** | Vérifier chaque accès, à chaque fois | Ne pas se fier uniquement au cache d'authentification |
| **Open design** | La sécurité ne repose pas sur le secret du mécanisme | Algorithmes de chiffrement publics (AES) |
| **Least common mechanism** | Minimiser les ressources partagées | Séparer les bases de données par application |
| **Psychological acceptability** | Les contrôles doivent être acceptables pour les utilisateurs | SSO plutôt que multiples mots de passe |

### Zero Trust Architecture

Le modèle Zero Trust part du principe que **rien n'est fiable par défaut**, même à l'intérieur du réseau. Chaque requête doit être authentifiée, autorisée et chiffrée.

**Principes fondamentaux :**
- Ne jamais faire confiance, toujours vérifier
- Appliquer le moindre privilège de manière dynamique
- Supposer la compromission (assume breach)
- Micro-segmentation du réseau

## Architectures réseau sécurisées

### DMZ (Zone démilitarisée)

La DMZ est un segment réseau isolé qui héberge les services accessibles depuis Internet, tout en protégeant le réseau interne.

\`\`\`
Internet
    │
┌───┴───┐
│  FW1  │  ← Pare-feu externe
└───┬───┘
    │
┌───┴───────────────┐
│       DMZ          │
│  ┌──────┐ ┌─────┐ │
│  │ Web  │ │ Mail│ │
│  │Server│ │Server│ │
│  └──────┘ └─────┘ │
└───────┬───────────┘
    │
┌───┴───┐
│  FW2  │  ← Pare-feu interne
└───┬───┘
    │
┌───┴───────────────┐
│   Réseau interne   │
│  ┌──────┐ ┌─────┐ │
│  │  DB  │ │ App │ │
│  │Server│ │Server│ │
│  └──────┘ └─────┘ │
└────────────────────┘
\`\`\`

### Jump Box / Bastion Host

Un **bastion host** (ou jump box) est un serveur renforcé qui sert de point d'accès unique pour administrer les systèmes dans un réseau sécurisé. Tous les accès administratifs transitent par ce point unique, facilitant l'audit et le contrôle.

**Caractéristiques :**
- Système durci (hardened) avec un minimum de services
- Authentification multifacteur obligatoire
- Journalisation complète de toutes les sessions
- Accès SSH ou RDP uniquement depuis des IP autorisées

### Réseaux air-gapped

Un réseau **air-gapped** est physiquement isolé de tout autre réseau, y compris Internet. Utilisé pour les systèmes les plus critiques.

**Cas d'usage :**
- Systèmes militaires classifiés
- Contrôle de centrales nucléaires (SCADA)
- Traitement de données ultra-sensibles

**Limites :** Des attaques sophistiquées comme Stuxnet ont démontré que l'air-gap peut être contourné (clés USB, signaux électromagnétiques, attaques acoustiques).

## Sécurité cloud

### Modèle de responsabilité partagée

Le modèle de responsabilité partagée définit qui est responsable de quoi entre le fournisseur cloud et le client.

| Composant | IaaS | PaaS | SaaS |
|-----------|------|------|------|
| Données | **Client** | **Client** | **Client** |
| Applications | **Client** | **Client** | Fournisseur |
| Runtime/Middleware | **Client** | Fournisseur | Fournisseur |
| OS | **Client** | Fournisseur | Fournisseur |
| Virtualisation | Fournisseur | Fournisseur | Fournisseur |
| Réseau physique | Fournisseur | Fournisseur | Fournisseur |
| Datacenter | Fournisseur | Fournisseur | Fournisseur |

**Point clé Security+ :** Le client est **toujours** responsable de ses données, quel que soit le modèle de service.

### Comparaison des fournisseurs cloud

| Aspect | AWS | Azure | GCP |
|--------|-----|-------|-----|
| IAM | AWS IAM, Organizations | Azure AD, RBAC | Cloud IAM, Workload Identity |
| Chiffrement | KMS, CloudHSM | Key Vault | Cloud KMS |
| Réseau | VPC, Security Groups | VNet, NSG | VPC, Firewall Rules |
| Conformité | AWS Artifact | Compliance Manager | Compliance Reports |

### Modèles de déploiement cloud

- **Cloud public** : infrastructure partagée entre plusieurs clients (AWS, Azure, GCP). Coût réduit mais contrôle limité.
- **Cloud privé** : infrastructure dédiée à une seule organisation. Contrôle maximal mais coût élevé.
- **Cloud hybride** : combinaison de cloud public et privé. Flexibilité optimale, complexité de gestion accrue.
- **Cloud communautaire** : partagé entre organisations ayant des intérêts communs (secteur de la santé, gouvernement).
- **Multi-cloud** : utilisation de plusieurs fournisseurs cloud pour éviter le vendor lock-in et améliorer la résilience.

## Sécurité de la virtualisation

### Types d'hyperviseurs

| Type | Description | Exemples | Sécurité |
|------|-------------|----------|----------|
| **Type 1 (bare-metal)** | S'exécute directement sur le matériel | VMware ESXi, Hyper-V, Xen | Plus sécurisé, surface d'attaque réduite |
| **Type 2 (hosted)** | S'exécute sur un OS hôte | VirtualBox, VMware Workstation | Moins sécurisé, dépend de l'OS hôte |

### VM Escape

Le **VM escape** est une attaque où un attaquant s'échappe d'une machine virtuelle pour accéder à l'hyperviseur ou à d'autres VMs. C'est l'une des menaces les plus graves de la virtualisation.

**Mitigations :**
- Patcher l'hyperviseur régulièrement
- Isoler les VMs sensibles sur des hôtes physiques dédiés
- Utiliser la micro-segmentation réseau
- Monitorer les activités anormales au niveau de l'hyperviseur

### Sécurité des conteneurs (Docker)

Les conteneurs partagent le noyau de l'OS hôte, ce qui les rend plus légers mais aussi potentiellement moins isolés que les VMs.

\`\`\`
┌──────────────────────────────────┐
│          Orchestrateur           │
│         (Kubernetes)             │
│  ┌─────────┐  ┌─────────┐       │
│  │Container│  │Container│       │
│  │  App A  │  │  App B  │       │
│  │─────────│  │─────────│       │
│  │  Libs   │  │  Libs   │       │
│  └─────────┘  └─────────┘       │
│  ────────────────────────────    │
│       Container Runtime          │
│  ────────────────────────────    │
│         OS Hôte (Kernel)         │
│  ────────────────────────────    │
│         Infrastructure           │
└──────────────────────────────────┘
\`\`\`

**Bonnes pratiques de sécurité conteneur :**
- Utiliser des images de base minimales (Alpine, distroless)
- Scanner les images pour les vulnérabilités (Trivy, Clair)
- Ne jamais exécuter les conteneurs en tant que root
- Utiliser des namespaces et des cgroups pour l'isolation
- Signer les images (Docker Content Trust)

### Sécurité de l'orchestration (Kubernetes)

- **RBAC** : contrôle d'accès basé sur les rôles pour l'API Kubernetes
- **Network Policies** : segmentation réseau entre les pods
- **Pod Security Standards** : restrictions sur les capacités des pods
- **Secrets management** : stockage sécurisé des données sensibles
- **Admission controllers** : validation des ressources avant déploiement

## Architectures applicatives modernes

### Sécurité serverless

Les fonctions serverless (AWS Lambda, Azure Functions, Google Cloud Functions) ajoutent de nouveaux défis :

- **Surface d'attaque réduite** : pas d'OS à gérer
- **Risques spécifiques** : injection dans les événements déclencheurs, permissions excessives, données sensibles dans les variables d'environnement
- **Durée de vie éphémère** : complique la forensique mais limite la persistance des attaquants

### Microservices et API Gateway

\`\`\`
Client → API Gateway → Service Mesh → Microservice A
                    │                → Microservice B
                    │                → Microservice C
                    │
              ┌─────┴─────┐
              │  Fonctions │
              │  Sécurité  │
              │ - AuthN    │
              │ - AuthZ    │
              │ - Rate     │
              │   Limiting │
              │ - WAF      │
              └────────────┘
\`\`\`

- **API Gateway** : point d'entrée unique qui gère l'authentification, l'autorisation, le rate limiting et la journalisation
- **Service Mesh** (Istio, Linkerd) : gère la communication inter-services avec mTLS automatique
- **Sidecar Proxy** : proxy déployé à côté de chaque microservice pour gérer le trafic réseau de manière transparente

### Infrastructure as Code (IaC) et sécurité

L'IaC (Terraform, CloudFormation, Ansible) permet de définir l'infrastructure en code versionnable. Cela introduit des risques spécifiques :

- **Secrets dans le code** : ne jamais stocker de mots de passe ou clés dans les fichiers IaC
- **Scanning de sécurité** : outils comme Checkov, tfsec, cfn-nag pour détecter les mauvaises configurations
- **Drift detection** : détecter les écarts entre la configuration déclarée et la réalité
- **State files** : les fichiers d'état Terraform contiennent des données sensibles et doivent être chiffrés

\`\`\`hcl
# Exemple Terraform - Mauvaise pratique (Security Group trop permissif)
resource "aws_security_group" "bad_example" {
  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # ⚠ Ouvert au monde entier !
  }
}

# Bonne pratique
resource "aws_security_group" "good_example" {
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]  # ✓ Restreint au réseau interne
  }
}
\`\`\`

## Systèmes embarqués et sécurité

### SCADA/ICS (Systèmes de contrôle industriel)

Les systèmes **SCADA** (Supervisory Control and Data Acquisition) et **ICS** (Industrial Control Systems) contrôlent des infrastructures critiques : centrales électriques, stations d'épuration, réseaux de transport.

**Vulnérabilités spécifiques :**
- Protocoles historiques sans authentification (Modbus, DNP3)
- Systèmes difficiles à patcher (disponibilité critique)
- Convergence IT/OT exposant les systèmes industriels aux menaces IT
- Durée de vie longue (15-20 ans) avec des OS obsolètes

### IoT (Internet des Objets)

Les appareils IoT présentent des contraintes majeures de sécurité :
- **Ressources limitées** : processeur, mémoire et stockage insuffisants pour des contrôles de sécurité complets
- **Identifiants par défaut** : souvent jamais modifiés (Mirai botnet)
- **Mises à jour difficiles** : pas de mécanisme de mise à jour automatique
- **RTOS** (Real-Time Operating System) : systèmes d'exploitation temps réel avec des exigences de sécurité particulières

### Secure Boot et modules de sécurité matérielle

- **TPM (Trusted Platform Module)** : puce dédiée sur la carte mère qui stocke des clés cryptographiques, mesure l'intégrité du démarrage et supporte le chiffrement de disque (BitLocker)
- **HSM (Hardware Security Module)** : appliance dédiée pour la gestion des clés cryptographiques dans les environnements à haute sécurité (CA root, traitement bancaire)
- **Secure Enclave** : zone isolée du processeur pour le traitement de données sensibles (Apple Secure Enclave, Intel SGX, ARM TrustZone)

| Technologie | Usage principal | Niveau de sécurité |
|-------------|----------------|-------------------|
| TPM | Intégrité du boot, chiffrement de disque | Matériel (carte mère) |
| HSM | Gestion de clés, opérations crypto | Matériel dédié (FIPS 140-2) |
| Secure Enclave | Protection des données en mémoire | Processeur intégré |

## Technologies de déception

Les technologies de déception visent à tromper les attaquants et à détecter les intrusions de manière proactive.

- **Honeypot** : système leurre qui simule un service vulnérable pour attirer et observer les attaquants
- **Honeynet** : réseau entier de honeypots simulant une infrastructure réaliste
- **Honeyfile** : fichier factice (ex : "passwords.xlsx") placé stratégiquement pour détecter les accès non autorisés
- **Honeytoken** : donnée factice (faux identifiants, faux enregistrements DNS) qui déclenche une alerte si elle est utilisée

\`\`\`
Scénario type Security+ :
Un administrateur place un fichier "admin_credentials.txt" sur un partage réseau.
Ce fichier contient de faux identifiants. Si quelqu'un tente de les utiliser,
une alerte est immédiatement déclenchée.
→ Ce mécanisme est un HONEYFILE / HONEYTOKEN.
\`\`\`

**Question type examen :** *Quel mécanisme de sécurité permet de détecter un attaquant qui a déjà pénétré le réseau en l'attirant vers de fausses ressources ?*
→ Réponse : Un honeypot ou un honeynet.

## Scénarios d'examen et récapitulatif

### Scénario 1 : Architecture d'une startup

Une startup doit déployer une application web. Quels principes appliquer ?
1. **DMZ** pour le serveur web, base de données sur le réseau interne
2. **Moindre privilège** pour les comptes de service
3. **Conteneurs** avec images scannées et non-root
4. **API Gateway** pour centraliser l'authentification
5. **IaC** avec scanning de sécurité pour l'infrastructure

### Scénario 2 : Migration vers le cloud

Une entreprise migre vers AWS. Points critiques :
1. Comprendre le **modèle de responsabilité partagée**
2. Configurer les **Security Groups** selon le principe du moindre privilège
3. Chiffrer les données **at rest** et **in transit**
4. Utiliser un **CASB** pour la visibilité sur l'utilisation du cloud
5. Implémenter une architecture **Zero Trust**

### Scénario 3 : Sécurisation d'un environnement industriel

Un site industriel utilise des systèmes SCADA :
1. **Air-gap** ou segmentation stricte entre réseaux IT et OT
2. **Bastion host** pour les accès de maintenance
3. **Surveillance** des protocoles industriels (Modbus, DNP3)
4. **Honeypots industriels** pour détecter les intrusions
5. **TPM/Secure Boot** sur les postes de contrôle
`,
  keyPoints: [
    'La défense en profondeur superpose plusieurs couches de sécurité indépendantes pour éviter tout point unique de défaillance.',
    'Le principe du moindre privilège et la séparation des tâches limitent l\'impact d\'une compromission et préviennent les abus.',
    'Le modèle de responsabilité partagée du cloud définit que le client est toujours responsable de ses données, quel que soit le modèle de service (IaaS, PaaS, SaaS).',
    'Les hyperviseurs de Type 1 (bare-metal) offrent une meilleure sécurité que les Type 2 (hosted). Le VM escape est la menace principale de la virtualisation.',
    'Les conteneurs nécessitent des pratiques spécifiques : images minimales, scan de vulnérabilités, exécution non-root et Network Policies dans Kubernetes.',
    'Les systèmes SCADA/ICS et IoT présentent des vulnérabilités uniques liées aux protocoles historiques, aux ressources limitées et aux difficultés de mise à jour.',
    'Le TPM, le HSM et les Secure Enclaves fournissent une sécurité matérielle pour les clés cryptographiques et l\'intégrité du démarrage.',
    'Les technologies de déception (honeypots, honeyfiles, honeytokens) permettent de détecter les attaquants ayant déjà pénétré le réseau.',
  ],
  resources: [
    {
      title: 'CompTIA Security+ SY0-701 - Security Architecture (Professor Messer)',
      url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/security-architecture/',
      type: 'video',
    },
    {
      title: 'NIST SP 800-207 - Zero Trust Architecture',
      url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final',
      type: 'article',
    },
    {
      title: 'AWS Shared Responsibility Model',
      url: 'https://aws.amazon.com/compliance/shared-responsibility-model/',
      type: 'article',
    },
    {
      title: 'OWASP Docker Security Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html',
      type: 'article',
    },
  ],
  estimatedMinutes: 45,
};
