import { Lesson } from '../../types';

export const euAiActLesson: Lesson = {
  id: 'p5-eu-ai-act',
  phaseId: 'phase-05',
  title: 'EU AI Act',
  estimatedMinutes: 25,
  content: `# EU AI Act : Catégories de Risque, Conformité et Exigences

## Introduction

L'EU AI Act (Règlement européen sur l'intelligence artificielle) est le premier cadre réglementaire complet au monde pour l'IA. Adopté en 2024, il établit des règles harmonisées pour le développement, la mise sur le marché et l'utilisation des systèmes d'IA dans l'Union européenne. Pour les professionnels de la sécurité AI, comprendre cette réglementation est devenu incontournable.

## Approche Basée sur les Risques

L'EU AI Act classe les systèmes d'IA en quatre niveaux de risque, chacun avec des obligations proportionnelles.

### Risque Inacceptable (Interdit)

Ces systèmes sont **purement et simplement interdits** :
- **Scoring social** par les autorités publiques (notation citoyenne à la chinoise)
- **Manipulation subliminale** : systèmes qui exploitent les vulnérabilités des personnes
- **Identification biométrique à distance en temps réel** dans les espaces publics (avec exceptions pour les forces de l'ordre)
- **Catégorisation biométrique** basée sur des caractéristiques sensibles (race, orientation politique)
- **Scraping facial non ciblé** pour constituer des bases de données de reconnaissance faciale
- **Reconnaissance des émotions** sur le lieu de travail et dans les établissements d'enseignement

### Risque Élevé (Strictement Réglementé)

Ces systèmes sont autorisés mais soumis à des **exigences strictes** avant mise sur le marché :

**Domaines concernés :**
- Infrastructures critiques (transport, énergie, eau)
- Éducation et formation professionnelle (scoring, admission)
- Emploi (recrutement, évaluation, licenciement)
- Services publics essentiels (prestations sociales, crédit)
- Maintien de l'ordre (évaluation de la fiabilité des preuves, profilage)
- Migration et contrôle aux frontières
- Justice et processus démocratiques

**Exigences obligatoires :**
- Système de gestion des risques tout au long du cycle de vie
- Gouvernance des données (qualité, représentativité, absence de biais)
- Documentation technique détaillée
- Logging et traçabilité automatiques
- Transparence et information des utilisateurs
- Supervision humaine (human oversight)
- Précision, robustesse et cybersécurité

### Risque Limité (Obligations de Transparence)

Obligations de transparence pour :
- **Chatbots** : Informer l'utilisateur qu'il interagit avec une IA
- **Deepfakes** : Étiqueter clairement le contenu généré par IA
- **Systèmes de génération de texte** : Signaler que le contenu est généré automatiquement

### Risque Minimal (Pas d'Obligation)

La majorité des systèmes d'IA (filtres anti-spam, jeux vidéo, etc.) tombent dans cette catégorie et ne sont soumis à aucune obligation spécifique.

## Exigences pour les Modèles à Usage Général (GPAI)

L'EU AI Act introduit des obligations spécifiques pour les **modèles de fondation** (GPT, Claude, Llama, etc.) :

### Tous les GPAI
- Documentation technique et informations sur les données d'entraînement
- Respect des droits d'auteur (transparence sur les données protégées)
- Publication d'un résumé des données d'entraînement

### GPAI à Risque Systémique
Pour les modèles dépassant un seuil de puissance de calcul (10^25 FLOPS) :
- **Évaluation de modèle** : Tests adversariaux et red teaming obligatoires
- **Évaluation des risques systémiques** et mesures d'atténuation
- **Signalement d'incidents** graves aux autorités
- **Cybersécurité** : Protection adéquate du modèle et de son infrastructure

## Conformité en Pratique

### Évaluation de Conformité

Pour les systèmes à haut risque :

1. **Identification** : Déterminer si votre système est à haut risque
2. **Évaluation des risques** : Conduire une analyse d'impact sur les droits fondamentaux
3. **Mise en conformité technique** : Implémenter les exigences (logging, documentation, tests)
4. **Évaluation de conformité** : Auto-évaluation ou audit par un organisme notifié (selon le domaine)
5. **Marquage CE** : Apposer le marquage de conformité
6. **Enregistrement** : Inscrire le système dans la base de données européenne

### Documentation Technique Requise

- Description générale du système et de son usage prévu
- Architecture et conception détaillées
- Données d'entraînement, validation et test (provenance, préparation, biais)
- Métriques de performance et limites connues
- Mesures de supervision humaine
- Mesures de cybersécurité

### Sanctions

- Jusqu'à **35 millions d'euros** ou 7% du CA mondial pour les pratiques interdites
- Jusqu'à **15 millions d'euros** ou 3% du CA pour non-conformité aux exigences
- Jusqu'à **7,5 millions d'euros** ou 1,5% du CA pour information incorrecte

## Calendrier d'Entrée en Vigueur

- **Février 2025** : Interdictions des pratiques à risque inacceptable
- **Août 2025** : Obligations pour les GPAI
- **Août 2026** : Ensemble des obligations pour les systèmes à haut risque
- **Août 2027** : Obligations pour les systèmes intégrés dans des produits réglementés

## Implications pour les Professionnels de la Sécurité

En tant que professionnel de la sécurité AI, vous devez :
- Savoir classifier un système dans la bonne catégorie de risque
- Comprendre les exigences techniques de robustesse et de cybersécurité
- Être capable de conduire des évaluations de red teaming conformes
- Documenter les mesures de sécurité dans le format requis
- Conseiller les équipes de développement sur la conformité

## Conclusion

L'EU AI Act est un changement majeur pour l'industrie de l'IA. Il crée des opportunités pour les professionnels de la sécurité capables d'accompagner les organisations dans leur mise en conformité. La maîtrise de ce cadre réglementaire est un avantage compétitif significatif.`,
  keyPoints: [
    'L\'EU AI Act classe les systèmes en 4 niveaux de risque : inacceptable (interdit), élevé, limité et minimal',
    'Les systèmes à haut risque nécessitent une documentation technique, du logging, une supervision humaine et des tests de robustesse',
    'Les modèles GPAI à risque systémique (>10^25 FLOPS) doivent subir un red teaming obligatoire et signaler les incidents',
    'Les sanctions peuvent atteindre 35 millions d\'euros ou 7% du chiffre d\'affaires mondial',
    'L\'entrée en vigueur est progressive de 2025 à 2027, avec les interdictions effectives dès février 2025',
  ],
  resources: [
    {
      title: 'EU AI Act - Texte officiel complet',
      url: 'https://artificialintelligenceact.eu/',
      type: 'article',
    },
    {
      title: 'EU AI Act Compliance Checker',
      url: 'https://artificialintelligenceact.eu/assessment/eu-ai-act-compliance-checker/',
      type: 'tool',
    },
    {
      title: 'The EU AI Act - A Comprehensive Guide (video)',
      url: 'https://www.youtube.com/watch?v=oSHJBMkOJ0E',
      type: 'video',
    },
  ],
};
