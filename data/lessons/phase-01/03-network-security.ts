import { Lesson } from '../../types';

export const networkSecurity: Lesson = {
  id: 'p1-network-security',
  phaseId: 'phase-01',
  title: 'Securite reseau : pare-feu, IDS/IPS, VPN et segmentation',
  content: `
## Introduction a la securite reseau

La securite reseau constitue la premiere ligne de defense contre les menaces externes et internes. Elle englobe les technologies, les politiques et les pratiques qui protegent l'infrastructure reseau. Le Security+ SY0-701 accorde une place importante a la comprehension des dispositifs de securite reseau, des architectures defensives et des protocoles securises.

---

## 1. Le modele OSI et la securite a chaque couche

Comprendre a quelle couche OSI agit chaque technologie de securite est fondamental pour le Security+.

| Couche OSI | Nom | Protocoles | Menaces | Securite |
|---|---|---|---|---|
| **7 - Application** | Application | HTTP, DNS, SMTP, FTP | XSS, injection SQL, phishing | WAF, filtrage applicatif, DMARC |
| **6 - Presentation** | Presentation | SSL/TLS, chiffrement | Attaques sur le chiffrement | TLS 1.3, certificats |
| **5 - Session** | Session | NetBIOS, RPC | Hijacking de session | Tokens, timeouts |
| **4 - Transport** | Transport | TCP, UDP | SYN flood, scan de ports | Firewalls stateful, rate limiting |
| **3 - Reseau** | Reseau | IP, ICMP, IPSec | Spoofing IP, MITM, routage | IPSec, ACLs, IDS/IPS |
| **2 - Liaison** | Liaison | Ethernet, ARP, 802.1Q | ARP spoofing, MAC flooding | 802.1X, port security, VLAN |
| **1 - Physique** | Physique | Cables, Wi-Fi | Ecoute physique, jamming | Chiffrement Wi-Fi, cables securises |

> **Point Security+ :** Les firewalls stateless operent aux couches 3-4, les firewalls stateful aux couches 3-4 avec suivi de connexion, les WAF a la couche 7, et les NGFW aux couches 3-7.

---

## 2. Pare-feu (Firewalls)

### Types de pare-feu

| Type | Couche OSI | Fonctionnement | Avantages | Limites |
|---|---|---|---|---|
| **Packet filtering (Stateless)** | 3-4 | Examine chaque paquet individuellement (IP, port, protocole) | Rapide, faible latence | Ne suit pas les connexions, facile a contourner |
| **Stateful inspection** | 3-4 | Suit les connexions actives (state table) | Intelligent, bloque les paquets hors session | Ne comprend pas le contenu applicatif |
| **Application-level gateway (Proxy)** | 7 | Intercepte et inspecte le contenu applicatif | Inspection profonde, cache | Lent, un proxy par protocole |
| **WAF** | 7 | Inspecte HTTP/HTTPS specifiquement | Protege contre SQLi, XSS, OWASP Top 10 | Specifique au web |
| **NGFW** | 3-7 | Combine stateful + DPI + IPS + analyse applicative | Tout-en-un, identification des applications | Cout, complexite, performance |

### Ecriture de regles de pare-feu

Les regles de pare-feu suivent une logique **top-down** : la premiere regle correspondante est appliquee.

\`\`\`
Numero | Action | Source IP        | Dest IP          | Protocole | Port Dest | Direction | Log
-------|--------|------------------|------------------|-----------|-----------|-----------|----
1      | ALLOW  | 10.0.1.0/24      | 10.0.2.10        | TCP       | 443       | IN→OUT    | Non
2      | ALLOW  | 10.0.1.0/24      | 10.0.2.20        | TCP       | 3389      | IN→OUT    | Oui
3      | ALLOW  | Any              | 10.0.3.5         | TCP       | 80,443    | IN→DMZ    | Non
4      | DENY   | 10.0.2.0/24      | 10.0.1.0/24      | Any       | Any       | OUT→IN    | Oui
5      | ALLOW  | 10.0.1.0/24      | Any              | TCP       | 53        | IN→OUT    | Non
6      | ALLOW  | 10.0.1.0/24      | Any              | UDP       | 53        | IN→OUT    | Non
7      | DENY   | Any              | Any              | Any       | Any       | Any       | Oui
\`\`\`

**Principes d'ecriture des regles :**
- **Deny by default** : la derniere regle doit tout refuser (regle 7 ci-dessus)
- **Regles specifiques en premier** : les regles les plus specifiques precedent les plus generales
- **Logger les refus** : journaliser les paquets refuses pour la detection d'anomalies
- **Principe du moindre privilege** : n'ouvrir que les ports strictement necessaires

### ACL (Access Control Lists) sur routeurs

\`\`\`
Exemple ACL Cisco :

! ACL Standard (filtre sur l'IP source uniquement)
access-list 10 permit 192.168.1.0 0.0.0.255
access-list 10 deny any

! ACL Etendue (filtre sur source, destination, protocole, port)
access-list 100 permit tcp 192.168.1.0 0.0.0.255 host 10.0.0.5 eq 443
access-list 100 permit tcp 192.168.1.0 0.0.0.255 any eq 53
access-list 100 deny ip any any log

! Application de l'ACL sur une interface
interface GigabitEthernet0/0
  ip access-group 100 in
\`\`\`

| Type d'ACL | Filtrage | Placement | Utilisation |
|---|---|---|---|
| **Standard** | IP source uniquement | Proche de la destination | Filtrage simple |
| **Etendue** | Source, destination, protocole, port | Proche de la source | Filtrage granulaire |

---

## 3. NAT/PAT et implications de securite

| Technologie | Description | Securite |
|---|---|---|
| **NAT (Network Address Translation)** | Traduit une IP privee en IP publique (1:1) | Cache la topologie interne |
| **PAT (Port Address Translation)** | Traduit plusieurs IP privees en une seule IP publique via les ports | Le plus courant (overload NAT) |
| **DNAT** | Redirige le trafic entrant vers un serveur interne | Utilise pour les serveurs DMZ |

\`\`\`diagram
{
  "title": "PAT (Port Address Translation)",
  "titleColor": "#1e40af",
  "sections": [
    {
      "title": "Reseau interne (prive)",
      "titleColor": "#065f46",
      "bg": "#f0fdf4",
      "borderColor": "#22c55e",
      "steps": [
        { "label": "192.168.1.10:5001", "bg": "#d1fae5", "color": "#065f46" },
        { "label": "192.168.1.20:5002", "bg": "#d1fae5", "color": "#065f46" },
        { "label": "192.168.1.30:5003", "bg": "#d1fae5", "color": "#065f46" }
      ]
    },
    {
      "title": "Routeur NAT (traduction)",
      "titleColor": "#9a3412",
      "bg": "#fff7ed",
      "borderColor": "#f97316",
      "steps": [
        { "label": "203.0.113.1:10001 → 10003", "detail": "Table de traduction pour router les reponses", "bg": "#fed7aa", "color": "#9a3412" }
      ]
    },
    {
      "title": "Internet (public)",
      "titleColor": "#be123c",
      "bg": "#fff1f2",
      "borderColor": "#f43f5e",
      "steps": [
        { "label": "Serveurs distants", "bg": "#fecdd3", "color": "#be123c" }
      ]
    }
  ],
  "note": "Le NAT n'est PAS un mecanisme de securite — il cache la topologie mais ne remplace pas un pare-feu"
}
\`\`\`

**Implications de securite du NAT :**
- Le NAT n'est **pas un mecanisme de securite** (c'est de l'obscurite, pas de la protection)
- Il cache la topologie interne mais ne remplace pas un pare-feu
- Il peut compliquer le fonctionnement d'IPSec (NAT-T - NAT Traversal necessaire)
- IPv6 elimine le besoin de NAT (chaque appareil a une IP publique)

---

## 4. Serveurs proxy

| Type | Description | Securite | Utilisation |
|---|---|---|---|
| **Forward proxy** | Intermediaire entre les clients internes et Internet | Filtrage URL, cache, anonymisation, inspection SSL | Navigation web d'entreprise |
| **Reverse proxy** | Intermediaire entre Internet et les serveurs internes | Protection des serveurs, load balancing, WAF, SSL offloading | Sites web publics |
| **Transparent proxy** | Proxy invisible pour l'utilisateur (interception reseau) | Filtrage sans configuration client | Reseaux d'entreprise, ISP |
| **Open proxy** | Proxy accessible a tous | **Aucune** - utilise pour l'anonymisation malveillante | A bloquer |

\`\`\`diagram
{
  "title": "Forward Proxy vs Reverse Proxy",
  "titleColor": "#1e40af",
  "sections": [
    {
      "title": "Forward Proxy (sortant)",
      "titleColor": "#1e40af",
      "bg": "#eff6ff",
      "borderColor": "#3b82f6",
      "steps": [
        { "label": "Client interne → Forward Proxy → Internet", "bg": "#dbeafe", "color": "#1e40af" },
        { "label": "Filtre les URLs et cache les pages", "bg": "#f0f9ff", "color": "#1e40af" },
        { "label": "Inspecte le contenu et journalise les acces", "bg": "#f0f9ff", "color": "#1e40af" }
      ]
    },
    {
      "title": "Reverse Proxy (entrant)",
      "titleColor": "#065f46",
      "bg": "#f0fdf4",
      "borderColor": "#22c55e",
      "steps": [
        { "label": "Internet → Reverse Proxy → Serveur Web interne", "bg": "#d1fae5", "color": "#065f46" },
        { "label": "SSL offloading et load balancing", "bg": "#f0fdf4", "color": "#065f46" },
        { "label": "WAF, cache et masquage de l'IP reelle", "bg": "#f0fdf4", "color": "#065f46" }
      ]
    }
  ]
}
\`\`\`

---

## 5. Load balancers et securite

| Fonctionnalite | Description |
|---|---|
| **SSL/TLS offloading** | Le load balancer termine la connexion TLS et transmet en clair aux serveurs backend (reduit la charge CPU) |
| **SSL bridging** | Le load balancer dechiffre, inspecte, puis re-chiffre vers les serveurs backend |
| **WAF integration** | Le load balancer peut integrer un WAF pour filtrer le trafic applicatif |
| **Health checks** | Verification reguliere de la disponibilite des serveurs backend |
| **Session persistence** | Maintient un utilisateur sur le meme serveur (sticky sessions) |
| **Algorithmes** | Round-robin, least connections, weighted, IP hash |

> **Point Security+ :** Le SSL offloading reduit la charge sur les serveurs backend mais le trafic interne est en clair. Si la politique de securite exige le chiffrement de bout en bout, utiliser le SSL bridging (re-chiffrement).

---

## 6. IDS et IPS

### Types et deploiement

| Aspect | IDS (Intrusion Detection) | IPS (Intrusion Prevention) |
|---|---|---|
| Mode | **Passif** - copie du trafic (SPAN/TAP) | **Actif** - en ligne (inline) |
| Action | Detection + alerte | Detection + **blocage** |
| Risque | Peut manquer des attaques (faux negatifs) | Peut bloquer du trafic legitime (faux positifs) |
| Impact reseau | Aucun (pas en ligne) | Latence potentielle |

| Deploiement | Description | Exemple |
|---|---|---|
| **NIDS/NIPS** | Surveille le trafic sur un segment reseau | Snort, Suricata, Zeek |
| **HIDS/HIPS** | Surveille l'activite sur un systeme individuel | OSSEC, Wazuh, Tripwire |

### Methodes de detection

| Methode | Fonctionnement | Avantages | Inconvenients |
|---|---|---|---|
| **Signature-based** | Compare le trafic a une base de signatures connues | Precis pour les menaces connues, peu de faux positifs | **Inefficace contre les zero-day** et les variantes |
| **Anomaly-based** | Etablit une baseline et detecte les deviations | Peut detecter des attaques inconnues | **Faux positifs eleves**, necessite un apprentissage |
| **Heuristic/Behavioral** | Regles et algorithmes pour identifier les comportements suspects | Equilibre entre les deux | Configuration complexe |

\`\`\`
Exemple de regle Snort (NIDS) :

# Detecter une tentative de reverse shell sur le port 4444
alert tcp $HOME_NET any -> $EXTERNAL_NET 4444 (
  msg:"POSSIBLE REVERSE SHELL - Outbound connection on port 4444";
  flow:to_server,established;
  content:"|/bin/sh|";
  sid:1000002;
  rev:1;
  classtype:trojan-activity;
  priority:1;
)

# Detecter un scan de ports SYN
alert tcp $EXTERNAL_NET any -> $HOME_NET any (
  msg:"SYN SCAN DETECTED";
  flags:S;
  threshold:type both, track by_src, count 20, seconds 5;
  sid:1000003;
  rev:1;
)
\`\`\`

---

## 7. VPN (Virtual Private Network)

### Types et protocoles

| Protocole | Couche OSI | Chiffrement | Avantages | Inconvenients | Utilisation |
|---|---|---|---|---|---|
| **IPSec** | 3 (Reseau) | AES, 3DES | Standard, robuste | Complexe, problemes avec NAT | Site-to-Site, Remote Access |
| **SSL/TLS VPN** | 4-7 | TLS | Fonctionne a travers les firewalls (port 443) | Performance | Remote Access, portail web |
| **WireGuard** | 3 | ChaCha20, Curve25519 | Simple, rapide, code court | Moins mature | Remote Access, Site-to-Site |
| **L2TP/IPSec** | 2-3 | IPSec | Compatible multiplateforme | Lent (double encapsulation) | Legacy |
| **PPTP** | 2 | MPPE (faible) | Simple | **Casse, ne plus utiliser** | Aucune |

### IPSec en detail

\`\`\`
Composants IPSec :

IKE (Internet Key Exchange) - Phase 1 et 2 :
  Phase 1 : Negociation des parametres de securite (SA), authentification mutuelle
            → Etablit un canal securise (IKE SA)
  Phase 2 : Negociation des parametres pour le trafic de donnees
            → Etablit les IPSec SAs

Protocoles de securite :
  AH (Authentication Header) :
    → Integrite + Authentification
    → PAS de confidentialite (pas de chiffrement)
    → Incompatible avec NAT (protege l'en-tete IP)

  ESP (Encapsulating Security Payload) :
    → Confidentialite + Integrite + Authentification
    → Compatible avec NAT-T (NAT Traversal, port UDP 4500)
    → Le plus utilise

Modes :
  Transport : chiffre uniquement le payload (host-to-host)
  Tunnel    : chiffre l'integalite du paquet original (site-to-site, VPN)
\`\`\`

| Aspect | Split Tunnel | Full Tunnel |
|---|---|---|
| Trafic VPN | Uniquement le trafic entreprise | **Tout** le trafic |
| Trafic Internet | Direct (pas via VPN) | Via le VPN de l'entreprise |
| Performance | Meilleure (moins de bande passante VPN) | Plus lente |
| Securite | Moindre (le trafic Internet n'est pas inspecte) | **Meilleure** (tout est inspecte) |
| Utilisation | Acces aux ressources internes + Internet rapide | Environnements haute securite |

---

## 8. Attaques sur les protocoles reseau

### ARP (Address Resolution Protocol) - Couche 2

\`\`\`
Attaque ARP Spoofing/Poisoning :

Normal :
  PC-A : "Qui a l'IP 10.0.0.1 ?" (ARP Request broadcast)
  Routeur : "C'est moi, MAC AA:BB:CC:DD:EE:FF" (ARP Reply)

Attaque :
  Attaquant envoie de faux ARP Reply :
  "10.0.0.1 est a MAC 11:22:33:44:55:66" (MAC de l'attaquant)
  → Tout le trafic destine au routeur passe par l'attaquant (MITM)

Contre-mesures :
  - Dynamic ARP Inspection (DAI) sur les switches
  - ARP statique pour les serveurs critiques
  - Segmentation VLAN
  - 802.1X
\`\`\`

### DHCP - Couche 7 (Application)

| Attaque | Description | Contre-mesure |
|---|---|---|
| **DHCP Starvation** | Epuisement du pool d'adresses avec de fausses requetes | DHCP Snooping, port security |
| **Rogue DHCP** | Faux serveur DHCP distribuant de fausses configurations (gateway malveillante) | **DHCP Snooping** (trusted/untrusted ports) |

### DNS - Couche 7

| Attaque | Description | Contre-mesure |
|---|---|---|
| **DNS Spoofing/Poisoning** | Injection de fausses reponses DNS dans le cache | **DNSSEC** (signatures cryptographiques) |
| **DNS Tunneling** | Exfiltration de donnees via des requetes DNS | Surveillance DNS, limiter les requetes TXT |
| **DNS Amplification (DDoS)** | Requetes DNS avec IP source falsifiee, reponses amplifiees vers la victime | Rate limiting, BCP38 (filtrage anti-spoofing) |
| **Domain hijacking** | Vol du nom de domaine via le registrar | MFA sur le compte registrar, registry lock |
| **Typosquatting** | Domaines similaires (gooogle.com) | Surveillance de marque, enregistrement preemptif |

### ICMP - Couche 3

| Attaque | Description | Contre-mesure |
|---|---|---|
| **Ping flood** | Envoi massif de paquets ICMP Echo Request | Rate limiting ICMP |
| **Ping of Death** | Paquet ICMP surdimensionne (>65535 octets) | Patching OS (corrige depuis longtemps) |
| **Smurf attack** | Ping broadcast avec IP source falsifiee | Desactiver directed broadcast |
| **ICMP redirect** | Redirection du trafic via un faux routeur | Desactiver ICMP redirect |

---

## 9. Securite Wi-Fi

### Comparaison des protocoles Wi-Fi

| Protocole | Annee | Chiffrement | Authentification | Securite | Statut |
|---|---|---|---|---|---|
| **WEP** | 1997 | RC4 (24-bit IV) | Cle partagee | **Casse en minutes** | Obsolete |
| **WPA** | 2003 | TKIP (RC4 ameliore) | PSK ou 802.1X | Faible (TKIP vulnerable) | Deprecie |
| **WPA2** | 2004 | **AES-CCMP** | PSK ou 802.1X | Fort | Standard actuel |
| **WPA3** | 2018 | **AES-GCMP** | SAE (Dragonfly) ou 802.1X | **Le plus fort** | Recommande |

**Ameliorations de WPA3 :**
- **SAE (Simultaneous Authentication of Equals)** : remplace le 4-way handshake PSK. Resistant aux attaques par dictionnaire offline.
- **Perfect Forward Secrecy** : compromission du mot de passe ne permet pas de dechiffrer le trafic capture precedemment.
- **Protected Management Frames (PMF)** : obligatoire (optionnel en WPA2)
- **192-bit security suite** : mode entreprise avec securite renforcee

### WPA2 Personal vs Enterprise

| Aspect | WPA2 Personal (PSK) | WPA2 Enterprise (802.1X) |
|---|---|---|
| Authentification | Mot de passe partage (Pre-Shared Key) | Identifiants individuels via RADIUS |
| Cle de chiffrement | Derivee du PSK (meme pour tous) | Unique par utilisateur et par session |
| Gestion | Simple | Complexe (RADIUS, certificats) |
| Revocation | Changer le PSK pour tout le monde | Desactiver le compte d'un seul utilisateur |
| Utilisation | Domicile, petites entreprises | **Entreprises** |

### Attaques Wi-Fi

| Attaque | Description | Protocole cible | Contre-mesure |
|---|---|---|---|
| **Evil Twin** | Point d'acces malveillant imitant un reseau legitime | Tous | 802.1X (certificat serveur), WIDS, education |
| **Deauthentication** | Envoi de trames deauth pour deconnecter les clients | WPA/WPA2 sans PMF | **WPA3** (PMF obligatoire) |
| **KRACK** | Reinstallation de cles dans le 4-way handshake | WPA2 | Patching, WPA3 |
| **Dragonblood** | Attaques side-channel sur SAE de WPA3 | WPA3 | Patching, implementations mises a jour |
| **War driving** | Reperage de reseaux Wi-Fi ouverts ou faiblement securises | WEP, reseaux ouverts | Chiffrement WPA3, SSID cache (faible protection) |
| **Rogue AP** | Point d'acces non autorise connecte au reseau | Tous | NAC, WIDS/WIPS, inspection physique |
| **Jamming** | Brouillage du signal Wi-Fi (attaque physique couche 1) | Tous | Detection RF, changement de frequence |

---

## 10. Network Access Control (NAC)

Le NAC controle l'acces au reseau en verifiant la conformite des appareils avant de les autoriser.

| Aspect | Agent-based NAC | Agentless NAC |
|---|---|---|
| Installation | Logiciel installe sur le poste | Aucune installation, controle via reseau |
| Verification | Profonde (AV a jour, OS patche, chiffrement disque) | Limitee (IP, MAC, scan NMAP) |
| BYOD | Problematique (installation agent sur appareils personnels) | **Adapte au BYOD** |
| Gestion | Complexe mais precise | Simple mais moins precise |

\`\`\`
Flux NAC typique :

1. Appareil se connecte au reseau
2. NAC verifie :
   □ Antivirus installe et a jour ?
   □ OS a jour (patches) ?
   □ Pare-feu active ?
   □ Chiffrement de disque active ?
   □ Appareil enregistre/autorise ?
3. Si conforme → Acces au reseau de production (VLAN autorise)
4. Si non conforme → Redirection vers un VLAN de quarantaine/remediation
   → L'appareil est mis a jour automatiquement ou manuellement
   → Nouvelle verification apres remediation
\`\`\`

---

## 11. Securite DNS

### DNSSEC

DNSSEC ajoute des **signatures cryptographiques** aux reponses DNS pour garantir leur authenticite et integrite.

\`\`\`
Sans DNSSEC :
  Client → Requete DNS "example.com" → Reponse "1.2.3.4"
  (Aucune garantie que la reponse est authentique)

Avec DNSSEC :
  Client → Requete DNS "example.com" →
  Reponse "1.2.3.4" + Signature RRSIG + Cle publique DNSKEY
  (Le client verifie la signature → reponse authentique)
\`\`\`

### DNS chiffre

| Protocole | Description | Port | Avantage | Inconvenient |
|---|---|---|---|---|
| **DoH (DNS over HTTPS)** | Requetes DNS dans HTTPS | 443 | Difficile a bloquer/inspecter, vie privee | Contourne les controles reseau entreprise |
| **DoT (DNS over TLS)** | Requetes DNS dans TLS | 853 | Chiffre mais sur un port dedie | Facile a bloquer (port connu) |

> **Point Security+ :** DNSSEC garantit l'**authenticite** (pas de spoofing) mais PAS la **confidentialite**. DoH/DoT garantissent la confidentialite (chiffrement) mais pas necessairement l'authenticite. Idealement, combiner les deux.

---

## 12. Securite Email

### SPF, DKIM, DMARC

| Protocole | Fonction | Fonctionnement | Protege contre |
|---|---|---|---|
| **SPF (Sender Policy Framework)** | Verifie que le serveur d'envoi est autorise | Enregistrement DNS TXT listant les serveurs autorises | Spoofing de domaine (enveloppe) |
| **DKIM (DomainKeys Identified Mail)** | Verifie l'integrite du message | Signature cryptographique dans l'en-tete + cle publique en DNS | Modification en transit |
| **DMARC** | Politique d'action si SPF/DKIM echouent | Enregistrement DNS TXT definissant la politique (none/quarantine/reject) | Combine SPF + DKIM + reporting |

\`\`\`
Enregistrements DNS pour la securite email :

SPF :
  example.com  TXT  "v=spf1 mx ip4:203.0.113.0/24 include:_spf.google.com -all"
  → Seuls les serveurs MX, le reseau 203.0.113.0/24 et Google peuvent envoyer pour ce domaine
  → "-all" = rejet strict de tout autre serveur

DKIM :
  selector._domainkey.example.com  TXT  "v=DKIM1; k=rsa; p=MIGfMA0GCSq..."
  → Cle publique pour verifier les signatures DKIM

DMARC :
  _dmarc.example.com  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"
  → p=reject : rejeter les emails echouant SPF et DKIM
  → rua : adresse pour les rapports agreges
\`\`\`

---

## 13. Mitigation DDoS

| Strategie | Description | Type de DDoS cible |
|---|---|---|
| **Rate limiting** | Limiter le nombre de requetes par IP/seconde | Volumetrique, applicatif |
| **Blackholing/Sinkholing** | Rediriger le trafic malveillant vers un "trou noir" | Volumetrique |
| **Scrubbing centers** | Trafic redirige vers un centre de nettoyage (Cloudflare, Akamai) | Tous |
| **Anycast** | Distribuer le trafic sur plusieurs datacenters mondiaux | Volumetrique |
| **CDN** | Content Delivery Network absorbe le trafic | Volumetrique, applicatif |
| **SYN cookies** | Repondre aux SYN sans allouer de ressources | SYN flood |
| **Geo-blocking** | Bloquer le trafic de certaines regions | Volumetrique |
| **WAF rules** | Regles specifiques contre les attaques applicatives | Applicatif (Layer 7) |

\`\`\`
Types de DDoS :

Volumetrique (couche 3-4) :
  → UDP flood, ICMP flood, DNS amplification
  → Objectif : saturer la bande passante
  → Mesure : Gbps

Protocole (couche 3-4) :
  → SYN flood, Ping of Death, Smurf
  → Objectif : epuiser les ressources des equipements reseau
  → Mesure : paquets par seconde (pps)

Applicatif (couche 7) :
  → HTTP flood, Slowloris, requetes complexes
  → Objectif : epuiser les ressources du serveur applicatif
  → Mesure : requetes par seconde (rps)
  → Le plus difficile a detecter (trafic apparemment legitime)
\`\`\`

---

## 14. SDN (Software-Defined Networking) et securite

Le SDN separe le **plan de controle** (decisions de routage) du **plan de donnees** (transmission des paquets).

| Aspect | Reseau traditionnel | SDN |
|---|---|---|
| Configuration | Par equipement (CLI) | Centralisee (controleur SDN) |
| Flexibilite | Rigide | Programmable, agile |
| Microsegmentation | Difficile | **Facilitee** |
| Point de defaillance | Distribue | Controleur = point unique |
| Securite | Regles par equipement | Politiques globales coherentes |

**Implications de securite du SDN :**
- Le controleur SDN est un point critique : s'il est compromis, tout le reseau est compromis
- Facilite la microsegmentation et le Zero Trust
- Permet une reponse automatisee aux incidents (isolation automatique d'un hote compromis)
- L'API du controleur doit etre securisee (authentification, chiffrement, autorisation)

---

## 15. Surveillance reseau

| Outil/Protocole | Description | Utilisation |
|---|---|---|
| **NetFlow/IPFIX** | Statistiques de flux reseau (source, dest, ports, volume) | Analyse de tendances, detection d'anomalies |
| **sFlow** | Echantillonnage du trafic reseau | Surveillance haute vitesse |
| **SNMP (v3)** | Interrogation d'equipements reseau (CPU, memoire, interfaces) | Monitoring d'infrastructure |
| **Packet capture (PCAP)** | Capture complete des paquets | Analyse forensique, troubleshooting |
| **Syslog** | Centralisation des logs d'equipements reseau | SIEM, correlation d'evenements |
| **SIEM** | Security Information and Event Management | Correlation, alertes, conformite |
| **NTA (Network Traffic Analysis)** | Analyse comportementale du trafic reseau | Detection de menaces avancees |

\`\`\`
Outils de capture et analyse :
  - Wireshark : capture et analyse de paquets (GUI)
  - tcpdump : capture de paquets (CLI)
  - Zeek (anciennement Bro) : analyse de trafic reseau (metadata)
  - ntopng : monitoring de trafic en temps reel (GUI web)
\`\`\`

---

## 16. Honeypots et Honeynets

| Type | Description | Objectif |
|---|---|---|
| **Honeypot** | Systeme leurre simulant un service vulnerable | Attirer les attaquants, observer leurs techniques |
| **Honeynet** | Reseau entier de honeypots | Etude approfondie des tactiques d'attaque |
| **Honeyfile** | Fichier leurre (ex: "passwords.xlsx") | Detection d'acces non autorise |
| **Honeytoken** | Donnee leurre (ex: faux identifiants, API key) | Detection d'exfiltration de donnees |

**Niveaux d'interaction :**
- **Low interaction** : simule des services basiques (facile a deployer, limite en informations)
- **High interaction** : systeme reel ou quasi-reel (riche en informations mais risque d'exploitation)

> **Point Security+ :** Les honeypots ne doivent jamais contenir de vraies donnees sensibles. Toute activite sur un honeypot est suspecte par definition, ce qui simplifie la detection.

---

## 17. Segmentation reseau et DMZ

### Techniques de segmentation

| Technique | Couche | Description | Granularite |
|---|---|---|---|
| **VLAN** | 2 | Segmentation logique des domaines de broadcast | Par port/switch |
| **Sous-reseaux** | 3 | Segmentation par plages IP avec routage inter-reseaux | Par reseau |
| **Firewall zones** | 3-4 | Zones separees par des regles de pare-feu | Par zone |
| **Microsegmentation** | 3-7 | Isolation granulaire au niveau des workloads/applications | Par application |

\`\`\`diagram
{
  "title": "Architecture DMZ Double Pare-feu",
  "titleColor": "#1e40af",
  "sections": [
    {
      "title": "Internet",
      "titleColor": "#be123c",
      "bg": "#fff1f2",
      "borderColor": "#f43f5e",
      "steps": [
        { "label": "Trafic externe", "bg": "#fecdd3", "color": "#be123c" }
      ]
    },
    {
      "title": "Pare-feu externe",
      "titleColor": "#9a3412",
      "bg": "#fff7ed",
      "borderColor": "#f97316",
      "steps": [
        { "label": "Ports 80, 443, 25 uniquement vers DMZ", "bg": "#fed7aa", "color": "#9a3412" }
      ]
    },
    {
      "title": "Zone DMZ",
      "titleColor": "#1e40af",
      "bg": "#eff6ff",
      "borderColor": "#3b82f6",
      "dashed": true,
      "steps": [
        { "label": "Serveur Web + Reverse Proxy", "bg": "#dbeafe", "color": "#1e40af" },
        { "label": "Serveur Mail + DNS Public", "bg": "#dbeafe", "color": "#1e40af" }
      ]
    },
    {
      "title": "Pare-feu interne",
      "titleColor": "#9a3412",
      "bg": "#fff7ed",
      "borderColor": "#f97316",
      "steps": [
        { "label": "Refuse DMZ → Interne (sauf requetes initiees depuis l'interne)", "bg": "#fed7aa", "color": "#9a3412" }
      ]
    },
    {
      "title": "Reseau interne",
      "titleColor": "#065f46",
      "bg": "#f0fdf4",
      "borderColor": "#22c55e",
      "steps": [
        { "label": "VLAN Users — Postes de travail", "bg": "#d1fae5", "color": "#065f46" },
        { "label": "VLAN Servers — Serveurs internes", "bg": "#d1fae5", "color": "#065f46" },
        { "label": "VLAN DB — Base de donnees (isole)", "bg": "#d1fae5", "color": "#065f46" }
      ]
    }
  ],
  "note": "Interne → Internet via proxy + filtrage"
}
\`\`\`

**Regles de pare-feu :**
- **Internet → DMZ** : ports 80, 443, 25 uniquement
- **DMZ → Interne** : REFUSE (sauf requetes initiees depuis l'interne)
- **Interne → DMZ** : AUTORISE (requetes vers serveurs DMZ)
- **Interne → Internet** : via proxy + filtrage

### Zero Trust Network

| Principe | Description |
|---|---|
| **Verifier explicitement** | Chaque requete est authentifiee et autorisee, quelle que soit sa provenance |
| **Moindre privilege** | Acces minimal necessaire, juste-a-temps |
| **Supposer la compromission** | Concevoir comme si l'attaquant etait deja a l'interieur |
| **Microsegmentation** | Isolation granulaire de chaque ressource |
| **Chiffrement partout** | Meme le trafic interne est chiffre (TLS, mTLS) |
| **Surveillance continue** | Monitoring et analyse comportementale en permanence |

---

## 18. Scenarios pratiques Security+

**Scenario 1 :** *Vous voyez du trafic sortant inhabituel sur le port 4444 depuis un poste de travail. Que faites-vous ?*
→ Le port 4444 est le port par defaut de **Meterpreter/Metasploit** (reverse shell). Actions immediates : (1) Isoler le poste du reseau (VLAN de quarantaine ou deconnexion). (2) Capturer le trafic (PCAP) pour analyse forensique. (3) Identifier le processus source sur le poste. (4) Verifier les connections vers l'IP destination. (5) Escalader vers l'equipe de reponse aux incidents. Ne PAS eteindre le poste (preservation des preuves en memoire).

**Scenario 2 :** *Votre entreprise veut permettre aux visiteurs d'utiliser le Wi-Fi sans acceder au reseau interne. Quelle architecture ?*
→ Creer un **VLAN invite** completement isole du reseau de production. Le VLAN invite a uniquement acces a Internet via un pare-feu dedie. Utiliser un portail captif pour l'acceptation des conditions d'utilisation. Filtrage web et limitation de bande passante.

**Scenario 3 :** *Un employe signale qu'il ne peut plus acceder a son application bancaire depuis le reseau d'entreprise, alors que tout fonctionne depuis son telephone en 4G.*
→ Verifier le **proxy d'entreprise** : le site est peut-etre bloque par categorie. Verifier le **certificat SSL** : si le proxy fait de l'inspection SSL, le certificat racine du proxy doit etre installe sur le poste. Verifier les **regles du firewall** : le port de l'application est peut-etre bloque. Verifier le **DNS** : le DNS d'entreprise resout peut-etre differemment.

**Scenario 4 :** *Vous devez mettre en place un VPN pour 200 teleworkers. Split tunnel ou full tunnel ?*
→ **Full tunnel** pour une securite maximale : tout le trafic est inspecte par les controles de securite de l'entreprise (proxy, IPS, DLP). Inconvenient : plus de bande passante necessaire et latence accrue. Si la bande passante est limitee, un **split tunnel** avec un proxy cloud (CASB/SASE) est un compromis acceptable.

---

## Rappels cles SY0-501 (Darril Gibson)

**Points cles des chapitres 3 et 4 du livre :**

- SSH est le MEILLEUR protocole pour chiffrer les PII en transit. SFTP utilise SSH pour securiser les transferts de fichiers
- SNMPv3 est la version securisee pour la surveillance des equipements reseau (authentification forte). Utilise les ports UDP 161/162
- NTP fournit la synchronisation horaire, essentielle pour Kerberos et la correlation des logs
- SRTP securise les communications VoIP et videoconference
- RSTP (Rapid Spanning Tree Protocol) previent les boucles de commutation (switching loops)
- Un firewall stateful filtre le trafic base sur l'etat de la connexion TCP (detecte les paquets sans handshake 3 voies)
- Une DMZ est une zone tampon entre le reseau interne et Internet pour heberger les serveurs accessibles publiquement
- Un proxy non-transparent peut filtrer le trafic par URL. Un filtre URL dans un UTM restreint l'acces aux sites de medias sociaux
- Un WAF (Web Application Firewall) protege les serveurs web ET peut fournir l'equilibrage de charge
- Un VPN full tunnel chiffre TOUT le trafic du client. Un split tunnel ne chiffre que le trafic destine au reseau prive
- Un IPS in-band (inline) est la MEILLEURE solution pour PREVENIR les attaques (vs IDS qui detecte seulement)
- WPA2 avec CCMP est le plus securise pour le Wi-Fi. WPA2 Enterprise necessite un serveur d'authentification 802.1x
- Un evil twin est un point d'acces malveillant avec le meme SSID qu'un AP legitime
- Le jamming Wi-Fi est une attaque DoS qui provoque des deconnexions intermittentes

**Scenarios pratiques du livre :**

*Scenario :* Un nouveau service sur un serveur DMZ fonctionne en interne mais pas depuis Internet → Le probleme est probablement une ACL mal configuree sur le pare-feu frontalier

*Scenario :* Vous voulez empecher les employes d'acceder aux reseaux sociaux → Implementer un proxy non-transparent avec filtrage URL

*Scenario :* Votre SSID est cache mais un reseau avec le meme nom apparait → C'est une attaque evil twin. L'attaquant a decouvert le SSID et cree un AP malveillant
`,
  keyPoints: [
    'Les NGFW combinent filtrage stateful, DPI, IPS et analyse applicative (couches 3-7). Le principe deny by default est fondamental : tout refuser sauf ce qui est explicitement autorise.',
    'L\'IDS est passif (detection + alerte via copie du trafic), l\'IPS est actif (detection + blocage en inline). La detection par signature est precise mais inefficace contre les zero-day ; la detection par anomalie detecte l\'inconnu mais genere plus de faux positifs.',
    'IPSec utilise IKE pour la negociation, AH pour l\'integrite (pas de chiffrement) et ESP pour la confidentialite + integrite. Le mode tunnel chiffre tout le paquet, le mode transport uniquement le payload.',
    'WPA3 apporte SAE (resistant au dictionnaire offline), PFS, PMF obligatoire et GCMP. WEP est casse en minutes, WPA/TKIP est deprecie, WPA2-AES reste acceptable.',
    'Les attaques ARP spoofing, DHCP starvation, DNS poisoning et evil twin ciblent les protocoles fondamentaux. Les contre-mesures incluent DAI, DHCP snooping, DNSSEC et 802.1X.',
    'SPF verifie le serveur d\'envoi, DKIM signe cryptographiquement le message, DMARC definit la politique (none/quarantine/reject). Les trois doivent etre deployes ensemble pour une protection email efficace.',
    'La segmentation reseau (VLAN, sous-reseaux, microsegmentation) et le modele Zero Trust limitent le mouvement lateral. La DMZ a double pare-feu isole les services publics du reseau interne.',
    'Les honeypots attirent les attaquants pour observer leurs techniques. Toute activite sur un honeypot est suspecte par definition. NetFlow, PCAP et SIEM sont essentiels pour la surveillance reseau.',
    'SY0-501 : SSH/SFTP est le meilleur protocole pour chiffrer les PII en transit. SNMPv3 securise la surveillance reseau. NTP est essentiel pour Kerberos et la correlation des logs.',
    'SY0-501 : Un IPS inline (in-band) previent les attaques, un IDS detecte seulement. Un proxy non-transparent avec filtrage URL restreint l\'acces aux sites non autorises.',
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
      title: 'Snort 3 - Open Source IDS/IPS Documentation',
      url: 'https://www.snort.org/',
      type: 'tool',
    },
    {
      title: 'Wi-Fi Alliance - WPA3 Specification',
      url: 'https://www.wi-fi.org/discover-wi-fi/security',
      type: 'article',
    },
  ],
  estimatedMinutes: 50,
};
