import { Lesson } from '../../types';

export const secretsLesson: Lesson = {
  id: 'p3-secrets',
  phaseId: 'phase-03',
  title: 'Gestion des secrets dans les pipelines ML',
  content: `
# Gestion des secrets dans les pipelines ML

## Introduction

Les pipelines de Machine Learning manipulent de nombreuses informations sensibles : clés d'API pour les services cloud, identifiants de bases de données, tokens d'accès aux registres de modèles, clés de chiffrement des données. Une mauvaise gestion de ces secrets peut entraîner des fuites de données, des accès non autorisés et des compromissions complètes de l'infrastructure. Cette leçon couvre les meilleures pratiques pour sécuriser les secrets tout au long du cycle de vie ML.

## Les risques courants

### Secrets exposés dans le code

L'erreur la plus fréquente est de coder en dur les secrets directement dans le code source ou les fichiers de configuration :

\`\`\`python
# ❌ MAUVAISE PRATIQUE : secrets dans le code
AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
DB_PASSWORD = "mon_mot_de_passe_123"

# ❌ MAUVAISE PRATIQUE : secrets dans un fichier .env versionné
# .env commité dans git
MLFLOW_TRACKING_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
\`\`\`

### Secrets dans les notebooks Jupyter

Les notebooks sont particulièrement dangereux car les cellules de sortie peuvent contenir des secrets affichés par erreur, et ces notebooks sont souvent partagés ou versionnés.

### Secrets dans les images Docker

Les secrets passés comme arguments de build ou dans des couches intermédiaires restent accessibles via l'historique des couches de l'image.

## Solutions de gestion des secrets

### Variables d'environnement (niveau basique)

\`\`\`python
import os

# ✅ Lire depuis les variables d'environnement
aws_key = os.environ.get("AWS_ACCESS_KEY_ID")
db_password = os.environ.get("DB_PASSWORD")

if not aws_key:
    raise EnvironmentError("AWS_ACCESS_KEY_ID non définie")
\`\`\`

\`\`\`bash
# Fichier .env NON versionné (ajouté dans .gitignore)
export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
export DB_PASSWORD=secret_password

# Charger les variables
source .env
python train.py
\`\`\`

### Gestionnaires de secrets (niveau production)

#### HashiCorp Vault

\`\`\`python
import hvac

def get_secret_from_vault(secret_path, key):
    """Récupère un secret depuis HashiCorp Vault."""
    client = hvac.Client(
        url=os.environ["VAULT_ADDR"],
        token=os.environ["VAULT_TOKEN"],
    )

    # Vérifier l'authentification
    if not client.is_authenticated():
        raise ConnectionError("Non authentifié auprès de Vault")

    # Lire le secret
    secret = client.secrets.kv.v2.read_secret_version(
        path=secret_path,
        mount_point="ml-secrets",
    )
    return secret["data"]["data"][key]

# Usage
db_password = get_secret_from_vault("database/prod", "password")
mlflow_token = get_secret_from_vault("mlflow/tracking", "token")
\`\`\`

#### AWS Secrets Manager

\`\`\`python
import boto3
import json

def get_aws_secret(secret_name, region="eu-west-1"):
    """Récupère un secret depuis AWS Secrets Manager."""
    client = boto3.client("secretsmanager", region_name=region)
    response = client.get_secret_value(SecretId=secret_name)

    if "SecretString" in response:
        return json.loads(response["SecretString"])
    return response["SecretBinary"]

# Usage
db_creds = get_aws_secret("ml-pipeline/database")
connection_string = (
    f"postgresql://{db_creds['username']}:{db_creds['password']}"
    f"@{db_creds['host']}:{db_creds['port']}/{db_creds['database']}"
)
\`\`\`

### Kubernetes Secrets

\`\`\`yaml
apiVersion: v1
kind: Secret
metadata:
  name: ml-pipeline-secrets
  namespace: ml-production
type: Opaque
data:
  mlflow-token: bXlfc2VjcmV0X3Rva2Vu  # base64 encodé
  db-password: cGFzc3dvcmQxMjM=
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-api
spec:
  template:
    spec:
      containers:
        - name: ml-api
          env:
            - name: MLFLOW_TOKEN
              valueFrom:
                secretKeyRef:
                  name: ml-pipeline-secrets
                  key: mlflow-token
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: ml-pipeline-secrets
                  key: db-password
\`\`\`

## Secrets dans Docker

\`\`\`dockerfile
# ❌ MAUVAIS : le secret est visible dans l'historique des couches
ARG API_KEY
RUN curl -H "Authorization: Bearer $API_KEY" https://api.example.com/model

# ✅ BON : utiliser les Docker secrets (BuildKit)
RUN --mount=type=secret,id=api_key \\
    curl -H "Authorization: Bearer $(cat /run/secrets/api_key)" \\
    https://api.example.com/model
\`\`\`

\`\`\`bash
# Build avec secret
DOCKER_BUILDKIT=1 docker build \\
    --secret id=api_key,src=./api_key.txt \\
    -t ml-api:latest .
\`\`\`

## Détection et prévention des fuites

### Git hooks avec pre-commit

\`\`\`yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks

  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
\`\`\`

### Scanner l'historique Git

\`\`\`bash
# Scanner tout l'historique du dépôt
gitleaks detect --source . --verbose

# Scanner uniquement les commits récents
gitleaks detect --source . --log-opts="--since=2024-01-01"
\`\`\`

## Rotation des secrets

La rotation régulière des secrets limite l'impact d'une éventuelle compromission :

\`\`\`python
import schedule
import time

def rotate_api_keys():
    """Rotation automatique des clés API."""
    # 1. Générer une nouvelle clé
    new_key = generate_new_api_key()

    # 2. Mettre à jour dans le gestionnaire de secrets
    update_secret_in_vault("ml-api/key", new_key)

    # 3. Redéployer les services concernés
    trigger_rolling_restart("ml-api-deployment")

    # 4. Révoquer l'ancienne clé après un délai
    schedule.every(1).hour.do(revoke_old_key, old_key)

# Rotation mensuelle
schedule.every(30).days.do(rotate_api_keys)
\`\`\`

## Bonnes pratiques essentielles

- **Ne jamais** commiter de secrets dans le dépôt Git, même temporairement
- **Toujours** ajouter \`.env\`, \`*.pem\`, \`*.key\` au fichier \`.gitignore\`
- **Utiliser** un gestionnaire de secrets (Vault, AWS SM, GCP SM) en production
- **Scanner** régulièrement le code et l'historique Git avec gitleaks ou detect-secrets
- **Rotater** les secrets périodiquement et après tout incident de sécurité
- **Limiter** les permissions : chaque service ne doit accéder qu'aux secrets dont il a besoin
`,
  keyPoints: [
    'Les secrets codés en dur dans le code source ou les notebooks sont la cause principale des fuites de données en ML',
    'Les gestionnaires de secrets (Vault, AWS Secrets Manager) centralisent et sécurisent l\'accès aux informations sensibles',
    'Les Docker secrets de BuildKit empêchent les secrets d\'apparaître dans l\'historique des couches de l\'image',
    'Les outils comme gitleaks et detect-secrets détectent automatiquement les secrets commités par erreur dans Git',
    'La rotation régulière des secrets et le principe du moindre privilège limitent l\'impact des compromissions',
    'Les Kubernetes Secrets injectent les informations sensibles dans les pods sans les exposer dans les manifestes',
  ],
  resources: [
    {
      title: 'HashiCorp Vault Documentation',
      url: 'https://developer.hashicorp.com/vault/docs',
      type: 'article',
    },
    {
      title: 'Gitleaks - Detect secrets in Git repos',
      url: 'https://github.com/gitleaks/gitleaks',
      type: 'tool',
    },
    {
      title: 'Secret Management Best Practices (OWASP)',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html',
      type: 'article',
    },
  ],
  estimatedMinutes: 20,
};
