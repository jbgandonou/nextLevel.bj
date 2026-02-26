import { QuizQuestion } from '../types';
import { phase01ExtraA } from './phase-01-extra-a';
import { phase01ExtraB } from './phase-01-extra-b';
import { phase01ExtraC } from './phase-01-extra-c';
import { phase01ExtraD } from './phase-01-extra-d';
import { phase01ExtraE } from './phase-01-extra-e';

const phase01Base: QuizQuestion[] = [
  // ==================== EASY (15 questions: p1-q01 to p1-q15) ====================

  // p1-cryptographie (easy: 2)
  {
    id: 'p1-q01',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Votre organisation souhaite transmettre des fichiers volumineux de manière chiffrée entre deux succursales. Le responsable IT demande un algorithme rapide utilisant une seule clé partagée. Quel algorithme est le MEILLEUR choix ?',
    options: [
      'RSA 2048 bits',
      'AES-256',
      'SHA-256',
      'Diffie-Hellman',
    ],
    correctIndex: 1,
    explanation:
      'AES-256 est un algorithme de chiffrement symétrique rapide et sécurisé, idéal pour chiffrer de gros volumes de données. RSA est asymétrique et trop lent pour des fichiers volumineux. SHA-256 est une fonction de hachage, pas de chiffrement. Diffie-Hellman sert à l\'échange de clés, pas au chiffrement direct des données.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q02',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Un développeur doit vérifier que des fichiers téléchargés depuis un serveur n\'ont pas été altérés pendant le transfert. Quelle technique doit-il utiliser ?',
    options: [
      'Chiffrer les fichiers avec AES',
      'Comparer les empreintes de hachage (hash) des fichiers',
      'Signer les fichiers avec une clé symétrique',
      'Utiliser un VPN pour le téléchargement',
    ],
    correctIndex: 1,
    explanation:
      'Le hachage produit une empreinte unique de taille fixe pour chaque fichier. En comparant le hash du fichier téléchargé avec celui publié par le serveur, on vérifie son intégrité. Le chiffrement AES protège la confidentialité, pas l\'intégrité. Le VPN sécurise le canal mais ne garantit pas l\'intégrité du fichier source.',
    difficulty: 'easy',
  },

  // p1-iam (easy: 2)
  {
    id: 'p1-q03',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'Un employé de votre entreprise peut accéder à la messagerie, au CRM et au portail intranet avec une seule authentification le matin. Quelle technologie est mise en place ?',
    options: [
      'Authentification multi-facteurs (MFA)',
      'Single Sign-On (SSO)',
      'Contrôle d\'accès basé sur les rôles (RBAC)',
      'Protocole RADIUS',
    ],
    correctIndex: 1,
    explanation:
      'Le Single Sign-On (SSO) permet à un utilisateur de s\'authentifier une seule fois pour accéder à plusieurs applications sans ressaisir ses identifiants. Le MFA renforce l\'authentification avec plusieurs facteurs mais ne supprime pas les connexions multiples. RBAC gère les permissions par rôle, pas l\'authentification unique.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q04',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'Votre banque vous demande votre mot de passe puis un code envoyé par SMS sur votre téléphone pour vous connecter. Quel mécanisme de sécurité est utilisé ?',
    options: [
      'Single Sign-On (SSO)',
      'Authentification multi-facteurs (MFA)',
      'Contrôle d\'accès discrétionnaire (DAC)',
      'Certificat numérique X.509',
    ],
    correctIndex: 1,
    explanation:
      'L\'authentification multi-facteurs (MFA) combine au moins deux facteurs distincts : ici, quelque chose que vous savez (mot de passe) et quelque chose que vous possédez (téléphone recevant le SMS). Le SSO concerne l\'authentification unique sur plusieurs services. Le DAC est un modèle de contrôle d\'accès, pas d\'authentification.',
    difficulty: 'easy',
  },

  // p1-network-security (easy: 2)
  {
    id: 'p1-q05',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Un administrateur réseau configure un équipement pour filtrer le trafic entrant et sortant selon des règles basées sur les adresses IP et les ports. Quel dispositif configure-t-il ?',
    options: [
      'Un commutateur (switch)',
      'Un pare-feu (firewall)',
      'Un serveur DHCP',
      'Un contrôleur de domaine',
    ],
    correctIndex: 1,
    explanation:
      'Un pare-feu filtre le trafic réseau en fonction de règles prédéfinies portant sur les adresses IP, les ports et les protocoles. Un commutateur opère au niveau 2 (MAC). Un serveur DHCP attribue des adresses IP. Un contrôleur de domaine gère l\'authentification des utilisateurs dans un domaine Active Directory.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q06',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Un technicien doit se connecter à distance à un serveur Linux pour effectuer de la maintenance. Il veut éviter que ses identifiants transitent en clair sur le réseau. Quel protocole doit-il utiliser ?',
    options: [
      'Telnet (port 23)',
      'SSH (port 22)',
      'FTP (port 21)',
      'HTTP (port 80)',
    ],
    correctIndex: 1,
    explanation:
      'SSH (Secure Shell) chiffre l\'ensemble de la communication, y compris les identifiants. Telnet transmet tout en clair, y compris le mot de passe, et ne doit jamais être utilisé sur un réseau non sécurisé. FTP transmet aussi les identifiants en clair. HTTP est un protocole web, non conçu pour l\'administration distante.',
    difficulty: 'easy',
  },

  // p1-threat-analysis (easy: 2)
  {
    id: 'p1-q07',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      'Plusieurs employés de votre entreprise reçoivent un email semblant provenir du service informatique, leur demandant de cliquer sur un lien pour "réinitialiser leur mot de passe". De quel type d\'attaque s\'agit-il ?',
    options: [
      'Attaque par force brute',
      'Phishing',
      'Attaque par déni de service (DoS)',
      'Injection SQL',
    ],
    correctIndex: 1,
    explanation:
      'Il s\'agit de phishing : l\'attaquant usurpe l\'identité du service informatique pour inciter les victimes à révéler leurs identifiants via un faux lien. L\'attaque par force brute tente de deviner les mots de passe. Le DoS vise à rendre un service indisponible. L\'injection SQL cible les bases de données des applications web.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q08',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      'Un utilisateur télécharge un jeu gratuit sur Internet. Après l\'installation, il constate que son ordinateur envoie des données à un serveur inconnu. Quel type de malware a probablement été installé ?',
    options: [
      'Un ver (worm)',
      'Un cheval de Troie (trojan)',
      'Un ransomware',
      'Un rootkit',
    ],
    correctIndex: 1,
    explanation:
      'Un cheval de Troie se présente comme un programme légitime (ici un jeu) mais exécute des actions malveillantes en arrière-plan. Un ver se propage seul sans intervention de l\'utilisateur. Un ransomware chiffre les fichiers et demande une rançon. Un rootkit masque sa présence dans le système à un niveau profond.',
    difficulty: 'easy',
  },

  // p1-risk-management (easy: 2)
  {
    id: 'p1-q09',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      'Un hôpital subit une panne de ses serveurs et ne peut plus accéder aux dossiers médicaux des patients pendant plusieurs heures. Quel pilier de la triade CIA est principalement affecté ?',
    options: [
      'Confidentialité',
      'Intégrité',
      'Disponibilité',
      'Authentification',
    ],
    correctIndex: 2,
    explanation:
      'La disponibilité (Availability) garantit que les systèmes et données sont accessibles quand nécessaire. Ici, l\'impossibilité d\'accéder aux dossiers médicaux est un problème de disponibilité. La confidentialité protège contre les accès non autorisés. L\'intégrité assure que les données ne sont pas altérées. L\'authentification n\'est pas un pilier de la triade CIA.',
    difficulty: 'easy',
  },
  {
    id: 'p1-q10',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      'Votre responsable vous demande d\'identifier les faiblesses de sécurité sur les serveurs de l\'entreprise sans les exploiter. Quel type d\'évaluation devez-vous effectuer ?',
    options: [
      'Un test de pénétration (pentest)',
      'Un scan de vulnérabilités',
      'Un audit de conformité',
      'Une analyse d\'impact sur l\'activité (BIA)',
    ],
    correctIndex: 1,
    explanation:
      'Un scan de vulnérabilités identifie les faiblesses connues (logiciels non à jour, configurations incorrectes) sans les exploiter. Un pentest va plus loin en exploitant activement les failles trouvées. Un audit de conformité vérifie le respect des normes. Le BIA évalue l\'impact d\'une interruption sur les activités métier.',
    difficulty: 'easy',
  },

  // p1-secure-architecture (easy: 1)
  {
    id: 'p1-q11',
    phaseId: 'phase-01',
    lessonId: 'p1-secure-architecture',
    question:
      'Votre entreprise utilise à la fois un pare-feu, un antivirus, un IDS et un chiffrement des disques. Quel principe de sécurité cette approche illustre-t-elle ?',
    options: [
      'Le principe du moindre privilège',
      'La défense en profondeur',
      'La sécurité par l\'obscurité',
      'Le modèle Zero Trust',
    ],
    correctIndex: 1,
    explanation:
      'La défense en profondeur (Defense in Depth) consiste à superposer plusieurs couches de sécurité pour qu\'en cas de défaillance d\'une couche, les autres continuent de protéger le système. Le moindre privilège concerne les droits d\'accès. La sécurité par l\'obscurité repose sur le secret, ce qui n\'est pas fiable seul.',
    difficulty: 'easy',
  },

  // p1-cloud-security (easy: 1)
  {
    id: 'p1-q12',
    phaseId: 'phase-01',
    lessonId: 'p1-cloud-security',
    question:
      'Votre entreprise utilise Microsoft 365 pour sa messagerie. Les serveurs, le système d\'exploitation et l\'application sont gérés par Microsoft. Quel modèle de cloud computing est utilisé ?',
    options: [
      'Infrastructure as a Service (IaaS)',
      'Platform as a Service (PaaS)',
      'Software as a Service (SaaS)',
      'Desktop as a Service (DaaS)',
    ],
    correctIndex: 2,
    explanation:
      'Microsoft 365 est un exemple de SaaS : le fournisseur gère toute l\'infrastructure, la plateforme et l\'application. L\'utilisateur n\'a qu\'à utiliser le logiciel. En IaaS, le client gère l\'OS et les applications. En PaaS, le client gère les applications mais pas l\'infrastructure sous-jacente.',
    difficulty: 'easy',
  },

  // p1-application-security (easy: 1)
  {
    id: 'p1-q13',
    phaseId: 'phase-01',
    lessonId: 'p1-application-security',
    question:
      'Un développeur web constate qu\'un champ de formulaire de recherche permet d\'afficher du code JavaScript non souhaité aux autres utilisateurs. Quelle vulnérabilité est exploitée ?',
    options: [
      'Injection SQL',
      'Cross-Site Scripting (XSS)',
      'Buffer Overflow',
      'Cross-Site Request Forgery (CSRF)',
    ],
    correctIndex: 1,
    explanation:
      'Le Cross-Site Scripting (XSS) permet d\'injecter du code JavaScript malveillant dans des pages web vues par d\'autres utilisateurs. L\'injection SQL cible les bases de données, pas le navigateur. Le buffer overflow exploite la mémoire d\'un programme. Le CSRF force l\'utilisateur à exécuter des actions non voulues sur un site authentifié.',
    difficulty: 'easy',
  },

  // p1-physical-iot-security (easy: 1)
  {
    id: 'p1-q14',
    phaseId: 'phase-01',
    lessonId: 'p1-physical-iot-security',
    question:
      'Un responsable de la sécurité physique veut empêcher les véhicules non autorisés d\'accéder au parking de l\'entreprise. Quelle mesure de sécurité physique est la PLUS adaptée ?',
    options: [
      'Des caméras de surveillance',
      'Des bollards (bornes anti-bélier)',
      'Un système de badge d\'accès pour les portes',
      'Un câble antivol Kensington',
    ],
    correctIndex: 1,
    explanation:
      'Les bollards sont des bornes physiques conçues pour empêcher les véhicules de pénétrer dans des zones protégées. Les caméras surveillent mais ne bloquent pas physiquement. Les badges contrôlent l\'accès des personnes, pas des véhicules. Les câbles Kensington sécurisent les ordinateurs portables.',
    difficulty: 'easy',
  },

  // p1-incident-response (easy: 1)
  {
    id: 'p1-q15',
    phaseId: 'phase-01',
    lessonId: 'p1-incident-response',
    question:
      'Après la détection d\'un malware sur un poste de travail, l\'équipe de sécurité déconnecte immédiatement la machine du réseau. Quelle phase de la réponse aux incidents est en cours ?',
    options: [
      'Identification',
      'Confinement (Containment)',
      'Éradication',
      'Récupération',
    ],
    correctIndex: 1,
    explanation:
      'Le confinement vise à limiter la propagation de l\'incident en isolant les systèmes compromis. Déconnecter la machine du réseau empêche le malware de se propager. L\'identification est la détection initiale de l\'incident. L\'éradication consiste à supprimer la menace. La récupération restaure les systèmes à leur état normal.',
    difficulty: 'easy',
  },

  // ==================== MEDIUM (20 questions: p1-q16 to p1-q35) ====================

  // p1-cryptographie (medium: 3)
  {
    id: 'p1-q16',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Votre organisation souhaite transmettre des données PII (informations personnelles) par email à un partenaire. Votre équipe propose d\'utiliser le chiffrement asymétrique. Quelle clé devez-vous utiliser pour chiffrer le message ?',
    options: [
      'Votre clé privée',
      'La clé publique du destinataire',
      'La clé privée du destinataire',
      'Votre clé publique',
    ],
    correctIndex: 1,
    explanation:
      'En chiffrement asymétrique, on chiffre avec la clé publique du destinataire pour que seul celui-ci puisse déchiffrer avec sa clé privée. Si vous utilisiez votre clé privée, ce serait une signature numérique (preuve d\'origine), pas du chiffrement. La clé privée du destinataire ne doit jamais être partagée.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q17',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Un administrateur découvre que le certificat TLS du site web de l\'entreprise a été compromis. Quelle action doit-il effectuer en PRIORITÉ auprès de l\'autorité de certification (CA) ?',
    options: [
      'Renouveler le certificat',
      'Révoquer le certificat et le publier dans la CRL',
      'Générer une nouvelle paire de clés Diffie-Hellman',
      'Augmenter la taille de la clé RSA à 4096 bits',
    ],
    correctIndex: 1,
    explanation:
      'Lorsqu\'un certificat est compromis, il faut immédiatement le révoquer et l\'ajouter à la CRL (Certificate Revocation List) ou utiliser OCSP pour informer les clients que ce certificat n\'est plus de confiance. Renouveler sans révoquer laisse l\'ancien certificat compromis valide. Changer la taille de clé ne résout pas le problème immédiat.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q18',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Lors d\'une connexion TLS, le serveur et le client doivent convenir d\'une clé de session sans la transmettre sur le réseau. Quel mécanisme permet cet échange sécurisé ?',
    options: [
      'Le chiffrement AES-256-CBC',
      'L\'échange de clés Diffie-Hellman',
      'Le hachage HMAC-SHA256',
      'La signature RSA-OAEP',
    ],
    correctIndex: 1,
    explanation:
      'L\'échange Diffie-Hellman permet à deux parties de générer un secret partagé (clé de session) via un canal non sécurisé, sans jamais transmettre la clé elle-même. AES est utilisé après pour chiffrer la session. HMAC assure l\'intégrité des messages. La signature RSA authentifie les parties mais n\'échange pas de clé de session.',
    difficulty: 'medium',
  },

  // p1-iam (medium: 2)
  {
    id: 'p1-q19',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'Votre réseau utilise un service d\'authentification basé sur un annuaire compatible X.500 pour centraliser la gestion des comptes utilisateurs. Quel service est probablement utilisé ?',
    options: [
      'Kerberos',
      'LDAP',
      'RADIUS',
      'TACACS+',
    ],
    correctIndex: 1,
    explanation:
      'LDAP (Lightweight Directory Access Protocol) est le protocole standard pour interroger et modifier les annuaires basés sur X.500 comme Active Directory. Kerberos gère l\'authentification par tickets. RADIUS et TACACS+ sont des protocoles AAA pour l\'accès réseau, ils ne sont pas des services d\'annuaire.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q20',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'Un administrateur configure l\'accès aux fichiers d\'un serveur pour que seuls les membres du groupe "Comptabilité" puissent accéder au dossier financier. Quel modèle de contrôle d\'accès utilise-t-il ?',
    options: [
      'Contrôle d\'accès discrétionnaire (DAC)',
      'Contrôle d\'accès basé sur les rôles (RBAC)',
      'Contrôle d\'accès obligatoire (MAC)',
      'Contrôle d\'accès basé sur les attributs (ABAC)',
    ],
    correctIndex: 1,
    explanation:
      'Le RBAC (Role-Based Access Control) attribue les permissions en fonction des rôles (groupes) dans l\'organisation. Ici, le rôle "Comptabilité" détermine l\'accès au dossier. En DAC, le propriétaire du fichier décide des accès. En MAC, des étiquettes de sécurité sont utilisées. L\'ABAC se base sur des attributs multiples (heure, lieu, etc.).',
    difficulty: 'medium',
  },

  // p1-network-security (medium: 3)
  {
    id: 'p1-q21',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Votre entreprise possède un serveur web accessible depuis Internet et un serveur de base de données interne. L\'architecte réseau propose de placer le serveur web dans une zone spécifique. Comment appelle-t-on cette zone ?',
    options: [
      'VLAN de gestion',
      'Zone démilitarisée (DMZ)',
      'Réseau intranet',
      'Réseau VPN',
    ],
    correctIndex: 1,
    explanation:
      'Une DMZ (Zone Démilitarisée) est un segment réseau situé entre le réseau interne et Internet, protégé par des pare-feu des deux côtés. Les serveurs exposés publiquement (web, mail) y sont placés pour limiter l\'impact en cas de compromission. Le serveur de base de données reste sur le réseau interne protégé.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q22',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Un administrateur réseau souhaite segmenter le trafic des départements RH, Finance et IT sans ajouter de matériel physique supplémentaire. Quelle technologie doit-il implémenter ?',
    options: [
      'NAT (Network Address Translation)',
      'VLAN (Virtual Local Area Network)',
      'VPN (Virtual Private Network)',
      'Proxy inverse',
    ],
    correctIndex: 1,
    explanation:
      'Les VLANs permettent de segmenter logiquement un réseau physique en plusieurs sous-réseaux isolés sans matériel supplémentaire. Chaque département aura son VLAN, limitant le trafic broadcast et améliorant la sécurité. Le NAT traduit les adresses IP. Le VPN crée un tunnel sécurisé. Le proxy inverse relaie les requêtes web.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q23',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Un employé en télétravail doit accéder de manière sécurisée aux ressources internes de l\'entreprise depuis son domicile. Quelle solution l\'administrateur doit-il mettre en place ?',
    options: [
      'Ouvrir le port RDP sur le pare-feu',
      'Configurer un VPN (Virtual Private Network)',
      'Activer le partage de fichiers SMB sur Internet',
      'Créer un compte FTP sur le serveur',
    ],
    correctIndex: 1,
    explanation:
      'Un VPN crée un tunnel chiffré entre le poste de l\'employé et le réseau de l\'entreprise, permettant un accès sécurisé aux ressources internes. Ouvrir le port RDP directement expose le réseau aux attaques. SMB et FTP sur Internet transmettent des données de manière non sécurisée et sont des cibles connues.',
    difficulty: 'medium',
  },

  // p1-threat-analysis (medium: 2)
  {
    id: 'p1-q24',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      'Un analyste SOC observe qu\'un serveur interne communique régulièrement avec une adresse IP connue pour héberger un serveur C2 (Command & Control). Quel terme décrit MIEUX cette observation ?',
    options: [
      'Une vulnérabilité zero-day',
      'Un indicateur de compromission (IoC)',
      'Un faux positif',
      'Une menace persistante',
    ],
    correctIndex: 1,
    explanation:
      'Un indicateur de compromission (IoC) est un artefact observable (adresse IP, hash de fichier, nom de domaine) qui indique qu\'un système a été compromis. La communication avec un serveur C2 connu est un IoC classique. Un zero-day est une faille non corrigée. Un faux positif est une fausse alerte. Une menace persistante (APT) est un type d\'attaquant.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q25',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      'Le directeur financier de votre entreprise reçoit un email personnalisé semblant provenir du PDG, lui demandant d\'effectuer un virement urgent. De quel type d\'attaque s\'agit-il ?',
    options: [
      'Phishing classique',
      'Spear phishing (hameçonnage ciblé)',
      'Vishing (phishing vocal)',
      'Spam',
    ],
    correctIndex: 1,
    explanation:
      'Le spear phishing est une forme ciblée de phishing visant une personne spécifique avec un message personnalisé. L\'attaquant a recherché les noms du PDG et du directeur financier pour rendre l\'attaque crédible. Le phishing classique est envoyé en masse. Le vishing utilise le téléphone. Le spam est du courrier indésirable non ciblé.',
    difficulty: 'medium',
  },

  // p1-risk-management (medium: 2)
  {
    id: 'p1-q26',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      'Votre RSSI vous demande de calculer l\'ALE (Annualized Loss Expectancy) pour un serveur dont la valeur est de 50 000 EUR, avec un facteur d\'exposition de 40% et un taux annuel d\'occurrence de 2. Quel est l\'ALE ?',
    options: [
      '20 000 EUR',
      '40 000 EUR',
      '50 000 EUR',
      '100 000 EUR',
    ],
    correctIndex: 1,
    explanation:
      'L\'ALE se calcule : SLE x ARO. La SLE (Single Loss Expectancy) = valeur de l\'actif x facteur d\'exposition = 50 000 x 0,40 = 20 000 EUR. L\'ALE = SLE x ARO = 20 000 x 2 = 40 000 EUR par an. Ce calcul est fondamental en analyse quantitative des risques pour justifier les investissements en sécurité.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q27',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      'Après un audit, votre entreprise décide de souscrire une cyber-assurance pour couvrir les pertes liées aux ransomwares. Quelle stratégie de gestion des risques est appliquée ?',
    options: [
      'Évitement du risque',
      'Transfert du risque',
      'Atténuation du risque',
      'Acceptation du risque',
    ],
    correctIndex: 1,
    explanation:
      'Le transfert du risque consiste à transférer la charge financière d\'un risque à un tiers, typiquement via une assurance. L\'évitement élimine l\'activité à risque. L\'atténuation réduit la probabilité ou l\'impact. L\'acceptation consiste à tolérer le risque après évaluation en conscience.',
    difficulty: 'medium',
  },

  // p1-incident-response (medium: 1)
  {
    id: 'p1-q28',
    phaseId: 'phase-01',
    lessonId: 'p1-incident-response',
    question:
      'Lors d\'une investigation numérique, un enquêteur saisit un disque dur comme preuve. Il documente chaque personne ayant eu le disque en sa possession, avec les dates et heures. Comment appelle-t-on cette procédure ?',
    options: [
      'Analyse de malware',
      'Chaîne de traçabilité (chain of custody)',
      'Plan de continuité d\'activité',
      'Rapport d\'incident',
    ],
    correctIndex: 1,
    explanation:
      'La chaîne de traçabilité (chain of custody) documente la chronologie complète de la possession d\'une preuve : qui l\'a manipulée, quand, où et pourquoi. Elle est essentielle pour garantir l\'admissibilité de la preuve devant un tribunal. Sans cette documentation, la preuve peut être contestée et jugée irrecevable.',
    difficulty: 'medium',
  },

  // p1-secure-architecture (medium: 2)
  {
    id: 'p1-q29',
    phaseId: 'phase-01',
    lessonId: 'p1-secure-architecture',
    question:
      'Votre serveur de base de données critique utilise deux disques configurés en RAID 1. L\'un des disques tombe en panne. Quel est l\'impact sur les données ?',
    options: [
      'Toutes les données sont perdues',
      'Aucune perte de données car RAID 1 utilise la mise en miroir',
      'La moitié des données est perdue',
      'Les données sont corrompues mais récupérables',
    ],
    correctIndex: 1,
    explanation:
      'RAID 1 (mirroring) duplique les données sur deux disques identiques. Si l\'un tombe en panne, l\'autre contient une copie complète des données. Le système continue de fonctionner avec un seul disque le temps de remplacer le disque défaillant. RAID 0 en revanche n\'offre aucune redondance et toute panne entraîne une perte de données.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q30',
    phaseId: 'phase-01',
    lessonId: 'p1-secure-architecture',
    question:
      'Votre entreprise met en place un site de reprise d\'activité avec des serveurs préconfigurés et des données répliquées en quasi temps réel. Comment qualifie-t-on ce type de site ?',
    options: [
      'Cold site (site froid)',
      'Hot site (site chaud)',
      'Warm site (site tiède)',
      'Mobile site (site mobile)',
    ],
    correctIndex: 1,
    explanation:
      'Un hot site est un site de reprise entièrement opérationnel avec du matériel à jour et des données répliquées en temps réel, permettant un basculement rapide (quelques minutes à heures). Un cold site ne dispose que des locaux et de l\'alimentation. Un warm site a du matériel mais des données partiellement à jour, nécessitant plus de temps pour la reprise.',
    difficulty: 'medium',
  },

  // p1-application-security (medium: 2)
  {
    id: 'p1-q31',
    phaseId: 'phase-01',
    lessonId: 'p1-application-security',
    question:
      'Un testeur de sécurité saisit la chaîne « OR 1=1 -- » dans le champ de connexion d\'une application web et obtient un accès non autorisé. Quelle vulnérabilité a-t-il exploitée ?',
    options: [
      'Cross-Site Scripting (XSS)',
      'Injection SQL',
      'Directory Traversal',
      'Buffer Overflow',
    ],
    correctIndex: 1,
    explanation:
      'L\'injection SQL exploite le fait que l\'application intègre directement l\'entrée utilisateur dans une requête SQL. « OR 1=1 » rend la condition toujours vraie, contournant l\'authentification. La parade principale est l\'utilisation de requêtes paramétrées (prepared statements) et la validation stricte des entrées.',
    difficulty: 'medium',
  },
  {
    id: 'p1-q32',
    phaseId: 'phase-01',
    lessonId: 'p1-application-security',
    question:
      'Un programme C plante régulièrement quand un utilisateur saisit une chaîne de plus de 256 caractères dans un champ prévu pour 128. Quelle vulnérabilité est probablement présente ?',
    options: [
      'Injection SQL',
      'Buffer Overflow (dépassement de tampon)',
      'Cross-Site Request Forgery',
      'Race Condition',
    ],
    correctIndex: 1,
    explanation:
      'Un buffer overflow se produit quand un programme écrit des données au-delà de la taille allouée pour un tampon mémoire. Cela peut provoquer des plantages ou permettre l\'exécution de code arbitraire. La prévention passe par la validation de la longueur des entrées et l\'utilisation de fonctions sécurisées (strncpy au lieu de strcpy).',
    difficulty: 'medium',
  },

  // p1-cloud-security (medium: 1)
  {
    id: 'p1-q33',
    phaseId: 'phase-01',
    lessonId: 'p1-cloud-security',
    question:
      'Votre entreprise déploie ses applications sur des machines virtuelles chez AWS, tout en gérant elle-même le système d\'exploitation et les logiciels installés. Quel modèle de cloud est utilisé ?',
    options: [
      'Software as a Service (SaaS)',
      'Infrastructure as a Service (IaaS)',
      'Platform as a Service (PaaS)',
      'Function as a Service (FaaS)',
    ],
    correctIndex: 1,
    explanation:
      'En IaaS, le fournisseur cloud fournit l\'infrastructure (serveurs, stockage, réseau) et le client gère le système d\'exploitation, les logiciels et les données. AWS EC2 est un exemple classique d\'IaaS. En SaaS, tout est géré par le fournisseur. En PaaS, le client ne gère que ses applications et données.',
    difficulty: 'medium',
  },

  // p1-physical-iot-security (medium: 1)
  {
    id: 'p1-q34',
    phaseId: 'phase-01',
    lessonId: 'p1-physical-iot-security',
    question:
      'Votre entreprise distribue des smartphones professionnels à ses employés. Le RSSI souhaite pouvoir effacer les données à distance en cas de perte ou de vol. Quelle solution doit être déployée ?',
    options: [
      'Un antivirus mobile',
      'Une solution MDM (Mobile Device Management)',
      'Un VPN mobile',
      'Un chiffrement de la carte SD',
    ],
    correctIndex: 1,
    explanation:
      'Une solution MDM (Mobile Device Management) permet la gestion centralisée des appareils mobiles : effacement à distance (remote wipe), verrouillage, application de politiques de sécurité, chiffrement obligatoire. L\'antivirus protège contre les malwares mais ne permet pas l\'effacement à distance. Le VPN sécurise les connexions mais ne gère pas l\'appareil.',
    difficulty: 'medium',
  },

  // p1-governance-compliance (medium: 1)
  {
    id: 'p1-q35',
    phaseId: 'phase-01',
    lessonId: 'p1-governance-compliance',
    question:
      'Un nouveau prestataire doit accéder à des informations confidentielles de votre entreprise. Avant de lui donner accès, quel document doit-il obligatoirement signer ?',
    options: [
      'Un contrat de licence logicielle',
      'Un accord de non-divulgation (NDA)',
      'Un plan de continuité d\'activité (BCP)',
      'Un rapport d\'audit de sécurité',
    ],
    correctIndex: 1,
    explanation:
      'Un NDA (Non-Disclosure Agreement) est un accord juridique qui oblige le signataire à ne pas divulguer les informations confidentielles auxquelles il aura accès. C\'est une mesure standard avant de partager des données sensibles avec un tiers. Le BCP planifie la continuité des opérations. Le contrat de licence concerne les logiciels.',
    difficulty: 'medium',
  },

  // ==================== HARD (15 questions: p1-q36 to p1-q50) ====================

  // p1-cryptographie (hard: 2)
  {
    id: 'p1-q36',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Votre équipe de sécurité implémente TLS 1.3 sur les serveurs web de l\'entreprise. Le RSSI demande que les sessions passées restent protégées même si la clé privée du serveur est compromise dans le futur. Quelle propriété cryptographique devez-vous garantir ?',
    options: [
      'Non-répudiation',
      'Perfect Forward Secrecy (PFS)',
      'Intégrité par HMAC',
      'Chiffrement double (double encryption)',
    ],
    correctIndex: 1,
    explanation:
      'Le Perfect Forward Secrecy (PFS) utilise des clés de session éphémères générées via un échange Diffie-Hellman éphémère (DHE ou ECDHE). Chaque session a une clé unique non dérivée de la clé privée du serveur. Ainsi, compromettre la clé privée ne permet pas de déchiffrer les sessions passées. TLS 1.3 impose le PFS par défaut.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q37',
    phaseId: 'phase-01',
    lessonId: 'p1-cryptographie',
    question:
      'Un auditeur constate que votre application mobile accepte n\'importe quel certificat TLS sans vérifier s\'il correspond à celui attendu pour le serveur. Quelle technique de sécurité manque à l\'application ?',
    options: [
      'Chiffrement de bout en bout',
      'Certificate Pinning',
      'HSTS (HTTP Strict Transport Security)',
      'Double authentification TLS',
    ],
    correctIndex: 1,
    explanation:
      'Le Certificate Pinning associe (épingle) un certificat ou une clé publique spécifique à un serveur dans l\'application. Sans cette technique, un attaquant peut utiliser un certificat frauduleux émis par une CA compromise pour réaliser une attaque Man-in-the-Middle. HSTS force HTTPS mais ne vérifie pas le certificat spécifique.',
    difficulty: 'hard',
  },

  // p1-iam (hard: 2)
  {
    id: 'p1-q38',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'Un administrateur découvre que des comptes d\'anciens employés licenciés il y a six mois sont toujours actifs dans Active Directory avec des droits d\'accès complets. Quelle est la MEILLEURE action à mettre en place pour éviter ce problème à l\'avenir ?',
    options: [
      'Renforcer la politique de mots de passe',
      'Implémenter un processus de déprovisionnement automatique lié aux RH (offboarding)',
      'Activer l\'authentification multi-facteurs',
      'Chiffrer les données sensibles sur les serveurs',
    ],
    correctIndex: 1,
    explanation:
      'Un processus de déprovisionnement (offboarding) automatique désactive immédiatement les comptes quand les RH signalent un départ. C\'est la solution au problème racine : l\'absence de processus de révocation des accès. Le MFA renforce l\'authentification mais n\'élimine pas les comptes fantômes. La politique de mots de passe ne traite pas la désactivation des comptes.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q39',
    phaseId: 'phase-01',
    lessonId: 'p1-iam',
    question:
      'Dans un environnement Active Directory utilisant Kerberos, un utilisateur s\'authentifie et reçoit un TGT (Ticket Granting Ticket). Il souhaite ensuite accéder à un serveur de fichiers. Que doit-il obtenir du KDC ?',
    options: [
      'Un nouveau TGT pour le serveur de fichiers',
      'Un ticket de service (Service Ticket) pour ce serveur spécifique',
      'Un certificat X.509 émis par la CA interne',
      'Un jeton SAML contenant ses attributs',
    ],
    correctIndex: 1,
    explanation:
      'Dans Kerberos, après avoir obtenu le TGT auprès du KDC (Key Distribution Center), l\'utilisateur le présente au TGS (Ticket Granting Service) pour obtenir un ticket de service spécifique au serveur de fichiers. Ce ticket de service prouve son identité auprès du serveur cible sans retransmettre son mot de passe. Le TGT ne sert qu\'à demander d\'autres tickets.',
    difficulty: 'hard',
  },

  // p1-network-security (hard: 2)
  {
    id: 'p1-q40',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Votre entreprise utilise WPA2-Enterprise pour son réseau Wi-Fi. Un consultant sécurité recommande de vérifier la configuration du serveur RADIUS car il a constaté que les utilisateurs n\'utilisent pas de certificats côté client. Quel protocole EAP serait le PLUS approprié si le serveur doit authentifier les utilisateurs avec des identifiants sans certificat client ?',
    options: [
      'EAP-TLS',
      'PEAP (Protected EAP)',
      'EAP-MD5',
      'LEAP',
    ],
    correctIndex: 1,
    explanation:
      'PEAP encapsule l\'authentification dans un tunnel TLS, protégeant les identifiants. Il ne nécessite qu\'un certificat côté serveur. EAP-TLS exige des certificats des deux côtés (client et serveur), ce qui n\'est pas souhaité ici. EAP-MD5 est vulnérable aux attaques par dictionnaire et ne chiffre pas. LEAP est propriétaire Cisco et obsolète.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q41',
    phaseId: 'phase-01',
    lessonId: 'p1-network-security',
    question:
      'Un analyste réseau remarque qu\'un poste interne envoie des requêtes DNS inhabituellement longues et fréquentes vers un serveur externe. Les réponses contiennent des données encodées. Quelle technique d\'exfiltration est probablement utilisée ?',
    options: [
      'DNS Amplification',
      'DNS Tunneling',
      'DNS Cache Poisoning',
      'DNS Zone Transfer',
    ],
    correctIndex: 1,
    explanation:
      'Le DNS Tunneling utilise le protocole DNS pour transférer clandestinement des données en les encodant dans les requêtes et réponses DNS. C\'est une technique d\'exfiltration difficile à détecter car le DNS est rarement bloqué par les pare-feu. L\'amplification DNS est une attaque DDoS. Le cache poisoning redirige le trafic. Le zone transfer copie les enregistrements DNS.',
    difficulty: 'hard',
  },

  // p1-threat-analysis (hard: 1)
  {
    id: 'p1-q42',
    phaseId: 'phase-01',
    lessonId: 'p1-threat-analysis',
    question:
      'Votre équipe SOC détecte un malware qui a modifié le MBR (Master Boot Record) du disque dur d\'un serveur pour se charger avant le système d\'exploitation. Quel type de malware est le PLUS probable ?',
    options: [
      'Un ransomware classique',
      'Un rootkit de type bootkit',
      'Un ver réseau (worm)',
      'Un cheval de Troie (trojan)',
    ],
    correctIndex: 1,
    explanation:
      'Un bootkit est un type de rootkit qui infecte le MBR ou le VBR pour se charger avant le système d\'exploitation, le rendant invisible pour les antivirus classiques. Un ransomware chiffre les fichiers mais ne modifie généralement pas le MBR. Un ver se propage via le réseau. Un trojan se déguise en logiciel légitime.',
    difficulty: 'hard',
  },

  // p1-risk-management (hard: 1)
  {
    id: 'p1-q43',
    phaseId: 'phase-01',
    lessonId: 'p1-risk-management',
    question:
      'Votre SIEM génère une alerte indiquant que 500 tentatives de connexion échouées ont été détectées sur le serveur VPN en 10 minutes depuis une seule adresse IP. L\'analyste doit prioriser cette alerte. Quel type de corrélation le SIEM a-t-il effectué ?',
    options: [
      'Corrélation basée sur les signatures',
      'Corrélation basée sur les seuils (threshold-based)',
      'Corrélation séquentielle',
      'Corrélation statistique bayésienne',
    ],
    correctIndex: 1,
    explanation:
      'La corrélation basée sur les seuils déclenche une alerte quand un événement dépasse un nombre prédéfini (ici, un nombre anormal de tentatives échouées dans une fenêtre de temps). La corrélation par signatures compare à des schémas d\'attaques connus. La corrélation séquentielle analyse l\'ordre des événements.',
    difficulty: 'hard',
  },

  // p1-secure-architecture (hard: 2)
  {
    id: 'p1-q44',
    phaseId: 'phase-01',
    lessonId: 'p1-secure-architecture',
    question:
      'Votre entreprise souhaite protéger ses serveurs contre la perte de données en cas de double panne disque. Le DBA recommande une configuration RAID spécifique utilisant la parité distribuée avec deux disques de parité. Quelle configuration RAID propose-t-il ?',
    options: [
      'RAID 1',
      'RAID 6',
      'RAID 5',
      'RAID 10',
    ],
    correctIndex: 1,
    explanation:
      'RAID 6 utilise une double parité distribuée, permettant de survivre à la défaillance simultanée de deux disques. RAID 5 n\'a qu\'une simple parité et ne tolère qu\'une seule panne disque. RAID 1 est du mirroring (un seul disque de secours). RAID 10 combine mirroring et striping mais ne protège pas si deux disques du même miroir tombent.',
    difficulty: 'hard',
  },
  {
    id: 'p1-q45',
    phaseId: 'phase-01',
    lessonId: 'p1-secure-architecture',
    question:
      'Votre politique de sauvegarde prévoit une sauvegarde complète le dimanche, et des sauvegardes différentielles du lundi au samedi. Le serveur tombe en panne le jeudi soir. Combien de sauvegardes devez-vous restaurer au minimum pour récupérer les données ?',
    options: [
      'Une seule : la dernière sauvegarde différentielle de jeudi',
      'Deux : la complète de dimanche et la différentielle de jeudi',
      'Quatre : la complète de dimanche et les différentielles de lundi, mardi, mercredi et jeudi',
      'Sept : une pour chaque jour de la semaine',
    ],
    correctIndex: 1,
    explanation:
      'Une sauvegarde différentielle contient toutes les modifications depuis la dernière sauvegarde complète. Il suffit donc de restaurer la complète de dimanche puis la différentielle de jeudi (la plus récente). Avec des sauvegardes incrémentales (et non différentielles), il faudrait restaurer la complète plus chaque incrémental intermédiaire.',
    difficulty: 'hard',
  },

  // p1-application-security (hard: 1)
  {
    id: 'p1-q46',
    phaseId: 'phase-01',
    lessonId: 'p1-application-security',
    question:
      'Un développeur souhaite protéger son application web contre les injections SQL, les XSS et les buffer overflows. Quelle approche de développement sécurisé est la PLUS efficace pour couvrir ces trois menaces ?',
    options: [
      'Utiliser un pare-feu applicatif web (WAF) uniquement',
      'Implémenter une validation stricte de toutes les entrées utilisateur (input validation)',
      'Effectuer des tests de pénétration après chaque déploiement',
      'Chiffrer toutes les données en base de données',
    ],
    correctIndex: 1,
    explanation:
      'La validation des entrées est le dénominateur commun de défense contre ces trois attaques : elle empêche les caractères SQL malveillants, neutralise les scripts XSS et vérifie la longueur des données pour éviter les débordements. Un WAF est une couche complémentaire mais ne remplace pas le code sécurisé. Les pentests détectent les failles après coup.',
    difficulty: 'hard',
  },

  // p1-cloud-security (hard: 1)
  {
    id: 'p1-q47',
    phaseId: 'phase-01',
    lessonId: 'p1-cloud-security',
    question:
      'Votre entreprise héberge plusieurs machines virtuelles sur un serveur physique dans le cloud. Un consultant découvre une vulnérabilité permettant à une VM malveillante d\'accéder à la mémoire d\'une autre VM sur le même hôte. Quel composant est défaillant ?',
    options: [
      'Le pare-feu de la VM',
      'L\'hyperviseur',
      'Le système de fichiers partagé',
      'Le module TPM du serveur',
    ],
    correctIndex: 1,
    explanation:
      'L\'hyperviseur est responsable de l\'isolation entre les machines virtuelles. Une faille dans l\'hyperviseur (attaque VM escape) permet à une VM d\'accéder aux ressources d\'autres VM ou du système hôte. C\'est l\'une des vulnérabilités les plus critiques en virtualisation. Le TPM est un module matériel de chiffrement. Le pare-feu filtre le trafic réseau.',
    difficulty: 'hard',
  },
  // p1-physical-iot-security (hard: 1)
  {
    id: 'p1-q48',
    phaseId: 'phase-01',
    lessonId: 'p1-physical-iot-security',
    question:
      'Un ordinateur portable de l\'entreprise est volé. Le disque dur est chiffré avec BitLocker, dont les clés sont stockées dans un composant matériel de la carte mère. Quel composant protège ces clés de chiffrement ?',
    options: [
      'Le BIOS UEFI',
      'Le TPM (Trusted Platform Module)',
      'Le contrôleur RAID',
      'La puce NFC intégrée',
    ],
    correctIndex: 1,
    explanation:
      'Le TPM (Trusted Platform Module) est une puce cryptographique soudée à la carte mère qui stocke les clés de chiffrement, les certificats et les mesures d\'intégrité du système. BitLocker l\'utilise pour sceller les clés de chiffrement du disque. Sans le TPM du portable volé, le voleur ne peut pas déchiffrer le disque, même en le déplaçant vers un autre ordinateur.',
    difficulty: 'hard',
  },

  // p1-incident-response (hard: 1)
  {
    id: 'p1-q49',
    phaseId: 'phase-01',
    lessonId: 'p1-incident-response',
    question:
      'Après un incident de sécurité majeur, votre équipe forensique doit analyser la mémoire vive (RAM) d\'un serveur compromis avant de l\'éteindre. Pourquoi cette capture est-elle considérée comme critique dans l\'investigation ?',
    options: [
      'La RAM contient les fichiers de log du système',
      'La RAM contient des preuves volatiles (processus actifs, connexions réseau, clés de chiffrement) qui disparaissent à l\'extinction',
      'La RAM est le seul endroit où le malware peut résider',
      'La RAM est plus facile à analyser que le disque dur',
    ],
    correctIndex: 1,
    explanation:
      'La mémoire vive contient des données volatiles irremplaçables : processus en cours d\'exécution, connexions réseau actives, clés de chiffrement en mémoire, fragments de malwares fileless. Ces éléments disparaissent définitivement à l\'extinction de la machine. L\'ordre de volatilité (RFC 3227) recommande de capturer la RAM en priorité avant toute autre preuve.',
    difficulty: 'hard',
  },

  // p1-governance-compliance (hard: 1)
  {
    id: 'p1-q50',
    phaseId: 'phase-01',
    lessonId: 'p1-governance-compliance',
    question:
      'Votre entreprise prépare un plan de continuité d\'activité (BCP). Le comité de direction demande de déterminer le temps maximum pendant lequel un système critique peut rester hors service. Quel indicateur devez-vous définir ?',
    options: [
      'RPO (Recovery Point Objective)',
      'RTO (Recovery Time Objective)',
      'MTBF (Mean Time Between Failures)',
      'MTTR (Mean Time To Repair)',
    ],
    correctIndex: 1,
    explanation:
      'Le RTO (Recovery Time Objective) définit la durée maximale d\'interruption acceptable pour un système. Le RPO définit la quantité maximale de données pouvant être perdue (point de restauration). Le MTBF mesure la fiabilité d\'un composant (temps moyen entre pannes). Le MTTR mesure le temps moyen de réparation.',
    difficulty: 'hard',
  },
];

export const phase01Questions: QuizQuestion[] = [
  ...phase01Base,
  ...phase01ExtraA,
  ...phase01ExtraB,
  ...phase01ExtraC,
  ...phase01ExtraD,
  ...phase01ExtraE,
];
