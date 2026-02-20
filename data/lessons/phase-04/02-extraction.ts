import { Lesson } from '../../types';

export const extractionLesson: Lesson = {
  id: 'p4-extraction',
  phaseId: 'phase-04',
  title: 'Extraction de Modèle et Attaques par Inversion',
  estimatedMinutes: 25,
  content: `# Extraction de Modèle et Attaques par Inversion

## Introduction

Au-delà des attaques par évasion, deux catégories d'attaques menacent directement la confidentialité des modèles ML : l'**extraction de modèle** (model stealing) et l'**inversion de modèle** (model inversion). Ces attaques visent à voler la propriété intellectuelle ou à reconstruire les données d'entraînement.

## Extraction de Modèle (Model Stealing)

### Principe

L'extraction de modèle consiste à recréer un modèle fonctionnellement équivalent en interrogeant une API de prédiction. L'attaquant n'a besoin que d'un accès boîte noire au modèle cible.

### Méthodologie

1. **Collecte de requêtes** : L'attaquant envoie des entrées soigneusement choisies au modèle cible
2. **Récupération des sorties** : Il collecte les prédictions (labels, probabilités, embeddings)
3. **Entraînement du substitut** : Un modèle substitut est entraîné sur ces paires (entrée, sortie)
4. **Raffinement** : Le processus est itéré avec des requêtes ciblées sur les zones d'incertitude

### Attaques Notables

**Tramèr et al. (2016)** ont démontré l'extraction de modèles de régression logistique, arbres de décision et réseaux de neurones avec un nombre polynomial de requêtes.

**Knockoff Nets** : Technique qui utilise un ensemble de données naturelles (comme ImageNet) pour interroger le modèle cible et entraîner un clone performant sans connaissance du domaine.

**Extraction via les API cloud** : Des chercheurs ont montré qu'il est possible d'extraire des modèles déployés sur des services comme Google Cloud Vision ou Amazon Rekognition.

### Impact

- **Vol de propriété intellectuelle** : Un modèle coûteux à entraîner peut être répliqué pour une fraction du coût
- **Préparation d'attaques** : Le modèle extrait peut servir de substitut pour développer des attaques par évasion (transferabilité)
- **Violation de confidentialité** : L'architecture et les hyperparamètres peuvent être inférés

## Inversion de Modèle (Model Inversion)

### Principe

L'inversion de modèle vise à reconstruire les données d'entraînement à partir des prédictions du modèle. C'est une attaque directe contre la vie privée des individus dont les données ont servi à l'entraînement.

### Attaques Classiques

**Fredrikson et al. (2015)** ont montré qu'un modèle de reconnaissance faciale pouvait être inversé pour reconstruire des visages reconnaissables des individus présents dans le jeu d'entraînement.

**Attaque par inférence d'appartenance (Membership Inference)** : Déterminer si un échantillon spécifique faisait partie des données d'entraînement. Shokri et al. (2017) ont proposé une méthode utilisant des shadow models pour cette tâche.

### Techniques Avancées

- **Gradient Leakage** : Dans l'apprentissage fédéré, les gradients partagés peuvent révéler les données d'entraînement locales
- **Attaques par attribut** : Inférer des attributs sensibles (ethnie, orientation) à partir des prédictions du modèle
- **Reconstruction par GAN** : Utiliser des réseaux génératifs pour reconstruire des données réalistes correspondant à une classe cible

## Contre-mesures

### Contre l'extraction
- **Limitation de débit** : Restreindre le nombre de requêtes par utilisateur
- **Watermarking** : Intégrer des signatures dans le modèle pour prouver la propriété
- **Réponses perturbées** : Ajouter du bruit aux probabilités de sortie
- **Détection de requêtes suspectes** : Identifier les patterns d'interrogation anormaux

### Contre l'inversion
- **Confidentialité différentielle** : Ajouter du bruit pendant l'entraînement (DP-SGD)
- **Régularisation** : Réduire le surapprentissage diminue la fuite d'information
- **Retourner uniquement le label** : Ne pas exposer les probabilités complètes
- **Apprentissage fédéré sécurisé** : Agrégation sécurisée, chiffrement homomorphe

## Implications Légales

Le RGPD et le futur EU AI Act imposent des obligations de protection des données personnelles. Les attaques par inversion peuvent constituer une violation de ces réglementations si des données personnelles sont exposées via un modèle déployé.

## Conclusion

L'extraction et l'inversion de modèles représentent des menaces sérieuses pour la propriété intellectuelle et la vie privée. La défense repose sur une combinaison de mesures techniques et organisationnelles, avec une attention particulière à la surface d'attaque exposée par les API de prédiction.`,
  keyPoints: [
    'L\'extraction de modèle permet de cloner un modèle ML en interrogeant son API, menaçant la propriété intellectuelle',
    'L\'inversion de modèle reconstruit les données d\'entraînement, menaçant directement la vie privée des individus',
    'L\'inférence d\'appartenance (membership inference) détermine si un échantillon faisait partie des données d\'entraînement',
    'Les contre-mesures incluent la limitation de débit, le watermarking, la confidentialité différentielle et la perturbation des sorties',
    'Le gradient leakage en apprentissage fédéré peut révéler les données locales des participants',
  ],
  resources: [
    {
      title: 'Stealing Machine Learning Models via Prediction APIs (Tramèr et al.)',
      url: 'https://arxiv.org/abs/1609.02943',
      type: 'article',
    },
    {
      title: 'Membership Inference Attacks Against Machine Learning Models',
      url: 'https://arxiv.org/abs/1610.05820',
      type: 'article',
    },
    {
      title: 'ML Privacy Meter - Tool for quantifying privacy risks',
      url: 'https://github.com/privacytrustlab/ml_privacy_meter',
      type: 'tool',
    },
  ],
};
