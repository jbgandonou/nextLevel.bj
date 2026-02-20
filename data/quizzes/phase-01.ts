import { QuizQuestion } from '../types';
import { phase01ExtraA } from './phase-01-extra-a';
import { phase01ExtraB } from './phase-01-extra-b';
import { phase01ExtraC } from './phase-01-extra-c';

const phase01Base: QuizQuestion[] = [
  // ==================== EASY (15 questions: p1-q01 to p1-q15) ====================
  {
    id: 'p1-q01',
    phaseId: 'phase-01',
    question: 'Quel type de chiffrement utilise la même clé pour chiffrer et déchiffrer les données ?',
    options: [
      'Chiffrement asymétrique',
      'Chiffrement symétrique',
      'Hachage',
      'Signature numérique',
    ],
    correctIndex: 1,
    explanation:
      'Le chiffrement symétrique utilise une seule et même clé pour le chiffrement et le déchiffrement. Des algorithmes comme AES et DES en sont des exemples. Le chiffrement asymétrique, en revanche, utilise une paire de clés (publique et privée).',
    difficulty: 'easy',
  },
  {
    id: 'p1-q02',
    phaseId: 'phase-01',
    question: 'Quel protocole est utilisé pour sécuriser les communications web via HTTPS ?',
    options: ['FTP', 'TLS/SSL', 'SNMP', 'Telnet'],
    correctIndex: 1,
    explanation:
      'TLS (Transport Layer Security), successeur de SSL, est le protocole utilisé pour sécuriser les communications HTTPS. Il assure le chiffrement, l\'intégrité et l\'authentification des échanges entre le navigateur et le serveur.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q03',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce qu\'un pare-feu (firewall) ?',
    options: [
      'Un logiciel antivirus',
      'Un dispositif qui filtre le trafic réseau selon des règles définies',
      'Un serveur de messagerie',
      'Un outil de sauvegarde de données',
    ],
    correctIndex: 1,
    explanation:
      'Un pare-feu est un dispositif (matériel ou logiciel) qui surveille et filtre le trafic réseau entrant et sortant selon des règles de sécurité prédéfinies. Il constitue la première ligne de défense dans la sécurité réseau.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q04',
    phaseId: 'phase-01',
    question: 'Que signifie l\'acronyme CIA en sécurité informatique ?',
    options: [
      'Computer Intelligence Agency',
      'Confidentialité, Intégrité, Disponibilité',
      'Cryptage, Identification, Authentification',
      'Control, Inspect, Audit',
    ],
    correctIndex: 1,
    explanation:
      'La triade CIA (Confidentiality, Integrity, Availability) représente les trois piliers fondamentaux de la sécurité de l\'information : la Confidentialité protège contre les accès non autorisés, l\'Intégrité garantit que les données ne sont pas altérées, et la Disponibilité assure l\'accès aux ressources quand nécessaire.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q05',
    phaseId: 'phase-01',
    question: 'Quel type d\'attaque consiste à envoyer des emails frauduleux pour voler des informations ?',
    options: ['DDoS', 'Phishing', 'Brute force', 'SQL injection'],
    correctIndex: 1,
    explanation:
      'Le phishing est une technique d\'ingénierie sociale où l\'attaquant envoie des emails ou messages frauduleux se faisant passer pour une entité légitime afin de tromper la victime et lui soutirer des informations sensibles (mots de passe, données bancaires, etc.).',
    difficulty: 'easy',
  },
  {
    id: 'p1-q06',
    phaseId: 'phase-01',
    question: 'Quelle est la fonction principale d\'un système IDS (Intrusion Detection System) ?',
    options: [
      'Bloquer automatiquement les attaques',
      'Détecter et alerter sur les activités suspectes',
      'Chiffrer les communications réseau',
      'Gérer les identités des utilisateurs',
    ],
    correctIndex: 1,
    explanation:
      'Un IDS surveille le trafic réseau ou les activités système pour détecter des comportements suspects ou des violations de politique de sécurité, puis génère des alertes. Contrairement à un IPS (Intrusion Prevention System), un IDS ne bloque pas automatiquement les menaces.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q07',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce que l\'authentification multi-facteurs (MFA) ?',
    options: [
      'Utiliser plusieurs mots de passe différents',
      'Combiner au moins deux facteurs d\'authentification distincts',
      'Se connecter depuis plusieurs appareils',
      'Chiffrer les données avec plusieurs algorithmes',
    ],
    correctIndex: 1,
    explanation:
      'L\'authentification multi-facteurs combine au moins deux facteurs parmi : quelque chose que vous savez (mot de passe), quelque chose que vous possédez (token, téléphone) et quelque chose que vous êtes (biométrie). Cela renforce considérablement la sécurité par rapport à un simple mot de passe.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q08',
    phaseId: 'phase-01',
    question: 'Quel port est utilisé par défaut par le protocole HTTPS ?',
    options: ['80', '22', '443', '8080'],
    correctIndex: 2,
    explanation:
      'Le port 443 est le port standard pour HTTPS. Le port 80 est utilisé pour HTTP non chiffré, le port 22 pour SSH, et le port 8080 est souvent utilisé comme port HTTP alternatif pour les serveurs proxy ou de développement.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q09',
    phaseId: 'phase-01',
    question: 'Quel type de malware se réplique automatiquement sans intervention de l\'utilisateur ?',
    options: ['Virus', 'Ver (Worm)', 'Cheval de Troie', 'Spyware'],
    correctIndex: 1,
    explanation:
      'Un ver (worm) est un type de malware capable de se propager automatiquement à travers les réseaux sans nécessiter d\'action de l\'utilisateur ni de programme hôte. Contrairement au virus, il n\'a pas besoin de s\'attacher à un fichier existant pour se répliquer.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q10',
    phaseId: 'phase-01',
    question: 'Quelle est la différence principale entre le hachage et le chiffrement ?',
    options: [
      'Le hachage est plus rapide que le chiffrement',
      'Le hachage est une fonction à sens unique, le chiffrement est réversible',
      'Le chiffrement produit une sortie de taille fixe',
      'Il n\'y a aucune différence',
    ],
    correctIndex: 1,
    explanation:
      'Le hachage est une fonction à sens unique : on ne peut pas retrouver les données originales à partir du hash. Le chiffrement est réversible : avec la bonne clé, on peut déchiffrer les données. Le hachage produit une empreinte de taille fixe et est utilisé pour vérifier l\'intégrité des données.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q11',
    phaseId: 'phase-01',
    question: 'Quel est le rôle d\'un VPN (Virtual Private Network) ?',
    options: [
      'Accélérer la connexion Internet',
      'Créer un tunnel chiffré pour sécuriser les communications sur un réseau public',
      'Bloquer les publicités en ligne',
      'Remplacer un antivirus',
    ],
    correctIndex: 1,
    explanation:
      'Un VPN crée un tunnel chiffré entre l\'appareil de l\'utilisateur et un serveur distant, protégeant ainsi les données transmises sur des réseaux publics ou non sécurisés. Il permet aussi de masquer l\'adresse IP de l\'utilisateur et d\'accéder à des ressources réseau distantes de manière sécurisée.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q12',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce que le principe du moindre privilège ?',
    options: [
      'Donner à tous les utilisateurs les mêmes droits',
      'Accorder uniquement les permissions minimales nécessaires pour accomplir une tâche',
      'Supprimer tous les comptes administrateurs',
      'Utiliser uniquement des logiciels open source',
    ],
    correctIndex: 1,
    explanation:
      'Le principe du moindre privilège (Least Privilege) stipule qu\'un utilisateur ou un processus ne doit disposer que des droits strictement nécessaires à l\'exécution de ses tâches. Cela limite la surface d\'attaque et réduit les dommages potentiels en cas de compromission d\'un compte.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q13',
    phaseId: 'phase-01',
    question: 'Quel algorithme de hachage est considéré comme obsolète et non sécurisé ?',
    options: ['SHA-256', 'SHA-3', 'MD5', 'bcrypt'],
    correctIndex: 2,
    explanation:
      'MD5 est considéré comme obsolète car il est vulnérable aux collisions (deux entrées différentes produisant le même hash). Il ne doit plus être utilisé pour des applications de sécurité. SHA-256, SHA-3 et bcrypt sont des alternatives plus sûres.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q14',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce qu\'une attaque par déni de service (DoS) ?',
    options: [
      'Voler des données confidentielles',
      'Rendre un service indisponible en le surchargeant de requêtes',
      'Intercepter des communications chiffrées',
      'Installer un logiciel espion',
    ],
    correctIndex: 1,
    explanation:
      'Une attaque DoS (Denial of Service) vise à rendre un service, un serveur ou un réseau indisponible en le submergeant de trafic ou de requêtes. Sa variante DDoS (Distributed DoS) utilise plusieurs machines sources, rendant l\'attaque plus difficile à contrer.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q15',
    phaseId: 'phase-01',
    question: 'Quel est le rôle principal d\'une PKI (Infrastructure à Clés Publiques) ?',
    options: [
      'Filtrer le trafic réseau',
      'Gérer les certificats numériques et les clés de chiffrement',
      'Détecter les intrusions',
      'Sauvegarder les données',
    ],
    correctIndex: 1,
    explanation:
      'Une PKI (Public Key Infrastructure) est un ensemble de rôles, politiques, matériels, logiciels et procédures nécessaires pour créer, gérer, distribuer, utiliser, stocker et révoquer des certificats numériques. Elle permet de vérifier l\'identité des parties dans les communications électroniques.',
    difficulty: 'easy',
  },

  // ==================== MEDIUM (20 questions: p1-q16 to p1-q35) ====================
  {
    id: 'p1-q16',
    phaseId: 'phase-01',
    question: 'Quelle est la différence entre un IDS et un IPS ?',
    options: [
      'L\'IDS est matériel, l\'IPS est logiciel',
      'L\'IDS détecte les menaces et alerte, l\'IPS détecte et bloque automatiquement',
      'L\'IPS est plus ancien que l\'IDS',
      'Il n\'y a aucune différence fonctionnelle',
    ],
    correctIndex: 1,
    explanation:
      'Un IDS (Intrusion Detection System) surveille passivement le réseau et génère des alertes lorsqu\'il détecte une activité suspecte. Un IPS (Intrusion Prevention System) va plus loin en bloquant automatiquement le trafic malveillant identifié, agissant en ligne avec le flux de données.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q17',
    phaseId: 'phase-01',
    question: 'Dans le protocole TLS, quel est le rôle du "handshake" initial ?',
    options: [
      'Transférer les données utilisateur',
      'Négocier les algorithmes de chiffrement et échanger les clés de session',
      'Vérifier l\'intégrité des données transmises',
      'Compresser les données avant envoi',
    ],
    correctIndex: 1,
    explanation:
      'Le handshake TLS est la phase initiale où le client et le serveur négocient la version du protocole, choisissent les suites cryptographiques, s\'authentifient mutuellement (optionnel pour le client) et établissent une clé de session symétrique pour chiffrer la communication qui suivra.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q18',
    phaseId: 'phase-01',
    question: 'Quel type d\'attaque exploite les vulnérabilités des entrées utilisateur dans les applications web pour exécuter du code SQL malveillant ?',
    options: [
      'Cross-Site Scripting (XSS)',
      'Injection SQL',
      'Buffer Overflow',
      'Man-in-the-Middle',
    ],
    correctIndex: 1,
    explanation:
      'L\'injection SQL exploite les entrées utilisateur non validées pour injecter du code SQL malveillant dans les requêtes de base de données. L\'attaquant peut ainsi lire, modifier ou supprimer des données. La prévention passe par l\'utilisation de requêtes paramétrées et la validation des entrées.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q19',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce que le protocole RADIUS est principalement utilisé pour ?',
    options: [
      'Le chiffrement des emails',
      'L\'authentification, l\'autorisation et la comptabilité (AAA) des accès réseau',
      'La résolution de noms de domaine',
      'Le transfert de fichiers sécurisé',
    ],
    correctIndex: 1,
    explanation:
      'RADIUS (Remote Authentication Dial-In User Service) est un protocole réseau qui fournit des services AAA (Authentication, Authorization, Accounting) centralisés. Il est largement utilisé pour contrôler l\'accès aux réseaux Wi-Fi d\'entreprise, aux VPN et aux équipements réseau.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q20',
    phaseId: 'phase-01',
    question: 'Quelle méthode de contrôle d\'accès se base sur des étiquettes de sécurité attribuées aux sujets et aux objets ?',
    options: [
      'Contrôle d\'accès discrétionnaire (DAC)',
      'Contrôle d\'accès obligatoire (MAC)',
      'Contrôle d\'accès basé sur les rôles (RBAC)',
      'Contrôle d\'accès basé sur les attributs (ABAC)',
    ],
    correctIndex: 1,
    explanation:
      'Le contrôle d\'accès obligatoire (MAC - Mandatory Access Control) utilise des étiquettes de sécurité (niveaux de classification) attribuées aux sujets (utilisateurs) et aux objets (fichiers). L\'accès est déterminé par une politique centralisée que les utilisateurs ne peuvent pas modifier, contrairement au DAC.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q21',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce qu\'une attaque de type "Man-in-the-Middle" (MITM) ?',
    options: [
      'Une attaque qui surcharge un serveur de requêtes',
      'Une attaque où l\'attaquant intercepte et potentiellement modifie les communications entre deux parties',
      'Une attaque qui exploite les failles des mots de passe',
      'Une attaque qui cible les réseaux sans fil exclusivement',
    ],
    correctIndex: 1,
    explanation:
      'Dans une attaque MITM, l\'attaquant se positionne secrètement entre deux parties communicantes, interceptant et pouvant modifier les messages échangés. Les victimes croient communiquer directement entre elles. L\'utilisation de TLS et de certificats valides aide à prévenir ce type d\'attaque.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q22',
    phaseId: 'phase-01',
    question: 'Quel est le but principal d\'un test de pénétration (pentest) ?',
    options: [
      'Installer des mises à jour de sécurité',
      'Identifier les vulnérabilités en simulant des attaques réelles',
      'Former les utilisateurs à la sécurité',
      'Surveiller le trafic réseau en temps réel',
    ],
    correctIndex: 1,
    explanation:
      'Un test de pénétration est une évaluation de sécurité autorisée qui simule des attaques réelles pour identifier les vulnérabilités exploitables dans les systèmes, réseaux ou applications. Il fournit des preuves concrètes des failles et des recommandations pour y remédier.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q23',
    phaseId: 'phase-01',
    question: 'Quelle technique permet de stocker les mots de passe de manière sécurisée dans une base de données ?',
    options: [
      'Chiffrement réversible avec AES',
      'Hachage avec sel (salt) en utilisant bcrypt ou Argon2',
      'Encodage en Base64',
      'Stockage en texte clair dans un fichier protégé',
    ],
    correctIndex: 1,
    explanation:
      'Le hachage avec sel (salt) utilisant des algorithmes comme bcrypt ou Argon2 est la meilleure pratique. Le sel est une valeur aléatoire ajoutée au mot de passe avant le hachage, empêchant les attaques par tables arc-en-ciel. Ces algorithmes sont aussi volontairement lents, rendant les attaques par force brute très coûteuses.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q24',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce que le protocole SAML est utilisé pour ?',
    options: [
      'Le chiffrement de fichiers',
      'L\'échange de données d\'authentification et d\'autorisation entre domaines (SSO)',
      'La détection d\'intrusions réseau',
      'La gestion des certificats SSL',
    ],
    correctIndex: 1,
    explanation:
      'SAML (Security Assertion Markup Language) est un standard XML permettant l\'échange de données d\'authentification et d\'autorisation entre un fournisseur d\'identité et un fournisseur de services. Il est principalement utilisé pour implémenter le Single Sign-On (SSO) entre différentes applications.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q25',
    phaseId: 'phase-01',
    question: 'Quel type de scan réseau identifie les ports ouverts sur une machine cible ?',
    options: [
      'Scan de vulnérabilités',
      'Scan de ports',
      'Scan antivirus',
      'Scan de conformité',
    ],
    correctIndex: 1,
    explanation:
      'Un scan de ports (par exemple avec Nmap) envoie des paquets vers différents ports d\'une machine cible pour déterminer lesquels sont ouverts, fermés ou filtrés. C\'est une étape fondamentale de la reconnaissance dans un test de sécurité, permettant d\'identifier les services exposés.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q26',
    phaseId: 'phase-01',
    question: 'Quel concept de sécurité stipule qu\'aucun utilisateur ou système ne doit être automatiquement considéré comme fiable ?',
    options: [
      'Défense en profondeur',
      'Zero Trust',
      'Sécurité par l\'obscurité',
      'Principe de séparation des devoirs',
    ],
    correctIndex: 1,
    explanation:
      'Le modèle Zero Trust repose sur le principe "ne jamais faire confiance, toujours vérifier". Chaque demande d\'accès est authentifiée et autorisée, qu\'elle provienne de l\'intérieur ou de l\'extérieur du réseau. Ce modèle élimine la notion de périmètre de confiance traditionnel.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q27',
    phaseId: 'phase-01',
    question: 'Quelle est la première étape d\'un plan de réponse aux incidents ?',
    options: [
      'Éradication de la menace',
      'Préparation',
      'Confinement',
      'Récupération',
    ],
    correctIndex: 1,
    explanation:
      'La préparation est la première et la plus importante étape d\'un plan de réponse aux incidents. Elle inclut la création de politiques, la formation de l\'équipe de réponse, la mise en place d\'outils de détection et la documentation des procédures. Les étapes suivantes sont : identification, confinement, éradication, récupération, et leçons apprises.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q28',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce qu\'un certificat numérique X.509 contient principalement ?',
    options: [
      'La clé privée du propriétaire et son mot de passe',
      'La clé publique du propriétaire, son identité et la signature de l\'autorité de certification',
      'Uniquement l\'adresse IP du serveur',
      'Les logs de connexion de l\'utilisateur',
    ],
    correctIndex: 1,
    explanation:
      'Un certificat X.509 contient la clé publique du propriétaire, les informations d\'identité (sujet), le nom de l\'autorité de certification (CA), la période de validité, le numéro de série, et la signature numérique de la CA. La clé privée n\'est jamais incluse dans le certificat.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q29',
    phaseId: 'phase-01',
    question: 'Quel type d\'analyse de risque attribue des valeurs monétaires aux actifs et aux pertes potentielles ?',
    options: [
      'Analyse qualitative',
      'Analyse quantitative',
      'Analyse heuristique',
      'Analyse comportementale',
    ],
    correctIndex: 1,
    explanation:
      'L\'analyse quantitative des risques utilise des valeurs numériques et monétaires pour évaluer les risques. Elle calcule des métriques comme la SLE (Single Loss Expectancy), l\'ARO (Annualized Rate of Occurrence) et l\'ALE (Annualized Loss Expectancy). L\'analyse qualitative, en revanche, utilise des catégories descriptives (faible, moyen, élevé).',
    difficulty: 'medium',
  },
  {
    id: 'p1-q30',
    phaseId: 'phase-01',
    question: 'Quel protocole est utilisé pour l\'authentification sécurisée dans les environnements Windows Active Directory ?',
    options: ['NTLM v1', 'Kerberos', 'PAP', 'CHAP'],
    correctIndex: 1,
    explanation:
      'Kerberos est le protocole d\'authentification par défaut dans les environnements Active Directory depuis Windows 2000. Il utilise un système de tickets délivrés par un KDC (Key Distribution Center) pour authentifier les utilisateurs et les services, évitant ainsi la transmission de mots de passe sur le réseau.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q31',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce que le "sandboxing" en sécurité informatique ?',
    options: [
      'Chiffrer les données au repos',
      'Exécuter un programme dans un environnement isolé pour observer son comportement',
      'Scanner un réseau à la recherche de vulnérabilités',
      'Créer des copies de sauvegarde chiffrées',
    ],
    correctIndex: 1,
    explanation:
      'Le sandboxing consiste à exécuter un programme ou un fichier suspect dans un environnement isolé et contrôlé (la sandbox) pour observer son comportement sans risquer de compromettre le système réel. C\'est une technique essentielle pour l\'analyse de malwares et la détection de menaces inconnues.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q32',
    phaseId: 'phase-01',
    question: 'Quelle norme ISO est spécifiquement dédiée au management de la sécurité de l\'information ?',
    options: ['ISO 9001', 'ISO 27001', 'ISO 14001', 'ISO 22301'],
    correctIndex: 1,
    explanation:
      'ISO 27001 est la norme internationale de référence pour les systèmes de management de la sécurité de l\'information (SMSI). Elle définit les exigences pour établir, mettre en œuvre, maintenir et améliorer continuellement un SMSI. ISO 9001 concerne la qualité, ISO 14001 l\'environnement, et ISO 22301 la continuité d\'activité.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q33',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce que l\'ALE (Annualized Loss Expectancy) en gestion des risques ?',
    options: [
      'Le coût total de remplacement d\'un actif',
      'La perte annuelle attendue, calculée par SLE × ARO',
      'Le nombre d\'incidents de sécurité par an',
      'Le budget annuel alloué à la sécurité',
    ],
    correctIndex: 1,
    explanation:
      'L\'ALE (Annualized Loss Expectancy) représente la perte financière annuelle attendue pour un actif face à une menace spécifique. Elle se calcule en multipliant la SLE (Single Loss Expectancy - perte par incident) par l\'ARO (Annualized Rate of Occurrence - fréquence annuelle estimée de l\'incident).',
    difficulty: 'medium',
  },
  {
    id: 'p1-q34',
    phaseId: 'phase-01',
    question: 'Quel type de contrôle de sécurité vise à décourager les attaquants potentiels ?',
    options: [
      'Contrôle préventif',
      'Contrôle dissuasif',
      'Contrôle détectif',
      'Contrôle correctif',
    ],
    correctIndex: 1,
    explanation:
      'Un contrôle dissuasif (deterrent) vise à décourager les attaquants potentiels avant qu\'ils n\'agissent, par exemple via des caméras de surveillance visibles, des avertissements légaux ou des bannières d\'avertissement. Le contrôle préventif empêche l\'attaque, le détectif la découvre, et le correctif répare les dommages.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q35',
    phaseId: 'phase-01',
    question: 'Quel protocole est utilisé pour la gestion sécurisée des équipements réseau à distance, en remplacement de Telnet ?',
    options: ['FTP', 'SSH', 'HTTP', 'SMTP'],
    correctIndex: 1,
    explanation:
      'SSH (Secure Shell) est le protocole standard pour l\'administration distante sécurisée des équipements réseau et serveurs. Contrairement à Telnet qui transmet les données (y compris les mots de passe) en clair, SSH chiffre toute la communication, assurant confidentialité et intégrité.',
    difficulty: 'medium',
  },

  // ==================== HARD (15 questions: p1-q36 to p1-q50) ====================
  {
    id: 'p1-q36',
    phaseId: 'phase-01',
    question: 'Dans le cadre d\'un échange Diffie-Hellman, quel problème mathématique garantit la sécurité du protocole ?',
    options: [
      'La factorisation de grands nombres premiers',
      'Le problème du logarithme discret',
      'Le problème du sac à dos',
      'La factorisation de polynômes',
    ],
    correctIndex: 1,
    explanation:
      'La sécurité de l\'échange de clés Diffie-Hellman repose sur la difficulté du problème du logarithme discret. Bien qu\'il soit facile de calculer g^a mod p, il est computationnellement très difficile de retrouver a connaissant g, p et g^a mod p, surtout avec de grands nombres.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q37',
    phaseId: 'phase-01',
    question: 'Quelle attaque cible spécifiquement le processus de résolution DNS pour rediriger le trafic vers un serveur malveillant ?',
    options: [
      'ARP Spoofing',
      'DNS Cache Poisoning',
      'SYN Flooding',
      'Session Hijacking',
    ],
    correctIndex: 1,
    explanation:
      'Le DNS Cache Poisoning (empoisonnement du cache DNS) consiste à injecter de fausses entrées dans le cache d\'un serveur DNS résolveur. Cela redirige les utilisateurs vers des serveurs malveillants même s\'ils saisissent la bonne URL. DNSSEC a été développé pour contrer cette attaque en signant cryptographiquement les enregistrements DNS.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q38',
    phaseId: 'phase-01',
    question: 'Quel mécanisme de sécurité empêche l\'exécution de code dans les zones mémoire réservées aux données ?',
    options: [
      'ASLR (Address Space Layout Randomization)',
      'DEP/NX bit (Data Execution Prevention)',
      'Stack Canaries',
      'Sandboxing',
    ],
    correctIndex: 1,
    explanation:
      'DEP (Data Execution Prevention), implémenté via le NX bit (No-Execute) au niveau matériel, marque certaines zones mémoire comme non exécutables. Cela empêche l\'exécution de code injecté dans la pile ou le tas, contrant ainsi les attaques par dépassement de tampon classiques. ASLR randomise les adresses, et les stack canaries détectent les corruptions de pile.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q39',
    phaseId: 'phase-01',
    question: 'Quelle est la principale vulnérabilité du protocole WEP pour les réseaux Wi-Fi ?',
    options: [
      'Utilisation de mots de passe trop courts',
      'Réutilisation des vecteurs d\'initialisation (IV) dans le chiffrement RC4',
      'Absence de chiffrement',
      'Incompatibilité avec les appareils modernes',
    ],
    correctIndex: 1,
    explanation:
      'WEP utilise le chiffrement RC4 avec des vecteurs d\'initialisation (IV) de seulement 24 bits, ce qui entraîne inévitablement leur réutilisation sur un réseau actif. Cette réutilisation permet aux attaquants de déduire la clé de chiffrement en analysant suffisamment de paquets. C\'est pourquoi WEP a été remplacé par WPA puis WPA2/WPA3.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q40',
    phaseId: 'phase-01',
    question: 'Dans le modèle Bell-LaPadula, que signifie la propriété "No Write Down" (propriété étoile) ?',
    options: [
      'Un sujet ne peut pas lire des données d\'un niveau supérieur',
      'Un sujet ne peut pas écrire des données dans un niveau de sécurité inférieur au sien',
      'Un administrateur ne peut pas modifier les étiquettes de sécurité',
      'Les données chiffrées ne peuvent pas être déchiffrées',
    ],
    correctIndex: 1,
    explanation:
      'La propriété étoile (*-property) du modèle Bell-LaPadula, dite "No Write Down", interdit à un sujet d\'écrire des informations dans un niveau de classification inférieur au sien. Cela empêche la fuite d\'informations classifiées vers des niveaux moins protégés. Combinée à "No Read Up", elle assure la confidentialité des données.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q41',
    phaseId: 'phase-01',
    question: 'Quel type d\'attaque exploite les conditions de concurrence (race conditions) dans un système ?',
    options: [
      'Attaque par rejeu (Replay)',
      'Attaque TOCTOU (Time-of-Check to Time-of-Use)',
      'Attaque par canal auxiliaire (Side-Channel)',
      'Attaque par dictionnaire',
    ],
    correctIndex: 1,
    explanation:
      'L\'attaque TOCTOU exploite le délai entre la vérification d\'une condition (Time-of-Check) et l\'utilisation du résultat (Time-of-Use). L\'attaquant modifie la ressource entre ces deux moments, contournant ainsi le contrôle de sécurité. C\'est une forme classique de race condition en sécurité informatique.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q42',
    phaseId: 'phase-01',
    question: 'Quelle technique cryptographique permet de prouver la connaissance d\'un secret sans le révéler ?',
    options: [
      'Chiffrement homomorphe',
      'Preuve à divulgation nulle de connaissance (Zero-Knowledge Proof)',
      'Secret partagé de Shamir',
      'Échange de clés Diffie-Hellman',
    ],
    correctIndex: 1,
    explanation:
      'Une preuve à divulgation nulle de connaissance (ZKP) permet à une partie (le prouveur) de démontrer à une autre (le vérificateur) qu\'elle connaît un secret sans révéler aucune information sur ce secret. Cette technique est utilisée dans les protocoles d\'authentification et les blockchains préservant la confidentialité.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q43',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce que le "Perfect Forward Secrecy" (PFS) garantit dans une communication TLS ?',
    options: [
      'Que le certificat du serveur ne peut pas être falsifié',
      'Que la compromission de la clé privée du serveur ne permet pas de déchiffrer les sessions passées',
      'Que toutes les communications sont chiffrées en AES-256',
      'Que le client et le serveur s\'authentifient mutuellement',
    ],
    correctIndex: 1,
    explanation:
      'Le Perfect Forward Secrecy garantit que les clés de session sont éphémères et indépendantes de la clé privée à long terme du serveur. Ainsi, même si la clé privée du serveur est compromise ultérieurement, les communications passées restent protégées car chaque session utilisait une clé unique générée par un échange Diffie-Hellman éphémère.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q44',
    phaseId: 'phase-01',
    question: 'Quelle attaque utilise des requêtes DNS pour amplifier le volume de trafic dirigé vers une victime ?',
    options: [
      'DNS Tunneling',
      'DNS Amplification Attack',
      'DNS Zone Transfer',
      'DNS Rebinding',
    ],
    correctIndex: 1,
    explanation:
      'L\'attaque DNS Amplification exploite des serveurs DNS ouverts en envoyant des requêtes avec l\'adresse IP source usurpée (spoofée) de la victime. Les réponses DNS, bien plus volumineuses que les requêtes, sont envoyées à la victime, amplifiant le trafic d\'un facteur pouvant atteindre 50x ou plus, créant un puissant DDoS.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q45',
    phaseId: 'phase-01',
    question: 'Dans le cadre du NIST Cybersecurity Framework, quelles sont les cinq fonctions principales ?',
    options: [
      'Prévenir, Détecter, Analyser, Contenir, Récupérer',
      'Identifier, Protéger, Détecter, Répondre, Récupérer',
      'Planifier, Implémenter, Vérifier, Agir, Améliorer',
      'Évaluer, Concevoir, Déployer, Surveiller, Optimiser',
    ],
    correctIndex: 1,
    explanation:
      'Le NIST Cybersecurity Framework définit cinq fonctions principales : Identify (identifier les actifs et risques), Protect (mettre en place des protections), Detect (détecter les événements de sécurité), Respond (répondre aux incidents), et Recover (restaurer les services). Ce cadre est largement adopté pour structurer la gestion de la cybersécurité.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q46',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce que l\'attaque "Pass-the-Hash" permet à un attaquant de faire ?',
    options: [
      'Déchiffrer un mot de passe haché',
      'S\'authentifier en utilisant directement le hash du mot de passe sans le connaître en clair',
      'Modifier le hash stocké dans la base de données',
      'Contourner l\'authentification multi-facteurs',
    ],
    correctIndex: 1,
    explanation:
      'L\'attaque Pass-the-Hash exploite le fait que certains protocoles d\'authentification (comme NTLM) utilisent le hash du mot de passe pour l\'authentification. L\'attaquant qui obtient le hash peut l\'utiliser directement pour s\'authentifier sans avoir besoin de connaître le mot de passe en clair. C\'est pourquoi Kerberos et les mécanismes modernes sont préférés.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q47',
    phaseId: 'phase-01',
    question: 'Quel est le principal avantage de la cryptographie sur courbes elliptiques (ECC) par rapport à RSA ?',
    options: [
      'ECC est plus ancien et mieux testé',
      'ECC offre un niveau de sécurité équivalent avec des clés beaucoup plus courtes',
      'ECC ne nécessite pas de nombres premiers',
      'ECC est plus facile à implémenter en logiciel',
    ],
    correctIndex: 1,
    explanation:
      'La cryptographie sur courbes elliptiques (ECC) offre un niveau de sécurité équivalent à RSA avec des clés significativement plus courtes. Par exemple, une clé ECC de 256 bits offre une sécurité comparable à une clé RSA de 3072 bits. Cela se traduit par des calculs plus rapides, moins de bande passante et de stockage nécessaires.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q48',
    phaseId: 'phase-01',
    question: 'Quel cadre d\'attaque est couramment utilisé par les équipes de sécurité pour modéliser les tactiques et techniques des attaquants ?',
    options: [
      'OWASP Top 10',
      'MITRE ATT&CK',
      'ISO 27001',
      'COBIT',
    ],
    correctIndex: 1,
    explanation:
      'MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) est une base de connaissances qui répertorie les tactiques et techniques utilisées par les attaquants dans le monde réel. Elle est utilisée pour la modélisation des menaces, le red teaming, l\'évaluation des défenses et l\'amélioration de la détection des incidents.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q49',
    phaseId: 'phase-01',
    question: 'Qu\'est-ce que le "Certificate Pinning" et quel problème résout-il ?',
    options: [
      'Renouveler automatiquement les certificats expirés',
      'Associer un serveur à un certificat ou une clé publique spécifique pour empêcher les attaques avec de faux certificats',
      'Chiffrer les certificats stockés sur le disque',
      'Distribuer les certificats via un réseau CDN',
    ],
    correctIndex: 1,
    explanation:
      'Le Certificate Pinning consiste à associer (épingler) un hôte à son certificat ou sa clé publique attendue. L\'application vérifie que le certificat présenté correspond à celui qui est épinglé, empêchant les attaques MITM utilisant des certificats frauduleux émis par des CA compromises ou malveillantes.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q50',
    phaseId: 'phase-01',
    question: 'Quelle technique permet de détecter les modifications non autorisées des fichiers système en comparant leurs empreintes cryptographiques ?',
    options: [
      'Analyse heuristique',
      'Contrôle d\'intégrité des fichiers (File Integrity Monitoring)',
      'Analyse de sandbox',
      'Détection par signature antivirus',
    ],
    correctIndex: 1,
    explanation:
      'Le File Integrity Monitoring (FIM) calcule et stocke les empreintes cryptographiques (hashes) des fichiers système critiques, puis les compare régulièrement pour détecter toute modification non autorisée. Des outils comme OSSEC ou Tripwire utilisent cette technique pour identifier les compromissions et les changements suspects sur les systèmes.',
    difficulty: 'hard',
  },
];

export const phase01Questions: QuizQuestion[] = [
  ...phase01Base,
  ...phase01ExtraA,
  ...phase01ExtraB,
  ...phase01ExtraC,
];
