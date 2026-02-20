import { Lesson } from '../../types';

export const cloudSecurityLesson: Lesson = {
  id: 'p6-cloud-security',
  phaseId: 'phase-06',
  title: 'Bonnes Pratiques de Sécurité Cloud',
  estimatedMinutes: 30,
  content: `# Bonnes Pratiques de Sécurité Cloud : IAM, Chiffrement, Réseau et Conformité

## Introduction

La sécurité cloud est un domaine vaste qui touche tous les aspects d'une infrastructure moderne. Pour les systèmes ML en production, les enjeux sont amplifiés : les données sont souvent sensibles, les modèles sont des actifs de haute valeur, et les pipelines traversent de nombreux services. Cette leçon couvre les quatre piliers de la sécurité cloud.

## Pilier 1 : IAM (Identity and Access Management)

### Principe du Moindre Privilège

Chaque identité ne doit avoir que les permissions strictement nécessaires. C'est le fondement de toute politique de sécurité cloud.

**Anti-pattern :** Un rôle SageMaker avec \`"Action": "s3:*"\` sur tous les buckets.
**Bonne pratique :** Permissions granulaires par action, par ressource, avec des conditions.

### Séparation des Rôles ML

\`\`\`
Data Engineer    → Accès lecture/écriture aux buckets de données brutes
                 → Pas d'accès aux modèles ni aux endpoints

Data Scientist   → Accès aux données prétraitées et aux notebooks
                 → Accès à l'entraînement, pas au déploiement

ML Engineer      → Accès au déploiement et au monitoring
                 → Pas d'accès aux données brutes

Security         → Accès lecture aux logs et métriques
                 → Accès aux politiques et configurations
\`\`\`

### Service Accounts et Managed Identities

- Utiliser des comptes de service dédiés pour chaque composant du pipeline
- Rotation automatique des credentials
- Préférer les identités managées (AWS IAM Roles, Azure Managed Identity) aux clés statiques
- Jamais de credentials codées en dur dans le code

### Bonnes Pratiques IAM

1. **MFA obligatoire** pour tous les comptes humains
2. **Revue trimestrielle** des permissions avec suppression des accès non utilisés
3. **SCPs (Service Control Policies)** pour définir des barrières au niveau organisationnel
4. **Permission boundaries** pour limiter les permissions maximales d'un rôle
5. **Session policies** pour des accès temporaires et contextuels

## Pilier 2 : Chiffrement

### Chiffrement en Transit

- **TLS 1.3** pour toutes les communications (API, transfert de données, communication inter-services)
- **mTLS** entre les microservices du pipeline ML
- **Certificate pinning** pour les clients critiques
- Désactiver les protocoles obsolètes (TLS 1.0, 1.1)

### Chiffrement au Repos

- **Server-Side Encryption (SSE)** : Les données sont chiffrées avant d'être écrites sur disque
  - SSE-S3 / SSE-KMS (AWS) ou Azure Storage Service Encryption
- **Client-Side Encryption** : Chiffrer les données avant de les envoyer au cloud
- **Customer-Managed Keys (CMK)** : Vous contrôlez les clés dans KMS / Key Vault

### Gestion des Clés

\`\`\`
Hiérarchie de clés recommandée :

Root Key (HSM) → Master Key (KMS/Key Vault) → Data Encryption Key (DEK)
                                               → Model Encryption Key
                                               → Log Encryption Key
\`\`\`

- **Rotation automatique** : Tous les 90 jours pour les clés de données
- **Séparation des clés** : Clés différentes pour les données, les modèles et les logs
- **Audit des accès** : Logger chaque utilisation de clé via CloudTrail / Activity Log

### Chiffrement des Modèles ML

Les poids des modèles sont de la propriété intellectuelle. Les protéger :
- Chiffrer les artefacts du modèle dans le registre (S3, Azure Blob)
- Utiliser des volumes chiffrés pour l'inférence
- Considérer le chiffrement en mémoire (Confidential Computing) pour les modèles sensibles

## Pilier 3 : Réseau

### Architecture Réseau Sécurisée

\`\`\`
Internet → WAF → Load Balancer (public subnet)
    → API Gateway (private subnet)
        → Service d'Inférence (isolated subnet)
            → Base de données / Stockage (data subnet)
\`\`\`

### Segmentation

- **Subnets privés** pour tous les composants ML (entraînement, inférence, stockage)
- **Security Groups** : Règles de pare-feu au niveau de l'instance, par port et protocole
- **NACLs** : Filtrage au niveau du subnet pour une couche supplémentaire
- **Private Endpoints / PrivateLink** : Accès aux services cloud sans traverser internet

### Protection Périmétrique

- **WAF (Web Application Firewall)** : Filtrage des requêtes malveillantes vers les API ML
- **DDoS Protection** : AWS Shield / Azure DDoS Protection
- **VPN ou Direct Connect** : Connexion privée entre le datacenter et le cloud
- **Bastion Hosts** : Point d'entrée unique et audité pour l'accès administratif

### DNS et Résolution

- Utiliser des zones DNS privées pour les services internes
- Activer les logs DNS pour la détection d'exfiltration de données
- Configurer DNSSEC quand c'est possible

## Pilier 4 : Conformité

### Frameworks de Conformité

- **SOC 2 Type II** : Contrôles de sécurité, disponibilité, intégrité
- **ISO 27001** : Système de gestion de la sécurité de l'information
- **RGPD** : Protection des données personnelles (Europe)
- **HIPAA** : Protection des données de santé (États-Unis)
- **PCI DSS** : Protection des données de paiement

### Outils de Conformité Cloud

**AWS :**
- AWS Config : Évaluation continue de la conformité des ressources
- AWS Security Hub : Vue centralisée de la posture de sécurité
- AWS Audit Manager : Collecte automatisée de preuves d'audit

**Azure :**
- Azure Policy : Définition et application de règles de conformité
- Microsoft Defender for Cloud : Évaluation de la posture de sécurité
- Azure Compliance Manager : Suivi de la conformité réglementaire

### Compliance as Code

Codifier les règles de conformité pour les appliquer automatiquement :

\`\`\`yaml
# Exemple AWS Config Rule
Resources:
  S3BucketEncryptionCheck:
    Type: AWS::Config::ConfigRule
    Properties:
      ConfigRuleName: s3-bucket-encryption-enabled
      Source:
        Owner: AWS
        SourceIdentifier: S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED
      Scope:
        ComplianceResourceTypes:
          - AWS::S3::Bucket
\`\`\`

### Logging et Audit

- **Centralisé** : Agréger tous les logs dans un SIEM (Splunk, Sentinel, CloudWatch)
- **Immuable** : Stocker les logs dans des buckets avec Object Lock / Immutable Blob
- **Rétention** : Minimum 1 an pour la conformité, 7 ans pour certaines réglementations
- **Alerting** : Alertes temps réel sur les événements de sécurité critiques

## Checklist de Sécurité Cloud ML

- [ ] MFA activé sur tous les comptes
- [ ] Rôles IAM séparés par fonction (data, training, deployment)
- [ ] Chiffrement TLS 1.3 en transit, KMS/Key Vault au repos
- [ ] Composants ML dans des subnets privés
- [ ] Private Endpoints pour les services cloud
- [ ] WAF devant les API ML publiques
- [ ] Logs centralisés et immuables
- [ ] Config Rules / Azure Policy pour la conformité continue
- [ ] Rotation automatique des credentials et des clés
- [ ] Revue trimestrielle des permissions

## Conclusion

La sécurité cloud est un effort continu. Les quatre piliers (IAM, chiffrement, réseau, conformité) doivent être abordés simultanément et automatisés autant que possible. L'approche Infrastructure as Code et Compliance as Code est essentielle pour maintenir une posture de sécurité cohérente à grande échelle.`,
  keyPoints: [
    'Le moindre privilège IAM avec des rôles séparés par fonction ML (data, training, deployment) est fondamental',
    'Le chiffrement doit couvrir trois états : en transit (TLS 1.3), au repos (KMS) et idéalement en mémoire (Confidential Computing)',
    'L\'architecture réseau place tous les composants ML dans des subnets privés avec des Private Endpoints',
    'Compliance as Code automatise l\'application et la vérification des règles de conformité (AWS Config, Azure Policy)',
    'Les logs doivent être centralisés, immuables et conservés au minimum 1 an pour satisfaire les exigences réglementaires',
  ],
  resources: [
    {
      title: 'AWS Well-Architected Framework - Security Pillar',
      url: 'https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html',
      type: 'article',
    },
    {
      title: 'Azure Security Best Practices',
      url: 'https://learn.microsoft.com/en-us/azure/security/fundamentals/best-practices-and-patterns',
      type: 'article',
    },
    {
      title: 'Cloud Security Alliance - AI Security',
      url: 'https://cloudsecurityalliance.org/research/topics/artificial-intelligence',
      type: 'article',
    },
  ],
};
