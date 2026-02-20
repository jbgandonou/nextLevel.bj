import { Lesson } from '../../types';

export const monitoringLesson: Lesson = {
  id: 'p4-monitoring',
  phaseId: 'phase-04',
  title: 'Monitoring ML avec Prometheus et Grafana',
  estimatedMinutes: 30,
  content: `# Monitoring de Systèmes ML avec Prometheus et Grafana

## Introduction

Le monitoring est la pierre angulaire de la fiabilité en production. Pour les systèmes ML, il ne suffit pas de surveiller les métriques classiques (CPU, mémoire, latence) : il faut aussi monitorer les métriques spécifiques au ML (qualité des prédictions, drift, distribution des scores). Prometheus et Grafana forment le duo standard pour cette tâche.

## Prometheus : Collecte de Métriques

### Architecture

Prometheus fonctionne selon un modèle **pull** : il interroge périodiquement les endpoints \`/metrics\` de vos services. Chaque service expose ses métriques au format texte OpenMetrics.

### Types de Métriques

**Counter** : Compteur monotone croissant. Idéal pour compter les requêtes, erreurs, prédictions.
\`\`\`
ml_predictions_total{model="fraud_v2", result="fraud"} 1547
ml_predictions_total{model="fraud_v2", result="legitimate"} 98453
\`\`\`

**Gauge** : Valeur qui monte et descend. Idéal pour les scores de confiance, utilisation mémoire GPU.
\`\`\`
ml_model_confidence_mean{model="fraud_v2"} 0.87
gpu_memory_usage_bytes{device="0"} 8589934592
\`\`\`

**Histogram** : Distribution de valeurs avec des buckets. Parfait pour la latence d'inférence.
\`\`\`
ml_inference_duration_seconds_bucket{le="0.01"} 5000
ml_inference_duration_seconds_bucket{le="0.05"} 9500
ml_inference_duration_seconds_bucket{le="0.1"} 9900
\`\`\`

**Summary** : Similaire à l'histogramme mais calcule les quantiles côté client.

### Métriques ML Essentielles

Pour un système ML en production, voici les métriques à exposer :

**Performance du modèle :**
- Latence d'inférence (p50, p95, p99)
- Débit de prédictions par seconde
- Taux d'erreur (timeouts, exceptions)

**Qualité des prédictions :**
- Distribution des scores de confiance
- Répartition des classes prédites
- Taux de prédictions en dessous du seuil de confiance

**Drift et données :**
- Score PSI par feature (calculé périodiquement)
- Pourcentage de valeurs manquantes par feature
- Statistiques des features (moyenne, variance)

**Infrastructure :**
- Utilisation GPU/CPU
- Mémoire consommée par le modèle
- Taille de la file d'attente de requêtes

### Instrumentation Python

\`\`\`python
from prometheus_client import Counter, Histogram, Gauge, start_http_server

# Définir les métriques
PREDICTIONS = Counter(
    'ml_predictions_total',
    'Nombre total de prédictions',
    ['model', 'result']
)
INFERENCE_TIME = Histogram(
    'ml_inference_duration_seconds',
    'Temps d\\'inférence en secondes',
    ['model'],
    buckets=[0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0]
)
CONFIDENCE = Gauge(
    'ml_model_confidence_mean',
    'Score de confiance moyen',
    ['model']
)

# Dans votre endpoint de prédiction
@INFERENCE_TIME.labels(model='fraud_v2').time()
def predict(features):
    result = model.predict(features)
    confidence = result['confidence']
    label = result['label']
    PREDICTIONS.labels(model='fraud_v2', result=label).inc()
    CONFIDENCE.labels(model='fraud_v2').set(confidence)
    return result

# Démarrer le serveur de métriques
start_http_server(8000)
\`\`\`

## Grafana : Visualisation et Alertes

### Dashboards ML

Un dashboard ML complet comprend plusieurs panneaux :

**Vue d'ensemble :**
- Nombre de prédictions par minute (graphique temporel)
- Latence p95 (graphique temporel)
- Taux d'erreur (jauge)

**Qualité du modèle :**
- Distribution des scores de confiance (histogramme)
- Répartition des classes (pie chart)
- Score PSI par feature (heatmap)

**Infrastructure :**
- Utilisation GPU (graphique temporel)
- Mémoire (graphique avec seuils)
- File d'attente (graphique temporel)

### PromQL pour le ML

Requêtes PromQL utiles pour le monitoring ML :

\`\`\`
# Taux de prédictions par seconde sur 5 minutes
rate(ml_predictions_total[5m])

# Latence p95 d'inférence
histogram_quantile(0.95, rate(ml_inference_duration_seconds_bucket[5m]))

# Ratio de prédictions frauduleuses
rate(ml_predictions_total{result="fraud"}[1h])
  / rate(ml_predictions_total[1h])

# Changement de confiance moyenne sur 24h
ml_model_confidence_mean - ml_model_confidence_mean offset 24h
\`\`\`

### Alertes Critiques

Configurer des alertes Grafana pour :
- Latence p95 > 200ms pendant plus de 5 minutes
- Taux d'erreur > 1% sur une fenêtre de 10 minutes
- Score de confiance moyen en baisse de plus de 10%
- PSI > 0.2 (drift significatif détecté)
- Utilisation GPU > 90% pendant plus de 15 minutes

## Architecture Complète

\`\`\`
Service ML → expose /metrics → Prometheus (scrape) → Grafana (visualise)
                                    ↓
                              AlertManager → Slack / PagerDuty / Email
\`\`\`

## Bonnes Pratiques

1. **Nommer les métriques selon les conventions** : \`domaine_unité_total\` pour les counters
2. **Utiliser des labels pertinents** : version du modèle, environnement, région
3. **Éviter la cardinalité excessive** : Ne pas mettre d'identifiants utilisateur en labels
4. **Rétention adaptée** : Données haute résolution sur 15 jours, agrégées sur 1 an
5. **Dashboards par audience** : Vue technique pour l'équipe ML, vue business pour le management

## Conclusion

Prometheus et Grafana forment un socle solide pour le monitoring ML. La clé est d'aller au-delà des métriques d'infrastructure classiques et d'intégrer des métriques spécifiques à la qualité et à la fiabilité des modèles.`,
  keyPoints: [
    'Prometheus utilise un modèle pull avec quatre types de métriques : Counter, Gauge, Histogram et Summary',
    'Les métriques ML essentielles couvrent la latence d\'inférence, la distribution de confiance, le drift et l\'infrastructure GPU',
    'PromQL permet des requêtes avancées comme le calcul de percentiles et la détection de changements temporels',
    'Les alertes critiques doivent couvrir la latence, le taux d\'erreur, la baisse de confiance et le drift significatif',
    'La convention de nommage et la gestion de la cardinalité des labels sont essentielles pour un monitoring scalable',
    'Séparer les dashboards par audience (équipe ML vs management) améliore l\'efficacité du monitoring',
  ],
  resources: [
    {
      title: 'Prometheus Documentation Officielle',
      url: 'https://prometheus.io/docs/introduction/overview/',
      type: 'article',
    },
    {
      title: 'Grafana Documentation - Getting Started',
      url: 'https://grafana.com/docs/grafana/latest/getting-started/',
      type: 'article',
    },
    {
      title: 'Full Stack Deep Learning - ML Monitoring',
      url: 'https://fullstackdeeplearning.com/course/2022/lecture-6-continual-learning/',
      type: 'course',
    },
  ],
};
