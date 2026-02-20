import { Lesson } from '../../types';

export const cryptographie: Lesson = {
  id: 'p1-cryptographie',
  phaseId: 'phase-01',
  title: 'Cryptographie : chiffrement, hachage, PKI et signatures numériques',
  content: `
## Introduction à la cryptographie

La cryptographie est la pierre angulaire de la cybersécurité. Elle permet de garantir la **confidentialité**, l'**intégrité**, l'**authenticité** et la **non-répudiation** des données. Pour le Security+, il est essentiel de maîtriser les différents types de chiffrement, les algorithmes courants et les infrastructures associées.

## Chiffrement symétrique

Le chiffrement symétrique utilise **une seule clé** pour chiffrer et déchiffrer les données. Il est rapide et adapté au traitement de gros volumes de données.

**Algorithmes courants :**
- **AES (Advanced Encryption Standard)** : standard actuel, clés de 128, 192 ou 256 bits. Utilisé partout (TLS, VPN, chiffrement de disque).
- **3DES (Triple DES)** : applique DES trois fois. Considéré comme obsolète, remplacé par AES.
- **ChaCha20** : alternative à AES, performant sur mobile (utilisé par WireGuard).

**Modes de fonctionnement :**
- **CBC (Cipher Block Chaining)** : chaque bloc dépend du précédent via un vecteur d'initialisation (IV).
- **GCM (Galois/Counter Mode)** : chiffrement authentifié, fournit confidentialité et intégrité.
- **CTR (Counter)** : transforme un chiffrement par blocs en chiffrement par flux.

\`\`\`
Exemple simplifié :
Clé = "MaCléSecrète256b"
Texte clair → AES-256-GCM(clé, IV) → Texte chiffré + Tag d'authentification
\`\`\`

**Problème principal** : la distribution sécurisée des clés entre les parties.

## Chiffrement asymétrique

Le chiffrement asymétrique utilise **une paire de clés** : une clé publique (diffusée) et une clé privée (secrète).

**Algorithmes courants :**
- **RSA** : basé sur la factorisation de grands nombres premiers. Clés de 2048 ou 4096 bits.
- **ECC (Elliptic Curve Cryptography)** : sécurité équivalente à RSA avec des clés plus courtes (256 bits ECC ≈ 3072 bits RSA).
- **Diffie-Hellman (DH / ECDH)** : échange de clés sécurisé sur un canal non sécurisé.

**Usages :**
- Chiffrement de petits volumes de données (clés de session)
- Signatures numériques
- Échange de clés

\`\`\`
Alice veut envoyer un message à Bob :
1. Alice chiffre avec la clé publique de Bob
2. Seul Bob peut déchiffrer avec sa clé privée
\`\`\`

## Fonctions de hachage

Le hachage produit une **empreinte de taille fixe** à partir de données de taille variable. C'est une fonction à sens unique (irréversible).

**Propriétés requises :**
- **Résistance à la pré-image** : impossible de retrouver le message original
- **Résistance aux collisions** : impossible de trouver deux messages avec le même hash
- **Effet avalanche** : un changement minime modifie radicalement le hash

**Algorithmes :**
- **SHA-256 / SHA-3** : standards actuels, recommandés pour la sécurité
- **MD5** : cassé, ne plus utiliser pour la sécurité (acceptable pour vérifier l'intégrité de fichiers non sensibles)
- **HMAC** : combine une clé secrète avec une fonction de hachage pour authentifier les messages

\`\`\`
echo "Security+" | sha256sum
→ a7f3c8d2e1b5... (empreinte unique de 256 bits)
\`\`\`

## PKI (Public Key Infrastructure)

La PKI est l'ensemble des composants permettant de gérer les certificats numériques et les clés publiques.

**Composants clés :**
- **CA (Certificate Authority)** : autorité de certification qui signe les certificats (ex : Let's Encrypt, DigiCert)
- **RA (Registration Authority)** : vérifie l'identité avant la délivrance du certificat
- **CRL (Certificate Revocation List)** : liste des certificats révoqués
- **OCSP (Online Certificate Status Protocol)** : vérification en temps réel du statut d'un certificat

**Certificats X.509 :**
- Contiennent : clé publique, identité du propriétaire, signature de la CA, période de validité
- Types : DV (Domain Validation), OV (Organization Validation), EV (Extended Validation)
- Formats : PEM (.pem, .crt), DER (.der), PKCS#12 (.p12, .pfx)

## Signatures numériques

La signature numérique garantit l'**authenticité** et la **non-répudiation** d'un message.

**Processus :**
1. L'expéditeur calcule le hash du message
2. Le hash est chiffré avec la clé privée de l'expéditeur → signature
3. Le destinataire déchiffre la signature avec la clé publique de l'expéditeur
4. Il compare le hash obtenu avec le hash du message reçu

**Algorithmes :** RSA, DSA, ECDSA, EdDSA (Ed25519)

## TLS (Transport Layer Security)

TLS sécurise les communications réseau (HTTPS, SMTPS, etc.). La version actuelle est **TLS 1.3**.

**Handshake TLS 1.3 simplifié :**
1. **Client Hello** : suites de chiffrement supportées, extensions
2. **Server Hello** : suite choisie, certificat du serveur
3. **Échange de clés** : via ECDHE (Ephemeral Diffie-Hellman sur courbes elliptiques)
4. **Vérification** : le client vérifie le certificat via la chaîne de confiance PKI
5. **Communication chiffrée** : avec la clé de session symétrique dérivée

**Points clés Security+ :**
- TLS 1.0 et 1.1 sont dépréciés
- Perfect Forward Secrecy (PFS) : compromission d'une clé n'affecte pas les sessions passées
- Les suites de chiffrement faibles (RC4, DES) doivent être désactivées
`,
  keyPoints: [
    'Le chiffrement symétrique (AES-256) est rapide mais nécessite un échange sécurisé de clés ; le chiffrement asymétrique (RSA, ECC) résout ce problème avec des paires de clés.',
    'Les fonctions de hachage (SHA-256, SHA-3) garantissent l\'intégrité des données. MD5 et SHA-1 sont considérés comme cassés.',
    'La PKI repose sur les autorités de certification (CA), les certificats X.509 et les mécanismes de révocation (CRL/OCSP).',
    'Les signatures numériques assurent l\'authenticité et la non-répudiation en chiffrant le hash avec la clé privée.',
    'TLS 1.3 simplifie le handshake et impose Perfect Forward Secrecy. Les versions antérieures à 1.2 sont dépréciées.',
    'HMAC combine hachage et clé secrète pour authentifier les messages sans chiffrement asymétrique.',
  ],
  resources: [
    {
      title: 'CompTIA Security+ SY0-701 - Cryptography (Professor Messer)',
      url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/cryptographic-solutions/',
      type: 'video',
    },
    {
      title: 'Practical Cryptography for Developers (Nakov)',
      url: 'https://cryptobook.nakov.com/',
      type: 'book',
    },
    {
      title: 'OWASP Cryptographic Failures',
      url: 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/',
      type: 'article',
    },
  ],
  estimatedMinutes: 25,
};
