import { QuizQuestion } from '../types';

export const phase02Questions: QuizQuestion[] = [
  // ==================== EASY (12 questions: p2-q01 to p2-q12) ====================
  {
    id: 'p2-q01',
    phaseId: 'phase-02',
    lessonId: 'p2-docker',
    question: 'Qu\'est-ce qu\'un conteneur Docker ?',
    options: [
      'Une machine virtuelle complète avec son propre système d\'exploitation',
      'Une unité légère et isolée qui empaquète une application et ses dépendances',
      'Un outil de gestion de base de données',
      'Un serveur web dédié',
    ],
    correctIndex: 1,
    explanation:
      'Un conteneur Docker est une unité standardisée et légère qui empaquète le code d\'une application avec toutes ses dépendances (bibliothèques, runtime, fichiers de configuration). Contrairement à une machine virtuelle, il partage le noyau du système hôte, ce qui le rend beaucoup plus léger et rapide à démarrer.',
    difficulty: 'easy',
  },
  {
    id: 'p2-q02',
    phaseId: 'phase-02',
    lessonId: 'p2-docker',
    question: 'Quel fichier est utilisé pour définir les instructions de construction d\'une image Docker ?',
    options: ['docker-compose.yml', 'Dockerfile', 'package.json', 'Makefile'],
    correctIndex: 1,
    explanation:
      'Le Dockerfile est un fichier texte contenant une série d\'instructions (FROM, RUN, COPY, CMD, etc.) qui définissent comment construire une image Docker. Chaque instruction crée une couche (layer) dans l\'image finale. Le docker-compose.yml, quant à lui, orchestre plusieurs conteneurs.',
    difficulty: 'easy',
  },
  {
    id: 'p2-q03',
    phaseId: 'phase-02',
    lessonId: 'p2-kubernetes',
    question: 'Qu\'est-ce que Kubernetes ?',
    options: [
      'Un langage de programmation',
      'Une plateforme d\'orchestration de conteneurs',
      'Un système de gestion de base de données',
      'Un framework de développement web',
    ],
    correctIndex: 1,
    explanation:
      'Kubernetes (K8s) est une plateforme open-source d\'orchestration de conteneurs développée initialement par Google. Elle automatise le déploiement, la mise à l\'échelle et la gestion des applications conteneurisées sur un cluster de machines.',
    difficulty: 'easy',
  },
  {
    id: 'p2-q04',
    phaseId: 'phase-02',
    lessonId: 'p2-mlflow',
    question: 'Quel est le rôle principal de MLflow dans un pipeline MLOps ?',
    options: [
      'Entraîner des modèles de deep learning',
      'Suivre les expériences, gérer les modèles et faciliter le déploiement ML',
      'Créer des interfaces utilisateur',
      'Gérer les bases de données relationnelles',
    ],
    correctIndex: 1,
    explanation:
      'MLflow est une plateforme open-source pour le cycle de vie complet du machine learning. Ses composants principaux incluent MLflow Tracking (suivi des expériences et métriques), MLflow Models (packaging des modèles), MLflow Projects (reproductibilité) et le Model Registry (gestion des versions de modèles).',
    difficulty: 'easy',
  },
  {
    id: 'p2-q05',
    phaseId: 'phase-02',
    lessonId: 'p2-fastapi',
    question: 'Qu\'est-ce que FastAPI ?',
    options: [
      'Une base de données NoSQL',
      'Un framework Python moderne et performant pour créer des APIs web',
      'Un outil de monitoring système',
      'Un orchestrateur de conteneurs',
    ],
    correctIndex: 1,
    explanation:
      'FastAPI est un framework Python moderne et très performant pour la construction d\'APIs web. Il se base sur les annotations de type Python (type hints) et génère automatiquement la documentation OpenAPI (Swagger). Il est particulièrement populaire pour servir des modèles de machine learning grâce à sa rapidité et sa simplicité.',
    difficulty: 'easy',
  },
  {
    id: 'p2-q06',
    phaseId: 'phase-02',
    lessonId: 'p2-cicd',
    question: 'Que signifie CI/CD ?',
    options: [
      'Computer Integration / Computer Deployment',
      'Intégration Continue / Déploiement Continu (ou Livraison Continue)',
      'Central Intelligence / Central Delivery',
      'Code Inspection / Code Debugging',
    ],
    correctIndex: 1,
    explanation:
      'CI/CD signifie Continuous Integration / Continuous Delivery (ou Deployment). L\'intégration continue automatise la compilation et les tests à chaque modification du code. La livraison continue automatise la mise à disposition en environnement de staging, tandis que le déploiement continu va jusqu\'à la mise en production automatique.',
    difficulty: 'easy',
  },
  {
    id: 'p2-q07',
    phaseId: 'phase-02',
    lessonId: 'p2-docker',
    question: 'Quelle commande Docker permet de lister tous les conteneurs en cours d\'exécution ?',
    options: [
      'docker images',
      'docker ps',
      'docker build',
      'docker pull',
    ],
    correctIndex: 1,
    explanation:
      'La commande "docker ps" affiche la liste de tous les conteneurs actuellement en cours d\'exécution. Pour voir également les conteneurs arrêtés, on utilise "docker ps -a". "docker images" liste les images locales, "docker build" construit une image, et "docker pull" télécharge une image.',
    difficulty: 'easy',
  },
  {
    id: 'p2-q08',
    phaseId: 'phase-02',
    lessonId: 'p2-kubernetes',
    question: 'Qu\'est-ce qu\'un Pod dans Kubernetes ?',
    options: [
      'Un cluster de serveurs',
      'La plus petite unité déployable, contenant un ou plusieurs conteneurs',
      'Un fichier de configuration',
      'Un réseau virtuel',
    ],
    correctIndex: 1,
    explanation:
      'Un Pod est la plus petite unité déployable dans Kubernetes. Il encapsule un ou plusieurs conteneurs qui partagent le même réseau (adresse IP) et le même stockage. Les conteneurs d\'un même Pod sont toujours co-localisés et co-schedulés sur le même nœud.',
    difficulty: 'easy',
  },
  {
    id: 'p2-q09',
    phaseId: 'phase-02',
    lessonId: 'p2-docker',
    question: 'Quel outil est couramment utilisé pour orchestrer plusieurs conteneurs Docker localement ?',
    options: [
      'Docker Swarm',
      'Docker Compose',
      'Kubernetes',
      'Terraform',
    ],
    correctIndex: 1,
    explanation:
      'Docker Compose est un outil qui permet de définir et gérer des applications multi-conteneurs via un fichier YAML (docker-compose.yml). Il est idéal pour le développement local et les tests, permettant de démarrer tous les services d\'une application avec une seule commande "docker compose up".',
    difficulty: 'easy',
  },
  {
    id: 'p2-q10',
    phaseId: 'phase-02',
    lessonId: 'p2-fastapi',
    question: 'Quelle décoration FastAPI est utilisée pour définir un endpoint GET ?',
    options: [
      '@app.post("/route")',
      '@app.get("/route")',
      '@app.route("/route")',
      '@app.fetch("/route")',
    ],
    correctIndex: 1,
    explanation:
      'Dans FastAPI, le décorateur @app.get("/route") définit un endpoint HTTP GET. FastAPI fournit des décorateurs pour chaque méthode HTTP : @app.get(), @app.post(), @app.put(), @app.delete(), etc. Le décorateur @app.route() n\'existe pas dans FastAPI (il est propre à Flask).',
    difficulty: 'easy',
  },
  {
    id: 'p2-q11',
    phaseId: 'phase-02',
    lessonId: 'p2-cicd',
    question: 'Qu\'est-ce que le "data drift" en MLOps ?',
    options: [
      'Une erreur dans le code d\'entraînement',
      'Un changement dans la distribution des données d\'entrée par rapport aux données d\'entraînement',
      'Une perte de données lors du transfert',
      'Un bug dans le pipeline de déploiement',
    ],
    correctIndex: 1,
    explanation:
      'Le data drift désigne un changement dans la distribution statistique des données d\'entrée en production par rapport aux données utilisées lors de l\'entraînement du modèle. Ce phénomène peut dégrader les performances du modèle au fil du temps et nécessite un monitoring continu pour être détecté.',
    difficulty: 'easy',
  },
  {
    id: 'p2-q12',
    phaseId: 'phase-02',
    lessonId: 'p2-docker',
    question: 'Quel est le rôle d\'un fichier .dockerignore ?',
    options: [
      'Lister les images Docker à ne pas télécharger',
      'Exclure des fichiers et répertoires du contexte de build Docker',
      'Configurer les paramètres réseau Docker',
      'Définir les variables d\'environnement du conteneur',
    ],
    correctIndex: 1,
    explanation:
      'Le fichier .dockerignore fonctionne comme un .gitignore mais pour Docker. Il spécifie les fichiers et répertoires à exclure du contexte de build envoyé au daemon Docker. Cela accélère le build, réduit la taille de l\'image et évite d\'inclure des fichiers sensibles (comme .env, node_modules, .git).',
    difficulty: 'easy',
  },

  // ==================== MEDIUM (16 questions: p2-q13 to p2-q28) ====================
  {
    id: 'p2-q13',
    phaseId: 'phase-02',
    lessonId: 'p2-docker',
    question: 'Quelle instruction Dockerfile est recommandée pour réduire le nombre de couches (layers) dans une image ?',
    options: [
      'Utiliser ADD au lieu de COPY',
      'Chaîner les commandes RUN avec && dans une seule instruction',
      'Utiliser plusieurs instructions FROM',
      'Ajouter VOLUME pour chaque répertoire',
    ],
    correctIndex: 1,
    explanation:
      'Chaîner les commandes RUN avec "&&" réduit le nombre de couches dans l\'image Docker. Chaque instruction RUN crée une nouvelle couche. En combinant les commandes (par exemple RUN apt-get update && apt-get install -y package && rm -rf /var/lib/apt/lists/*), on réduit les couches et la taille de l\'image.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q14',
    phaseId: 'phase-02',
    lessonId: 'p2-kubernetes',
    question: 'Qu\'est-ce qu\'un Deployment dans Kubernetes ?',
    options: [
      'Un conteneur unique en production',
      'Un objet qui gère un ensemble de Pods répliqués et permet les mises à jour déclaratives',
      'Un service de load balancing',
      'Un volume de stockage persistant',
    ],
    correctIndex: 1,
    explanation:
      'Un Deployment Kubernetes est un objet qui déclare l\'état souhaité pour un ensemble de Pods. Il gère un ReplicaSet pour maintenir le nombre de réplicas souhaité et permet des mises à jour progressives (rolling updates), des rollbacks et la mise à l\'échelle automatique des applications.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q15',
    phaseId: 'phase-02',
    lessonId: 'p2-mlflow',
    question: 'Dans MLflow Tracking, quelle fonction est utilisée pour enregistrer un paramètre d\'expérience ?',
    options: [
      'mlflow.log_metric()',
      'mlflow.log_param()',
      'mlflow.log_artifact()',
      'mlflow.set_tag()',
    ],
    correctIndex: 1,
    explanation:
      'mlflow.log_param() enregistre un paramètre d\'entrée d\'une expérience (ex: learning_rate, batch_size). mlflow.log_metric() enregistre une métrique de résultat (ex: accuracy, loss). mlflow.log_artifact() enregistre un fichier (ex: modèle, graphique). mlflow.set_tag() ajoute des métadonnées descriptives.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q16',
    phaseId: 'phase-02',
    lessonId: 'p2-fastapi',
    question: 'Comment FastAPI gère-t-il la validation des données d\'entrée ?',
    options: [
      'Par des décorateurs personnalisés',
      'Par les modèles Pydantic et les annotations de type Python',
      'Par des middleware Express',
      'Par des schémas XML',
    ],
    correctIndex: 1,
    explanation:
      'FastAPI utilise les modèles Pydantic et les annotations de type Python (type hints) pour valider automatiquement les données d\'entrée. Lorsqu\'on définit un modèle Pydantic comme paramètre d\'un endpoint, FastAPI valide les données entrantes, génère des messages d\'erreur clairs et produit la documentation OpenAPI automatiquement.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q17',
    phaseId: 'phase-02',
    lessonId: 'p2-kubernetes',
    question: 'Quel est le rôle d\'un Service de type LoadBalancer dans Kubernetes ?',
    options: [
      'Stocker les données de configuration',
      'Exposer un service à l\'extérieur du cluster en distribuant le trafic entre les Pods',
      'Gérer les secrets et mots de passe',
      'Surveiller la santé des nœuds',
    ],
    correctIndex: 1,
    explanation:
      'Un Service de type LoadBalancer dans Kubernetes provisionne un load balancer externe (généralement fourni par le cloud provider) qui distribue le trafic entrant entre les Pods du service. C\'est le moyen standard d\'exposer un service à Internet dans un environnement cloud.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q18',
    phaseId: 'phase-02',
    lessonId: 'p2-docker',
    question: 'Qu\'est-ce qu\'un multi-stage build dans Docker ?',
    options: [
      'Construire plusieurs images en parallèle',
      'Utiliser plusieurs instructions FROM dans un seul Dockerfile pour créer des images de production plus légères',
      'Déployer un conteneur sur plusieurs serveurs',
      'Exécuter plusieurs processus dans un conteneur',
    ],
    correctIndex: 1,
    explanation:
      'Un multi-stage build utilise plusieurs instructions FROM dans un même Dockerfile. Cela permet de séparer l\'environnement de build (avec les outils de compilation) de l\'image finale de production. On copie uniquement les artefacts nécessaires de l\'étape de build vers l\'image finale, produisant ainsi des images beaucoup plus légères.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q19',
    phaseId: 'phase-02',
    lessonId: 'p2-mlflow',
    question: 'Quel composant MLflow permet de gérer les versions de modèles et leurs transitions entre étapes (staging, production) ?',
    options: [
      'MLflow Tracking',
      'MLflow Model Registry',
      'MLflow Projects',
      'MLflow Recipes',
    ],
    correctIndex: 1,
    explanation:
      'MLflow Model Registry est un composant centralisé pour gérer le cycle de vie complet des modèles ML. Il permet de versionner les modèles, d\'ajouter des descriptions et des tags, et de gérer les transitions entre étapes : Staging (test), Production (déployé), et Archived (retiré).',
    difficulty: 'medium',
  },
  {
    id: 'p2-q20',
    phaseId: 'phase-02',
    lessonId: 'p2-kubernetes',
    question: 'Quelle est la différence entre une liveness probe et une readiness probe dans Kubernetes ?',
    options: [
      'La liveness vérifie le CPU, la readiness vérifie la mémoire',
      'La liveness vérifie si le conteneur est vivant (sinon il est redémarré), la readiness vérifie s\'il est prêt à recevoir du trafic',
      'La liveness est pour les Pods, la readiness pour les Services',
      'Il n\'y a aucune différence',
    ],
    correctIndex: 1,
    explanation:
      'La liveness probe vérifie si le conteneur est toujours en vie. Si elle échoue, Kubernetes redémarre le conteneur. La readiness probe vérifie si le conteneur est prêt à recevoir du trafic. Si elle échoue, le Pod est retiré des endpoints du Service. Un conteneur peut être vivant mais pas encore prêt (ex: chargement d\'un modèle ML en mémoire).',
    difficulty: 'medium',
  },
  {
    id: 'p2-q21',
    phaseId: 'phase-02',
    lessonId: 'p2-docker',
    question: 'Quelle commande permet de surveiller les logs d\'un conteneur Docker en temps réel ?',
    options: [
      'docker inspect <container>',
      'docker logs -f <container>',
      'docker stats <container>',
      'docker top <container>',
    ],
    correctIndex: 1,
    explanation:
      'La commande "docker logs -f <container>" affiche les logs d\'un conteneur et continue à les suivre en temps réel (le flag -f signifie "follow"). "docker inspect" affiche les métadonnées du conteneur, "docker stats" montre l\'utilisation des ressources, et "docker top" liste les processus en cours.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q22',
    phaseId: 'phase-02',
    lessonId: 'p2-fastapi',
    question: 'Quel est l\'avantage principal de FastAPI par rapport à Flask pour servir des modèles ML ?',
    options: [
      'FastAPI a plus de plugins disponibles',
      'FastAPI supporte nativement l\'asynchrone (async/await) et la validation automatique des données',
      'FastAPI est écrit en C++ pour plus de performance',
      'FastAPI inclut un ORM intégré',
    ],
    correctIndex: 1,
    explanation:
      'FastAPI supporte nativement les opérations asynchrones (async/await) grâce à Starlette, ce qui permet de gérer efficacement de nombreuses requêtes concurrentes. De plus, la validation automatique des données via Pydantic et la génération de documentation OpenAPI en font un choix idéal pour les APIs de ML en production.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q23',
    phaseId: 'phase-02',
    lessonId: 'p2-cicd',
    question: 'Dans un pipeline CI/CD pour le ML, quelle étape vérifie que les performances du nouveau modèle sont acceptables avant le déploiement ?',
    options: [
      'Linting du code',
      'Tests de validation du modèle (model validation gates)',
      'Compilation du code',
      'Scan de sécurité des dépendances',
    ],
    correctIndex: 1,
    explanation:
      'Les tests de validation du modèle (model validation gates) vérifient que le nouveau modèle atteint des seuils de performance minimaux (accuracy, latence, etc.) avant d\'autoriser son déploiement. C\'est une étape critique dans un pipeline CI/CD ML qui empêche le déploiement de modèles dégradés en production.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q24',
    phaseId: 'phase-02',
    lessonId: 'p2-kubernetes',
    question: 'Quel objet Kubernetes est utilisé pour stocker des informations sensibles comme des mots de passe ?',
    options: [
      'ConfigMap',
      'Secret',
      'PersistentVolume',
      'Namespace',
    ],
    correctIndex: 1,
    explanation:
      'Les Secrets Kubernetes stockent des données sensibles (mots de passe, tokens, clés API) encodées en base64. Contrairement aux ConfigMaps (qui stockent des configurations non sensibles), les Secrets bénéficient de contrôles d\'accès plus stricts et peuvent être chiffrés au repos. Ils sont montés dans les Pods en tant que volumes ou variables d\'environnement.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q25',
    phaseId: 'phase-02',
    lessonId: 'p2-cicd',
    question: 'Qu\'est-ce qu\'un "feature store" dans l\'écosystème MLOps ?',
    options: [
      'Un magasin d\'applications ML',
      'Un système centralisé pour stocker, gérer et servir les features (caractéristiques) pour l\'entraînement et l\'inférence',
      'Un dépôt de code pour les modèles',
      'Un outil de visualisation de données',
    ],
    correctIndex: 1,
    explanation:
      'Un feature store est un système centralisé qui gère les features (caractéristiques) utilisées par les modèles ML. Il assure la cohérence entre les features utilisées lors de l\'entraînement et de l\'inférence, évite la duplication du travail de feature engineering, et permet le partage de features entre équipes. Feast est un exemple populaire.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q26',
    phaseId: 'phase-02',
    lessonId: 'p2-cicd',
    question: 'Quelle stratégie de déploiement Kubernetes remplace progressivement les anciennes instances par les nouvelles ?',
    options: [
      'Recreate',
      'Rolling Update',
      'Blue-Green',
      'Canary',
    ],
    correctIndex: 1,
    explanation:
      'La stratégie Rolling Update remplace progressivement les anciens Pods par les nouveaux, garantissant qu\'un certain nombre de Pods reste toujours disponible pendant la mise à jour. Les paramètres maxUnavailable et maxSurge contrôlent le rythme de la mise à jour. C\'est la stratégie par défaut des Deployments Kubernetes.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q27',
    phaseId: 'phase-02',
    lessonId: 'p2-fastapi',
    question: 'Quelle fonctionnalité de FastAPI permet de gérer des opérations d\'initialisation (comme le chargement d\'un modèle ML) au démarrage de l\'application ?',
    options: [
      '@app.middleware("http")',
      'L\'événement lifespan ou @app.on_event("startup")',
      '@app.exception_handler()',
      '@app.websocket()',
    ],
    correctIndex: 1,
    explanation:
      'FastAPI permet de définir des actions au démarrage via le gestionnaire lifespan (recommandé) ou le décorateur @app.on_event("startup"). C\'est l\'endroit idéal pour charger un modèle ML en mémoire, initialiser les connexions aux bases de données, ou configurer le logging, afin que ces ressources soient prêtes avant de recevoir des requêtes.',
    difficulty: 'medium',
  },
  {
    id: 'p2-q28',
    phaseId: 'phase-02',
    lessonId: 'p2-kubernetes',
    question: 'Quel est le rôle d\'un Horizontal Pod Autoscaler (HPA) dans Kubernetes ?',
    options: [
      'Augmenter la taille du disque des Pods',
      'Ajuster automatiquement le nombre de réplicas de Pods selon l\'utilisation des ressources',
      'Mettre à jour automatiquement les images des conteneurs',
      'Gérer la distribution géographique des Pods',
    ],
    correctIndex: 1,
    explanation:
      'Le Horizontal Pod Autoscaler (HPA) ajuste automatiquement le nombre de réplicas d\'un Deployment ou ReplicaSet en fonction de métriques observées comme l\'utilisation CPU, mémoire ou des métriques personnalisées. Cela permet de scaler automatiquement les applications en fonction de la charge.',
    difficulty: 'medium',
  },

  // ==================== HARD (12 questions: p2-q29 to p2-q40) ====================
  {
    id: 'p2-q29',
    phaseId: 'phase-02',
    lessonId: 'p2-cicd',
    question: 'Quelle est la différence entre un déploiement Blue-Green et un déploiement Canary pour un modèle ML ?',
    options: [
      'Blue-Green est pour le développement, Canary pour la production',
      'Blue-Green bascule tout le trafic d\'un coup vers la nouvelle version, Canary route progressivement un pourcentage croissant du trafic',
      'Canary nécessite plus de ressources que Blue-Green',
      'Il n\'y a aucune différence pratique',
    ],
    correctIndex: 1,
    explanation:
      'Le déploiement Blue-Green maintient deux environnements identiques (Blue = actuel, Green = nouveau) et bascule tout le trafic d\'un coup. Le déploiement Canary route d\'abord un petit pourcentage du trafic vers la nouvelle version, augmentant progressivement si les métriques sont satisfaisantes. Pour les modèles ML, le Canary permet de détecter les régressions de performance avant un déploiement complet.',
    difficulty: 'hard',
  },
  {
    id: 'p2-q30',
    phaseId: 'phase-02',
    lessonId: 'p2-docker',
    question: 'Dans un Dockerfile multi-stage, comment copier un artefact de l\'étape de build nommée "builder" vers l\'image finale ?',
    options: [
      'RUN cp --from=builder /app/model.pkl /app/',
      'COPY --from=builder /app/model.pkl /app/',
      'ADD --stage=builder /app/model.pkl /app/',
      'IMPORT builder:/app/model.pkl /app/',
    ],
    correctIndex: 1,
    explanation:
      'L\'instruction COPY --from=builder permet de copier des fichiers depuis une étape de build précédente nommée (définie par FROM ... AS builder). C\'est essentiel pour les multi-stage builds, permettant de garder dans l\'image finale uniquement les artefacts nécessaires, sans les outils de build.',
    difficulty: 'hard',
  },
  {
    id: 'p2-q31',
    phaseId: 'phase-02',
    lessonId: 'p2-mlflow',
    question: 'Quel pattern permet de découpler l\'entraînement du modèle de son service d\'inférence dans une architecture MLOps ?',
    options: [
      'Monolithe',
      'Architecture basée sur les événements avec un model registry comme intermédiaire',
      'Appels RPC directs entre entraînement et inférence',
      'Base de données partagée',
    ],
    correctIndex: 1,
    explanation:
      'Une architecture événementielle avec un model registry (comme MLflow Model Registry) découple l\'entraînement de l\'inférence. Le pipeline d\'entraînement publie un nouveau modèle dans le registry, déclenchant un événement. Le service d\'inférence détecte le nouveau modèle et le charge. Cela permet une évolution indépendante des deux composants.',
    difficulty: 'hard',
  },
  {
    id: 'p2-q32',
    phaseId: 'phase-02',
    lessonId: 'p2-kubernetes',
    question: 'Quelle ressource Kubernetes est utilisée pour exécuter un job d\'entraînement ML qui doit s\'exécuter une seule fois ?',
    options: [
      'Deployment',
      'Job',
      'DaemonSet',
      'StatefulSet',
    ],
    correctIndex: 1,
    explanation:
      'Un Job Kubernetes crée un ou plusieurs Pods et garantit qu\'un nombre spécifié se terminent avec succès. Contrairement aux Deployments (qui maintiennent des Pods en continu), les Jobs sont conçus pour les tâches à durée finie comme l\'entraînement ML, le preprocessing de données ou les migrations de base de données. CronJob permet de planifier des Jobs récurrents.',
    difficulty: 'hard',
  },
  {
    id: 'p2-q33',
    phaseId: 'phase-02',
    lessonId: 'p2-fastapi',
    question: 'Comment implémenter un health check personnalisé dans FastAPI pour vérifier la disponibilité d\'un modèle ML chargé en mémoire ?',
    options: [
      'Utiliser un décorateur @app.health()',
      'Créer un endpoint GET qui vérifie l\'état du modèle et retourne un code 200 ou 503',
      'Configurer un fichier health.json',
      'Utiliser le middleware CORS',
    ],
    correctIndex: 1,
    explanation:
      'On crée un endpoint (ex: GET /health) qui vérifie si le modèle est chargé en mémoire et fonctionnel, puis retourne un code 200 (OK) ou 503 (Service Unavailable). Ce endpoint est ensuite utilisé par Kubernetes comme liveness et readiness probe, permettant une gestion automatique de la disponibilité du service.',
    difficulty: 'hard',
  },
  {
    id: 'p2-q34',
    phaseId: 'phase-02',
    lessonId: 'p2-kubernetes',
    question: 'Quel est le rôle d\'un Ingress Controller dans Kubernetes ?',
    options: [
      'Gérer le stockage persistant',
      'Gérer le trafic HTTP/HTTPS entrant dans le cluster en agissant comme un reverse proxy et load balancer L7',
      'Orchestrer les Pods sur les nœuds',
      'Surveiller l\'utilisation des ressources',
    ],
    correctIndex: 1,
    explanation:
      'Un Ingress Controller implémente les règles définies dans les ressources Ingress. Il agit comme un reverse proxy et load balancer de couche 7 (HTTP/HTTPS), gérant le routage basé sur les noms d\'hôte et les chemins URL, la terminaison TLS, et la distribution du trafic vers les services appropriés. Nginx et Traefik sont des Ingress Controllers populaires.',
    difficulty: 'hard',
  },
  {
    id: 'p2-q35',
    phaseId: 'phase-02',
    lessonId: 'p2-fastapi',
    question: 'Qu\'est-ce que le "model serving" avec TensorFlow Serving et comment se compare-t-il à une API FastAPI ?',
    options: [
      'TF Serving est uniquement pour le développement, FastAPI pour la production',
      'TF Serving est optimisé pour servir des modèles TensorFlow avec batching automatique et gestion de versions, FastAPI est plus flexible mais nécessite plus de code personnalisé',
      'FastAPI est toujours plus performant que TF Serving',
      'TF Serving ne supporte pas les requêtes HTTP',
    ],
    correctIndex: 1,
    explanation:
      'TensorFlow Serving est un système spécialisé pour servir des modèles TF en production, avec des fonctionnalités intégrées comme le batching automatique des requêtes, le hot-swapping de modèles et la gestion de versions. FastAPI offre plus de flexibilité (support de tout framework ML) mais requiert une implémentation manuelle de ces fonctionnalités.',
    difficulty: 'hard',
  },
  {
    id: 'p2-q36',
    phaseId: 'phase-02',
    lessonId: 'p2-cicd',
    question: 'Dans un pipeline CI/CD pour le ML, quel outil est spécifiquement conçu pour versionner les données et les pipelines ML ?',
    options: [
      'Git',
      'DVC (Data Version Control)',
      'Jenkins',
      'Prometheus',
    ],
    correctIndex: 1,
    explanation:
      'DVC (Data Version Control) est un outil open-source qui étend Git pour gérer le versionnement de grands fichiers de données et de modèles ML. Il stocke les métadonnées dans Git tout en gardant les fichiers volumineux dans un stockage externe (S3, GCS, etc.). Il permet aussi de définir et reproduire des pipelines ML de manière déclarative.',
    difficulty: 'hard',
  },
  {
    id: 'p2-q37',
    phaseId: 'phase-02',
    lessonId: 'p2-docker',
    question: 'Quelle stratégie Docker permet de limiter les ressources CPU et mémoire disponibles pour un conteneur ?',
    options: [
      'Docker volumes',
      'Les flags --cpus et --memory lors du docker run',
      'Le fichier .dockerignore',
      'L\'instruction EXPOSE dans le Dockerfile',
    ],
    correctIndex: 1,
    explanation:
      'Les flags --cpus (ex: --cpus="1.5") et --memory (ex: --memory="512m") de la commande docker run limitent les ressources disponibles pour un conteneur via les cgroups Linux. C\'est essentiel pour l\'inférence ML afin d\'éviter qu\'un modèle gourmand ne monopolise toutes les ressources de l\'hôte et impacte les autres services.',
    difficulty: 'hard',
  },
  {
    id: 'p2-q38',
    phaseId: 'phase-02',
    lessonId: 'p2-mlflow',
    question: 'Comment MLflow gère-t-il la reproductibilité d\'une expérience avec MLflow Projects ?',
    options: [
      'En sauvegardant uniquement les métriques finales',
      'En définissant un fichier MLproject qui spécifie l\'environnement (Conda/Docker), les points d\'entrée et les paramètres',
      'En copiant automatiquement le dataset complet',
      'En créant un snapshot de la machine virtuelle',
    ],
    correctIndex: 1,
    explanation:
      'MLflow Projects utilise un fichier MLproject (YAML) qui définit l\'environnement d\'exécution (via Conda, Docker ou système), les points d\'entrée (scripts à exécuter) et leurs paramètres. Combiné avec le suivi des expériences (Tracking) et le versionnement du code (Git), cela permet de reproduire exactement une expérience sur n\'importe quelle machine.',
    difficulty: 'hard',
  },
  {
    id: 'p2-q39',
    phaseId: 'phase-02',
    lessonId: 'p2-kubernetes',
    question: 'Quel est l\'avantage d\'utiliser des Custom Resource Definitions (CRDs) dans Kubernetes pour les workflows ML ?',
    options: [
      'Accélérer le temps de démarrage des Pods',
      'Étendre l\'API Kubernetes avec des objets personnalisés adaptés aux concepts ML (comme Training Jobs ou Model Deployments)',
      'Réduire la consommation mémoire des conteneurs',
      'Chiffrer automatiquement les communications réseau',
    ],
    correctIndex: 1,
    explanation:
      'Les CRDs permettent d\'étendre l\'API Kubernetes avec des objets personnalisés. Des projets comme Kubeflow utilisent des CRDs pour définir des concepts ML natifs (TFJob, PyTorchJob, InferenceService). Cela permet de gérer les workflows ML avec les mêmes outils et pratiques que le reste de l\'infrastructure Kubernetes.',
    difficulty: 'hard',
  },
  {
    id: 'p2-q40',
    phaseId: 'phase-02',
    lessonId: 'p2-cicd',
    question: 'Quelle approche permet de gérer le "concept drift" d\'un modèle ML en production ?',
    options: [
      'Augmenter la puissance de calcul du serveur',
      'Mettre en place un monitoring des performances du modèle avec ré-entraînement automatique lorsque les métriques se dégradent',
      'Utiliser un algorithme de ML plus complexe',
      'Ajouter plus de couches au réseau de neurones',
    ],
    correctIndex: 1,
    explanation:
      'Le concept drift se produit lorsque la relation entre les features et la variable cible change au fil du temps. La solution consiste à monitorer en continu les métriques du modèle (accuracy, precision, recall, latence) et à déclencher un ré-entraînement automatique lorsque les performances passent sous un seuil défini. Des outils comme Evidently AI ou NannyML facilitent cette surveillance.',
    difficulty: 'hard',
  },
];
