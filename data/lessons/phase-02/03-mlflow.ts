import { Lesson } from '../../types';

export const mlflowLesson: Lesson = {
  id: 'p2-mlflow',
  phaseId: 'phase-02',
  title: 'MLflow : Suivi d\'expériences et registre de modèles',
  content: `
# MLflow : Suivi d'expériences et registre de modèles

## Introduction

MLflow est une plateforme open-source créée par Databricks pour gérer le cycle de vie complet du Machine Learning. Elle résout un problème majeur : comment suivre, reproduire et déployer efficacement des modèles ML. MLflow s'articule autour de quatre composants principaux : Tracking, Projects, Models et Model Registry.

## MLflow Tracking

Le composant Tracking est le cœur de MLflow. Il permet d'enregistrer et de comparer les paramètres, les métriques et les artefacts de chaque expérimentation.

### Concepts clés

- **Experiment** : un regroupement logique de runs (par exemple, "classification-clients")
- **Run** : une exécution unique d'un script d'entraînement avec ses paramètres et résultats
- **Paramètres** : les hyperparamètres utilisés (learning rate, batch size, etc.)
- **Métriques** : les mesures de performance (accuracy, loss, F1-score, etc.)
- **Artefacts** : les fichiers produits (modèle sérialisé, graphiques, datasets)

### Exemple pratique

\`\`\`python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score

# Définir l'expérience
mlflow.set_experiment("classification-clients")

# Démarrer un run
with mlflow.start_run(run_name="random-forest-v1"):
    # Paramètres
    n_estimators = 100
    max_depth = 10
    mlflow.log_param("n_estimators", n_estimators)
    mlflow.log_param("max_depth", max_depth)

    # Entraînement
    model = RandomForestClassifier(
        n_estimators=n_estimators,
        max_depth=max_depth
    )
    model.fit(X_train, y_train)

    # Métriques
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    f1 = f1_score(y_test, predictions, average='weighted')
    mlflow.log_metric("accuracy", accuracy)
    mlflow.log_metric("f1_score", f1)

    # Enregistrer le modèle comme artefact
    mlflow.sklearn.log_model(model, "model")

    print(f"Accuracy: {accuracy:.4f}, F1: {f1:.4f}")
\`\`\`

### Interface utilisateur

MLflow fournit une interface web pour visualiser et comparer les expériences :

\`\`\`bash
# Lancer le serveur MLflow UI
mlflow ui --port 5000

# Avec un backend de stockage
mlflow server \\
    --backend-store-uri sqlite:///mlflow.db \\
    --default-artifact-root ./mlruns \\
    --host 0.0.0.0 \\
    --port 5000
\`\`\`

## Model Registry

Le Model Registry est un registre centralisé pour gérer les versions de vos modèles. Il permet de suivre le cycle de vie d'un modèle depuis l'expérimentation jusqu'à la production.

### Étapes de gestion d'un modèle

\`\`\`python
import mlflow

# Enregistrer un modèle dans le registry
model_uri = "runs:/<run_id>/model"
mlflow.register_model(model_uri, "ClassificationClients")

# Charger une version spécifique
model = mlflow.pyfunc.load_model("models:/ClassificationClients/1")

# Charger le modèle en production
model = mlflow.pyfunc.load_model("models:/ClassificationClients@champion")
\`\`\`

### Alias et tags

MLflow utilise des alias pour marquer les modèles selon leur état dans le cycle de vie :

- **champion** : le modèle actuellement en production
- **challenger** : un modèle candidat en cours de validation
- Les **tags** permettent d'ajouter des métadonnées personnalisées (équipe, version de données, etc.)

## MLflow Models et Serving

MLflow standardise le format de packaging des modèles avec la notion de "flavor". Un modèle sauvegardé avec MLflow peut être déployé de multiples façons :

\`\`\`bash
# Serving local avec API REST
mlflow models serve -m "models:/ClassificationClients@champion" -p 8001

# Prédiction en batch
mlflow models predict \\
    -m "models:/ClassificationClients/1" \\
    -i input_data.csv
\`\`\`

### Format MLmodel

Chaque modèle sauvegardé contient un fichier \`MLmodel\` décrivant ses flavors :

\`\`\`yaml
artifact_path: model
flavors:
  python_function:
    env: conda.yaml
    loader_module: mlflow.sklearn
    model_path: model.pkl
  sklearn:
    code: null
    pickled_model: model.pkl
    sklearn_version: 1.3.0
\`\`\`

## Bonnes pratiques

- **Nommez vos expériences** de manière descriptive et cohérente
- **Loguez systématiquement** tous les paramètres, même ceux par défaut
- **Utilisez le autologging** quand disponible : \`mlflow.sklearn.autolog()\`
- **Versionnez vos données** en parallèle de vos modèles (avec DVC par exemple)
- **Configurez un serveur centralisé** pour le travail en équipe plutôt que le stockage local
- **Automatisez la promotion** des modèles avec des tests de validation
`,
  keyPoints: [
    'MLflow Tracking enregistre paramètres, métriques et artefacts pour chaque expérimentation de manière structurée',
    'Le Model Registry centralise la gestion des versions de modèles avec des alias (champion, challenger) pour le cycle de vie',
    'L\'interface web permet de comparer visuellement les performances entre différents runs et expériences',
    'MLflow Models standardise le packaging avec un système de flavors compatible avec de multiples frameworks',
    'L\'autologging simplifie le suivi en capturant automatiquement les paramètres et métriques des frameworks supportés',
    'Le serving intégré permet de déployer rapidement un modèle comme API REST ou en mode batch',
  ],
  resources: [
    {
      title: 'MLflow Documentation officielle',
      url: 'https://mlflow.org/docs/latest/index.html',
      type: 'article',
    },
    {
      title: 'MLflow Course - Made With ML (Goku Mohandas)',
      url: 'https://madewithml.com/courses/mlops/experiment-tracking/',
      type: 'course',
    },
    {
      title: 'MLflow - GitHub Repository',
      url: 'https://github.com/mlflow/mlflow',
      type: 'tool',
    },
  ],
  estimatedMinutes: 25,
};
