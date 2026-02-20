import { Lesson } from '../../types';

export const applicationSecurity: Lesson = {
  id: 'p1-application-security',
  phaseId: 'phase-01',
  title: 'Sécurité des applications et développement sécurisé',
  content: `
## Introduction à la sécurité applicative

La sécurité des applications est l'un des domaines les plus critiques de la cybersécurité. Selon le rapport Verizon DBIR, les vulnérabilités applicatives sont impliquées dans une proportion significative des compromissions. Pour le Security+ SY0-701, vous devez comprendre comment intégrer la sécurité dans le cycle de développement, connaître les vulnérabilités courantes (OWASP Top 10) et maîtriser les outils d'analyse de code.

## Cycle de développement sécurisé (SDLC)

Le **Secure Software Development Lifecycle** (SSDLC) intègre la sécurité à chaque phase du développement logiciel, plutôt que de l'ajouter en fin de processus.

| Phase SDLC | Activités de sécurité | Livrables |
|------------|----------------------|-----------|
| **Planification** | Modélisation des menaces, exigences de sécurité | Document d'exigences de sécurité |
| **Conception** | Revue d'architecture, principes de conception sécurisée | Architecture threat model |
| **Développement** | Codage sécurisé, revue de code, SAST | Rapport d'analyse statique |
| **Test** | Tests de pénétration, DAST, fuzzing | Rapport de vulnérabilités |
| **Déploiement** | Configuration sécurisée, scan de vulnérabilités | Checklist de durcissement |
| **Maintenance** | Patch management, monitoring, réponse aux incidents | Bulletins de sécurité |

### Modèles de développement et sécurité

- **Waterfall** : sécurité intégrée séquentiellement, revue à chaque phase (moins flexible)
- **Agile** : sécurité intégrée dans chaque sprint via des "security stories"
- **DevSecOps** : automatisation complète de la sécurité dans le pipeline CI/CD

## DevSecOps : la sécurité Shift-Left

Le concept de **shift-left** consiste à déplacer les contrôles de sécurité le plus tôt possible dans le cycle de développement. Plus une vulnérabilité est détectée tôt, moins sa correction coûte cher.

\`\`\`
Pipeline CI/CD avec sécurité intégrée :

 Commit → Build → Test → Stage → Deploy
   │        │       │       │       │
   ▼        ▼       ▼       ▼       ▼
 Secrets  SAST    DAST   Pentest  WAF
 Scan    + SCA   + IAST  manuel   + RASP
 (git    (Sonar  (OWASP         Monitoring
 hooks)  Qube)    ZAP)          Runtime
\`\`\`

**Composants clés du DevSecOps :**
- **Pre-commit hooks** : empêcher les secrets (clés API, mots de passe) d'entrer dans le dépôt
- **SAST dans le build** : analyse statique automatique à chaque compilation
- **SCA automatisé** : vérification des dépendances vulnérables
- **DAST en staging** : tests dynamiques sur l'application déployée
- **Infrastructure as Code scanning** : vérification des configurations cloud

## OWASP Top 10 (2021) - Détail complet

L'OWASP Top 10 est la référence mondiale des risques de sécurité applicative les plus critiques. La version 2021 est celle à connaître pour le Security+.

### A01:2021 - Contrôle d'accès défaillant (Broken Access Control)

Le risque numéro 1. Les utilisateurs peuvent agir en dehors de leurs permissions prévues.

**Exemples :**
- Modification d'URL pour accéder aux données d'un autre utilisateur : \`/api/users/123\` → \`/api/users/456\`
- Élévation de privilèges : un utilisateur standard accède aux fonctions administrateur
- IDOR (Insecure Direct Object Reference) : accès direct aux objets via leur identifiant

**Remédiation :**
- Vérification côté serveur à chaque requête
- Refuser par défaut (deny by default)
- Journaliser les échecs de contrôle d'accès

### A02:2021 - Défaillances cryptographiques (Cryptographic Failures)

Anciennement "Exposition de données sensibles". Concerne le mauvais usage ou l'absence de cryptographie.

**Exemples :**
- Transmission de données sensibles en clair (HTTP au lieu de HTTPS)
- Utilisation d'algorithmes obsolètes (MD5, SHA-1, DES)
- Clés cryptographiques stockées en clair dans le code source

**Remédiation :** Chiffrer les données sensibles au repos (AES-256) et en transit (TLS 1.2+), utiliser des algorithmes modernes.

### A03:2021 - Injection

L'injection de code malveillant dans les entrées de l'application : SQL, NoSQL, LDAP, OS command, XSS.

\`\`\`sql
-- Exemple d'injection SQL
-- Requête vulnérable :
SELECT * FROM users WHERE name = '$input';

-- Entrée malveillante :
-- $input = ' OR '1'='1' --
-- Résultat : SELECT * FROM users WHERE name = '' OR '1'='1' --'
-- → Retourne TOUS les utilisateurs

-- Requête sécurisée (requête paramétrée) :
SELECT * FROM users WHERE name = ?;
-- Le paramètre est traité comme une donnée, pas comme du code
\`\`\`

### A04:2021 - Conception non sécurisée (Insecure Design)

Catégorie nouvelle en 2021. Concerne les défauts fondamentaux de conception, pas les bugs d'implémentation.

**Exemples :**
- Absence de limites sur les tentatives de connexion
- Processus de récupération de mot de passe basé uniquement sur les questions de sécurité
- Absence de modélisation des menaces

**Remédiation :** Threat modeling dès la phase de conception, utilisation de design patterns sécurisés, revues d'architecture.

### A05:2021 - Mauvaise configuration de sécurité (Security Misconfiguration)

**Exemples :**
- Fonctionnalités inutiles activées (ports, services, pages de démonstration)
- Comptes par défaut avec mots de passe inchangés
- Messages d'erreur révélant des informations sensibles (stack traces)
- En-têtes de sécurité HTTP manquants

### A06:2021 - Composants vulnérables et obsolètes

Utilisation de bibliothèques, frameworks ou composants avec des vulnérabilités connues.

**Remédiation :**
- Inventaire des composants (SBOM - Software Bill of Materials)
- Outils de scan : \`npm audit\`, Snyk, Dependabot, OWASP Dependency-Check
- Politique de mise à jour régulière

### A07:2021 - Identification et authentification défaillantes

**Exemples :**
- Autorisation du credential stuffing (réutilisation de mots de passe volés)
- Mots de passe faibles autorisés
- Absence de MFA sur les comptes critiques
- Tokens de session prévisibles

### A08:2021 - Manque d'intégrité des logiciels et des données

**Exemples :**
- Mises à jour automatiques sans vérification de signature
- Sérialisation non sécurisée (insecure deserialization)
- Pipeline CI/CD compromis (supply chain attack)

### A09:2021 - Journalisation et surveillance insuffisantes

**Exemples :**
- Événements critiques non journalisés (tentatives de connexion échouées, accès aux données sensibles)
- Logs stockés uniquement localement (supprimés par l'attaquant)
- Absence d'alertes en temps réel

### A10:2021 - Falsification de requêtes côté serveur (SSRF)

L'application effectue des requêtes HTTP vers des URL fournies par l'utilisateur sans validation.

\`\`\`
Attaque SSRF :
Utilisateur → Application web → Requête interne
                                  │
                                  ▼
                         http://169.254.169.254/
                         (Métadonnées cloud AWS)
                         → Récupération des credentials IAM
\`\`\`

**Remédiation :** Valider et filtrer les URL côté serveur, bloquer les plages d'adresses internes, utiliser des allowlists.

## Validation des entrées

### Allowlisting vs Blocklisting

| Approche | Description | Efficacité |
|----------|-------------|------------|
| **Allowlisting** (liste blanche) | N'accepter que les entrées connues comme valides | **Recommandée** - plus sécurisée |
| **Blocklisting** (liste noire) | Rejeter les entrées connues comme dangereuses | Moins fiable - peut être contournée |

### Requêtes paramétrées

\`\`\`python
# Python - Mauvaise pratique (vulnérable à l'injection SQL)
query = f"SELECT * FROM users WHERE email = '{user_input}'"

# Bonne pratique (requête paramétrée)
cursor.execute("SELECT * FROM users WHERE email = %s", (user_input,))
\`\`\`

### Encodage de sortie (Output Encoding)

L'encodage de sortie transforme les caractères spéciaux avant de les afficher, empêchant l'exécution de scripts XSS.

\`\`\`html
<!-- Entrée malveillante : <script>alert('XSS')</script> -->
<!-- Après encodage : &lt;script&gt;alert('XSS')&lt;/script&gt; -->
<!-- Le navigateur affiche le texte au lieu d'exécuter le script -->
\`\`\`

## Sécurité des API

### REST vs SOAP

| Aspect | REST | SOAP |
|--------|------|------|
| Format | JSON (léger) | XML (verbeux) |
| Sécurité | OAuth 2.0, JWT, HTTPS | WS-Security (intégré) |
| Stateful | Non (stateless) | Peut être stateful |
| Complexité | Simple | Complexe |

### Sécurisation des API

- **Authentification** : OAuth 2.0 avec tokens JWT, clés API avec rotation régulière
- **Rate limiting** : limiter le nombre de requêtes par IP/utilisateur pour prévenir les abus
- **Validation des entrées** : valider tous les paramètres côté serveur
- **Versioning** : maintenir la rétrocompatibilité pour les mises à jour de sécurité
- **Documentation** : OpenAPI/Swagger avec schémas de validation

**Question type Security+ :** *Quelle méthode d'authentification est la plus appropriée pour une API REST publique ?*
→ Réponse : OAuth 2.0 avec tokens JWT à durée de vie courte.

## Outils d'analyse de code

| Outil | Type | Phase | Ce qu'il détecte |
|-------|------|-------|------------------|
| **SAST** | Analyse statique | Build | Vulnérabilités dans le code source (sans exécution) |
| **DAST** | Analyse dynamique | Test/Staging | Vulnérabilités de l'application en cours d'exécution |
| **IAST** | Analyse interactive | Runtime | Combine SAST et DAST via un agent dans l'application |
| **SCA** | Composition logicielle | Build | Vulnérabilités dans les dépendances tierces |

**Outils courants :**
- **SAST** : SonarQube, Checkmarx, Fortify, Semgrep
- **DAST** : OWASP ZAP, Burp Suite, Nikto
- **SCA** : Snyk, npm audit, Dependabot, OWASP Dependency-Check
- **IAST** : Contrast Security, Hdiv Security

## Pratiques de codage sécurisé

### Gestion des erreurs

\`\`\`python
# Mauvaise pratique - révèle des informations sensibles
try:
    db.execute(query)
except Exception as e:
    return {"error": str(e)}  # Stack trace exposée !

# Bonne pratique - message générique + journalisation interne
try:
    db.execute(query)
except Exception as e:
    logger.error(f"DB error: {e}", exc_info=True)  # Log interne détaillé
    return {"error": "Une erreur interne est survenue"}  # Message générique
\`\`\`

### Journalisation sécurisée

**Ce qu'il faut journaliser :**
- Tentatives d'authentification (succès et échecs)
- Actions administratives
- Accès aux données sensibles
- Erreurs et exceptions
- Modifications de configuration

**Ce qu'il ne faut JAMAIS journaliser :**
- Mots de passe (même hachés)
- Numéros de carte bancaire complets
- Données personnelles sensibles (SSN, données médicales)
- Tokens d'authentification actifs
- Clés cryptographiques

### Gestion de la mémoire

- **Buffer overflow** : écriture au-delà des limites d'un tampon mémoire. Utiliser des langages memory-safe (Rust, Go) ou des fonctions sécurisées (strncpy au lieu de strcpy).
- **Use-after-free** : utilisation de mémoire déjà libérée. Outils de détection : AddressSanitizer, Valgrind.
- **Integer overflow** : dépassement de la capacité d'un entier. Validation des tailles avant les allocations.

## Code Signing et sécurité de la supply chain

La signature de code garantit l'**intégrité** et l'**authenticité** du logiciel distribué.

\`\`\`
Processus de signature de code :

Développeur → Code source → Build → Binaire
                                      │
                                      ▼
                              Hash du binaire
                                      │
                                      ▼
                      Signature avec clé privée du développeur
                                      │
                                      ▼
                           Binaire signé distribué
                                      │
                                      ▼
              Utilisateur vérifie avec la clé publique du développeur
\`\`\`

**Attaques supply chain :**
- Compromission du pipeline CI/CD (SolarWinds, 2020)
- Injection de code malveillant dans des packages populaires (typosquatting npm)
- Compromission des certificats de signature

**Mitigations :**
- SBOM (Software Bill of Materials) pour tracer tous les composants
- Vérification des signatures de tous les artefacts
- Contrôle d'accès strict au pipeline CI/CD
- Reproductibilité des builds (reproducible builds)

## En-têtes de sécurité HTTP

\`\`\`
# Configuration recommandée (nginx)
add_header Content-Security-Policy "default-src 'self';" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
\`\`\`

| En-tête | Fonction | Protège contre |
|---------|----------|----------------|
| **CSP** (Content-Security-Policy) | Contrôle les sources de contenu autorisées | XSS, injection de données |
| **HSTS** (Strict-Transport-Security) | Force HTTPS pour toutes les connexions | Downgrade attacks, MITM |
| **X-Frame-Options** | Empêche l'intégration dans un iframe | Clickjacking |
| **X-Content-Type-Options** | Empêche le MIME sniffing | Exécution de fichiers malveillants |

## Sécurité des applications mobiles

### Menaces spécifiques

- **Certificate pinning** : l'application n'accepte qu'un certificat spécifique, empêchant les attaques MITM même avec un certificat valide
- **Stockage sécurisé** : utiliser le Keychain (iOS) ou le Keystore (Android) pour les données sensibles, jamais le stockage local en clair
- **Jailbreak/Root detection** : détecter les appareils compromis qui contournent les contrôles de sécurité de l'OS
- **Sideloading** : installation d'applications depuis des sources non officielles (risque de malware)

### Bonnes pratiques mobile

- Chiffrer les données locales sensibles
- Utiliser des mécanismes d'authentification biométrique (TouchID, FaceID)
- Implémenter la détection d'environnements émulés
- Obfusquer le code pour compliquer le reverse engineering
- Valider les entrées côté serveur (ne jamais faire confiance au client mobile)

## Fuzzing et tests de sécurité

Le **fuzzing** consiste à envoyer des données aléatoires ou semi-aléatoires en entrée d'un programme pour découvrir des vulnérabilités.

**Types de fuzzing :**
- **Dumb fuzzing** : données purement aléatoires
- **Smart fuzzing** : données générées en comprenant le format attendu (mutation-based, generation-based)
- **Coverage-guided fuzzing** : utilise la couverture de code pour guider la génération (AFL, LibFuzzer)

## Gestion des dépendances

\`\`\`bash
# npm - Audit des dépendances vulnérables
npm audit
npm audit fix

# Python - Vérification avec safety
pip install safety
safety check

# Java - OWASP Dependency-Check
mvn org.owasp:dependency-check-maven:check
\`\`\`

**Stratégie de gestion :**
- Scanner automatiquement les dépendances dans le pipeline CI/CD
- Configurer Dependabot ou Renovate pour les mises à jour automatiques
- Maintenir un inventaire SBOM de tous les composants
- Définir une politique de mise à jour (critique : 24h, haute : 7 jours, moyenne : 30 jours)
`,
  keyPoints: [
    'Le SDLC sécurisé intègre la sécurité à chaque phase du développement : de la modélisation des menaces en conception aux tests de pénétration avant le déploiement.',
    'Le DevSecOps "shift-left" déplace les contrôles de sécurité le plus tôt possible dans le pipeline CI/CD, réduisant le coût de correction des vulnérabilités.',
    'L\'OWASP Top 10 2021 classe le contrôle d\'accès défaillant (Broken Access Control) comme le risque numéro 1, suivi des défaillances cryptographiques et des injections.',
    'Les requêtes paramétrées sont la défense principale contre les injections SQL. L\'allowlisting est préférable au blocklisting pour la validation des entrées.',
    'SAST analyse le code source sans exécution, DAST teste l\'application en cours d\'exécution, IAST combine les deux approches, et SCA détecte les vulnérabilités dans les dépendances.',
    'Les en-têtes HTTP de sécurité (CSP, HSTS, X-Frame-Options) constituent une couche de défense essentielle contre les attaques côté client comme le XSS et le clickjacking.',
    'La sécurité de la supply chain logicielle nécessite la signature de code, le SBOM, le contrôle du pipeline CI/CD et la vérification des dépendances.',
    'Le fuzzing et les tests de sécurité automatisés (SAST, DAST) doivent être intégrés dans le pipeline CI/CD pour une détection continue des vulnérabilités.',
  ],
  resources: [
    {
      title: 'OWASP Top 10 (2021) - Documentation officielle',
      url: 'https://owasp.org/Top10/',
      type: 'article',
    },
    {
      title: 'CompTIA Security+ SY0-701 - Application Security (Professor Messer)',
      url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/application-security/',
      type: 'video',
    },
    {
      title: 'OWASP Secure Coding Practices Quick Reference Guide',
      url: 'https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/',
      type: 'article',
    },
    {
      title: 'DevSecOps Guideline - OWASP',
      url: 'https://owasp.org/www-project-devsecops-guideline/',
      type: 'article',
    },
  ],
  estimatedMinutes: 45,
};
