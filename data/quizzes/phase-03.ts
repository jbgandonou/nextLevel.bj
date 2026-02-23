import { QuizQuestion } from '../types';

export const phase03Questions: QuizQuestion[] = [
  // ===== EASY (12 questions) =====
  {
    id: 'p3-q01',
    phaseId: 'phase-03',
    lessonId: 'p3-owasp-ml',
    question: 'Que signifie OWASP dans le contexte de la sécurité ML ?',
    options: [
      'Open Web Application Security Project',
      'Online Web Attack Security Protocol',
      'Open Wireless Application Safety Program',
      'Operational Web Application Security Platform',
    ],
    correctIndex: 0,
    explanation:
      "OWASP signifie Open Web Application Security Project. C'est une fondation à but non lucratif qui publie des référentiels de sécurité, y compris le ML Top 10 pour la sécurité des systèmes de machine learning.",
    difficulty: 'easy',
  },
  {
    id: 'p3-q02',
    phaseId: 'phase-03',
    lessonId: 'p3-data-poisoning',
    question:
      "Qu'est-ce que le data poisoning dans le contexte de la sécurité ML ?",
    options: [
      "La suppression accidentelle de données d'entraînement",
      "L'injection de données malveillantes dans le jeu d'entraînement pour corrompre le modèle",
      "Le chiffrement des données avant l'entraînement",
      "La compression excessive des données",
    ],
    correctIndex: 1,
    explanation:
      "Le data poisoning consiste à injecter délibérément des données malveillantes ou corrompues dans le jeu d'entraînement afin de manipuler le comportement du modèle résultant.",
    difficulty: 'easy',
  },
  {
    id: 'p3-q03',
    phaseId: 'phase-03',
    lessonId: 'p3-sbom',
    question: "Qu'est-ce qu'un SBOM (Software Bill of Materials) ?",
    options: [
      'Un algorithme de chiffrement pour les modèles ML',
      "Un inventaire complet de tous les composants logiciels et dépendances d'un projet",
      'Un protocole de communication entre microservices',
      'Un outil de monitoring de performance',
    ],
    correctIndex: 1,
    explanation:
      "Un SBOM est un inventaire formel et structuré de tous les composants, bibliothèques et dépendances utilisés dans un logiciel. Il permet d'identifier rapidement les vulnérabilités dans la chaîne d'approvisionnement.",
    difficulty: 'easy',
  },
  {
    id: 'p3-q04',
    phaseId: 'phase-03',
    lessonId: 'p3-secrets',
    question:
      'Quelle est la première étape pour sécuriser les secrets dans un projet ML ?',
    options: [
      'Les stocker dans le code source',
      'Les partager par email chiffré',
      'Utiliser un gestionnaire de secrets comme HashiCorp Vault ou AWS Secrets Manager',
      'Les écrire dans un fichier README',
    ],
    correctIndex: 2,
    explanation:
      "Les secrets (clés API, mots de passe, tokens) ne doivent jamais être stockés en clair dans le code. Un gestionnaire de secrets dédié assure leur stockage chiffré, leur rotation et leur accès contrôlé.",
    difficulty: 'easy',
  },
  {
    id: 'p3-q05',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      "Quel risque principal est lié à l'utilisation de modèles pré-entraînés téléchargés depuis Internet ?",
    options: [
      'Ils consomment trop de mémoire',
      'Ils peuvent contenir des backdoors ou du code malveillant',
      'Ils sont toujours moins performants',
      "Ils ne fonctionnent qu'avec Python",
    ],
    correctIndex: 1,
    explanation:
      "Les modèles pré-entraînés provenant de sources non vérifiées peuvent contenir des backdoors, du code malveillant sérialisé (ex: via pickle), ou des biais intentionnels. C'est un risque majeur de la chaîne d'approvisionnement ML.",
    difficulty: 'easy',
  },
  {
    id: 'p3-q06',
    phaseId: 'phase-03',
    lessonId: 'p3-owasp-ml',
    question:
      "Dans le OWASP ML Top 10, que désigne le risque d'Input Manipulation ?",
    options: [
      "La modification du code source de l'application",
      "La manipulation des entrées fournies au modèle pour altérer ses prédictions",
      'La modification des hyperparamètres du modèle',
      "Le changement de format des données d'entraînement",
    ],
    correctIndex: 1,
    explanation:
      "L'Input Manipulation consiste à modifier les données d'entrée fournies au modèle en production pour provoquer des prédictions erronées. C'est l'un des risques les plus courants identifiés par OWASP ML Top 10.",
    difficulty: 'easy',
  },
  {
    id: 'p3-q07',
    phaseId: 'phase-03',
    lessonId: 'p3-secrets',
    question:
      "Quel fichier doit être utilisé pour empêcher les secrets d'être versionnés avec Git ?",
    options: ['.gitconfig', '.gitignore', '.gitmodules', '.gitattributes'],
    correctIndex: 1,
    explanation:
      "Le fichier .gitignore permet de spécifier les fichiers et répertoires à exclure du versionnement Git. On y ajoute les fichiers contenant des secrets (.env, credentials.json, etc.) pour éviter qu'ils ne soient poussés dans le dépôt.",
    difficulty: 'easy',
  },
  {
    id: 'p3-q08',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      "Qu'est-ce que la supply chain security dans le contexte du ML ?",
    options: [
      "La sécurité de la chaîne d'approvisionnement physique",
      'La sécurité de toutes les dépendances, données et outils utilisés pour construire un modèle ML',
      'La sécurité du réseau de distribution du modèle',
      'La protection des brevets sur les algorithmes',
    ],
    correctIndex: 1,
    explanation:
      "La supply chain security en ML couvre la sécurisation de l'ensemble des composants : bibliothèques, frameworks, données d'entraînement, modèles pré-entraînés et outils de déploiement utilisés dans le pipeline ML.",
    difficulty: 'easy',
  },
  {
    id: 'p3-q09',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      'Quel format de sérialisation Python est connu pour ses vulnérabilités de sécurité dans le contexte ML ?',
    options: ['JSON', 'CSV', 'Pickle', 'YAML safe_load'],
    correctIndex: 2,
    explanation:
      "Le format Pickle de Python permet l'exécution de code arbitraire lors de la désérialisation. Un fichier pickle malveillant peut exécuter du code dangereux sur la machine cible. Il est recommandé d'utiliser des formats plus sûrs comme SafeTensors.",
    difficulty: 'easy',
  },
  {
    id: 'p3-q10',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      "Quelle pratique est essentielle pour gérer les dépendances d'un projet ML de manière sécurisée ?",
    options: [
      'Toujours utiliser la dernière version de chaque bibliothèque',
      'Épingler les versions des dépendances et vérifier régulièrement les vulnérabilités connues',
      'Ne jamais mettre à jour les dépendances',
      "N'utiliser que des bibliothèques développées en interne",
    ],
    correctIndex: 1,
    explanation:
      "L'épinglage des versions (version pinning) garantit la reproductibilité et la stabilité. Combiné à un scan régulier des vulnérabilités (CVE), cela permet d'identifier et corriger rapidement les failles dans les dépendances.",
    difficulty: 'easy',
  },
  {
    id: 'p3-q11',
    phaseId: 'phase-03',
    lessonId: 'p3-secrets',
    question:
      "À quoi sert l'outil git-secrets développé par AWS ?",
    options: [
      'Chiffrer les dépôts Git',
      'Empêcher le commit de secrets (clés, mots de passe) dans les dépôts Git',
      'Gérer les permissions des branches Git',
      'Sauvegarder les dépôts Git dans le cloud',
    ],
    correctIndex: 1,
    explanation:
      "git-secrets est un outil qui scanne les commits, messages de commit et merges pour détecter les secrets (clés AWS, mots de passe, etc.) et empêcher leur ajout accidentel dans un dépôt Git.",
    difficulty: 'easy',
  },
  {
    id: 'p3-q12',
    phaseId: 'phase-03',
    lessonId: 'p3-secrets',
    question:
      'Quel est le principal objectif du chiffrement des données au repos dans un pipeline ML ?',
    options: [
      "Accélérer l'entraînement du modèle",
      "Protéger les données sensibles en cas d'accès non autorisé au stockage",
      'Réduire la taille des fichiers',
      'Améliorer la qualité du modèle',
    ],
    correctIndex: 1,
    explanation:
      "Le chiffrement au repos (at rest) protège les données d'entraînement, les modèles et les artefacts stockés contre les accès non autorisés. Même si un attaquant accède au stockage, les données restent illisibles sans la clé de déchiffrement.",
    difficulty: 'easy',
  },

  // ===== MEDIUM (16 questions) =====
  {
    id: 'p3-q13',
    phaseId: 'phase-03',
    lessonId: 'p3-owasp-ml',
    question:
      "Dans le OWASP ML Top 10, quel risque est associé à un contrôle d'accès insuffisant sur le modèle lui-même ?",
    options: [
      'ML01 - Input Manipulation',
      'ML02 - Data Poisoning',
      'ML06 - AI Supply Chain Attacks',
      'ML09 - Output Integrity Attack',
    ],
    correctIndex: 2,
    explanation:
      "ML06 - AI Supply Chain Attacks couvre les attaques sur la chaîne d'approvisionnement, incluant l'accès non autorisé aux modèles et composants. Un contrôle d'accès insuffisant permet à des attaquants de modifier ou remplacer des modèles dans le pipeline.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q14',
    phaseId: 'phase-03',
    lessonId: 'p3-data-poisoning',
    question:
      "Comment une attaque de type label flipping affecte-t-elle un modèle de classification ?",
    options: [
      'Elle modifie les hyperparamètres du modèle',
      "Elle inverse les étiquettes de certains exemples d'entraînement pour dégrader la performance ou créer des backdoors",
      'Elle change le format des labels de catégoriel à numérique',
      'Elle supprime les labels des données de test',
    ],
    correctIndex: 1,
    explanation:
      "Le label flipping est une technique de data poisoning qui consiste à inverser ou modifier les étiquettes d'un sous-ensemble de données d'entraînement. Cela peut dégrader la performance globale du modèle ou créer des comportements ciblés malveillants.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q15',
    phaseId: 'phase-03',
    lessonId: 'p3-sbom',
    question:
      "Quel outil peut être utilisé pour générer automatiquement un SBOM pour un projet Python ?",
    options: [
      'pylint',
      'CycloneDX ou Syft',
      'black',
      'mypy',
    ],
    correctIndex: 1,
    explanation:
      "CycloneDX et Syft sont des outils spécialisés dans la génération de SBOM. CycloneDX-python peut analyser un fichier requirements.txt ou poetry.lock pour produire un SBOM au format CycloneDX ou SPDX.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q16',
    phaseId: 'phase-03',
    lessonId: 'p3-data-poisoning',
    question:
      'Quelle stratégie de défense est la plus efficace contre le data poisoning dans un dataset collaboratif ?',
    options: [
      "Augmenter la taille du dataset sans vérification",
      'Appliquer un filtrage statistique des outliers et une validation croisée des contributions',
      "Utiliser uniquement des modèles plus complexes",
      "Réduire le nombre d'époques d'entraînement",
    ],
    correctIndex: 1,
    explanation:
      "Le filtrage statistique des outliers et la validation croisée des contributions permettent d'identifier et d'écarter les données suspectes. Des techniques comme RONI (Reject On Negative Influence) évaluent l'impact de chaque contribution sur la performance du modèle.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q17',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      "Qu'est-ce qu'une attaque de type model supply chain dans le contexte de Hugging Face Hub ?",
    options: [
      "Télécharger un modèle depuis le hub officiel",
      "Publier un modèle contenant du code malveillant sérialisé dans les poids ou la configuration",
      "Utiliser une version obsolète de la bibliothèque transformers",
      "Entraîner un modèle avec des données publiques",
    ],
    correctIndex: 1,
    explanation:
      "Un attaquant peut publier sur Hugging Face Hub un modèle dont les fichiers (pickle, config) contiennent du code malveillant. Lors du chargement par un utilisateur, ce code s'exécute automatiquement. Le format SafeTensors a été créé pour contrer ce risque.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q18',
    phaseId: 'phase-03',
    lessonId: 'p3-secrets',
    question:
      "Quel mécanisme HashiCorp Vault utilise-t-il pour limiter l'exposition des secrets ?",
    options: [
      "Le stockage en clair avec accès par mot de passe",
      "Les secrets dynamiques avec durée de vie limitée (TTL) et rotation automatique",
      "Le chiffrement symétrique avec clé partagée",
      "Le stockage des secrets dans des variables d'environnement système",
    ],
    correctIndex: 1,
    explanation:
      "HashiCorp Vault génère des secrets dynamiques avec une durée de vie (TTL) configurable. Ces secrets sont automatiquement révoqués après expiration, limitant la fenêtre d'exploitation en cas de fuite. La rotation automatique renforce cette protection.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q19',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      "Quelle vulnérabilité est spécifiquement liée à l'utilisation de pip install sans vérification ?",
    options: [
      'Buffer overflow',
      "Dependency confusion (installation d'un paquet malveillant ayant un nom similaire depuis PyPI au lieu du registre interne)",
      'SQL injection',
      'Cross-site scripting',
    ],
    correctIndex: 1,
    explanation:
      "La dependency confusion exploite la priorité de résolution des paquets. Un attaquant publie sur PyPI un paquet avec le même nom qu'un paquet interne mais une version supérieure. pip installe alors le paquet malveillant public au lieu du paquet interne légitime.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q20',
    phaseId: 'phase-03',
    lessonId: 'p3-sbom',
    question:
      "Quel standard est recommandé pour le format d'un SBOM dans l'industrie ?",
    options: [
      'JSON Schema uniquement',
      'SPDX ou CycloneDX',
      'OpenAPI Specification',
      'Protocol Buffers',
    ],
    correctIndex: 1,
    explanation:
      "SPDX (Software Package Data Exchange) et CycloneDX sont les deux standards principaux pour les SBOM. SPDX est un standard ISO, tandis que CycloneDX est un standard OWASP. Les deux sont largement adoptés et supportent différents formats (JSON, XML).",
    difficulty: 'medium',
  },
  {
    id: 'p3-q21',
    phaseId: 'phase-03',
    lessonId: 'p3-owasp-ml',
    question:
      "Comment le concept de 'least privilege' s'applique-t-il à un pipeline ML ?",
    options: [
      "Donner à tous les développeurs un accès administrateur pour faciliter le travail",
      "Accorder à chaque composant du pipeline uniquement les permissions minimales nécessaires à son fonctionnement",
      "Limiter le nombre de développeurs dans l'équipe",
      "Utiliser un seul compte de service pour tout le pipeline",
    ],
    correctIndex: 1,
    explanation:
      "Le principe du moindre privilège signifie que chaque composant (entraînement, inférence, monitoring) ne doit avoir accès qu'aux ressources strictement nécessaires. Par exemple, le service d'inférence n'a pas besoin d'accéder aux données d'entraînement brutes.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q22',
    phaseId: 'phase-03',
    lessonId: 'p3-data-poisoning',
    question:
      "Quelle technique permet de détecter si un dataset d'entraînement a été empoisonné ?",
    options: [
      "Augmenter la taille du modèle",
      "Analyser la distribution des activations et utiliser la spectral signature detection",
      "Réduire le learning rate",
      "Changer d'optimiseur",
    ],
    correctIndex: 1,
    explanation:
      "La spectral signature detection analyse les représentations latentes des données pour identifier les clusters de données empoisonnées. Les données empoisonnées tendent à laisser une signature spectrale détectable dans l'espace des activations du modèle.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q23',
    phaseId: 'phase-03',
    lessonId: 'p3-owasp-ml',
    question:
      "Quel risque OWASP ML Top 10 est directement lié à la fuite d'informations sensibles via les prédictions du modèle ?",
    options: [
      'ML01 - Input Manipulation',
      'ML04 - Model Theft',
      'ML07 - Transfer Learning Attack',
      'ML05 - Model Inversion',
    ],
    correctIndex: 3,
    explanation:
      "ML05 - Model Inversion décrit le risque qu'un attaquant puisse reconstruire des données sensibles d'entraînement en analysant les sorties du modèle. Par exemple, reconstruire des visages à partir d'un modèle de reconnaissance faciale.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q24',
    phaseId: 'phase-03',
    lessonId: 'p3-secrets',
    question:
      "Pourquoi est-il dangereux de stocker des clés API dans des variables d'environnement sur un serveur partagé ?",
    options: [
      "Les variables d'environnement sont toujours chiffrées",
      "Les processus enfants héritent des variables d'environnement et elles peuvent apparaître dans les logs ou le fichier /proc",
      "Les variables d'environnement sont limitées en taille",
      "Les variables d'environnement ne persistent pas après un redémarrage",
    ],
    correctIndex: 1,
    explanation:
      "Sur un serveur partagé, les variables d'environnement peuvent être exposées via /proc/[pid]/environ, héritées par des processus enfants non autorisés, ou fuiter dans les logs d'erreur. Un gestionnaire de secrets dédié offre un meilleur contrôle d'accès.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q25',
    phaseId: 'phase-03',
    lessonId: 'p3-data-poisoning',
    question:
      "Qu'est-ce qu'une attaque de type backdoor dans un modèle ML ?",
    options: [
      "Un bug dans le code d'entraînement",
      "Un comportement caché activé par un déclencheur spécifique (trigger) inséré pendant l'entraînement",
      "Un accès SSH non autorisé au serveur",
      "Une faille dans le protocole HTTPS",
    ],
    correctIndex: 1,
    explanation:
      "Un backdoor ML est un comportement malveillant intégré au modèle pendant l'entraînement. Le modèle fonctionne normalement sauf lorsqu'il rencontre un trigger spécifique (par ex. un patch dans une image) qui active le comportement malveillant.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q26',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      "Quel outil permet de scanner les vulnérabilités dans les dépendances Python d'un projet ML ?",
    options: [
      'pytest',
      'Safety ou pip-audit',
      'flake8',
      'coverage',
    ],
    correctIndex: 1,
    explanation:
      "Safety et pip-audit scannent les dépendances Python installées contre des bases de données de vulnérabilités connues (CVE). pip-audit, développé par PyPA, vérifie les paquets contre la base de données OSV (Open Source Vulnerabilities).",
    difficulty: 'medium',
  },
  {
    id: 'p3-q27',
    phaseId: 'phase-03',
    lessonId: 'p3-owasp-ml',
    question:
      'Quelle mesure de sécurité est recommandée lors du déploiement d\'un modèle ML via une API REST ?',
    options: [
      "Laisser l'API ouverte pour maximiser l'accessibilité",
      "Implémenter une authentification, un rate limiting et une validation stricte des entrées",
      "Utiliser uniquement le protocole HTTP pour la simplicité",
      "Désactiver les logs pour protéger la vie privée",
    ],
    correctIndex: 1,
    explanation:
      "Une API de modèle ML doit être protégée par une authentification (JWT, API keys), un rate limiting pour prévenir les abus, et une validation stricte des entrées pour empêcher les attaques par manipulation d'input.",
    difficulty: 'medium',
  },
  {
    id: 'p3-q28',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      "Comment la signature cryptographique des modèles contribue-t-elle à la supply chain security ?",
    options: [
      "Elle accélère le chargement du modèle",
      "Elle garantit l'intégrité et l'authenticité du modèle en vérifiant qu'il n'a pas été modifié après sa publication",
      "Elle compresse le modèle pour réduire la taille",
      "Elle convertit le modèle dans un format universel",
    ],
    correctIndex: 1,
    explanation:
      "La signature cryptographique (par ex. avec Sigstore/cosign) permet de vérifier que le modèle provient d'une source légitime et n'a pas été altéré. C'est essentiel pour la supply chain security car elle détecte toute modification non autorisée.",
    difficulty: 'medium',
  },

  // ===== HARD (12 questions) =====
  {
    id: 'p3-q29',
    phaseId: 'phase-03',
    lessonId: 'p3-data-poisoning',
    question:
      "Dans une attaque de clean-label poisoning, quelle est la particularité qui la rend difficile à détecter ?",
    options: [
      "Les données empoisonnées ont des labels incorrects évidents",
      "Les données empoisonnées ont des labels corrects mais des features subtilement modifiées qui créent un backdoor",
      "L'attaque ne fonctionne que sur les modèles linéaires",
      "L'attaque nécessite un accès direct au modèle",
    ],
    correctIndex: 1,
    explanation:
      "Le clean-label poisoning est particulièrement insidieux car les données empoisonnées ont des labels corrects. L'attaquant modifie subtilement les features (ex: perturbations imperceptibles dans les images) pour que le modèle apprenne une association avec un trigger, tout en semblant légitime lors d'une inspection manuelle.",
    difficulty: 'hard',
  },
  {
    id: 'p3-q30',
    phaseId: 'phase-03',
    lessonId: 'p3-data-poisoning',
    question:
      "Quel mécanisme de défense utilise la technique de 'differential privacy' pour protéger les données d'entraînement ?",
    options: [
      "Chiffrer les gradients pendant l'entraînement",
      "Ajouter du bruit calibré aux gradients pour limiter mathématiquement l'information qu'un attaquant peut extraire sur un individu",
      "Supprimer aléatoirement des données d'entraînement",
      "Utiliser un réseau de neurones plus petit",
    ],
    correctIndex: 1,
    explanation:
      "La differential privacy (DP-SGD) ajoute du bruit gaussien calibré aux gradients pendant l'entraînement et applique un gradient clipping. Le paramètre epsilon (ε) quantifie mathématiquement la garantie de confidentialité. Un epsilon plus petit offre une meilleure protection mais peut dégrader la performance du modèle.",
    difficulty: 'hard',
  },
  {
    id: 'p3-q31',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      "Comment l'attaque de trojan insertion via transfer learning fonctionne-t-elle ?",
    options: [
      "L'attaquant modifie le code de la bibliothèque de transfer learning",
      "L'attaquant publie un modèle pré-entraîné contenant un backdoor qui survit au fine-tuning sur un nouveau dataset",
      "L'attaquant intercepte les données de fine-tuning",
      "L'attaquant modifie les hyperparamètres de fine-tuning",
    ],
    correctIndex: 1,
    explanation:
      "Dans cette attaque, le backdoor est intégré dans les couches profondes du modèle pré-entraîné. Lors du transfer learning, seules les dernières couches sont modifiées, préservant le backdoor dans les couches gelées. L'attaquant peut ainsi affecter tous les modèles dérivés du modèle compromis.",
    difficulty: 'hard',
  },
  {
    id: 'p3-q32',
    phaseId: 'phase-03',
    lessonId: 'p3-data-poisoning',
    question:
      "Quelle technique avancée permet de détecter un backdoor dans un modèle de deep learning sans accès aux données d'entraînement ?",
    options: [
      "Réentraîner le modèle depuis zéro",
      "Neural Cleanse : optimisation inverse pour trouver le trigger minimal qui provoque la misclassification",
      "Augmenter simplement la taille du dataset de test",
      "Utiliser uniquement des métriques de précision standard",
    ],
    correctIndex: 1,
    explanation:
      "Neural Cleanse utilise l'optimisation inverse pour trouver, pour chaque classe cible, la perturbation minimale (trigger) qui fait basculer toutes les entrées vers cette classe. Si une classe nécessite un trigger anormalement petit, cela indique la présence d'un backdoor.",
    difficulty: 'hard',
  },
  {
    id: 'p3-q33',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      "Dans un pipeline MLOps, comment implémenter un contrôle d'intégrité de bout en bout des artefacts ML ?",
    options: [
      "Vérifier uniquement le hash du modèle final",
      "Utiliser une chaîne de signatures cryptographiques couvrant les données, le code d'entraînement, les hyperparamètres et le modèle produit (ML provenance)",
      "Limiter l'accès au registre de modèles",
      "Faire une revue de code manuelle à chaque déploiement",
    ],
    correctIndex: 1,
    explanation:
      "La ML provenance crée une chaîne de traçabilité cryptographique couvrant chaque étape du pipeline : hash des données, signature du code d'entraînement, enregistrement des hyperparamètres et signature du modèle résultant. Des outils comme SLSA et in-toto permettent d'implémenter cette approche.",
    difficulty: 'hard',
  },
  {
    id: 'p3-q34',
    phaseId: 'phase-03',
    lessonId: 'p3-data-poisoning',
    question:
      "Qu'est-ce que l'attaque de gradient leakage et comment peut-elle compromettre la confidentialité dans le federated learning ?",
    options: [
      "C'est une fuite de mémoire dans le calcul des gradients",
      "L'attaquant reconstruit les données d'entraînement individuelles en analysant les gradients partagés entre les participants",
      "C'est un dépassement de buffer lors du calcul de la backpropagation",
      "L'attaquant vole les gradients stockés sur disque",
    ],
    correctIndex: 1,
    explanation:
      "Dans le federated learning, les participants partagent des gradients au lieu de données brutes. Cependant, l'attaque de gradient leakage (Deep Leakage from Gradients) montre qu'un attaquant peut reconstruire les données d'entraînement originales en optimisant une entrée fictive pour reproduire les gradients observés.",
    difficulty: 'hard',
  },
  {
    id: 'p3-q35',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      "Comment un attaquant peut-il exploiter la sérialisation pickle dans un fichier .pkl de modèle PyTorch ?",
    options: [
      "En modifiant les poids du modèle pour réduire sa précision",
      "En injectant un objet __reduce__ personnalisé qui exécute du code arbitraire lors du chargement avec torch.load()",
      "En augmentant la taille du fichier pour provoquer un déni de service",
      "En corrompant les métadonnées du fichier",
    ],
    correctIndex: 1,
    explanation:
      "Python pickle appelle automatiquement la méthode __reduce__ lors de la désérialisation. Un attaquant peut créer un objet avec un __reduce__ qui exécute os.system() ou subprocess.call(). Lorsque torch.load() charge le fichier, le code malveillant s'exécute. La solution recommandée est d'utiliser torch.load(weights_only=True) ou le format SafeTensors.",
    difficulty: 'hard',
  },
  {
    id: 'p3-q36',
    phaseId: 'phase-03',
    lessonId: 'p3-sbom',
    question:
      "Quelle approche permet de créer un SBOM qui couvre non seulement les dépendances logicielles mais aussi les composants ML spécifiques (datasets, modèles) ?",
    options: [
      "Utiliser un SBOM standard sans modification",
      "Étendre le SBOM avec ML-BOM (Machine Learning Bill of Materials) incluant la provenance des données, les modèles pré-entraînés et leurs licences",
      "Créer un document texte séparé listant les composants ML",
      "Utiliser uniquement DVC pour le versionnement",
    ],
    correctIndex: 1,
    explanation:
      "Le ML-BOM étend le concept de SBOM aux spécificités du ML : provenance et licence des datasets, modèles pré-entraînés utilisés, frameworks d'entraînement, et artefacts produits. CycloneDX 1.5+ supporte nativement les composants ML dans sa spécification.",
    difficulty: 'hard',
  },
  {
    id: 'p3-q37',
    phaseId: 'phase-03',
    lessonId: 'p3-owasp-ml',
    question:
      "Dans le contexte de la sécurité ML, qu'est-ce que le 'model watermarking' et comment protège-t-il la propriété intellectuelle ?",
    options: [
      "Ajouter un logo visible sur les prédictions du modèle",
      "Intégrer un motif vérifiable dans le comportement du modèle qui permet de prouver sa propriété sans affecter significativement la performance",
      "Chiffrer les poids du modèle avec un mot de passe",
      "Enregistrer le modèle dans un registre de brevets",
    ],
    correctIndex: 1,
    explanation:
      "Le model watermarking entraîne le modèle à répondre de manière spécifique à un ensemble de clés (inputs spéciaux). Ce comportement sert de 'signature' vérifiable. Si un modèle volé présente les mêmes réponses aux clés, cela prouve le vol. Les techniques incluent le backdoor-based watermarking et le feature-based watermarking.",
    difficulty: 'hard',
  },
  {
    id: 'p3-q38',
    phaseId: 'phase-03',
    lessonId: 'p3-secrets',
    question:
      "Comment implémenter une rotation sécurisée des secrets pour les endpoints d'inférence ML en production sans interruption de service ?",
    options: [
      "Arrêter le service, changer les secrets, redémarrer le service",
      "Utiliser un système de double-buffering de secrets avec une période de grâce où l'ancien et le nouveau secret sont simultanément valides",
      "Ne jamais changer les secrets en production",
      "Utiliser le même secret pour tous les environnements",
    ],
    correctIndex: 1,
    explanation:
      "La rotation sans interruption utilise un système de double-buffering : le nouveau secret est déployé d'abord, puis une période de grâce permet l'acceptation des deux secrets simultanément. Après propagation complète, l'ancien secret est révoqué. HashiCorp Vault et AWS Secrets Manager supportent ce pattern nativement.",
    difficulty: 'hard',
  },
  {
    id: 'p3-q39',
    phaseId: 'phase-03',
    lessonId: 'p3-data-poisoning',
    question:
      "Quelle est la différence fondamentale entre une attaque de data poisoning ciblée (targeted) et une attaque indiscriminée (untargeted) ?",
    options: [
      "La targeted ne nécessite aucun accès aux données",
      "La targeted vise à modifier le comportement du modèle pour des inputs spécifiques tout en maintenant la performance globale, tandis que la untargeted dégrade la performance générale",
      "La untargeted est toujours plus efficace",
      "Il n'y a aucune différence pratique",
    ],
    correctIndex: 1,
    explanation:
      "Une attaque ciblée est plus sophistiquée : elle maintient la performance globale du modèle (pour éviter la détection) tout en provoquant des erreurs sur des inputs spécifiques choisis par l'attaquant. L'attaque indiscriminée vise simplement à dégrader la performance globale, la rendant plus facile à détecter.",
    difficulty: 'hard',
  },
  {
    id: 'p3-q40',
    phaseId: 'phase-03',
    lessonId: 'p3-supply-chain',
    question:
      "Comment la technique de Trusted Execution Environment (TEE) peut-elle être utilisée pour protéger un modèle ML en production ?",
    options: [
      "En accélérant le calcul via des instructions spécialisées",
      "En exécutant l'inférence dans une enclave matérielle isolée où ni le système d'exploitation ni l'administrateur ne peuvent accéder aux données ou au modèle en clair",
      "En compressant le modèle pour réduire la surface d'attaque",
      "En répliquant le modèle sur plusieurs serveurs",
    ],
    correctIndex: 1,
    explanation:
      "Les TEE (comme Intel SGX, AMD SEV, ARM TrustZone) créent des enclaves matérielles isolées. Le modèle et les données sont chiffrés en dehors de l'enclave et ne sont déchiffrés que dans l'espace protégé du processeur. Même un attaquant avec accès root ne peut pas lire le modèle ou les données en mémoire.",
    difficulty: 'hard',
  },
];
