import { Lesson } from '../../types';

export const technicalWritingLesson: Lesson = {
  id: 'p6-technical-writing',
  phaseId: 'phase-06',
  title: 'Rédaction Technique pour Professionnels de la Sécurité',
  estimatedMinutes: 20,
  content: `# Rédaction Technique pour Professionnels de la Sécurité

## Introduction

La capacité à communiquer clairement par écrit est une compétence souvent sous-estimée dans les métiers techniques. Pour un professionnel de la sécurité AI, savoir rédiger des rapports d'audit, des analyses de menaces, des articles de blog et de la documentation est aussi important que la maîtrise des outils techniques. Un excellent travail technique qui n'est pas bien communiqué perd une grande partie de sa valeur.

## Types de Documents en Sécurité AI

### Rapport d'Audit de Sécurité

Le livrable le plus formel. Structure recommandée :

1. **Résumé exécutif** (1 page max) : Conclusions principales, niveau de risque global, recommandations prioritaires. Destiné aux décideurs non techniques.

2. **Périmètre et méthodologie** : Ce qui a été testé, comment, quels outils ont été utilisés, quelles limites.

3. **Résultats détaillés** : Chaque vulnérabilité avec :
   - Description claire du problème
   - Sévérité (CVSS ou échelle interne)
   - Preuve de concept (screenshots, logs, code)
   - Impact potentiel
   - Recommandation de remédiation

4. **Tableau de synthèse** : Vue d'ensemble des vulnérabilités par sévérité.

5. **Annexes** : Détails techniques, configurations testées, outils utilisés.

### Analyse de Menaces (Threat Model Document)

- Diagramme d'architecture du système
- Identification des actifs et des frontières de confiance
- Liste des menaces identifiées (STRIDE)
- Arbres d'attaque pour les menaces critiques
- Matrice de risque (probabilité x impact)
- Plan de traitement des risques

### Article de Blog Technique

Format plus libre, destiné à partager des connaissances :
- **Accroche** : Pourquoi le lecteur devrait s'intéresser à ce sujet
- **Contexte** : Poser le problème clairement
- **Explication technique** : Le coeur de l'article, avec des exemples concrets
- **Démonstration** : Code, captures d'écran, résultats reproductibles
- **Conclusion** : Ce qu'il faut retenir et prochaines étapes

### Documentation Technique

- README de projets de sécurité
- Guides de configuration sécurisée (hardening guides)
- Procédures de réponse aux incidents
- Politiques de sécurité

## Principes de Rédaction Efficace

### Clarté Avant Tout

**Mauvais :** « L'implémentation de mécanismes de mitigation adversariale via l'augmentation du dataset d'entraînement avec des perturbations générées par des attaques de premier ordre a permis d'améliorer la robustesse. »

**Bon :** « L'entraînement adversarial avec PGD a amélioré la robustesse du modèle de 15% contre les attaques L-infini. »

### Adapter au Public

- **Direction / CISO** : Impact business, coût du risque, recommandations actionnables
- **Équipe technique** : Détails d'implémentation, code, configurations
- **Régulateurs** : Conformité, preuves, traçabilité

### Structure Pyramidale

Commencer par la conclusion, puis les détails. Le lecteur pressé obtient l'essentiel immédiatement.

\`\`\`
Conclusion / Recommandation
    ↓
Arguments principaux
    ↓
Détails techniques et preuves
    ↓
Annexes et références
\`\`\`

### Utiliser des Visuels

- **Diagrammes d'architecture** : Montrer les flux de données et les frontières de confiance
- **Graphiques** : Résultats de tests, métriques de robustesse, évolution temporelle
- **Tableaux** : Comparaisons, matrices de risque, synthèses
- **Captures d'écran annotées** : Preuves de concept, résultats d'exploitation

## Rédiger un CVE ou un Advisory

### Structure d'un Advisory de Sécurité

\`\`\`
Titre : [Type de vulnérabilité] dans [Composant] de [Produit]
Sévérité : Critique / Haute / Moyenne / Basse
CVSS : 8.5 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N)

Description :
Une vulnérabilité de type [X] a été identifiée dans [composant].
Un attaquant non authentifié peut [action] ce qui permet [impact].

Versions affectées : v1.0.0 à v2.3.4
Version corrigée : v2.3.5

Détails techniques :
[Explication précise de la vulnérabilité]

Preuve de concept :
[Code ou étapes de reproduction]

Remédiation :
1. Mettre à jour vers la version v2.3.5
2. En attendant, [mesure de contournement]

Timeline :
- 2024-01-15 : Découverte
- 2024-01-16 : Signalement au vendeur
- 2024-02-01 : Correctif disponible
- 2024-02-15 : Publication de l'advisory
\`\`\`

## Écrire pour un Blog de Sécurité

### Trouver des Sujets

- Reproduire et expliquer des attaques publiées (sur vos propres modèles)
- Comparer des outils de sécurité ML (ART, Cleverhans, Foolbox)
- Documenter un CTF ou un challenge de sécurité AI
- Analyser une vulnérabilité découverte dans un framework ML
- Partager un retour d'expérience sur un projet de sécurité AI

### Ton et Style

- **Précis** : Chiffres, versions, configurations exactes
- **Reproductible** : Le lecteur doit pouvoir reproduire vos résultats
- **Honnête** : Mentionner les limites et les échecs
- **Engageant** : Raconter une histoire, pas seulement des faits

### Plateformes de Publication

- **Blog personnel** : Contrôle total, construit votre marque
- **Medium** : Large audience, bonne découvrabilité
- **Dev.to** : Communauté technique active
- **arXiv** : Pour les contributions de recherche
- **LinkedIn** : Articles de synthèse pour le réseau professionnel

## Outils de Rédaction

- **Markdown** : Format universel pour la documentation technique
- **Mermaid / Draw.io** : Diagrammes dans le code
- **LaTeX** : Pour les articles académiques et les formules mathématiques
- **Grammarly / LanguageTool** : Vérification grammaticale
- **Hemingway Editor** : Simplification du style d'écriture

## Bonnes Pratiques

1. **Relire à voix haute** : Identifier les phrases trop longues ou confuses
2. **Faire relire par un pair** : Un regard extérieur repère les points obscurs
3. **Versionner vos documents** : Git pour la documentation, Google Docs pour la collaboration
4. **Maintenir un template** : Standardiser vos rapports pour gagner en efficacité
5. **Citer vos sources** : Crédibilité et traçabilité

## Conclusion

La rédaction technique est un multiplicateur de carrière. Un professionnel de la sécurité qui sait communiquer ses trouvailles de manière claire et percutante se distingue significativement. Investir dans cette compétence rapporte tout au long de la carrière.`,
  keyPoints: [
    'La structure pyramidale (conclusion d\'abord, détails ensuite) est la clé d\'une communication efficace',
    'Un rapport d\'audit doit inclure un résumé exécutif d\'une page pour les décideurs non techniques',
    'Adapter le langage au public : impact business pour la direction, détails techniques pour les ingénieurs',
    'Les articles de blog doivent être précis, reproductibles et honnêtes sur les limites',
    'Les visuels (diagrammes, graphiques, tableaux) augmentent considérablement la compréhension des documents techniques',
  ],
  resources: [
    {
      title: 'Google Technical Writing Courses (Gratuit)',
      url: 'https://developers.google.com/tech-writing',
      type: 'course',
    },
    {
      title: 'The Art of Readable Code - Dustin Boswell',
      url: 'https://www.oreilly.com/library/view/the-art-of/9781449318482/',
      type: 'book',
    },
    {
      title: 'Hemingway Editor - Simplify Your Writing',
      url: 'https://hemingwayapp.com/',
      type: 'tool',
    },
  ],
};
