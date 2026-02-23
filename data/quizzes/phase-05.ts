import { QuizQuestion } from '../types';

export const phase05Questions: QuizQuestion[] = [
  // === ZERO TRUST FOR ML APIs (8 questions) ===
  {
    id: 'p5-q01',
    phaseId: 'phase-05',
    lessonId: 'p5-zero-trust',
    question: 'Quel est le principe fondamental du modèle Zero Trust ?',
    options: [
      'Faire confiance aux utilisateurs internes du réseau',
      'Ne jamais faire confiance, toujours vérifier',
      'Bloquer tout le trafic externe',
      'Utiliser uniquement des VPN pour l\'accès',
    ],
    correctIndex: 1,
    explanation:
      'Le modèle Zero Trust repose sur le principe "Never trust, always verify". Chaque requête est authentifiée et autorisée indépendamment, qu\'elle provienne de l\'intérieur ou de l\'extérieur du réseau.',
    difficulty: 'easy',
  },
  {
    id: 'p5-q02',
    phaseId: 'phase-05',
    lessonId: 'p5-zero-trust',
    question:
      'Quelle méthode d\'authentification est la plus adaptée pour sécuriser une API ML exposée publiquement ?',
    options: [
      'Clé API simple en paramètre d\'URL',
      'Authentification Basic avec mot de passe en clair',
      'OAuth 2.0 avec des tokens JWT à durée de vie courte',
      'Adresse IP whitelist uniquement',
    ],
    correctIndex: 2,
    explanation:
      'OAuth 2.0 avec JWT offre une authentification robuste avec des tokens à durée limitée, réduisant le risque en cas de compromission. Les clés API en URL sont visibles dans les logs et l\'IP whitelisting seul est insuffisant.',
    difficulty: 'easy',
  },
  {
    id: 'p5-q03',
    phaseId: 'phase-05',
    lessonId: 'p5-zero-trust',
    question:
      'Dans une architecture Zero Trust pour une API de ML, que signifie le "least privilege" ?',
    options: [
      'Donner les droits administrateur à tous les développeurs',
      'Accorder uniquement les permissions minimales nécessaires pour chaque rôle',
      'Limiter le nombre d\'utilisateurs de l\'API',
      'Réduire la taille des modèles ML déployés',
    ],
    correctIndex: 1,
    explanation:
      'Le principe du moindre privilège (least privilege) consiste à n\'accorder que les permissions strictement nécessaires. Par exemple, un service de prédiction n\'a pas besoin d\'accéder aux données d\'entraînement.',
    difficulty: 'easy',
  },
  {
    id: 'p5-q04',
    phaseId: 'phase-05',
    lessonId: 'p5-zero-trust',
    question:
      'Quel mécanisme permet de limiter l\'abus d\'une API ML par un utilisateur malveillant ?',
    options: [
      'Le chiffrement TLS',
      'Le rate limiting et le throttling',
      'La compression des réponses',
      'Le caching des prédictions',
    ],
    correctIndex: 1,
    explanation:
      'Le rate limiting restreint le nombre de requêtes par utilisateur dans un intervalle donné. Cela protège contre les attaques par déni de service et l\'extraction massive du modèle (model stealing).',
    difficulty: 'easy',
  },
  {
    id: 'p5-q05',
    phaseId: 'phase-05',
    lessonId: 'p5-zero-trust',
    question:
      'Pourquoi est-il important de valider les entrées (input validation) d\'une API de ML ?',
    options: [
      'Pour améliorer la vitesse de réponse du modèle',
      'Pour empêcher les attaques par injection et les entrées adversariales',
      'Pour réduire la taille du modèle en production',
      'Pour faciliter le monitoring des performances',
    ],
    correctIndex: 1,
    explanation:
      'La validation des entrées protège contre les injections (prompt injection, SQL injection) et les exemples adversariaux conçus pour tromper le modèle. C\'est une couche de défense essentielle.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q06',
    phaseId: 'phase-05',
    lessonId: 'p5-zero-trust',
    question:
      'Dans un contexte Zero Trust, qu\'est-ce que la micro-segmentation appliquée aux services ML ?',
    options: [
      'Diviser le modèle ML en plusieurs petits modèles',
      'Isoler chaque service ML dans son propre segment réseau avec des contrôles d\'accès granulaires',
      'Répartir les données d\'entraînement en micro-batches',
      'Créer des versions miniatures du modèle pour chaque client',
    ],
    correctIndex: 1,
    explanation:
      'La micro-segmentation isole chaque service dans son propre périmètre de sécurité. Ainsi, la compromission d\'un service de prétraitement ne donne pas accès au service d\'inférence ou aux données sensibles.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q07',
    phaseId: 'phase-05',
    lessonId: 'p5-zero-trust',
    question:
      'Quel outil ou protocole est recommandé pour le mutual TLS (mTLS) entre microservices ML ?',
    options: [
      'HTTP Basic Auth',
      'Un service mesh comme Istio avec des certificats mutuels',
      'SSH tunneling entre les pods',
      'Un simple pare-feu réseau',
    ],
    correctIndex: 1,
    explanation:
      'Le mTLS via un service mesh (Istio, Linkerd) assure que chaque communication entre microservices est chiffrée et authentifiée mutuellement. Chaque service prouve son identité avec un certificat.',
    difficulty: 'hard',
  },
  {
    id: 'p5-q08',
    phaseId: 'phase-05',
    lessonId: 'p5-zero-trust',
    question:
      'Quel est le risque principal si les logs d\'une API ML contiennent les données d\'entrée en clair ?',
    options: [
      'Les logs prennent trop d\'espace disque',
      'Fuite de données personnelles et violation du RGPD',
      'Les modèles s\'entraînent sur les logs',
      'Les performances de l\'API diminuent',
    ],
    correctIndex: 1,
    explanation:
      'Si les entrées contiennent des données personnelles (texte médical, données financières), les stocker en clair dans les logs constitue une fuite de données et une violation potentielle du RGPD. Il faut anonymiser ou masquer les données sensibles dans les logs.',
    difficulty: 'medium',
  },

  // === LLM SECURITY - OWASP TOP 10 LLM (12 questions) ===
  {
    id: 'p5-q09',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Selon l\'OWASP Top 10 pour les LLM, qu\'est-ce que l\'injection de prompt (Prompt Injection) ?',
    options: [
      'L\'ajout de données d\'entraînement malveillantes',
      'La manipulation des instructions du LLM via des entrées utilisateur conçues pour contourner les garde-fous',
      'L\'injection SQL dans la base de données du modèle',
      'La modification des poids du modèle en production',
    ],
    correctIndex: 1,
    explanation:
      'L\'injection de prompt consiste à insérer des instructions malveillantes dans l\'entrée utilisateur pour détourner le comportement du LLM. C\'est la vulnérabilité n°1 du Top 10 OWASP LLM car elle peut contourner les consignes système.',
    difficulty: 'easy',
  },
  {
    id: 'p5-q10',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Quelle est la différence entre une injection de prompt directe et indirecte ?',
    options: [
      'Directe utilise du texte, indirecte utilise des images',
      'Directe cible l\'utilisateur, indirecte cible le modèle',
      'Directe est dans l\'entrée utilisateur, indirecte est cachée dans des données externes consommées par le LLM',
      'Directe est plus dangereuse, indirecte est bénigne',
    ],
    correctIndex: 2,
    explanation:
      'L\'injection directe vient de l\'utilisateur lui-même. L\'injection indirecte est plus insidieuse : elle est cachée dans des documents, pages web ou emails que le LLM va traiter, permettant une attaque à distance.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q11',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Qu\'est-ce que le "Training Data Poisoning" dans le contexte des LLM ?',
    options: [
      'La suppression accidentelle des données d\'entraînement',
      'L\'injection de données malveillantes dans le jeu d\'entraînement pour biaiser le comportement du modèle',
      'La compression des données d\'entraînement',
      'L\'utilisation de données trop anciennes pour l\'entraînement',
    ],
    correctIndex: 1,
    explanation:
      'Le Training Data Poisoning consiste à injecter des données corrompues ou biaisées dans le corpus d\'entraînement. Cela peut créer des backdoors dans le modèle ou le rendre vulnérable à certaines entrées spécifiques.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q12',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Quel risque OWASP LLM est lié à la divulgation d\'informations sensibles par le modèle ?',
    options: [
      'Prompt Injection',
      'Insecure Output Handling',
      'Sensitive Information Disclosure',
      'Model Denial of Service',
    ],
    correctIndex: 2,
    explanation:
      'Le Sensitive Information Disclosure survient quand le LLM révèle des données confidentielles présentes dans ses données d\'entraînement (informations personnelles, secrets d\'entreprise, clés API mémorisées).',
    difficulty: 'easy',
  },
  {
    id: 'p5-q13',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Qu\'est-ce que l\'"Insecure Output Handling" dans le Top 10 OWASP LLM ?',
    options: [
      'Ne pas chiffrer les réponses du LLM',
      'Faire confiance aux sorties du LLM sans validation, permettant XSS, SSRF ou exécution de code',
      'Afficher les réponses trop lentement',
      'Ne pas mettre en cache les réponses du modèle',
    ],
    correctIndex: 1,
    explanation:
      'L\'Insecure Output Handling se produit quand les sorties du LLM sont utilisées directement sans sanitisation. Le LLM pourrait générer du code JavaScript malveillant (XSS) ou des URL internes (SSRF) qui seraient exécutés par l\'application.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q14',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Comment se protéger contre le "Model Denial of Service" (DoS) sur un LLM ?',
    options: [
      'Augmenter indéfiniment les ressources GPU',
      'Limiter la taille des entrées, le nombre de tokens et le temps d\'exécution par requête',
      'Désactiver le modèle pendant les heures creuses',
      'Utiliser uniquement des modèles plus petits',
    ],
    correctIndex: 1,
    explanation:
      'Le Model DoS exploite la consommation de ressources des LLM. Les protections incluent : limiter la longueur des prompts, plafonner les tokens de sortie, définir des timeouts, et implémenter du rate limiting par utilisateur.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q15',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Qu\'est-ce que le "Supply Chain Vulnerability" dans le contexte des LLM ?',
    options: [
      'Un problème logistique dans la livraison de matériel',
      'Des vulnérabilités dans les composants tiers : modèles pré-entraînés, plugins, bibliothèques ou données de fine-tuning',
      'Une rupture de stock de GPU',
      'Un problème de version de Python',
    ],
    correctIndex: 1,
    explanation:
      'Les vulnérabilités de la chaîne d\'approvisionnement LLM incluent les modèles pré-entraînés compromis (Hugging Face), les plugins malveillants, les bibliothèques non vérifiées et les datasets empoisonnés. Il faut vérifier l\'intégrité de chaque composant.',
    difficulty: 'hard',
  },
  {
    id: 'p5-q16',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Quel mécanisme permet de prévenir l\'"Excessive Agency" d\'un LLM connecté à des outils ?',
    options: [
      'Donner au LLM un accès complet pour être plus utile',
      'Implémenter des contrôles d\'autorisation stricts et une validation humaine pour les actions critiques',
      'Augmenter la température du modèle',
      'Utiliser un modèle plus grand et plus intelligent',
    ],
    correctIndex: 1,
    explanation:
      'L\'Excessive Agency survient quand un LLM agent a trop de permissions. Il faut limiter les actions disponibles (least privilege), exiger une confirmation humaine pour les opérations destructives, et journaliser toutes les actions.',
    difficulty: 'hard',
  },
  {
    id: 'p5-q17',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Quelle technique permet de détecter une tentative d\'extraction de modèle (Model Theft) via une API ?',
    options: [
      'Utiliser HTTPS',
      'Surveiller les patterns de requêtes systématiques et les volumes anormaux de requêtes similaires',
      'Changer le nom de l\'API',
      'Augmenter le prix de l\'API',
    ],
    correctIndex: 1,
    explanation:
      'L\'extraction de modèle se fait par des requêtes systématiques pour reconstruire le modèle. La détection repose sur l\'analyse des patterns : requêtes trop régulières, exploration systématique de l\'espace d\'entrée, volumes anormaux depuis un même utilisateur.',
    difficulty: 'hard',
  },
  {
    id: 'p5-q18',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Quel est le rôle d\'un "guardrail" dans la sécurité d\'un LLM ?',
    options: [
      'Accélérer le temps de réponse du modèle',
      'Filtrer les entrées et sorties du modèle pour empêcher les contenus dangereux ou non autorisés',
      'Protéger le matériel physique du serveur',
      'Compresser les réponses pour économiser de la bande passante',
    ],
    correctIndex: 1,
    explanation:
      'Les guardrails sont des couches de filtrage qui vérifient les entrées (détection de prompt injection) et les sorties (blocage de contenu inapproprié, données sensibles) du LLM. Ils agissent comme des validateurs avant et après l\'inférence.',
    difficulty: 'easy',
  },
  {
    id: 'p5-q19',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Quelle vulnérabilité OWASP LLM est exploitée quand un attaquant obtient les instructions système (system prompt) du LLM ?',
    options: [
      'Model Denial of Service',
      'Prompt Injection menant à du Sensitive Information Disclosure',
      'Training Data Poisoning',
      'Supply Chain Vulnerability',
    ],
    correctIndex: 1,
    explanation:
      'L\'extraction du system prompt est une combinaison de Prompt Injection (technique utilisée) et de Sensitive Information Disclosure (résultat obtenu). Le system prompt contient souvent des règles métier confidentielles et des garde-fous qui ne devraient pas être exposés.',
    difficulty: 'hard',
  },
  {
    id: 'p5-q20',
    phaseId: 'phase-05',
    lessonId: 'p5-llm-security',
    question:
      'Quelle approche est recommandée pour limiter les hallucinations d\'un LLM en production ?',
    options: [
      'Augmenter la taille du modèle',
      'Utiliser le RAG (Retrieval-Augmented Generation) avec des sources vérifiées',
      'Réduire la longueur maximale des réponses',
      'Entraîner le modèle sur plus de données non vérifiées',
    ],
    correctIndex: 1,
    explanation:
      'Le RAG (Retrieval-Augmented Generation) ancre les réponses du LLM dans des documents vérifiés. En combinant la recherche de sources fiables avec la génération, on réduit significativement les hallucinations et on améliore la fiabilité.',
    difficulty: 'medium',
  },

  // === EU AI ACT (8 questions) ===
  {
    id: 'p5-q21',
    phaseId: 'phase-05',
    lessonId: 'p5-eu-ai-act',
    question:
      'Quel est l\'objectif principal du règlement européen sur l\'IA (EU AI Act) ?',
    options: [
      'Interdire complètement l\'utilisation de l\'IA en Europe',
      'Établir un cadre réglementaire basé sur les risques pour une IA digne de confiance',
      'Promouvoir uniquement les entreprises européennes d\'IA',
      'Remplacer le RGPD pour les données d\'IA',
    ],
    correctIndex: 1,
    explanation:
      'L\'EU AI Act établit un cadre réglementaire proportionné au niveau de risque des systèmes d\'IA. Il vise à garantir la sécurité et les droits fondamentaux tout en favorisant l\'innovation responsable.',
    difficulty: 'easy',
  },
  {
    id: 'p5-q22',
    phaseId: 'phase-05',
    lessonId: 'p5-eu-ai-act',
    question:
      'Combien de niveaux de risque le EU AI Act définit-il pour classifier les systèmes d\'IA ?',
    options: [
      '2 niveaux : autorisé et interdit',
      '3 niveaux : faible, moyen, élevé',
      '4 niveaux : risque inacceptable, élevé, limité et minimal',
      '5 niveaux : critique, très élevé, élevé, moyen, faible',
    ],
    correctIndex: 2,
    explanation:
      'Le EU AI Act définit 4 niveaux : risque inacceptable (interdit), risque élevé (soumis à des exigences strictes), risque limité (obligations de transparence) et risque minimal (libre utilisation).',
    difficulty: 'easy',
  },
  {
    id: 'p5-q23',
    phaseId: 'phase-05',
    lessonId: 'p5-eu-ai-act',
    question:
      'Lequel de ces systèmes d\'IA est classé comme "risque inacceptable" et interdit par le EU AI Act ?',
    options: [
      'Un chatbot de service client',
      'Un système de scoring social généralisé par un gouvernement',
      'Un système de recommandation de films',
      'Un outil de traduction automatique',
    ],
    correctIndex: 1,
    explanation:
      'Le scoring social généralisé, la manipulation subliminale, l\'exploitation de vulnérabilités et la surveillance biométrique de masse en temps réel sont classés comme risque inacceptable et interdits par le EU AI Act.',
    difficulty: 'easy',
  },
  {
    id: 'p5-q24',
    phaseId: 'phase-05',
    lessonId: 'p5-eu-ai-act',
    question:
      'Quelle obligation s\'applique aux systèmes d\'IA à "risque élevé" selon le EU AI Act ?',
    options: [
      'Aucune obligation spécifique',
      'Simplement informer que c\'est de l\'IA',
      'Évaluation de conformité, documentation technique, gestion des risques et supervision humaine',
      'Uniquement obtenir le consentement des utilisateurs',
    ],
    correctIndex: 2,
    explanation:
      'Les systèmes à risque élevé doivent satisfaire des exigences strictes : système de gestion des risques, gouvernance des données, documentation technique, journalisation, transparence, supervision humaine et robustesse technique.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q25',
    phaseId: 'phase-05',
    lessonId: 'p5-eu-ai-act',
    question:
      'Comment le EU AI Act traite-t-il les modèles de fondation (foundation models) comme GPT-4 ?',
    options: [
      'Ils sont tous interdits en Europe',
      'Ils n\'ont aucune obligation spécifique',
      'Ils sont soumis à des obligations de transparence, y compris la documentation et le signalement de contenu généré',
      'Ils doivent être open-source obligatoirement',
    ],
    correctIndex: 2,
    explanation:
      'Les modèles d\'IA à usage général (GPAI) doivent fournir une documentation technique, respecter le droit d\'auteur, et publier un résumé des données d\'entraînement. Les modèles à risque systémique ont des obligations supplémentaires.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q26',
    phaseId: 'phase-05',
    lessonId: 'p5-eu-ai-act',
    question:
      'Quel montant maximal d\'amende le EU AI Act prévoit-il pour les infractions les plus graves ?',
    options: [
      '1 million d\'euros',
      '10 millions d\'euros ou 2% du CA mondial',
      '35 millions d\'euros ou 7% du chiffre d\'affaires annuel mondial',
      '100 millions d\'euros',
    ],
    correctIndex: 2,
    explanation:
      'Pour les violations les plus graves (utilisation de systèmes interdits), l\'amende peut atteindre 35 millions d\'euros ou 7% du chiffre d\'affaires annuel mondial, le montant le plus élevé étant retenu.',
    difficulty: 'hard',
  },
  {
    id: 'p5-q27',
    phaseId: 'phase-05',
    lessonId: 'p5-eu-ai-act',
    question:
      'Quel domaine est considéré comme "risque élevé" par le EU AI Act ?',
    options: [
      'Les filtres anti-spam des emails',
      'Les systèmes de recrutement automatisé et de scoring de crédit',
      'Les assistants vocaux grand public',
      'Les jeux vidéo utilisant de l\'IA',
    ],
    correctIndex: 1,
    explanation:
      'Le recrutement, le scoring de crédit, l\'éducation, la justice, les infrastructures critiques et la migration sont classés à risque élevé car ils impactent directement les droits fondamentaux des personnes.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q28',
    phaseId: 'phase-05',
    lessonId: 'p5-eu-ai-act',
    question:
      'Quelle obligation de transparence s\'applique aux systèmes d\'IA à risque limité selon le EU AI Act ?',
    options: [
      'Publier le code source du modèle',
      'Informer les utilisateurs qu\'ils interagissent avec un système d\'IA',
      'Obtenir une certification ISO',
      'Payer une taxe IA annuelle',
    ],
    correctIndex: 1,
    explanation:
      'Les systèmes à risque limité (chatbots, deepfakes, systèmes de reconnaissance émotionnelle) doivent informer les utilisateurs qu\'ils interagissent avec de l\'IA ou que le contenu est généré par l\'IA.',
    difficulty: 'medium',
  },

  // === THREAT MODELING (6 questions) ===
  {
    id: 'p5-q29',
    phaseId: 'phase-05',
    lessonId: 'p5-threat-modeling',
    question:
      'Qu\'est-ce que le modèle STRIDE utilisé en threat modeling ?',
    options: [
      'Un framework de développement agile',
      'Une méthodologie de classification des menaces : Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege',
      'Un outil de test de performance',
      'Un standard de chiffrement',
    ],
    correctIndex: 1,
    explanation:
      'STRIDE est un acronyme créé par Microsoft pour classifier les menaces : Spoofing (usurpation), Tampering (falsification), Repudiation (répudiation), Information Disclosure (divulgation), Denial of Service (déni de service), Elevation of Privilege (élévation de privilèges).',
    difficulty: 'medium',
  },
  {
    id: 'p5-q30',
    phaseId: 'phase-05',
    lessonId: 'p5-threat-modeling',
    question:
      'Lors du threat modeling d\'un pipeline ML, quelle menace spécifique vise les données d\'entraînement ?',
    options: [
      'Le phishing des développeurs',
      'Le data poisoning : injection de données malveillantes pour biaiser le modèle',
      'L\'attaque DDoS sur le serveur web',
      'Le vol de mot de passe administrateur',
    ],
    correctIndex: 1,
    explanation:
      'Le data poisoning est une menace spécifique au ML qui cible l\'intégrité des données d\'entraînement. Un attaquant peut injecter des exemples malveillants pour créer des backdoors ou dégrader les performances du modèle.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q31',
    phaseId: 'phase-05',
    lessonId: 'p5-threat-modeling',
    question:
      'Quel outil ou diagramme est fondamental pour commencer un exercice de threat modeling ?',
    options: [
      'Un diagramme de Gantt',
      'Un Data Flow Diagram (DFD) montrant les flux de données, les processus et les trust boundaries',
      'Un organigramme de l\'entreprise',
      'Un diagramme de classes UML',
    ],
    correctIndex: 1,
    explanation:
      'Le Data Flow Diagram (DFD) est la base du threat modeling. Il visualise comment les données circulent entre les composants, traverse les frontières de confiance (trust boundaries) et permet d\'identifier les surfaces d\'attaque.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q32',
    phaseId: 'phase-05',
    lessonId: 'p5-threat-modeling',
    question:
      'Qu\'est-ce qu\'une "attack tree" dans le contexte du threat modeling ?',
    options: [
      'Un arbre binaire de décision pour le routage réseau',
      'Une représentation hiérarchique des chemins d\'attaque possibles pour atteindre un objectif malveillant',
      'Une structure de données pour stocker les logs d\'attaques',
      'Un algorithme de détection d\'intrusion',
    ],
    correctIndex: 1,
    explanation:
      'Un attack tree décompose un objectif d\'attaque en sous-objectifs et méthodes alternatives. La racine représente l\'objectif principal (ex: voler le modèle ML) et les branches les différentes voies pour y parvenir.',
    difficulty: 'hard',
  },
  {
    id: 'p5-q33',
    phaseId: 'phase-05',
    lessonId: 'p5-threat-modeling',
    question:
      'Dans le threat modeling d\'une API d\'inférence ML, quel risque est lié aux attaques adversariales ?',
    options: [
      'Le serveur tombe en panne',
      'Des perturbations imperceptibles des entrées provoquent des prédictions erronées',
      'Les utilisateurs quittent la plateforme',
      'Les coûts d\'infrastructure augmentent',
    ],
    correctIndex: 1,
    explanation:
      'Les attaques adversariales ajoutent des perturbations quasi-invisibles aux entrées (images, texte) qui trompent le modèle ML. Par exemple, modifier quelques pixels d\'une image peut changer complètement la classification.',
    difficulty: 'hard',
  },
  {
    id: 'p5-q34',
    phaseId: 'phase-05',
    lessonId: 'p5-threat-modeling',
    question:
      'Quelle méthodologie de threat modeling est spécifiquement adaptée aux systèmes ML ?',
    options: [
      'STRIDE seul suffit',
      'Le framework ATLAS (Adversarial Threat Landscape for AI Systems) de MITRE',
      'Le modèle OSI',
      'La méthode Merise',
    ],
    correctIndex: 1,
    explanation:
      'MITRE ATLAS est une matrice de connaissances des tactiques et techniques adversariales spécifiques à l\'IA/ML. Elle complète STRIDE en ajoutant des menaces propres au ML comme le model evasion, le data poisoning et le model stealing.',
    difficulty: 'hard',
  },

  // === FALLBACK PATTERNS & RESILIENCE (6 questions) ===
  {
    id: 'p5-q35',
    phaseId: 'phase-05',
    lessonId: 'p5-resilience',
    question:
      'Qu\'est-ce que le pattern Circuit Breaker dans le contexte des services ML ?',
    options: [
      'Un dispositif matériel de protection électrique',
      'Un pattern qui détecte les défaillances répétées et court-circuite les appels au service défaillant pour éviter la cascade d\'erreurs',
      'Un algorithme qui arrête l\'entraînement du modèle',
      'Un système de backup des données',
    ],
    correctIndex: 1,
    explanation:
      'Le Circuit Breaker surveille les appels à un service ML. Après un seuil d\'échecs, il "s\'ouvre" et renvoie immédiatement une réponse de fallback sans appeler le service défaillant, protégeant ainsi l\'ensemble du système.',
    difficulty: 'easy',
  },
  {
    id: 'p5-q36',
    phaseId: 'phase-05',
    lessonId: 'p5-resilience',
    question:
      'Quel pattern de résilience consiste à réessayer automatiquement une requête échouée vers un service ML ?',
    options: [
      'Circuit Breaker',
      'Retry avec backoff exponentiel',
      'Bulkhead',
      'Saga pattern',
    ],
    correctIndex: 1,
    explanation:
      'Le Retry avec backoff exponentiel réessaie la requête en augmentant progressivement le délai entre les tentatives (1s, 2s, 4s, 8s...). Cela évite de surcharger un service temporairement indisponible.',
    difficulty: 'easy',
  },
  {
    id: 'p5-q37',
    phaseId: 'phase-05',
    lessonId: 'p5-resilience',
    question:
      'Qu\'est-ce que le pattern Bulkhead appliqué aux microservices ML ?',
    options: [
      'Utiliser un seul serveur pour tous les services',
      'Isoler les services dans des pools de ressources séparés pour contenir les défaillances',
      'Dupliquer tous les modèles ML sur chaque serveur',
      'Augmenter la RAM de tous les serveurs',
    ],
    correctIndex: 1,
    explanation:
      'Le pattern Bulkhead (cloisons étanches) isole les services dans des pools de threads ou de connexions séparés. Si le service NLP est surchargé, le service de vision par ordinateur continue de fonctionner normalement.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q38',
    phaseId: 'phase-05',
    lessonId: 'p5-resilience',
    question:
      'Quel est le rôle d\'un modèle "fallback" ou "shadow" dans une architecture ML résiliente ?',
    options: [
      'Remplacer le modèle principal par un modèle plus simple mais fiable quand le principal est indisponible',
      'Entraîner un nouveau modèle en arrière-plan',
      'Stocker une copie de sauvegarde des données',
      'Monitorer les performances du modèle principal',
    ],
    correctIndex: 0,
    explanation:
      'Un modèle fallback (souvent plus petit et basé sur des règles) prend le relais quand le modèle principal est défaillant. Par exemple, un simple modèle basé sur des mots-clés peut remplacer un LLM en cas de panne du service d\'inférence GPU.',
    difficulty: 'medium',
  },
  {
    id: 'p5-q39',
    phaseId: 'phase-05',
    lessonId: 'p5-resilience',
    question:
      'Qu\'est-ce que le "graceful degradation" dans un système ML en production ?',
    options: [
      'Le modèle devient progressivement moins précis avec le temps',
      'Le système continue à fonctionner avec des capacités réduites plutôt que de tomber complètement',
      'La dégradation de la qualité des données d\'entraînement',
      'La perte progressive des poids du modèle',
    ],
    correctIndex: 1,
    explanation:
      'La dégradation gracieuse signifie qu\'en cas de problème, le système offre un service réduit mais fonctionnel : réponses en cache, modèle simplifié, fonctionnalités de base. L\'utilisateur est impacté mais pas bloqué.',
    difficulty: 'easy',
  },
  {
    id: 'p5-q40',
    phaseId: 'phase-05',
    lessonId: 'p5-resilience',
    question:
      'Quel outil est couramment utilisé pour implémenter le chaos engineering sur des services ML en Kubernetes ?',
    options: [
      'Jenkins',
      'Litmus Chaos ou Chaos Monkey',
      'Grafana',
      'Terraform',
    ],
    correctIndex: 1,
    explanation:
      'Litmus Chaos (pour Kubernetes) et Chaos Monkey (Netflix) injectent des pannes contrôlées (kill de pods, latence réseau, erreurs) pour tester la résilience des services ML. Cela permet de valider les patterns de fallback avant une vraie panne.',
    difficulty: 'hard',
  },
];
