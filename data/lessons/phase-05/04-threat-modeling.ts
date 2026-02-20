import { Lesson } from '../../types';

export const threatModelingLesson: Lesson = {
  id: 'p5-threat-modeling',
  phaseId: 'phase-05',
  title: 'Threat Modeling pour les Systèmes AI',
  estimatedMinutes: 25,
  content: `# Threat Modeling pour les Systèmes AI : STRIDE et Arbres d'Attaque

## Introduction

Le threat modeling (modélisation des menaces) est un processus structuré pour identifier, quantifier et prioriser les menaces potentielles contre un système. Appliqué aux systèmes d'intelligence artificielle, il doit couvrir non seulement les menaces classiques (réseau, application) mais aussi les menaces spécifiques au ML : empoisonnement, évasion, extraction et manipulation.

## Pourquoi le Threat Modeling pour l'AI ?

Les systèmes AI présentent une **surface d'attaque élargie** par rapport aux systèmes logiciels traditionnels :
- Le **pipeline de données** est une cible (empoisonnement)
- Le **modèle** est un actif à protéger (extraction, inversion)
- Les **prédictions** peuvent être manipulées (évasion)
- L'**entraînement** peut être compromis (backdoors)
- La **chaîne d'approvisionnement ML** ajoute des dépendances (modèles pré-entraînés, datasets tiers)

## STRIDE pour les Systèmes AI

### Rappel de STRIDE

STRIDE est un framework de threat modeling développé par Microsoft qui catégorise les menaces en six types :

| Menace | Description | Propriété violée |
|--------|-------------|-----------------|
| **S**poofing | Usurpation d'identité | Authentification |
| **T**ampering | Modification non autorisée | Intégrité |
| **R**epudiation | Nier une action | Non-répudiation |
| **I**nformation Disclosure | Fuite d'information | Confidentialité |
| **D**enial of Service | Rendre indisponible | Disponibilité |
| **E**levation of Privilege | Obtenir des droits non autorisés | Autorisation |

### Application au ML

**Spoofing dans le contexte ML :**
- Un attaquant se fait passer pour un service d'entraînement légitime pour injecter un modèle backdooré
- Usurpation d'un fournisseur de données pour empoisonner le dataset
- Spoofing d'un service de prédiction pour servir de fausses prédictions

**Tampering :**
- Empoisonnement des données d'entraînement (data poisoning)
- Modification des poids du modèle en production (model tampering)
- Altération des features en transit (man-in-the-middle sur le pipeline)
- Injection d'exemples adversariaux dans les entrées

**Repudiation :**
- Un data scientist nie avoir déployé un modèle biaisé
- Absence de logs sur les requêtes de prédiction
- Pas de traçabilité sur les modifications du dataset d'entraînement

**Information Disclosure :**
- Extraction de modèle via l'API de prédiction
- Inversion de modèle pour reconstruire les données d'entraînement
- Inférence d'appartenance (membership inference)
- Fuite du system prompt d'un LLM

**Denial of Service :**
- Requêtes adversariales coûteuses en calcul (sponge examples)
- Saturation du pipeline d'entraînement
- Épuisement des quotas GPU via des requêtes malveillantes

**Elevation of Privilege :**
- Prompt injection pour faire exécuter des actions non autorisées au LLM
- Exploitation d'un plugin LLM pour accéder à des ressources protégées
- Compromission du service d'entraînement pour accéder aux données sensibles

## Arbres d'Attaque (Attack Trees)

### Principe

Un arbre d'attaque est une représentation hiérarchique des chemins possibles pour atteindre un objectif d'attaque. La racine représente l'objectif, et les feuilles représentent les actions élémentaires.

### Exemple : Extraire un Modèle ML

\`\`\`
[Extraire le modèle ML]
├── [Via l'API de prédiction] (AND)
│   ├── Obtenir un accès API
│   ├── Interroger systématiquement le modèle
│   └── Entraîner un modèle substitut
├── [Via l'infrastructure] (OR)
│   ├── Accéder au stockage des poids (S3, GCS)
│   ├── Intercepter le déploiement (CI/CD)
│   └── Compromettre le registre de modèles
└── [Via la supply chain] (OR)
    ├── Compromettre un modèle pré-entraîné
    └── Backdoor dans une dépendance ML
\`\`\`

### Annotation des Arbres

Chaque noeud peut être annoté avec :
- **Probabilité** : Quelle est la probabilité de succès ?
- **Coût** : Combien cela coûte à l'attaquant ?
- **Difficulté** : Quel niveau d'expertise est requis ?
- **Détectabilité** : À quel point l'attaque est-elle détectable ?

## Processus de Threat Modeling AI

### Étape 1 : Décomposer le Système

Créer un diagramme de flux de données (DFD) du pipeline ML complet :
- Sources de données → Prétraitement → Entraînement → Validation → Déploiement → Inférence → Monitoring

### Étape 2 : Identifier les Actifs

- Données d'entraînement (confidentialité, intégrité)
- Modèle (propriété intellectuelle, intégrité)
- API de prédiction (disponibilité, intégrité)
- Infrastructure (GPU, stockage, réseau)

### Étape 3 : Identifier les Menaces

Appliquer STRIDE à chaque composant du DFD et construire des arbres d'attaque pour les menaces les plus critiques.

### Étape 4 : Évaluer les Risques

Utiliser une matrice probabilité/impact pour prioriser :
- **Critique** : Extraction de modèle via API exposée sans rate limiting
- **Élevé** : Empoisonnement de données provenant de sources tierces
- **Moyen** : DoS par requêtes adversariales coûteuses
- **Faible** : Inférence d'appartenance sur un modèle à faible mémorisation

### Étape 5 : Définir les Contre-mesures

Pour chaque menace priorisée, définir des contrôles :
- Préventifs (empêcher l'attaque)
- Détectifs (détecter l'attaque en cours)
- Correctifs (répondre et récupérer)

## Outils

- **Microsoft Threat Modeling Tool** : Outil graphique pour DFD et STRIDE
- **OWASP Threat Dragon** : Alternative open source
- **Counterfit** : Outil Microsoft pour tester les menaces ML spécifiques
- **MITRE ATLAS** : Base de connaissances des tactiques adversariales contre les systèmes ML

## Conclusion

Le threat modeling adapté à l'AI combine les méthodologies classiques (STRIDE, arbres d'attaque) avec une compréhension des menaces spécifiques au ML. C'est un exercice fondamental qui doit être conduit dès la conception du système et révisé régulièrement.`,
  keyPoints: [
    'STRIDE appliqué au ML couvre des menaces uniques : empoisonnement (Tampering), extraction (Information Disclosure), évasion (Tampering)',
    'Les arbres d\'attaque modélisent hiérarchiquement les chemins d\'attaque avec probabilité, coût et détectabilité',
    'Le processus comprend 5 étapes : décomposition, identification des actifs, menaces, évaluation et contre-mesures',
    'MITRE ATLAS est la base de connaissances de référence pour les tactiques adversariales contre les systèmes ML',
    'Le threat modeling doit couvrir tout le pipeline ML : données, entraînement, déploiement, inférence et monitoring',
  ],
  resources: [
    {
      title: 'MITRE ATLAS - Adversarial Threat Landscape for AI Systems',
      url: 'https://atlas.mitre.org/',
      type: 'article',
    },
    {
      title: 'Microsoft Counterfit - Automated Security Testing for AI',
      url: 'https://github.com/Azure/counterfit',
      type: 'tool',
    },
    {
      title: 'Threat Modeling Manifesto',
      url: 'https://www.threatmodelingmanifesto.org/',
      type: 'article',
    },
  ],
};
