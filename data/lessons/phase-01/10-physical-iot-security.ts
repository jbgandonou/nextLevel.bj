import { Lesson } from '../../types';

export const physicalIotSecurity: Lesson = {
  id: 'p1-physical-iot-security',
  phaseId: 'phase-01',
  title: 'Sécurité physique, mobile et IoT',
  content: `
## Introduction à la sécurité physique et IoT

La sécurité informatique ne se limite pas au monde numérique. La sécurité physique est la première ligne de défense : si un attaquant peut accéder physiquement à vos systèmes, la plupart des contrôles logiques deviennent inutiles. De plus, avec la prolifération des appareils mobiles et IoT, la surface d'attaque s'étend bien au-delà du périmètre traditionnel. Pour le Security+ SY0-701, vous devez maîtriser les contrôles physiques, la sécurité mobile et les défis spécifiques de l'IoT et des systèmes industriels.

## Contrôles de sécurité physique

### Contrôles périmétriques

Les contrôles périmétriques constituent la première couche de défense physique. Ils visent à dissuader, détecter et retarder les intrus.

**Barrières physiques :**
- **Clôtures** : première ligne de défense. La hauteur détermine le niveau de sécurité :
  - 1 m : dissuasion minimale
  - 2 m : dissuasion raisonnable (trop haute pour être escaladée facilement)
  - 2,5 m+ avec barbelés : haute sécurité (installations militaires)
- **Bollards** : poteaux en béton ou en acier empêchant les véhicules d'approcher un bâtiment (protection contre les attaques au véhicule-bélier)
- **Éclairage** : dissuasion et aide à la vidéosurveillance. Les zones sensibles doivent être bien éclairées en permanence

**Vidéosurveillance (CCTV) :**
- Caméras fixes et PTZ (Pan-Tilt-Zoom)
- Enregistrement continu vs détection de mouvement
- Stockage local vs cloud (considérations de rétention et de confidentialité)
- Caméras avec vision nocturne pour une surveillance 24h/24

**Gardes de sécurité :**
- Contrôle humain complémentaire aux systèmes automatisés
- Peuvent prendre des décisions contextuelles
- Rondes aléatoires pour éviter la prédictibilité
- Vérification d'identité et escorte des visiteurs

### Contrôles d'accès physique

#### Mantrap / Vestibule de sécurité

Un **vestibule de sécurité** (anciennement mantrap) est un sas à deux portes : la seconde ne s'ouvre que lorsque la première est fermée et verrouillée. Cela empêche le tailgating (passage en suivant une personne autorisée).

\`\`\`
┌─────────────────────────────────────┐
│         Zone sécurisée              │
│                                     │
│  ┌─────────────────────────────┐    │
│  │    Vestibule de sécurité    │    │
│  │                             │    │
│  │  Porte 2    ┌──────┐       │    │
│  │  (intérieure)│Badge │       │    │
│  │  ═══════    │Reader│       │    │
│  │             └──────┘       │    │
│  │                             │    │
│  │             ┌──────┐       │    │
│  │  Porte 1    │Badge │       │    │
│  │  (extérieure)│Reader│       │    │
│  │  ═══════    └──────┘       │    │
│  └─────────────────────────────┘    │
│                                     │
│         Zone publique               │
└─────────────────────────────────────┘

Règle : Porte 1 fermée → Porte 2 peut s'ouvrir
        Porte 2 fermée → Porte 1 peut s'ouvrir
        Jamais les deux ouvertes en même temps
\`\`\`

#### Systèmes de badges et cartes à puce

- **Cartes de proximité** : RFID passif, portée courte (quelques centimètres). Risque : clonage facile.
- **Smart cards** : contiennent un microprocesseur, supportent le chiffrement. Plus sécurisées que les cartes de proximité.
- **Badges avec photo** : identification visuelle complémentaire à l'authentification électronique.
- **Badges temporaires** : pour les visiteurs, avec date d'expiration et zones restreintes.

#### Biométrie

| Type | Mesure | Avantages | Inconvénients |
|------|--------|-----------|---------------|
| **Empreinte digitale** | Motifs des crêtes papillaires | Rapide, abordable | Peut être trompé (moulage) |
| **Reconnaissance faciale** | Géométrie du visage | Sans contact | Sensible aux conditions d'éclairage |
| **Scan rétinien** | Vaisseaux sanguins de la rétine | Très précis | Intrusif, coûteux |
| **Scan de l'iris** | Motifs de l'iris | Très précis, sans contact | Coûteux |
| **Reconnaissance vocale** | Caractéristiques vocales | Pratique, à distance | Sensible au bruit, deepfakes |
| **Reconnaissance veineuse** | Vaisseaux sanguins de la main | Difficile à falsifier | Coûteux |

**Métriques biométriques clés :**
- **FAR (False Acceptance Rate)** : taux de faux positifs (un imposteur est accepté)
- **FRR (False Rejection Rate)** : taux de faux négatifs (un utilisateur légitime est rejeté)
- **CER (Crossover Error Rate)** : point où FAR = FRR, indicateur global de précision. Plus le CER est bas, meilleur est le système.

**Question type Security+ :** *Quel indicateur biométrique représente le meilleur équilibre entre les faux positifs et les faux négatifs ?*
→ Réponse : Le CER (Crossover Error Rate), aussi appelé EER (Equal Error Rate).

#### Gestion des clés physiques

- Armoire à clés sécurisée avec journalisation des accès
- Clés maîtresses limitées et auditées
- Système de clé à cylindre avec niveaux hiérarchiques
- Remplacement immédiat des clés perdues ou volées

## Contrôles environnementaux

### Système CVC (Chauffage, Ventilation, Climatisation)

Les équipements informatiques nécessitent des conditions environnementales strictes :
- **Température** : 18-27°C (idéalement 20-22°C)
- **Humidité** : 40-60% d'humidité relative
  - Trop sec : décharges électrostatiques (ESD) pouvant endommager les composants
  - Trop humide : condensation et corrosion

### Suppression d'incendie

| Type | Agent | Usage | Avantages | Inconvénients |
|------|-------|-------|-----------|---------------|
| **Sprinklers humides** (wet pipe) | Eau | Bureaux standard | Simple, fiable | Dégâts d'eau sur les équipements |
| **Sprinklers secs** (dry pipe) | Air puis eau | Zones à risque de gel | Moins de dégâts accidentels | Délai d'activation |
| **Gaz inerte** | FM-200, Novec 1230 | Salles serveurs | Pas de dégâts d'eau, sûr pour les personnes | Coûteux |
| **CO2** | Dioxyde de carbone | Zones non occupées | Efficace, pas de résidu | **Dangereux pour les personnes** |

**Point Security+ :** Le FM-200 et le Novec 1230 sont les agents recommandés pour les salles serveurs car ils n'endommagent pas les équipements et sont sûrs pour les occupants.

### Alimentation électrique

- **UPS (Uninterruptible Power Supply)** : batterie de secours fournissant une alimentation temporaire en cas de coupure. Protège aussi contre les surtensions et les fluctuations.
  - **Online UPS** : alimentation constante via la batterie (meilleure protection)
  - **Standby UPS** : bascule sur batterie en cas de coupure (moins cher)
- **Générateurs** : alimentation de secours à long terme (diesel ou gaz). Démarrage automatique en cas de coupure prolongée.
- **PDU (Power Distribution Unit)** : distribution contrôlée de l'alimentation dans les racks serveurs.

\`\`\`
Chaîne d'alimentation de secours :

Alimentation  →  Onduleur  →  Commutateur  →  Générateur
 principale      (UPS)       de transfert     (diesel)
                  │            automatique        │
                  │                               │
              5-30 min                      Heures/Jours
              de batterie                   de carburant
\`\`\`

## Sécurité des datacenters

### Classification des datacenters (Tiers Uptime Institute)

| Tier | Disponibilité | Redondance | Maintenance | Temps d'arrêt/an |
|------|--------------|------------|-------------|-------------------|
| **Tier I** | 99,671% | Aucune | Arrêt nécessaire | 28,8 heures |
| **Tier II** | 99,741% | Partielle | Arrêt partiel | 22,7 heures |
| **Tier III** | 99,982% | N+1 | Sans interruption | 1,6 heures |
| **Tier IV** | 99,995% | 2N+1 | Tolérant aux pannes | 26,3 minutes |

### Organisation physique

- **Hot aisle / Cold aisle** : alternance des allées chaudes (arrière des serveurs, évacuation) et froides (avant des serveurs, alimentation en air frais) pour optimiser le refroidissement.

\`\`\`
        Allée froide        Allée chaude        Allée froide
      (air conditionné)    (évacuation)       (air conditionné)
            ↓                   ↑                    ↓
   ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
   │   ← Serveurs   │ │   Serveurs →   │ │   ← Serveurs   │
   │     Rack A      │ │     Rack B     │ │     Rack C      │
   │   (avant)       │ │   (arrière)    │ │   (avant)       │
   └────────────────┘ └────────────────┘ └────────────────┘
\`\`\`

- **Cable management** : organisation des câbles pour faciliter la maintenance et prévenir les incidents (déconnexion accidentelle, incendie)
- **Cage de Faraday** : blindage électromagnétique empêchant les écoutes par rayonnement (TEMPEST)
- **Destruction sécurisée des supports** : déchiquetage, démagnétisation (degaussing) ou destruction physique des disques en fin de vie

## Sécurité des appareils mobiles

### Politiques de gestion des appareils

| Politique | Description | Contrôle de l'entreprise | Coût pour l'entreprise |
|-----------|-------------|--------------------------|------------------------|
| **BYOD** | Bring Your Own Device - appareil personnel | Faible | Faible |
| **COPE** | Corporate-Owned, Personally Enabled | Élevé | Élevé |
| **CYOD** | Choose Your Own Device - choix parmi une liste | Moyen | Moyen |
| **COBO** | Corporate-Owned, Business Only | Maximal | Élevé |

### MDM et MAM

**MDM (Mobile Device Management)** : gestion complète de l'appareil mobile.
- Effacement à distance (remote wipe) en cas de perte ou vol
- Application de politiques de sécurité (mot de passe, chiffrement)
- Géolocalisation de l'appareil
- Contrôle des applications installées
- Configuration Wi-Fi, VPN et email à distance

**MAM (Mobile Application Management)** : gestion au niveau des applications uniquement, sans contrôler l'appareil entier. Plus adapté au BYOD car respecte la vie privée de l'utilisateur.

### Containerisation mobile

La containerisation crée un **espace isolé** sur l'appareil mobile qui sépare les données professionnelles des données personnelles. Si l'appareil est compromis ou si l'employé quitte l'entreprise, seul le conteneur professionnel est effacé.

### Menaces mobiles

- **Jailbreaking (iOS) / Rooting (Android)** : suppression des restrictions de sécurité de l'OS, permettant l'installation d'applications non approuvées et l'accès root
- **Sideloading** : installation d'applications depuis des sources non officielles (APK Android hors Play Store)
- **Applications malveillantes** : malware déguisé en application légitime
- **Attaques Wi-Fi** : evil twin (faux point d'accès), MITM sur les réseaux publics
- **Smishing** : phishing par SMS avec des liens malveillants
- **Bluesnarfing/Bluejacking** : attaques via Bluetooth pour voler des données ou envoyer des messages non sollicités

**Question type Security+ :** *Un employé signale que son téléphone BYOD a été volé. Quelle est la première action de sécurité à effectuer ?*
→ Réponse : Exécuter un remote wipe via le MDM pour effacer les données professionnelles de l'appareil.

## Sécurité de l'Internet des Objets (IoT)

### Défis fondamentaux de la sécurité IoT

Les appareils IoT posent des défis de sécurité uniques en raison de leurs contraintes :

- **Ressources limitées** : processeurs faibles, mémoire insuffisante pour exécuter des agents de sécurité complets
- **Identifiants par défaut** : de nombreux appareils sont déployés avec des mots de passe par défaut jamais modifiés (le botnet Mirai a exploité cette faiblesse pour infecter des centaines de milliers d'appareils)
- **Mises à jour difficiles** : absence de mécanisme de mise à jour automatique, firmware rarement patché
- **Durée de vie longue** : les appareils IoT restent en service pendant des années sans support de sécurité
- **Manque de visibilité** : des appareils IoT peuvent être connectés au réseau sans que l'équipe IT en ait connaissance (Shadow IoT)

### Protocoles IoT et considérations de sécurité

| Protocole | Usage | Transport | Sécurité |
|-----------|-------|-----------|----------|
| **MQTT** | Messages pub/sub léger | TCP | TLS optionnel, authentification par username/password |
| **CoAP** | REST pour appareils contraints | UDP | DTLS pour le chiffrement |
| **Zigbee** | Domotique, faible consommation | IEEE 802.15.4 | AES-128, mais clés parfois échangées en clair |
| **Z-Wave** | Domotique, faible portée | Propriétaire | Chiffrement AES-128 (S2 framework) |
| **BLE** | Bluetooth Low Energy | Bluetooth | Vulnérable à plusieurs attaques (KNOB, BLESA) |
| **LoRaWAN** | IoT longue portée | Propriétaire | AES-128, deux niveaux de clés (réseau et application) |

### Bonnes pratiques de sécurité IoT

- **Segmentation réseau** : isoler les appareils IoT dans un VLAN dédié, sans accès direct au réseau principal
- **Changement des identifiants par défaut** : politique obligatoire de modification des mots de passe à l'installation
- **Mise à jour du firmware** : vérifier régulièrement les mises à jour et les appliquer (OTA - Over The Air si possible)
- **Inventaire** : maintenir un inventaire complet de tous les appareils IoT connectés
- **Surveillance** : monitorer le trafic réseau des appareils IoT pour détecter les anomalies
- **Secure boot** : vérifier l'intégrité du firmware au démarrage

## Sécurité SCADA/ICS

### Architecture SCADA

Les systèmes **SCADA** (Supervisory Control and Data Acquisition) supervisent et contrôlent les processus industriels à distance.

\`\`\`
┌─────────────────────────────────────────────────┐
│              Réseau d'entreprise (IT)            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Email   │  │   ERP    │  │  Web     │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└────────────────────┬────────────────────────────┘
                     │ Pare-feu / DMZ industrielle
┌────────────────────┴────────────────────────────┐
│              Réseau industriel (OT)              │
│  ┌──────────┐  ┌──────────┐                     │
│  │ Historian │  │  SCADA   │                     │
│  │ Server   │  │  Server  │                     │
│  └──────────┘  └──────────┘                     │
│         │              │                         │
│  ┌──────┴──────┐ ┌─────┴──────┐                 │
│  │    PLC      │ │    RTU     │                  │
│  │(Automate)   │ │(Remote     │                  │
│  │             │ │ Terminal)  │                  │
│  └──────┬──────┘ └─────┬──────┘                 │
│         │              │                         │
│  ┌──────┴──────────────┴──────┐                 │
│  │   Capteurs et Actionneurs  │                  │
│  │  (température, pression,   │                  │
│  │   vannes, moteurs)         │                  │
│  └────────────────────────────┘                 │
└──────────────────────────────────────────────────┘
\`\`\`

### Protocoles industriels

| Protocole | Usage | Sécurité native | Risque |
|-----------|-------|-----------------|--------|
| **Modbus** | Communication série/TCP pour automates | **Aucune** (pas d'authentification, pas de chiffrement) | Critique |
| **DNP3** | Réseau électrique, eau | Authentication optionnelle (Secure Authentication v5) | Élevé |
| **OPC UA** | Communication industrielle moderne | Chiffrement et authentification intégrés | Modéré |
| **BACnet** | Gestion technique du bâtiment | Authentification optionnelle | Élevé |

### Systèmes de sécurité instrumentés (SIS)

Les **Safety Instrumented Systems** sont des systèmes indépendants conçus pour mettre un processus industriel en état sûr en cas de défaillance. Ils sont critiques dans les industries à risque (chimie, nucléaire, pétrole).

**Point Security+ :** Les SIS doivent être physiquement séparés des systèmes de contrôle pour empêcher un attaquant de les désactiver (attaque TRITON/TRISIS en 2017 contre un SIS Schneider Electric).

### Bonnes pratiques SCADA/ICS

- **Air-gapping** ou segmentation stricte entre les réseaux IT et OT
- **Surveillance** du trafic industriel avec des IDS spécialisés (Claroty, Dragos, Nozomi Networks)
- **Patch management adapté** : tester les mises à jour sur un environnement identique avant déploiement en production
- **Contrôle d'accès physique** renforcé pour les automates et les armoires de contrôle
- **Sauvegardes régulières** des programmes des automates (PLC)
- **Formation** du personnel OT aux bonnes pratiques de cybersécurité

## Systèmes embarqués

### RTOS (Real-Time Operating System)

Les systèmes d'exploitation temps réel sont conçus pour répondre à des contraintes de temps strictes. On les trouve dans les systèmes critiques : avionique, automobile, équipements médicaux.

**Considérations de sécurité :**
- Surface d'attaque réduite (code minimal)
- Difficultés de mise à jour (systèmes critiques)
- Absence fréquente de mécanismes de sécurité modernes (ASLR, DEP)
- Validation et certification requises (DO-178C pour l'avionique)

### Secure Boot et signature du firmware

Le **Secure Boot** vérifie l'intégrité du firmware et du système d'exploitation au démarrage :

\`\`\`
Processus de Secure Boot :

1. ROM de démarrage (immuable)
   │ Vérifie la signature du bootloader
   ▼
2. Bootloader signé
   │ Vérifie la signature du kernel
   ▼
3. Kernel OS signé
   │ Vérifie les drivers et modules
   ▼
4. Système opérationnel vérifié

Si une vérification échoue → le démarrage est interrompu
\`\`\`

La **signature du firmware** garantit que les mises à jour de firmware proviennent d'une source légitime et n'ont pas été modifiées. Sans signature, un attaquant pourrait injecter un firmware malveillant.

## Attaques physiques et sans fil spécialisées

### GPS Spoofing

Le **GPS spoofing** consiste à émettre de faux signaux GPS pour tromper un récepteur sur sa position. Applications malveillantes :
- Détourner des drones ou des véhicules autonomes
- Fausser les horodatages basés sur le GPS
- Perturber la navigation maritime ou aérienne

**Mitigations :** Multi-constellation (GPS + GLONASS + Galileo), détection d'anomalies, antennes directionnelles.

### Attaques RFID et NFC

- **Skimming RFID** : lecture non autorisée d'une carte RFID à distance (badges d'accès, cartes bancaires sans contact)
- **Clonage RFID** : copie des données d'une carte RFID pour en créer un duplicata
- **Relay attack NFC** : relais du signal NFC entre une carte et un lecteur distant (attaque sur le paiement sans contact)
- **Eavesdropping** : interception passive des communications RFID/NFC

**Mitigations :** Étuis de protection (cage de Faraday), chiffrement des communications, distance de lecture réduite, authentification mutuelle.

### Sécurité des drones

Les drones présentent des risques de sécurité spécifiques :
- **Espionnage** : surveillance non autorisée avec caméras
- **Livraison de charges** : transport de matériel illicite au-dessus de périmètres sécurisés
- **Attaques sur les drones** : prise de contrôle (hijacking), brouillage GPS, interception des flux vidéo
- **Collision intentionnelle** : utilisation comme projectile contre des infrastructures

**Contre-mesures :** Systèmes de détection de drones (radar, RF, optique), brouillage légal (zones sensibles), géofencing (zones d'exclusion aérienne programmées).

**Question type Security+ :** *Une entreprise souhaite protéger son datacenter contre la surveillance par drone. Quelle mesure est la plus appropriée ?*
→ Réponse : Déployer un système de détection de drones combiné à des mesures physiques (filets, occultation des installations) et signaler la zone comme espace aérien restreint.

---

## Rappels cles SY0-501 (Darril Gibson)

**Points cles du chapitre 5 (mobile/hardening) et chapitre 9 (physique) du livre :**

- Les cable locks sont des dissuasifs efficaces contre le vol d'equipement pour les ordinateurs portables
- Les bollards sont des barrieres physiques qui empechent les vehicules d'acceder a une zone
- Le hardening des systemes inclut : desactiver les services inutiles, supprimer les applications non necessaires, appliquer les patches, changer les mots de passe par defaut
- Le TPM (Trusted Platform Module) est une puce hardware qui stocke les cles de chiffrement de maniere securisee (utilisee par BitLocker)
- Le FDE (Full Disk Encryption) chiffre l'integralite du disque dur. BitLocker (Windows) et FileVault (macOS) sont des exemples courants
- Le MDM (Mobile Device Management) permet la gestion centralisee des appareils mobiles : effacement a distance, application de politiques, inventaire
- Le BYOD (Bring Your Own Device) presente des risques de securite : donnees d'entreprise sur des appareils personnels, perte/vol, applications non securisees
- La politique COPE (Corporate-Owned, Personally Enabled) offre un meilleur controle que le BYOD
- Les systemes SCADA/ICS sont souvent anciens et difficiles a mettre a jour. Un NIPS a la frontiere du reseau SCADA peut attenuer les risques
- Un agent NAC dissolvable est utilise pour les appareils BYOD temporaires — il verifie la conformite puis se supprime

**Scenarios pratiques du livre :**

*Scenario :* L'organisation veut reduire les vols d'equipement → Les cable locks sont la meilleure solution pour les portables

*Scenario :* Un malware est decouvert sur un systeme qui controle des SCADA. Il n'est pas possible de mettre a jour les systemes SCADA → Installer un NIPS a la frontiere du reseau SCADA

*Scenario :* L'organisation implemente le BYOD. Le management veut que les appareils respectent les standards minimaux de securite → Utiliser un agent NAC dissolvable qui verifie la conformite
`,
  keyPoints: [
    'Un vestibule de sécurité (mantrap) empêche le tailgating en n\'autorisant l\'ouverture que d\'une seule porte à la fois. Les bollards protègent contre les attaques véhiculaires.',
    'Le CER (Crossover Error Rate) est l\'indicateur clé de la précision biométrique : plus il est bas, meilleur est le système. Il représente le point où FAR égale FRR.',
    'Le FM-200 et le Novec 1230 sont les agents de suppression d\'incendie recommandés pour les salles serveurs (pas de dégâts sur les équipements, sûrs pour les personnes).',
    'Les datacenters Tier IV offrent une disponibilité de 99,995% avec une redondance 2N+1, contre 99,671% pour un Tier I sans redondance.',
    'Le MDM (Mobile Device Management) permet le remote wipe, l\'application de politiques de sécurité et le contrôle des applications sur les appareils mobiles.',
    'Les appareils IoT sont vulnérables en raison de ressources limitées, d\'identifiants par défaut et de firmware rarement mis à jour. La segmentation réseau est essentielle.',
    'Les protocoles industriels comme Modbus n\'ont aucune sécurité native (pas d\'authentification, pas de chiffrement). La segmentation IT/OT est critique.',
    'Le Secure Boot vérifie la chaîne d\'intégrité au démarrage : ROM → bootloader signé → kernel signé → système vérifié.',
  ],
  resources: [
    {
      title: 'CompTIA Security+ SY0-701 - Physical Security (Professor Messer)',
      url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/physical-security/',
      type: 'video',
    },
    {
      title: 'NIST SP 800-183 - Networks of Things (IoT)',
      url: 'https://csrc.nist.gov/publications/detail/sp/800-183/final',
      type: 'article',
    },
    {
      title: 'ICS-CERT Recommended Practices - CISA',
      url: 'https://www.cisa.gov/topics/industrial-control-systems',
      type: 'article',
    },
    {
      title: 'OWASP IoT Security Verification Standard',
      url: 'https://owasp.org/www-project-iot-security-verification-standard/',
      type: 'article',
    },
  ],
  estimatedMinutes: 35,
};
