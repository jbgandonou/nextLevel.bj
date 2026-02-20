import { Lesson } from '../../types';

export const cicdLesson: Lesson = {
  id: 'p2-cicd',
  phaseId: 'phase-02',
  title: 'CI/CD avec GitHub Actions pour le Machine Learning',
  content: `
# CI/CD avec GitHub Actions pour le Machine Learning

## Introduction

L'intégration continue (CI) et le déploiement continu (CD) sont des pratiques fondamentales du développement logiciel moderne. Dans le contexte du MLOps, le CI/CD permet d'automatiser les tests, la validation des modèles et le déploiement en production. GitHub Actions est un outil puissant et gratuit intégré directement à GitHub pour implémenter ces pipelines.

## Concepts fondamentaux de GitHub Actions

### Terminologie

- **Workflow** : un processus automatisé défini dans un fichier YAML dans \`.github/workflows/\`
- **Event** : l'événement déclencheur (push, pull request, schedule, etc.)
- **Job** : un ensemble d'étapes exécutées sur un même runner
- **Step** : une tâche individuelle au sein d'un job (commande shell ou action)
- **Action** : un composant réutilisable (par exemple, \`actions/checkout@v4\`)
- **Runner** : la machine virtuelle qui exécute le workflow

### Structure d'un workflow

\`\`\`yaml
name: ML Pipeline CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: pytest tests/ -v
\`\`\`

## Pipeline CI pour le Machine Learning

### Tests du code et des données

\`\`\`yaml
jobs:
  code-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Installer les dépendances
        run: |
          pip install -r requirements.txt
          pip install ruff pytest great-expectations

      - name: Linting avec Ruff
        run: ruff check .

      - name: Tests unitaires
        run: pytest tests/unit/ -v --tb=short

      - name: Tests d'intégration
        run: pytest tests/integration/ -v

      - name: Validation des données
        run: python scripts/validate_data.py
\`\`\`

### Tests de performance du modèle

\`\`\`yaml
  model-validation:
    runs-on: ubuntu-latest
    needs: code-quality
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Installer les dépendances
        run: pip install -r requirements.txt

      - name: Entraîner le modèle
        run: python train.py --config configs/ci.yaml

      - name: Valider les métriques
        run: |
          python scripts/check_metrics.py \\
            --min-accuracy 0.85 \\
            --max-latency-ms 100

      - name: Sauvegarder les artefacts
        uses: actions/upload-artifact@v4
        with:
          name: model-artifacts
          path: |
            models/
            reports/
\`\`\`

## Pipeline CD pour le déploiement

### Déploiement automatique

\`\`\`yaml
  deploy:
    runs-on: ubuntu-latest
    needs: model-validation
    if: github.ref == 'refs/heads/main'
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Télécharger les artefacts
        uses: actions/download-artifact@v4
        with:
          name: model-artifacts

      - name: Connexion au registre Docker
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Construire et pousser l'image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}/ml-api:latest

      - name: Déployer sur Kubernetes
        run: |
          kubectl set image deployment/ml-api \\
            ml-api=ghcr.io/\${{ github.repository }}/ml-api:latest
        env:
          KUBECONFIG: \${{ secrets.KUBECONFIG }}
\`\`\`

## Gestion des secrets

GitHub Actions fournit un système sécurisé pour stocker les informations sensibles :

\`\`\`yaml
env:
  MLFLOW_TRACKING_URI: \${{ secrets.MLFLOW_TRACKING_URI }}
  AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
\`\`\`

Les secrets sont configurés dans **Settings > Secrets and variables > Actions** du dépôt GitHub. Ils ne sont jamais affichés dans les logs.

## Workflows planifiés pour le réentraînement

\`\`\`yaml
name: Réentraînement hebdomadaire

on:
  schedule:
    - cron: '0 2 * * 1'  # Tous les lundis à 2h du matin
  workflow_dispatch:        # Déclenchement manuel possible

jobs:
  retrain:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Télécharger les nouvelles données
        run: python scripts/fetch_data.py

      - name: Réentraîner le modèle
        run: python train.py --config configs/retrain.yaml

      - name: Comparer avec le modèle en production
        run: python scripts/compare_models.py

      - name: Promouvoir si amélioré
        run: python scripts/promote_model.py --if-better
\`\`\`

## Bonnes pratiques

- **Utilisez le cache** (\`actions/cache\` ou \`setup-python\` avec cache) pour accélérer les builds
- **Séparez les jobs** pour paralléliser et isoler les étapes (tests, validation, déploiement)
- **Protégez la branche main** avec des règles de protection et des checks obligatoires
- **Utilisez les environments** GitHub pour contrôler les approbations de déploiement
- **Limitez les permissions** du GITHUB_TOKEN au minimum nécessaire avec le bloc \`permissions:\`
- **Versionnez vos actions** avec des tags spécifiques plutôt que \`@latest\`
`,
  keyPoints: [
    'GitHub Actions permet d\'automatiser les tests, la validation et le déploiement des modèles ML directement depuis le dépôt',
    'Un pipeline CI/CD ML inclut le linting, les tests unitaires, la validation des données et la vérification des métriques du modèle',
    'Les workflows planifiés (cron) automatisent le réentraînement périodique des modèles avec de nouvelles données',
    'Les secrets GitHub stockent de manière sécurisée les clés d\'API, tokens et configurations sensibles',
    'Le déploiement continu construit des images Docker et les déploie automatiquement sur Kubernetes après validation',
    'Le cache des dépendances et la parallélisation des jobs réduisent significativement le temps d\'exécution des pipelines',
  ],
  resources: [
    {
      title: 'GitHub Actions Documentation officielle',
      url: 'https://docs.github.com/en/actions',
      type: 'article',
    },
    {
      title: 'GitHub Actions for Machine Learning (MLOps Community)',
      url: 'https://www.youtube.com/watch?v=9BgIDqAzfuA',
      type: 'video',
    },
    {
      title: 'Awesome MLOps - GitHub Actions templates',
      url: 'https://github.com/visenger/awesome-mlops',
      type: 'tool',
    },
  ],
  estimatedMinutes: 25,
};
