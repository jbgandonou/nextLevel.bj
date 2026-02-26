import { Lesson } from '../../types';

export const threatAnalysis: Lesson = {
  id: 'p1-threat-analysis',
  phaseId: 'phase-01',
  title: 'Analyse des menaces : acteurs, vecteurs d\'attaque et frameworks',
  content: `
## Introduction a l'analyse des menaces

L'analyse des menaces est le pilier central de toute strategie de cybersecurite. Elle consiste a identifier, comprendre, evaluer et anticiper les menaces qui pesent sur une organisation. Ce n'est pas un exercice ponctuel mais un processus **continu et iteratif** qui alimente les decisions de securite a tous les niveaux. Pour le Security+ SY0-701, vous devez maitriser non seulement les categories d'acteurs et de vecteurs, mais aussi les frameworks d'analyse, les types de malwares, les techniques d'ingenierie sociale, et les concepts avances de threat hunting.

L'objectif ultime : passer d'une posture **reactive** (on subit l'attaque puis on reagit) a une posture **proactive** (on anticipe, on chasse les menaces, on reduit la surface d'attaque avant qu'elle ne soit exploitee).

---

## Acteurs de la menace (Threat Actors)

Les acteurs de la menace different par leurs **motivations**, leurs **ressources** et leur **niveau de sophistication**. Comprendre qui vous attaque est essentiel pour adapter vos defenses.

### Categories principales

**APT (Advanced Persistent Threat) / Etats-nations :**
Les plus sophistiques de tous les acteurs. Ils disposent de ressources quasi illimitees, financees par des gouvernements. Leurs objectifs sont geopolitiques : espionnage industriel ou militaire, sabotage d'infrastructures critiques, influence politique. Ils peuvent rester dans un reseau pendant des mois ou des annees sans etre detectes (d'ou le terme "persistent"). Exemples connus : APT28/Fancy Bear (Russie, lie au GRU), APT41/Double Dragon (Chine, combine espionnage et cybercriminalite), Lazarus Group (Coree du Nord, financement du regime via vol de cryptomonnaies), Equation Group (attribue a la NSA).

**Cybercriminels organises :**
Motives exclusivement par le profit financier. Ils fonctionnent comme de veritables entreprises avec des departements specialises : developpement de malwares, distribution, blanchiment d'argent. Le modele **RaaS (Ransomware as a Service)** permet meme a des acteurs peu qualifies d'acheter des kits d'attaque cles en main. Groupes notables : LockBit, BlackCat/ALPHV, Conti (dissous), REvil.

**Hacktivistes :**
Motives par des causes ideologiques, politiques ou sociales. Leurs actions incluent le defacement de sites web, les attaques DDoS, les fuites de donnees (leaks). Exemple historique : Anonymous. Plus recemment, des groupes hacktivistes ont ete actifs dans le contexte du conflit russo-ukrainien (IT Army of Ukraine, Killnet).

**Menaces internes (Insiders) :**
Parmi les plus dangereuses car elles disposent deja d'un acces legitime aux systemes. On distingue :
- **Insider malveillant** : employe qui vole deliberement des donnees ou sabote les systemes (vengeance, appat du gain, espionnage)
- **Insider negligent** : employe qui cause un incident par erreur ou manque de formation (clic sur un phishing, mauvaise configuration)
- **Insider compromis** : compte d'un employe legitime pris en main par un attaquant externe

**Script Kiddies :**
Attaquants peu qualifies qui utilisent des outils et scripts developpes par d'autres. Faible sophistication individuelle, mais peuvent causer des degats significatifs grace a la puissance des outils automatises disponibles en ligne.

**Shadow IT :**
Utilisation non autorisee de services cloud, applications SaaS, appareils personnels. Ce n'est pas un acteur malveillant a proprement parler, mais cela cree des **vulnerabilites non gerees** et des angles morts pour l'equipe de securite.

### Attributs des acteurs (a connaitre pour l'examen)

| Attribut | Description | Echelle |
|----------|------------|---------|
| Localisation | Interne vs Externe | Binaire |
| Sophistication | Capacite technique | Bas a Tres eleve |
| Ressources | Moyens financiers et humains | Limite a Etatique |
| Motivation | Raison de l'attaque | Financiere, ideologique, espionnage, destruction, notoriete |
| Intent | Volonte de nuire | Intentionnel vs Accidentel |

---

## Renseignement sur les menaces (Threat Intelligence)

Le renseignement sur les menaces (Threat Intelligence - TI) consiste a collecter, traiter et analyser des informations sur les menaces pour aider a la prise de decision.

### Les 4 niveaux de Threat Intelligence

**1. Strategique :**
Destinee aux dirigeants et decideurs (CISO, direction generale). Vision de haut niveau des tendances, des motivations des acteurs, et des risques geopolitiques. Format : rapports, briefings. Exemple : "Les attaques ransomware contre le secteur de la sante ont augmente de 74% cette annee."

**2. Tactique :**
Destinee aux architectes et responsables securite. Decrit les TTP (Tactics, Techniques, Procedures) des attaquants. Format : rapports MITRE ATT&CK, profils de groupes APT. Exemple : "Le groupe LockBit utilise la technique T1486 (Data Encrypted for Impact) et exploite les VPN non patches pour l'acces initial."

**3. Operationnelle :**
Destinee aux equipes SOC et IR. Informations sur des campagnes specifiques en cours ou imminentes. Format : bulletins d'alerte, advisories. Exemple : "Une campagne de spear phishing cible actuellement les employes du secteur financier en France avec des documents Word piege exploitant CVE-2024-XXXX."

**4. Technique :**
Destinee aux analystes SOC et outils automatises. Donnees brutes et indicateurs techniques. Format : IoC (hashes, IP, domaines), regles YARA, signatures Snort. Exemple : hash MD5 d'un malware, adresse IP d'un serveur C2.

### OSINT (Open Source Intelligence) - Techniques et outils

L'OSINT consiste a collecter du renseignement a partir de sources ouvertes et publiques.

**Outils OSINT essentiels :**

- **Shodan** : moteur de recherche pour les appareils connectes a Internet. Permet de trouver des serveurs, cameras, systemes SCADA exposes. Recherche par port, service, banner, pays. Un attaquant peut trouver vos serveurs mal configures avant meme de lancer un scan.

- **Maltego** : outil de visualisation et d'analyse de liens. Permet de cartographier les relations entre domaines, adresses IP, emails, comptes de reseaux sociaux, organisations. Utilise des "transforms" pour enrichir automatiquement les donnees.

- **theHarvester** : collecte d'emails, sous-domaines, IP et URLs a partir de sources publiques (moteurs de recherche, DNS, Shodan, etc.). Tres utilise en phase de reconnaissance.

- **SpiderFoot** : automatise la collecte OSINT en interrogeant des centaines de sources. Produit des rapports detailles sur une cible.

- **Have I Been Pwned** : verifie si des identifiants (emails, mots de passe) apparaissent dans des fuites de donnees connues.

- **VirusTotal** : analyse de fichiers et URLs suspects par des dizaines de moteurs antivirus. Permet aussi de verifier des hashes.

- **WHOIS / DNS** : informations sur l'enregistrement des domaines, serveurs DNS, enregistrements MX, SPF, etc.

---

## Indicateurs de Compromission (IoC) vs Indicateurs d'Attaque (IoA)

### IoC (Indicators of Compromise)

Les IoC sont des **preuves techniques qu'une compromission a eu lieu**. Ils sont reactifs par nature : quand on les trouve, l'attaque a deja eu lieu.

**Exemples d'IoC :**
- Hash de fichier malveillant (MD5, SHA-256) : \`e99a18c428cb38d5f260853678922e03\`
- Adresse IP d'un serveur C2 : \`198.51.100.42\`
- Nom de domaine malveillant : \`evil-update.com\`
- URL de phishing : \`https://g00gle-login.fake.com/auth\`
- Cle de registre ajoutee pour la persistance : \`HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\`
- Fichier cree dans un repertoire suspect : \`C:\\Windows\\Temp\\svchost.exe\`
- Trafic DNS anormal (tunneling DNS, requetes vers des domaines DGA)
- User-Agent inhabituel dans les logs web

### IoA (Indicators of Attack)

Les IoA sont des **patterns comportementaux indiquant qu'une attaque est en cours**. Ils sont proactifs : ils permettent de detecter une attaque pendant son execution.

**Exemples d'IoA :**
- Un processus PowerShell execute du code encode en Base64
- Un compte de service tente d'acceder a des fichiers auxquels il n'a jamais accede
- Connexions laterales entre des serveurs qui ne communiquent normalement pas
- Elevation de privileges suivie immediatement d'un acces a des donnees sensibles
- Processus legitime (svchost.exe) lance depuis un repertoire inhabituel
- Exfiltration de donnees via DNS (volume anormal de requetes DNS)

**Difference cle pour l'examen :** Les IoC sont des **artefacts statiques** (reactifs), les IoA sont des **comportements dynamiques** (proactifs). Une strategie de securite mature combine les deux.

---

## Types de malwares - Analyse approfondie

### Malwares classiques

**Virus :**
Programme malveillant qui se **replique en s'attachant a des fichiers legitimes**. Necessite une action de l'utilisateur pour se propager (ouvrir un fichier infecte). Types : virus de boot sector, macro virus (documents Office), virus polymorphe.

**Ver (Worm) :**
Se propage **automatiquement** via le reseau sans intervention humaine. Exploite des vulnerabilites reseau ou des partages ouverts. Exemples historiques : WannaCry (2017, exploitait EternalBlue/MS17-010), Conficker, Slammer.

**Cheval de Troie (Trojan) :**
Se deguise en logiciel legitime pour tromper l'utilisateur. Ne se replique pas. Contient une charge utile (payload) malveillante cachee. Variantes : Trojan bancaire (vol d'identifiants bancaires), Trojan dropper (installe d'autres malwares).

**Ransomware :**
Chiffre les fichiers de la victime et demande une rancon (generalement en cryptomonnaie) pour fournir la cle de dechiffrement. Evolution recente : **double extorsion** (chiffrement + menace de publication des donnees volees) et **triple extorsion** (ajout de DDoS ou menaces aux clients). Exemples : WannaCry, NotPetya, LockBit, BlackCat.

**Rootkit :**
Se cache au niveau le plus profond du systeme pour maintenir un acces persistent tout en etant invisible. Types :
- **User-mode rootkit** : opere au niveau des applications
- **Kernel-mode rootkit** : modifie le noyau du systeme, tres difficile a detecter
- **Bootkits** : infecte le processus de demarrage (MBR/UEFI), charge avant le systeme d'exploitation
Detection : outils specialises (GMER, TDSSKiller), boot sur un media externe

### Malwares avances

**Fileless Malware (malware sans fichier) :**
Reside uniquement en memoire RAM, ne laisse aucun fichier sur le disque. Utilise des outils legitimes du systeme (PowerShell, WMI, macros Office) pour executer du code malveillant. Extremement difficile a detecter par les antivirus traditionnels bases sur les signatures. Exemple : attaques utilisant PowerShell avec \`Invoke-Expression\` et code encode en Base64.

**Logic Bomb (bombe logique) :**
Code malveillant dormant qui se declenche a une condition specifique : une date, la suppression d'un compte utilisateur, une action particuliere. Souvent place par un insider malveillant. Exemple classique : un administrateur programme la suppression de bases de donnees 30 jours apres son licenciement.

**RAT (Remote Access Trojan) :**
Donne a l'attaquant un **controle total a distance** sur la machine infectee : acces au bureau, au systeme de fichiers, a la webcam, au microphone, keylogging. Exemples : DarkComet, njRAT, Cobalt Strike (outil de pentest souvent detourne).

**Keylogger :**
Enregistre toutes les frappes clavier de la victime. Peut etre logiciel (programme installe) ou materiel (dispositif physique entre le clavier et l'ordinateur). Capture les mots de passe, numeros de carte, messages.

**Spyware :**
Collecte des informations sur l'utilisateur sans son consentement : historique de navigation, habitudes d'utilisation, identifiants. Souvent installe via des bundles logiciels.

**Adware :**
Affiche des publicites indesirables. Peut etre simplement ennuyeux ou servir de vecteur pour des malwares plus dangereux via le malvertising (publicites malveillantes).

**Cryptominer (cryptojacking) :**
Utilise les ressources de calcul de la victime (CPU/GPU) pour miner de la cryptomonnaie au profit de l'attaquant. Peut tourner dans le navigateur (JavaScript) ou comme processus systeme. Symptomes : ralentissement, surchauffe, consommation electrique anormale.

**Botnet :**
Reseau d'ordinateurs infectes (bots/zombies) controles a distance par un attaquant (botmaster) via un serveur C2. Utilise pour lancer des attaques DDoS, envoyer du spam, miner de la cryptomonnaie. Exemples : Mirai (infecte des IoT), Emotet (devenu une infrastructure de distribution de malwares).

**Malware polymorphe et metamorphique :**
- **Polymorphe** : change son **apparence** (chiffrement de son code avec une cle differente a chaque replication) mais garde la meme fonctionnalite. Le moteur de dechiffrement reste constant.
- **Metamorphique** : se **reecrit completement** a chaque iteration, changeant sa structure et sa logique tout en conservant sa fonction. Beaucoup plus difficile a detecter que le polymorphe.

---

## Techniques d'ingenierie sociale

L'ingenierie sociale exploite la **psychologie humaine** plutot que les failles techniques. C'est le vecteur d'attaque le plus efficace car il contourne toutes les defenses techniques.

### Techniques detaillees

**Phishing / Spear phishing / Whaling :**
- **Phishing** : emails frauduleux de masse imitant des organisations legitimes
- **Spear phishing** : phishing cible avec des informations personnalisees sur la victime
- **Whaling** : phishing ciblant les cadres dirigeants (CEO, CFO), souvent avec des themes de fusions-acquisitions ou de decisions strategiques
- **Smishing** : phishing par SMS
- **Vishing** : phishing par appel telephonique

**Pretexting :**
L'attaquant cree un **scenario credible** (pretexte) pour manipuler la victime. Il se fait passer pour un collegue, un technicien IT, un auditeur, un policier. Exemple : "Je suis du service informatique, il y a une urgence de securite, j'ai besoin de votre mot de passe pour securiser votre compte."

**Baiting (appat) :**
Offrir quelque chose d'attrayant pour pieger la victime. Exemple physique : laisser une cle USB etiquetee "Salaires 2024" dans le parking de l'entreprise. Exemple numerique : offrir un telechargement gratuit d'un logiciel pirate contenant un malware.

**Quid pro quo :**
Offrir un service en echange d'informations. Exemple : "Je suis du support technique, je peux accelerer votre ordinateur si vous me donnez votre mot de passe."

**Tailgating / Piggybacking :**
- **Tailgating** : suivre une personne autorisee a travers une porte securisee sans s'identifier (a son insu)
- **Piggybacking** : meme chose mais avec le consentement de la personne (par politesse, elle tient la porte)

**Shoulder Surfing :**
Observer par-dessus l'epaule de quelqu'un pour voir son mot de passe, son code PIN, ou des informations confidentielles sur son ecran. Contre-mesures : filtres de confidentialite pour ecrans, vigilance.

**Dumpster Diving :**
Fouiller les poubelles pour trouver des documents contenant des informations sensibles : organigrammes, mots de passe ecrits, documents financiers, anciens disques durs. Contre-mesure : dechiquetage systematique des documents.

**Watering Hole :**
L'attaquant compromet un site web frequemment visite par les employes cibles (forum professionnel, site d'une association du secteur). Les visiteurs sont alors infectes. Tres utilise contre des groupes specifiques difficiles a cibler par phishing.

**Typosquatting / URL Hijacking :**
Enregistrement de noms de domaine ressemblant a des sites legitimes (ex : \`gogle.com\`, \`microsft.com\`, \`amazom.com\`). Les utilisateurs qui font une faute de frappe arrivent sur un site malveillant.

**Pharming :**
Redirection du trafic DNS d'un site legitime vers un faux site, soit par empoisonnement du cache DNS, soit par modification du fichier hosts local. Contrairement au phishing, l'utilisateur tape la bonne URL mais arrive quand meme sur un faux site.

---

## Types d'attaques avancees

### Supply Chain Attacks (attaques de la chaine d'approvisionnement)

Compromission d'un fournisseur ou d'un composant tiers pour atteindre la cible finale. Extremement dangereuses car elles exploitent la **confiance** entre partenaires commerciaux.

**Etude de cas : SolarWinds (2020)**
L'attaque SolarWinds (attribuee au groupe APT29/Cozy Bear, lie au SVR russe) est l'une des attaques supply chain les plus devastatrices de l'histoire :
1. Les attaquants ont compromis le systeme de build de SolarWinds
2. Ils ont insere une backdoor (SUNBURST) dans une mise a jour legitime du logiciel Orion
3. ~18 000 organisations ont installe la mise a jour infectee
4. Parmi les victimes : le Departement du Tresor US, le Departement de la Securite interieure, Microsoft, FireEye
5. L'attaque est restee indetectee pendant environ 9 mois

**Lecons cles :** la verification de l'integrite des mises a jour (signatures, hashes), la segmentation reseau, et le principe du moindre privilege sont essentiels.

### Living-off-the-Land (LOLBins)

Utilisation d'outils et binaires **deja presents** sur le systeme cible pour mener l'attaque. Avantage pour l'attaquant : ces outils sont signes par Microsoft/Apple et donc rarement bloques par les antivirus.

**LOLBins Windows courants :**
- \`PowerShell\` : execution de scripts, telechargement de payloads
- \`certutil.exe\` : telechargement de fichiers, encodage/decodage Base64
- \`mshta.exe\` : execution de fichiers HTA (HTML Applications)
- \`regsvr32.exe\` : execution de code via des DLL
- \`wmic.exe\` : execution de commandes a distance
- \`bitsadmin.exe\` : telechargement de fichiers en arriere-plan

### Zero-Day vs Zero-Click

**Zero-Day :**
Vulnerabilite inconnue du vendeur et pour laquelle aucun correctif n'existe. Le terme "zero-day" signifie que le vendeur a eu zero jours pour corriger le probleme. Extremement precieuses sur le marche noir (marche gris : Zerodium paie jusqu'a 2.5M$ pour un zero-day iOS).

**Zero-Click :**
Attaque qui ne necessite **aucune interaction de la victime**. Pas de clic, pas d'ouverture de fichier. L'exploit se declenche automatiquement (ex : reception d'un iMessage ou d'un appel WhatsApp). Exemple celebre : Pegasus (NSO Group) qui exploitait des zero-click sur iOS et Android pour espionner des journalistes et activistes.

---

## MITRE ATT&CK Framework - Utilisation pratique

### Structure du framework

MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) est une **base de connaissances** qui catalogue les tactiques et techniques des attaquants reels observees dans la nature.

**Les 14 tactiques ATT&CK (Enterprise) :**
1. **Reconnaissance** : collecte d'informations sur la cible
2. **Resource Development** : preparation des ressources (domaines, comptes, outils)
3. **Initial Access** : acces initial au reseau cible
4. **Execution** : execution de code malveillant
5. **Persistence** : maintien de l'acces
6. **Privilege Escalation** : obtention de privileges superieurs
7. **Defense Evasion** : contournement des defenses
8. **Credential Access** : vol d'identifiants
9. **Discovery** : exploration du reseau compromis
10. **Lateral Movement** : deplacement dans le reseau
11. **Collection** : collecte de donnees cibles
12. **Command and Control (C2)** : communication avec l'infrastructure de l'attaquant
13. **Exfiltration** : extraction des donnees volees
14. **Impact** : destruction, chiffrement, manipulation

### Comment mapper une attaque avec ATT&CK

\`\`\`
Scenario : Attaque ransomware sur un hopital

1. Reconnaissance (T1598) : Spearphishing via emails collectes sur LinkedIn
2. Initial Access (T1566.001) : Piece jointe Word avec macro malveillante
3. Execution (T1059.001) : Macro lance PowerShell encode en Base64
4. Persistence (T1547.001) : Cle de registre Run ajoutee
5. Privilege Escalation (T1068) : Exploit de vulnerabilite locale
6. Defense Evasion (T1562.001) : Desactivation de Windows Defender
7. Credential Access (T1003.001) : Dump LSASS avec Mimikatz
8. Discovery (T1018) : Scan des machines du reseau avec nltest
9. Lateral Movement (T1021.002) : Connexion SMB avec identifiants voles
10. Collection (T1005) : Collecte des fichiers des partages reseau
11. C2 (T1071.001) : Communication HTTPS vers domaine DGA
12. Exfiltration (T1048) : Upload des donnees vers serveur externe
13. Impact (T1486) : Chiffrement des fichiers avec ransomware
\`\`\`

### ATT&CK Navigator

L'ATT&CK Navigator est un outil web gratuit qui permet de **visualiser et annoter** la matrice ATT&CK :
- Colorier les techniques utilisees par un groupe specifique
- Comparer la couverture de vos defenses avec les techniques connues
- Planifier les priorites de detection
- Documenter les capacites de votre SOC

Utilisation pratique : charger la couverture de vos regles SIEM dans Navigator pour identifier les **gaps de detection** (techniques non couvertes).

---

## Threat Hunting (chasse aux menaces)

Le threat hunting est une approche **proactive** de recherche de menaces qui auraient echappe aux defenses automatisees. Contrairement a la detection passive (alertes SIEM), le hunting implique une recherche active menee par un analyste.

### Approches de Threat Hunting

**1. Hypothesis-Driven (basee sur des hypotheses) :**
L'analyste formule une hypothese basee sur le renseignement sur les menaces et la cherche a confirmer ou infirmer. Exemple : "Le groupe APT29 cible notre secteur. Ils utilisent PowerShell pour le mouvement lateral. Recherchons des executions PowerShell inhabituelles sur les serveurs."

**2. IoC-Driven (basee sur les indicateurs) :**
Recherche d'indicateurs specifiques (hashes, IP, domaines) fournis par des flux de threat intelligence. Exemple : nouveau rapport indique que le hash SHA-256 \`abc123...\` est associe a un malware actif - recherche dans les logs et le SIEM.

**3. ML-Driven (basee sur le machine learning) :**
Utilisation d'algorithmes pour detecter des **anomalies** dans les donnees : comportement utilisateur inhabituel (UEBA - User and Entity Behavior Analytics), trafic reseau anormal, processus suspects. L'algorithme etablit une baseline de comportement normal et alerte sur les deviations.

---

## Gestion de la surface d'attaque

La surface d'attaque represente l'ensemble des **points d'entree potentiels** qu'un attaquant peut exploiter. L'ASM (Attack Surface Management) vise a la cartographier, la reduire et la surveiller en continu.

**Composantes de la surface d'attaque :**
- **Surface externe** : services exposes sur Internet (sites web, API, VPN, serveurs email)
- **Surface interne** : reseau interne, applications, partages, Active Directory
- **Surface humaine** : employes susceptibles a l'ingenierie sociale
- **Surface logicielle** : toutes les applications et leurs dependances (supply chain)
- **Surface physique** : acces physiques aux locaux et equipements

**Reduction de la surface d'attaque :**
- Fermer les ports et services inutiles
- Segmenter le reseau
- Appliquer le principe du moindre privilege
- Desinstaller les logiciels non utilises
- Durcir les configurations (hardening)
- Auditer et supprimer les comptes inactifs

---

## Types de vulnerabilites

**Zero-Day :** Vulnerabilite inconnue du vendeur, sans correctif disponible. Seule la detection comportementale peut aider.

**Race Condition (condition de concurrence) :** Deux processus accedent a la meme ressource simultanement. Si l'ordre d'execution n'est pas controle, cela peut mener a un comportement imprevu. Sous-type important : **TOCTOU (Time of Check to Time of Use)** - la verification de securite et l'utilisation de la ressource ne sont pas atomiques.

**Improper Input Handling (gestion inadequate des entrees) :** L'application ne valide pas correctement les donnees fournies par l'utilisateur. A l'origine des injections SQL, XSS, buffer overflow, path traversal. La regle d'or : **ne jamais faire confiance aux entrees utilisateur**.

**Memory Corruption (corruption de memoire) :** Inclut le buffer overflow, le heap overflow, l'use-after-free. Permet a un attaquant d'executer du code arbitraire ou de faire planter l'application.

**Privilege Escalation (elevation de privileges) :**
- **Verticale** : un utilisateur standard obtient des droits administrateur
- **Horizontale** : un utilisateur accede aux donnees d'un autre utilisateur de meme niveau

**Insecure Deserialization (deserialisation non securisee) :** Quand une application deserialise des donnees non fiables sans validation, un attaquant peut injecter des objets malveillants qui s'executent lors de la deserialisation. Present dans le OWASP Top 10.

---

## Scenario pratique d'examen

\`\`\`
SCENARIO : Votre SIEM alerte sur de multiples tentatives de connexion echouees
provenant de differents pays ciblant un compte executif (CFO).

Analyse :
1. TYPE DE MENACE : Probable attaque par credential stuffing ou password spraying
   ciblent un compte a haute valeur (CFO = whaling target)

2. IoC IDENTIFIES :
   - Echecs de connexion depuis des IP geographiquement dispersees
   - Volume anormal de tentatives sur un seul compte
   - Potentiel utilisation de VPN/proxies pour masquer l'origine

3. IoA :
   - Pattern d'attaque distribue (plusieurs pays = botnet ou proxies)
   - Ciblage specifique d'un cadre dirigeant (reconnaissance prealable)

4. MAPPING ATT&CK :
   - T1110.004 : Credential Stuffing
   - T1589 : Gather Victim Identity Information (phase prealable)

5. ACTIONS IMMEDIATES :
   - Bloquer les IP sources
   - Forcer un reset de mot de passe pour le compte CFO
   - Activer le MFA si pas deja fait
   - Verifier si le mot de passe du CFO apparait dans des fuites connues
   - Alerter le CFO sur le risque de spear phishing/vishing de suivi

6. INVESTIGATION :
   - Verifier si d'autres comptes executifs sont cibles
   - Rechercher ces IP dans les threat intelligence feeds
   - Verifier les logs d'acces reussis depuis ces IP sur d'autres services
   - Verifier les logs VPN pour des connexions suspectes du compte CFO
\`\`\`

---

## Rappels cles SY0-501 (Darril Gibson)

**Points cles du chapitre 6 du livre :**

- Les virus necessite un hote (fichier executable) pour se propager. Les vers se propagent de maniere autonome sur le reseau
- Les chevaux de Troie (Trojans) se deguisent en logiciels legitimites. Un RAT (Remote Access Trojan) donne un acces a distance a l'attaquant
- Le ransomware chiffre les donnees et demande une rancon. La MEILLEURE defense est un plan de sauvegarde solide
- Un rootkit s'installe au niveau le plus profond du systeme (noyau, firmware). Il est extremement difficile a detecter
- Les attaques de type watering hole ciblent des sites web frequentes par le groupe vise
- Le spear phishing est une attaque de phishing ciblee visant une personne ou un groupe specifique
- Le vishing utilise le telephone (Voice phishing), le smishing utilise les SMS
- L'ingenierie sociale exploite la confiance humaine. Le pretexting cree un scenario fictif pour manipuler la victime
- Le tailgating (ou piggybacking) consiste a suivre une personne autorisee pour entrer dans une zone securisee
- Le shoulder surfing consiste a observer par-dessus l'epaule pour voir des informations confidentielles
- Le dumpster diving est la recherche d'informations sensibles dans les poubelles

**Scenarios pratiques du livre :**

*Scenario :* Un employe recoit un email pretendant venir de son PDG demandant un virement urgent → C'est du spear phishing (whaling si cible un cadre superieur). Verifier l'identite de l'expediteur par un autre canal

*Scenario :* Un malware se connecte a des serveurs distants et votre antivirus ne le detecte pas → C'est probablement un RAT. Utiliser netstat pour identifier les connexions actives suspectes
`,
  keyPoints: [
    'Les acteurs de la menace se distinguent par leur sophistication, leurs ressources et leur motivation. Les APT/Etats-nations sont les plus avances, mais les insiders sont parmi les plus dangereux grace a leur acces privilegie.',
    'Le renseignement sur les menaces (Threat Intelligence) se decline en 4 niveaux : strategique (dirigeants), tactique (TTP), operationnel (campagnes en cours) et technique (IoC). Chaque niveau sert un public different.',
    'Les IoC sont des preuves reactives de compromission (hashes, IP, domaines), tandis que les IoA sont des patterns comportementaux proactifs detectant les attaques en cours.',
    'Les malwares fileless, polymorphes et metamorphiques echappent aux antivirus bases sur les signatures. Les LOLBins utilisent des outils systeme legitimes, rendant la detection encore plus difficile.',
    'Les attaques supply chain (ex: SolarWinds) compromettent un fournisseur de confiance pour atteindre des milliers de cibles. Les zero-click (ex: Pegasus) ne necessitent aucune interaction de la victime.',
    'MITRE ATT&CK organise les attaques en 14 tactiques. L\'ATT&CK Navigator permet de visualiser la couverture defensive et d\'identifier les gaps de detection.',
    'Le threat hunting est proactif : il recherche activement les menaces via des hypotheses, des IoC, ou du machine learning (UEBA) plutot que d\'attendre les alertes.',
    'La gestion de la surface d\'attaque (ASM) cartographie tous les points d\'entree (externe, interne, humain, logiciel, physique) pour les reduire et les surveiller.',
    'SY0-501 : Les virus necessitent un hote pour se propager, les vers sont autonomes. Le ransomware se combat avec des sauvegardes solides. Les rootkits s\'installent au niveau noyau/firmware.',
    'SY0-501 : Le spear phishing cible une personne specifique, le whaling cible les dirigeants. Le pretexting, tailgating, shoulder surfing et dumpster diving sont des techniques d\'ingenierie sociale physique.',
  ],
  resources: [
    {
      title: 'MITRE ATT&CK - Base de connaissances',
      url: 'https://attack.mitre.org/',
      type: 'tool',
    },
    {
      title: 'Lockheed Martin - Cyber Kill Chain',
      url: 'https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html',
      type: 'article',
    },
    {
      title: 'CompTIA Security+ SY0-701 - Threat Actors and Vectors (Professor Messer)',
      url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/threat-actors/',
      type: 'video',
    },
    {
      title: 'ATT&CK Navigator - Outil de visualisation',
      url: 'https://mitre-attack.github.io/attack-navigator/',
      type: 'tool',
    },
    {
      title: 'Shodan - Moteur de recherche IoT',
      url: 'https://www.shodan.io/',
      type: 'tool',
    },
    {
      title: 'SANS - Threat Hunting Guide',
      url: 'https://www.sans.org/white-papers/threat-hunting/',
      type: 'article',
    },
  ],
  estimatedMinutes: 50,
};
