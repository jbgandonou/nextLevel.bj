import { Lesson } from '../../types';

export const portfolioLesson: Lesson = {
  id: 'p6-portfolio',
  phaseId: 'phase-06',
  title: 'Construire un Portfolio de Sécurité',
  estimatedMinutes: 20,
  content: `# Construire un Portfolio de Sécurité : GitHub, Blog et Conférences

## Introduction

Dans le domaine de la sécurité AI, votre portfolio est votre meilleur CV. Les recruteurs et les clients cherchent des preuves concrètes de compétences, pas seulement des lignes sur un CV. Un portfolio bien construit combinant projets GitHub, articles de blog et présentations vous positionne comme un expert crédible et visible dans la communauté.

## Pilier 1 : GitHub comme Vitrine Technique

### Projets à Développer

**Projet 1 : Outil de Red Teaming ML**
Un outil qui automatise les tests de sécurité sur les modèles ML :
- Tests d'évasion (FGSM, PGD) sur des modèles courants
- Tests d'extraction de modèle via API
- Rapport automatique de vulnérabilités
- Documentation claire avec des exemples

**Projet 2 : Pipeline MLOps Sécurisé**
Un pipeline de déploiement ML intégrant les bonnes pratiques de sécurité :
- CI/CD avec scanning de vulnérabilités
- Chiffrement des artefacts du modèle
- Monitoring du drift avec alertes
- Infrastructure as Code (Terraform)

**Projet 3 : Analyse de Sécurité d'un LLM**
Un notebook Jupyter documentant l'analyse de sécurité d'un LLM :
- Tests de prompt injection (direct et indirect)
- Évaluation des guardrails
- Mesure de la fuite d'information
- Recommandations de hardening

**Projet 4 : Dashboard de Monitoring ML**
Un dashboard Grafana complet pour la surveillance de modèles :
- Métriques de performance et de drift
- Alertes configurées
- Docker Compose pour le déploiement local
- Documentation d'utilisation

### Qualité du Code

Votre code est jugé par des experts. Soignez :
- **README complet** : Description, installation, usage, exemples, contribution
- **Tests unitaires** : Couverture significative, tests clairs
- **CI/CD** : GitHub Actions pour les tests et le linting
- **Documentation** : Docstrings, commentaires pertinents, architecture documentée
- **Licence** : MIT ou Apache 2.0 pour maximiser l'adoption

### Profil GitHub Optimisé

- Photo professionnelle et bio claire mentionnant « AI Security »
- README de profil avec vos projets phares et vos compétences
- Contributions régulières (commit graph vert)
- Stars et contributions à des projets open source de sécurité ML

## Pilier 2 : Blog Technique

### Stratégie de Contenu

Publier régulièrement (1-2 articles par mois) sur des sujets variés :

**Articles d'analyse :**
- « Analyse de sécurité de l'API Claude : leçons apprises »
- « Comment j'ai testé la robustesse d'un modèle de détection de fraude »
- « Revue de l'OWASP Top 10 pour LLM avec des exemples pratiques »

**Tutoriels :**
- « Mettre en place un entraînement adversarial avec PyTorch en 30 minutes »
- « Déployer un monitoring ML complet avec Prometheus et Grafana »
- « Implémenter un circuit breaker pour votre API d'inférence »

**Veille et opinion :**
- « Ce que l'EU AI Act signifie pour les développeurs ML »
- « Comparaison des outils de red teaming LLM : Garak vs PyRIT »
- « Les tendances de la sécurité AI pour 2026 »

### SEO et Visibilité

- Utiliser des mots-clés pertinents dans les titres et les sous-titres
- Partager chaque article sur LinkedIn, Twitter/X et Reddit
- Taguer les auteurs cités et les outils mentionnés
- Répondre aux commentaires pour créer de l'engagement

### Plateformes Recommandées

- **Site personnel** (Hugo, Next.js, Ghost) : Le meilleur pour le long terme
- **Medium** : Bonne découvrabilité, monétisation possible
- **Hashnode** : Communauté développeur, domaine personnalisé gratuit
- **Substack** : Format newsletter, fidélisation par email

## Pilier 3 : Conférences et Présentations

### Types de Présentations

**Lightning talks (5-10 min)** : Idéal pour débuter. Présenter un outil, une technique ou un résultat intéressant.

**Présentations techniques (30-45 min)** : Analyse approfondie d'un sujet. Démo en direct si possible.

**Workshops (2-4h)** : Formation pratique. Les plus valorisés car ils démontrent une expertise approfondie.

### Conférences Cibles

**Sécurité :**
- BSides (régional, accessible)
- DEF CON AI Village
- Black Hat (prestige)
- SSTIC (France)

**ML/AI :**
- NeurIPS (workshops sur la sécurité)
- ICML (workshops adversarial ML)
- MLOps Community Meetups

**Cloud et DevOps :**
- KubeCon (security track)
- AWS re:Invent / Azure Summit
- DevSecCon

### Préparer une Soumission (CFP)

1. **Titre accrocheur** : Promesse claire de ce que le public apprendra
2. **Résumé (abstract)** : 200-300 mots, problème/solution/takeaways
3. **Bio** : Courte, pertinente, mentionnant vos publications et projets
4. **Outline** : Structure de la présentation avec timing
5. **Takeaways** : 3-5 points concrets que le public retiendra

### Construire ses Slides

- Maximum 1 idée par slide
- Visuels plutôt que texte
- Code lisible (grande police, coloration syntaxique)
- Démos enregistrées en backup (la démo en direct peut échouer)

## Pilier 4 : Réseau et Communauté

### Présence en Ligne

- **LinkedIn** : Profil optimisé, posts réguliers, interactions dans les groupes
- **Twitter/X** : Veille, partage d'articles, interactions avec la communauté
- **Discord/Slack** : Communautés ML Security, OWASP, MLOps

### Certifications Complémentaires

Pour renforcer la crédibilité du portfolio :
- **AWS Security Specialty** ou **Azure Security Engineer** : Compétences cloud validées
- **OSCP/OSEP** : Compétences offensives reconnues
- **AI Security certifications** : Certifications émergentes en sécurité AI

### Mentorat

- Aider les débutants dans les communautés en ligne
- Contribuer aux projets open source de sécurité ML
- Organiser ou participer à des CTF orientés AI

## Plan d'Action sur 3 Mois

**Mois 1 :**
- Créer/optimiser le profil GitHub avec un README de profil
- Publier le premier projet (outil de red teaming ML)
- Écrire le premier article de blog

**Mois 2 :**
- Publier le second projet (pipeline MLOps sécurisé)
- Écrire 2 articles de blog
- Soumettre un lightning talk à un meetup local

**Mois 3 :**
- Publier le troisième projet (analyse LLM)
- Écrire 2 articles supplémentaires
- Donner le premier talk
- Postuler à un CFP de conférence

## Conclusion

Un portfolio n'est pas un sprint mais un marathon. La régularité prime sur la perfection. Commencez petit, publiez régulièrement et itérez. En 6 mois de travail constant, vous aurez une présence en ligne qui vous distingue significativement dans le domaine de la sécurité AI.`,
  keyPoints: [
    'GitHub est votre vitrine technique : soignez les README, les tests, la CI/CD et la documentation de chaque projet',
    'Un blog régulier (1-2 articles/mois) avec des analyses, tutoriels et veille construit votre crédibilité d\'expert',
    'Les conférences (BSides, DEF CON AI Village, SSTIC) offrent une visibilité maximale dans la communauté sécurité',
    'Quatre projets clés : outil de red teaming ML, pipeline MLOps sécurisé, analyse LLM et dashboard de monitoring',
    'La régularité prime sur la perfection : un plan d\'action sur 3 mois avec des livrables concrets est plus efficace qu\'un effort ponctuel',
  ],
  resources: [
    {
      title: 'GitHub Profile README Generator',
      url: 'https://rahuldkjain.github.io/gh-profile-readme-generator/',
      type: 'tool',
    },
    {
      title: 'DEF CON AI Village - Call for Papers',
      url: 'https://aivillage.org/',
      type: 'article',
    },
    {
      title: 'Building a Career in AI Security - SANS',
      url: 'https://www.sans.org/blog/building-a-career-in-ai-security/',
      type: 'article',
    },
  ],
};
