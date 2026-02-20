import { Lesson } from '../../types';

export const incidentResponse: Lesson = {
  id: 'p1-incident-response',
  phaseId: 'phase-01',
  title: 'Réponse aux incidents : processus, SIEM, forensics et conformité',
  content: `
## Introduction à la réponse aux incidents

La réponse aux incidents (Incident Response - IR) est la capacité d'une organisation à détecter, contenir et se remettre d'un incident de sécurité de manière structurée. C'est un domaine critique du Security+ car aucune défense n'est parfaite : il faut savoir réagir efficacement quand un incident survient.

## Le processus de réponse aux incidents

Le NIST SP 800-61 définit **4 phases** du processus IR (le standard de référence pour le Security+) :

### 1. Préparation
- Établir l'équipe IR (CSIRT - Computer Security Incident Response Team)
- Définir les rôles et responsabilités
- Créer les playbooks et procédures
- Mettre en place les outils (SIEM, EDR, forensics)
- Former et entraîner l'équipe (tabletop exercises, simulations)
- Établir les canaux de communication (internes et externes)

### 2. Détection et Analyse
- Identifier les indicateurs de compromission (IoC)
- Corréler les alertes et les événements
- Déterminer la portée et la sévérité de l'incident
- Classifier l'incident selon sa criticité
- Documenter tout dès le début

**Sources de détection :**
- Alertes SIEM et IDS/IPS
- Signalements des utilisateurs
- Threat intelligence feeds
- Analyse des logs
- EDR (Endpoint Detection and Response)

### 3. Confinement, Éradication et Récupération

**Confinement :**
- **Court terme** : isolation immédiate pour stopper la propagation (déconnecter le système du réseau)
- **Long terme** : mesures temporaires pendant la remédiation (segmentation, blocage d'IP)
- Préserver les preuves avant toute action destructive

**Éradication :**
- Supprimer le malware et les backdoors
- Patcher les vulnérabilités exploitées
- Réinitialiser les comptes compromis
- Identifier et corriger la cause racine (root cause)

**Récupération :**
- Restaurer les systèmes à partir de backups vérifiés
- Remettre en production graduellement
- Surveillance renforcée post-incident
- Valider le retour à la normale

### 4. Activité post-incident (Lessons Learned)
- Réunion de retour d'expérience (post-mortem)
- Rédiger le rapport d'incident complet
- Identifier les améliorations à apporter
- Mettre à jour les playbooks et procédures
- Partager les IoC avec la communauté (si approprié)

\`\`\`
Timeline d'un incident type :
T+0min  : Alerte SIEM détectée
T+15min : Analyste SOC confirme l'incident
T+30min : Confinement court terme (isolation du poste)
T+2h    : Analyse forensique initiale
T+4h    : Identification de la cause racine
T+8h    : Éradication et début de récupération
T+24h   : Systèmes restaurés et surveillance renforcée
T+7j    : Réunion post-mortem et rapport final
\`\`\`

## SIEM (Security Information and Event Management)

Le SIEM centralise, corrèle et analyse les logs et événements de sécurité de toute l'infrastructure.

**Fonctionnalités :**
- **Collecte de logs** : agrégation depuis serveurs, pare-feu, IDS, endpoints, applications
- **Normalisation** : transformation des formats variés en format unifié
- **Corrélation** : liaison d'événements apparemment indépendants pour détecter des patterns d'attaque
- **Alerting** : génération d'alertes selon des règles prédéfinies ou par détection d'anomalies
- **Tableaux de bord** : visualisation en temps réel de la posture de sécurité
- **Rétention** : stockage des logs pour analyse historique et conformité

**Solutions SIEM courantes :**
- **Splunk** : leader du marché, puissant mais coûteux
- **Microsoft Sentinel** : SIEM cloud-native Azure
- **Elastic Security** : basé sur la stack ELK (Elasticsearch, Logstash, Kibana)
- **Wazuh** : open source, combine SIEM et HIDS

\`\`\`
Exemple de règle de corrélation SIEM :
SI (5 échecs de connexion en 2 minutes depuis la même IP)
ET (connexion réussie depuis cette même IP dans les 5 minutes suivantes)
ALORS → Alerte "Possible brute force réussie" (Sévérité: Haute)
\`\`\`

## Forensics (Investigation numérique)

L'investigation numérique collecte et analyse les preuves numériques de manière à préserver leur **validité légale**.

**Principes fondamentaux :**
- **Chaîne de custody (Chain of Custody)** : documentation complète de qui a manipulé la preuve, quand et comment. Essentielle pour la validité juridique.
- **Intégrité des preuves** : créer des copies forensiques (images bit-à-bit) et travailler uniquement sur les copies. Vérifier avec des hashes (SHA-256).
- **Ordre de volatilité** : collecter les données les plus volatiles en premier :
  1. Registres CPU et cache
  2. Mémoire RAM
  3. Connexions réseau actives
  4. Processus en cours
  5. Disque dur
  6. Supports amovibles
  7. Logs distants

**Outils forensiques :**
- **FTK Imager** : création d'images forensiques
- **Autopsy** : plateforme d'analyse forensique open source
- **Volatility** : analyse de la mémoire RAM
- **Wireshark** : capture et analyse du trafic réseau

**Types d'investigation :**
- **Dead forensics** : analyse d'un système éteint (image disque)
- **Live forensics** : analyse d'un système en cours d'exécution (mémoire, connexions)
- **Network forensics** : analyse du trafic réseau capturé

## Gouvernance et conformité

La gouvernance de la sécurité établit le cadre de politiques, de processus et de responsabilités.

**Documents de gouvernance (du plus général au plus spécifique) :**
- **Politique (Policy)** : énonce les règles de haut niveau (ex : "Tous les accès distants doivent utiliser le MFA")
- **Standard** : exigences spécifiques obligatoires (ex : "Les mots de passe doivent avoir 12 caractères minimum")
- **Procédure** : instructions étape par étape (ex : "Comment réinitialiser un mot de passe")
- **Guideline** : recommandations non obligatoires (ex : "Il est recommandé d'utiliser un gestionnaire de mots de passe")

**Réglementations et standards de conformité :**
- **RGPD (GDPR)** : protection des données personnelles en Europe. Amendes jusqu'à 4% du CA mondial.
- **PCI DSS** : sécurité des données de cartes de paiement. 12 exigences principales.
- **HIPAA** : protection des données de santé (États-Unis).
- **SOX (Sarbanes-Oxley)** : contrôles financiers et audit IT.
- **SOC 2** : rapports d'audit sur les contrôles de sécurité, disponibilité, intégrité.

**Concepts clés :**
- **Due diligence** : recherche et évaluation préalable des risques (avant une décision)
- **Due care** : mise en œuvre raisonnable des mesures de sécurité (actions continues)
- **Data classification** : catégorisation des données selon leur sensibilité (Public, Interne, Confidentiel, Restreint)
- **Data retention** : politique de conservation et de destruction des données
- **Legal hold** : obligation de préserver les données dans le cadre d'une procédure juridique (suspend la politique de rétention)
`,
  keyPoints: [
    'Le processus IR du NIST comporte 4 phases : Préparation, Détection/Analyse, Confinement/Éradication/Récupération, et Activité post-incident.',
    'Le SIEM centralise et corrèle les logs de toute l\'infrastructure. La corrélation d\'événements est essentielle pour détecter les attaques complexes.',
    'En forensics, la chaîne de custody et l\'intégrité des preuves sont primordiales. Toujours travailler sur des copies et respecter l\'ordre de volatilité.',
    'La hiérarchie documentaire de gouvernance : Politique → Standard → Procédure → Guideline, du plus général au plus spécifique.',
    'RGPD, PCI DSS, HIPAA et SOC 2 sont les principales réglementations de conformité à connaître pour le Security+.',
    'La phase de préparation (équipe, playbooks, outils, exercices) est la clé d\'une réponse aux incidents efficace.',
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
  ],
  estimatedMinutes: 30,
};
