import { QuizQuestion } from '../types';

export const phase04Questions: QuizQuestion[] = [
  // ===== EASY (12 questions) =====
  {
    id: 'p4-q01',
    phaseId: 'phase-04',
    lessonId: 'p4-evasion',
    question: "Qu'est-ce qu'une attaque adversariale en machine learning ?",
    options: [
      "Un entraînement compétitif entre deux modèles (GAN)",
      "Une perturbation intentionnelle des entrées pour tromper un modèle ML",
      "Une compétition entre équipes de data scientists",
      "Un type d'attaque DDoS sur les serveurs ML",
    ],
    correctIndex: 1,
    explanation:
      "Une attaque adversariale consiste à ajouter des perturbations soigneusement calculées aux données d'entrée pour amener le modèle à faire des prédictions incorrectes, souvent avec une grande confiance. Ces perturbations sont généralement imperceptibles pour les humains.",
    difficulty: 'easy',
  },
  {
    id: 'p4-q02',
    phaseId: 'phase-04',
    lessonId: 'p4-evasion',
    question: "Que signifie FGSM dans le contexte des attaques adversariales ?",
    options: [
      'Fast Gradient Sign Method',
      'Full Gradient Spectral Mapping',
      'Feature Generation Sequential Model',
      'Forward Gradient Stochastic Minimization',
    ],
    correctIndex: 0,
    explanation:
      "FGSM (Fast Gradient Sign Method) est une méthode d'attaque adversariale proposée par Goodfellow et al. en 2014. Elle calcule le gradient de la loss par rapport à l'entrée et applique une perturbation dans la direction du signe de ce gradient.",
    difficulty: 'easy',
  },
  {
    id: 'p4-q03',
    phaseId: 'phase-04',
    lessonId: 'p4-extraction',
    question:
      "Qu'est-ce qu'une attaque d'extraction de modèle (model extraction) ?",
    options: [
      "Supprimer un modèle d'un serveur de production",
      "Recréer un modèle en interrogeant son API pour obtenir suffisamment de paires entrée-sortie",
      "Extraire les poids du modèle du GPU",
      "Décompiler le code source du modèle",
    ],
    correctIndex: 1,
    explanation:
      "L'extraction de modèle consiste à interroger systématiquement l'API d'un modèle cible pour collecter des paires entrée-sortie, puis entraîner un modèle substitut (clone) qui reproduit le comportement du modèle original. Cela menace la propriété intellectuelle.",
    difficulty: 'easy',
  },
  {
    id: 'p4-q04',
    phaseId: 'phase-04',
    lessonId: 'p4-extraction',
    question:
      "Qu'est-ce que le model inversion dans le contexte de la sécurité ML ?",
    options: [
      "Inverser les couches d'un réseau de neurones",
      "Reconstruire les données d'entraînement à partir des prédictions du modèle",
      "Changer l'ordre des couches du modèle",
      "Convertir un modèle de classification en régression",
    ],
    correctIndex: 1,
    explanation:
      "Le model inversion permet à un attaquant de reconstruire (partiellement) les données d'entraînement en exploitant les sorties du modèle. Par exemple, reconstruire des images de visages à partir d'un modèle de reconnaissance faciale, compromettant la vie privée des individus dans le dataset.",
    difficulty: 'easy',
  },
  {
    id: 'p4-q05',
    phaseId: 'phase-04',
    lessonId: 'p4-monitoring',
    question:
      "À quoi sert Prometheus dans le monitoring d'un système ML ?",
    options: [
      "Entraîner des modèles de manière distribuée",
      "Collecter et stocker des métriques temporelles pour surveiller les performances du système",
      "Générer des exemples adversariaux",
      "Optimiser les hyperparamètres",
    ],
    correctIndex: 1,
    explanation:
      "Prometheus est un système de monitoring et d'alerte open-source qui collecte des métriques au format time-series. Dans un contexte ML, il permet de suivre la latence d'inférence, le nombre de requêtes, l'utilisation des ressources et les métriques de performance du modèle.",
    difficulty: 'easy',
  },
  {
    id: 'p4-q06',
    phaseId: 'phase-04',
    lessonId: 'p4-drift',
    question:
      "Qu'est-ce que le concept drift dans un modèle ML en production ?",
    options: [
      "Un bug dans le code de déploiement",
      "La dégradation progressive des performances du modèle due à l'évolution de la distribution des données dans le temps",
      "Le transfert du modèle vers un nouveau serveur",
      "La migration vers une nouvelle version de framework",
    ],
    correctIndex: 1,
    explanation:
      "Le concept drift survient lorsque la relation entre les features et la variable cible change au fil du temps. Le modèle, entraîné sur des données historiques, devient progressivement moins pertinent face aux nouvelles données dont la distribution a évolué.",
    difficulty: 'easy',
  },
  {
    id: 'p4-q07',
    phaseId: 'phase-04',
    lessonId: 'p4-monitoring',
    question:
      "Quel est le rôle de Grafana dans le monitoring ML ?",
    options: [
      "Stocker les modèles entraînés",
      "Visualiser les métriques collectées sous forme de tableaux de bord interactifs",
      "Effectuer le feature engineering",
      "Automatiser le réentraînement des modèles",
    ],
    correctIndex: 1,
    explanation:
      "Grafana est un outil de visualisation qui se connecte à des sources de données comme Prometheus pour créer des dashboards interactifs. Pour le ML, il permet de visualiser les métriques de performance, de détecter les anomalies et de configurer des alertes visuelles.",
    difficulty: 'easy',
  },
  {
    id: 'p4-q08',
    phaseId: 'phase-04',
    lessonId: 'p4-evasion',
    question:
      "Quelle est la différence principale entre une attaque adversariale en boîte blanche et en boîte noire ?",
    options: [
      "La boîte blanche est plus rapide",
      "En boîte blanche l'attaquant a accès à l'architecture et aux poids du modèle, en boîte noire il n'a accès qu'aux entrées et sorties",
      "La boîte noire nécessite plus de GPU",
      "Il n'y a pas de différence",
    ],
    correctIndex: 1,
    explanation:
      "En boîte blanche (white-box), l'attaquant connaît l'architecture, les poids et les gradients du modèle, permettant des attaques précises comme FGSM. En boîte noire (black-box), l'attaquant ne peut qu'interroger le modèle et observer ses réponses, nécessitant des techniques comme le transfert d'attaques ou l'estimation de gradients.",
    difficulty: 'easy',
  },
  {
    id: 'p4-q09',
    phaseId: 'phase-04',
    lessonId: 'p4-defenses',
    question:
      "Qu'est-ce que l'adversarial training comme méthode de défense ?",
    options: [
      "Entraîner deux modèles l'un contre l'autre",
      "Inclure des exemples adversariaux dans le dataset d'entraînement pour rendre le modèle robuste",
      "Entraîner le modèle plus longtemps",
      "Utiliser un taux d'apprentissage plus élevé",
    ],
    correctIndex: 1,
    explanation:
      "L'adversarial training consiste à augmenter le dataset d'entraînement avec des exemples adversariaux générés à chaque époque. Le modèle apprend ainsi à classifier correctement à la fois les exemples propres et les exemples perturbés, améliorant significativement sa robustesse.",
    difficulty: 'easy',
  },
  {
    id: 'p4-q10',
    phaseId: 'phase-04',
    lessonId: 'p4-drift',
    question:
      "Quel type de drift désigne un changement dans la distribution des features d'entrée sans changement dans la relation feature-cible ?",
    options: [
      'Concept drift',
      'Data drift (covariate shift)',
      'Label drift',
      'Prediction drift',
    ],
    correctIndex: 1,
    explanation:
      "Le data drift (ou covariate shift) survient lorsque la distribution des features d'entrée change au fil du temps (P(X) change), même si la relation conditionnelle P(Y|X) reste stable. Par exemple, un changement démographique dans la population desservie par le modèle.",
    difficulty: 'easy',
  },
  {
    id: 'p4-q11',
    phaseId: 'phase-04',
    lessonId: 'p4-evasion',
    question:
      "Qu'est-ce qu'un exemple adversarial 'transférable' ?",
    options: [
      "Un exemple qui peut être envoyé via HTTP",
      "Un exemple adversarial généré contre un modèle A qui trompe également un modèle B différent",
      "Un exemple qui fonctionne sur différents systèmes d'exploitation",
      "Un exemple qui peut être converti entre différents formats",
    ],
    correctIndex: 1,
    explanation:
      "La transférabilité est la propriété par laquelle un exemple adversarial conçu pour tromper un modèle spécifique peut aussi tromper d'autres modèles, même avec des architectures différentes. Cette propriété est exploitée dans les attaques boîte noire via des modèles substituts.",
    difficulty: 'easy',
  },
  {
    id: 'p4-q12',
    phaseId: 'phase-04',
    lessonId: 'p4-monitoring',
    question:
      "Quelle métrique Prometheus est la plus pertinente pour détecter une dégradation de performance d'un modèle ML ?",
    options: [
      'http_requests_total',
      'model_prediction_accuracy ou model_prediction_confidence_distribution',
      'cpu_usage_percent',
      'disk_space_available_bytes',
    ],
    correctIndex: 1,
    explanation:
      "Les métriques spécifiques au modèle comme la précision des prédictions et la distribution de confiance sont les plus pertinentes pour détecter une dégradation. Une baisse de confiance moyenne ou un changement dans la distribution des classes prédites peut indiquer un drift ou une attaque.",
    difficulty: 'easy',
  },

  // ===== MEDIUM (16 questions) =====
  {
    id: 'p4-q13',
    phaseId: 'phase-04',
    lessonId: 'p4-evasion',
    question:
      "Comment fonctionne l'attaque PGD (Projected Gradient Descent) par rapport à FGSM ?",
    options: [
      "PGD est identique à FGSM mais utilise un learning rate plus petit",
      "PGD applique FGSM de manière itérative avec des projections pour rester dans une boule epsilon autour de l'entrée originale",
      "PGD n'utilise pas les gradients",
      "PGD fonctionne uniquement sur les modèles de régression",
    ],
    correctIndex: 1,
    explanation:
      "PGD est une version itérative et plus puissante de FGSM. À chaque itération, elle fait un pas dans la direction du gradient (comme FGSM), puis projette le résultat sur la boule L-infini de rayon epsilon pour respecter la contrainte de perturbation maximale. C'est considéré comme l'attaque de premier ordre la plus forte.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q14',
    phaseId: 'phase-04',
    lessonId: 'p4-defenses',
    question:
      "Quelle technique de défense utilise la distillation pour améliorer la robustesse adversariale ?",
    options: [
      'Feature squeezing',
      'Defensive distillation : entraîner un modèle étudiant avec les soft labels (probabilités) du modèle enseignant à haute température',
      'Input transformation',
      'Gradient masking simple',
    ],
    correctIndex: 1,
    explanation:
      "La defensive distillation entraîne d'abord un modèle enseignant, puis utilise ses sorties softmax à haute température comme labels pour entraîner un modèle étudiant. Les soft labels lissent le paysage de la loss, rendant les gradients moins exploitables par les attaques basées sur les gradients.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q15',
    phaseId: 'phase-04',
    lessonId: 'p4-extraction',
    question:
      "Comment un attaquant peut-il réaliser une extraction de modèle en boîte noire avec un budget de requêtes limité ?",
    options: [
      "En devinant aléatoirement les poids du modèle",
      "En utilisant l'active learning pour sélectionner les requêtes les plus informatives et entraîner un modèle substitut",
      "En interceptant le trafic réseau",
      "En utilisant la force brute sur toutes les entrées possibles",
    ],
    correctIndex: 1,
    explanation:
      "L'attaquant utilise des techniques d'active learning pour sélectionner intelligemment les entrées à envoyer au modèle cible. Les points proches des frontières de décision sont les plus informatifs. Avec quelques milliers de requêtes bien choisies, un modèle substitut de haute fidélité peut être entraîné.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q16',
    phaseId: 'phase-04',
    lessonId: 'p4-drift',
    question:
      "Quelle approche statistique est couramment utilisée pour détecter le data drift en production ?",
    options: [
      "Le test de Student (t-test) uniquement",
      "Le test de Kolmogorov-Smirnov (KS) ou le Population Stability Index (PSI)",
      "Le coefficient de corrélation de Pearson",
      "La moyenne mobile simple",
    ],
    correctIndex: 1,
    explanation:
      "Le test de Kolmogorov-Smirnov compare deux distributions et détecte si elles diffèrent significativement. Le PSI quantifie le changement entre la distribution de référence et la distribution actuelle. Un PSI > 0.2 indique généralement un drift significatif nécessitant une action.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q17',
    phaseId: 'phase-04',
    lessonId: 'p4-defenses',
    question:
      "Pourquoi le gradient masking n'est-il pas considéré comme une défense fiable contre les attaques adversariales ?",
    options: [
      "Parce qu'il ralentit trop l'inférence",
      "Parce qu'il peut être contourné par des attaques boîte noire exploitant la transférabilité ou par des attaques d'estimation de gradients",
      "Parce qu'il ne fonctionne qu'avec les CNN",
      "Parce qu'il nécessite trop de mémoire GPU",
    ],
    correctIndex: 1,
    explanation:
      "Le gradient masking (ou obfuscation) cache les gradients mais ne rend pas le modèle intrinsèquement robuste. Un attaquant peut utiliser un modèle substitut pour générer des exemples adversariaux transférables, ou utiliser des techniques d'estimation de gradients (SPSA, NES) qui ne nécessitent pas de gradients exacts.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q18',
    phaseId: 'phase-04',
    lessonId: 'p4-monitoring',
    question:
      "Comment configurer une alerte Prometheus pour détecter une chute soudaine de la confiance moyenne d'un modèle ?",
    options: [
      "Utiliser uniquement des dashboards Grafana manuels",
      "Créer une règle d'alerte avec une expression PromQL comparant la moyenne glissante de la confiance à un seuil prédéfini",
      "Vérifier les logs du serveur manuellement",
      "Utiliser un cron job qui redémarre le modèle périodiquement",
    ],
    correctIndex: 1,
    explanation:
      "Prometheus permet de définir des alerting rules en PromQL. Par exemple : avg(model_prediction_confidence) < 0.7 sur une fenêtre de 5 minutes déclenche une alerte via Alertmanager. Cela permet une détection automatisée de dégradation potentielle due au drift ou à des attaques.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q19',
    phaseId: 'phase-04',
    lessonId: 'p4-evasion',
    question:
      "Qu'est-ce que l'attaque Carlini & Wagner (C&W) et pourquoi est-elle considérée comme puissante ?",
    options: [
      "C'est une attaque par force brute très rapide",
      "C'est une attaque d'optimisation qui minimise la perturbation tout en garantissant la misclassification, capable de contourner la defensive distillation",
      "C'est une attaque qui ne nécessite aucun calcul de gradient",
      "C'est une attaque spécifique aux modèles de langage",
    ],
    correctIndex: 1,
    explanation:
      "L'attaque C&W formule la génération d'exemples adversariaux comme un problème d'optimisation : minimiser la norme de la perturbation sous contrainte de misclassification. En utilisant une variable de changement et un terme de régularisation, elle produit des perturbations minimales et a démontré sa capacité à contourner la defensive distillation.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q20',
    phaseId: 'phase-04',
    lessonId: 'p4-defenses',
    question:
      "Comment la technique de 'feature squeezing' aide-t-elle à détecter les exemples adversariaux ?",
    options: [
      "En augmentant la résolution des images",
      "En comparant les prédictions du modèle sur l'entrée originale et sur des versions compressées (bit depth réduit, lissage spatial)",
      "En ajoutant des couches supplémentaires au réseau",
      "En augmentant le nombre de features",
    ],
    correctIndex: 1,
    explanation:
      "Le feature squeezing réduit l'espace de recherche des perturbations adversariales. En comparant la prédiction sur l'entrée originale avec celles sur des versions compressées (réduction de profondeur de couleur, lissage), si les prédictions divergent significativement, l'entrée est probablement adversariale.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q21',
    phaseId: 'phase-04',
    lessonId: 'p4-defenses',
    question:
      "Quelle métrique permet de quantifier la robustesse adversariale d'un modèle ?",
    options: [
      "Uniquement la précision standard",
      "Le taux de succès d'attaque (attack success rate) et la distance minimale de perturbation moyenne",
      "Le temps d'entraînement",
      "Le nombre de paramètres du modèle",
    ],
    correctIndex: 1,
    explanation:
      "La robustesse adversariale se mesure par le taux de succès des attaques (pourcentage d'exemples pour lesquels l'attaque réussit) et la distance minimale de perturbation moyenne nécessaire pour tromper le modèle. Une plus grande distance minimale indique un modèle plus robuste. AutoAttack est un benchmark standard.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q22',
    phaseId: 'phase-04',
    lessonId: 'p4-extraction',
    question:
      "Qu'est-ce qu'une attaque de membership inference dans le contexte ML ?",
    options: [
      "Déterminer si le modèle est membre d'un réseau de modèles",
      "Déterminer si un point de données spécifique faisait partie du dataset d'entraînement du modèle",
      "Inférer la taille de l'équipe de développement",
      "Déterminer quelle architecture de modèle a été utilisée",
    ],
    correctIndex: 1,
    explanation:
      "L'attaque de membership inference permet à un attaquant de déterminer si un échantillon donné appartenait au dataset d'entraînement. Elle exploite le fait que les modèles se comportent différemment (souvent avec plus de confiance) sur les données d'entraînement que sur les données non vues.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q23',
    phaseId: 'phase-04',
    lessonId: 'p4-monitoring',
    question:
      "Comment Grafana peut-il être utilisé pour visualiser le drift d'un modèle ML ?",
    options: [
      "En affichant uniquement les logs textuels",
      "En créant des panels avec des histogrammes de distribution des features et des courbes de métriques de performance au fil du temps",
      "En exécutant directement le réentraînement du modèle",
      "En stockant les données d'entraînement",
    ],
    correctIndex: 1,
    explanation:
      "Grafana permet de créer des dashboards avec des histogrammes de distribution (pour comparer la distribution actuelle vs référence), des time-series de métriques de performance, et des heat maps de confiance. Les annotations peuvent marquer les redéploiements de modèle pour corréler les changements.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q24',
    phaseId: 'phase-04',
    lessonId: 'p4-evasion',
    question:
      "Quelle est la formule mathématique simplifiée de l'attaque FGSM ?",
    options: [
      'x_adv = x - ε × gradient',
      'x_adv = x + ε × sign(∇x J(θ, x, y))',
      'x_adv = x × ε × gradient',
      'x_adv = x / (1 + ε × gradient)',
    ],
    correctIndex: 1,
    explanation:
      "FGSM calcule x_adv = x + ε × sign(∇x J(θ, x, y)), où x est l'entrée, ε est l'amplitude de la perturbation, et sign(∇x J) est le signe du gradient de la fonction de perte par rapport à l'entrée. La perturbation maximise la perte dans la direction du gradient.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q25',
    phaseId: 'phase-04',
    lessonId: 'p4-extraction',
    question:
      "Quel est le risque d'une attaque d'extraction de modèle pour une entreprise ?",
    options: [
      "Uniquement la perte de performance du modèle original",
      "Le vol de propriété intellectuelle, l'exposition aux attaques adversariales via le modèle cloné, et la perte d'avantage compétitif",
      "Uniquement l'augmentation des coûts d'infrastructure",
      "Aucun risque si le modèle est déployé dans le cloud",
    ],
    correctIndex: 1,
    explanation:
      "L'extraction de modèle représente un triple risque : vol de la propriété intellectuelle (le modèle et les données qu'il encode), possibilité de créer des attaques adversariales en boîte blanche contre le modèle cloné (puis les transférer), et perte de l'avantage compétitif si le concurrent utilise le modèle volé.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q26',
    phaseId: 'phase-04',
    lessonId: 'p4-defenses',
    question:
      "Comment la technique de randomized smoothing fournit-elle des garanties de robustesse certifiées ?",
    options: [
      "En ajoutant du bruit aléatoire aux poids du modèle",
      "En classifiant via un vote majoritaire sur des versions bruitées de l'entrée, avec une garantie mathématique que la prédiction ne change pas dans un rayon certifié",
      "En lissant la courbe d'apprentissage",
      "En moyennant les prédictions de plusieurs modèles",
    ],
    correctIndex: 1,
    explanation:
      "Le randomized smoothing ajoute du bruit gaussien à l'entrée et effectue un vote majoritaire sur de nombreuses prédictions bruitées. La théorie de Neyman-Pearson fournit un rayon de robustesse certifié : aucune perturbation L2 inférieure à ce rayon ne peut changer la prédiction.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q27',
    phaseId: 'phase-04',
    lessonId: 'p4-drift',
    question:
      "Quelle technique permet de détecter le concept drift de manière non supervisée en production ?",
    options: [
      "Comparer les métriques de précision avec les labels réels",
      "Utiliser des détecteurs de drift basés sur la distribution comme DDM (Drift Detection Method) ou ADWIN sur les distributions des prédictions",
      "Réentraîner le modèle tous les jours systématiquement",
      "Augmenter la capacité du modèle",
    ],
    correctIndex: 1,
    explanation:
      "En production, les labels réels ne sont souvent pas disponibles immédiatement. Les méthodes non supervisées comme DDM, ADWIN ou la surveillance de la distribution des prédictions (via KL divergence ou PSI) détectent le drift sans labels. La distribution de confiance et la fréquence des classes prédites sont des indicateurs clés.",
    difficulty: 'medium',
  },
  {
    id: 'p4-q28',
    phaseId: 'phase-04',
    lessonId: 'p4-evasion',
    question:
      "Quelle est la différence entre une attaque adversariale ciblée et non ciblée ?",
    options: [
      "La ciblée est toujours plus facile à réaliser",
      "La ciblée force le modèle à prédire une classe spécifique choisie par l'attaquant, la non ciblée vise simplement à provoquer une erreur quelconque",
      "La non ciblée nécessite toujours plus de perturbation",
      "Il n'y a pas de différence pratique",
    ],
    correctIndex: 1,
    explanation:
      "Une attaque ciblée (targeted) modifie l'entrée pour que le modèle la classifie dans une classe choisie par l'attaquant (ex: un panneau stop classifié comme limite de vitesse). Une attaque non ciblée (untargeted) vise simplement à provoquer n'importe quelle erreur de classification.",
    difficulty: 'medium',
  },

  // ===== HARD (12 questions) =====
  {
    id: 'p4-q29',
    phaseId: 'phase-04',
    lessonId: 'p4-evasion',
    question:
      "Comment l'attaque FGSM peut-elle être adaptée pour fonctionner dans un scénario boîte noire ?",
    options: [
      "En utilisant des gradients aléatoires",
      "En entraînant un modèle substitut local via des requêtes au modèle cible, puis en générant des exemples adversariaux transférables avec FGSM sur le substitut",
      "En augmentant epsilon jusqu'à ce que l'attaque réussisse",
      "En envoyant des millions de requêtes aléatoires",
    ],
    correctIndex: 1,
    explanation:
      "L'approche de Papernot et al. consiste à : 1) Interroger le modèle cible pour construire un dataset, 2) Entraîner un modèle substitut qui imite le comportement du modèle cible, 3) Appliquer FGSM sur le modèle substitut. Grâce à la transférabilité, les exemples adversariaux trompent souvent le modèle cible original.",
    difficulty: 'hard',
  },
  {
    id: 'p4-q30',
    phaseId: 'phase-04',
    lessonId: 'p4-extraction',
    question:
      "Quelle technique avancée d'extraction de modèle utilise la fonctionnalité de prédiction de confiance pour maximiser l'efficacité ?",
    options: [
      "L'extraction aléatoire",
      "Le JBDA (Jacobian-Based Data Augmentation) qui utilise les probabilités de sortie pour augmenter le dataset du modèle substitut via la matrice jacobienne",
      "Le téléchargement direct des poids",
      "L'ingénierie inverse du bytecode",
    ],
    correctIndex: 1,
    explanation:
      "JBDA exploite la matrice jacobienne du modèle substitut pour générer des augmentations de données stratégiques. En utilisant les vecteurs propres de la jacobienne, les nouvelles entrées sont construites pour explorer les régions les plus informatives de l'espace d'entrée. Les probabilités de sortie du modèle cible fournissent un signal plus riche que les seuls labels pour l'entraînement.",
    difficulty: 'hard',
  },
  {
    id: 'p4-q31',
    phaseId: 'phase-04',
    lessonId: 'p4-evasion',
    question:
      "Comment l'attaque PGD avec restarts aléatoires améliore-t-elle la fiabilité de l'évaluation de robustesse ?",
    options: [
      "En utilisant des perturbations plus grandes",
      "En partant de plusieurs points initiaux aléatoires dans la boule epsilon pour éviter les minima locaux de l'optimisation adversariale",
      "En augmentant le nombre d'époques d'entraînement",
      "En testant sur un plus grand dataset",
    ],
    correctIndex: 1,
    explanation:
      "PGD avec restarts aléatoires initialise chaque tentative d'attaque à un point aléatoire dans la boule epsilon autour de l'entrée originale. Cela augmente la probabilité de trouver un adversarial example en explorant différentes régions du paysage d'optimisation. C'est le cœur de l'approche d'évaluation d'AutoAttack.",
    difficulty: 'hard',
  },
  {
    id: 'p4-q32',
    phaseId: 'phase-04',
    lessonId: 'p4-defenses',
    question:
      "Comment implémenter un système de détection d'exemples adversariaux basé sur la détection d'anomalies dans l'espace latent ?",
    options: [
      "En ajoutant une couche softmax supplémentaire",
      "En entraînant un détecteur d'anomalies (ex: autoencoder, KDE) sur les représentations latentes des données propres et en rejetant les entrées dont la représentation est anormale",
      "En doublant la taille du réseau",
      "En utilisant un ensemble de modèles identiques",
    ],
    correctIndex: 1,
    explanation:
      "Les exemples adversariaux produisent souvent des représentations latentes (activations des couches intermédiaires) qui diffèrent statistiquement de celles des données propres. Un détecteur d'anomalies entraîné sur les représentations des données propres peut identifier ces déviations. Les techniques incluent le Mahalanobis distance detector et les autoencoders variationels.",
    difficulty: 'hard',
  },
  {
    id: 'p4-q33',
    phaseId: 'phase-04',
    lessonId: 'p4-extraction',
    question:
      "Quelle approche permet de rendre un modèle de model inversion moins efficace sans dégrader significativement la performance du modèle cible ?",
    options: [
      "Supprimer toutes les couches intermédiaires",
      "Utiliser la régularisation de confiance (confidence penalty) et limiter l'information dans les sorties à ce qui est strictement nécessaire",
      "Augmenter le nombre de classes",
      "Utiliser uniquement des modèles linéaires",
    ],
    correctIndex: 1,
    explanation:
      "Réduire la confiance excessive (overconfidence) du modèle par une pénalité d'entropie rend le model inversion plus difficile car les sorties contiennent moins d'information exploitable. Retourner uniquement le label top-1 au lieu des probabilités complètes, ou arrondir les probabilités, limite aussi l'information disponible pour l'attaquant.",
    difficulty: 'hard',
  },
  {
    id: 'p4-q34',
    phaseId: 'phase-04',
    lessonId: 'p4-defenses',
    question:
      "Comment le TRADES (TRadeoff-inspired Adversarial DEfense via Surrogate-loss minimization) améliore-t-il l'adversarial training standard ?",
    options: [
      "En utilisant un dataset plus grand",
      "En optimisant explicitement le compromis entre la précision standard et la robustesse adversariale via une loss combinée avec un hyperparamètre de pondération",
      "En entraînant plus d'époques",
      "En utilisant un plus grand modèle",
    ],
    correctIndex: 1,
    explanation:
      "TRADES décompose la loss en deux termes : la perte de classification standard (précision propre) et la perte de robustesse (différence KL entre les prédictions sur les exemples propres et adversariaux). L'hyperparamètre 1/λ contrôle le compromis. Cela donne un meilleur compromis que le PGD-AT de Madry qui tend à sacrifier excessivement la précision propre.",
    difficulty: 'hard',
  },
  {
    id: 'p4-q35',
    phaseId: 'phase-04',
    lessonId: 'p4-extraction',
    question:
      "Quelle technique permet de détecter une attaque d'extraction de modèle via l'analyse des patterns de requêtes API ?",
    options: [
      "Bloquer toutes les requêtes après un certain quota",
      "Analyser la distribution des entrées : les requêtes d'extraction montrent souvent des patterns systématiques (grille, frontière de décision) détectables par un système de monitoring avancé",
      "Ralentir toutes les réponses de l'API",
      "Exiger une authentification biométrique pour chaque requête",
    ],
    correctIndex: 1,
    explanation:
      "Les attaques d'extraction envoient des requêtes systématiques qui diffèrent de l'usage légitime : densité uniforme dans l'espace d'entrée, concentration autour des frontières de décision, ou séquences méthodiques. Un système de monitoring peut utiliser des détecteurs de distribution anormale (PRADA - Protecting Against DNN Model Stealing Attacks) pour identifier ces patterns.",
    difficulty: 'hard',
  },
  {
    id: 'p4-q36',
    phaseId: 'phase-04',
    lessonId: 'p4-monitoring',
    question:
      "Comment implémenter un pipeline complet de monitoring de drift avec Prometheus et Grafana pour un modèle ML en production ?",
    options: [
      "Monitorer uniquement le CPU et la mémoire",
      "Exposer des métriques custom (histogrammes de features, scores PSI, distribution de confiance) via un exporter Prometheus, configurer des recording rules pour les calculs de drift, et créer des dashboards Grafana avec des seuils d'alerte",
      "Utiliser uniquement les métriques par défaut de Prometheus",
      "Vérifier manuellement les logs une fois par semaine",
    ],
    correctIndex: 1,
    explanation:
      "Un pipeline complet comprend : 1) Un exporter custom qui calcule et expose les métriques ML (histogrammes de features via prometheus_client, scores de drift), 2) Des recording rules Prometheus pour agréger les métriques (PSI, KS-test sur fenêtre glissante), 3) Des alerting rules pour les seuils critiques, 4) Des dashboards Grafana avec des panneaux de distribution et des annotations de redéploiement.",
    difficulty: 'hard',
  },
  {
    id: 'p4-q37',
    phaseId: 'phase-04',
    lessonId: 'p4-defenses',
    question:
      "Quelle est la limitation théorique fondamentale de la robustesse adversariale identifiée par Tsipras et al. (2019) ?",
    options: [
      "Les modèles robustes nécessitent plus de GPU",
      "Il existe un compromis inhérent (trade-off) entre la précision standard et la robustesse adversariale, lié à la nature des features robustes vs non-robustes",
      "La robustesse ne peut être atteinte qu'avec des modèles linéaires",
      "Les attaques adversariales sont impossibles à contrer",
    ],
    correctIndex: 1,
    explanation:
      "Tsipras et al. ont démontré qu'il existe des features utiles pour la classification mais intrinsèquement non robustes. Un modèle standard exploite ces features pour maximiser la précision, mais elles sont facilement manipulables. Forcer la robustesse oblige le modèle à n'utiliser que les features robustes, ce qui réduit inévitablement la précision standard.",
    difficulty: 'hard',
  },
  {
    id: 'p4-q38',
    phaseId: 'phase-04',
    lessonId: 'p4-defenses',
    question:
      "Comment l'attaque AutoAttack combine-t-elle différentes méthodes pour une évaluation fiable de la robustesse ?",
    options: [
      "En entraînant automatiquement un modèle d'attaque",
      "En exécutant séquentiellement APGD-CE, APGD-DLR (adaptations de PGD), FAB et Square Attack (boîte noire) pour éviter les faux sentiments de sécurité",
      "En utilisant uniquement FGSM avec différents epsilon",
      "En combinant des attaques de data poisoning",
    ],
    correctIndex: 1,
    explanation:
      "AutoAttack est un benchmark standardisé qui combine 4 attaques complémentaires : APGD-CE et APGD-DLR (versions adaptatives de PGD avec des loss différentes), FAB (Fast Adaptive Boundary), et Square Attack (attaque boîte noire sans gradient). Cette combinaison rend l'évaluation plus fiable en testant diverses stratégies d'attaque simultanément.",
    difficulty: 'hard',
  },
  {
    id: 'p4-q39',
    phaseId: 'phase-04',
    lessonId: 'p4-monitoring',
    question:
      "Comment la technique de 'model assertion' peut-elle être utilisée pour sécuriser un modèle ML en production contre les attaques adversariales et le drift ?",
    options: [
      "En ajoutant des assert statements dans le code Python",
      "En définissant des contraintes de cohérence sur les sorties du modèle et les distributions d'entrée qui, si violées, déclenchent un fallback sûr ou une alerte",
      "En dupliquant le modèle sur plusieurs serveurs",
      "En versionant les assertions avec Git",
    ],
    correctIndex: 1,
    explanation:
      "Les model assertions sont des règles de cohérence vérifiées en temps réel : monotonie (si le revenu augmente, le score de crédit ne doit pas baisser), bornes physiques, cohérence entre features. En production, une violation peut déclencher un fallback (réponse par défaut sûre), un logging détaillé, ou une alerte pour investigation. Cela détecte à la fois les attaques adversariales et les drifts.",
    difficulty: 'hard',
  },
  {
    id: 'p4-q40',
    phaseId: 'phase-04',
    lessonId: 'p4-evasion',
    question:
      "Comment les attaques adversariales physiques (physical adversarial examples) diffèrent-elles des attaques numériques et quelles contraintes supplémentaires imposent-elles ?",
    options: [
      "Elles sont identiques aux attaques numériques",
      "Elles doivent résister aux transformations du monde réel (changements d'angle, éclairage, distance, résolution caméra) et sont souvent implémentées via des patchs ou des perturbations imprimables",
      "Elles ne fonctionnent que sur des modèles non entraînés",
      "Elles nécessitent un accès physique au serveur",
    ],
    correctIndex: 1,
    explanation:
      "Les attaques adversariales physiques (ex: adversarial patch, perturbations sur panneaux routiers) doivent être robustes aux transformations du monde réel : variations d'angle de vue, de luminosité, de distance et de résolution de capture. Cela impose des contraintes d'optimisation supplémentaires via l'Expectation over Transformations (EoT) qui moyenne l'adversarialité sur de multiples transformations simulées.",
    difficulty: 'hard',
  },
];
