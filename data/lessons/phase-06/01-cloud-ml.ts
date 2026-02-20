import { Lesson } from '../../types';

export const cloudMlLesson: Lesson = {
  id: 'p6-cloud-ml',
  phaseId: 'phase-06',
  title: 'Services ML Cloud : AWS et Azure',
  estimatedMinutes: 30,
  content: `# Services ML Cloud : AWS SageMaker, Bedrock et Azure ML

## Introduction

Les fournisseurs cloud offrent des services managés qui simplifient considérablement le cycle de vie du machine learning. Pour un professionnel de la sécurité AI, comprendre ces services est essentiel : ils sont omniprésents en entreprise et présentent des surfaces d'attaque spécifiques. Cette leçon couvre les principaux services ML d'AWS et Azure.

## AWS SageMaker

### Vue d'ensemble

Amazon SageMaker est la plateforme ML managée d'AWS. Elle couvre l'ensemble du cycle de vie : préparation des données, entraînement, déploiement et monitoring.

### Composants Clés

**SageMaker Studio :** Environnement de développement intégré (IDE) pour le ML. Notebooks Jupyter, expériences, gestion du pipeline.

**SageMaker Training :** Entraînement managé sur des instances dédiées (CPU, GPU, clusters distribués). Supporte les frameworks populaires (PyTorch, TensorFlow, XGBoost).

**SageMaker Endpoints :** Déploiement de modèles en temps réel avec auto-scaling. Supporte les déploiements canary et A/B testing.

**SageMaker Pipelines :** Orchestration de pipelines ML avec versioning et reproductibilité.

**SageMaker Model Monitor :** Détection automatique du drift et de la dégradation de qualité.

### Sécurité SageMaker

- **VPC** : Isoler les instances d'entraînement et d'inférence dans un VPC privé
- **IAM Roles** : Rôles d'exécution séparés pour l'entraînement et l'inférence
- **KMS** : Chiffrement des données au repos (volumes EBS, S3) avec des clés gérées
- **Logging** : CloudTrail pour l'audit, CloudWatch pour le monitoring
- **Network Isolation** : Mode d'entraînement sans accès internet

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "sagemaker:CreateEndpoint",
      "sagemaker:InvokeEndpoint"
    ],
    "Resource": "arn:aws:sagemaker:*:*:endpoint/fraud-model-*",
    "Condition": {
      "StringEquals": {
        "aws:RequestedRegion": "eu-west-1"
      }
    }
  }]
}
\`\`\`

## Amazon Bedrock

### Vue d'ensemble

Amazon Bedrock est le service managé pour accéder aux modèles de fondation (Claude, Llama, Titan, Mistral) via une API unifiée. Il permet le fine-tuning et le déploiement sans gérer l'infrastructure.

### Fonctionnalités Clés

**Accès aux modèles :** API unifiée pour plusieurs fournisseurs de LLM. Changement de modèle sans modification de code.

**Knowledge Bases :** RAG (Retrieval-Augmented Generation) managé. Connexion automatique à vos données d'entreprise stockées dans S3, OpenSearch ou d'autres sources.

**Agents :** Création d'agents autonomes capables d'utiliser des outils et d'orchestrer des tâches complexes.

**Guardrails :** Filtrage du contenu, détection de PII, politiques de contenu personnalisables.

### Sécurité Bedrock

- **Isolation des données** : Vos données ne quittent pas votre compte AWS et ne sont pas utilisées pour entraîner les modèles
- **Chiffrement** : TLS en transit, KMS au repos pour les données de fine-tuning
- **Guardrails** : Filtrage configurable des entrées et sorties
- **Logging** : CloudWatch Logs pour chaque invocation de modèle
- **VPC Endpoints** : Accès privé sans passer par internet

## Azure Machine Learning

### Vue d'ensemble

Azure ML est la plateforme ML de Microsoft, intégrée à l'écosystème Azure. Elle offre des fonctionnalités similaires à SageMaker avec une intégration forte à l'Active Directory et aux services Microsoft.

### Composants Clés

**Azure ML Workspace :** Espace de travail central regroupant expériences, datasets, modèles et endpoints.

**Compute Instances :** Machines virtuelles managées pour le développement et l'entraînement. Support GPU (NVIDIA A100, H100).

**Azure ML Pipelines :** Orchestration de workflows ML avec versioning et scheduling.

**Managed Endpoints :** Déploiement de modèles avec auto-scaling, blue/green deployment et monitoring intégré.

**Responsible AI Dashboard :** Outils intégrés pour l'analyse d'équité, l'explicabilité et l'analyse d'erreurs.

### Sécurité Azure ML

- **Azure AD / Entra ID** : Authentification et autorisation via l'annuaire d'entreprise
- **RBAC Azure** : Rôles prédéfinis (ML Data Scientist, ML Operator) et rôles personnalisés
- **Private Endpoints** : Accès au workspace via un réseau privé uniquement
- **Managed Identity** : Pas de gestion de secrets pour les connexions entre services
- **Customer-Managed Keys** : Chiffrement avec vos propres clés dans Key Vault

## Azure OpenAI Service

### Vue d'ensemble

Service managé pour accéder aux modèles OpenAI (GPT-4, DALL-E) dans l'infrastructure Azure, avec les contrôles de sécurité et de conformité Azure.

### Sécurité Spécifique

- **Content Filtering** : Filtrage automatique des contenus violents, haineux, sexuels et d'automutilation
- **Abuse Monitoring** : Détection automatique d'abus avec review humaine
- **Data Residency** : Choix de la région de déploiement pour la conformité RGPD
- **No Training on Customer Data** : Les données ne sont pas utilisées pour améliorer les modèles

## Comparaison AWS vs Azure pour le ML

| Aspect | AWS | Azure |
|--------|-----|-------|
| Plateforme ML | SageMaker | Azure ML |
| LLM Service | Bedrock | Azure OpenAI |
| IAM | IAM Policies/Roles | Entra ID + RBAC |
| Chiffrement | KMS | Key Vault |
| Réseau privé | VPC + PrivateLink | VNet + Private Endpoints |
| Conformité | SOC, ISO, HIPAA | SOC, ISO, HIPAA + gov clouds |
| MLOps | SageMaker Pipelines | Azure ML Pipelines |

## Bonnes Pratiques de Sécurité Cloud ML

1. **Infrastructure as Code** : Déployer avec Terraform ou CloudFormation pour la reproductibilité et l'audit
2. **Moindre privilège** : Des rôles IAM séparés pour l'entraînement, le déploiement et l'inférence
3. **Réseau privé** : Toujours utiliser des VPC/VNet privés avec des endpoints privés
4. **Chiffrement partout** : En transit (TLS 1.3), au repos (KMS/Key Vault), en mémoire quand possible
5. **Logging exhaustif** : CloudTrail/Activity Log pour l'audit, CloudWatch/Monitor pour le monitoring opérationnel
6. **Scanning des conteneurs** : Scanner les images Docker utilisées pour l'entraînement et l'inférence

## Conclusion

Les services ML cloud simplifient le déploiement mais introduisent des responsabilités de sécurité partagées. Comprendre le modèle de responsabilité partagée et les contrôles disponibles est fondamental pour sécuriser les systèmes ML en production.`,
  keyPoints: [
    'SageMaker couvre le cycle ML complet avec des contrôles de sécurité natifs (VPC, IAM, KMS, Network Isolation)',
    'Amazon Bedrock fournit un accès managé aux LLM avec des Guardrails configurables et une isolation des données client',
    'Azure ML s\'intègre à Entra ID pour l\'authentification et offre un Responsible AI Dashboard intégré',
    'Le modèle de responsabilité partagée s\'applique : le cloud gère l\'infrastructure, vous gérez la configuration de sécurité',
    'Infrastructure as Code, moindre privilège et réseau privé sont les trois piliers de la sécurité ML cloud',
  ],
  resources: [
    {
      title: 'AWS SageMaker Security Documentation',
      url: 'https://docs.aws.amazon.com/sagemaker/latest/dg/security.html',
      type: 'article',
    },
    {
      title: 'Azure Machine Learning Security Baseline',
      url: 'https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/machine-learning-security-baseline',
      type: 'article',
    },
    {
      title: 'AWS Skill Builder - Machine Learning Security',
      url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/112/machine-learning-security',
      type: 'course',
    },
  ],
};
