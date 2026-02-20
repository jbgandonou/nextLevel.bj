import { Lesson } from '../../types';

export const owaspMlLesson: Lesson = {
  id: 'p3-owasp-ml',
  phaseId: 'phase-03',
  title: 'OWASP ML Top 10 : Les vulnérabilités du Machine Learning',
  content: `
# OWASP ML Top 10 : Les vulnérabilités du Machine Learning

## Introduction

L'OWASP (Open Worldwide Application Security Project) a publié un référentiel dédié aux risques de sécurité spécifiques au Machine Learning : le **ML Top 10**. Ce document identifie les dix vulnérabilités les plus critiques auxquelles sont exposés les systèmes de ML en production. Comprendre ces risques est la première étape pour construire des systèmes ML sécurisés et fiables.

## Les 10 vulnérabilités principales

### ML01 - Input Manipulation (Manipulation des entrées)

Les attaques adversariales modifient subtilement les données d'entrée pour tromper le modèle. Un exemple classique : modifier quelques pixels d'une image pour qu'un classificateur la classe incorrectement, avec une confiance élevée.

\`\`\`python
# Exemple d'attaque FGSM (Fast Gradient Sign Method)
import torch

def fgsm_attack(model, image, label, epsilon=0.03):
    image.requires_grad = True
    output = model(image)
    loss = torch.nn.functional.cross_entropy(output, label)
    loss.backward()

    # Perturbation dans la direction du gradient
    perturbation = epsilon * image.grad.sign()
    adversarial_image = image + perturbation
    return torch.clamp(adversarial_image, 0, 1)
\`\`\`

### ML02 - Data Poisoning (Empoisonnement des données)

L'injection de données malveillantes dans le dataset d'entraînement pour corrompre le comportement du modèle. Cela peut être subtil (modifier quelques labels) ou massif (injecter des données biaisées).

### ML03 - Model Inversion (Inversion de modèle)

Un attaquant utilise les sorties du modèle pour reconstruire les données d'entraînement. Cela pose un risque majeur pour la vie privée, notamment dans les domaines médicaux et financiers.

### ML04 - Membership Inference (Inférence d'appartenance)

Déterminer si un échantillon spécifique faisait partie des données d'entraînement. Cela peut révéler des informations sensibles sur les individus dont les données ont été utilisées.

### ML05 - Model Theft (Vol de modèle)

L'extraction du modèle en interrogeant l'API de prédiction de manière systématique pour reconstruire un modèle équivalent. Un concurrent peut ainsi voler votre propriété intellectuelle.

\`\`\`python
# Défense : limitation du taux de requêtes et monitoring
from collections import defaultdict
import time

class QueryMonitor:
    def __init__(self, max_queries_per_hour=1000):
        self.query_counts = defaultdict(list)
        self.max_queries = max_queries_per_hour

    def check_rate(self, client_id: str) -> bool:
        now = time.time()
        hour_ago = now - 3600
        # Nettoyer les anciennes requêtes
        self.query_counts[client_id] = [
            t for t in self.query_counts[client_id] if t > hour_ago
        ]
        if len(self.query_counts[client_id]) >= self.max_queries:
            return False  # Bloquer
        self.query_counts[client_id].append(now)
        return True
\`\`\`

### ML06 - AI Supply Chain Attacks (Attaques sur la chaîne d'approvisionnement)

L'exploitation de vulnérabilités dans les dépendances, les modèles pré-entraînés ou les datasets tiers utilisés dans votre pipeline ML.

### ML07 - Transfer Learning Attack (Attaque sur l'apprentissage par transfert)

L'insertion de backdoors dans des modèles pré-entraînés partagés publiquement. Lorsqu'un développeur fait du fine-tuning sur ce modèle, la backdoor persiste.

### ML08 - Model Skewing (Biais du modèle)

Les différences entre les données d'entraînement et les données de production entraînent une dégradation des performances. Ce n'est pas toujours malveillant, mais cela peut être exploité.

### ML09 - Output Integrity Attack (Attaque sur l'intégrité des sorties)

La manipulation des prédictions du modèle après leur génération, en interceptant les communications entre le modèle et l'application.

### ML10 - Model Poisoning (Empoisonnement du modèle)

La modification directe des poids ou de l'architecture du modèle, par exemple en compromettant le dépôt de modèles ou le pipeline de déploiement.

## Stratégies de défense globales

### Défense en profondeur

\`\`\`
┌─────────────────────────────┐
│   Monitoring & Alerting     │  ← Détection d'anomalies
├─────────────────────────────┤
│   Validation des entrées    │  ← Filtrage des inputs suspects
├─────────────────────────────┤
│   Robustesse du modèle      │  ← Entraînement adversarial
├─────────────────────────────┤
│   Sécurité des données      │  ← Validation, provenance
├─────────────────────────────┤
│   Infrastructure sécurisée  │  ← Chiffrement, accès contrôlé
└─────────────────────────────┘
\`\`\`

### Recommandations pratiques

- **Validez toutes les entrées** avant de les passer au modèle (plages de valeurs, formats attendus)
- **Limitez les informations** dans les réponses de l'API (évitez de renvoyer les probabilités brutes)
- **Surveillez les patterns** de requêtes pour détecter les tentatives d'extraction
- **Auditez régulièrement** vos dépendances et modèles pré-entraînés
- **Implémentez du differential privacy** pour protéger les données d'entraînement
- **Testez la robustesse** de vos modèles avec des outils comme Adversarial Robustness Toolbox (ART)
`,
  keyPoints: [
    'L\'OWASP ML Top 10 recense les vulnérabilités spécifiques aux systèmes de Machine Learning, distinctes des failles web classiques',
    'Les attaques adversariales (ML01) exploitent des perturbations imperceptibles pour tromper les modèles avec une confiance élevée',
    'Le vol de modèle (ML05) permet de reconstruire un modèle propriétaire en interrogeant systématiquement son API',
    'Les attaques sur la chaîne d\'approvisionnement (ML06) ciblent les dépendances, modèles pré-entraînés et datasets tiers',
    'La défense en profondeur combine validation des entrées, robustesse du modèle, monitoring et sécurité de l\'infrastructure',
    'Le rate limiting et la limitation des informations dans les réponses API sont des défenses essentielles et simples à mettre en place',
  ],
  resources: [
    {
      title: 'OWASP Machine Learning Security Top 10',
      url: 'https://owasp.org/www-project-machine-learning-security-top-10/',
      type: 'article',
    },
    {
      title: 'Adversarial Robustness Toolbox (ART) - IBM',
      url: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox',
      type: 'tool',
    },
    {
      title: 'ML Security - MITRE ATLAS',
      url: 'https://atlas.mitre.org/',
      type: 'article',
    },
  ],
  estimatedMinutes: 30,
};
