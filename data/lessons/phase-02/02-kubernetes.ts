import { Lesson } from '../../types';

export const kubernetesLesson: Lesson = {
  id: 'p2-kubernetes',
  phaseId: 'phase-02',
  title: 'Kubernetes : Orchestration de conteneurs pour le ML',
  content: `
# Kubernetes : Orchestration de conteneurs pour le ML

## Introduction

Kubernetes (souvent abrégé K8s) est une plateforme open-source d'orchestration de conteneurs développée initialement par Google. Dans le contexte du MLOps, Kubernetes permet de déployer, mettre à l'échelle et gérer automatiquement vos workloads de Machine Learning en production.

## Architecture de Kubernetes

Un cluster Kubernetes se compose d'un **control plane** (plan de contrôle) qui gère l'état du cluster, et de **nodes** (nœuds) qui exécutent les applications. Le control plane prend les décisions de planification, détecte les événements du cluster et réagit en conséquence.

## Les ressources fondamentales

### Pods

Le Pod est la plus petite unité déployable dans Kubernetes. Un Pod encapsule un ou plusieurs conteneurs qui partagent le même réseau et le même stockage. En ML, un Pod peut contenir votre modèle de serving ou un job d'entraînement.

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: ml-inference
  labels:
    app: prediction-service
spec:
  containers:
    - name: model-server
      image: mon-modele:v1.2
      ports:
        - containerPort: 8000
      resources:
        requests:
          memory: "512Mi"
          cpu: "500m"
        limits:
          memory: "1Gi"
          cpu: "1000m"
\`\`\`

### Deployments

Un Deployment gère un ensemble de Pods identiques (replicas). Il assure que le nombre souhaité de Pods est toujours en cours d'exécution et permet des mises à jour progressives (rolling updates) sans interruption de service.

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-api-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ml-api
  template:
    metadata:
      labels:
        app: ml-api
    spec:
      containers:
        - name: ml-api
          image: ml-api:v2.0
          ports:
            - containerPort: 8000
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
\`\`\`

### Services

Un Service expose un ensemble de Pods sur le réseau. Il fournit une adresse IP stable et un nom DNS, même lorsque les Pods sous-jacents sont recréés. C'est le point d'entrée pour accéder à votre API de prédiction.

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: ml-api-service
spec:
  type: LoadBalancer
  selector:
    app: ml-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8000
\`\`\`

Les types de Services incluent :
- **ClusterIP** : accessible uniquement à l'intérieur du cluster
- **NodePort** : expose le service sur un port de chaque nœud
- **LoadBalancer** : crée un load balancer externe (cloud)

### Namespaces

Les Namespaces permettent de partitionner un cluster en environnements logiques isolés. C'est utile pour séparer les environnements (dev, staging, production) ou les équipes.

\`\`\`bash
# Créer un namespace
kubectl create namespace ml-production

# Déployer dans un namespace spécifique
kubectl apply -f deployment.yaml -n ml-production

# Lister les ressources d'un namespace
kubectl get all -n ml-production
\`\`\`

## Kubernetes pour le Machine Learning

### Gestion des ressources GPU

Kubernetes supporte nativement l'allocation de GPUs grâce aux device plugins NVIDIA :

\`\`\`yaml
resources:
  limits:
    nvidia.com/gpu: 1
\`\`\`

### Autoscaling

Le Horizontal Pod Autoscaler (HPA) ajuste automatiquement le nombre de replicas en fonction de la charge :

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ml-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ml-api-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
\`\`\`

## Outils complémentaires

- **Kubeflow** : plateforme ML complète sur Kubernetes (pipelines, notebooks, serving)
- **KServe** : serving de modèles ML avec autoscaling et canary deployments
- **Helm** : gestionnaire de paquets pour simplifier les déploiements complexes

## Commandes kubectl essentielles

\`\`\`bash
kubectl get pods              # Lister les pods
kubectl describe pod <nom>    # Détails d'un pod
kubectl logs <nom>            # Consulter les logs
kubectl exec -it <nom> -- sh  # Accéder au shell d'un pod
kubectl scale deployment <nom> --replicas=5  # Mise à l'échelle manuelle
\`\`\`
`,
  keyPoints: [
    'Les Pods sont les unités de base de Kubernetes, encapsulant un ou plusieurs conteneurs avec des ressources partagées',
    'Les Deployments gèrent le cycle de vie des Pods avec des mises à jour progressives sans interruption',
    'Les Services fournissent un point d\'accès réseau stable pour exposer vos modèles ML',
    'Les Namespaces isolent logiquement les environnements (dev, staging, production) dans un même cluster',
    'Le Horizontal Pod Autoscaler adapte automatiquement la capacité en fonction de la charge de requêtes',
  ],
  resources: [
    {
      title: 'Kubernetes Documentation officielle',
      url: 'https://kubernetes.io/fr/docs/home/',
      type: 'article',
    },
    {
      title: 'Kubernetes Crash Course for Absolute Beginners (TechWorld with Nana)',
      url: 'https://www.youtube.com/watch?v=s_o8dwzRlu4',
      type: 'video',
    },
    {
      title: 'Kubeflow - Machine Learning Toolkit for Kubernetes',
      url: 'https://www.kubeflow.org/',
      type: 'tool',
    },
  ],
  estimatedMinutes: 30,
};
