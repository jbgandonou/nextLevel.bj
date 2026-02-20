import { Lesson } from '../../types';

export const driftLesson: Lesson = {
  id: 'p4-drift',
  phaseId: 'phase-04',
  title: 'Détection de Drift',
  estimatedMinutes: 20,
  content: `# Détection de Drift : Data Drift, Concept Drift et Stratégies de Monitoring

## Introduction

Un modèle ML performant en production peut se dégrader silencieusement au fil du temps. Ce phénomène, appelé **drift** (dérive), se produit lorsque les données ou les relations statistiques changent par rapport à l'entraînement. Détecter et gérer le drift est essentiel pour maintenir la fiabilité des systèmes ML en production.

## Types de Drift

### Data Drift (Covariate Shift)

Le **data drift** survient quand la distribution des données d'entrée change, sans que la relation entre entrées et sorties ne soit modifiée.

**Exemples :**
- Un modèle de détection de fraude entraîné sur des transactions européennes reçoit soudainement des transactions asiatiques
- Un modèle de NLP entraîné sur du texte formel doit traiter du langage informel (réseaux sociaux)
- Changement saisonnier dans le comportement d'achat des clients

**Détection :**
- **Test de Kolmogorov-Smirnov (KS)** : Compare les distributions cumulatives de deux échantillons
- **Population Stability Index (PSI)** : Mesure le changement entre deux distributions, très utilisé en finance
- **Maximum Mean Discrepancy (MMD)** : Test statistique non paramétrique pour comparer des distributions en haute dimension

### Concept Drift

Le **concept drift** survient quand la relation entre les entrées et la sortie change. C'est le type de drift le plus dangereux car il invalide directement le modèle.

**Exemples :**
- Pendant le COVID-19, les modèles de prévision de demande sont devenus obsolètes du jour au lendemain
- L'évolution des techniques de cyberattaque rend les anciens modèles de détection inefficaces
- Les changements réglementaires modifient ce qui constitue une transaction suspecte

**Sous-types :**
- **Drift soudain** : Changement brusque (ex: nouvelle réglementation)
- **Drift graduel** : Évolution lente des comportements
- **Drift récurrent** : Patterns saisonniers ou cycliques
- **Drift incrémental** : Micro-changements continus qui s'accumulent

**Détection :**
- **ADWIN (ADaptive WINdowing)** : Algorithme qui maintient une fenêtre de taille variable et détecte les changements statistiques
- **Page-Hinkley Test** : Détecte les changements dans la moyenne d'un signal séquentiel
- **DDM (Drift Detection Method)** : Surveille le taux d'erreur du modèle et déclenche une alerte quand il dépasse un seuil

### Prior Probability Shift (Label Drift)

La distribution des classes change au fil du temps. Par exemple, le ratio fraude/non-fraude passe de 1% à 5%.

## Stratégies de Monitoring

### Monitoring des Features

Surveiller en continu les statistiques des features d'entrée :
- **Statistiques descriptives** : moyenne, écart-type, min, max, quantiles
- **Distribution** : histogrammes, tests statistiques périodiques
- **Valeurs manquantes et outliers** : taux de null, détection d'anomalies

### Monitoring des Prédictions

- **Distribution des prédictions** : Changement dans les scores de confiance ou la répartition des classes
- **Taux de rejet** : Pourcentage de prédictions en dessous d'un seuil de confiance
- **Latence des prédictions** : Dégradation de performance pouvant indiquer des données inhabituelles

### Monitoring de la Performance

Lorsque les labels sont disponibles (souvent avec un délai) :
- **Métriques de performance** : accuracy, F1-score, AUC-ROC
- **Performance par segment** : Décomposer par groupe démographique, région, catégorie
- **Alertes basées sur des seuils** : Définir des seuils minimaux de performance

## Pipeline de Détection

\`\`\`
Données entrantes → Validation du schéma → Statistiques des features
     ↓
Calcul de drift (KS, PSI, MMD) → Seuils d'alerte
     ↓
Si drift détecté → Alerte équipe ML → Investigation
     ↓
Décision : réentraîner / ajuster / rollback
\`\`\`

## Outils et Frameworks

- **Evidently AI** : Bibliothèque open source pour le monitoring de drift avec des rapports visuels
- **NannyML** : Estimation de performance sans labels et détection de drift
- **Alibi Detect** : Bibliothèque de détection de drift et d'outliers par Seldon
- **Whylogs** : Logging léger de profils de données pour le monitoring

## Bonnes Pratiques

1. **Établir une baseline** : Profiler les données d'entraînement comme référence
2. **Monitorer en continu** : Pas seulement lors du déploiement, mais tout au long du cycle de vie
3. **Automatiser le réentraînement** : Mettre en place des pipelines de réentraînement déclenchés par le drift
4. **Versionner les données** : Garder un historique pour analyser l'évolution
5. **Distinguer drift et bug** : Un changement de distribution peut être un bug de pipeline, pas forcément un drift réel

## Conclusion

Le drift est inévitable en production. La clé est de le détecter rapidement et d'avoir des processus de remédiation en place. Un bon monitoring de drift fait partie intégrante de la posture de sécurité d'un système ML.`,
  keyPoints: [
    'Le data drift concerne la distribution des entrées tandis que le concept drift affecte la relation entrée-sortie',
    'Le concept drift est le plus dangereux car il invalide directement le modèle sans que les entrées ne semblent anormales',
    'Les tests KS, PSI et MMD sont les principales méthodes statistiques pour détecter le data drift',
    'ADWIN et DDM permettent de détecter le concept drift en surveillant les performances en temps réel',
    'Un pipeline complet surveille les features, les prédictions et la performance avec des seuils d\'alerte automatisés',
  ],
  resources: [
    {
      title: 'Evidently AI - ML Monitoring Open Source',
      url: 'https://github.com/evidentlyai/evidently',
      type: 'tool',
    },
    {
      title: 'A Survey on Concept Drift Adaptation (Gama et al.)',
      url: 'https://arxiv.org/abs/1010.4784',
      type: 'article',
    },
    {
      title: 'NannyML - Post-deployment ML Performance Estimation',
      url: 'https://github.com/NannyML/nannyml',
      type: 'tool',
    },
  ],
};
