import { Lesson } from '../../types';

export const sbomLesson: Lesson = {
  id: 'p3-sbom',
  phaseId: 'phase-03',
  title: 'SBOM et signature de modèles ML',
  content: `
# SBOM et signature de modèles ML

## Introduction

La Software Bill of Materials (SBOM) et la signature cryptographique des artefacts sont deux piliers de la sécurité moderne de la chaîne d'approvisionnement logicielle. Dans le contexte du Machine Learning, ces pratiques s'étendent au-delà du code source pour inclure les modèles, les datasets et les pipelines d'entraînement. Elles permettent de garantir l'intégrité, la traçabilité et l'authenticité de chaque composant de votre système ML.

## Qu'est-ce qu'un SBOM ?

Un SBOM est un inventaire complet et structuré de tous les composants qui constituent un logiciel. Pour un projet ML, cela inclut :

- Les bibliothèques Python et leurs versions exactes
- Les modèles pré-entraînés utilisés (avec leur provenance)
- Les datasets d'entraînement et de validation
- Les images Docker de base
- Les outils d'infrastructure (Kubernetes, MLflow, etc.)

### Formats standards

Deux formats dominent l'écosystème :

- **SPDX** (Software Package Data Exchange) : standard ISO/IEC 5962:2021
- **CycloneDX** : format OWASP optimisé pour la sécurité

### Générer un SBOM pour un projet ML

\`\`\`bash
# Avec CycloneDX pour Python
pip install cyclonedx-bom
cyclonedx-py requirements \
    --input-file requirements.txt \
    --output-format json \
    --output-file sbom.json

# Avec Syft pour les images Docker
syft mon-ml-api:latest -o cyclonedx-json > docker-sbom.json

# Avec Trivy (SBOM + vulnérabilités)
trivy image --format cyclonedx \
    --output trivy-sbom.json \
    mon-ml-api:latest
\`\`\`

### Contenu d'un SBOM CycloneDX

\`\`\`json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.5",
  "metadata": {
    "component": {
      "type": "application",
      "name": "ml-prediction-api",
      "version": "2.1.0"
    },
    "timestamp": "2025-01-15T10:30:00Z"
  },
  "components": [
    {
      "type": "library",
      "name": "tensorflow",
      "version": "2.15.0",
      "purl": "pkg:pypi/tensorflow@2.15.0",
      "hashes": [
        {
          "alg": "SHA-256",
          "content": "abc123def456..."
        }
      ]
    },
    {
      "type": "machine-learning-model",
      "name": "bert-base-uncased",
      "version": "1.0",
      "supplier": {
        "name": "Hugging Face",
        "url": ["https://huggingface.co/bert-base-uncased"]
      }
    }
  ]
}
\`\`\`

## ML-BOM : SBOM spécifique au Machine Learning

Le concept de ML-BOM étend le SBOM classique pour couvrir les spécificités du ML :

\`\`\`python
import json
from datetime import datetime

def generate_ml_bom(model_info, training_info, dependencies):
    """Génère un ML-BOM pour un modèle ML."""
    ml_bom = {
        "format": "ML-BOM",
        "version": "1.0",
        "timestamp": datetime.utcnow().isoformat(),
        "model": {
            "name": model_info["name"],
            "version": model_info["version"],
            "framework": model_info["framework"],
            "architecture": model_info["architecture"],
            "hash": model_info["sha256"],
            "format": model_info["format"],  # safetensors, onnx, etc.
        },
        "training": {
            "dataset": training_info["dataset"],
            "dataset_hash": training_info["dataset_hash"],
            "hyperparameters": training_info["hyperparameters"],
            "metrics": training_info["metrics"],
            "training_date": training_info["date"],
            "compute": training_info["compute_info"],
        },
        "dependencies": dependencies,
        "vulnerabilities_scanned": True,
        "signed": False,
    }
    return ml_bom

# Exemple d'utilisation
ml_bom = generate_ml_bom(
    model_info={
        "name": "classification-clients",
        "version": "2.1.0",
        "framework": "scikit-learn==1.3.2",
        "architecture": "RandomForestClassifier",
        "sha256": "a1b2c3...",
        "format": "safetensors",
    },
    training_info={
        "dataset": "clients-2024-q4",
        "dataset_hash": "d4e5f6...",
        "hyperparameters": {"n_estimators": 200, "max_depth": 15},
        "metrics": {"accuracy": 0.94, "f1": 0.92},
        "date": "2025-01-10",
        "compute_info": "4x CPU, 16GB RAM",
    },
    dependencies=[
        {"name": "scikit-learn", "version": "1.3.2"},
        {"name": "numpy", "version": "1.26.2"},
        {"name": "pandas", "version": "2.1.4"},
    ],
)
\`\`\`

## Signature des modèles avec Sigstore

Sigstore est un projet open-source qui fournit une signature cryptographique sans gestion de clés complexe, grâce à des certificats éphémères liés à une identité OIDC.

### Signer un modèle avec cosign

\`\`\`bash
# Installer cosign
brew install cosign  # macOS
# ou : go install github.com/sigstore/cosign/v2/cmd/cosign@latest

# Signer un artefact modèle
cosign sign-blob --output-signature model.sig \
    --output-certificate model.crt \
    model.safetensors

# Vérifier la signature
cosign verify-blob \
    --signature model.sig \
    --certificate model.crt \
    --certificate-identity user@example.com \
    --certificate-oidc-issuer https://accounts.google.com \
    model.safetensors
\`\`\`

### Signer une image Docker contenant un modèle

\`\`\`bash
# Signer l'image Docker
cosign sign ghcr.io/mon-org/ml-api:v2.1.0

# Vérifier avant de déployer
cosign verify \
    --certificate-identity-regexp ".*@mon-org.com" \
    --certificate-oidc-issuer https://token.actions.githubusercontent.com \
    ghcr.io/mon-org/ml-api:v2.1.0
\`\`\`

## Intégration dans le pipeline CI/CD

\`\`\`yaml
# .github/workflows/ml-security.yml
name: ML Security Pipeline

on:
  push:
    branches: [main]

jobs:
  security:
    runs-on: ubuntu-latest
    permissions:
      id-token: write  # Nécessaire pour Sigstore
      contents: read

    steps:
      - uses: actions/checkout@v4

      - name: Générer le SBOM
        run: |
          pip install cyclonedx-bom
          cyclonedx-py requirements \\
            --input-file requirements.txt \\
            --output-format json \\
            --output-file sbom.json

      - name: Scanner les vulnérabilités
        run: |
          pip install pip-audit
          pip-audit -r requirements.txt

      - name: Signer le modèle
        uses: sigstore/cosign-installer@v3
      - run: |
          cosign sign-blob --yes \\
            --output-signature model.sig \\
            --output-certificate model.crt \\
            artifacts/model.safetensors

      - name: Publier le SBOM et les signatures
        uses: actions/upload-artifact@v4
        with:
          name: security-artifacts
          path: |
            sbom.json
            model.sig
            model.crt
\`\`\`

## Bonnes pratiques

- Générez un SBOM à chaque build et stockez-le avec l'artefact correspondant
- Signez tous les artefacts critiques : modèles, images Docker, datasets
- Vérifiez les signatures avant chaque déploiement en production
- Incluez les informations spécifiques ML (dataset, hyperparamètres, métriques) dans un ML-BOM
- Automatisez la génération de SBOM et la signature dans votre pipeline CI/CD
- Scannez régulièrement les SBOM pour détecter les nouvelles vulnérabilités (CVE)
`,
  keyPoints: [
    'Un SBOM inventorie tous les composants d\'un projet ML (bibliothèques, modèles, datasets) dans un format standardisé comme CycloneDX',
    'Le ML-BOM étend le SBOM classique avec les métadonnées spécifiques au ML : dataset, hyperparamètres, métriques et provenance',
    'Sigstore et cosign permettent de signer cryptographiquement les modèles et images Docker sans gestion complexe de clés',
    'La vérification des signatures avant déploiement garantit que les artefacts n\'ont pas été altérés depuis leur création',
    'L\'intégration SBOM + signature dans le pipeline CI/CD automatise la traçabilité et la sécurité à chaque release',
  ],
  resources: [
    {
      title: 'Sigstore - Signing made simple',
      url: 'https://www.sigstore.dev/',
      type: 'tool',
    },
    {
      title: 'CycloneDX - SBOM Standard (OWASP)',
      url: 'https://cyclonedx.org/',
      type: 'article',
    },
    {
      title: 'Securing ML Models with SBOMs (The Linux Foundation)',
      url: 'https://www.linuxfoundation.org/blog/the-state-of-software-bill-of-materials-sbom',
      type: 'article',
    },
  ],
  estimatedMinutes: 25,
};
