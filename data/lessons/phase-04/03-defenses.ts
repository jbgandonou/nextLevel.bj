import { Lesson } from '../../types';

export const defensesLesson: Lesson = {
  id: 'p4-defenses',
  phaseId: 'phase-04',
  title: 'Défenses Adversariales',
  estimatedMinutes: 25,
  content: `# Défenses Adversariales : Entraînement Adversarial, Distillation et Prétraitement

## Introduction

Face aux attaques adversariales, la communauté de recherche a développé plusieurs familles de défenses. Cette leçon couvre les trois approches principales : l'entraînement adversarial, la distillation défensive et le prétraitement des entrées.

## Entraînement Adversarial (Adversarial Training)

### Principe

L'entraînement adversarial est la défense la plus éprouvée. Son principe est d'augmenter les données d'entraînement avec des exemples adversariaux, forçant le modèle à apprendre des représentations robustes.

### Formulation de Madry et al.

Le problème est formulé comme un jeu minimax :

\`\`\`
min_θ E[(x,y)] [ max_{δ ∈ S} L(f_θ(x + δ), y) ]
\`\`\`

À chaque itération d'entraînement :
1. Générer des exemples adversariaux avec PGD sur le batch courant
2. Calculer la perte sur ces exemples adversariaux
3. Mettre à jour les poids du modèle pour minimiser cette perte

### Avantages et Limites

**Avantages :**
- Seule défense avec des garanties théoriques solides
- Robustesse vérifiable contre les attaques de premier ordre
- Compatible avec la certification de robustesse

**Limites :**
- Coût computationnel élevé (×3 à ×10 le temps d'entraînement)
- Compromis précision naturelle / robustesse adversariale
- Spécifique à la norme de perturbation choisie (L∞ vs L2)

### TRADES (TRadeoff-inspired Adversarial DEfense)

TRADES propose un meilleur compromis en séparant explicitement la perte naturelle et la perte de robustesse :

\`\`\`
L_TRADES = L_CE(f(x), y) + β · L_KL(f(x), f(x_adv))
\`\`\`

Le paramètre β contrôle le compromis entre précision et robustesse.

## Distillation Défensive

### Principe

Proposée par Papernot et al. (2016), la distillation défensive utilise le transfert de connaissances pour lisser les gradients du modèle, rendant les attaques basées sur le gradient moins efficaces.

### Processus

1. Entraîner un premier modèle (le « professeur ») normalement
2. Récupérer ses sorties softmax avec une température élevée T
3. Entraîner un second modèle (l'« élève ») sur ces probabilités lissées
4. Déployer le modèle élève

### Efficacité

La distillation réduit l'amplitude des gradients, rendant FGSM et PGD moins efficaces. Cependant, l'attaque C&W a montré que cette défense peut être contournée en optimisant directement dans l'espace des logits.

## Prétraitement des Entrées (Input Preprocessing)

### Objectif

Appliquer des transformations aux entrées avant de les passer au modèle, dans l'espoir de supprimer les perturbations adversariales tout en préservant l'information utile.

### Techniques Principales

**Compression JPEG** : La compression avec perte peut supprimer les perturbations haute fréquence. Simple mais partiellement efficace.

**Lissage spatial** : Appliquer un filtre gaussien ou médian pour atténuer les perturbations pixel par pixel.

**Feature Squeezing** : Réduire la profondeur de couleur (par exemple de 8 bits à 4 bits) et appliquer un lissage spatial. Si la prédiction change significativement, l'entrée est suspecte.

**Débruitage par autoencodeur** : Entraîner un autoencodeur à reconstruire des images propres à partir d'images bruitées. Le modèle de classification reçoit la version débruitée.

**Randomisation** : Ajouter du bruit aléatoire ou des transformations aléatoires (redimensionnement, padding) avant l'inférence. Rend les attaques moins reproductibles.

### Limites

Atallah et Carlini (2018) ont démontré que de nombreuses défenses par prétraitement peuvent être contournées par des **attaques adaptatives** qui intègrent la transformation dans l'optimisation de l'attaque. C'est le problème de l'**obfuscation de gradient**.

## Défenses Certifiées

Les défenses certifiées offrent des **garanties mathématiques** de robustesse :

- **Randomized Smoothing** : Ajouter du bruit gaussien et classifier par vote majoritaire. Fournit un rayon de robustesse certifié.
- **Bound Propagation** : Propager des intervalles à travers le réseau pour vérifier qu'aucune perturbation dans la boule ε ne change la prédiction.

## Bonnes Pratiques

1. **Ne jamais se fier à une seule défense** : Combiner plusieurs approches (défense en profondeur)
2. **Toujours évaluer avec des attaques adaptatives** : Une défense non testée contre des attaques adaptatives est potentiellement illusoire
3. **Utiliser AutoAttack comme benchmark standard** pour des évaluations fiables
4. **Documenter le budget de perturbation** : Préciser contre quelles normes et quels ε le modèle est robuste

## Conclusion

L'entraînement adversarial reste la défense la plus fiable, malgré son coût. Les défenses par prétraitement offrent une protection partielle mais sont vulnérables aux attaques adaptatives. L'avenir réside dans les défenses certifiées et les approches combinées.`,
  keyPoints: [
    'L\'entraînement adversarial est la défense la plus fiable avec des garanties théoriques, mais coûte 3 à 10 fois plus en calcul',
    'TRADES offre un meilleur compromis entre précision naturelle et robustesse adversariale via un paramètre explicite',
    'La distillation défensive lisse les gradients mais peut être contournée par l\'attaque C&W',
    'Les défenses par prétraitement (JPEG, lissage, feature squeezing) sont vulnérables aux attaques adaptatives',
    'Les défenses certifiées comme le Randomized Smoothing offrent des garanties mathématiques de robustesse',
    'La défense en profondeur combinant plusieurs approches est toujours recommandée',
  ],
  resources: [
    {
      title: 'Towards Deep Learning Models Resistant to Adversarial Attacks (Madry et al.)',
      url: 'https://arxiv.org/abs/1706.06083',
      type: 'article',
    },
    {
      title: 'RobustBench - Adversarial Robustness Benchmark',
      url: 'https://robustbench.github.io/',
      type: 'tool',
    },
    {
      title: 'Adversarial Examples Are Not Easily Detected (Carlini & Wagner)',
      url: 'https://arxiv.org/abs/1705.07263',
      type: 'article',
    },
  ],
};
