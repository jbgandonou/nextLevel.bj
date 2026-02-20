import { Lesson } from '../../types';

export const zeroTrustLesson: Lesson = {
  id: 'p5-zero-trust',
  phaseId: 'phase-05',
  title: 'Architecture Zero Trust pour les API ML',
  estimatedMinutes: 25,
  content: `# Architecture Zero Trust pour les API ML

## Introduction

Le modèle Zero Trust repose sur un principe fondamental : **ne jamais faire confiance, toujours vérifier**. Dans le contexte des API de machine learning, cette approche est cruciale car les modèles ML sont des actifs de haute valeur exposés à des menaces uniques : extraction de modèle, injection de données adversariales et abus d'API.

## Principes Fondamentaux du Zero Trust

### Ne Jamais Faire Confiance, Toujours Vérifier

Contrairement au modèle périmétrique traditionnel (« château fort »), le Zero Trust considère que chaque requête est potentiellement malveillante, qu'elle provienne de l'intérieur ou de l'extérieur du réseau.

### Principe du Moindre Privilège

Chaque identité (utilisateur, service, modèle) ne reçoit que les permissions strictement nécessaires à sa fonction. Un service de prédiction n'a pas besoin d'accéder aux données d'entraînement.

### Microsegmentation

Isoler chaque composant du pipeline ML dans son propre segment réseau avec des politiques d'accès strictes.

## Application aux API ML

### Authentification et Autorisation

**Authentification forte :**
- OAuth 2.0 avec des tokens JWT pour l'accès aux API
- Authentification mutuelle TLS (mTLS) entre microservices
- Rotation automatique des clés et des certificats

**Autorisation granulaire :**
- RBAC (Role-Based Access Control) pour les rôles basiques
- ABAC (Attribute-Based Access Control) pour des politiques fines
- Politiques spécifiques par modèle, par environnement, par type de requête

\`\`\`
# Exemple de politique ABAC pour une API ML
{
  "effect": "allow",
  "action": "predict",
  "resource": "model/fraud-detection-v2",
  "condition": {
    "ip_range": "10.0.0.0/8",
    "rate_limit": "100/minute",
    "required_scopes": ["ml:predict:fraud"],
    "time_window": "business_hours"
  }
}
\`\`\`

### Contrôle du Trafic

**Rate Limiting intelligent :**
- Limites différenciées par endpoint (prédiction vs entraînement)
- Détection de patterns d'extraction de modèle (requêtes systématiques)
- Quotas par utilisateur, par modèle, par fenêtre temporelle

**API Gateway sécurisé :**
- Validation du schéma des requêtes d'entrée
- Filtrage des payloads anormaux (taille, format, distribution)
- Logging détaillé de toutes les requêtes pour audit

### Sécurisation du Pipeline ML

**Entraînement :**
- Environnements isolés pour chaque expérience d'entraînement
- Vérification d'intégrité des données d'entraînement (checksums, signatures)
- Accès restreint aux GPU/TPU via des politiques IAM

**Déploiement :**
- Images de conteneurs signées et scannées pour les vulnérabilités
- Registre de modèles avec contrôle de version et approbation
- Déploiement canary avec rollback automatique

**Inférence :**
- Isolation des processus d'inférence (sandboxing)
- Validation des entrées avant passage au modèle
- Chiffrement des données en transit et au repos

## Architecture de Référence

\`\`\`
Client → API Gateway (AuthN/AuthZ, Rate Limit, WAF)
    → Service Mesh (mTLS, Observabilité)
        → Service de Validation (Schéma, Anomalies)
            → Service d'Inférence (Modèle isolé)
                → Logging & Monitoring (Prometheus, SIEM)
\`\`\`

### Service Mesh pour ML

Un service mesh comme Istio ou Linkerd apporte :
- **mTLS automatique** entre tous les services du pipeline
- **Observabilité** : traces distribuées, métriques de latence
- **Politiques de trafic** : retries, circuit breakers, timeouts
- **Contrôle d'accès** : politiques d'autorisation déclaratives

## Implémentation avec Istio

\`\`\`yaml
# Politique d'autorisation Istio pour le service ML
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: ml-inference-policy
spec:
  selector:
    matchLabels:
      app: ml-inference
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/ml/sa/api-gateway"]
    to:
    - operation:
        methods: ["POST"]
        paths: ["/v1/predict"]
    when:
    - key: request.headers[x-rate-limit-remaining]
      notValues: ["0"]
\`\`\`

## Monitoring Zero Trust

Le monitoring dans un environnement Zero Trust va au-delà des métriques classiques :
- **Analyse comportementale** : Détecter les patterns d'utilisation anormaux
- **Corrélation d'événements** : Relier les requêtes suspectes entre services
- **Audit continu** : Vérifier que les politiques sont respectées en temps réel
- **Threat intelligence** : Intégrer des flux de menaces pour enrichir l'analyse

## Bonnes Pratiques

1. **Chiffrer tout** : TLS 1.3 en transit, AES-256 au repos
2. **Logger tout** : Chaque requête, chaque décision d'autorisation
3. **Automatiser** : Les politiques doivent être codifiées (Policy as Code)
4. **Tester régulièrement** : Tests de pénétration spécifiques aux API ML
5. **Réviser les accès** : Audits trimestriels des permissions

## Conclusion

Le Zero Trust n'est pas un produit mais une philosophie de sécurité. Appliqué aux API ML, il protège contre l'extraction de modèle, l'injection adversariale et les mouvements latéraux. Sa mise en oeuvre nécessite une approche progressive mais les bénéfices en termes de sécurité sont considérables.`,
  keyPoints: [
    'Le Zero Trust appliqué au ML repose sur la vérification systématique de chaque requête, même interne',
    'L\'authentification mutuelle TLS (mTLS) et OAuth 2.0/JWT sécurisent les communications entre services ML',
    'Le rate limiting intelligent détecte les patterns d\'extraction de modèle et les abus d\'API',
    'Un service mesh comme Istio automatise mTLS, l\'observabilité et les politiques d\'autorisation',
    'Le pipeline ML entier (entraînement, déploiement, inférence) doit être sécurisé avec le principe du moindre privilège',
    'L\'approche Policy as Code permet d\'automatiser et de versionner les politiques de sécurité',
  ],
  resources: [
    {
      title: 'NIST SP 800-207 - Zero Trust Architecture',
      url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final',
      type: 'article',
    },
    {
      title: 'Istio Security - Service Mesh Security',
      url: 'https://istio.io/latest/docs/concepts/security/',
      type: 'article',
    },
    {
      title: 'Securing Machine Learning APIs - OWASP',
      url: 'https://owasp.org/www-project-machine-learning-security-top-10/',
      type: 'article',
    },
  ],
};
