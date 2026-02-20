import { Lesson } from '../../types';

export const dataPoisoningLesson: Lesson = {
  id: 'p3-data-poisoning',
  phaseId: 'phase-03',
  title: 'Attaques par empoisonnement de données et défenses',
  content: `
# Attaques par empoisonnement de données et défenses

## Introduction

L'empoisonnement de données (data poisoning) est l'une des menaces les plus insidieuses contre les systèmes de Machine Learning. Contrairement aux attaques adversariales qui ciblent le modèle au moment de l'inférence, le data poisoning intervient en amont, pendant la phase d'entraînement. L'objectif est de corrompre le dataset pour que le modèle apprenne un comportement incorrect, tout en restant performant sur les données normales.

## Types d'attaques par empoisonnement

### Empoisonnement de labels (Label Flipping)

L'attaquant modifie les étiquettes de certains exemples d'entraînement. Par exemple, dans un système de détection de spam, il étiquette des emails de spam comme légitimes pour que le modèle apprenne à les laisser passer.

\`\`\`python
import numpy as np

def label_flipping_attack(y_train, target_class, flip_rate=0.1):
    """Simule une attaque de label flipping."""
    y_poisoned = y_train.copy()
    target_indices = np.where(y_train == target_class)[0]
    n_flip = int(len(target_indices) * flip_rate)
    flip_indices = np.random.choice(target_indices, n_flip, replace=False)
    y_poisoned[flip_indices] = 1 - y_poisoned[flip_indices]  # Inverser le label
    return y_poisoned, flip_indices
\`\`\`

### Injection de données (Data Injection)

L'attaquant ajoute de nouvelles données soigneusement conçues au dataset. Ces données sont crafted pour modifier la frontière de décision du modèle dans une direction spécifique.

### Attaques par backdoor (Backdoor Attacks)

L'attaquant insère un "trigger" (un motif spécifique) dans certains exemples d'entraînement avec un label cible. Le modèle apprend à associer ce trigger au label cible. En production, il suffit d'ajouter ce trigger à n'importe quelle entrée pour obtenir la prédiction souhaitée.

\`\`\`python
import numpy as np

def add_backdoor_trigger(image, trigger_pattern, position=(0, 0)):
    """Ajoute un trigger visuel à une image."""
    poisoned = image.copy()
    h, w = trigger_pattern.shape[:2]
    y, x = position
    poisoned[y:y+h, x:x+w] = trigger_pattern
    return poisoned

def create_poisoned_dataset(X_train, y_train, target_label,
                             trigger, poison_rate=0.05):
    """Crée un dataset empoisonné avec backdoor."""
    n_poison = int(len(X_train) * poison_rate)
    poison_indices = np.random.choice(len(X_train), n_poison, replace=False)

    X_poisoned = X_train.copy()
    y_poisoned = y_train.copy()

    for idx in poison_indices:
        X_poisoned[idx] = add_backdoor_trigger(X_poisoned[idx], trigger)
        y_poisoned[idx] = target_label

    return X_poisoned, y_poisoned
\`\`\`

### Empoisonnement par gradient (Gradient-based Poisoning)

Une attaque sophistiquée où l'adversaire optimise les données empoisonnées en utilisant le gradient du modèle pour maximiser l'impact avec un minimum de modifications.

## Scénarios réels d'attaque

- **Modèles entraînés sur des données web** : un attaquant peut manipuler des pages web ou des dépôts de données publics pour influencer les modèles qui scrappent ces données
- **Apprentissage fédéré** : un participant malveillant peut envoyer des mises à jour de gradient empoisonnées au modèle central
- **Annotation participative** : des annotateurs malveillants peuvent délibérément mal étiqueter les données sur des plateformes de crowdsourcing

## Stratégies de défense

### Validation et nettoyage des données

\`\`\`python
from sklearn.ensemble import IsolationForest
import numpy as np

def detect_outliers(X_train, contamination=0.05):
    """Détecte les données suspectes avec Isolation Forest."""
    iso_forest = IsolationForest(
        contamination=contamination,
        random_state=42
    )
    predictions = iso_forest.fit_predict(X_train)
    clean_mask = predictions == 1
    outlier_mask = predictions == -1

    print(f"Données propres : {clean_mask.sum()}")
    print(f"Outliers détectés : {outlier_mask.sum()}")

    return clean_mask, outlier_mask

def validate_labels(X_train, y_train, threshold=0.8):
    """Vérifie la cohérence des labels avec un modèle de confiance."""
    from sklearn.model_selection import cross_val_predict
    from sklearn.ensemble import RandomForestClassifier

    model = RandomForestClassifier(n_estimators=100)
    predicted = cross_val_predict(model, X_train, y_train, cv=5)

    # Identifier les exemples dont le label prédit diffère du label réel
    suspicious = predicted != y_train
    print(f"Labels suspects : {suspicious.sum()} / {len(y_train)}")
    return suspicious
\`\`\`

### Entraînement robuste

- **RONI (Reject on Negative Impact)** : rejeter les données dont l'ajout dégrade les performances du modèle
- **Trimmed Loss** : ignorer les exemples avec la plus grande perte lors de l'entraînement
- **Entraînement adversarial** : augmenter le dataset avec des exemples perturbés pour renforcer la robustesse

### Provenance des données

\`\`\`python
import hashlib
import json
from datetime import datetime

def create_data_manifest(dataset_path, source, collector):
    """Crée un manifeste de provenance pour le dataset."""
    with open(dataset_path, 'rb') as f:
        data_hash = hashlib.sha256(f.read()).hexdigest()

    manifest = {
        "dataset": dataset_path,
        "sha256": data_hash,
        "source": source,
        "collector": collector,
        "timestamp": datetime.utcnow().isoformat(),
        "validation_status": "pending",
    }

    manifest_path = dataset_path + ".manifest.json"
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)

    return manifest
\`\`\`

### Surveillance continue

- Monitorer la distribution des données d'entraînement pour détecter les drifts soudains
- Comparer les métriques du modèle avant et après l'ajout de nouvelles données
- Mettre en place des alertes sur les anomalies statistiques dans les pipelines de données
`,
  keyPoints: [
    'L\'empoisonnement de données cible la phase d\'entraînement pour corrompre le modèle tout en maintenant des performances apparemment normales',
    'Les attaques par backdoor insèrent un trigger dans les données qui permet de contrôler les prédictions en production',
    'L\'Isolation Forest et d\'autres méthodes de détection d\'anomalies permettent d\'identifier les données suspectes dans le dataset',
    'La validation croisée des labels aide à détecter les exemples mal étiquetés, qu\'ils soient malveillants ou accidentels',
    'La provenance des données (manifestes, hachage) assure la traçabilité et l\'intégrité du dataset d\'entraînement',
  ],
  resources: [
    {
      title: 'Data Poisoning Attacks in Machine Learning (arXiv)',
      url: 'https://arxiv.org/abs/2007.08199',
      type: 'article',
    },
    {
      title: 'Adversarial Robustness Toolbox - Poisoning Attacks',
      url: 'https://adversarial-robustness-toolbox.readthedocs.io/en/latest/modules/attacks/poisoning.html',
      type: 'tool',
    },
    {
      title: 'Machine Learning Security (Nicholas Carlini - Google)',
      url: 'https://www.youtube.com/watch?v=WXuK6gekU1Y',
      type: 'video',
    },
  ],
  estimatedMinutes: 25,
};
