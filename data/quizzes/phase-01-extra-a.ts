import { QuizQuestion } from '../types';

export const phase01ExtraA: QuizQuestion[] = [
  // ── p1-cryptographie (7 questions: q51-q57) ────────────────────────
  {
    id: 'p1-q51',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      "Votre entreprise doit chiffrer des volumes importants de données en temps réel sur un serveur de fichiers. Le responsable sécurité exige un algorithme symétrique rapide et approuvé par le NIST. Un collègue propose 3DES tandis qu'un autre recommande AES-256. Lequel devez-vous choisir et pourquoi ?",
    options: [
      'AES-256, car il est plus rapide et utilise des blocs de 128 bits contre 64 bits pour 3DES',
      '3DES, car il applique trois passes de chiffrement et est donc plus sûr',
      'AES-256, car il utilise des blocs de 256 bits, ce qui le rend invulnérable',
      "3DES, car il est approuvé par le NIST et AES ne l'est pas",
    ],
    correctIndex: 0,
    explanation:
      "AES-256 est plus performant que 3DES car il opère sur des blocs de 128 bits (contre 64 bits pour 3DES) et est nettement plus rapide. 3DES applique certes trois passes DES, mais il est considéré comme obsolète par le NIST. AES est l'algorithme symétrique recommandé pour le chiffrement moderne.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q52',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      "Un développeur de votre équipe souhaite vérifier l'intégrité d'un fichier téléchargé depuis un dépôt open source. Il hésite entre MD5 et SHA-256. Vous remarquez que le site officiel du projet ne fournit que des empreintes SHA-256. Quel est le MEILLEUR conseil à lui donner ?",
    options: [
      'Utiliser MD5 car il est plus rapide à calculer',
      "Utiliser SHA-256 car MD5 est vulnérable aux collisions et ne garantit plus l'intégrité",
      "Les deux sont équivalents pour la vérification d'intégrité",
      'Utiliser SHA-1 comme compromis entre vitesse et sécurité',
    ],
    correctIndex: 1,
    explanation:
      "MD5 est considéré comme cassé car des collisions peuvent être générées facilement. SHA-256, membre de la famille SHA-2, offre une résistance aux collisions bien supérieure et est l'algorithme de hachage recommandé pour vérifier l'intégrité des fichiers.",
    difficulty: 'easy',
  },
  {
    id: 'p1-q53',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      "Votre directeur juridique doit signer numériquement un contrat PDF avant de l'envoyer à un partenaire. Il veut s'assurer que le destinataire puisse vérifier l'authenticité et l'intégrité du document. Quel processus décrit le MIEUX le fonctionnement d'une signature numérique ?",
    options: [
      "Le document est chiffré avec la clé publique de l'expéditeur, puis haché",
      "Un hash du document est créé puis chiffré avec la clé privée de l'expéditeur",
      'Le document est chiffré avec la clé privée du destinataire',
      'Un hash du document est créé puis chiffré avec la clé publique du destinataire',
    ],
    correctIndex: 1,
    explanation:
      "Une signature numérique fonctionne en deux étapes : d'abord un hash (empreinte) du document est généré, puis ce hash est chiffré avec la clé privée de l'expéditeur. Le destinataire déchiffre le hash avec la clé publique de l'expéditeur et compare avec le hash qu'il calcule lui-même pour vérifier l'intégrité et l'authenticité.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q54',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      "Lors d'un audit de votre infrastructure PKI, vous constatez qu'un certificat serveur a été émis par une autorité intermédiaire (CA intermédiaire), elle-même signée par la CA racine. Un utilisateur reçoit une erreur de certificat non fiable dans son navigateur. Quelle est la cause la PLUS probable ?",
    options: [
      'Le certificat de la CA racine a expiré',
      "La chaîne de certificats est incomplète : le certificat de la CA intermédiaire n'est pas installé sur le serveur",
      'Le certificat utilise un algorithme de hachage SHA-256 non supporté',
      'Le serveur utilise un certificat auto-signé',
    ],
    correctIndex: 1,
    explanation:
      "Lorsqu'un certificat est émis par une CA intermédiaire, le serveur doit présenter toute la chaîne de certificats (certificat serveur + CA intermédiaire). Si le certificat intermédiaire manque, le navigateur ne peut pas remonter jusqu'à la CA racine de confiance et affiche une erreur.",
    difficulty: 'hard',
  },
  {
    id: 'p1-q55',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      "Votre équipe réseau met en place un VPN TLS entre deux sites. L'architecte sécurité insiste pour activer le Perfect Forward Secrecy (PFS). Un ingénieur junior demande pourquoi c'est important. Quelle est la MEILLEURE explication ?",
    options: [
      'PFS garantit que le VPN ne sera jamais interrompu en cas de panne réseau',
      'PFS utilise des clés de session éphémères, de sorte que la compromission de la clé privée du serveur ne permet pas de déchiffrer les sessions passées',
      'PFS empêche les attaques par déni de service sur le tunnel VPN',
      'PFS signifie que les clés de chiffrement ne changent jamais, assurant la stabilité de la connexion',
    ],
    correctIndex: 1,
    explanation:
      "Le Perfect Forward Secrecy (PFS) repose sur l'utilisation de clés éphémères (Diffie-Hellman éphémère ou ECDHE) pour chaque session. Ainsi, même si la clé privée à long terme du serveur est compromise ultérieurement, les sessions TLS passées ne peuvent pas être déchiffrées car chaque session utilisait une clé unique qui a été détruite.",
    difficulty: 'hard',
  },
  {
    id: 'p1-q56',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      "Un analyste sécurité remarque que votre serveur web utilise encore RSA pour l'échange de clés TLS. Il recommande de passer à ECDHE. Quel est l'avantage PRINCIPAL de ce changement ?",
    options: [
      'ECDHE est un algorithme de hachage plus robuste que RSA',
      'ECDHE fournit des clés éphémères à chaque session, offrant le Perfect Forward Secrecy',
      'ECDHE élimine le besoin de certificats numériques',
      'ECDHE utilise uniquement le chiffrement symétrique, ce qui est plus rapide',
    ],
    correctIndex: 1,
    explanation:
      "ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) génère une paire de clés éphémères à chaque session TLS. Cela offre le Perfect Forward Secrecy (PFS) : même si la clé privée RSA du serveur est compromise plus tard, les sessions passées restent protégées. RSA pour l'échange de clés ne fournit pas le PFS.",
    difficulty: 'hard',
  },
  {
    id: 'p1-q57',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      "Votre entreprise souhaite permettre à deux partenaires commerciaux d'échanger des e-mails chiffrés sans partager de secret au préalable. Quel type de chiffrement répond le MIEUX à ce besoin ?",
    options: [
      'Le chiffrement symétrique avec une clé pré-partagée',
      'Le chiffrement asymétrique où chaque partie possède une paire clé publique/clé privée',
      'Le hachage SHA-256 des e-mails',
      'Le chiffrement par flux avec RC4',
    ],
    correctIndex: 1,
    explanation:
      "Le chiffrement asymétrique permet à deux parties de communiquer de façon sécurisée sans partager de secret au préalable. Chaque utilisateur publie sa clé publique ; l'expéditeur chiffre avec la clé publique du destinataire, et seul le destinataire peut déchiffrer avec sa clé privée. C'est le principe utilisé par PGP/S-MIME pour les e-mails.",
    difficulty: 'easy',
  },

  // ── p1-iam (6 questions: q58-q63) ─────────────────────────────────
  {
    id: 'p1-q58',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      "Votre organisation utilise un serveur d'authentification centralisé. Les utilisateurs se connectent une seule fois et reçoivent un ticket TGT qui leur permet d'accéder aux ressources réseau sans retaper leur mot de passe. Quel protocole d'authentification est utilisé ?",
    options: [
      'LDAP',
      'RADIUS',
      'Kerberos',
      'TACACS+',
    ],
    correctIndex: 2,
    explanation:
      "Kerberos utilise un système de tickets. Lorsqu'un utilisateur s'authentifie, le KDC (Key Distribution Center) lui délivre un TGT (Ticket Granting Ticket). Ce TGT est ensuite présenté pour obtenir des tickets de service permettant d'accéder aux ressources, réalisant ainsi un SSO (Single Sign-On).",
    difficulty: 'easy',
  },
  {
    id: 'p1-q59',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      "Un administrateur configure l'annuaire d'entreprise pour que les applications puissent interroger les comptes utilisateurs. Il hésite entre LDAP (port 389) et LDAPS (port 636). Le RSSI exige que les requêtes contenant des mots de passe ne circulent jamais en clair. Quelle recommandation faites-vous ?",
    options: [
      "Utiliser LDAP sur le port 389, c'est suffisant sur le réseau interne",
      'Utiliser LDAPS sur le port 636 car il chiffre les communications via TLS',
      'Utiliser LDAP sur le port 636 avec un tunnel SSH',
      'Utiliser LDAPS sur le port 389 avec un certificat auto-signé',
    ],
    correctIndex: 1,
    explanation:
      "LDAPS (LDAP over SSL/TLS) utilise le port 636 et chiffre toutes les communications entre le client et le serveur d'annuaire, y compris les identifiants. LDAP standard sur le port 389 transmet les données en clair, ce qui expose les mots de passe à l'interception sur le réseau.",
    difficulty: 'easy',
  },
  {
    id: 'p1-q60',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      "Votre entreprise veut permettre à ses employés de se connecter à une application SaaS tierce en utilisant leurs identifiants d'entreprise, sans créer de comptes séparés. L'application prend en charge les assertions XML pour la fédération d'identité. Quel standard devez-vous implémenter ?",
    options: [
      'OAuth 2.0',
      'SAML (Security Assertion Markup Language)',
      'RADIUS',
      'CHAP',
    ],
    correctIndex: 1,
    explanation:
      "SAML est un standard de fédération d'identité basé sur XML qui permet le SSO entre un fournisseur d'identité (IdP) et un fournisseur de services (SP). L'IdP de l'entreprise génère une assertion SAML contenant les attributs de l'utilisateur, que l'application SaaS vérifie pour accorder l'accès.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q61',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      "Un développeur crée une application mobile qui doit accéder aux photos Google Drive de l'utilisateur sans jamais connaître son mot de passe Google. L'application doit demander une autorisation limitée (scope) à l'utilisateur. Quel framework devez-vous utiliser ?",
    options: [
      'Kerberos avec délégation de tickets',
      'OAuth 2.0 avec OpenID Connect',
      'LDAP avec bind anonyme',
      'NTLM avec pass-the-hash',
    ],
    correctIndex: 1,
    explanation:
      "OAuth 2.0 est un framework d'autorisation déléguée qui permet à une application tierce d'accéder à des ressources au nom d'un utilisateur via des jetons d'accès, sans connaître les identifiants. OpenID Connect ajoute une couche d'authentification au-dessus d'OAuth 2.0. C'est le standard utilisé par Google, Facebook, etc.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q62',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      "Votre entreprise déploie un système biométrique de reconnaissance d'empreintes digitales pour le contrôle d'accès physique. Lors des tests, vous constatez un taux de faux rejets (FRR) élevé qui frustre les employés légitimes. Le fabricant propose d'ajuster la sensibilité. Quel sera l'effet de la réduction de la sensibilité ?",
    options: [
      'Le FRR diminuera mais le FAR (taux de fausses acceptations) augmentera',
      'Le FRR et le FAR diminueront simultanément',
      'Le FRR augmentera encore davantage',
      'Aucun effet, le FRR est fixe pour chaque capteur',
    ],
    correctIndex: 0,
    explanation:
      "Le FRR (False Rejection Rate) et le FAR (False Acceptance Rate) sont inversement proportionnels. Réduire la sensibilité du capteur diminue le FRR (moins de rejets d'utilisateurs légitimes) mais augmente le FAR (plus d'acceptations d'imposteurs). Le point d'équilibre optimal est le CER (Crossover Error Rate).",
    difficulty: 'hard',
  },
  {
    id: 'p1-q63',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      "Un employé du gouvernement utilise une carte à puce insérée dans un lecteur pour s'authentifier à son poste de travail. La carte contient un certificat numérique X.509 et nécessite un code PIN. De quel type de carte s'agit-il le PLUS probablement ?",
    options: [
      'Une carte de proximité RFID',
      'Une carte PIV (Personal Identity Verification) ou CAC (Common Access Card)',
      'Une carte à bande magnétique',
      'Un token OTP matériel',
    ],
    correctIndex: 1,
    explanation:
      "Les cartes PIV et CAC sont des cartes à puce utilisées par le gouvernement américain et l'armée. Elles contiennent des certificats numériques X.509 et combinent deux facteurs d'authentification : quelque chose que vous avez (la carte) et quelque chose que vous savez (le code PIN).",
    difficulty: 'medium',
  },

  // ── p1-network-security (7 questions: q64-q70) ────────────────────
  {
    id: 'p1-q64',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      "Des attaques récentes contre vos serveurs DMZ n'ont pas commencé par un handshake TCP trois voies classique. Les paquets malveillants contiennent uniquement des flags SYN/FIN. Votre pare-feu actuel basé sur des listes d'accès simples ne les bloque pas. Quel type de pare-feu devez-vous déployer ?",
    options: [
      'Un pare-feu sans état (stateless) avec des ACL plus restrictives',
      'Un pare-feu à état (stateful) qui suit les connexions TCP et rejette les paquets hors session',
      'Un proxy inverse uniquement',
      'Un concentrateur VPN',
    ],
    correctIndex: 1,
    explanation:
      "Un pare-feu à état (stateful firewall) maintient une table des connexions actives et suit l'état du handshake TCP. Il rejette automatiquement les paquets qui ne correspondent pas à une session établie (comme des paquets SYN/FIN sans handshake préalable). Un pare-feu sans état ne vérifie que les en-têtes individuels sans contexte de session.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q65',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      "Vous configurez les ACL d'un routeur pour protéger un sous-réseau serveur 10.0.1.0/24. Vous devez autoriser uniquement le trafic HTTPS (port 443) depuis le réseau interne 192.168.1.0/24 et bloquer tout le reste. Quelle règle ACL est la PLUS appropriée en dernière position ?",
    options: [
      'permit ip any any',
      'deny tcp any any eq 80',
      'deny ip any any (implicit deny)',
      'permit tcp 192.168.1.0/24 10.0.1.0/24 eq 443',
    ],
    correctIndex: 2,
    explanation:
      "La bonne pratique en matière d'ACL est de terminer par une règle implicite deny all (deny ip any any) qui bloque tout trafic non explicitement autorisé. La règle permit pour HTTPS serait placée avant. La plupart des pare-feux et routeurs appliquent cette règle implicitement, mais il est recommandé de la rendre explicite.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q66',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      "Votre entreprise veut contrôler et journaliser l'accès web des employés. Toutes les requêtes HTTP/HTTPS doivent passer par un intermédiaire qui peut filtrer les URL et mettre en cache les contenus. Les navigateurs des postes sont configurés pour pointer vers cet intermédiaire. De quel type de dispositif s'agit-il ?",
    options: [
      'Un proxy direct (forward proxy)',
      'Un proxy inverse (reverse proxy)',
      'Un pare-feu applicatif WAF',
      'Un serveur DNS récursif',
    ],
    correctIndex: 0,
    explanation:
      "Un proxy direct (forward proxy) est un intermédiaire configuré côté client qui reçoit les requêtes des utilisateurs internes, les filtre selon des politiques (URL, catégories), peut mettre en cache les contenus et journaliser l'activité. Un reverse proxy, à l'inverse, est placé devant les serveurs pour protéger ceux-ci.",
    difficulty: 'easy',
  },
  {
    id: 'p1-q67',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      "Après une tempête de broadcast qui a paralysé votre réseau pendant 30 minutes, votre équipe réseau décide de remplacer STP par RSTP sur tous les commutateurs. Quel est l'avantage PRINCIPAL de RSTP par rapport à STP classique ?",
    options: [
      'RSTP élimine complètement le besoin de bloquer des ports redondants',
      'RSTP converge en quelques secondes contre 30 à 50 secondes pour STP',
      'RSTP chiffre les trames réseau pour empêcher les boucles',
      "RSTP permet d'utiliser des VLAN, contrairement à STP",
    ],
    correctIndex: 1,
    explanation:
      "RSTP (Rapid Spanning Tree Protocol, IEEE 802.1w) offre une convergence beaucoup plus rapide que STP classique (IEEE 802.1D). Là où STP peut prendre 30 à 50 secondes pour reconverger après un changement de topologie, RSTP converge typiquement en quelques secondes, réduisant considérablement les interruptions réseau.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q68',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      "Un auditeur découvre que vos commutateurs réseau sont gérés via SNMPv2c avec la communauté par défaut « public ». Il signale cela comme une vulnérabilité critique. Quelle est la MEILLEURE remédiation ?",
    options: [
      'Changer le nom de communauté de « public » à un nom complexe',
      'Migrer vers SNMPv3 avec authentification et chiffrement',
      'Désactiver complètement SNMP sur tous les équipements',
      'Configurer SNMPv1 avec un mot de passe fort',
    ],
    correctIndex: 1,
    explanation:
      "SNMPv2c transmet les communautés (équivalentes à des mots de passe) en clair sur le réseau, quelle que soit leur complexité. SNMPv3 ajoute l'authentification (via HMAC-SHA) et le chiffrement (via AES) des messages, ce qui en fait la seule version sécurisée de SNMP. Désactiver SNMP éliminerait la capacité de supervision.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q69',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      "Un technicien découvre qu'un attaquant a connecté un ordinateur portable non autorisé à une prise réseau libre dans un bureau. Vous souhaitez empêcher ce type d'intrusion en limitant le nombre d'adresses MAC autorisées par port. Quelle fonctionnalité du commutateur devez-vous activer ?",
    options: [
      'Le VLAN trunking avec 802.1Q',
      "La sécurité de port (port security) avec limitation d'adresses MAC",
      "Le protocole LACP pour l'agrégation de liens",
      'Le routage inter-VLAN',
    ],
    correctIndex: 1,
    explanation:
      "La sécurité de port (port security) permet de restreindre le nombre d'adresses MAC autorisées sur un port de commutateur. Si un appareil non autorisé est connecté, le port peut être automatiquement désactivé (shutdown), restreint ou configuré pour envoyer une alerte. C'est une mesure de base contre les connexions physiques non autorisées.",
    difficulty: 'easy',
  },
  {
    id: 'p1-q70',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      "Votre hôpital souhaite s'assurer que seuls les appareils conformes (antivirus à jour, patches appliqués) puissent accéder au réseau filaire. Les appareils non conformes doivent être redirigés vers un VLAN de remédiation. Quelle solution devez-vous déployer ?",
    options: [
      'Un serveur DHCP avec des baux réservés',
      'Un NAC (Network Access Control) avec 802.1X',
      'Un serveur DNS avec des zones split-brain',
      'Un pare-feu applicatif WAF',
    ],
    correctIndex: 1,
    explanation:
      "Le NAC (Network Access Control) avec 802.1X vérifie l'identité et la conformité des appareils avant de leur accorder l'accès au réseau. Un agent sur le poste évalue sa conformité (antivirus, patches, etc.) et le serveur NAC décide de placer l'appareil sur le VLAN de production ou de remédiation selon le résultat.",
    difficulty: 'hard',
  },

  // ── p1-threat-analysis (5 questions: q71-q75) ─────────────────────
  {
    id: 'p1-q71',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      "Plusieurs employés du service comptabilité reçoivent un e-mail qui semble provenir du directeur financier, leur demandant d'ouvrir une pièce jointe Excel contenant soi-disant les résultats trimestriels. Le fichier contient en réalité une macro malveillante. Quel type d'attaque est décrit ?",
    options: [
      'Une attaque par déni de service distribué (DDoS)',
      'Une attaque de spear phishing ciblant un département spécifique',
      'Une attaque par force brute sur les mots de passe',
      'Une attaque par injection SQL',
    ],
    correctIndex: 1,
    explanation:
      "Le spear phishing est une forme ciblée de phishing qui vise des individus ou groupes spécifiques au sein d'une organisation. Ici, l'attaquant a ciblé le service comptabilité en usurpant l'identité du directeur financier avec un prétexte crédible (résultats trimestriels). C'est plus sophistiqué que le phishing de masse.",
    difficulty: 'easy',
  },
  {
    id: 'p1-q72',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      "Votre équipe SOC détecte qu'un site web fréquemment consulté par vos développeurs a été compromis. Un script malveillant y a été injecté pour exploiter une vulnérabilité Java des visiteurs. Quel type d'attaque est-ce ?",
    options: [
      "Une attaque par watering hole (point d'eau)",
      'Une attaque par ransomware',
      'Une attaque par force brute',
      'Une attaque par dépassement de tampon (buffer overflow)',
    ],
    correctIndex: 0,
    explanation:
      "Une attaque par watering hole (point d'eau) consiste à compromettre un site web fréquenté par les cibles visées, plutôt que d'attaquer directement celles-ci. L'attaquant étudie les habitudes de navigation des cibles, compromet un site qu'elles visitent régulièrement, puis y injecte du code malveillant qui infecte les visiteurs.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q73',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      "Votre antivirus basé sur les signatures n'a pas détecté un malware qui a infecté plusieurs postes. L'analyse révèle que le malware modifie son propre code à chaque infection tout en conservant sa fonctionnalité. Quel type de malware s'agit-il ?",
    options: [
      'Un ver (worm) réseau',
      'Un malware polymorphe',
      'Un cheval de Troie (trojan)',
      'Un adware publicitaire',
    ],
    correctIndex: 1,
    explanation:
      "Un malware polymorphe modifie son code (ou son apparence) à chaque réplication ou infection, rendant la détection par signatures classiques inefficace. Les antivirus doivent utiliser des techniques heuristiques ou comportementales pour détecter ce type de menace, car la signature change constamment.",
    difficulty: 'hard',
  },
  {
    id: 'p1-q74',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      "Un serveur de fichiers de votre entreprise affiche soudainement un message exigeant un paiement de 5 bitcoins pour déchiffrer les données. Tous les fichiers ont l'extension .encrypted et sont inaccessibles. Quel type d'attaque votre entreprise subit-elle ?",
    options: [
      'Une attaque de type man-in-the-middle',
      'Une attaque par ransomware',
      'Une attaque par empoisonnement DNS',
      'Une attaque par élévation de privilèges',
    ],
    correctIndex: 1,
    explanation:
      "Le ransomware est un malware qui chiffre les fichiers de la victime et exige une rançon (souvent en cryptomonnaie) en échange de la clé de déchiffrement. Les mesures préventives incluent des sauvegardes régulières hors ligne, la segmentation réseau et la sensibilisation des utilisateurs.",
    difficulty: 'easy',
  },
  {
    id: 'p1-q75',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      "Lors d'une investigation forensique, un analyste découvre qu'un processus malveillant s'exécute avec les privilèges du noyau et n'apparaît pas dans le gestionnaire de tâches standard. Les outils de détection classiques ne le voient pas. Quel type de malware est le PLUS probable ?",
    options: [
      'Un keylogger logiciel',
      'Un rootkit de niveau noyau (kernel-level rootkit)',
      'Un spyware de navigateur',
      'Un ver auto-répliquant',
    ],
    correctIndex: 1,
    explanation:
      "Un rootkit de niveau noyau s'installe au niveau le plus bas du système d'exploitation et intercepte les appels système pour se dissimuler. Il est invisible pour les outils de détection classiques qui s'exécutent au niveau utilisateur. Des outils spécialisés de détection hors-ligne ou des analyses du dump mémoire sont nécessaires pour le détecter.",
    difficulty: 'hard',
  },

  // ── p1-risk-management (5 questions: q76-q80) ─────────────────────
  {
    id: 'p1-q76',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      "Votre RSSI demande une évaluation des risques pour un nouveau projet. Il souhaite une approche utilisant des catégories comme « élevé », « moyen » et « faible » plutôt que des valeurs monétaires précises, car les données financières ne sont pas disponibles. Quel type d'analyse de risque convient le MIEUX ?",
    options: [
      'Une analyse quantitative des risques',
      'Une analyse qualitative des risques',
      'Une analyse de vulnérabilités automatisée',
      'Un test de pénétration',
    ],
    correctIndex: 1,
    explanation:
      "L'analyse qualitative des risques utilise des catégories subjectives (élevé, moyen, faible) et des matrices de risque pour évaluer les menaces. Elle est appropriée quand les données financières précises ne sont pas disponibles. L'analyse quantitative, en revanche, utilise des valeurs monétaires (SLE, ALE, ARO) pour calculer le coût du risque.",
    difficulty: 'easy',
  },
  {
    id: 'p1-q77',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      "Un serveur de base de données vaut 200 000 euros. L'analyse montre qu'une panne disque entraînerait une perte de 40 % de sa valeur, et que la probabilité annuelle d'une telle panne est de 0,1 (une fois tous les 10 ans). Quel est l'ALE (Annualized Loss Expectancy) ?",
    options: [
      '80 000 euros',
      '8 000 euros',
      '20 000 euros',
      '200 000 euros',
    ],
    correctIndex: 1,
    explanation:
      "SLE (Single Loss Expectancy) = Valeur de l'actif x Facteur d'exposition = 200 000 x 0,40 = 80 000 euros. ALE (Annualized Loss Expectancy) = SLE x ARO (Annualized Rate of Occurrence) = 80 000 x 0,1 = 8 000 euros par an. L'ALE aide à justifier les investissements en sécurité : toute mesure coûtant moins de 8 000 euros/an est rentable.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q78',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      "Lors d'un comité de sécurité, le DSI demande un document centralisé listant tous les risques identifiés, leur probabilité, leur impact, les propriétaires de chaque risque et les mesures d'atténuation prévues. Quel document devez-vous produire ?",
    options: [
      "Un plan de reprise d'activité (DRP)",
      'Un registre des risques (risk register)',
      'Un rapport de test de pénétration',
      "Une politique de sécurité de l'information",
    ],
    correctIndex: 1,
    explanation:
      "Le registre des risques (risk register) est un document centralisé qui répertorie tous les risques identifiés avec leurs caractéristiques : description, probabilité, impact, propriétaire du risque, stratégie de traitement (atténuation, transfert, acceptation, évitement) et état de suivi. C'est un outil fondamental de la gestion des risques.",
    difficulty: 'easy',
  },
  {
    id: 'p1-q79',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      "Après une intrusion, votre équipe déploie un système IDS sur le réseau. Le RSSI classe cette mesure comme un contrôle « détectif ». Un pare-feu bloquant le trafic malveillant est classé comme « préventif ». Votre système de sauvegarde automatique qui restaure les données après un incident est classé comme quel type de contrôle ?",
    options: [
      'Préventif',
      'Détectif',
      'Correctif',
      'Dissuasif',
    ],
    correctIndex: 2,
    explanation:
      "Un contrôle correctif vise à remédier à un incident après qu'il s'est produit et à restaurer le système à son état normal. Les sauvegardes et restaurations sont l'exemple classique de contrôle correctif. Les contrôles préventifs empêchent les incidents (pare-feu), les détectifs les identifient (IDS) et les dissuasifs découragent les attaquants (caméras visibles).",
    difficulty: 'medium',
  },
  {
    id: 'p1-q80',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      "Votre entreprise planifie sa continuité d'activité. Le consultant demande d'identifier les processus métier critiques, le temps d'arrêt maximum tolérable pour chacun et l'impact financier d'une interruption. Quel exercice devez-vous réaliser en premier ?",
    options: [
      'Un test de pénétration externe',
      "Une analyse d'impact sur l'activité (BIA - Business Impact Analysis)",
      'Un scan de vulnérabilités du réseau',
      'Une revue du code source des applications',
    ],
    correctIndex: 1,
    explanation:
      "La BIA (Business Impact Analysis) est la première étape de la planification de continuité d'activité. Elle identifie les processus critiques, évalue l'impact (financier, opérationnel, réputationnel) d'une interruption et détermine les objectifs de reprise (RTO, RPO). Les résultats de la BIA guident ensuite les décisions d'investissement en continuité.",
    difficulty: 'medium',
  },

  // ── p1-incident-response (2 questions: q81-q82) ───────────────────
  {
    id: 'p1-q81',
    phaseId: 'phase-01',
    lessonId: 'p1-incident-response',
    question:
      "Un analyste SOC découvre qu'un serveur a été compromis. Avant de commencer l'investigation forensique, il doit préserver les preuves numériques. Son responsable lui rappelle l'ordre de volatilité. Quelle source de preuves doit-il capturer EN PREMIER ?",
    options: [
      'Les fichiers journaux sur le disque dur',
      'Le contenu de la mémoire vive (RAM)',
      'Les sauvegardes stockées sur bande',
      'Les fichiers de configuration du serveur',
    ],
    correctIndex: 1,
    explanation:
      "Selon l'ordre de volatilité (RFC 3227), les preuves les plus volatiles doivent être collectées en premier. La mémoire vive (RAM) est la plus volatile car elle est perdue dès que le système est éteint ou redémarré. Elle peut contenir des processus malveillants, des clés de chiffrement et des connexions réseau actives. Les fichiers sur disque sont moins volatils.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q82',
    phaseId: 'phase-01',
    lessonId: 'p1-incident-response',
    question:
      "Vous êtes le premier intervenant sur un incident de sécurité impliquant un poste de travail potentiellement compromis. Le poste est allumé et affiche un bureau normal. Quelle est la PREMIERE action à effectuer pour préserver l'intégrité des preuves ?",
    options: [
      "Éteindre immédiatement l'ordinateur en débranchant l'alimentation",
      "Documenter l'état actuel de l'écran et isoler le poste du réseau sans l'éteindre",
      'Lancer un antivirus complet sur le poste',
      'Reformater le disque dur et réinstaller le système',
    ],
    correctIndex: 1,
    explanation:
      "En tant que premier intervenant, vous devez documenter l'état actuel (photographie de l'écran, notes) et isoler le poste du réseau (débrancher le câble réseau ou désactiver le Wi-Fi) pour empêcher toute communication avec l'attaquant, SANS éteindre le poste. L'extinction détruirait les preuves en mémoire vive. Le reformatage détruirait toutes les preuves.",
    difficulty: 'hard',
  },

  // ── p1-secure-architecture (3 questions: q83-q85) ─────────────────
  {
    id: 'p1-q83',
    phaseId: 'phase-01',
    lessonId: 'p1-secure-architecture',
    question:
      "Votre entreprise doit garantir une reprise d'activité en moins de 4 heures après un sinistre majeur. Le budget est conséquent. L'architecte propose un site secondaire avec des serveurs identiques synchronisés en temps réel, prêts à prendre le relais instantanément. Quel type de site de reprise est décrit ?",
    options: [
      'Un cold site (site froid)',
      'Un warm site (site tiède)',
      'Un hot site (site chaud)',
      'Un mobile site (site mobile)',
    ],
    correctIndex: 2,
    explanation:
      "Un hot site (site chaud) est un site de reprise entièrement équipé avec du matériel identique à la production, des données synchronisées en temps réel et la capacité de prendre le relais quasi immédiatement. C'est la solution la plus coûteuse mais la plus rapide. Un warm site a du matériel mais nécessite la restauration des données. Un cold site n'a que l'infrastructure de base.",
    difficulty: 'easy',
  },
  {
    id: 'p1-q84',
    phaseId: 'phase-01',
    lessonId: 'p1-secure-architecture',
    question:
      "Le DSI fixe un RPO (Recovery Point Objective) de 1 heure et un RTO (Recovery Time Objective) de 4 heures pour le système ERP. L'équipe infrastructure propose des sauvegardes quotidiennes à 2h du matin. Quel est le problème avec cette proposition ?",
    options: [
      'Le RTO de 4 heures est trop court pour une restauration depuis une sauvegarde',
      "Les sauvegardes quotidiennes ne respectent pas le RPO de 1 heure : jusqu'à 24 heures de données pourraient être perdues",
      'Les sauvegardes à 2h du matin perturbent les performances du système',
      'Il n\'y a aucun problème, les sauvegardes quotidiennes sont suffisantes',
    ],
    correctIndex: 1,
    explanation:
      "Le RPO de 1 heure signifie que l'organisation ne peut pas tolérer plus d'1 heure de perte de données. Des sauvegardes quotidiennes créent un écart potentiel de 24 heures entre la dernière sauvegarde et le sinistre, violant largement le RPO. Il faudrait des sauvegardes au minimum toutes les heures, voire une réplication continue.",
    difficulty: 'medium',
  },
  {
    id: 'p1-q85',
    phaseId: 'phase-01',
    lessonId: 'p1-secure-architecture',
    question:
      "Votre site e-commerce reçoit un trafic croissant et les temps de réponse se dégradent. L'architecte propose de distribuer les requêtes entre plusieurs serveurs web identiques via un dispositif intermédiaire. Si un serveur tombe en panne, les requêtes sont automatiquement redirigées vers les serveurs restants. Quelle solution est décrite ?",
    options: [
      'Un serveur DNS round-robin',
      'Un répartiteur de charge (load balancer) avec détection de panne',
      'Un serveur proxy de mise en cache',
      'Un commutateur de couche 2 avec VLAN',
    ],
    correctIndex: 1,
    explanation:
      "Un répartiteur de charge (load balancer) distribue le trafic entre plusieurs serveurs selon des algorithmes (round-robin, least connections, etc.) et effectue des health checks pour détecter les serveurs défaillants. Il assure à la fois la haute disponibilité et la répartition de la charge, améliorant performances et résilience.",
    difficulty: 'easy',
  },

  // ── p1-application-security (2 questions: q86-q87) ────────────────
  {
    id: 'p1-q86',
    phaseId: 'phase-01',
    lessonId: 'p1-application-security',
    question:
      "Un testeur de sécurité découvre qu'un formulaire de transfert bancaire en ligne ne vérifie pas l'origine des requêtes. Il peut créer une page HTML malveillante qui, lorsqu'elle est visitée par un utilisateur authentifié, déclenche un transfert à son insu. Quelle vulnérabilité a-t-il identifiée ?",
    options: [
      'Cross-Site Scripting (XSS)',
      'Cross-Site Request Forgery (CSRF)',
      'Injection SQL',
      'Buffer overflow',
    ],
    correctIndex: 1,
    explanation:
      "Le CSRF (Cross-Site Request Forgery) exploite la confiance qu'un site a envers le navigateur de l'utilisateur authentifié. L'attaquant crée une requête malveillante (transfert bancaire) que le navigateur de la victime envoie automatiquement avec ses cookies de session. La contre-mesure principale est l'utilisation de jetons anti-CSRF uniques par formulaire.",
    difficulty: 'hard',
  },
  {
    id: 'p1-q87',
    phaseId: 'phase-01',
    lessonId: 'p1-application-security',
    question:
      "Un développeur construit une requête SQL en concaténant directement les entrées utilisateur : SELECT * FROM users WHERE name = '\" + userInput + \"'. Un attaquant saisit : ' OR '1'='1. Quelle vulnérabilité est exploitée et quelle est la MEILLEURE contre-mesure ?",
    options: [
      "XSS -- implémenter un pare-feu applicatif WAF",
      'Injection SQL -- utiliser des requêtes paramétrées (prepared statements)',
      'Buffer overflow -- augmenter la taille du tampon',
      'CSRF -- ajouter un jeton anti-CSRF',
    ],
    correctIndex: 1,
    explanation:
      "L'injection SQL se produit quand des entrées utilisateur non validées sont insérées directement dans des requêtes SQL. L'entrée ' OR '1'='1 transforme la requête en SELECT * FROM users WHERE name = '' OR '1'='1', qui retourne tous les enregistrements. La meilleure contre-mesure est l'utilisation de requêtes paramétrées (prepared statements) qui séparent le code SQL des données.",
    difficulty: 'medium',
  },

  // ── p1-cloud-security (2 questions: q88-q89) ─────────────────────
  {
    id: 'p1-q88',
    phaseId: 'phase-01',
    lessonId: 'p1-cloud-security',
    question:
      "Votre équipe DevOps crée des machines virtuelles à la demande pour les tests mais oublie souvent de les supprimer après usage. Après six mois, vous découvrez 200 VM non utilisées qui consomment des ressources et ne sont pas patchées. Quel problème de sécurité cloud décrit cette situation ?",
    options: [
      'Le Shadow IT',
      'Le VM sprawl (prolifération de VM)',
      'Le vendor lock-in',
      'La séparation des privilèges insuffisante',
    ],
    correctIndex: 1,
    explanation:
      "Le VM sprawl (prolifération de VM) se produit quand des machines virtuelles sont créées sans contrôle et restent actives sans supervision. Ces VM non maintenues deviennent des vecteurs d'attaque car elles ne reçoivent pas les mises à jour de sécurité. La remédiation inclut des politiques de cycle de vie des VM, l'auto-expiration et des audits réguliers.",
    difficulty: 'easy',
  },
  {
    id: 'p1-q89',
    phaseId: 'phase-01',
    lessonId: 'p1-cloud-security',
    question:
      "Avant de déployer une mise à jour majeure de votre application en production dans le cloud, un ingénieur propose de créer une copie instantanée de l'état actuel de la VM pour pouvoir revenir rapidement en arrière si la mise à jour échoue. Quel mécanisme cloud doit-il utiliser ?",
    options: [
      'Un load balancer',
      'Un snapshot (instantané) de la machine virtuelle',
      'Un certificat SSL wildcard',
      'Un conteneur Docker',
    ],
    correctIndex: 1,
    explanation:
      "Un snapshot (instantané) capture l'état complet d'une machine virtuelle à un instant donné, incluant le disque, la mémoire et la configuration. En cas de problème après la mise à jour, la VM peut être restaurée rapidement à son état précédent. C'est une pratique essentielle avant toute modification majeure en environnement cloud.",
    difficulty: 'easy',
  },

  // ── p1-physical-iot-security (1 question: q90) ────────────────────
  {
    id: 'p1-q90',
    phaseId: 'phase-01',
    lessonId: 'p1-physical-iot-security',
    question:
      "Votre entreprise permet aux employés d'utiliser leurs smartphones personnels pour accéder aux e-mails professionnels. Le RSSI s'inquiète de la sécurité des données d'entreprise sur ces appareils non contrôlés. Un collègue suggère de passer à un modèle où l'entreprise achète et gère les appareils en autorisant un usage personnel limité. Quel modèle décrit cette proposition ?",
    options: [
      'BYOD (Bring Your Own Device)',
      'COPE (Corporate Owned, Personally Enabled)',
      'VDI (Virtual Desktop Infrastructure)',
      'CYOD (Choose Your Own Device)',
    ],
    correctIndex: 1,
    explanation:
      "COPE (Corporate Owned, Personally Enabled) est un modèle où l'entreprise achète, configure et gère les appareils mobiles, tout en permettant aux employés un usage personnel limité. Cela offre un meilleur contrôle de sécurité que le BYOD (appareil personnel de l'employé) car l'entreprise possède et administre l'appareil via un MDM (Mobile Device Management).",
    difficulty: 'medium',
  },
];
