import { QuizQuestion } from '../types';

export const phase01ExtraB: QuizQuestion[] = [
  // === Cryptographie (p1-q91 to p1-q97) ===
  {
    id: 'p1-q91',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Un administrateur remarque que des utilisateurs se connectent au site intranet de l\'entreprise via HTTPS, mais un analyste SOC constate qu\'un attaquant pourrait intercepter le trafic en présentant un faux certificat. Le management souhaite que le navigateur n\'accepte QUE le certificat légitime du serveur. Quelle technique l\'administrateur doit-il implémenter ?',
    options: [
      'Configurer un certificat wildcard pour tous les sous-domaines',
      'Activer le certificate pinning dans l\'application',
      'Mettre en place un certificat auto-signé sur le serveur',
      'Désactiver la vérification CRL dans les navigateurs',
    ],
    correctIndex: 1,
    explanation:
      'Le certificate pinning (épinglage de certificat) associe un hôte à son certificat ou sa clé publique attendue. Si le certificat présenté ne correspond pas au certificat épinglé, la connexion est refusée, empêchant ainsi les attaques de type man-in-the-middle utilisant de faux certificats, même s\'ils sont signés par une autorité de certification de confiance.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q92',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Votre entreprise doit permettre à un organisme gouvernemental d\'accéder aux clés de chiffrement de certains employés en cas d\'enquête judiciaire, tout en maintenant le chiffrement des données au quotidien. Quelle solution cryptographique répond à cette exigence ?',
    options: [
      'Utiliser un algorithme de chiffrement symétrique comme AES-256',
      'Mettre en place un système de key escrow (séquestre de clés)',
      'Implémenter le chiffrement de bout en bout sans tiers de confiance',
      'Générer des clés éphémères pour chaque session de communication',
    ],
    correctIndex: 1,
    explanation:
      'Le key escrow (séquestre de clés) consiste à confier une copie des clés de chiffrement à un tiers de confiance. En cas de besoin légal ou d\'enquête, les clés peuvent être récupérées pour déchiffrer les données. Cette approche est souvent exigée par certaines réglementations gouvernementales, bien qu\'elle soulève des préoccupations en matière de confidentialité.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q93',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Un administrateur PKI doit vérifier en temps réel si un certificat TLS a été révoqué avant d\'autoriser une connexion. La solution doit fournir une réponse immédiate sans nécessiter le téléchargement d\'une liste complète. Quel protocole doit-il utiliser ?',
    options: [
      'CRL (Certificate Revocation List)',
      'OCSP (Online Certificate Status Protocol)',
      'SCEP (Simple Certificate Enrollment Protocol)',
      'CSR (Certificate Signing Request)',
    ],
    correctIndex: 1,
    explanation:
      'OCSP (Online Certificate Status Protocol) permet de vérifier le statut de révocation d\'un certificat en temps réel en interrogeant un répondeur OCSP. Contrairement aux CRL qui nécessitent le téléchargement d\'une liste complète de certificats révoqués (ce qui peut être volumineux et non actualisé), OCSP fournit une réponse ciblée et immédiate pour un certificat spécifique.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q94',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Le service juridique de votre organisation exige que tous les e-mails échangés avec les partenaires externes soient chiffrés et signés numériquement pour garantir la confidentialité et la non-répudiation. Les utilisateurs utilisent des clients de messagerie standards comme Outlook. Quelle solution est la PLUS adaptée ?',
    options: [
      'Utiliser un VPN site-à-site entre les deux organisations',
      'Implémenter S/MIME pour le chiffrement et la signature des e-mails',
      'Configurer TLS sur le serveur de messagerie uniquement',
      'Mettre en place un portail web sécurisé pour l\'échange de messages',
    ],
    correctIndex: 1,
    explanation:
      'S/MIME (Secure/Multipurpose Internet Mail Extensions) permet de chiffrer le contenu des e-mails et de les signer numériquement en utilisant des certificats X.509. La signature garantit l\'authenticité de l\'expéditeur et la non-répudiation, tandis que le chiffrement assure la confidentialité. S/MIME est nativement supporté par la plupart des clients de messagerie professionnels comme Outlook et Apple Mail.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q95',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Votre équipe réseau configure un VPN site-à-site. L\'exigence est de garantir à la fois la confidentialité (chiffrement) et l\'intégrité des paquets IP, tout en masquant les adresses IP internes. Quel protocole IPsec et quel mode doivent-ils choisir ?',
    options: [
      'AH (Authentication Header) en mode transport',
      'ESP (Encapsulating Security Payload) en mode tunnel',
      'AH en mode tunnel',
      'ESP en mode transport',
    ],
    correctIndex: 1,
    explanation:
      'ESP (Encapsulating Security Payload) fournit à la fois le chiffrement (confidentialité) et l\'authentification (intégrité) des paquets, contrairement à AH qui ne fournit que l\'authentification sans chiffrement. Le mode tunnel encapsule le paquet IP original entier dans un nouveau paquet, masquant ainsi les adresses IP internes. C\'est la combinaison standard pour les VPN site-à-site.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q96',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Deux bureaux distants doivent établir une clé de session partagée pour chiffrer leurs communications via un réseau public non sécurisé. Ils ne peuvent pas échanger de clé secrète au préalable. Quel algorithme leur permet d\'établir cette clé partagée de manière sécurisée ?',
    options: [
      'AES-256 en mode CBC',
      'RSA avec une longueur de clé de 4096 bits',
      'Diffie-Hellman',
      'SHA-512 avec un sel aléatoire',
    ],
    correctIndex: 2,
    explanation:
      'Diffie-Hellman est un protocole d\'échange de clés qui permet à deux parties d\'établir un secret partagé sur un canal non sécurisé, sans avoir besoin d\'échanger une clé secrète au préalable. Chaque partie génère une paire de valeurs (publique et privée) et échange la valeur publique. Le secret partagé résultant peut ensuite être utilisé comme clé de session pour le chiffrement symétrique.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q97',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Lors d\'une capture réseau, un analyste observe le processus de négociation TLS entre un client et un serveur web. Il remarque que le client envoie un message "ClientHello" suivi d\'un échange de certificats et d\'un accord sur les paramètres de chiffrement. Le management demande à comprendre pourquoi ce processus est nécessaire. Quelle est la MEILLEURE explication du TLS handshake ?',
    options: [
      'Il permet au serveur de vérifier l\'adresse IP du client avant d\'autoriser la connexion',
      'Il établit les paramètres de chiffrement, authentifie le serveur et génère les clés de session pour sécuriser la communication',
      'Il compresse les données avant le transfert pour améliorer la bande passante',
      'Il vérifie que le client dispose d\'un certificat valide émis par la même autorité de certification',
    ],
    correctIndex: 1,
    explanation:
      'Le TLS handshake est un processus en plusieurs étapes qui permet au client et au serveur de : (1) négocier la version du protocole et les algorithmes de chiffrement, (2) authentifier le serveur via son certificat numérique, (3) échanger les informations nécessaires pour générer les clés de session. Une fois le handshake terminé, toutes les données sont chiffrées avec les clés de session convenues.',
    difficulty: 'easy',
  },

  // === IAM (p1-q98 to p1-q103) ===
  {
    id: 'p1-q98',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'Votre organisation a été victime de plusieurs attaques par force brute sur les comptes utilisateurs. Le RSSI vous demande de configurer une politique qui verrouille automatiquement les comptes après un certain nombre de tentatives échouées. Quelle politique devez-vous implémenter ?',
    options: [
      'Politique de complexité des mots de passe avec caractères spéciaux obligatoires',
      'Politique de verrouillage de compte (account lockout policy) avec un seuil de tentatives et une durée de verrouillage',
      'Politique de rotation des mots de passe tous les 30 jours',
      'Politique de longueur minimale des mots de passe à 16 caractères',
    ],
    correctIndex: 1,
    explanation:
      'La politique de verrouillage de compte (account lockout policy) définit un seuil de tentatives de connexion échouées (par exemple 5 tentatives), après lequel le compte est temporairement verrouillé pour une durée définie (par exemple 30 minutes). Cela ralentit considérablement les attaques par force brute en empêchant les tentatives rapides et répétées de deviner les mots de passe.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q99',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'Un auditeur constate que les employés réutilisent leurs anciens mots de passe après chaque rotation obligatoire. Par exemple, un utilisateur alterne entre deux mots de passe favoris. Quelle configuration Active Directory empêche cette pratique ?',
    options: [
      'Activer la politique de complexité des mots de passe',
      'Configurer la politique d\'historique des mots de passe (password history) pour mémoriser les 24 derniers mots de passe',
      'Réduire l\'âge maximum des mots de passe à 15 jours',
      'Augmenter la longueur minimale des mots de passe à 20 caractères',
    ],
    correctIndex: 1,
    explanation:
      'La politique d\'historique des mots de passe (password history) conserve un historique des mots de passe précédemment utilisés et empêche l\'utilisateur de les réutiliser. En configurant la mémorisation des 24 derniers mots de passe (recommandation Microsoft), un utilisateur ne peut pas recycler un ancien mot de passe avant d\'avoir utilisé 24 mots de passe différents, décourageant ainsi la réutilisation.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q100',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'Le responsable de la sécurité souhaite restreindre l\'accès au système financier uniquement aux heures de bureau (8h-18h en semaine). Des tentatives de connexion suspectes ont été détectées pendant la nuit et les week-ends. Quelle mesure de contrôle d\'accès répond à ce besoin ?',
    options: [
      'Configurer un pare-feu applicatif devant le système financier',
      'Implémenter des restrictions d\'accès basées sur l\'heure (time-of-day restrictions)',
      'Activer l\'authentification multifacteur pour les connexions nocturnes',
      'Déployer un système de détection d\'intrusion sur le réseau',
    ],
    correctIndex: 1,
    explanation:
      'Les restrictions basées sur l\'heure (time-of-day restrictions) permettent de limiter l\'accès des utilisateurs à certaines plages horaires définies. En configurant ces restrictions dans l\'annuaire (par exemple Active Directory), les tentatives de connexion en dehors des heures autorisées sont automatiquement refusées, réduisant le risque d\'accès non autorisé pendant les périodes sans surveillance.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q101',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'Votre entreprise fait régulièrement appel à des consultants externes pour des missions de 6 mois. Le service RH s\'inquiète car plusieurs anciens consultants possèdent encore des comptes actifs dans le système, bien que leurs missions soient terminées. Quelle solution permet de gérer automatiquement ce problème ?',
    options: [
      'Créer un groupe Active Directory spécifique pour les consultants',
      'Configurer une date d\'expiration automatique sur les comptes des consultants (account expiration)',
      'Exiger un changement de mot de passe mensuel pour les consultants',
      'Limiter les consultants à un accès VPN uniquement',
    ],
    correctIndex: 1,
    explanation:
      'L\'expiration automatique des comptes permet de définir une date à laquelle le compte sera automatiquement désactivé. Pour les consultants et contractuels ayant une date de fin de mission connue, cette fonctionnalité garantit que l\'accès est révoqué automatiquement sans intervention manuelle, éliminant le risque de comptes orphelins qui pourraient être exploités.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q102',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'L\'équipe IT d\'un hôpital doit gérer les accès de 500 médecins, 200 infirmiers et 100 administratifs. Chaque catégorie nécessite des niveaux d\'accès différents aux dossiers patients. L\'attribution individuelle des permissions devient ingérable. Quelle approche simplifie cette gestion ?',
    options: [
      'Créer une ACL (Access Control List) individuelle pour chaque utilisateur',
      'Utiliser des privilèges basés sur les groupes (group-based privileges) en assignant les permissions aux rôles professionnels',
      'Attribuer des droits d\'administrateur local à chaque employé',
      'Configurer un accès unique partagé par département',
    ],
    correctIndex: 1,
    explanation:
      'Les privilèges basés sur les groupes permettent d\'attribuer des permissions à des groupes représentant des rôles professionnels (médecins, infirmiers, administratifs) plutôt qu\'à des individus. Lorsqu\'un nouvel employé arrive, il suffit de l\'ajouter au groupe approprié pour qu\'il hérite automatiquement de toutes les permissions nécessaires. Cela simplifie considérablement l\'administration et réduit les erreurs d\'attribution.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q103',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'Un audit de sécurité révèle que les techniciens stockent les mots de passe des serveurs dans un fichier Excel partagé sur le réseau. Plusieurs mots de passe n\'ont pas été changés depuis deux ans. Quelle solution le RSSI doit-il mettre en place pour corriger cette situation ?',
    options: [
      'Chiffrer le fichier Excel avec un mot de passe maître',
      'Déployer une solution de gestion des identifiants (credential management) comme un coffre-fort de mots de passe d\'entreprise',
      'Envoyer un e-mail rappelant la politique de sécurité des mots de passe',
      'Supprimer le fichier et demander aux techniciens de mémoriser les mots de passe',
    ],
    correctIndex: 1,
    explanation:
      'Une solution de gestion des identifiants (credential management) comme un coffre-fort de mots de passe d\'entreprise (par exemple CyberArk, HashiCorp Vault) stocke les mots de passe de manière chiffrée, contrôle l\'accès par des politiques granulaires, assure la rotation automatique des mots de passe et génère des pistes d\'audit complètes. Cela élimine les pratiques dangereuses comme le stockage en clair dans des fichiers partagés.',
    difficulty: 'medium',
  },

  // === Network Security (p1-q104 to p1-q110) ===
  {
    id: 'p1-q104',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Votre organisation héberge un serveur web public, un serveur de messagerie et un serveur de base de données interne contenant des informations confidentielles. L\'architecte réseau doit placer ces serveurs de manière sécurisée. Où doit-il placer le serveur web et le serveur de messagerie ?',
    options: [
      'Sur le réseau interne avec le serveur de base de données',
      'Dans une DMZ (zone démilitarisée), séparés du réseau interne par un pare-feu',
      'Directement sur Internet sans pare-feu pour maximiser les performances',
      'Sur un VLAN partagé avec les postes de travail des employés',
    ],
    correctIndex: 1,
    explanation:
      'La DMZ (zone démilitarisée) est un sous-réseau isolé placé entre le réseau externe (Internet) et le réseau interne, protégé par des pare-feux des deux côtés. Les serveurs accessibles depuis Internet (serveur web, serveur de messagerie) sont placés dans la DMZ, tandis que les serveurs contenant des données sensibles (base de données) restent sur le réseau interne. Ainsi, même si un serveur en DMZ est compromis, l\'attaquant ne peut pas accéder directement au réseau interne.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q105',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Votre organisation héberge une ferme de serveurs web récemment ciblée par des attaques par injection SQL et des tentatives de cross-site scripting. Le management souhaite une solution qui inspecte le trafic HTTP/HTTPS et bloque les requêtes malveillantes avant qu\'elles n\'atteignent les serveurs. Quelle est la MEILLEURE solution ?',
    options: [
      'Installer un pare-feu réseau traditionnel avec filtrage de paquets',
      'Déployer un WAF (Web Application Firewall)',
      'Mettre en place un système de prévention d\'intrusion réseau (NIPS)',
      'Configurer des ACL sur le routeur de bordure',
    ],
    correctIndex: 1,
    explanation:
      'Un WAF (Web Application Firewall) est spécialement conçu pour protéger les applications web en inspectant le trafic HTTP/HTTPS au niveau de la couche applicative (couche 7). Il peut détecter et bloquer les attaques spécifiques aux applications web comme les injections SQL, le XSS, le CSRF et l\'inclusion de fichiers. Contrairement à un pare-feu réseau classique qui travaille aux couches 3-4, le WAF comprend la logique des requêtes web.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q106',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Une PME dispose d\'un budget limité et souhaite consolider ses fonctions de sécurité réseau (pare-feu, antivirus, IDS/IPS, VPN, filtrage web) dans un seul boîtier. Quelle solution convient le mieux à ce scénario ?',
    options: [
      'Déployer des solutions séparées pour chaque fonction de sécurité',
      'Installer un boîtier UTM (Unified Threat Management)',
      'Utiliser uniquement un pare-feu de nouvelle génération',
      'S\'appuyer sur un antivirus sur chaque poste de travail',
    ],
    correctIndex: 1,
    explanation:
      'Un boîtier UTM (Unified Threat Management) combine plusieurs fonctions de sécurité dans un seul appliance : pare-feu, antivirus/antimalware, IDS/IPS, VPN, filtrage d\'URL, antispam et inspection de contenu. C\'est une solution idéale pour les PME car elle simplifie l\'administration, réduit les coûts et offre une protection multicouche tout-en-un, même si elle peut créer un point unique de défaillance.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q107',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Le directeur des RH signale que des employés passent un temps excessif sur les réseaux sociaux et les sites de streaming pendant les heures de travail. De plus, certains sites accèdent à du contenu potentiellement malveillant. Quelle solution technologique permet de contrôler l\'accès aux sites web par catégorie ?',
    options: [
      'Configurer un serveur DNS interne personnalisé',
      'Implémenter le filtrage d\'URL (URL filtering) sur le proxy ou le pare-feu',
      'Bloquer tous les ports HTTP et HTTPS sur le pare-feu',
      'Installer un logiciel de surveillance sur chaque poste de travail',
    ],
    correctIndex: 1,
    explanation:
      'Le filtrage d\'URL permet de contrôler l\'accès aux sites web en les classant par catégories (réseaux sociaux, streaming, jeux, contenu adulte, malveillant, etc.) et en appliquant des politiques d\'accès par catégorie. Il peut être configuré sur un proxy web ou un pare-feu de nouvelle génération. Cette solution offre un équilibre entre productivité et sécurité en bloquant les catégories indésirables tout en maintenant l\'accès aux ressources nécessaires au travail.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q108',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Votre organisation souhaite protéger l\'identité de ses serveurs web internes tout en fournissant un point d\'entrée unique aux clients externes. La solution doit également pouvoir effectuer l\'équilibrage de charge et la terminaison SSL. Quel composant réseau remplit ces fonctions ?',
    options: [
      'Un proxy direct (forward proxy)',
      'Un reverse proxy',
      'Un commutateur de couche 3',
      'Un concentrateur VPN',
    ],
    correctIndex: 1,
    explanation:
      'Un reverse proxy se positionne devant les serveurs web internes et reçoit les requêtes des clients externes en leur nom. Il masque l\'identité et l\'architecture des serveurs back-end, peut effectuer l\'équilibrage de charge entre plusieurs serveurs, la terminaison SSL (déchiffrement du trafic HTTPS), la mise en cache du contenu et le filtrage des requêtes. C\'est un composant clé de l\'architecture de sécurité web moderne.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q109',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Un employé travaille à distance et se connecte au réseau de l\'entreprise via un VPN. Il constate que TOUTES ses connexions Internet, y compris sa navigation personnelle, passent par le réseau de l\'entreprise, ce qui ralentit sa connexion. Son collègue utilise un VPN qui ne route que le trafic professionnel. Quelle est la différence entre ces deux configurations ?',
    options: [
      'Le premier utilise un VPN SSL et le second un VPN IPsec',
      'Le premier utilise un VPN full tunnel et le second un VPN split tunnel',
      'Le premier utilise un chiffrement AES-256 et le second AES-128',
      'Le premier utilise un VPN site-à-site et le second un VPN d\'accès distant',
    ],
    correctIndex: 1,
    explanation:
      'En mode full tunnel, tout le trafic de l\'utilisateur distant (professionnel et personnel) est acheminé à travers le VPN vers le réseau de l\'entreprise. En mode split tunnel, seul le trafic destiné au réseau de l\'entreprise passe par le VPN, tandis que le trafic Internet personnel emprunte directement la connexion locale. Le full tunnel offre plus de contrôle et de sécurité, mais le split tunnel améliore les performances et réduit la charge sur le réseau de l\'entreprise.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q110',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'L\'administrateur réseau configure l\'authentification centralisée pour les commutateurs et routeurs de l\'entreprise. Il hésite entre RADIUS et TACACS+. L\'exigence principale est de pouvoir contrôler de manière granulaire les commandes que chaque administrateur réseau peut exécuter sur les équipements. Quel protocole est le PLUS adapté ?',
    options: [
      'RADIUS, car il supporte nativement le contrôle d\'accès par commande',
      'TACACS+, car il sépare l\'authentification, l\'autorisation et la comptabilisation et offre un contrôle granulaire des commandes',
      'LDAP, car il fournit un annuaire centralisé pour la gestion des permissions',
      'Kerberos, car il offre l\'authentification mutuelle avec des tickets',
    ],
    correctIndex: 1,
    explanation:
      'TACACS+ (Terminal Access Controller Access Control System Plus) sépare les fonctions d\'authentification, d\'autorisation et de comptabilisation (AAA) en processus distincts, permettant un contrôle granulaire. Il peut autoriser ou refuser des commandes spécifiques par utilisateur ou groupe, ce qui est essentiel pour la gestion des équipements réseau. RADIUS combine l\'authentification et l\'autorisation, offrant moins de granularité pour le contrôle des commandes CLI.',
    difficulty: 'hard',
  },

  // === Threat Analysis (p1-q111 to p1-q115) ===
  {
    id: 'p1-q111',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      'L\'équipe SOC de votre organisation détecte depuis plusieurs mois des activités suspectes intermittentes : exfiltration lente de données, mouvements latéraux discrets et utilisation d\'outils légitimes détournés. Les attaquants semblent disposer de ressources considérables et visent spécifiquement la propriété intellectuelle de l\'entreprise. Quel type de menace est le PLUS probable ?',
    options: [
      'Un script kiddie exploitant des vulnérabilités connues',
      'Une APT (Advanced Persistent Threat) menée par un acteur étatique ou organisé',
      'Un ver informatique se propageant automatiquement sur le réseau',
      'Un employé mécontent accédant à des données non autorisées',
    ],
    correctIndex: 1,
    explanation:
      'Une APT (Advanced Persistent Threat) est caractérisée par un attaquant hautement qualifié et bien financé (souvent étatique) qui cible une organisation spécifique sur une longue période. Les APT utilisent des techniques avancées et furtives, se déplacent latéralement dans le réseau et exfiltrent lentement les données pour éviter la détection. Leur persistance et leur sophistication les distinguent des attaques opportunistes.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q112',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      'Un analyste de sécurité découvre qu\'un attaquant a exploité une vulnérabilité dans le logiciel de gestion documentaire de l\'entreprise. Après vérification, aucun correctif n\'existe pour cette vulnérabilité et l\'éditeur n\'en avait pas connaissance. De quel type d\'attaque s\'agit-il ?',
    options: [
      'Une attaque par déni de service distribué (DDoS)',
      'Un exploit zero-day',
      'Une attaque de type brute force',
      'Une attaque par ingénierie sociale',
    ],
    correctIndex: 1,
    explanation:
      'Un exploit zero-day cible une vulnérabilité inconnue de l\'éditeur du logiciel et pour laquelle aucun correctif n\'existe au moment de l\'attaque. Le terme "zero-day" signifie que l\'éditeur a eu zéro jour pour corriger la faille. Ces attaques sont particulièrement dangereuses car les systèmes de détection basés sur les signatures ne peuvent pas les identifier, et la seule défense repose sur la détection comportementale et la défense en profondeur.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q113',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      'Un employé navigue sur un site d\'information légitime qui a été compromis par un attaquant. Sans cliquer sur aucun lien ni télécharger quoi que ce soit, le navigateur de l\'employé exécute automatiquement un code malveillant qui installe un malware sur son poste. Quel type d\'attaque l\'employé a-t-il subi ?',
    options: [
      'Une attaque de phishing ciblé (spear phishing)',
      'Une attaque par téléchargement furtif (drive-by download)',
      'Une attaque par point d\'eau (watering hole)',
      'Une attaque de type clickjacking',
    ],
    correctIndex: 1,
    explanation:
      'Une attaque par téléchargement furtif (drive-by download) se produit lorsqu\'un malware est automatiquement téléchargé et exécuté simplement en visitant un site web compromis, sans aucune interaction de l\'utilisateur. L\'attaquant exploite des vulnérabilités dans le navigateur, ses plugins (Flash, Java) ou le système d\'exploitation. Le site web légitime sert de vecteur de distribution après avoir été compromis par injection de code malveillant.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q114',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      'L\'équipe de sécurité constate que plusieurs employés ont accédé à un site web frauduleux dont le nom de domaine est "banque-nati0nale.com" au lieu de "banque-nationale.com". Les employés pensaient être sur le vrai site. Quel type d\'attaque exploite ce genre de confusion ?',
    options: [
      'Pharming (empoisonnement DNS)',
      'Typosquatting (squattage de noms de domaine similaires)',
      'Man-in-the-browser',
      'Session hijacking',
    ],
    correctIndex: 1,
    explanation:
      'Le typosquatting consiste à enregistrer des noms de domaine similaires à des sites légitimes en exploitant les fautes de frappe courantes ou les substitutions visuelles (comme remplacer la lettre "o" par le chiffre "0"). Les attaquants créent des copies du site légitime pour voler les identifiants des victimes. La protection passe par la sensibilisation des utilisateurs et l\'enregistrement préventif des variantes de domaine par l\'organisation.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q115',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      'Le RSSI souhaite intégrer des sources de données automatisées qui fournissent des informations actualisées sur les menaces émergentes, les indicateurs de compromission (IoC) et les tactiques des attaquants. Ces données doivent alimenter directement le SIEM pour améliorer la détection. Quelle solution recommandez-vous ?',
    options: [
      'Souscrire à un service de scan de vulnérabilités externe',
      'Intégrer des flux de renseignement sur les menaces (threat intelligence feeds) dans le SIEM',
      'Augmenter la fréquence des tests de pénétration à une fois par mois',
      'Déployer des honeypots sur le réseau pour collecter des informations sur les attaquants',
    ],
    correctIndex: 1,
    explanation:
      'Les flux de renseignement sur les menaces (threat intelligence feeds) fournissent des données structurées et actualisées sur les menaces : adresses IP malveillantes, hachages de malwares, domaines de C2, TTP des attaquants, etc. Intégrés au SIEM, ces flux enrichissent les règles de corrélation et permettent la détection automatique d\'activités liées à des menaces connues. Des standards comme STIX/TAXII facilitent l\'échange automatisé de ces informations.',
    difficulty: 'hard',
  },

  // === Risk Management (p1-q116 to p1-q119) ===
  {
    id: 'p1-q116',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      'L\'équipe de sécurité effectue un scan de vulnérabilités sur l\'infrastructure réseau. Le rapport indique 247 vulnérabilités, dont certaines critiques. Cependant, l\'équipe soupçonne que plusieurs résultats sont des faux positifs. Quelle est la prochaine étape la PLUS importante ?',
    options: [
      'Corriger immédiatement toutes les 247 vulnérabilités identifiées',
      'Valider les résultats en analysant chaque vulnérabilité critique pour distinguer les vrais positifs des faux positifs',
      'Ignorer les résultats et effectuer un nouveau scan avec un autre outil',
      'Transmettre le rapport au management sans analyse supplémentaire',
    ],
    correctIndex: 1,
    explanation:
      'Après un scan de vulnérabilités, il est essentiel de valider les résultats. Un faux positif est une vulnérabilité signalée qui n\'existe pas réellement, tandis qu\'un faux négatif est une vulnérabilité existante non détectée. L\'analyse de validation permet de prioriser les efforts de remédiation sur les vraies vulnérabilités critiques et d\'éviter de gaspiller des ressources sur des faux positifs.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q117',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      'Votre organisation engage une société de tests de pénétration. Avant le début de la mission, le prestataire demande un document définissant les systèmes autorisés à tester, les techniques interdites, les horaires de test et les contacts d\'urgence. Comment appelle-t-on ce document ?',
    options: [
      'Politique de sécurité de l\'information',
      'Règles d\'engagement (Rules of Engagement) du test de pénétration',
      'Plan de continuité d\'activité (BCP)',
      'Accord de non-divulgation (NDA)',
    ],
    correctIndex: 1,
    explanation:
      'Les règles d\'engagement (Rules of Engagement - RoE) sont un document contractuel qui définit le périmètre exact d\'un test de pénétration : les systèmes et réseaux autorisés, les techniques permises et interdites, les plages horaires, les contacts d\'urgence, les procédures d\'escalade et les conditions d\'arrêt. Ce document protège à la fois l\'organisation et le prestataire en établissant des limites claires pour éviter tout dommage non intentionnel.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q118',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      'L\'IDS (système de détection d\'intrusion) de votre organisation génère une alerte indiquant une attaque SQL injection sur le serveur web. Après investigation, l\'équipe de sécurité confirme que la requête était en réalité une requête légitime mal interprétée par l\'IDS. Comment qualifie-t-on ce type d\'alerte ? En parallèle, l\'équipe découvre qu\'une véritable exfiltration de données n\'a généré aucune alerte. Comment qualifie-t-on cette absence d\'alerte ?',
    options: [
      'L\'alerte erronée est un vrai positif ; l\'absence d\'alerte est un vrai négatif',
      'L\'alerte erronée est un faux positif ; l\'absence d\'alerte est un faux négatif',
      'L\'alerte erronée est un faux négatif ; l\'absence d\'alerte est un faux positif',
      'L\'alerte erronée est un vrai négatif ; l\'absence d\'alerte est un vrai positif',
    ],
    correctIndex: 1,
    explanation:
      'Un faux positif se produit lorsqu\'un système de sécurité signale une activité légitime comme malveillante (fausse alarme). Un faux négatif se produit lorsqu\'une activité réellement malveillante n\'est pas détectée (menace manquée). Les faux positifs gaspillent les ressources des analystes, tandis que les faux négatifs sont plus dangereux car des attaques passent inaperçues. Un bon équilibre entre sensibilité et spécificité est crucial pour un IDS efficace.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q119',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      'Le volume de journaux générés par les pare-feux, serveurs et applications de votre organisation est devenu ingérable. Les analystes ne peuvent plus identifier les événements critiques parmi les millions d\'entrées quotidiennes. Le RSSI demande une solution centralisée capable de collecter, corréler et analyser les journaux de sécurité. Quelle solution répond à ce besoin ?',
    options: [
      'Déployer un serveur syslog centralisé avec stockage en texte brut',
      'Implémenter un SIEM (Security Information and Event Management) avec des règles de corrélation',
      'Augmenter l\'espace de stockage sur chaque serveur pour conserver plus de journaux',
      'Désactiver la journalisation non critique pour réduire le volume',
    ],
    correctIndex: 1,
    explanation:
      'Un SIEM collecte et centralise les journaux de multiples sources (pare-feux, serveurs, applications, endpoints), les normalise dans un format commun et applique des règles de corrélation pour détecter des schémas d\'attaque complexes. Par exemple, un SIEM peut corréler des tentatives de connexion échouées sur un serveur, suivies d\'un accès réussi, puis d\'un transfert de données inhabituel, pour identifier une potentielle compromission de compte.',
    difficulty: 'hard',
  },

  // === Incident Response (p1-q120 to p1-q122) ===
  {
    id: 'p1-q120',
    phaseId: 'phase-01',
    lessonId: 'p1-incident-response',
    question:
      'Un analyste SOC détecte un ransomware actif sur plusieurs postes de travail. Le malware se propage rapidement via les partages réseau. Quelle est la séquence CORRECTE des étapes de réponse à incident selon le NIST SP 800-61 ?',
    options: [
      'Éradication, Confinement, Récupération, Leçons apprises',
      'Préparation, Détection et Analyse, Confinement/Éradication/Récupération, Activité post-incident',
      'Détection, Notification au management, Restauration des sauvegardes, Documentation',
      'Isolation des systèmes, Paiement de la rançon, Restauration, Communication publique',
    ],
    correctIndex: 1,
    explanation:
      'Le NIST SP 800-61 définit quatre phases de réponse aux incidents : (1) Préparation - plans, outils et formation en place, (2) Détection et Analyse - identification et évaluation de l\'incident, (3) Confinement, Éradication et Récupération - isoler la menace, supprimer le malware et restaurer les systèmes, (4) Activité post-incident - leçons apprises et amélioration des processus. Ces phases ne sont pas strictement linéaires et peuvent se chevaucher.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q121',
    phaseId: 'phase-01',
    lessonId: 'p1-incident-response',
    question:
      'Un serveur critique est compromis par un malware. L\'équipe de réponse aux incidents doit décider de la stratégie de confinement. Le serveur héberge une application métier essentielle qui ne peut pas être arrêtée pendant plus de 2 heures. Quelle stratégie de confinement est la PLUS appropriée ?',
    options: [
      'Éteindre immédiatement le serveur et le reformater',
      'Isoler le serveur du réseau en modifiant les règles de pare-feu tout en le maintenant opérationnel pour l\'analyse forensique',
      'Ignorer l\'incident et continuer la surveillance pour collecter plus d\'informations',
      'Déconnecter physiquement tous les câbles réseau du datacenter',
    ],
    correctIndex: 1,
    explanation:
      'La segmentation par pare-feu permet d\'isoler le serveur compromis du reste du réseau sans l\'éteindre, préservant ainsi les preuves en mémoire vive pour l\'analyse forensique et minimisant l\'impact sur la continuité des activités. Cette approche de confinement ciblé empêche la propagation du malware tout en maintenant le serveur accessible pour l\'investigation. C\'est un équilibre entre la préservation des preuves, la limitation de la propagation et la continuité des services.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q122',
    phaseId: 'phase-01',
    lessonId: 'p1-incident-response',
    question:
      'Après avoir résolu un incident de sécurité majeur impliquant une violation de données, le RSSI organise une réunion avec toutes les parties prenantes. L\'objectif est d\'évaluer la réponse à l\'incident et d\'identifier les améliorations possibles. Comment appelle-t-on cette étape et quel est son objectif principal ?',
    options: [
      'L\'audit de conformité, visant à vérifier le respect des réglementations',
      'La réunion de retour d\'expérience (lessons learned), visant à améliorer les processus de réponse pour les incidents futurs',
      'Le briefing exécutif, visant à informer la direction des coûts de l\'incident',
      'L\'évaluation des risques, visant à recalculer le score de risque de l\'organisation',
    ],
    correctIndex: 1,
    explanation:
      'La phase de leçons apprises (lessons learned) est la dernière étape du processus de réponse aux incidents selon le NIST. Elle consiste à réunir toutes les parties impliquées pour analyser objectivement ce qui a bien fonctionné, ce qui a échoué et ce qui peut être amélioré. Les résultats alimentent la mise à jour des plans de réponse, des procédures et de la formation. Cette étape est souvent négligée mais elle est cruciale pour l\'amélioration continue de la posture de sécurité.',
    difficulty: 'medium',
  },

  // === Secure Architecture (p1-q123 to p1-q125) ===
  {
    id: 'p1-q123',
    phaseId: 'phase-01',
    lessonId: 'p1-secure-architecture',
    question:
      'Un administrateur système doit configurer le stockage d\'un serveur de base de données critique. L\'exigence est d\'obtenir à la fois de bonnes performances en lecture/écriture et une tolérance aux pannes permettant de survivre à la perte d\'un disque sans perte de données. Le budget permet l\'achat de 4 disques identiques. Quel niveau RAID est le PLUS adapté ?',
    options: [
      'RAID 0 (striping sans redondance)',
      'RAID 1 (mirroring simple)',
      'RAID 5 (striping avec parité distribuée)',
      'RAID 10 (mirroring + striping)',
    ],
    correctIndex: 3,
    explanation:
      'RAID 10 (ou RAID 1+0) combine le mirroring (RAID 1) et le striping (RAID 0). Il offre d\'excellentes performances en lecture/écriture grâce au striping, tout en assurant la tolérance aux pannes grâce au mirroring. Avec 4 disques, RAID 10 peut survivre à la perte d\'un disque dans chaque paire miroir. Bien qu\'il utilise 50% de la capacité totale pour la redondance, il offre le meilleur compromis performances/fiabilité pour les bases de données critiques.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q124',
    phaseId: 'phase-01',
    lessonId: 'p1-secure-architecture',
    question:
      'L\'administrateur de sauvegarde doit planifier la stratégie de backup d\'un serveur de fichiers contenant 500 Go de données. La fenêtre de sauvegarde quotidienne est limitée à 2 heures et une sauvegarde complète prend 8 heures. Les données changent d\'environ 5% par jour. Quelle stratégie de sauvegarde est la PLUS efficace pour respecter la fenêtre de sauvegarde quotidienne tout en minimisant le temps de restauration ?',
    options: [
      'Sauvegarde complète chaque nuit',
      'Sauvegarde complète le dimanche, puis sauvegardes différentielles chaque nuit de la semaine',
      'Sauvegarde complète le dimanche, puis sauvegardes incrémentales chaque nuit de la semaine',
      'Sauvegarde incrémentale uniquement, sans sauvegarde complète',
    ],
    correctIndex: 1,
    explanation:
      'La stratégie sauvegarde complète + différentielles offre le meilleur compromis. La sauvegarde différentielle sauvegarde toutes les données modifiées depuis la dernière sauvegarde complète. Bien qu\'elle soit plus volumineuse que l\'incrémentale au fil de la semaine, la restauration ne nécessite que la dernière sauvegarde complète + la dernière différentielle (2 supports), contre la complète + toutes les incrémentales (jusqu\'à 7 supports). Cela accélère significativement la restauration en cas de sinistre.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q125',
    phaseId: 'phase-01',
    lessonId: 'p1-secure-architecture',
    question:
      'Le datacenter de votre organisation subit des coupures de courant fréquentes. La dernière panne a provoqué l\'arrêt brutal des serveurs, causant une corruption de données. Le management exige une solution qui maintienne les serveurs en fonctionnement pendant les coupures courtes et assure une alimentation prolongée en cas de panne étendue. Quelle combinaison est la MEILLEURE ?',
    options: [
      'Installer uniquement un générateur diesel de secours',
      'Déployer des onduleurs (UPS) pour l\'alimentation immédiate, couplés à un générateur de secours pour les pannes prolongées',
      'Installer uniquement des onduleurs (UPS) de grande capacité',
      'Configurer les serveurs pour un arrêt automatique en cas de coupure',
    ],
    correctIndex: 1,
    explanation:
      'La combinaison UPS + générateur offre une protection complète. L\'UPS (Uninterruptible Power Supply) fournit une alimentation instantanée par batterie lors d\'une coupure, protégeant contre les arrêts brutaux et laissant le temps au générateur de démarrer (typiquement 10-30 secondes). Le générateur prend ensuite le relais pour fournir une alimentation prolongée pendant toute la durée de la panne. Cette approche en deux couches est la norme dans les datacenters professionnels.',
    difficulty: 'medium',
  },

  // === Application Security (p1-q126 to p1-q127) ===
  {
    id: 'p1-q126',
    phaseId: 'phase-01',
    lessonId: 'p1-application-security',
    question:
      'Un développeur travaille sur une application bancaire multithread. Lors des tests de charge, l\'équipe QA découvre que deux transactions simultanées sur le même compte peuvent parfois toutes deux réussir alors que le solde ne devrait permettre qu\'une seule transaction. Le solde final est incorrect. Quel type de vulnérabilité est en cause ?',
    options: [
      'Un dépassement de tampon (buffer overflow)',
      'Une condition de concurrence (race condition)',
      'Une injection SQL',
      'Un cross-site request forgery (CSRF)',
    ],
    correctIndex: 1,
    explanation:
      'Une condition de concurrence (race condition) se produit lorsque deux threads ou processus accèdent simultanément à une ressource partagée et que le résultat dépend de l\'ordre d\'exécution. Dans ce scénario, les deux transactions lisent le même solde avant que l\'une ait mis à jour la base de données, résultant en un état incohérent. La solution consiste à implémenter des mécanismes de verrouillage (mutex, sémaphore) ou des transactions atomiques pour garantir l\'accès exclusif.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q127',
    phaseId: 'phase-01',
    lessonId: 'p1-application-security',
    question:
      'Lors d\'un test de pénétration d\'une application web, le pentester saisit "../../../etc/passwd" dans un champ de téléchargement de fichier et obtient le contenu du fichier système. Quel type de vulnérabilité a-t-il exploité ?',
    options: [
      'Cross-site scripting (XSS)',
      'Directory traversal (traversée de répertoire)',
      'Injection de commandes OS',
      'Server-side request forgery (SSRF)',
    ],
    correctIndex: 1,
    explanation:
      'La traversée de répertoire (directory traversal) est une vulnérabilité qui permet à un attaquant d\'accéder à des fichiers et répertoires en dehors du répertoire web autorisé en utilisant des séquences comme "../" pour remonter dans l\'arborescence du système de fichiers. La prévention inclut la validation et la sanitisation stricte des entrées utilisateur, l\'utilisation de chemins canoniques et la restriction des permissions du processus web.',
    difficulty: 'medium',
  },

  // === Cloud Security (p1-q128 to p1-q129) ===
  {
    id: 'p1-q128',
    phaseId: 'phase-01',
    lessonId: 'p1-cloud-security',
    question:
      'Le DSI évalue la migration de plusieurs services vers le cloud. Il doit comprendre la répartition des responsabilités de sécurité. L\'équipe utilise actuellement un logiciel CRM hébergé en SaaS, développe des applications sur une plateforme PaaS et héberge des machines virtuelles en IaaS. Dans quel modèle l\'organisation a-t-elle la PLUS GRANDE responsabilité en matière de sécurité ?',
    options: [
      'SaaS, car le fournisseur ne gère aucune sécurité',
      'IaaS, car l\'organisation est responsable du système d\'exploitation, des applications, des données et de la configuration réseau',
      'PaaS, car l\'organisation gère l\'intégralité de l\'infrastructure',
      'La responsabilité est identique dans les trois modèles',
    ],
    correctIndex: 1,
    explanation:
      'Dans le modèle de responsabilité partagée, la charge de sécurité de l\'organisation augmente en passant de SaaS à PaaS puis à IaaS. En SaaS, le fournisseur gère presque tout. En PaaS, l\'organisation gère les applications et les données. En IaaS, l\'organisation est responsable du système d\'exploitation, du middleware, des applications, des données et de la configuration réseau ; le fournisseur ne gère que l\'infrastructure physique et la virtualisation.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q129',
    phaseId: 'phase-01',
    lessonId: 'p1-cloud-security',
    question:
      'Votre organisation utilise plusieurs services cloud (AWS, Azure, Salesforce) et le RSSI s\'inquiète du shadow IT : des employés utilisent des applications cloud non approuvées pour stocker des données sensibles. Il souhaite une solution qui offre une visibilité sur l\'ensemble des services cloud utilisés et permette d\'appliquer des politiques de sécurité uniformes. Quelle solution recommandez-vous ?',
    options: [
      'Déployer un pare-feu de nouvelle génération sur le réseau interne',
      'Implémenter un CASB (Cloud Access Security Broker)',
      'Configurer un VPN obligatoire pour tout accès Internet',
      'Installer un agent DLP sur chaque poste de travail',
    ],
    correctIndex: 1,
    explanation:
      'Un CASB (Cloud Access Security Broker) est un point de contrôle de sécurité placé entre les utilisateurs et les services cloud. Il offre une visibilité sur tous les services cloud utilisés (y compris le shadow IT), applique des politiques de sécurité (DLP, chiffrement, contrôle d\'accès), détecte les comportements anormaux et assure la conformité réglementaire. Le CASB peut fonctionner en mode proxy (inline) ou en mode API pour couvrir l\'ensemble de l\'écosystème cloud.',
    difficulty: 'hard',
  },

  // === Physical & IoT Security (p1-q130) ===
  {
    id: 'p1-q130',
    phaseId: 'phase-01',
    lessonId: 'p1-physical-iot-security',
    question:
      'Un commercial de votre entreprise signale la perte de son smartphone professionnel contenant des e-mails confidentiels, des contacts clients et un accès VPN au réseau de l\'entreprise. Le téléphone est protégé par un code PIN mais les données ne sont pas chiffrées. Quelle action l\'administrateur doit-il effectuer en PRIORITE via la solution MDM (Mobile Device Management) ?',
    options: [
      'Envoyer un message au téléphone demandant à quiconque le trouve de le retourner',
      'Exécuter un effacement à distance (remote wipe) pour supprimer toutes les données du téléphone',
      'Changer le mot de passe du compte e-mail de l\'utilisateur uniquement',
      'Localiser le téléphone par GPS et attendre 48 heures avant toute action',
    ],
    correctIndex: 1,
    explanation:
      'L\'effacement à distance (remote wipe) via MDM permet de supprimer à distance toutes les données d\'un appareil perdu ou volé, incluant les e-mails, contacts, applications et configurations d\'accès. C\'est la priorité absolue car le code PIN peut être contourné et les données non chiffrées sont vulnérables à l\'extraction physique. Le MDM permet également de révoquer les certificats VPN et de désactiver l\'accès aux ressources de l\'entreprise associées à cet appareil.',
    difficulty: 'medium',
  },
];
