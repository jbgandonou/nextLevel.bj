import { Lesson } from '../../types';

export const incidentResponse: Lesson = {
  id: 'p1-incident-response',
  phaseId: 'phase-01',
  title: 'Reponse aux incidents : processus, SIEM, forensics et conformite',
  content: `
## Introduction a la reponse aux incidents

La reponse aux incidents (Incident Response - IR) est la capacite d'une organisation a detecter, contenir et se remettre d'un incident de securite de maniere structuree et documentee. C'est un domaine critique du Security+ SY0-701 car aucune defense n'est parfaite : la question n'est pas **si** un incident se produira, mais **quand**. La maturite d'une organisation se mesure a sa capacite a reagir efficacement sous pression.

Un incident de securite est un evenement qui **compromet ou menace de compromettre** la confidentialite, l'integrite ou la disponibilite des systemes ou des donnees. Il ne faut pas confondre un **evenement** (tout fait observable dans un systeme) avec un **incident** (un evenement qui a un impact negatif sur la securite).

---

## Equipe de reponse aux incidents (CSIRT)

Le CSIRT (Computer Security Incident Response Team) est l'equipe dediee a la gestion des incidents. Sa composition et ses roles doivent etre definis **avant** tout incident.

### Roles cles de l'equipe IR

**Incident Commander (responsable de l'incident) :**
Dirige l'ensemble de la reponse. Prend les decisions critiques (isoler un systeme, informer la direction, activer le DRP). Autorite finale sur les actions a entreprendre. Generalement un responsable securite senior ou le CISO.

**Lead Analyst (analyste principal) :**
Expert technique qui mene l'investigation. Coordonne l'analyse des preuves, identifie la cause racine, determine l'etendue de la compromission. Souvent l'analyste SOC le plus experimente ou un specialiste forensique.

**Communications Lead (responsable communications) :**
Gere toutes les communications internes et externes. Redige les notifications pour la direction, les employes, les clients, les regulateurs et la presse si necessaire. Coordonne avec les equipes juridiques et RP.

**Scribe (documentaliste) :**
Documente chaque action, decision et decouverte en temps reel. Ce journal d'incident est crucial pour le retour d'experience et potentiellement pour les procedures legales. Horodatage precis de chaque evenement.

**Legal Liaison (liaison juridique) :**
Conseille sur les obligations legales (notification RGPD sous 72h, preservation des preuves pour d'eventuelles poursuites). Determine si les forces de l'ordre doivent etre impliquees. Supervise la conformite des actions avec les reglementations.

**Autres roles selon les besoins :**
- Representant IT/Operations : connaissances techniques sur les systemes affectes
- Representant RH : si un insider est implique
- Representant metier : evaluation de l'impact business
- Liaison avec les forces de l'ordre : si action judiciaire

---

## Le processus de reponse aux incidents (NIST SP 800-61)

Le NIST SP 800-61 definit **4 phases** du processus IR, le standard de reference pour le Security+ :

### Phase 1 : Preparation

La preparation est la phase la plus importante. Un incident n'est pas le moment d'improviser.

**Elements cles :**
- Constituer et former l'equipe CSIRT avec des roles clairement definis
- Creer des **playbooks** detailles pour chaque type d'incident (ransomware, phishing, fuite de donnees, DDoS, compromission de compte)
- Deployer et configurer les outils : SIEM, EDR, outils forensiques, sandboxes
- Etablir les canaux de communication securises (ne pas utiliser les systemes potentiellement compromis)
- Definir les seuils de classification et d'escalade
- Conduire des exercices reguliers (tabletop, simulations)
- Maintenir une liste de contacts d'urgence (CSIRT, direction, juridique, assurance cyber, forces de l'ordre, prestataires forensiques)
- Preparer les kits forensiques (supports bootables, write blockers, cables, formulaires de chaine de custody)

### Phase 2 : Detection et Analyse

**Sources de detection :**
- Alertes SIEM et regles de correlation
- Alertes IDS/IPS (reseau et host)
- EDR (Endpoint Detection and Response)
- Signalements des utilisateurs (email suspect, comportement anormal)
- Threat intelligence feeds (nouveaux IoC)
- Analyse proactive (threat hunting)
- Alertes DLP (Data Loss Prevention)
- Alertes des services cloud (AWS GuardDuty, Azure Sentinel)

**Processus d'analyse :**
1. Collecter et verifier les alertes (eliminer les faux positifs)
2. Corroler les evenements de sources multiples
3. Identifier les IoC et les IoA
4. Determiner la portee de l'incident (quels systemes, quelles donnees)
5. Evaluer la severite et classifier l'incident
6. Documenter toutes les decouvertes

### Phase 3 : Confinement, Eradication et Recuperation

**Confinement :**
- **Court terme** : isolation immediate (deconnexion reseau, desactivation de compte, blocage d'IP sur le pare-feu). Objectif : stopper la propagation.
- **Long terme** : mesures temporaires plus durables (segmentation VLAN, mise en quarantaine, redirection DNS). Permettre a l'investigation de continuer.
- **Regle d'or** : preserver les preuves avant toute action destructive. Faire une image forensique avant de nettoyer un systeme.

**Eradication :**
- Supprimer completement le malware, les backdoors, les comptes crees par l'attaquant
- Patcher les vulnerabilites exploitees
- Reinitialiser tous les identifiants potentiellement compromis
- Identifier et corriger la **cause racine** (root cause analysis)
- Verifier qu'il n'y a pas d'autres systemes compromis

**Recuperation :**
- Restaurer les systemes a partir de **backups verifies** (testes et sains)
- Remettre en production **graduellement** avec surveillance renforcee
- Valider le bon fonctionnement de chaque systeme restaure
- Maintenir une surveillance accrue pendant plusieurs semaines

### Phase 4 : Activite post-incident (Lessons Learned)

- Reunion de retour d'experience (post-mortem) dans les 1-2 semaines suivant la resolution
- Rediger le rapport d'incident complet : chronologie, actions, decisions, resultats
- Identifier les ameliorations : processus, outils, formation, detection
- Mettre a jour les playbooks et procedures
- Partager les IoC avec la communaute (ISACs, CERT nationaux) si approprie
- Evaluer les couts de l'incident (directs et indirects)

---

## Architecture SIEM detaillee

Le SIEM (Security Information and Event Management) est le systeme nerveux central du SOC.

### Composants d'architecture

**1. Sources de logs :**
Tout equipement generant des logs : pare-feux, routeurs, switches, serveurs (Windows, Linux), Active Directory, applications web, bases de donnees, services cloud, endpoints (via EDR), serveurs DNS, serveurs de messagerie, proxy web.

**2. Collecteurs (Collectors/Forwarders) :**
Agents ou mecanismes qui collectent les logs et les transmettent au SIEM. Protocoles courants : Syslog (UDP/TCP 514), Syslog-TLS (TCP 6514), Windows Event Forwarding (WEF), API REST pour les services cloud, agents dedies (Splunk Universal Forwarder, Elastic Agent).

**3. Parsers / Normalisateurs :**
Transforment les logs de formats varies (texte libre, JSON, XML, CEF, LEEF) en un format unifie. Extraient les champs pertinents : timestamp, source IP, destination IP, utilisateur, action, resultat.

**4. Moteur de correlation :**
Le cerveau du SIEM. Applique des regles pour detecter des patterns d'attaque en correlant des evenements de sources multiples. Exemples :
- 5 echecs de connexion suivis d'un succes = possible brute force
- Connexion VPN depuis un pays + connexion badge au bureau au meme moment = impossible travel
- Processus PowerShell lance par un document Word = possible macro malveillante

**5. Dashboard / Interface :**
Visualisation en temps reel de la posture de securite, des alertes actives, des tendances. Permet le triage, l'investigation et le reporting.

**6. Stockage et retention :**
Stockage des logs pour analyse historique et conformite. PCI DSS exige 1 an de retention. RGPD impose des limites sur la conservation des donnees personnelles dans les logs.

### Cas d'utilisation SIEM courants

**Detection de brute force :**
\`\`\`
Regle : SI (EventID 4625 > 10 en 5 minutes depuis la meme IP source)
        ET (EventID 4624 depuis cette meme IP dans les 10 minutes suivantes)
        ALORS -> Alerte "Brute Force potentiellement reussie" (P2)
\`\`\`

**Detection d'exfiltration de donnees :**
\`\`\`
Regle : SI (volume de donnees sortantes > 500 Mo en 1 heure)
        ET (destination = IP externe non repertoriee)
        ET (heure = en dehors des heures de bureau)
        ALORS -> Alerte "Possible exfiltration de donnees" (P1)
\`\`\`

**Detection de mouvement lateral :**
\`\`\`
Regle : SI (EventID 4648 - Connexion avec identifiants explicites)
        ET (source = poste utilisateur standard)
        ET (destination = serveur critique)
        ET (utilisateur != administrateur autorise)
        ALORS -> Alerte "Mouvement lateral suspect" (P2)
\`\`\`

**Detection d'escalade de privileges :**
\`\`\`
Regle : SI (EventID 4672 - Privileges speciaux attribues)
        ET (utilisateur n'est pas dans la liste des admins autorises)
        OU (EventID 4720 - Creation de compte) en dehors des heures de bureau
        ALORS -> Alerte "Escalade de privileges suspecte" (P1)
\`\`\`

---

## SOAR (Security Orchestration, Automation and Response)

Le SOAR automatise et orchestre les processus de reponse aux incidents, reduisant le temps de reaction et la charge sur les analystes.

**Composantes :**
- **Orchestration** : connecte et coordonne les outils de securite (SIEM, EDR, pare-feu, ticketing, threat intelligence)
- **Automation** : execute automatiquement des playbooks predifinis en reponse aux alertes
- **Response** : actions automatisees ou semi-automatisees (bloquer une IP, isoler un endpoint, desactiver un compte)

**Exemples de playbooks automatises :**
- Alerte phishing -> extraction automatique des URLs et pieces jointes -> analyse en sandbox -> si malveillant : bloquer l'expediteur, supprimer l'email de toutes les boites, alerter les utilisateurs qui ont clique
- Alerte malware sur endpoint -> isolation automatique du poste -> scan complet -> collecte des artefacts forensiques -> creation de ticket

**Solutions SOAR courantes :** Palo Alto XSOAR, Splunk SOAR, IBM Resilient, Swimlane.

---

## EDR vs XDR vs MDR

| Solution | Description | Couverture | Gestion |
|----------|------------|-----------|---------|
| **EDR** (Endpoint Detection and Response) | Detection et reponse sur les **endpoints** (postes, serveurs). Surveillance des processus, fichiers, registre, connexions reseau. | Endpoints uniquement | Equipe interne |
| **XDR** (Extended Detection and Response) | Etend l'EDR au **reseau, cloud, email, identites**. Correlation multi-sources pour une vision unifiee. | Multi-couche (endpoint + reseau + cloud) | Equipe interne |
| **MDR** (Managed Detection and Response) | Service **gere par un tiers** (MSSP). L'equipe du prestataire surveille, detecte et repond aux incidents 24/7. | Variable (EDR ou XDR gere) | Equipe externe (MSSP) |

**Quand choisir quoi :**
- **EDR** : si vous avez une equipe SOC et voulez la visibilite endpoints
- **XDR** : si vous voulez une detection unifiee across tous les vecteurs
- **MDR** : si vous n'avez pas d'equipe SOC interne ou voulez une couverture 24/7

---

## Digital Forensics - Investigation approfondie

### Forensique disque

**Imaging avec dd :**
\`\`\`bash
# Creer une image bit-a-bit du disque
dd if=/dev/sda of=/evidence/disk_image.dd bs=4096 conv=noerror,sync

# Calculer le hash pour verifier l'integrite
sha256sum /dev/sda > /evidence/original_hash.txt
sha256sum /evidence/disk_image.dd > /evidence/image_hash.txt

# Les deux hashes doivent etre identiques
\`\`\`

**FTK Imager :**
Outil graphique de reference pour la creation d'images forensiques. Supporte les formats E01 (EnCase), AFF, dd. Permet de visualiser le contenu sans modifier l'original. Calcule automatiquement les hashes MD5 et SHA-1.

### Forensique memoire

**Volatility Framework** - Commandes essentielles :
\`\`\`bash
# Identifier le profil du systeme (OS et version)
volatility -f memory.dmp imageinfo

# Lister tous les processus en cours
volatility -f memory.dmp --profile=Win10x64 pslist

# Detecter les processus caches (rootkits)
volatility -f memory.dmp --profile=Win10x64 psscan

# Lister les connexions reseau actives
volatility -f memory.dmp --profile=Win10x64 netscan

# Extraire les hashes de mots de passe
volatility -f memory.dmp --profile=Win10x64 hashdump

# Detecter les injections de code dans les processus
volatility -f memory.dmp --profile=Win10x64 malfind

# Lister les DLL chargees par un processus
volatility -f memory.dmp --profile=Win10x64 dlllist -p 1234

# Timeline des evenements
volatility -f memory.dmp --profile=Win10x64 timeliner
\`\`\`

### Forensique reseau

**Filtres Wireshark utiles pour l'investigation :**
\`\`\`
# Trafic HTTP contenant des telecharges suspects
http.request.method == "POST" && http.content_type contains "application"

# Communications vers un C2 connu
ip.dst == 198.51.100.42

# Trafic DNS suspect (tunneling DNS - requetes anormalement longues)
dns.qry.name.len > 50

# Tentatives de connexion SMB (mouvement lateral)
tcp.dstport == 445

# Trafic chiffre vers des ports non standards
tls && tcp.dstport != 443

# Scan de ports (SYN sans ACK)
tcp.flags.syn == 1 && tcp.flags.ack == 0

# Exfiltration via ICMP (payload inhabituellement grand)
icmp && data.len > 64
\`\`\`

---

## Gestion des preuves

### Legal Hold (conservation legale)

Obligation de preserver toutes les donnees potentiellement pertinentes dans le cadre d'une procedure juridique (litige, enquete reglementaire). Suspend les politiques normales de retention et de destruction des donnees. Le non-respect peut entrainer des sanctions judiciaires (spoliation des preuves).

### Chaine de custody (Chain of Custody)

Formulaire documentant chaque transfert de preuve :
\`\`\`
FORMULAIRE DE CHAINE DE CUSTODY (exemple)
-----------------------------------------
Numero de piece a conviction : EVD-2024-0042
Description : Disque dur Seagate 2TB, S/N: WD-XXXX1234
Date de collecte : 2024-03-15 14:32 UTC
Collecte par : Jean Dupont (Analyste IR)
Hash SHA-256 : a7f3b2c1d4e5f6...

Historique des transferts :
| Date/Heure      | De            | A              | Raison          | Signature |
|-----------------|---------------|----------------|-----------------|-----------|
| 2024-03-15 14:32| Scene         | J. Dupont      | Collecte initiale| JD       |
| 2024-03-15 15:00| J. Dupont     | Coffre evidence| Stockage securise| JD       |
| 2024-03-16 09:00| Coffre        | M. Martin      | Analyse forensique| MM      |
| 2024-03-16 18:00| M. Martin     | Coffre evidence| Retour stockage  | MM       |
\`\`\`

### Write Blockers

Dispositifs (materiels ou logiciels) qui empechent toute **ecriture** sur un support de stockage lors de l'analyse forensique. Garantissent l'integrite de la preuve originale. Le write blocker materiel est prefere car il est independant du systeme d'exploitation et plus fiable juridiquement.

### Poste de travail forensique

Station dediee a l'analyse des preuves :
- Isolee du reseau de production
- Equipee de write blockers
- Outils forensiques installes et licencies (EnCase, FTK, Autopsy, Volatility)
- Capacite de stockage importante
- Documentation de la configuration et des outils (version, licence, validation)

---

## Types de logs et leur valeur securitaire

### Windows Event Logs - Event IDs critiques

| Event ID | Description | Valeur securitaire |
|----------|------------|-------------------|
| **4624** | Connexion reussie | Suivi des acces, detection d'acces non autorises |
| **4625** | Echec de connexion | Detection de brute force, password spraying |
| **4648** | Connexion avec identifiants explicites (runas) | Detection de mouvement lateral |
| **4672** | Privileges speciaux attribues a une nouvelle session | Detection d'escalade de privileges |
| **4720** | Creation d'un compte utilisateur | Detection de persistance, comptes backdoor |
| **4724** | Tentative de reinitialisation de mot de passe | Acces non autorise a des comptes |
| **4732** | Ajout d'un membre a un groupe de securite local | Escalade de privileges |
| **4688** | Nouveau processus cree | Execution de malware, LOLBins |
| **1102** | Journal d'audit efface | Tentative de destruction de preuves |
| **7045** | Nouveau service installe | Persistance, backdoor |

### Logs Linux (syslog)

- **/var/log/auth.log** (ou /var/log/secure) : authentifications, sudo, SSH
- **/var/log/syslog** (ou /var/log/messages) : evenements systeme generaux
- **/var/log/kern.log** : messages du noyau
- **/var/log/cron** : execution des taches planifiees (detection de persistance)
- **/var/log/apache2/access.log** : acces web (detection de scans, injections)

### Autres logs

- **Logs pare-feu** : connexions acceptees/refusees, regles declenchees
- **Logs proxy web** : URLs visitees, categories, telechargements
- **Logs DNS** : requetes resolues (detection de C2, DGA, tunneling DNS)
- **Logs VPN** : connexions distantes, geolocalisation
- **Logs email** : expediteurs, destinataires, pieces jointes, resultats SPF/DKIM/DMARC

---

## Classification et severite des incidents

### Niveaux de severite

| Niveau | Description | Exemple | Temps de reponse | Escalade |
|--------|------------|---------|-----------------|----------|
| **P1 - Critique** | Impact majeur sur les operations, donnees sensibles compromises | Ransomware actif, fuite massive de donnees | Immediat (< 15 min) | CISO, Direction, Juridique |
| **P2 - Eleve** | Impact significatif, systeme critique affecte | Compromission d'un serveur, malware actif | < 1 heure | Responsable SOC, Responsable IT |
| **P3 - Moyen** | Impact limite, systeme non critique | Phishing isole, malware contenu | < 4 heures | Analyste senior |
| **P4 - Faible** | Impact minimal, pas de compromission confirmee | Scan de ports, tentative de phishing bloquee | < 24 heures | Analyste SOC |

---

## Plan de communication

### Communication interne

- **Equipe IR** : mises a jour en temps reel via canal securise dedie
- **Direction / CISO** : briefings reguliers (toutes les heures pour P1, quotidiens pour P2)
- **Equipes IT** : instructions techniques specifiques (isolation, patching, restauration)
- **Employes** : communication factuelle et rassurante, instructions claires (ne pas eteindre les postes, changer les mots de passe)
- **RH** : si un insider est implique

### Communication externe

- **Regulateurs** : notification obligatoire sous 72h pour le RGPD (Article 33), "sans retard indu" pour PCI DSS
- **Clients / personnes concernees** : RGPD Article 34, notification si risque eleve pour les droits et libertes
- **Forces de l'ordre** : si acte criminel ou si exige par la loi
- **Assurance cyber** : notification immediate pour activer la couverture
- **Presse / public** : via le service de communication, messages controles, ne jamais specule sur les details techniques en public
- **CERT national** : partage d'IoC et de TTPs pour la communaute

---

## Exercices de simulation (Tabletop Exercises)

### Qu'est-ce qu'un tabletop exercise ?

Un exercice de simulation est une **discussion structuree** ou l'equipe IR parcourt un scenario d'incident fictif etape par etape, sans toucher aux systemes reels. L'objectif est de tester les processus, les roles et la prise de decision.

### Comment les conduire

1. **Preparer le scenario** : realiste et adapte au contexte de l'organisation (ransomware, fuite de donnees, compromission insider)
2. **Reunir les participants** : equipe IR, direction, juridique, communication, IT
3. **Presenter le scenario** par etapes, en introduisant des complications au fur et a mesure
4. **Poser des questions** a chaque etape : "Qui fait quoi ? Qui est notifie ? Quels outils utilise-t-on ?"
5. **Documenter** les decisions, les lacunes identifiees et les disagreements
6. **Debriefer** : identifier les points forts et les ameliorations
7. **Mettre a jour** les playbooks et procedures en consequence

**Frequence recommandee** : au moins 2 fois par an, plus souvent pour les organisations a haut risque. Varier les scenarios a chaque exercice.

---

## Conformite reglementaire approfondie

### RGPD - Articles cles pour le Security+

**Article 6 - Bases legales du traitement :**
Six bases legales autorisent le traitement de donnees personnelles : consentement, execution d'un contrat, obligation legale, interet vital, mission d'interet public, interet legitime. Le consentement doit etre libre, specifique, eclaire et univoque.

**Article 17 - Droit a l'effacement (droit a l'oubli) :**
La personne concernee peut demander l'effacement de ses donnees dans certains cas (consentement retire, donnees plus necessaires, traitement illicite). Des exceptions existent (obligation legale, interet public, defense de droits en justice).

**Article 25 - Protection des donnees des la conception (Privacy by Design/Default) :**
Le responsable du traitement doit integrer la protection des donnees des la conception du systeme (pseudonymisation, minimisation) et appliquer les parametres les plus protecteurs par defaut.

**Article 32 - Securite du traitement :**
Mesures techniques et organisationnelles appropriees : pseudonymisation, chiffrement, capacite a assurer la confidentialite/integrite/disponibilite, capacite a restaurer les donnees, tests reguliers des mesures.

**Article 33 - Notification a l'autorite de controle :**
En cas de violation de donnees, notification a la CNIL (ou autorite equivalente) **dans les 72 heures** apres en avoir pris connaissance. Sauf si la violation n'est pas susceptible d'engendrer un risque pour les droits et libertes.

**Article 34 - Communication a la personne concernee :**
Si la violation engendre un **risque eleve** pour les droits et libertes, les personnes concernees doivent etre informees "dans les meilleurs delais".

### PCI DSS - Points cles

- 12 exigences organisees en 6 objectifs
- S'applique a toute entite qui stocke, traite ou transmet des donnees de cartes
- Niveaux de conformite bases sur le volume de transactions
- Sanctions : amendes, augmentation des frais de traitement, interdiction d'accepter les cartes
- Exige des tests de penetration annuels et des scans de vulnerabilites trimestriels

### HIPAA - Points cles

- Protege les **PHI (Protected Health Information)** aux Etats-Unis
- **Privacy Rule** : regit l'utilisation et la divulgation des PHI
- **Security Rule** : exigences techniques pour proteger les ePHI (electronic PHI)
- **Breach Notification Rule** : notification en cas de fuite de PHI
- **Safe Harbor** : si les donnees sont correctement chiffrees (selon les standards NIST), une fuite peut ne pas etre consideree comme un breach notifiable

---

## Frameworks de gouvernance

### Comparaison COBIT vs ITIL vs NIST

| Aspect | COBIT | ITIL | NIST CSF |
|--------|-------|------|----------|
| **Focus** | Gouvernance IT globale | Gestion des services IT | Securite informatique |
| **Editeur** | ISACA | Axelos (PeopleCert) | NIST (gouvernement US) |
| **Approche** | Alignement IT/metier | Meilleures pratiques de service management | Gestion des risques cyber |
| **Certification** | Organisation et individuelle | Individuelle | Pas de certification officielle |
| **Utilisation** | Audit IT, gouvernance | Operations IT, support | Programme de cybersecurite |
| **Complement** | Avec NIST pour la securite | Avec COBIT pour la gouvernance | Avec ISO 27001 pour la certification |

### Types d'audits

**Audit interne :**
Conduit par les auditeurs internes de l'organisation. Objectif : verifier la conformite aux politiques internes, identifier les ecarts, recommander des ameliorations. Avantage : connaissance approfondie de l'organisation. Limite : independance potentiellement reduite.

**Audit externe :**
Conduit par un cabinet independant (Big Four, firmes specialisees). Objectif : fournir une assurance independante aux parties prenantes (direction, actionnaires, regulateurs). Exemples : audit SOC 2 Type II, audit ISO 27001.

**Audit reglementaire :**
Conduit par un regulateur ou une autorite de controle. Objectif : verifier la conformite a une reglementation specifique. Exemples : audit PCI DSS par un QSA (Qualified Security Assessor), controle CNIL pour le RGPD.

**Audit de conformite :**
Verifie la conformite a un standard ou une reglementation specifique. Peut etre interne ou externe. Produit un rapport avec les ecarts identifies et les recommandations.

---

## Protection des donnees et vie privee

### Privacy by Design - 7 principes fondamentaux

1. **Proactif et non reactif** : prevenir les problemes avant qu'ils ne surviennent
2. **Protection par defaut** : les parametres les plus protecteurs sont appliques par defaut
3. **Integration dans la conception** : la vie privee fait partie de l'architecture, pas un ajout
4. **Somme positive** : securite ET vie privee, pas l'un au detriment de l'autre
5. **Protection de bout en bout** : tout le cycle de vie des donnees est couvert
6. **Visibilite et transparence** : les pratiques sont documentees et verifiables
7. **Respect de l'utilisateur** : l'utilisateur garde le controle de ses donnees

### DPIA (Data Protection Impact Assessment)

Evaluation d'impact sur la protection des donnees, obligatoire sous RGPD quand le traitement est susceptible d'engendrer un **risque eleve** pour les droits et libertes (Article 35).

**Quand un DPIA est obligatoire :**
- Evaluation ou scoring systematique de personnes
- Traitement a grande echelle de donnees sensibles
- Surveillance systematique a grande echelle d'une zone accessible au public
- Nouvelles technologies avec un impact significatif sur la vie privee

**Contenu du DPIA :**
- Description du traitement et de ses finalites
- Evaluation de la necessite et de la proportionnalite
- Evaluation des risques pour les droits et libertes
- Mesures pour attenuer les risques identifies

---

## Types de politiques de securite

| Politique | Description | Contenu type |
|-----------|------------|-------------|
| **AUP (Acceptable Use Policy)** | Regles d'utilisation acceptable des ressources IT | Ce qui est autorise/interdit, utilisation personnelle, surveillance |
| **Politique de mots de passe** | Exigences pour les mots de passe | Longueur minimale, complexite, rotation, interdictions |
| **Politique BYOD** | Regles pour les appareils personnels | Inscription MDM, chiffrement obligatoire, separation donnees pro/perso |
| **Politique d'acces distant** | Regles pour le teletravail et l'acces VPN | VPN obligatoire, MFA, restrictions horaires, posture de securite |
| **Politique de gestion des donnees** | Classification, stockage, partage, destruction | Niveaux de classification, regles de partage, retention |
| **Politique de reponse aux incidents** | Cadre general de l'IR | Roles, escalade, communication, preservation des preuves |
| **Politique de sauvegarde** | Frequence, types, retention des backups | RPO, stockage, tests de restauration, chiffrement |
| **Politique de changement** | Processus de gestion du changement | RFC, CAB, tests, rollback, documentation |

---

## Scenario pratique d'examen

\`\`\`
SCENARIO : Ransomware a chiffre 50% des serveurs de fichiers a 2h du matin.
L'equipe de nuit detecte l'incident via une alerte SIEM.

DEROULEMENT COMPLET DU PROCESSUS IR :

PHASE 2 - DETECTION ET ANALYSE (2h00 - 2h30) :
- T+0 : Alerte SIEM - volume anormal de modifications de fichiers
  (EventID 4663 en masse + extensions .encrypted)
- T+5min : Analyste SOC de nuit confirme l'incident -> classification P1
- T+10min : Activation de la chaine d'escalade P1
  -> Incident Commander notifie + Lead Analyst appele
- T+15min : Identification du ransomware via la note de rancon
  et les IoC (hash du binaire, extension des fichiers chiffres)
- T+20min : Mapping initial de l'etendue : 50% des file servers,
  Active Directory semble intact
- T+30min : Recherche du patient zero via les logs EDR
  -> poste de comptabilite infecte via piece jointe email a 23h

PHASE 3A - CONFINEMENT (2h30 - 3h30) :
- Isolation immediate des serveurs de fichiers infectes (deconnexion reseau)
- Isolation du poste patient zero
- Blocage des communications vers les IP C2 identifiees sur le pare-feu
- Desactivation du compte utilisateur compromis
- Verification que les sauvegardes sont intactes et non chiffrees
  (backups offline/air-gapped : OK)
- Segmentation reseau renforcee pour proteger les serveurs restants

PHASE 3B - ERADICATION (3h30 - 8h00) :
- Image forensique du poste patient zero (avant nettoyage)
- Scan complet de tous les endpoints avec signatures mises a jour
- Identification de la vulnerabilite exploitee : macro Word + PowerShell
  -> pas de patch manquant mais protection des macros insuffisante
- Verification de l'AD : pas de comptes backdoor, pas de GPO modifiees
- Reinitialisation des mots de passe des comptes administrateurs

PHASE 3C - RECUPERATION (8h00 - 20h00) :
- Restauration des serveurs de fichiers depuis les backups offline (J-1)
- Perte de donnees : ~3h de travail (backup de 23h, infection a 23h,
  mais l'utilisateur avait travaille tard)
- Verification de l'integrite des fichiers restaures
- Remise en production graduelle avec surveillance renforcee
- Deploiement de regles EDR specifiques au ransomware identifie

PHASE 4 - POST-INCIDENT (J+7) :
- Post-mortem : identification des lacunes
  -> macro Office non bloquees, pas de sandboxing email
  -> RPO respecte (backup quotidien pour RPO 24h)
  -> RTO depasse : 18h au lieu de 8h prevues
- Actions correctives :
  -> Blocage des macros par GPO sauf exception validee
  -> Deploiement d'une sandbox email
  -> Tests de restauration trimestriels (au lieu d'annuels)
  -> Formation anti-phishing renforcee pour les equipes comptables
- Partage des IoC avec l'ISAC sectoriel

COMMUNICATIONS :
- T+1h : Direction informee par l'Incident Commander
- T+4h : Notification a l'assurance cyber
- T+24h : Evaluation RGPD -> pas de donnees personnelles exfiltrees
  (chiffrement uniquement, pas de double extorsion) -> pas de
  notification Article 33 requise mais documentation dans le registre
- T+48h : Communication aux employes sur les mesures correctives
\`\`\`
`,
  keyPoints: [
    'Le processus IR du NIST SP 800-61 comporte 4 phases : Preparation, Detection/Analyse, Confinement/Eradication/Recuperation, et Activite post-incident (Lessons Learned). La preparation est la phase la plus critique.',
    'L\'equipe CSIRT comprend des roles definis : Incident Commander (decisions), Lead Analyst (technique), Communications Lead (notifications), Scribe (documentation), Legal Liaison (conformite).',
    'Le SIEM centralise et correle les logs via 5 composants : collecteurs, parsers, moteur de correlation, dashboard et stockage. Les Event IDs Windows cles : 4624 (succes), 4625 (echec), 4672 (privileges), 4720 (creation compte).',
    'EDR (endpoints), XDR (multi-couche) et MDR (gere par un tiers) sont trois approches complementaires. Le SOAR automatise les playbooks de reponse pour reduire le temps de reaction.',
    'En forensics, l\'integrite des preuves est primordiale : images bit-a-bit avec dd/FTK Imager, chaine de custody, write blockers, analyse memoire avec Volatility. Toujours travailler sur des copies.',
    'Les incidents se classent de P1 (critique, reponse immediate) a P4 (faible, sous 24h). Le plan de communication couvre l\'interne (equipe IR, direction, employes) et l\'externe (regulateurs sous 72h RGPD, clients, forces de l\'ordre).',
    'RGPD Articles cles : Art. 33 (notification autorite sous 72h), Art. 34 (notification personnes si risque eleve), Art. 25 (Privacy by Design), Art. 32 (securite du traitement). HIPAA Safe Harbor protege si le chiffrement est conforme.',
    'Les politiques de securite essentielles : AUP, mot de passe, BYOD, acces distant, gestion des donnees, IR, sauvegarde, changement. Les tabletop exercises testent ces processus au moins 2 fois par an.',
  ],
  resources: [
    {
      title: 'NIST SP 800-61 Rev. 2 - Computer Security Incident Handling Guide',
      url: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final',
      type: 'article',
    },
    {
      title: 'CompTIA Security+ SY0-701 - Incident Response (Professor Messer)',
      url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/incident-response-process/',
      type: 'video',
    },
    {
      title: 'Autopsy - Open Source Digital Forensics',
      url: 'https://www.autopsy.com/',
      type: 'tool',
    },
    {
      title: 'Volatility Foundation - Memory Forensics Framework',
      url: 'https://www.volatilityfoundation.org/',
      type: 'tool',
    },
    {
      title: 'SANS Incident Response Process',
      url: 'https://www.sans.org/white-papers/incident-handlers-handbook/',
      type: 'article',
    },
    {
      title: 'RGPD - Texte officiel complet',
      url: 'https://gdpr-info.eu/',
      type: 'article',
    },
  ],
  estimatedMinutes: 50,
};
