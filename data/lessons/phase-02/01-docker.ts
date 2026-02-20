import { Lesson } from '../../types';

export const dockerLesson: Lesson = {
  id: 'p2-docker',
  phaseId: 'phase-02',
  title: 'Fondamentaux de Docker pour le Machine Learning',
  content: `
# Fondamentaux de Docker pour le Machine Learning

## Introduction

Docker est devenu un outil incontournable dans l'écosystème MLOps. Il permet de créer des environnements reproductibles, portables et isolés pour vos projets de Machine Learning. Fini les problèmes de "ça marche sur ma machine" : avec Docker, votre environnement est défini comme du code.

## Les concepts fondamentaux

### Images Docker

Une image Docker est un modèle en lecture seule qui contient tout le nécessaire pour exécuter une application : le code, les dépendances, les bibliothèques système et les fichiers de configuration. Pour le ML, cela inclut Python, vos frameworks (TensorFlow, PyTorch, scikit-learn), et toutes les dépendances associées.

\`\`\`dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
CMD ["python", "train.py"]
\`\`\`

Les images sont construites en couches successives. Chaque instruction du Dockerfile crée une nouvelle couche, ce qui permet une mise en cache intelligente et des builds plus rapides.

### Conteneurs

Un conteneur est une instance en cours d'exécution d'une image. Il est isolé du système hôte et des autres conteneurs. Vous pouvez lancer plusieurs conteneurs à partir de la même image, chacun avec son propre état.

\`\`\`bash
# Construire l'image
docker build -t mon-modele-ml:v1 .

# Lancer un conteneur
docker run -d --name training mon-modele-ml:v1

# Voir les conteneurs actifs
docker ps

# Consulter les logs
docker logs training
\`\`\`

### Le Dockerfile en détail

Le Dockerfile est le fichier de configuration qui décrit comment construire votre image. Voici les instructions les plus importantes :

- **FROM** : définit l'image de base (par exemple \`python:3.11-slim\` ou \`nvidia/cuda:12.0-runtime\`)
- **WORKDIR** : définit le répertoire de travail dans le conteneur
- **COPY / ADD** : copie des fichiers depuis l'hôte vers l'image
- **RUN** : exécute des commandes pendant la construction (installation de paquets, etc.)
- **ENV** : définit des variables d'environnement
- **CMD / ENTRYPOINT** : définit la commande par défaut au lancement du conteneur

### Volumes : la persistance des données

Les conteneurs sont éphémères par nature. Les volumes permettent de persister les données au-delà du cycle de vie d'un conteneur. C'est essentiel en ML pour stocker les datasets, les modèles entraînés et les logs d'expérimentation.

\`\`\`bash
# Créer un volume nommé
docker volume create ml-data

# Monter un volume dans un conteneur
docker run -v ml-data:/app/data mon-modele-ml:v1

# Monter un répertoire local (bind mount)
docker run -v $(pwd)/datasets:/app/datasets mon-modele-ml:v1
\`\`\`

### Réseau Docker

Docker crée un réseau virtuel pour permettre la communication entre conteneurs. C'est utile lorsque votre pipeline ML comprend plusieurs services (API, base de données, tableau de bord).

\`\`\`bash
# Créer un réseau personnalisé
docker network create ml-network

# Connecter des conteneurs au réseau
docker run --network ml-network --name api mon-api:v1
docker run --network ml-network --name db postgres:15
\`\`\`

## Docker Compose pour les pipelines ML

Docker Compose permet d'orchestrer plusieurs conteneurs avec un seul fichier YAML :

\`\`\`yaml
version: '3.8'
services:
  training:
    build: ./training
    volumes:
      - ./data:/app/data
      - ./models:/app/models
  api:
    build: ./api
    ports:
      - "8000:8000"
    depends_on:
      - training
\`\`\`

## Bonnes pratiques pour le ML

- Utilisez des images de base légères (\`slim\` ou \`alpine\`) pour réduire la taille
- Exploitez le cache des couches en plaçant les instructions qui changent rarement en premier
- Utilisez un fichier \`.dockerignore\` pour exclure les datasets volumineux et les fichiers inutiles
- Taguez vos images avec des versions sémantiques pour assurer la traçabilité
- Pour le GPU, utilisez les images officielles NVIDIA CUDA comme base
`,
  keyPoints: [
    'Une image Docker encapsule tout l\'environnement nécessaire à l\'exécution d\'un projet ML de manière reproductible',
    'Les conteneurs sont des instances isolées et éphémères d\'une image, idéaux pour l\'entraînement et le serving',
    'Les volumes permettent de persister les données (datasets, modèles) au-delà du cycle de vie des conteneurs',
    'Le Dockerfile définit étape par étape la construction de l\'image avec un système de couches mises en cache',
    'Docker Compose orchestre plusieurs services (API, base de données, monitoring) dans un pipeline ML complet',
    'Les bonnes pratiques incluent des images légères, un cache optimisé et un tagging versionné',
  ],
  resources: [
    {
      title: 'Docker Documentation officielle - Get Started',
      url: 'https://docs.docker.com/get-started/',
      type: 'article',
    },
    {
      title: 'Docker for Machine Learning - Full Course (freeCodeCamp)',
      url: 'https://www.youtube.com/watch?v=0H2miBK_gAk',
      type: 'video',
    },
    {
      title: 'Docker Hub - Images officielles Python',
      url: 'https://hub.docker.com/_/python',
      type: 'tool',
    },
  ],
  estimatedMinutes: 25,
};
