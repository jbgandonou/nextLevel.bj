import { Lesson } from '../../types';

export const riskManagement: Lesson = {
  id: 'p1-risk-management',
  phaseId: 'phase-01',
  title: 'Gestion des risques : frameworks, évaluation et vulnérabilités',
  content: `
## Introduction à la gestion des risques

La gestion des risques est le processus d'identification, d'évaluation et de traitement des risques liés à la sécurité de l'information. C'est un domaine majeur du Security+ qui lie la technique à la gouvernance. Un professionnel de la cybersécurité doit savoir évaluer les risques et recommander des mesures proportionnées.

## Concepts fondamentaux

**Terminologie essentielle :**
- **Menace (Threat)** : tout événement ou action pouvant causer un dommage (ex : ransomware, tremblement de terre)
- **Vulnérabilité (Vulnerability)** : faiblesse exploitable dans un système (ex : logiciel non patché, mauvaise configuration)
- **Risque (Risk)** : probabilité qu'une menace exploite une vulnérabilité et l'impact résultant
- **Actif (Asset)** : tout ce qui a de la valeur pour l'organisation (données, systèmes, personnel)
- **Contrôle (Control)** : mesure de sécurité réduisant le risque

\`\`\`
Formule du risque :
Risque = Menace × Vulnérabilité × Impact

Ou en termes quantitatifs :
ALE = ARO × SLE
  ALE (Annual Loss Expectancy) = perte annuelle attendue
  ARO (Annual Rate of Occurrence) = fréquence annuelle
  SLE (Single Loss Expectancy) = perte pour un incident unique
  SLE = AV (Asset Value) × EF (Exposure Factor)
\`\`\`

## Évaluation des risques

**Approche quantitative :**
- Utilise des valeurs numériques et monétaires
- Plus précise mais nécessite des données fiables
- Calcul de l'ALE pour justifier les investissements en sécurité

\`\`\`
Exemple quantitatif :
Serveur web (AV) = 200 000 €
Probabilité de compromission par an (ARO) = 0.5
Facteur d'exposition (EF) = 40%
SLE = 200 000 × 0.40 = 80 000 €
ALE = 0.5 × 80 000 = 40 000 €/an

→ Un contrôle coûtant moins de 40 000 €/an est justifié
\`\`\`

**Approche qualitative :**
- Utilise des échelles relatives (Faible/Moyen/Élevé/Critique)
- Plus rapide et plus facile à mettre en œuvre
- Matrice de risques : probabilité × impact

**Registre des risques (Risk Register)** : document centralisant tous les risques identifiés avec leur évaluation, propriétaire, et plan de traitement.

## Traitement des risques

Une fois le risque évalué, quatre options de traitement :

- **Atténuation (Mitigation)** : réduire le risque en implémentant des contrôles (ex : installer un pare-feu, patcher les systèmes)
- **Transfert** : transférer le risque à un tiers (ex : assurance cyber, externalisation)
- **Acceptation** : accepter le risque tel quel si son niveau est jugé acceptable (doit être documenté et approuvé par la direction)
- **Évitement** : éliminer le risque en supprimant l'activité ou l'actif concerné (ex : ne pas stocker certaines données)

**Risque résiduel** : le risque qui subsiste après application des contrôles. Il doit être accepté formellement.

## Frameworks de gestion des risques

### NIST (National Institute of Standards and Technology)

**NIST Cybersecurity Framework (CSF) 2.0 :**
Six fonctions principales :
1. **Govern** : établir la gouvernance cybersécurité
2. **Identify** : comprendre les actifs, les risques et l'environnement
3. **Protect** : implémenter les mesures de protection
4. **Detect** : détecter les événements de sécurité
5. **Respond** : répondre aux incidents
6. **Recover** : restaurer les capacités après un incident

**NIST SP 800-37 - Risk Management Framework (RMF) :**
7 étapes : Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor

**NIST SP 800-53** : catalogue de contrôles de sécurité (plus de 1000 contrôles organisés en 20 familles).

### ISO 27001 / 27002

- **ISO 27001** : standard international pour les systèmes de management de la sécurité de l'information (SMSI). Certifiable.
- **ISO 27002** : guide de bonnes pratiques détaillant les contrôles de sécurité.
- **ISO 27005** : gestion des risques liés à la sécurité de l'information.
- Basé sur le cycle PDCA (Plan-Do-Check-Act) pour l'amélioration continue.

### Autres frameworks

- **CIS Controls** : 18 contrôles prioritaires classés par niveau de maturité. Pragmatique et orienté action.
- **COBIT** : framework de gouvernance IT alignant la sécurité avec les objectifs métier.
- **SOC 2** : rapports d'audit basés sur 5 critères de confiance (sécurité, disponibilité, intégrité, confidentialité, vie privée).

## Gestion des vulnérabilités

La gestion des vulnérabilités est un processus continu de découverte, évaluation et remédiation des faiblesses.

**Cycle de gestion des vulnérabilités :**
1. **Découverte** : inventaire des actifs et scan de vulnérabilités
2. **Évaluation** : priorisation selon le score CVSS et le contexte métier
3. **Remédiation** : patching, reconfiguration, ou contrôle compensatoire
4. **Vérification** : re-scan pour confirmer la correction
5. **Reporting** : communication des résultats et métriques

**CVSS (Common Vulnerability Scoring System)** :
- Score de 0.0 à 10.0
- Catégories : None (0), Low (0.1-3.9), Medium (4.0-6.9), High (7.0-8.9), Critical (9.0-10.0)
- Métriques : vecteur d'attaque, complexité, privilèges requis, impact (CIA)

**CVE (Common Vulnerabilities and Exposures)** : identifiants uniques pour les vulnérabilités connues (ex : CVE-2021-44228 pour log4j).

**Outils de scan :**
- **Nessus** : scanner de vulnérabilités commercial leader
- **OpenVAS** : alternative open source
- **Qualys** : plateforme cloud de gestion des vulnérabilités

## Types de contrôles de sécurité

**Par fonction :**
- **Préventif** : empêche un incident (ex : pare-feu, MFA, formation)
- **Détectif** : détecte un incident en cours (ex : IDS, SIEM, audit de logs)
- **Correctif** : corrige après un incident (ex : restauration de backup, patching)
- **Dissuasif** : décourage les attaquants (ex : caméras, bannières d'avertissement)
- **Compensatoire** : alternative quand le contrôle principal n'est pas réalisable

**Par nature :**
- **Technique** : implémenté par la technologie (chiffrement, pare-feu)
- **Administratif** : politiques et procédures (politique de mots de passe, formation)
- **Physique** : protection physique (serrures, badges, caméras)
`,
  keyPoints: [
    'Le risque se calcule selon la formule : Menace x Vulnérabilité x Impact. L\'ALE (Annual Loss Expectancy) permet de justifier les investissements en sécurité.',
    'Quatre options de traitement du risque : atténuation, transfert, acceptation et évitement. Le risque résiduel doit être formellement accepté.',
    'Le NIST CSF 2.0 comporte 6 fonctions (Govern, Identify, Protect, Detect, Respond, Recover). ISO 27001 est le standard international certifiable.',
    'Le CVSS score les vulnérabilités de 0 à 10. Les CVE fournissent des identifiants uniques pour les vulnérabilités connues.',
    'Les contrôles de sécurité se classent par fonction (préventif, détectif, correctif, dissuasif, compensatoire) et par nature (technique, administratif, physique).',
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
  ],
  estimatedMinutes: 30,
};
