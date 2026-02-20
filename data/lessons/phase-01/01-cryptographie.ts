import { Lesson } from '../../types';

export const cryptographie: Lesson = {
  id: 'p1-cryptographie',
  phaseId: 'phase-01',
  title: 'Cryptographie : chiffrement, hachage, PKI et signatures numériques',
  content: `
## Introduction a la cryptographie

La cryptographie est la pierre angulaire de la cybersecurite. Elle permet de garantir quatre proprietes fondamentales, souvent resumees par l'acronyme **CIAN** :

- **Confidentialite** : seules les personnes autorisees peuvent lire les donnees
- **Integrite** : les donnees n'ont pas ete modifiees en transit ou au repos
- **Authenticite** : l'expediteur est bien celui qu'il pretend etre
- **Non-repudiation** : l'expediteur ne peut pas nier avoir envoye le message

Pour le Security+ SY0-701, la cryptographie est un domaine majeur. Vous devez maitriser les algorithmes, les modes de fonctionnement, les infrastructures PKI, les protocoles TLS, et surtout savoir **quand utiliser quoi** dans des scenarios reels.

---

## 1. Chiffrement symetrique

Le chiffrement symetrique utilise **une seule cle partagee** pour chiffrer et dechiffrer les donnees. Il est rapide et adapte au traitement de gros volumes de donnees (chiffrement de disque, VPN, TLS pour les donnees).

### Chiffrement par blocs vs chiffrement par flux

| Caracteristique | Chiffrement par blocs | Chiffrement par flux |
|---|---|---|
| Fonctionnement | Traite les donnees par blocs de taille fixe (ex: 128 bits) | Traite les donnees bit par bit ou octet par octet |
| Exemples | AES, 3DES, Blowfish | ChaCha20, RC4 (obsolete) |
| Performance | Plus lent, necessite du padding | Plus rapide, pas de padding |
| Utilisation | Chiffrement de fichiers, disques, bases de donnees | Streaming, communications en temps reel, mobile |
| Securite | Depend du mode de fonctionnement | Vulnerable si le meme flux de cle est reutilise |
| Parallelisable | Depend du mode (CTR oui, CBC non) | Generalement oui |

### Comparaison des algorithmes symetriques

| Algorithme | Taille de cle | Taille de bloc | Vitesse | Statut | Cas d'usage |
|---|---|---|---|---|---|
| **AES-128** | 128 bits | 128 bits | Tres rapide (acceleration materielle AES-NI) | Standard actuel | Usage general, TLS, VPN |
| **AES-256** | 256 bits | 128 bits | Rapide | Standard actuel, plus haute securite | Donnees classifiees, conformite gouvernementale |
| **3DES** | 168 bits (effectif 112) | 64 bits | Lent (3x DES) | **Deprecie** (NIST 2023) | Legacy uniquement, migration vers AES |
| **ChaCha20** | 256 bits | N/A (flux) | Tres rapide sur mobile | Recommande | Mobile, WireGuard, TLS sur appareils sans AES-NI |
| **Blowfish** | 32-448 bits | 64 bits | Rapide | Ancien, deconseille | Remplace par Twofish/AES |
| **RC4** | 40-2048 bits | N/A (flux) | Tres rapide | **Casse, interdit** | Ne plus utiliser |

> **Point Security+ :** AES est LE standard. Si une question mentionne le chiffrement de donnees au repos ou en transit sans contrainte particuliere, la reponse est AES-256. ChaCha20 est l'alternative pour les appareils mobiles sans acceleration materielle AES.

### Modes de fonctionnement des chiffrements par blocs

Les modes de fonctionnement determinent **comment** les blocs de texte clair sont traites. Le choix du mode est critique pour la securite.

#### ECB (Electronic Codebook) - A NE PAS UTILISER

\`\`\`
Texte clair:  [Bloc 1] [Bloc 2] [Bloc 3] [Bloc 4]
                 |         |         |         |
              AES(K)    AES(K)    AES(K)    AES(K)
                 |         |         |         |
Texte chiffre:[C1]      [C2]      [C3]      [C4]
\`\`\`

- Chaque bloc est chiffre independamment avec la meme cle
- **Probleme majeur** : des blocs identiques produisent des chiffres identiques (motifs visibles)
- L'exemple classique est le "pingouin ECB" : une image chiffree en ECB conserve la silhouette
- **Ne jamais utiliser ECB** pour des donnees reelles

#### CBC (Cipher Block Chaining)

\`\`\`
         IV
         |
Bloc 1 →XOR→ AES(K) → C1
                        |
Bloc 2 →    XOR    → AES(K) → C2
                                |
Bloc 3 →        XOR        → AES(K) → C3
\`\`\`

- Chaque bloc est XORe avec le bloc chiffre precedent avant chiffrement
- Le premier bloc utilise un **Vecteur d'Initialisation (IV)** aleatoire
- Avantage : les blocs identiques produisent des chiffres differents
- Inconvenient : **non parallelisable** pour le chiffrement (mais oui pour le dechiffrement)
- Vulnerable a l'attaque **padding oracle** (ex: POODLE sur SSL 3.0)
- Fournit la confidentialite mais **pas l'integrite**

#### CTR (Counter Mode)

\`\`\`
Nonce+Ctr=0   Nonce+Ctr=1   Nonce+Ctr=2
     |              |              |
  AES(K)         AES(K)         AES(K)
     |              |              |
Bloc 1 →XOR→ C1  Bloc 2 →XOR→ C2  Bloc 3 →XOR→ C3
\`\`\`

- Transforme un chiffrement par blocs en chiffrement par flux
- Un compteur (nonce + compteur) est chiffre, puis XORe avec le texte clair
- **Parallelisable** : chaque bloc peut etre chiffre/dechiffre independamment
- Pas besoin de padding
- Fournit la confidentialite mais **pas l'integrite**

#### GCM (Galois/Counter Mode) - RECOMMANDE

\`\`\`
Nonce+Ctr=0   Nonce+Ctr=1   Nonce+Ctr=2
     |              |              |
  AES(K)         AES(K)         AES(K)
     |              |              |
Bloc 1 →XOR→ C1  Bloc 2 →XOR→ C2  Bloc 3 →XOR→ C3
     |              |              |
     +→ GHASH →    +→ GHASH →    +→ GHASH → Tag d'authentification
\`\`\`

- Combine CTR pour le chiffrement + GHASH pour l'authentification
- Fournit **confidentialite ET integrite** (chiffrement authentifie - AEAD)
- Parallelisable, tres performant
- Produit un **tag d'authentification** qui detecte toute modification
- **C'est le mode recommande pour TLS 1.2 et 1.3**

#### CCM (Counter with CBC-MAC)

- Combine CTR pour le chiffrement + CBC-MAC pour l'authentification
- Aussi AEAD, mais **non parallelisable** (a cause de CBC-MAC)
- Utilise dans les environnements contraints (Wi-Fi WPA2, Bluetooth, ZigBee)
- Moins performant que GCM

| Mode | Confidentialite | Integrite | Parallelisable | Utilisation recommandee |
|---|---|---|---|---|
| ECB | Oui (faible) | Non | Oui | **Jamais** |
| CBC | Oui | Non | Dechiffrement seul | Legacy, avec HMAC separe |
| CTR | Oui | Non | Oui | Avec un MAC separe |
| **GCM** | **Oui** | **Oui (AEAD)** | **Oui** | **TLS 1.2/1.3, IPSec, stockage** |
| CCM | Oui | Oui (AEAD) | Non | Wi-Fi (WPA2), IoT |

> **Point Security+ :** Si on vous demande un mode qui fournit a la fois confidentialite et integrite, la reponse est **GCM** (ou CCM pour les environnements contraints).

---

## 2. Chiffrement asymetrique

Le chiffrement asymetrique utilise **une paire de cles** : une cle publique (diffusee librement) et une cle privee (gardee secrete). Les deux sont mathematiquement liees mais il est computationnellement impossible de deriver la cle privee de la cle publique.

### Algorithmes asymetriques

| Algorithme | Base mathematique | Taille de cle typique | Securite equivalente | Utilisation |
|---|---|---|---|---|
| **RSA** | Factorisation de grands nombres | 2048 ou 4096 bits | 2048 RSA ≈ 112 bits sym. | Chiffrement, signatures, echange de cles |
| **ECC** | Courbes elliptiques | 256 ou 384 bits | 256 ECC ≈ 128 bits sym. | Signatures (ECDSA), echange de cles (ECDH) |
| **DH/DHE** | Logarithme discret | 2048+ bits | Variable | Echange de cles uniquement |
| **ECDH/ECDHE** | Courbes elliptiques | 256+ bits | Variable | Echange de cles (TLS) |
| **DSA** | Logarithme discret | 2048 bits | 112 bits sym. | Signatures uniquement (deprecie) |
| **EdDSA (Ed25519)** | Courbes elliptiques (Curve25519) | 256 bits | 128 bits sym. | Signatures (SSH, Signal) |

> **Le "E" de ECDHE/DHE = Ephemeral** : une nouvelle paire de cles est generee pour chaque session, ce qui assure le **Perfect Forward Secrecy (PFS)**.

### Usages du chiffrement asymetrique

\`\`\`
CHIFFREMENT (confidentialite) :
  Alice chiffre avec la cle PUBLIQUE de Bob → Seul Bob dechiffre avec sa cle PRIVEE

SIGNATURE (authenticite + non-repudiation) :
  Alice signe avec sa cle PRIVEE → Tout le monde verifie avec la cle PUBLIQUE d'Alice

ECHANGE DE CLES (Diffie-Hellman) :
  Alice et Bob generent chacun une paire ephemere
  Ils echangent leurs cles publiques
  Chacun derive le meme secret partage sans jamais le transmettre
\`\`\`

### Hybrid encryption (chiffrement hybride)

En pratique, on combine toujours asymetrique + symetrique :

\`\`\`
1. Alice genere une cle de session AES-256 aleatoire
2. Alice chiffre la cle de session avec la cle publique RSA de Bob
3. Alice chiffre les donnees avec AES-256-GCM (cle de session)
4. Alice envoie : [cle de session chiffree RSA] + [donnees chiffrees AES]
5. Bob dechiffre la cle de session avec sa cle privee RSA
6. Bob dechiffre les donnees avec la cle de session AES
\`\`\`

C'est exactement ce que fait TLS.

---

## 3. Fonctions de hachage

Le hachage produit une **empreinte de taille fixe** (digest) a partir de donnees de taille variable. C'est une fonction a **sens unique** (irreversible).

### Proprietes requises

- **Resistance a la pre-image** : etant donne H(m), impossible de retrouver m
- **Resistance a la seconde pre-image** : etant donne m1, impossible de trouver m2 tel que H(m1) = H(m2)
- **Resistance aux collisions** : impossible de trouver deux messages quelconques m1 ≠ m2 avec H(m1) = H(m2)
- **Effet avalanche** : un changement d'un seul bit modifie radicalement le hash (~50% des bits changent)
- **Deterministe** : le meme message produit toujours le meme hash

### Comparaison des algorithmes de hachage

| Algorithme | Taille du digest | Statut | Utilisation |
|---|---|---|---|
| **MD5** | 128 bits | **Casse** (collisions trouvees) | Verification d'integrite non securitaire uniquement |
| **SHA-1** | 160 bits | **Casse** (collision SHAttered 2017) | Deprecie partout |
| **SHA-256** | 256 bits | Securise | Standard actuel, TLS, certificats, Bitcoin |
| **SHA-384** | 384 bits | Securise | Environnements haute securite |
| **SHA-512** | 512 bits | Securise | Signatures, integrite longue duree |
| **SHA-3** | 224-512 bits | Securise | Alternative a SHA-2 (construction differente - Keccak) |

### HMAC (Hash-based Message Authentication Code)

HMAC combine une **cle secrete** avec une fonction de hachage pour authentifier les messages :

\`\`\`
HMAC(K, message) = H((K' XOR opad) || H((K' XOR ipad) || message))

Ou :
- K' = cle derivee de K
- opad = 0x5c repete
- ipad = 0x36 repete
\`\`\`

HMAC garantit a la fois l'**integrite** et l'**authenticite** du message. Utilise dans TLS, IPSec, JWT, et les API d'authentification.

### Key stretching (etirement de cle)

Le key stretching transforme un mot de passe faible en une cle cryptographique forte en rendant le processus **intentionnellement lent**. C'est essentiel pour le stockage des mots de passe.

| Algorithme | Description | Parametres | Utilisation |
|---|---|---|---|
| **PBKDF2** | Applique HMAC-SHA de maniere iterative | Iterations (min 600 000 OWASP 2023), sel | Wi-Fi WPA2, .NET, iOS |
| **bcrypt** | Base sur Blowfish, inclut un sel automatique | Cost factor (log2 des iterations, min 10) | Applications web, Linux (/etc/shadow) |
| **scrypt** | Comme PBKDF2 mais necessite beaucoup de **memoire** | CPU cost, memoire, parallelisme | Crypto-monnaies, stockage de mots de passe |
| **Argon2** | Gagnant du Password Hashing Competition (2015) | Memoire, iterations, parallelisme | **Recommande OWASP**, nouveau standard |

\`\`\`
Comparaison de resistance aux attaques :
PBKDF2  : resistant au brute force CPU, vulnerable aux GPU/ASIC
bcrypt  : resistant CPU, moderement resistant GPU (memoire limitee)
scrypt  : resistant CPU + GPU (memory-hard)
Argon2  : resistant CPU + GPU + ASIC (memory-hard, configurable)
         → Argon2id = recommande (combine Argon2i + Argon2d)
\`\`\`

> **Point Security+ :** PBKDF2 est utilise dans WPA2. bcrypt est le standard historique pour les applications web. Argon2 est le nouveau standard recommande par OWASP. Le sel (salt) est aleatoire et unique par utilisateur pour empecher les attaques par rainbow table.

---

## 4. PKI (Public Key Infrastructure)

La PKI est l'ensemble des composants, politiques et procedures permettant de gerer les certificats numeriques et etablir la confiance entre les parties.

### Composants de la PKI

| Composant | Role |
|---|---|
| **CA (Certificate Authority)** | Autorite de certification qui signe les certificats. CA racine (offline) + CA intermediaires |
| **RA (Registration Authority)** | Verifie l'identite du demandeur avant la delivrance du certificat |
| **CRL (Certificate Revocation List)** | Liste des certificats revoques, publiee periodiquement par la CA |
| **OCSP (Online Certificate Status Protocol)** | Verification en temps reel du statut d'un certificat |
| **Repository** | Stockage des certificats et CRL (souvent LDAP) |
| **Key escrow** | Depot de cles aupres d'un tiers de confiance pour la recuperation |

### Cycle de vie des certificats

\`\`\`
1. DEMANDE (CSR - Certificate Signing Request)
   └→ Le demandeur genere une paire de cles
   └→ Cree un CSR contenant : cle publique + identite + algorithme de signature
   └→ Soumet le CSR a la CA (ou RA)

2. VALIDATION
   └→ La RA/CA verifie l'identite du demandeur
   └→ DV : verification DNS/HTTP (automatique, quelques minutes)
   └→ OV : verification de l'organisation (documents, quelques jours)
   └→ EV : verification approfondie (documents legaux, quelques semaines)

3. EMISSION
   └→ La CA signe le certificat avec sa cle privee
   └→ Le certificat contient : cle publique, identite, validite, signature CA, extensions

4. UTILISATION
   └→ Le certificat est installe sur le serveur/service
   └→ Les clients verifient la chaine de confiance

5. RENOUVELLEMENT
   └→ Avant expiration, un nouveau CSR est soumis
   └→ Automatisable avec ACME (Let's Encrypt)

6. REVOCATION
   └→ En cas de compromission de la cle privee
   └→ La CA ajoute le certificat a la CRL ou met a jour le repondeur OCSP
   └→ Raisons : compromission de cle, changement d'entite, cessation d'activite
\`\`\`

### Types de certificats

| Type | Validation | Indicateur navigateur | Delai | Cout | Cas d'usage |
|---|---|---|---|---|---|
| **DV (Domain Validation)** | Controle du domaine uniquement | Cadenas | Minutes | Gratuit-faible | Blogs, sites personnels |
| **OV (Organization Validation)** | + Verification de l'organisation | Cadenas | Jours | Moyen | Sites d'entreprise |
| **EV (Extended Validation)** | Verification juridique complete | Cadenas (anciennement barre verte) | Semaines | Eleve | Banques, e-commerce |
| **Wildcard (*.domaine.com)** | DV ou OV | Cadenas | Variable | Variable | Tous les sous-domaines d'un niveau |
| **SAN (Subject Alternative Name)** | DV, OV ou EV | Cadenas | Variable | Variable | Plusieurs domaines sur un certificat |
| **Self-signed** | Aucune (auto-signe) | Avertissement | Instantane | Gratuit | Tests, interne, developpement |
| **Code Signing** | OV ou EV | Signature valide | Variable | Eleve | Signature de logiciels |

> **Point Security+ :** Un certificat wildcard \*.example.com couvre www.example.com et mail.example.com mais PAS sub.mail.example.com (un seul niveau). Un certificat SAN peut contenir des domaines completement differents.

### OCSP Stapling vs CRL

| Critere | CRL | OCSP | OCSP Stapling |
|---|---|---|---|
| Fonctionnement | Liste de certificats revoques telechargee periodiquement | Requete temps reel a la CA pour un certificat specifique | Le serveur attache la reponse OCSP signee au handshake TLS |
| Latence | Elevee (telechargement de toute la liste) | Moyenne (requete a chaque connexion) | **Faible** (inclus dans le handshake) |
| Vie privee | OK (liste complete, pas de tracking) | Problematique (la CA voit quels sites vous visitez) | **OK** (pas de requete client a la CA) |
| Charge sur la CA | Faible | **Elevee** (une requete par connexion client) | **Faible** (le serveur cache la reponse) |
| Fraicheur | Peut etre obsolete (delai de publication) | Temps reel | Quasi temps reel (cache de quelques heures) |

> **Point Security+ :** OCSP Stapling est la methode recommandee car elle resout les problemes de latence, de vie privee et de charge de la CRL et de l'OCSP classique.

---

## 5. Signatures numeriques

La signature numerique garantit l'**authenticite**, l'**integrite** et la **non-repudiation** d'un message ou document.

### Processus etape par etape

\`\`\`
SIGNATURE (par l'expediteur - Alice) :

  Document original
       |
  [Fonction de hachage SHA-256]
       |
  Hash (256 bits)
       |
  [Chiffrement avec cle PRIVEE d'Alice]
       |
  Signature numerique
       |
  Envoie : Document + Signature + Certificat d'Alice


VERIFICATION (par le destinataire - Bob) :

  Document recu               Signature recue
       |                           |
  [SHA-256]                   [Dechiffrement avec cle PUBLIQUE d'Alice]
       |                           |
  Hash calcule                Hash extrait
       |                           |
       +--------[Comparaison]------+
                     |
              Egal → Signature VALIDE (document intact, Alice confirmee)
              Different → Signature INVALIDE (document modifie ou imposteur)
\`\`\`

**Algorithmes de signature :** RSA, DSA (deprecie), ECDSA, EdDSA (Ed25519)

---

## 6. TLS (Transport Layer Security)

### Comparaison TLS 1.2 vs TLS 1.3

| Caracteristique | TLS 1.2 | TLS 1.3 |
|---|---|---|
| Annee | 2008 | 2018 |
| Round-trips handshake | 2 RTT | **1 RTT** (0-RTT possible en reprise) |
| Echange de cles | RSA, DHE, ECDHE | **ECDHE uniquement** (PFS obligatoire) |
| Chiffrements symetriques | AES-CBC, AES-GCM, RC4, 3DES | **AES-GCM, ChaCha20-Poly1305 uniquement** |
| Perfect Forward Secrecy | Optionnel | **Obligatoire** |
| Compression | Supportee | **Supprimee** (attaque CRIME) |
| Renegociation | Supportee | **Supprimee** |
| 0-RTT (reprise rapide) | Non | Oui (avec risques de replay) |
| Suites de chiffrement | Nombreuses (dont faibles) | **5 suites uniquement** (toutes securisees) |

**Ce qui a ete supprime dans TLS 1.3 :**
- Echange de cles RSA statique (pas de PFS)
- RC4, 3DES, AES-CBC
- MD5, SHA-1 pour les signatures
- Compression (vulnerable a CRIME/BREACH)
- Renegociation (vulnerable a des attaques)
- Changement de specification de chiffrement (message supprime)

\`\`\`
Handshake TLS 1.3 simplifie (1-RTT) :

Client                                    Server
  |                                         |
  |--- Client Hello ----------------------->|
  |    (versions, suites, key_share ECDHE)  |
  |                                         |
  |<-- Server Hello ----------------------- |
  |    (version, suite, key_share ECDHE)    |
  |<-- {EncryptedExtensions} -------------- |
  |<-- {Certificate} ---------------------- |
  |<-- {CertificateVerify} ---------------- |
  |<-- {Finished} ------------------------- |
  |                                         |
  |--- {Finished} -----------------------> |
  |                                         |
  |<========= Donnees applicatives =======>|
\`\`\`

> **Point Security+ :** TLS 1.0 et 1.1 sont officiellement deprecies (RFC 8996). TLS 1.3 est le standard. Si une question mentionne PFS, la reponse implique des cles **ephemeres** (DHE ou ECDHE).

---

## 7. Attaques cryptographiques

| Attaque | Description | Cible | Contre-mesure |
|---|---|---|---|
| **Brute force** | Essai de toutes les cles possibles | Cles courtes, mots de passe faibles | Cles longues (256 bits), key stretching |
| **Attaque par dictionnaire** | Essai de mots de passe courants | Mots de passe faibles | Politiques de complexite, key stretching |
| **Rainbow table** | Table precalculee de hash → mot de passe | Hash sans sel | **Sel (salt)** aleatoire unique par utilisateur |
| **Birthday attack** | Exploite le paradoxe des anniversaires pour trouver des collisions | Fonctions de hachage a digest court | Hash de 256 bits minimum (probabilite de collision ~2^128) |
| **Known plaintext** | L'attaquant possede un texte clair et son chiffre correspondant | Algorithmes faibles | Algorithmes modernes (AES), cles de session |
| **Chosen plaintext** | L'attaquant peut faire chiffrer des textes de son choix | Implementations faibles | Securite CPA (AES est CPA-secure) |
| **Chosen ciphertext** | L'attaquant peut faire dechiffrer des textes de son choix | Implementations sans AEAD | Chiffrement authentifie (GCM) |
| **Padding oracle** | Exploite les messages d'erreur de padding pour dechiffrer | CBC sans authentification | Utiliser GCM (AEAD), ne pas reveler les erreurs de padding |
| **Downgrade attack** | Force l'utilisation d'un protocole/algorithme plus faible | Negociation TLS | Desactiver les protocoles anciens (TLS 1.0/1.1) |
| **Side-channel** | Exploite le temps de calcul, la consommation electrique, etc. | Implementations | Implementations a temps constant |
| **Replay attack** | Rejoue un message capture precedemment | Protocoles sans nonce/timestamp | Nonces, timestamps, numeros de sequence |

> **Point Security+ :** L'attaque par anniversaire (birthday attack) est tres importante. Avec un hash de n bits, la probabilite de collision est significative apres environ 2^(n/2) essais. C'est pourquoi MD5 (128 bits → 2^64) est vulnerable, mais SHA-256 (256 bits → 2^128) ne l'est pas.

---

## 8. Steganographie

La steganographie est l'art de **cacher l'existence meme d'un message** dans un support anodin (image, audio, video, texte).

| Aspect | Cryptographie | Steganographie |
|---|---|---|
| Objectif | Rendre le message illisible | Rendre le message invisible |
| Detection | On sait qu'un message chiffre existe | On ignore l'existence du message |
| Combinaison | Souvent combinees : message chiffre puis cache dans une image |

**Techniques courantes :**
- **LSB (Least Significant Bit)** : modification des bits de poids faible des pixels d'une image
- **Metadonnees** : cacher des donnees dans les metadonnees EXIF d'une image
- **Espacement de texte** : utilisation d'espaces et tabulations invisibles

> **Point Security+ :** La steganographie est souvent utilisee par les attaquants pour l'exfiltration de donnees. Des outils comme StegDetect ou Steghide permettent la detection/extraction.

---

## 9. Concepts avances

### Key escrow et Key recovery

- **Key escrow** : depot d'une copie de la cle de chiffrement aupres d'un tiers de confiance (souvent gouvernemental ou d'entreprise). Controverse car cree un point de compromission.
- **Key recovery agent** : dans une PKI d'entreprise, agent autorise a recuperer les cles de chiffrement (pas les cles de signature) d'un employe en cas de depart ou de perte.
- **M-of-N control** : la cle est divisee en N parts, et M parts sont necessaires pour la reconstituer (ex : 3 sur 5). Aussi appele **secret splitting** ou **Shamir's Secret Sharing**.

### Cryptographie post-quantique

Les ordinateurs quantiques menacent les algorithmes actuels bases sur la factorisation (RSA) et les logarithmes discrets (DH, ECC). Le NIST a standardise en 2024 les premiers algorithmes post-quantiques :

| Algorithme | Type | Usage | Standardise |
|---|---|---|---|
| **ML-KEM (CRYSTALS-Kyber)** | Lattice-based | Echange de cles | FIPS 203 |
| **ML-DSA (CRYSTALS-Dilithium)** | Lattice-based | Signatures | FIPS 204 |
| **SLH-DSA (SPHINCS+)** | Hash-based | Signatures | FIPS 205 |

> **Point Security+ :** Sachez que la cryptographie post-quantique existe et que le NIST travaille sur de nouveaux standards. Le concept de "harvest now, decrypt later" explique pourquoi c'est urgent : les attaquants capturent des donnees chiffrees aujourd'hui pour les dechiffrer avec des ordinateurs quantiques demain.

---

## 10. Scenarios pratiques Security+

**Scenario 1 :** *Votre entreprise doit chiffrer les donnees au repos sur les ordinateurs portables. Quelle solution choisir ?*
→ **AES-256 avec un outil comme BitLocker (Windows) ou FileVault (macOS)**. Utiliser le mode XTS-AES pour le chiffrement de disque complet. Stocker les cles de recuperation dans Active Directory ou un HSM.

**Scenario 2 :** *Un developpeur vous demande quel algorithme utiliser pour stocker les mots de passe des utilisateurs dans la base de donnees.*
→ **Argon2id** (ou bcrypt si Argon2 n'est pas disponible). Jamais de MD5, SHA-256 simple, ou chiffrement reversible. Toujours avec un sel unique par utilisateur.

**Scenario 3 :** *Votre certificat TLS expire dans 3 jours et la CA est injoignable. Que faire ?*
→ Utiliser un certificat d'une autre CA ou Let's Encrypt (ACME automatise). Ne PAS utiliser un certificat auto-signe en production. Mettre en place le renouvellement automatique pour eviter ce scenario.

**Scenario 4 :** *Un auditeur decouvre que votre VPN utilise 3DES. Quelle est la recommandation ?*
→ Migrer immediatement vers **AES-256-GCM**. 3DES est deprecie par le NIST depuis 2023 et vulnerable a l'attaque Sweet32 (birthday attack sur les blocs de 64 bits).

---

## 11. Blockchain et registres distribues (Open Public Ledger)

La **blockchain** est une technologie de registre distribue (DLT - Distributed Ledger Technology) ou les transactions sont regroupees en blocs chaines cryptographiquement.

### Principes de fonctionnement

- **Immutabilite** : chaque bloc contient le hash du bloc precedent, rendant toute modification retroactive detectable
- **Decentralisation** : pas d'autorite centrale, consensus entre les noeuds du reseau
- **Transparence** : les transactions sont visibles par tous les participants (blockchain publique)
- **Integrite** : les fonctions de hachage (SHA-256 pour Bitcoin) garantissent l'integrite des donnees

### Types de blockchains

| Type | Acces | Participants | Exemple |
|------|-------|-------------|---------|
| **Publique** | Ouvert a tous | Anonymes | Bitcoin, Ethereum |
| **Privee** | Restreint a une organisation | Identifes et autorises | Hyperledger Fabric interne |
| **Consortium** | Partage entre un groupe d'organisations | Membres du consortium | R3 Corda (banques) |

### Applications en cybersecurite

- **Verification de la supply chain** : tracer l'origine et l'integrite des composants logiciels
- **Gestion d'identite decentralisee** (Self-Sovereign Identity) : l'utilisateur controle ses propres identifiants
- **Certificate Transparency** : journaux publics de tous les certificats TLS emis, detectant les certificats frauduleux
- **Integrite des logs** : stocker les hashes des journaux d'audit sur une blockchain pour empecher la falsification

### Limitations

- **Scalabilite** : nombre de transactions par seconde limite
- **Confidentialite** : les blockchains publiques exposent les donnees (solutions : zero-knowledge proofs)
- **Attaque 51%** : si un acteur controle plus de 50% de la puissance de calcul, il peut manipuler le registre
- **Consommation energetique** : le Proof of Work est tres couteux (Proof of Stake comme alternative)

> **Point Security+ :** La blockchain est un concept cryptographique de registre public distribue (open public ledger). Retenez ses proprietes de securite (immutabilite, transparence, decentralisation) et ses applications en cybersecurite (supply chain, identite, certificate transparency).
`,
  keyPoints: [
    'AES-256-GCM est le standard de chiffrement symetrique recommande : il fournit confidentialite et integrite (AEAD). ECB ne doit jamais etre utilise car il revele des motifs dans les donnees.',
    'Le chiffrement asymetrique (RSA, ECC) resout le probleme de distribution des cles. En pratique, on utilise le chiffrement hybride : asymetrique pour echanger la cle de session, symetrique pour les donnees.',
    'Les fonctions de hachage (SHA-256, SHA-3) garantissent l\'integrite. MD5 et SHA-1 sont casses. HMAC ajoute l\'authentification en combinant un hash avec une cle secrete.',
    'Le key stretching (PBKDF2, bcrypt, Argon2id) est essentiel pour le stockage des mots de passe. Argon2id est le standard recommande par OWASP. Toujours utiliser un sel unique.',
    'La PKI gere le cycle de vie des certificats : demande (CSR), validation, emission, utilisation, renouvellement, revocation. OCSP Stapling est preferable a la CRL pour la verification.',
    'TLS 1.3 impose le Perfect Forward Secrecy (ECDHE obligatoire), supprime les algorithmes faibles et reduit le handshake a 1 RTT. TLS 1.0/1.1 sont officiellement deprecies.',
    'L\'attaque par anniversaire (birthday attack) est la raison pour laquelle les hashes courts (MD5 128 bits) sont vulnerables. SHA-256 (2^128 essais pour une collision) est securise.',
    'La cryptographie post-quantique (ML-KEM, ML-DSA) est en cours de standardisation par le NIST pour resister aux futurs ordinateurs quantiques. Le concept "harvest now, decrypt later" rend la migration urgente.',
  ],
  resources: [
    {
      title: 'CompTIA Security+ SY0-701 - Cryptographic Solutions (Professor Messer)',
      url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/cryptographic-solutions/',
      type: 'video',
    },
    {
      title: 'Practical Cryptography for Developers (Nakov)',
      url: 'https://cryptobook.nakov.com/',
      type: 'book',
    },
    {
      title: 'OWASP Password Storage Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
      type: 'article',
    },
    {
      title: 'NIST Post-Quantum Cryptography Standards (FIPS 203, 204, 205)',
      url: 'https://csrc.nist.gov/projects/post-quantum-cryptography',
      type: 'article',
    },
  ],
  estimatedMinutes: 45,
};
