import { QuizQuestion } from '../types';

export const phase06Questions: QuizQuestion[] = [
  // === AWS ML / AZURE AI SERVICES (10 questions) ===
  {
    id: 'p6-q01',
    phaseId: 'phase-06',
    question: 'Quel service AWS est spécifiquement conçu pour entraîner et déployer des modèles ML à grande échelle ?',
    options: [
      'AWS Lambda',
      'Amazon SageMaker',
      'Amazon RDS',
      'AWS CloudFormation',
    ],
    correctIndex: 1,
    explanation:
      'Amazon SageMaker est la plateforme ML complète d\'AWS. Elle offre des notebooks Jupyter, l\'entraînement distribué, le déploiement d\'endpoints, le monitoring de modèles et des pipelines ML automatisés.',
    difficulty: 'easy',
  },
  {
    id: 'p6-q02',
    phaseId: 'phase-06',
    question: 'Quel service Azure permet de créer des pipelines ML automatisés avec une interface visuelle ?',
    options: [
      'Azure DevOps',
      'Azure Machine Learning Studio (Designer)',
      'Azure Functions',
      'Azure SQL Database',
    ],
    correctIndex: 1,
    explanation:
      'Azure Machine Learning Studio avec le Designer permet de créer des pipelines ML par glisser-déposer. Il offre aussi des notebooks, le MLOps intégré et le déploiement managé de modèles.',
    difficulty: 'easy',
  },
  {
    id: 'p6-q03',
    phaseId: 'phase-06',
    question: 'Quel service AWS permet d\'utiliser des modèles de fondation (foundation models) via une API ?',
    options: [
      'AWS Comprehend',
      'Amazon Bedrock',
      'AWS Rekognition',
      'Amazon Polly',
    ],
    correctIndex: 1,
    explanation:
      'Amazon Bedrock donne accès à des modèles de fondation (Claude, Llama, Stable Diffusion, etc.) via une API serverless. Il permet le fine-tuning et le RAG sans gérer l\'infrastructure GPU.',
    difficulty: 'easy',
  },
  {
    id: 'p6-q04',
    phaseId: 'phase-06',
    question: 'Quel est l\'avantage principal d\'utiliser un endpoint SageMaker Serverless par rapport à un endpoint en temps réel ?',
    options: [
      'Une latence plus faible pour chaque requête',
      'Le paiement uniquement à l\'utilisation, sans coût quand il n\'y a pas de trafic',
      'Une meilleure précision du modèle',
      'Un accès à plus de types d\'instances GPU',
    ],
    correctIndex: 1,
    explanation:
      'Les endpoints Serverless de SageMaker se mettent à l\'échelle automatiquement et facturent uniquement le temps de calcul utilisé. Ils sont idéaux pour les charges de travail intermittentes, mais ont un cold start.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q05',
    phaseId: 'phase-06',
    question: 'Quel service Azure fournit des API prêtes à l\'emploi pour la vision par ordinateur, le langage et la parole ?',
    options: [
      'Azure Cosmos DB',
      'Azure AI Services (anciennement Cognitive Services)',
      'Azure Active Directory',
      'Azure Storage',
    ],
    correctIndex: 1,
    explanation:
      'Azure AI Services (ex-Cognitive Services) offre des API pré-entraînées pour la vision (OCR, détection d\'objets), le langage (NLP, traduction), la parole (speech-to-text, text-to-speech) et la décision.',
    difficulty: 'easy',
  },
  {
    id: 'p6-q06',
    phaseId: 'phase-06',
    question: 'Quel composant d\'Azure OpenAI Service permet d\'implémenter le RAG (Retrieval-Augmented Generation) ?',
    options: [
      'Azure Blob Storage seul',
      'Azure AI Search combiné avec Azure OpenAI',
      'Azure Event Grid',
      'Azure Service Bus',
    ],
    correctIndex: 1,
    explanation:
      'Le RAG avec Azure se fait en combinant Azure AI Search (indexation et recherche vectorielle des documents) avec Azure OpenAI (génération). La recherche fournit le contexte pertinent au LLM pour des réponses ancrées dans les données.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q07',
    phaseId: 'phase-06',
    question: 'Qu\'est-ce qu\'un SageMaker Model Registry et à quoi sert-il ?',
    options: [
      'Un registre DNS pour les modèles',
      'Un catalogue centralisé pour versionner, approuver et gérer le cycle de vie des modèles ML',
      'Un outil pour enregistrer des noms de domaine',
      'Une base de données pour les métriques des modèles',
    ],
    correctIndex: 1,
    explanation:
      'Le Model Registry de SageMaker permet de versionner les modèles, de suivre les métadonnées (métriques, lignage), de gérer les approbations (staging, production) et d\'automatiser le déploiement via CI/CD.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q08',
    phaseId: 'phase-06',
    question: 'Comment sécuriser les données d\'entraînement dans Amazon SageMaker ?',
    options: [
      'Les données sont automatiquement sécurisées sans action',
      'Utiliser le chiffrement KMS, les VPC privés, et les IAM policies avec least privilege',
      'Simplement utiliser des mots de passe forts',
      'Stocker les données sur le disque local de l\'instance',
    ],
    correctIndex: 1,
    explanation:
      'La sécurité des données dans SageMaker repose sur : le chiffrement au repos (KMS) et en transit (TLS), l\'isolation réseau via VPC, les politiques IAM granulaires, et les logs CloudTrail pour l\'audit.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q09',
    phaseId: 'phase-06',
    question: 'Quel service AWS permet de détecter automatiquement le biais dans les modèles ML ?',
    options: [
      'AWS CloudWatch',
      'Amazon SageMaker Clarify',
      'AWS GuardDuty',
      'Amazon Macie',
    ],
    correctIndex: 1,
    explanation:
      'SageMaker Clarify détecte les biais dans les données et les modèles, fournit des explications de prédictions (SHAP values), et génère des rapports de biais pour la conformité réglementaire (EU AI Act).',
    difficulty: 'hard',
  },
  {
    id: 'p6-q10',
    phaseId: 'phase-06',
    question: 'Quelle est la différence principale entre Azure OpenAI Service et l\'API OpenAI directe ?',
    options: [
      'Les modèles sont différents',
      'Azure OpenAI offre l\'isolation réseau, la conformité entreprise et la résidence des données dans les régions Azure',
      'L\'API OpenAI directe est plus rapide',
      'Azure OpenAI est gratuit',
    ],
    correctIndex: 1,
    explanation:
      'Azure OpenAI Service déploie les mêmes modèles OpenAI mais dans l\'infrastructure Azure, offrant : Private Link, conformité (SOC2, HIPAA), résidence des données régionale, intégration avec Azure AD et monitoring via Azure Monitor.',
    difficulty: 'medium',
  },

  // === CLOUD SECURITY BEST PRACTICES (8 questions) ===
  {
    id: 'p6-q11',
    phaseId: 'phase-06',
    question: 'Quel principe de sécurité cloud stipule que le fournisseur et le client partagent les responsabilités ?',
    options: [
      'Le principe de moindre privilège',
      'Le modèle de responsabilité partagée (Shared Responsibility Model)',
      'Le principe de défense en profondeur',
      'Le modèle Zero Trust',
    ],
    correctIndex: 1,
    explanation:
      'Le Shared Responsibility Model définit que le fournisseur cloud sécurise l\'infrastructure (hardware, réseau, hyperviseur) tandis que le client est responsable de la sécurité de ses données, identités, configurations et applications.',
    difficulty: 'easy',
  },
  {
    id: 'p6-q12',
    phaseId: 'phase-06',
    question: 'Quelle est la meilleure pratique pour gérer les secrets (clés API, mots de passe) dans le cloud ?',
    options: [
      'Les stocker dans le code source avec le reste de l\'application',
      'Les stocker dans des variables d\'environnement en clair',
      'Utiliser un service de gestion de secrets comme AWS Secrets Manager ou Azure Key Vault',
      'Les envoyer par email aux développeurs',
    ],
    correctIndex: 2,
    explanation:
      'AWS Secrets Manager et Azure Key Vault chiffrent les secrets, gèrent leur rotation automatique, contrôlent l\'accès via IAM, et journalisent chaque accès. Jamais de secrets en dur dans le code ou en clair dans les variables d\'environnement.',
    difficulty: 'easy',
  },
  {
    id: 'p6-q13',
    phaseId: 'phase-06',
    question: 'Qu\'est-ce que le principe de "defense in depth" en sécurité cloud ?',
    options: [
      'Utiliser un seul pare-feu très puissant',
      'Mettre en place plusieurs couches de sécurité indépendantes pour qu\'une brèche dans une couche ne compromette pas l\'ensemble',
      'Cacher les serveurs dans un réseau profond',
      'Utiliser uniquement le chiffrement de bout en bout',
    ],
    correctIndex: 1,
    explanation:
      'La défense en profondeur superpose les contrôles : réseau (security groups, NACLs), identité (IAM, MFA), données (chiffrement), application (WAF, validation), et monitoring (CloudTrail, SIEM). La compromission d\'une couche ne suffit pas.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q14',
    phaseId: 'phase-06',
    question: 'Pourquoi est-il critique d\'activer le MFA sur les comptes root/administrateur du cloud ?',
    options: [
      'Pour accélérer la connexion',
      'Pour se conformer aux normes de design',
      'Parce que le compte root a un accès illimité et un mot de passe compromis donnerait le contrôle total de l\'infrastructure',
      'Pour réduire les coûts d\'infrastructure',
    ],
    correctIndex: 2,
    explanation:
      'Le compte root a des privilèges illimités. Sans MFA, un mot de passe volé (phishing, fuite) permet à un attaquant de détruire toute l\'infrastructure, exfiltrer les données et créer des coûts massifs.',
    difficulty: 'easy',
  },
  {
    id: 'p6-q15',
    phaseId: 'phase-06',
    question: 'Quel outil AWS permet de vérifier automatiquement la conformité des configurations de sécurité ?',
    options: [
      'Amazon Lex',
      'AWS Config avec des règles de conformité',
      'Amazon Kinesis',
      'AWS Glue',
    ],
    correctIndex: 1,
    explanation:
      'AWS Config enregistre les changements de configuration et évalue la conformité via des règles (S3 buckets chiffrés, security groups trop permissifs, etc.). Il détecte les dérives par rapport aux bonnes pratiques de sécurité.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q16',
    phaseId: 'phase-06',
    question: 'Quelle est la meilleure pratique pour sécuriser un bucket S3 contenant des données ML sensibles ?',
    options: [
      'Rendre le bucket public pour faciliter l\'accès des services ML',
      'Activer le chiffrement SSE-KMS, bloquer l\'accès public, activer le versioning et les logs d\'accès',
      'Utiliser uniquement des noms de bucket difficiles à deviner',
      'Déplacer les données vers une instance EC2',
    ],
    correctIndex: 1,
    explanation:
      'La sécurisation d\'un bucket S3 inclut : chiffrement SSE-KMS, Block Public Access activé, politiques IAM restrictives, versioning pour la protection contre la suppression, et les access logs pour l\'audit.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q17',
    phaseId: 'phase-06',
    question: 'Qu\'est-ce qu\'un VPC endpoint et pourquoi est-il important pour les services ML dans le cloud ?',
    options: [
      'Un DNS public pour accéder au VPC',
      'Une connexion privée entre le VPC et les services AWS sans passer par Internet',
      'Un point de terminaison pour les API REST',
      'Un outil de monitoring réseau',
    ],
    correctIndex: 1,
    explanation:
      'Un VPC endpoint permet au trafic entre les services ML (SageMaker, S3) et le VPC de rester sur le réseau privé AWS, sans traverser Internet. Cela réduit la surface d\'attaque et améliore les performances.',
    difficulty: 'hard',
  },
  {
    id: 'p6-q18',
    phaseId: 'phase-06',
    question: 'Quel service permet de détecter des comportements suspects et des menaces dans un compte AWS ?',
    options: [
      'Amazon Comprehend',
      'Amazon GuardDuty',
      'Amazon Translate',
      'AWS Step Functions',
    ],
    correctIndex: 1,
    explanation:
      'Amazon GuardDuty utilise le ML pour analyser les logs (CloudTrail, VPC Flow Logs, DNS) et détecter les menaces : crypto-mining, exfiltration de données, accès non autorisés, comportements anormaux des identités.',
    difficulty: 'hard',
  },

  // === TECHNICAL WRITING (6 questions) ===
  {
    id: 'p6-q19',
    phaseId: 'phase-06',
    question: 'Quel est le principe le plus important de la rédaction technique ?',
    options: [
      'Utiliser un vocabulaire le plus sophistiqué possible',
      'Écrire des phrases longues et détaillées',
      'La clarté : le lecteur doit comprendre le message sans ambiguïté',
      'Impressionner le lecteur avec des termes techniques complexes',
    ],
    correctIndex: 2,
    explanation:
      'La clarté est le principe fondamental de la rédaction technique. Un bon document technique permet au lecteur de comprendre rapidement le contenu, sans jargon inutile et avec une structure logique.',
    difficulty: 'easy',
  },
  {
    id: 'p6-q20',
    phaseId: 'phase-06',
    question: 'Qu\'est-ce qu\'un ADR (Architecture Decision Record) ?',
    options: [
      'Un rapport de bugs architecturaux',
      'Un document court qui capture une décision architecturale importante, son contexte et ses conséquences',
      'Un outil de diagramme d\'architecture',
      'Un certificat de conformité architecturale',
    ],
    correctIndex: 1,
    explanation:
      'Un ADR documente une décision architecturale avec : le contexte (pourquoi cette décision), la décision prise, les alternatives considérées, et les conséquences. Cela crée une traçabilité des choix techniques.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q21',
    phaseId: 'phase-06',
    question: 'Quelle structure est recommandée pour documenter une API REST ?',
    options: [
      'Un simple fichier texte avec des exemples',
      'Une spécification OpenAPI (Swagger) avec endpoints, paramètres, schémas de réponse et exemples',
      'Un document Word avec des captures d\'écran',
      'Un email aux développeurs avec les URLs',
    ],
    correctIndex: 1,
    explanation:
      'OpenAPI (Swagger) est le standard pour documenter les API REST. Il définit les endpoints, méthodes HTTP, paramètres, schémas de requête/réponse, codes d\'erreur, et génère une documentation interactive testable.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q22',
    phaseId: 'phase-06',
    question: 'Quelle est la meilleure pratique pour documenter un modèle ML destiné à la production ?',
    options: [
      'Un simple README avec le nom du modèle',
      'Une Model Card incluant les métriques, les données d\'entraînement, les limites, les biais connus et les cas d\'usage recommandés',
      'Un fichier Excel avec les hyperparamètres',
      'Un post sur un blog technique',
    ],
    correctIndex: 1,
    explanation:
      'Les Model Cards (proposées par Google) documentent systématiquement un modèle ML : description, métriques par sous-groupe, données d\'entraînement, limites connues, biais détectés, cas d\'usage appropriés et considérations éthiques.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q23',
    phaseId: 'phase-06',
    question: 'Quel format est recommandé pour écrire un post-mortem après un incident en production ?',
    options: [
      'Un message Slack informel',
      'Une chronologie de l\'incident, la cause racine, l\'impact, les actions correctives et les leçons apprises (blameless post-mortem)',
      'Un email de blâme à l\'équipe responsable',
      'Un ticket Jira marqué comme résolu',
    ],
    correctIndex: 1,
    explanation:
      'Un blameless post-mortem documente : la chronologie factuelle, la cause racine (pas la personne responsable), l\'impact mesuré, les actions correctives avec responsables et deadlines, et les leçons apprises pour prévenir la récurrence.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q24',
    phaseId: 'phase-06',
    question: 'Quel outil permet de générer automatiquement de la documentation à partir de commentaires dans le code Python ?',
    options: [
      'Webpack',
      'Sphinx avec les docstrings au format reStructuredText ou Google style',
      'Prettier',
      'ESLint',
    ],
    correctIndex: 1,
    explanation:
      'Sphinx est l\'outil standard en Python pour générer de la documentation à partir des docstrings. Combiné avec autodoc et les formats Google/NumPy, il produit une documentation HTML/PDF professionnelle directement depuis le code.',
    difficulty: 'hard',
  },

  // === PORTFOLIO BUILDING (6 questions) ===
  {
    id: 'p6-q25',
    phaseId: 'phase-06',
    question: 'Quel élément est le plus important dans un portfolio de sécurité IA ?',
    options: [
      'Le nombre total de projets listés',
      'Des études de cas détaillées montrant le processus de résolution de problèmes réels de sécurité',
      'Un design graphique impressionnant',
      'Une longue liste de certifications',
    ],
    correctIndex: 1,
    explanation:
      'Les recruteurs et clients cherchent la preuve de compétences pratiques. Des études de cas détaillées (problème, approche, solution, résultats mesurables) démontrent la capacité à résoudre des problèmes réels de sécurité IA.',
    difficulty: 'easy',
  },
  {
    id: 'p6-q26',
    phaseId: 'phase-06',
    question: 'Quelle plateforme est la plus appropriée pour publier des projets de sécurité ML open-source ?',
    options: [
      'Instagram',
      'GitHub avec des READMEs détaillés, des tests et une documentation',
      'TikTok',
      'Pinterest',
    ],
    correctIndex: 1,
    explanation:
      'GitHub est la plateforme standard pour les projets techniques. Un bon projet GitHub inclut : un README clair, du code propre et testé, de la documentation, des issues organisées et un CONTRIBUTING.md pour les contributeurs.',
    difficulty: 'easy',
  },
  {
    id: 'p6-q27',
    phaseId: 'phase-06',
    question: 'Quel type de projet de portfolio démontre le mieux des compétences en sécurité des LLM ?',
    options: [
      'Un site web personnel avec un beau design',
      'Un outil de détection de prompt injection avec une démo interactive et des benchmarks',
      'Un clone de Twitter',
      'Un jeu vidéo en JavaScript',
    ],
    correctIndex: 1,
    explanation:
      'Un outil de sécurité LLM fonctionnel (détection de prompt injection, guardrails, audit de sécurité) avec une démo accessible et des métriques de performance montre une maîtrise pratique du domaine et se démarque dans un portfolio.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q28',
    phaseId: 'phase-06',
    question: 'Comment présenter efficacement un projet de portfolio à un recruteur technique ?',
    options: [
      'Lister uniquement les technologies utilisées',
      'Suivre le format : contexte du problème, approche technique, défis rencontrés, résultats et métriques d\'impact',
      'Envoyer uniquement un lien vers le dépôt GitHub',
      'Montrer uniquement les captures d\'écran finales',
    ],
    correctIndex: 1,
    explanation:
      'Le format STAR adapté au technique (Situation/Problème, Approche technique, Défis/Solutions, Résultats mesurables) permet au recruteur de comprendre votre raisonnement, votre capacité à surmonter des obstacles et l\'impact concret de votre travail.',
    difficulty: 'medium',
  },
  {
    id: 'p6-q29',
    phaseId: 'phase-06',
    question: 'Quelle est la valeur ajoutée de contribuer à des projets open-source de sécurité IA pour un portfolio ?',
    options: [
      'Cela n\'a aucune valeur pour un portfolio',
      'Cela démontre la capacité à collaborer, comprendre du code existant, et contribuer à la communauté de sécurité',
      'Cela permet uniquement d\'apprendre à utiliser Git',
      'Cela remplace la nécessité d\'un diplôme',
    ],
    correctIndex: 1,
    explanation:
      'Les contributions open-source démontrent : la capacité à lire et comprendre du code existant, la collaboration via pull requests et code reviews, la communication technique en anglais, et l\'engagement dans la communauté sécurité IA.',
    difficulty: 'hard',
  },
  {
    id: 'p6-q30',
    phaseId: 'phase-06',
    question: 'Quel élément différencie un portfolio senior d\'un portfolio junior en sécurité IA ?',
    options: [
      'Le nombre de langages de programmation listés',
      'La capacité à montrer des décisions architecturales, des compromis de sécurité et l\'impact business des solutions',
      'L\'ancienneté dans l\'industrie',
      'Le nombre de certifications obtenues',
    ],
    correctIndex: 1,
    explanation:
      'Un portfolio senior montre une vision d\'ensemble : pourquoi tel choix architectural, quels compromis entre sécurité et performance, quel impact business (réduction des incidents, conformité). Il démontre le jugement et le leadership technique, pas juste la compétence d\'exécution.',
    difficulty: 'hard',
  },
];
