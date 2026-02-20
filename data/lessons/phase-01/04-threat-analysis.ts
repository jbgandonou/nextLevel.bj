import { Lesson } from '../../types';

export const threatAnalysis: Lesson = {
  id: 'p1-threat-analysis',
  phaseId: 'phase-01',
  title: 'Analyse des menaces : acteurs, vecteurs d\'attaque et frameworks',
  content: `
## Introduction à l'analyse des menaces

L'analyse des menaces consiste à identifier, comprendre et évaluer les menaces qui pèsent sur une organisation. C'est un processus continu qui permet d'adapter les défenses aux risques réels. Le Security+ exige une compréhension approfondie des acteurs de la menace, des vecteurs d'attaque et des frameworks d'analyse.

## Acteurs de la menace (Threat Actors)

Les acteurs de la menace diffèrent par leurs **motivations**, leurs **ressources** et leur **niveau de sophistication**.

**Catégories principales :**
- **APT (Advanced Persistent Threat) / États-nations** : les plus sophistiqués, ressources quasi illimitées, objectifs géopolitiques (espionnage, sabotage). Exemples : APT28 (Russie), APT41 (Chine), Lazarus Group (Corée du Nord).
- **Cybercriminels organisés** : motivés par le profit financier. Ransomware, vol de données, fraude. Fonctionnent comme des entreprises (RaaS — Ransomware as a Service).
- **Hacktivistes** : motivés par des causes idéologiques ou politiques. Defacement, DDoS, fuites de données.
- **Insiders (menaces internes)** : employés actuels ou anciens, sous-traitants. Accès privilégié. Peuvent être malveillants ou négligents.
- **Script Kiddies** : attaquants peu qualifiés utilisant des outils existants. Faible sophistication mais peuvent causer des dommages.
- **Shadow IT** : utilisation non autorisée de services et applications. Crée des vulnérabilités non gérées.

**Attributs des acteurs :**
- **Interne vs Externe**
- **Niveau de sophistication** : bas → élevé
- **Ressources / Financement** : limité → étatique
- **Motivation** : financière, idéologique, espionnage, destruction, notoriété

## Vecteurs d'attaque

Les vecteurs d'attaque sont les **chemins ou méthodes** utilisés pour compromettre un système.

**Vecteurs courants :**
- **Phishing / Spear phishing** : emails frauduleux ciblant les utilisateurs. Le spear phishing vise des individus spécifiques avec des informations personnalisées.
- **Smishing / Vishing** : phishing par SMS ou appel vocal.
- **Watering hole** : compromission d'un site web fréquenté par la cible.
- **Supply chain** : attaque via un fournisseur ou un composant tiers (ex : SolarWinds, log4j).
- **Exploitation de vulnérabilités** : zero-day, CVE non patchées, mauvaises configurations.
- **Accès physique** : tailgating, clé USB piégée (rubber ducky), accès direct aux équipements.
- **Credential stuffing** : utilisation d'identifiants volés lors de fuites de données sur d'autres services.
- **Drive-by download** : téléchargement de malware simplement en visitant un site compromis.

## Types d'attaques

**Attaques réseau :**
- **DDoS (Distributed Denial of Service)** : surcharge un service pour le rendre indisponible. Types : volumétrique, protocole, applicatif.
- **Man-in-the-Middle (MitM) / On-path** : interception des communications entre deux parties.
- **ARP Poisoning** : falsification des tables ARP pour rediriger le trafic.
- **DNS Poisoning** : falsification des réponses DNS pour rediriger vers des sites malveillants.

**Attaques applicatives :**
- **Injection SQL** : insertion de code SQL dans les entrées utilisateur.
- **XSS (Cross-Site Scripting)** : injection de scripts dans les pages web.
- **CSRF (Cross-Site Request Forgery)** : exécution d'actions non autorisées au nom d'un utilisateur authentifié.
- **Buffer Overflow** : dépassement de mémoire tampon pour exécuter du code arbitraire.

**Attaques sur les mots de passe :**
- **Brute force** : test systématique de toutes les combinaisons.
- **Dictionary** : test de mots de passe courants depuis une liste.
- **Rainbow table** : tables de hashes précalculés (contré par le salting).
- **Password spraying** : test d'un même mot de passe commun sur de nombreux comptes.

## MITRE ATT&CK Framework

MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) est une **base de connaissances** qui catalogue les tactiques et techniques des attaquants réels.

**Structure :**
- **Tactiques** (le "pourquoi") : les objectifs de l'attaquant à chaque étape
- **Techniques** (le "comment") : les méthodes utilisées pour atteindre chaque objectif
- **Sous-techniques** : variations spécifiques d'une technique
- **Procédures** : implémentations concrètes observées chez des groupes spécifiques

**Les 14 tactiques ATT&CK (Enterprise) :**
1. Reconnaissance
2. Resource Development (développement de ressources)
3. Initial Access (accès initial)
4. Execution (exécution)
5. Persistence (persistance)
6. Privilege Escalation (élévation de privilèges)
7. Defense Evasion (contournement des défenses)
8. Credential Access (accès aux identifiants)
9. Discovery (découverte)
10. Lateral Movement (mouvement latéral)
11. Collection (collecte)
12. Command and Control (C2)
13. Exfiltration
14. Impact

\`\`\`
Exemple de mapping ATT&CK :
Tactique : Initial Access
  Technique : T1566 - Phishing
    Sous-technique : T1566.001 - Spearphishing Attachment
    Procédure : APT28 envoie un document Word piégé avec une macro VBA
\`\`\`

## Cyber Kill Chain (Lockheed Martin)

La Cyber Kill Chain modélise les **7 étapes d'une cyberattaque** :

1. **Reconnaissance** : collecte d'informations sur la cible (OSINT, scanning)
2. **Weaponization** : création de l'arme (malware + exploit)
3. **Delivery** : livraison à la cible (email, site web, USB)
4. **Exploitation** : exécution de la vulnérabilité
5. **Installation** : installation du malware / backdoor
6. **Command & Control (C2)** : établissement d'un canal de communication
7. **Actions on Objectives** : atteinte de l'objectif final (exfiltration, chiffrement, destruction)

**Objectif défensif** : briser la chaîne le plus tôt possible. Plus on intervient tôt, moins l'impact est important.

## Diamond Model of Intrusion Analysis

Le Diamond Model analyse chaque événement d'intrusion selon **4 axes** :
- **Adversaire** : qui attaque ?
- **Infrastructure** : quels outils et serveurs sont utilisés ?
- **Capacité** : quelles techniques et exploits sont employés ?
- **Victime** : qui est ciblé ?

Ce modèle permet de corréler les incidents et d'identifier les liens entre différentes attaques.
`,
  keyPoints: [
    'Les APT/États-nations sont les acteurs les plus sophistiqués. Les menaces internes (insiders) sont particulièrement dangereuses car elles disposent d\'accès privilégiés.',
    'Le phishing reste le vecteur d\'attaque le plus courant. Les attaques supply chain (SolarWinds, log4j) sont en forte augmentation.',
    'MITRE ATT&CK catalogue 14 tactiques et des centaines de techniques observées chez des attaquants réels. C\'est une référence incontournable.',
    'La Cyber Kill Chain de Lockheed Martin modélise 7 étapes d\'attaque. L\'objectif défensif est de briser la chaîne le plus tôt possible.',
    'Le Diamond Model analyse les intrusions selon 4 axes : adversaire, infrastructure, capacité et victime.',
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
  ],
  estimatedMinutes: 25,
};
