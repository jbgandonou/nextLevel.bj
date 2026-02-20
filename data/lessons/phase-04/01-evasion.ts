import { Lesson } from '../../types';

export const evasionLesson: Lesson = {
  id: 'p4-evasion',
  phaseId: 'phase-04',
  title: 'Attaques par Évasion',
  estimatedMinutes: 25,
  content: `# Attaques par Évasion : FGSM, PGD et Exemples Adversariaux

## Introduction

Les attaques par évasion constituent l'une des menaces les plus étudiées en apprentissage automatique adversarial. Leur principe est simple mais redoutable : modifier subtilement les données d'entrée d'un modèle pour le tromper, tout en rendant ces modifications imperceptibles à l'œil humain.

## Qu'est-ce qu'un Exemple Adversarial ?

Un exemple adversarial est une entrée volontairement perturbée pour induire une erreur de classification. Par exemple, une image de panda légèrement modifiée peut être classée comme un gibbon avec une confiance de 99 %. La perturbation ajoutée est si faible qu'un humain ne la distingue pas.

Formellement, on cherche une perturbation **δ** telle que :
- \`f(x + δ) ≠ f(x)\` (le modèle se trompe)
- \`||δ|| < ε\` (la perturbation reste petite)

## FGSM — Fast Gradient Sign Method

Proposée par Goodfellow et al. en 2015, la FGSM est l'attaque la plus fondamentale. Elle exploite le gradient de la fonction de perte par rapport à l'entrée :

\`\`\`
x_adv = x + ε · sign(∇_x J(θ, x, y))
\`\`\`

**Principe :** On calcule le gradient de la perte par rapport à l'image d'entrée, puis on ajoute une perturbation dans la direction qui maximise cette perte. L'opération \`sign()\` garantit que chaque pixel est modifié d'exactement ±ε.

**Avantages :** Rapide (un seul passage), facile à implémenter.
**Limites :** Perturbation uniforme, souvent détectable par des défenses simples.

## PGD — Projected Gradient Descent

PGD est une version itérative et plus puissante de FGSM, proposée par Madry et al. (2018). Elle applique FGSM plusieurs fois avec un pas plus petit, en reprojetant le résultat dans la boule ε à chaque itération :

\`\`\`
x_{t+1} = Π_{B(x,ε)} ( x_t + α · sign(∇_x J(θ, x_t, y)) )
\`\`\`

PGD est considérée comme l'attaque de référence (**first-order adversary**) pour évaluer la robustesse d'un modèle. Si un modèle résiste à PGD, il est considéré comme raisonnablement robuste.

## Autres Attaques Notables

### C&W Attack (Carlini & Wagner)
Optimise directement la perturbation minimale nécessaire pour tromper le modèle. Plus lente que PGD mais souvent plus efficace contre les défenses par distillation.

### DeepFool
Trouve la perturbation minimale pour franchir la frontière de décision la plus proche. Produit des perturbations plus petites que FGSM.

### AutoAttack
Ensemble standardisé de quatre attaques (APGD-CE, APGD-DLR, FAB, Square Attack) utilisé comme benchmark de robustesse. C'est aujourd'hui le standard pour évaluer les défenses.

## Perturbations : Types et Normes

Les perturbations sont mesurées selon différentes normes :
- **L∞** : valeur maximale de modification par pixel (la plus courante)
- **L2** : distance euclidienne globale
- **L0** : nombre de pixels modifiés
- **Perturbations sémantiques** : rotations, changements de couleur, modifications réalistes

## Applications en Sécurité

Les attaques par évasion ont des implications concrètes :
- **Véhicules autonomes** : un autocollant sur un panneau stop peut le faire classer comme limitation de vitesse
- **Reconnaissance faciale** : des lunettes spéciales peuvent tromper les systèmes biométriques
- **Détection de malwares** : modifier quelques octets d'un malware pour échapper à la détection ML
- **Spam et phishing** : contourner les filtres basés sur le machine learning

## Conclusion

Comprendre les attaques par évasion est fondamental pour tout professionnel de la sécurité AI. Ces attaques révèlent la fragilité des modèles face à des perturbations minimes et motivent le développement de défenses robustes que nous étudierons dans les prochaines leçons.`,
  keyPoints: [
    'Un exemple adversarial est une entrée subtilement perturbée qui trompe un modèle ML tout en restant imperceptible pour un humain',
    'FGSM utilise le gradient de la perte en un seul pas pour créer des perturbations rapides mais parfois détectables',
    'PGD est une version itérative de FGSM considérée comme l\'attaque de référence pour évaluer la robustesse',
    'AutoAttack est le benchmark standard actuel combinant quatre attaques complémentaires',
    'Les normes L∞, L2 et L0 mesurent différentes propriétés des perturbations adversariales',
    'Les applications concrètes incluent les véhicules autonomes, la reconnaissance faciale et la détection de malwares',
  ],
  resources: [
    {
      title: 'Explaining and Harnessing Adversarial Examples (Goodfellow et al.)',
      url: 'https://arxiv.org/abs/1412.6572',
      type: 'article',
    },
    {
      title: 'Towards Deep Learning Models Resistant to Adversarial Attacks (Madry et al.)',
      url: 'https://arxiv.org/abs/1706.06083',
      type: 'article',
    },
    {
      title: 'Adversarial Robustness Toolbox (ART) - IBM',
      url: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox',
      type: 'tool',
    },
  ],
};
