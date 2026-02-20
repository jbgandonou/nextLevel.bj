import { Lesson } from '../../types';

export const networkSecurity: Lesson = {
  id: 'p1-network-security',
  phaseId: 'phase-01',
  title: 'Sécurité réseau : pare-feu, IDS/IPS, VPN et segmentation',
  content: `
## Introduction à la sécurité réseau

La sécurité réseau constitue la première ligne de défense contre les menaces externes et internes. Elle englobe les technologies, les politiques et les pratiques qui protègent l'infrastructure réseau. Le Security+ accorde une place importante à la compréhension des dispositifs de sécurité réseau et des architectures défensives.

## Pare-feu (Firewalls)

Un pare-feu contrôle le trafic réseau entrant et sortant en appliquant des **règles de filtrage**.

**Types de pare-feu :**
- **Pare-feu à filtrage de paquets (Stateless)** : examine chaque paquet individuellement selon l'adresse IP source/destination, le port et le protocole. Rapide mais limité.
- **Pare-feu à état (Stateful)** : suit les connexions actives et autorise les paquets appartenant à une session établie. Plus intelligent que le stateless.
- **Pare-feu applicatif (WAF - Web Application Firewall)** : inspecte le contenu des requêtes HTTP/HTTPS. Protège contre les injections SQL, XSS, etc.
- **NGFW (Next-Generation Firewall)** : combine filtrage stateful, inspection approfondie des paquets (DPI), IPS intégré, et analyse des applications.

\`\`\`
Exemple de règle de pare-feu (iptables Linux) :
# Autoriser le trafic HTTPS entrant
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Bloquer tout le trafic entrant par défaut
iptables -A INPUT -j DROP
\`\`\`

**Règle fondamentale** : appliquer le principe de **deny by default** (refuser tout sauf ce qui est explicitement autorisé).

## IDS et IPS

**IDS (Intrusion Detection System)** : détecte les activités suspectes et génère des alertes. Il est **passif** — il n'arrête pas les attaques.

**IPS (Intrusion Prevention System)** : détecte ET bloque les activités malveillantes en temps réel. Il est **actif** — placé en ligne (inline) sur le réseau.

**Méthodes de détection :**
- **Signature-based** : compare le trafic à une base de signatures connues. Efficace contre les attaques connues, inefficace contre les zero-day.
- **Anomaly-based (Behavioral)** : établit une baseline du trafic normal et détecte les déviations. Peut détecter des attaques inconnues mais génère plus de faux positifs.
- **Heuristic-based** : utilise des règles et algorithmes pour identifier des comportements suspects.

**Déploiement :**
- **NIDS/NIPS** : réseau — surveille le trafic sur un segment réseau (ex : Snort, Suricata)
- **HIDS/HIPS** : hôte — surveille l'activité sur un système individuel (ex : OSSEC, Wazuh)

\`\`\`
Exemple de règle Snort (NIDS) :
alert tcp any any -> $HOME_NET 22 (msg:"SSH Brute Force Attempt";
  flow:to_server; threshold:type both, track by_src, count 5, seconds 60;
  sid:1000001; rev:1;)
\`\`\`

## VPN (Virtual Private Network)

Un VPN crée un **tunnel chiffré** entre deux points à travers un réseau non sécurisé (Internet).

**Types de VPN :**
- **Site-to-Site** : connecte deux réseaux d'entreprise (ex : siège ↔ succursale). Utilise souvent IPSec.
- **Remote Access (Client-to-Site)** : connecte un utilisateur distant au réseau de l'entreprise.
- **Split Tunnel** : seul le trafic destiné au réseau d'entreprise passe par le VPN. Le reste va directement sur Internet.
- **Full Tunnel** : tout le trafic passe par le VPN. Plus sécurisé mais plus lent.

**Protocoles VPN :**
- **IPSec** : standard, fonctionne au niveau réseau (couche 3). Deux modes : transport et tunnel.
  - **IKE (Internet Key Exchange)** : négocie les paramètres de sécurité
  - **AH (Authentication Header)** : intégrité et authentification
  - **ESP (Encapsulating Security Payload)** : confidentialité + intégrité
- **SSL/TLS VPN** : fonctionne au niveau application. Accessible via navigateur (ex : OpenVPN, portail web).
- **WireGuard** : protocole moderne, simple et performant. Utilise ChaCha20 et Curve25519.

## Protocoles de sécurité réseau

**Protocoles essentiels :**
- **TLS 1.3** : sécurise les communications web (HTTPS), email (SMTPS), etc.
- **SSH** : accès distant sécurisé aux serveurs. Remplace Telnet (non chiffré).
- **DNSSEC** : protège les réponses DNS contre la falsification.
- **802.1X** : contrôle d'accès réseau (NAC) basé sur l'authentification. Utilisé pour le Wi-Fi et les ports Ethernet.
- **SNMPv3** : gestion réseau avec authentification et chiffrement (v1 et v2 sont non sécurisés).

**Protocoles non sécurisés à éviter :**
- Telnet → utiliser SSH
- FTP → utiliser SFTP ou FTPS
- HTTP → utiliser HTTPS
- SNMPv1/v2 → utiliser SNMPv3

## Segmentation réseau

La segmentation divise le réseau en zones isolées pour **limiter la propagation des attaques** (mouvement latéral).

**Techniques :**
- **VLAN (Virtual LAN)** : segmentation logique au niveau 2. Chaque VLAN est un domaine de broadcast séparé.
- **Sous-réseaux** : segmentation au niveau 3 avec des plages IP distinctes.
- **Microsegmentation** : segmentation granulaire au niveau des charges de travail, souvent via SDN (Software-Defined Networking).

## DMZ (Demilitarized Zone)

La DMZ est une **zone tampon** entre le réseau interne et Internet. Elle héberge les services accessibles depuis l'extérieur (serveur web, serveur mail, DNS public).

\`\`\`
Architecture DMZ typique :

Internet → [Pare-feu externe] → DMZ → [Pare-feu interne] → Réseau interne
                                  │
                           Serveur Web
                           Serveur Mail
                           Reverse Proxy
\`\`\`

**Règles :**
- Le trafic Internet peut atteindre la DMZ (ports spécifiques)
- La DMZ ne peut PAS initier de connexion vers le réseau interne
- Le réseau interne peut atteindre la DMZ et Internet

## Zero Trust Network

Le modèle Zero Trust part du principe que **aucun utilisateur ni appareil n'est digne de confiance par défaut**, même à l'intérieur du réseau.

**Principes :**
- Vérifier explicitement chaque requête
- Appliquer le moindre privilège
- Supposer la compromission
- Microsegmentation systématique
`,
  keyPoints: [
    'Les NGFW combinent filtrage stateful, DPI et IPS. Le principe de deny by default (tout refuser sauf l\'autorisé) est fondamental.',
    'L\'IDS est passif (détection + alerte), l\'IPS est actif (détection + blocage). La détection par signature ne protège pas contre les zero-day.',
    'IPSec (couche 3) et SSL/TLS (couche application) sont les deux grandes familles de protocoles VPN. Split tunnel vs full tunnel est un choix sécurité/performance.',
    'La segmentation réseau (VLAN, sous-réseaux, microsegmentation) limite le mouvement latéral des attaquants.',
    'La DMZ est une zone tampon qui isole les services publics du réseau interne avec une architecture à double pare-feu.',
    'Le modèle Zero Trust ne fait confiance à rien par défaut et vérifie chaque requête indépendamment de sa provenance.',
  ],
  resources: [
    {
      title: 'CompTIA Security+ SY0-701 - Network Security (Professor Messer)',
      url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/network-security-infrastructure/',
      type: 'video',
    },
    {
      title: 'NIST SP 800-207 - Zero Trust Architecture',
      url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final',
      type: 'article',
    },
    {
      title: 'Snort 3 - Open Source IDS/IPS',
      url: 'https://www.snort.org/',
      type: 'tool',
    },
  ],
  estimatedMinutes: 30,
};
