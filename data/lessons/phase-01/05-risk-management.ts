import { Lesson } from '../../types';

export const riskManagement: Lesson = {
  id: 'p1-risk-management',
  phaseId: 'phase-01',
  title: 'Gestion des risques : frameworks, evaluation et vulnerabilites',
  content: `
## Introduction a la gestion des risques

La gestion des risques est le processus systematique d'identification, d'evaluation, de traitement et de surveillance des risques lies a la securite de l'information. C'est un domaine fondamental du Security+ SY0-701 car il constitue le **pont entre la technique et la gouvernance**. Un professionnel de la cybersecurite ne se contente pas de deployer des outils : il doit savoir evaluer les risques, les quantifier, les prioriser et recommander des mesures proportionnees au contexte metier.

La gestion des risques repond a la question fondamentale : **"Ou investir nos ressources limitees de securite pour obtenir la meilleure protection possible ?"**

---

## Concepts fondamentaux

### Terminologie essentielle

- **Menace (Threat)** : tout evenement ou action pouvant causer un dommage (ransomware, tremblement de terre, erreur humaine)
- **Vulnerabilite (Vulnerability)** : faiblesse exploitable dans un systeme (logiciel non patche, mauvaise configuration, personnel non forme)
- **Risque (Risk)** : probabilite qu'une menace exploite une vulnerabilite ET l'impact resultant
- **Actif (Asset)** : tout ce qui a de la valeur pour l'organisation (donnees, systemes, personnel, reputation)
- **Controle (Control / Countermeasure)** : mesure de securite reduisant le risque
- **Risque inherent** : niveau de risque avant application des controles
- **Risque residuel** : niveau de risque apres application des controles. Doit etre formellement accepte par la direction.
- **Appetit pour le risque (Risk Appetite)** : niveau de risque global qu'une organisation est prete a accepter
- **Tolerance au risque (Risk Tolerance)** : variation acceptable autour de l'appetit pour le risque

\`\`\`
Formule fondamentale :
Risque = Menace x Vulnerabilite x Impact

En termes quantitatifs :
SLE = AV x EF
ALE = ARO x SLE

Ou :
  AV  = Asset Value (valeur de l'actif)
  EF  = Exposure Factor (pourcentage de perte, de 0% a 100%)
  SLE = Single Loss Expectancy (perte pour un incident unique)
  ARO = Annual Rate of Occurrence (frequence annuelle de l'incident)
  ALE = Annual Loss Expectancy (perte annuelle attendue)
\`\`\`

---

## Methodologies d'evaluation des risques

### Comparaison des frameworks d'evaluation

| Framework | Type | Approche | Utilisation typique |
|-----------|------|----------|-------------------|
| NIST SP 800-30 | Qualitative/Quantitative | Identification des menaces, vulnerabilites et impacts | Organisations gouvernementales US |
| OCTAVE | Qualitative | Centree sur les actifs et les processus metier | PME a grandes entreprises |
| FAIR | Quantitative | Analyse financiere du risque cyber | Justification d'investissements |
| CRAMM | Qualitative/Quantitative | Methodologie structuree en 3 phases | Organisations UK/Europe |

**NIST SP 800-30 (Guide for Conducting Risk Assessments) :**
Processus en 4 etapes :
1. **Preparer** l'evaluation : definir le perimetre, identifier les sources de menaces
2. **Conduire** l'evaluation : identifier les vulnerabilites, determiner la vraisemblance et l'impact
3. **Communiquer** les resultats : rapport avec les risques priorises
4. **Maintenir** l'evaluation : mise a jour continue

**OCTAVE (Operationally Critical Threat, Asset, and Vulnerability Evaluation) :**
Developpee par le CERT/CC de Carnegie Mellon. Se concentre sur les **actifs operationnels critiques** et implique les equipes metier dans l'evaluation. Trois variantes : OCTAVE (grandes organisations), OCTAVE-S (PME), OCTAVE Allegro (simplifiee).

**FAIR (Factor Analysis of Information Risk) :**
Seul framework purement **quantitatif** et standard ouvert (Open FAIR). Decompose le risque en facteurs mesurables :
- **Loss Event Frequency** (frequence des evenements de perte)
- **Loss Magnitude** (ampleur de la perte)
Permet de produire des analyses financieres du risque cyber exploitables par les dirigeants.

**CRAMM (CCTA Risk Analysis and Management Method) :**
Methodologie en 3 phases : identification et valorisation des actifs, analyse des menaces et vulnerabilites, selection des contre-mesures. Tres structuree et detaillee.

---

## Analyse quantitative approfondie

L'analyse quantitative attribue des **valeurs monetaires** aux risques. Elle est plus precise mais necessite des donnees fiables.

### Exemple 1 : Serveur web e-commerce

\`\`\`
Actif : Serveur web e-commerce
Valeur de l'actif (AV) = 500 000 EUR
(inclut le materiel, les donnees, et le manque a gagner en cas d'indisponibilite)

Menace : Compromission par injection SQL
Facteur d'exposition (EF) = 60% (perte de donnees clients + amendes RGPD)
SLE = 500 000 x 0.60 = 300 000 EUR

Frequence annuelle estimee (ARO) = 0.5 (une fois tous les 2 ans)
ALE = 0.5 x 300 000 = 150 000 EUR/an

Decision : Un WAF (Web Application Firewall) coutant 30 000 EUR/an
qui reduit l'ARO a 0.05 est largement justifie.
Nouveau ALE = 0.05 x 300 000 = 15 000 EUR/an
Economie = 150 000 - 15 000 - 30 000 = 105 000 EUR/an
\`\`\`

### Exemple 2 : Laptop d'employe

\`\`\`
Actif : Laptop d'employe avec donnees confidentielles
AV = 2 000 EUR (materiel) + 50 000 EUR (donnees) = 52 000 EUR
Menace : Vol physique
EF = 80% (le laptop et les donnees sont perdus)
SLE = 52 000 x 0.80 = 41 600 EUR
ARO = 0.1 (un vol pour 10 employes par an)
ALE = 0.1 x 41 600 = 4 160 EUR/an par laptop

Controle : Chiffrement complet du disque (BitLocker/FileVault)
Cout = 0 EUR (integre aux OS modernes) + 500 EUR de deploiement/an
Le chiffrement reduit l'EF a 5% (le materiel est perdu mais les donnees sont protegees)
Nouveau SLE = 52 000 x 0.05 = 2 600 EUR
Nouveau ALE = 0.1 x 2 600 = 260 EUR/an
Economie = 4 160 - 260 - 500 = 3 400 EUR/an par laptop
\`\`\`

### Exemple 3 : Ransomware sur l'infrastructure

\`\`\`
Actif : Infrastructure IT complete
AV = 2 000 000 EUR (systemes + donnees + interruption d'activite)
Menace : Attaque ransomware
EF = 70%
SLE = 2 000 000 x 0.70 = 1 400 000 EUR
ARO = 0.3 (environ une attaque tous les 3 ans dans le secteur)
ALE = 0.3 x 1 400 000 = 420 000 EUR/an

Controles recommandes :
- EDR avance : 80 000 EUR/an
- Formation anti-phishing : 20 000 EUR/an
- Backups offline testes : 50 000 EUR/an
- Segmentation reseau : 30 000 EUR/an (amortissement)
Total controles : 180 000 EUR/an

Si ces controles reduisent l'ARO a 0.05 et l'EF a 30% :
Nouveau SLE = 2 000 000 x 0.30 = 600 000 EUR
Nouveau ALE = 0.05 x 600 000 = 30 000 EUR/an
Economie nette = 420 000 - 30 000 - 180 000 = 210 000 EUR/an
\`\`\`

### Matrice de risques 5x5

L'approche qualitative utilise une matrice combinant **vraisemblance** et **impact** :

\`\`\`
           IMPACT
           Negligeable  Mineur  Modere  Majeur  Critique
V  Tres      Faible     Faible  Moyen   Eleve   Eleve
R  probable
A
I  Probable  Faible     Moyen   Moyen   Eleve   Critique
S
E  Possible  Faible     Faible  Moyen   Eleve   Eleve
M
B  Peu       Faible     Faible  Faible  Moyen   Moyen
L  probable
A
N  Rare      Faible     Faible  Faible  Faible  Moyen
C
E

Faible   = Accepter ou surveiller
Moyen    = Attenuer si possible
Eleve    = Attenuer obligatoirement
Critique = Action immediate requise
\`\`\`

---

## Traitement des risques

Quatre options de traitement (a connaitre absolument pour l'examen) :

- **Attenuation (Mitigation)** : reduire le risque en implementant des controles (pare-feu, patching, formation). C'est l'option la plus courante.
- **Transfert** : transferer le risque a un tiers (assurance cyber, externalisation a un MSSP). Le risque n'est pas elimine mais partage.
- **Acceptation** : accepter le risque tel quel si son niveau est juge acceptable. **Doit etre documente et approuve par la direction.**
- **Evitement** : eliminer le risque en supprimant l'activite ou l'actif (ne pas stocker certaines donnees, ne pas offrir certains services).

Le **registre des risques** (Risk Register) centralise tous les risques identifies avec : description, proprietaire, evaluation (vraisemblance x impact), traitement choisi, controles implementes, risque residuel, statut.

---

## Business Impact Analysis (BIA)

Le BIA identifie les **fonctions metier critiques** et determine l'impact d'une interruption sur l'organisation. C'est la base de la planification de continuite d'activite.

### Metriques essentielles du BIA

**RTO (Recovery Time Objective) :**
Duree maximale acceptable d'interruption d'un service. "Combien de temps peut-on se permettre que ce systeme soit hors service ?"
Exemple : RTO du site e-commerce = 2 heures. Au-dela, les pertes deviennent inacceptables.

**RPO (Recovery Point Objective) :**
Quantite maximale de donnees pouvant etre perdue, exprimee en temps. "Jusqu'a quand dans le passe accepte-t-on de perdre des donnees ?"
Exemple : RPO = 4 heures signifie que les sauvegardes doivent avoir lieu au moins toutes les 4 heures.

**MTTR (Mean Time To Repair/Recover) :**
Temps moyen necessaire pour reparer un composant defaillant et restaurer le service. Doit etre inferieur ou egal au RTO.

**MTBF (Mean Time Between Failures) :**
Temps moyen entre deux pannes d'un composant. Mesure la **fiabilite**. Un MTBF eleve = composant fiable.

**MTTF (Mean Time To Failure) :**
Similaire au MTBF mais pour les composants non reparables.

\`\`\`
Exemple pratique :
Systeme de paiement en ligne :
  RTO = 1 heure (au-dela, perte de revenus significative)
  RPO = 15 minutes (transactions financieres, perte minimale toleree)
  MTTR actuel = 45 minutes (dans le RTO)
  MTBF = 2000 heures (environ 83 jours)

Implications :
  - Les sauvegardes doivent avoir lieu au moins toutes les 15 minutes
  - La restauration doit etre possible en moins d'1 heure
  - Tester regulierement les procedures de restauration
\`\`\`

---

## Disaster Recovery (DR) vs Business Continuity Planning (BCP)

### Differences cles

| Aspect | DR (Disaster Recovery) | BCP (Business Continuity) |
|--------|----------------------|--------------------------|
| Focus | Restauration des systemes IT | Continuite de TOUTES les fonctions metier |
| Perimetre | Technique | Organisationnel (IT + processus + personnel) |
| Quand | Apres le desastre | Pendant et apres le desastre |
| Objectif | Remettre les systemes en marche | Maintenir les operations critiques |

### Sites de reprise

| Type | Description | RTO | Cout | Equipement |
|------|------------|-----|------|------------|
| **Hot Site** | Replique complete, donnees synchronisees en temps reel | Minutes a heures | Tres eleve | Tout pret, donnees a jour |
| **Warm Site** | Infrastructure de base, equipement disponible mais donnees non a jour | Heures a jours | Moyen | Equipement present, donnees a restaurer |
| **Cold Site** | Local vide avec alimentation et connectivite | Jours a semaines | Faible | Rien d'installe, tout a deployer |
| **Cloud Site** | Infrastructure cloud scalable | Minutes a heures | Variable (pay-as-you-go) | Virtuel, deploiement automatise |

---

## Strategies de sauvegarde

| Type | Description | Temps backup | Temps restauration | Stockage |
|------|------------|-------------|-------------------|----------|
| **Full (Complete)** | Copie integrale de toutes les donnees | Long | Court (1 seul jeu) | Eleve |
| **Incremental** | Copie uniquement des donnees modifiees depuis le DERNIER backup (full ou incremental) | Court | Long (full + tous les incrementaux) | Faible |
| **Differential** | Copie des donnees modifiees depuis le DERNIER FULL backup | Moyen (augmente) | Moyen (full + dernier differentiel) | Moyen |
| **Snapshot** | Image instantanee de l'etat du systeme a un moment donne | Tres court | Court | Variable |

\`\`\`
Exemple de planification de backup :
Lundi    : Full backup (10 Go)
Mardi    : Incremental (0.5 Go de modifications depuis lundi)
Mercredi : Incremental (0.3 Go de modifications depuis mardi)
Jeudi    : Incremental (0.7 Go de modifications depuis mercredi)

Pour restaurer jeudi soir :
  Incremental : Full (lundi) + Inc (mardi) + Inc (mercredi) + Inc (jeudi) = 4 operations
  Si c'etait Differential :
  Full (lundi) + Diff (jeudi) = 2 operations seulement (mais le diff jeudi = 1.5 Go)
\`\`\`

**Regle 3-2-1 des sauvegardes :**
- **3** copies des donnees (1 originale + 2 sauvegardes)
- **2** types de supports differents (disque + bande, disque + cloud)
- **1** copie hors site (contre les desastres physiques)

Evolution : regle **3-2-1-1-0** : ajouter 1 copie offline/air-gapped (contre les ransomwares) et 0 erreurs de restauration (tests reguliers).

---

## Classification des donnees

### Classification gouvernementale (US)

| Niveau | Description | Consequence d'une fuite |
|--------|------------|------------------------|
| **Top Secret** | Dommages exceptionnellement graves a la securite nationale | Guerre, perte de vies |
| **Secret** | Dommages serieux a la securite nationale | Perturbation majeure des relations diplomatiques |
| **Confidential** | Dommages a la securite nationale | Impacts significatifs |
| **Unclassified** | Pas de classification mais peut etre sensible (CUI, FOUO) | Variable |

### Classification corporate (entreprise)

| Niveau | Description | Exemples | Acces |
|--------|------------|---------|-------|
| **Restricted / Restreint** | Hautement sensible, acces tres limite | Secrets commerciaux, donnees M&A, cles de chiffrement | Need-to-know strictement |
| **Confidential** | Sensible, acces controle | Donnees RH, salaires, donnees clients, contrats | Equipes autorisees |
| **Internal / Interne** | Usage interne uniquement | Procedures, annuaire, communications internes | Tous les employes |
| **Public** | Accessible a tous | Site web, brochures, communiques de presse | Tout le monde |

---

## Roles lies aux donnees

| Role | Responsabilite | Exemple concret |
|------|---------------|----------------|
| **Data Owner** | Determine la classification et les regles d'acces. Responsable final. Generalement un cadre dirigeant. | Le VP Finance est owner des donnees financieres |
| **Data Custodian** | Gere techniquement les donnees (stockage, sauvegardes, securite). Execute les decisions du owner. | L'equipe IT qui gere les serveurs de base de donnees |
| **Data Processor** | Traite les donnees pour le compte du controller (terme RGPD). | Un prestataire cloud qui heberge vos donnees |
| **Data Controller** | Determine les finalites et moyens du traitement des donnees (terme RGPD). | Votre entreprise qui collecte les donnees clients |
| **Data Steward** | Assure la qualite, la coherence et la conformite des donnees au quotidien. | Un analyste qui verifie l'integrite des bases de donnees |
| **DPO (Data Protection Officer)** | Responsable de la conformite en matiere de protection des donnees. Obligatoire sous RGPD dans certains cas. | Le DPO qui supervise la conformite RGPD |

---

## Cycle de vie des donnees

Le cycle de vie couvre toutes les etapes de l'existence des donnees, chacune avec ses exigences de securite :

1. **Creation / Collecte** : Classification immediate, application des controles d'acces, chiffrement si necessaire. Respecter le principe de **minimisation des donnees** (ne collecter que ce qui est necessaire).

2. **Stockage** : Chiffrement au repos (AES-256), controles d'acces (RBAC), sauvegardes, journalisation des acces, localisation geographique conforme (RGPD : donnees des residents EU dans l'EU sauf clauses contractuelles).

3. **Utilisation / Traitement** : Chiffrement en transit (TLS), controles d'acces applicatifs, journalisation des modifications, DLP (Data Loss Prevention) pour empecher les fuites.

4. **Partage / Transmission** : Chiffrement de bout en bout, protocoles securises (SFTP, HTTPS), accords de partage de donnees, verification des autorisations du destinataire.

5. **Archivage** : Stockage longue duree avec acces restreint, verification periodique de l'integrite, respect des delais de retention legaux.

6. **Destruction** : Methodes de destruction irreversibles, certificat de destruction, mise a jour de l'inventaire des actifs.

### Methodes de destruction securisee des donnees

| Methode | Description | Support | Verification |
|---------|------------|---------|-------------|
| **Degaussing** | Exposition a un champ magnetique puissant qui efface les donnees | Disques magnetiques, bandes | Verification par scan post-degaussage |
| **Shredding (dechiquetage)** | Destruction physique du support en morceaux | Disques, SSD, papier, CD/DVD | Inspection visuelle |
| **Cryptographic Erasure** | Destruction de la cle de chiffrement rendant les donnees illisibles | Tout support chiffre | Verification que la cle est detruite |
| **Overwriting** | Ecriture de donnees aleatoires sur l'integralite du support | Disques magnetiques | Verification par outil specialise |
| **Purging** | Effacement approfondi rendant la recuperation impossible meme en laboratoire | Tout support | Certification par outil |

**Attention :** Le simple formatage ou la suppression de fichiers n'est **PAS** une destruction securisee. Les donnees restent recuperables.

**SSD specifique :** Le degaussage ne fonctionne pas sur les SSD (pas de support magnetique). Utiliser le secure erase du fabricant, la crypto erasure, ou la destruction physique.

---

## Gestion des risques tiers (Third-Party Risk Management)

### Evaluation des fournisseurs

Avant de confier des donnees ou l'acces a un tiers, une evaluation rigoureuse est necessaire :

- **Questionnaire de securite** : SOC 2 Type II, ISO 27001, reponses aux questionnaires SIG/CAIQ
- **Audit du droit d'audit (Right to Audit)** : clause contractuelle permettant d'auditer les pratiques de securite du fournisseur
- **SLA (Service Level Agreement)** : engagement sur la disponibilite, le temps de reponse, les penalites
- **Pentest et scan de vulnerabilites** : evaluer la posture de securite technique
- **Evaluation de la stabilite financiere** : un fournisseur en difficulte financiere peut negliger la securite
- **Clause de notification de breach** : obligation de notifier en cas d'incident (delai precis)

### Supply Chain Risk (risque de la chaine d'approvisionnement)

- **Software Bill of Materials (SBOM)** : inventaire de toutes les dependances logicielles. Permet d'identifier rapidement les composants vulnerables (ex : log4j).
- **Code signing** : verification de l'integrite et de l'authenticite du code recu de fournisseurs
- **Diversification des fournisseurs** : ne pas dependre d'un seul fournisseur critique
- **Evaluation continue** : la posture de securite d'un fournisseur peut changer dans le temps

---

## Programme de sensibilisation a la securite

Un programme efficace de **Security Awareness Training** est un controle administratif essentiel :

**Composantes :**
- **Formation initiale** : pour tous les nouveaux employes (onboarding)
- **Formation continue** : rappels reguliers, mises a jour sur les nouvelles menaces
- **Simulations de phishing** : tests reguliers avec reporting des taux de clic
- **Formation role-specifique** : developpeurs (secure coding), administrateurs (hardening), direction (risques strategiques)
- **Gamification** : quizz, challenges, recompenses pour maintenir l'engagement
- **Metriques** : taux de signalement de phishing, taux de clic sur les simulations, resultats des quizz

---

## Gestion du changement (Change Management)

Le processus de gestion du changement est critique pour la securite car les **modifications non controlees** sont une source majeure d'incidents.

**Processus standard :**
1. **Demande de changement (RFC)** : description, justification, impact
2. **Evaluation** : analyse de l'impact sur la securite, les performances, la disponibilite
3. **Approbation** : par le CAB (Change Advisory Board) selon la criticite
4. **Implementation** : pendant une fenetre de maintenance planifiee
5. **Test et verification** : confirmer que le changement fonctionne et ne cree pas de regression
6. **Documentation** : mise a jour de la CMDB et des procedures
7. **Rollback plan** : procedure de retour en arriere en cas de probleme

**Types de changement :**
- **Standard** : pre-approuve, faible risque, procedure documentee (ex : ajout d'un utilisateur)
- **Normal** : suit le processus complet (RFC, evaluation, CAB)
- **Emergency** : contourne le processus normal pour une urgence (ex : patch zero-day critique), avec revue post-implementation obligatoire

---

## NIST SP 800-53 - Familles de controles

Le NIST SP 800-53 contient plus de 1000 controles de securite organises en 20 familles :

| Code | Famille | Exemples |
|------|---------|---------|
| AC | Access Control | Moindre privilege, separation des fonctions, MFA |
| AT | Awareness and Training | Formation securite, sensibilisation |
| AU | Audit and Accountability | Journalisation, revue des logs, non-repudiation |
| CA | Assessment, Authorization and Monitoring | Evaluation des controles, autorisation d'exploitation |
| CM | Configuration Management | Baseline de configuration, gestion du changement |
| CP | Contingency Planning | Plans de continuite, sauvegardes, sites de reprise |
| IA | Identification and Authentication | Gestion des identites, authentification, MFA |
| IR | Incident Response | Procedures IR, exercices, reporting |
| MA | Maintenance | Maintenance preventive, acces distant pour maintenance |
| MP | Media Protection | Chiffrement des supports, destruction securisee |
| PE | Physical and Environmental | Controle d'acces physique, surveillance, protection incendie |
| PL | Planning | Plans de securite, regles de comportement |
| PM | Program Management | Strategie de securite, gestion du programme |
| PS | Personnel Security | Verification des antecedents, accords de confidentialite |
| PT | PII Processing and Transparency | Protection des donnees personnelles |
| RA | Risk Assessment | Evaluation des risques, scan de vulnerabilites |
| SA | System and Services Acquisition | Cycle de developpement securise, gestion des fournisseurs |
| SC | System and Communications Protection | Chiffrement, segmentation, protection du perimetre |
| SI | System and Information Integrity | Patching, antimalware, detection d'intrusion |
| SR | Supply Chain Risk Management | Evaluation des fournisseurs, SBOM |

---

## PCI DSS - 12 exigences principales

Le PCI DSS (Payment Card Industry Data Security Standard) s'applique a toute organisation qui traite, stocke ou transmet des donnees de cartes de paiement :

1. Installer et maintenir des **pare-feu** pour proteger les donnees des titulaires de cartes
2. Ne pas utiliser les **mots de passe par defaut** des fournisseurs
3. Proteger les **donnees stockees** des titulaires de cartes (chiffrement, masquage, tokenisation)
4. **Chiffrer** les transmissions des donnees de cartes sur les reseaux publics (TLS)
5. Proteger les systemes contre les **malwares** et mettre a jour les antivirus
6. Developper et maintenir des **systemes securises** (patching, secure coding)
7. Restreindre l'acces aux donnees selon le **besoin d'en connaitre**
8. Identifier et authentifier l'acces aux composants systeme (**authentification unique**)
9. Restreindre l'**acces physique** aux donnees des titulaires de cartes
10. **Tracer et surveiller** tous les acces aux ressources reseau et aux donnees
11. **Tester** regulierement les systemes et processus de securite (pentests, scans)
12. Maintenir une **politique de securite** de l'information pour tout le personnel

---

## Concepts de confidentialite et vie privee

### Principes fondamentaux (RGPD et standards internationaux)

- **Minimisation des donnees** : ne collecter que les donnees strictement necessaires a la finalite declaree
- **Limitation des finalites** : utiliser les donnees uniquement pour la finalite pour laquelle elles ont ete collectees
- **Consentement** : le traitement doit reposer sur une base legale (consentement explicite, interet legitime, obligation legale, etc.)
- **Droit d'acces** : la personne peut demander une copie de ses donnees
- **Droit a l'effacement (droit a l'oubli)** : RGPD Article 17, la personne peut demander la suppression de ses donnees
- **Portabilite des donnees** : la personne peut obtenir ses donnees dans un format structure et lisible
- **Privacy by Design** : integrer la protection des donnees des la conception des systemes (pas apres coup)
- **Privacy by Default** : les parametres les plus protecteurs doivent etre appliques par defaut

---

## Frameworks et controles de securite

### NIST Cybersecurity Framework (CSF) 2.0

Six fonctions principales :
1. **Govern** : etablir la gouvernance cybersecurite (nouveau dans la version 2.0)
2. **Identify** : comprendre les actifs, les risques et l'environnement
3. **Protect** : implementer les mesures de protection
4. **Detect** : detecter les evenements de securite
5. **Respond** : repondre aux incidents
6. **Recover** : restaurer les capacites apres un incident

### NIST SP 800-37 - Risk Management Framework (RMF)

7 etapes : **Prepare** -> **Categorize** -> **Select** -> **Implement** -> **Assess** -> **Authorize** -> **Monitor**

### ISO 27001 / 27002

- **ISO 27001** : standard international pour les SMSI (Systemes de Management de la Securite de l'Information). Certifiable.
- **ISO 27002** : guide de bonnes pratiques detaillant les controles.
- **ISO 27005** : gestion des risques de securite de l'information.
- Base sur le cycle PDCA (Plan-Do-Check-Act).

### Autres frameworks

- **CIS Controls** : 18 controles prioritaires classes par niveau de maturite. Pragmatique et oriente action.
- **COBIT** : framework de gouvernance IT alignant la securite avec les objectifs metier.
- **SOC 2** : rapports d'audit bases sur 5 criteres de confiance (securite, disponibilite, integrite de traitement, confidentialite, vie privee).

---

## Gestion des vulnerabilites

**Cycle de gestion des vulnerabilites :**
1. **Decouverte** : inventaire des actifs et scan de vulnerabilites
2. **Evaluation** : priorisation selon le score CVSS et le contexte metier
3. **Remediation** : patching, reconfiguration, ou controle compensatoire
4. **Verification** : re-scan pour confirmer la correction
5. **Reporting** : communication des resultats et metriques

**CVSS (Common Vulnerability Scoring System)** : score de 0.0 a 10.0
- None (0), Low (0.1-3.9), Medium (4.0-6.9), High (7.0-8.9), Critical (9.0-10.0)

**CVE (Common Vulnerabilities and Exposures)** : identifiants uniques (ex : CVE-2021-44228 pour log4j).

### Types de controles de securite

**Par fonction :**
- **Preventif** : empeche un incident (pare-feu, MFA, formation)
- **Detectif** : detecte un incident en cours (IDS, SIEM, audit de logs)
- **Correctif** : corrige apres un incident (restauration de backup, patching)
- **Dissuasif (Deterrent)** : decourage les attaquants (cameras, bannieres d'avertissement)
- **Compensatoire** : alternative quand le controle principal n'est pas realisable
- **Directive** : politique ou procedure indiquant le comportement attendu

**Par nature :**
- **Technique** : implemente par la technologie (chiffrement, pare-feu, IDS)
- **Administratif / Managerial** : politiques et procedures (politique de mots de passe, formation)
- **Physique** : protection physique (serrures, badges, cameras, clotures)
- **Operationnel** : operations quotidiennes executees par les personnes (revue des logs, patrouilles)

---

## Scenario pratique d'examen

\`\`\`
SCENARIO : Le RPO de votre entreprise est de 4 heures pour les systemes
critiques, mais les sauvegardes sont effectuees une seule fois par jour (la nuit).

ANALYSE DU RISQUE :
1. ECART IDENTIFIE :
   - RPO exige = 4 heures
   - Frequence de backup actuelle = 24 heures
   - Ecart = 20 heures de donnees potentiellement perdues

2. IMPACT :
   - Si un incident survient a 17h, la derniere sauvegarde date de 2h du matin
   - 15 heures de donnees seraient perdues (au lieu du maximum tolere de 4h)
   - Pour une entreprise traitant 1000 transactions/heure a 50 EUR/transaction,
     cela represente 15 x 1000 x 50 = 750 000 EUR de donnees en risque

3. RECOMMANDATIONS :
   - Implementer des sauvegardes incrementales toutes les 4 heures (minimum)
   - Idealement toutes les 2 heures pour une marge de securite
   - Envisager la replication en temps reel pour les systemes les plus critiques
   - Tester les restaurations regulierement (le backup non teste = pas de backup)
   - Documenter l'ecart dans le registre des risques jusqu'a la remediation
   - Faire valider l'acceptation temporaire du risque par la direction

4. PRIORITE : Elevee - Non-conformite avec le BIA valide par la direction
\`\`\`

---

## Rappels cles SY0-501 (Darril Gibson)

**Points cles des chapitres 1 et 8 du livre :**

- La triade CIA : Confidentialite (chiffrement, controle d'acces), Integrite (hachage, signatures), Disponibilite (redondance, failover)
- Les controles se classent en trois categories : techniques (technologie), administratifs (procedures), physiques (barrieres tangibles)
- Les controles par fonction : preventifs (hardening, formation), detectifs (logs, IDS, cameras), correctifs (IPS, sauvegardes), dissuasifs et compensatoires
- Desactiver les services inutiles est un controle PREVENTIF pour renforcer un serveur (hardening)
- La virtualisation augmente la disponibilite a moindre cout : snapshots, restauration rapide
- tracert identifie les routeurs entre deux systemes — utile si un routeur non autorise est ajoute au reseau
- L'analyse des risques quantitative utilise SLE, ARO et ALE (ALE = SLE x ARO)
- Les tests de penetration doivent suivre des regles d'engagement definies avant le test
- Les scans de vulnerabilites identifient les faiblesses mais ne les exploitent pas (contrairement au pentest)
- Le SIEM correle les evenements de securite de multiples sources pour identifier les patterns d'attaque

**Scenarios pratiques du livre :**

*Scenario :* Le budget hardware est reduit mais la disponibilite doit etre maintenue → La virtualisation permet de consolider les serveurs et maintenir la disponibilite a moindre cout

*Scenario :* Vous voulez tester de nouveaux controles de securite avant deploiement → La virtualisation offre la plus grande flexibilite (snapshots, revert)

*Scenario :* Un auditeur decouvre des mots de passe de 4 caracteres sur le reseau → Modifier la politique pour augmenter la longueur minimale des mots de passe
`,
  keyPoints: [
    'Le risque se calcule avec ALE = ARO x SLE, ou SLE = AV x EF. Cette formule permet de justifier financierement les investissements en securite en comparant le cout des controles a l\'ALE.',
    'Quatre options de traitement du risque : attenuation, transfert, acceptation et evitement. Le risque residuel doit etre formellement accepte par la direction.',
    'Le BIA definit les metriques critiques : RTO (duree max d\'interruption), RPO (perte de donnees max), MTTR (temps moyen de reparation) et MTBF (temps moyen entre pannes).',
    'Les sites de reprise se classent par cout et rapidite : hot site (minutes, tres cher), warm site (heures, moyen), cold site (jours, economique).',
    'La classification des donnees (gouvernementale et corporate) determine les controles d\'acces et les mesures de protection. Les roles (owner, custodian, controller, processor) definissent les responsabilites.',
    'Le NIST SP 800-53 contient 20 familles de controles couvrant tous les aspects de la securite. PCI DSS impose 12 exigences pour les donnees de cartes de paiement.',
    'Les principes de vie privee (minimisation, limitation des finalites, consentement, privacy by design) sont au coeur du RGPD et sont testes dans le Security+.',
    'La gestion du changement (RFC, CAB, rollback plan) est un controle operationnel essentiel qui previent les incidents causes par des modifications non controlees.',
  ],
  resources: [
    {
      title: 'NIST Cybersecurity Framework 2.0',
      url: 'https://www.nist.gov/cyberframework',
      type: 'article',
    },
    {
      title: 'CompTIA Security+ SY0-701 - Risk Management (Professor Messer)',
      url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/risk-management-types/',
      type: 'video',
    },
    {
      title: 'FIRST - Common Vulnerability Scoring System (CVSS)',
      url: 'https://www.first.org/cvss/',
      type: 'tool',
    },
    {
      title: 'NIST SP 800-30 - Guide for Conducting Risk Assessments',
      url: 'https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final',
      type: 'article',
    },
    {
      title: 'Open FAIR - Factor Analysis of Information Risk',
      url: 'https://www.fairinstitute.org/',
      type: 'article',
    },
  ],
  estimatedMinutes: 50,
};
