import { Lesson } from '../../types';

export const resilienceLesson: Lesson = {
  id: 'p5-resilience',
  phaseId: 'phase-05',
  title: 'Patterns de Résilience et Fallback',
  estimatedMinutes: 25,
  content: `# Patterns de Résilience et Fallback : Circuit Breakers et Dégradation Gracieuse

## Introduction

Un système ML en production doit être résilient face aux pannes, aux dégradations de performance et aux attaques. Les patterns de résilience, issus de l'ingénierie des systèmes distribués, sont essentiels pour garantir la disponibilité et la fiabilité des services d'intelligence artificielle.

## Le Circuit Breaker Pattern

### Principe

Le circuit breaker (disjoncteur) empêche un service défaillant de propager sa panne à l'ensemble du système. Inspiré des disjoncteurs électriques, il coupe automatiquement le circuit lorsqu'un seuil d'erreurs est atteint.

### Les Trois États

**Fermé (Closed)** : État normal. Les requêtes passent vers le service ML. Les erreurs sont comptabilisées.

**Ouvert (Open)** : Le seuil d'erreurs est dépassé. Toutes les requêtes sont immédiatement rejetées ou redirigées vers un fallback, sans contacter le service défaillant.

**Semi-ouvert (Half-Open)** : Après un délai de timeout, quelques requêtes tests sont envoyées au service. Si elles réussissent, le circuit se referme. Sinon, il reste ouvert.

### Application aux Systèmes ML

\`\`\`python
class MLCircuitBreaker:
    def __init__(self, failure_threshold=5, reset_timeout=60):
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.reset_timeout = reset_timeout
        self.state = "CLOSED"
        self.last_failure_time = None

    def call(self, predict_fn, features):
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.reset_timeout:
                self.state = "HALF_OPEN"
            else:
                return self.fallback(features)

        try:
            result = predict_fn(features)
            if self.state == "HALF_OPEN":
                self.state = "CLOSED"
                self.failure_count = 0
            return result
        except Exception:
            self.failure_count += 1
            self.last_failure_time = time.time()
            if self.failure_count >= self.failure_threshold:
                self.state = "OPEN"
            return self.fallback(features)

    def fallback(self, features):
        # Modèle de secours ou règles métier
        return default_prediction(features)
\`\`\`

### Quand Utiliser un Circuit Breaker ML

- Le service d'inférence GPU devient lent ou indisponible
- Le modèle principal retourne des erreurs fréquentes
- La latence dépasse un seuil acceptable pour l'expérience utilisateur
- Un fournisseur d'API ML externe (OpenAI, AWS) est en panne

## Dégradation Gracieuse (Graceful Degradation)

### Principe

Plutôt que de tomber en panne complète, le système réduit progressivement ses fonctionnalités tout en maintenant un service minimal acceptable.

### Niveaux de Dégradation pour un Système ML

**Niveau 1 - Service complet :**
Modèle principal avec toutes les features, temps réel, haute précision.

**Niveau 2 - Modèle simplifié :**
Un modèle plus léger (arbre de décision au lieu d'un réseau de neurones profond) avec un sous-ensemble de features.

**Niveau 3 - Règles métier :**
Retour à des règles déterministes codées en dur par des experts métier.

**Niveau 4 - Valeur par défaut :**
Retourner une valeur par défaut sûre (ex: « transaction suspecte » en cas de doute pour la détection de fraude).

### Stratégie de Fallback Multi-niveaux

\`\`\`
Requête → Modèle DL (GPU) → [timeout 100ms]
    ↓ (échec)
Modèle XGBoost (CPU) → [timeout 50ms]
    ↓ (échec)
Règles métier (déterministe) → [timeout 10ms]
    ↓ (échec)
Valeur par défaut sûre
\`\`\`

## Autres Patterns de Résilience

### Retry avec Backoff Exponentiel

Retenter les requêtes échouées avec un délai croissant pour éviter de surcharger un service en difficulté.

\`\`\`python
def predict_with_retry(features, max_retries=3):
    for attempt in range(max_retries):
        try:
            return model.predict(features)
        except TransientError:
            wait_time = (2 ** attempt) + random.uniform(0, 1)
            time.sleep(wait_time)
    return fallback_prediction(features)
\`\`\`

### Bulkhead (Cloison Étanche)

Isoler les ressources par service pour empêcher qu'un composant défaillant ne consomme toutes les ressources.

- Pool de threads dédié par modèle
- GPU partagés avec des quotas stricts
- Files d'attente séparées par priorité de requête

### Timeout Pattern

Définir des timeouts stricts pour chaque étape du pipeline :
- **Prétraitement** : 20ms max
- **Inférence** : 100ms max (modèle DL), 20ms max (modèle classique)
- **Post-traitement** : 10ms max
- **Total** : 200ms max pour une réponse complète

### Cache de Prédictions

Mettre en cache les prédictions pour les entrées fréquentes :
- Réduction de la latence et de la charge GPU
- Fallback en cas de panne du service d'inférence
- Attention à l'invalidation du cache lors du déploiement d'un nouveau modèle

## Chaos Engineering pour le ML

### Principe

Injecter volontairement des pannes pour vérifier la résilience du système :
- **Chaos Monkey** : Tuer aléatoirement des instances de service d'inférence
- **Latence injection** : Ajouter de la latence artificielle aux appels GPU
- **Corruption de données** : Envoyer des données hors distribution pour tester les validations
- **Simulation de drift** : Modifier la distribution des entrées pour tester les alertes

### Game Days

Organiser des sessions régulières où l'équipe simule des scénarios de panne :
1. Le modèle principal est indisponible pendant 30 minutes
2. La latence d'inférence triple soudainement
3. Un drift majeur est détecté sur 40% des features
4. L'API du fournisseur LLM est en panne

## Bonnes Pratiques

1. **Toujours avoir un fallback** : Aucun appel à un service ML ne devrait être un point de défaillance unique
2. **Tester les fallbacks régulièrement** : Un fallback non testé est un fallback qui ne fonctionne pas
3. **Monitorer les activations de fallback** : Chaque activation indique un problème à investiguer
4. **Documenter les niveaux de dégradation** : L'équipe doit savoir ce qui se passe à chaque niveau
5. **Automatiser la récupération** : Le système doit revenir à la normale sans intervention humaine

## Conclusion

La résilience n'est pas un ajout optionnel mais une propriété fondamentale de tout système ML en production. Les patterns de circuit breaker, dégradation gracieuse, retry et bulkhead forment un arsenal complet pour assurer la continuité de service face aux pannes inévitables.`,
  keyPoints: [
    'Le circuit breaker coupe automatiquement les appels vers un service ML défaillant et redirige vers un fallback',
    'La dégradation gracieuse propose plusieurs niveaux : modèle principal, modèle simplifié, règles métier, valeur par défaut',
    'Le pattern bulkhead isole les ressources par service pour empêcher la propagation des pannes',
    'Le retry avec backoff exponentiel évite de surcharger un service en difficulté',
    'Le chaos engineering (injection de pannes) vérifie la résilience en conditions réelles',
    'Chaque activation de fallback doit être monitorée car elle indique un problème sous-jacent à investiguer',
  ],
  resources: [
    {
      title: 'Release It! - Michael Nygard (Patterns de résilience)',
      url: 'https://pragprog.com/titles/mnee2/release-it-second-edition/',
      type: 'book',
    },
    {
      title: 'Netflix Chaos Engineering - Principles',
      url: 'https://principlesofchaos.org/',
      type: 'article',
    },
    {
      title: 'Resilience4j - Fault Tolerance Library',
      url: 'https://resilience4j.readme.io/',
      type: 'tool',
    },
  ],
};
