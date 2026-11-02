# 🛍️ MALICK BUSS — Marketplace Multi-Boutiques

> **Plateforme E-Commerce Multi-Vendeurs Mobile-First adaptée au marché sénégalais et ouest-africain (FCFA).**  
> *Une plateforme unique • Plusieurs boutiques indépendantes • Une commission paramétrable par vente validée.*

---

## 📋 Table des Matières

1. [Vision & Présentation du Projet](#-vision--présentation-du-projet)
2. [Acteurs & Rôles](#-acteurs--rôles)
3. [Architecture Fonctionnelle & Écrans](#-architecture-fonctionnelle--écrans)
4. [Règles Métier Transversales](#-règles-métier-transversales)
   - [Cycle de Vie & Machine d'États d'une Commande](#cycle-de-vie--machine-détats-dune-commande)
   - [Gestion du Panier Multi-Boutiques & Sous-Commandes](#gestion-du-panier-multi-boutiques--sous-commandes)
   - [Modèle Financier & Moteur de Commissions](#modèle-financier--moteur-de-commissions)
   - [Logistique, Preuve de Livraison & Clôture](#logistique-preuve-de-livraison--clôture)
   - [Rôle & Périmètre de WhatsApp](#rôle--périmètre-de-whatsapp)
5. [Stack Technologique Recommandé](#-stack-technologique-recommandé)
   - [Matrice de Décision & Justification](#matrice-de-décision--justification)
   - [Architecture Technique Globale](#architecture-technique-globale)
6. [Modèle de Données & Schéma Relationnel](#-modèle-de-données--schéma-relationnel)
7. [Structure Complète du Projet (Monorepo)](#-structure-complète-du-projet-monorepo)
8. [Guide de Démarrage & Installation Rapide](#-guide-de-démarrage--installation-rapide)
9. [Variables d'Environnement (.env.example)](#-variables-denvironnement-envexample)
10. [Sécurité, Audit & Conformité](#-sécurité-audit--conformité)
11. [Roadmap & Plan de Recette MVP](#-roadmap--plan-de-recette-mvp)

---

## 🎯 1. Vision & Présentation du Projet

**Malick Buss** est une marketplace e-commerce multi-boutiques pensée et optimisée pour l'écosystème commercial sénégalais (Dakar et régions) et sous-régional. Elle permet à des commerçants indépendants (friperie, prêt-à-porter, maroquinerie, électronique, accessoires, cosmétiques, etc.) de créer leur propre vitrine numérique en ligne tout en bénéficiant de la force d'attraction, des mécanismes de paiement sécurisés et de la logistique centralisée de la plateforme.

### 🌟 Piliers Fondamentaux

- **Mobile-First & Performance Low-Data :** Interface fluide, temps de chargement sous la seconde sur réseaux 3G/4G, consommation data optimisée pour les smartphones d'entrée et milieu de gamme.
- **Transactions Locales en FCFA :** Intégration native des solutions de paiement plébiscitées au Sénégal (**Wave**, **Orange Money**, **Free Money**) et gestion encadrée du **Paiement à la Livraison (Cash on Delivery)**.
- **Étanchéité Multi-Vendeurs :** Panier unique côté acheteur, éclaté automatiquement en **sous-commandes indépendantes** par boutique pour le traitement, la logistique et la facturation.
- **Transparence Financière & Traçabilité :** Modèle de commission automatique avec instantané (*snapshot*) inviolable lors de la commande, distinction entre commission estimée, exigible, reversée et ajustée (en cas de litige ou remboursement).
- **Synergie WhatsApp sans compromis financier :** Utilisation de WhatsApp pour l'assistance, la réassurance et le partage viral, sans jamais considérer une simple redirection comme une vente financièrement conclue.

---

## 👥 2. Acteurs & Rôles

```mermaid
graph TD
    Client[🛒 Client / Acheteur] -->|Parcourt & Commande| Platform((Plateforme Malick Buss))
    Vendor[🏪 Vendeur / Boutiquier] -->|Gère Stock & Expédie| Platform
    Courier[🛵 Livreur / Coursier] -->|Remet Colis & Valide Preuve| Platform
    Admin[🛡️ Super Admin / Finance] -->|Supervise, Valide & Règle| Platform
    Mod[⚖️ Support & Modérateur] -->|Gère Litiges & Catalogue| Platform
```

| Rôle | Responsabilités Principales | Espaces Dédiés |
| :--- | :--- | :--- |
| **Visiteur** | Consultation libre du catalogue, recherche, consultation des fiches boutiques et produits. | Application Web Mobile |
| **Client Acheteur** | Gestion du profil, panier multi-boutiques, commande, paiement en ligne ou à la livraison, suivi temps réel, confirmation de réception, évaluation, déclaration de litige. | Espace Client (Mobile / PWA / App) |
| **Vendeur / Boutiquier** | Inscription de sa boutique, soumission KYC, publication des produits (variantes, stocks), traitement des sous-commandes, remise aux livreurs, suivi des commissions, demande de retraits de fonds. | Espace Vendeur (Mobile & Web) |
| **Livreur / Transporteur** | Récupération des colis chez le vendeur, acheminement, recueil du code OTP de confirmation client ou signature de livraison. | Interface Livreur / PWA Coursier |
| **Support / Modérateur** | Modération du catalogue (antidote contre contrefaçons, articles interdits), médiation des litiges retours/remboursements, support client/boutiquier. | Back-Office Admin (Rubrique Modération) |
| **Super Administrateur / Finance** | Validation KYC des nouvelles boutiques, configuration des grilles de commission (par catégorie, boutique ou globale), validation des demandes de retraits, réconciliation des flux de paiement. | Back-Office Super Admin |

---

## 📱 3. Architecture Fonctionnelle & Écrans

Le cahier des charges spécifie **31 écrans fonctionnels** structurés en trois sous-systèmes hermétiques :

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             MALICK BUSS ECOSYSTEM                           │
├────────────────────────┬──────────────────────────┬─────────────────────────┤
│    🛒 ESPACE CLIENT    │   🏪 ESPACE BOUTIQUIER   │ 🛡️ SUPER ADMINISTRATION │
│      (28 Écrans)       │       (20 Écrans)        │       (Back-Office)     │
├────────────────────────┼──────────────────────────┼─────────────────────────┤
│ • Démarrage & Splash   │ • Inscription & Onb. KYC │ • Dashboard Financier   │
│ • Accueil Marketplace  │ • Dashboard Ventes       │ • Validation Boutiques  │
│ • Recherche & Filtres  │ • Gestion Catalogue      │ • Modération Catalogue  │
│ • Univers & Catégories │ • Variantes & Stocks     │ • Grille des Commissions│
│ • Répertoire Boutiques │ • Traitement Commandes   │ • Gestion Retraits/Pay  │
│ • Vitrine de Boutique  │ • Expéditions & Suivi    │ • Arbitrage Litiges     │
│ • Fiche Produit        │ • Relevé Commissions     │ • Rapprochement Bancaire│
│ • Panier Multi-Boutique│ • Demandes de Retrait    │ • Audit Logs & Sécurité │
│ • Checkout & Adresses  │ • Évaluations & Notes    │ • Paramétrage Plateforme│
│ • Paiement Wave/OM/COD │ • Paramètres Boutique    │                         │
│ • Redirection WhatsApp │ • Support & Alertes      │                         │
│ • Suivi de Commande    │                          │                         │
│ • Litiges & Retours    │                          │                         │
└────────────────────────┴──────────────────────────┴─────────────────────────┘
```

---

## ⚙️ 4. Règles Métier Transversales

### Cycle de Vie & Machine d'États d'une Commande

Une commande globale (`Order`) regroupe une ou plusieurs sous-commandes (`SubOrder`), une par boutique impliquée. Les transitions de statuts sont strictement contrôlées par le serveur :

```mermaid
stateDiagram-v2
    [*] --> DRAFT : Ajout au panier
    DRAFT --> PENDING_PAYMENT : Validation Checkout
    PENDING_PAYMENT --> PAID : Succès Webhook Wave/OM
    PENDING_PAYMENT --> TO_ACCEPT : Choix Paiement à la Livraison (COD)
    PENDING_PAYMENT --> CANCELLED : Expiration délai de paiement (15 min)

    PAID --> ACCEPTED : Vendeur accepte la commande
    TO_ACCEPT --> ACCEPTED : Vendeur accepte la commande
    PAID --> REJECTED : Vendeur refuse (Remboursement auto)
    
    ACCEPTED --> PREPARING : Vendeur prépare le colis
    PREPARING --> IN_DELIVERY : Remis au livreur / Expédié
    
    IN_DELIVERY --> DELIVERED : Preuve livrée (OTP ou Signature)
    
    DELIVERED --> COMPLETED : Client valide réception OU Délai auto-clôture expiré (ex: 48h)
    DELIVERED --> DISPUTED : Client signale un problème / litige
    
    DISPUTED --> REFUNDED : Litige résolu en faveur du client
    DISPUTED --> COMPLETED : Litige résolu en faveur du vendeur
    
    COMPLETED --> [*] : Commission exigible & transférable au vendeur
    CANCELLED --> [*] : Stock réintégré
    REFUNDED --> [*] : Écritures d'ajustement comptable
```

### Gestion du Panier Multi-Boutiques & Sous-Commandes

1. **Panier Unifié Côté Client :** L'acheteur peut ajouter des articles provenant de boutiques distinctes (ex: une chemise chez *Boutique A* et des chaussures chez *Boutique B*).
2. **Éclatement en Sous-Commandes (`SubOrder`) :**
   - Chaque boutique reçoit uniquement sa propre sous-commande avec sa liste d'articles, son statut d'avancement et son bon de préparation.
   - Les frais de livraison sont calculés et affectés individuellement par sous-commande selon la politique de chaque boutique ou de la zone d'expédition.
   - L'annulation ou le retard d'une sous-commande de la *Boutique A* n'impacte pas le cycle de vie de la sous-commande de la *Boutique B*.

### Modèle Financier & Moteur de Commissions

Le calcul des commissions repose sur un **instantané immuable (*snapshot*)** :

$$\text{Base Éligible} = \sum (\text{Prix Unitaire Ligne} \times \text{Quantité}) - \text{Remises Marchand}$$

$$\text{Commission Malick Buss} = \text{Base Éligible} \times \text{Taux Appliqué}$$

$$\text{Net à Reverser au Vendeur} = \text{Base Éligible} - \text{Commission} + \text{Frais de Livraison (si assurés par le vendeur)}$$

- **Frais de livraison exclus :** Les frais de livraison ne font pas l'objet de prélèvements de commission par la plateforme.
- **Immuabilité historique :** Si le taux de commission d'une catégorie passe de 10% à 8%, les commandes passées conservent rigoureusement leur taux initial scellé dans `order_items.commission_rate`.
- **Statuts Comptables de la Commission :**
  1. `ESTIMATED` : Calculée au moment du panier / checkout.
  2. `PROVISIONAL` : Commande payée, en cours d'acheminement.
  3. `EARNED` (Exigible) : Commande clôturée avec succès (réception confirmée sans contestation).
  4. `PAID_OUT` (Reversée) : Montant effectivement transféré sur le compte Wave/Orange Money du vendeur.
  5. `ADJUSTED_REFUND` (Ajustée) : En cas de remboursement partiel ou total, une ligne d'écriture inverse est passée en comptabilité sans jamais effacer la ligne initiale.

### Logistique, Preuve de Livraison & Clôture

Pour éviter la fraude et les désaccords vendeur-client :
1. **Code OTP Sécurisé :** Lors de la livraison, un code à 4 chiffres généré par le système est envoyé au client par notification/SMS. Le livreur saisit ce code dans son application pour attester de la remise effective en mains propres.
2. **Mode Dégradé (Signature / Photo) :** Si le client n'a pas accès à son téléphone, le livreur téléverse une photo du bordereau signé et géolocalisé.
3. **Fenêtre de Réclamation :** Le client dispose de 48 heures ouvrées après déclaration de livraison pour contester ou signaler un produit non conforme. Passé ce délai, la commande passe automatiquement à `COMPLETED` et le solde vendeur est débloqué.

### Rôle & Périmètre de WhatsApp

- **Canal de Support & Marketing :** Bouton "Discuter sur WhatsApp" pré-remplissant la référence du produit ou de la commande.
- **Règle d'Or :** Une redirection vers WhatsApp n'est **JAMAIS** considérée comme une commande validée ni une vente conclue. Seul l'enregistrement dans la base de données Malick Buss et le webhook de confirmation de paiement (ou déclaration de livraison vérifiée) font foi.

### Règle de Validation des Ventes par WhatsApp et Vérification Client

En l'absence d'un paiement en ligne direct dans la première version, une demande d'achat depuis WhatsApp est considérée comme une **demande de commande ou une intention d'achat**, et non comme une vente validée.

Le flux métier recommandé est le suivant :

1. Le client clique sur "Acheter" ou "Payer".
2. La plateforme crée une commande avec statut **EN_ATTENTE_VALIDATION**.
3. Le vendeur, le super admin ou le service client reçoit la demande pour vérification.
4. Le service client peut appeler le client pour confirmer :
   - le paiement a bien été effectué ;
   - le pack / produit a bien été commandé ;
   - le client souhaite confirmer la commande.
5. Si la vente est confirmée, la commande passe en statut **CONFIRMEE**.
6. Une fois confirmée, la commission est calculée et la commande peut être traitée.
7. Si la vente n'est pas confirmée, la commande reste **EN_ATTENTE**, **REFUSEE** ou **ANNULEE** selon la règle métier définie.
8. Aucun remboursement, livraison, activation ou calcul de commission ne doit être effectué tant que la commande n'est pas validée.

#### Règle de gestion
- Un clic WhatsApp ne constitue pas une preuve de paiement.
- Un clic WhatsApp ne constitue pas une preuve de vente.
- La vente est validée uniquement après vérification humaine ou validation du vendeur/admin.
- La commission n'est calculée que sur les ventes confirmées.
- Si le stock ou l'abonnement est épuisé, la redirection vers WhatsApp est bloquée et la demande est refusée.

---

## 🏁 4.6 Règles de Lancement en Production & Validation Métier

Avant toute mise en ligne, la plateforme doit respecter les règles suivantes pour éviter les erreurs financières, les litiges et les paiements non justifiés :

### Règles obligatoires

1. **Une commande n’est valide qu’après confirmation de la vente**
   - Une demande WhatsApp, un message, un clic ou un screenshot ne constitue pas une preuve de vente.
   - La commande doit être créée dans la base Malick Buss et être confirmée par le vendeur, le service client ou l’admin selon le canal.
   - Aucune livraison, commission, paiement ou activation ne doit se faire avant validation.

2. **Aucun paiement ne doit être déclenché sans vérification métier**
   - Le paiement en ligne validé par webhook est la preuve technique.
   - Le paiement à la livraison reste soumis à confirmation de prise de commande et de livraison.
   - L’API ne doit pas accepter des statuts de paiement fournis par le frontend comme preuve de réussite.

3. **La commission est calculée uniquement sur une vente confirmée**
   - Commission estimée tant qu’il n’y a pas validation, puis commission acquise à la clôture de la commande.
   - Aucun retraits vendeur ne doit être autorisé tant que le solde n’est pas disponible et vérifié.
   - Les montants de commission seront toujours enregistrés dans un historique immuable, avec statut `ESTIMATED`, `PROVISIONAL`, `EARNED`, `PAID_OUT` au besoin.

4. **Le vendeur ne peut pas sortir des fonds tant que le capital n’est pas net**
   - Le solde disponible est calculé selon les gains validés, moins les demandes de retrait en attente.
   - La demande de retrait ne doit pas être autorisée si le montant est insuffisant ou si la vente est litigieuse.

5. **Le cycle de commande est contrôlé au serveur**
   - Les transitions de statut sont impérativement validées côté backend.
   - Le vendeur ne peut pas passer une commande d’un état non autorisé à un autre.
   - Les refus et annulations doivent inclure une raison et un historique d’audit.

6. **Audit et traçabilité obligatoires**
   - Chaque changement de statut, retrait, paiement, tentative de transaction et litige doit être enregistré.
   - Les demandes de paiement doivent pouvoir être retracées depuis le compte vendeur jusqu’au flux de paiement externe.

### Checklist de validation avant lancement

- [ ] Base de données PostgreSQL configurée et migrée
- [ ] Secrets JWT et fournisseur de paiement présents
- [ ] Règle “WhatsApp ≠ vente validée” documentée et appliquée
- [ ] Statuts de commande et donc commissions verrouillés côté backend
- [ ] Vérification de l’état vendeur pour les retraits activée
- [ ] Audit logs de paiement et de retrait activés
- [ ] Webhook de paiement vérifié et validé en environnement test
- [ ] Passage en production uniquement avec données réelles validées

### Point de vigilance majeur

Le plus grand risque métier de la plateforme n’est pas le code technique, c’est la logique de confiance : un client ou un vendeur peut envoyer un message WhatsApp, mais cela ne suffit pas à prouver qu’une vente existe. La plateforme doit donc rester stricte : aucune logique de commission, retrait, paiement ou livraison ne peut reposer sur la conversation seule.

---

## 🚀 5. Stack Technologique Recommandé

### Matrice de Décision & Justification

Pour garantir **performance maximale**, **coût d'infrastructure maîtrisé** et **adoption massive au Sénégal**, la stack technique recommandée est la suivante :

| Couche | Technologie Recommandée | Alternative Évaluée | Raison du Choix |
| :--- | :--- | :--- | :--- |
| **Frontend Client & Vendeur** | **Next.js 15 (App Router, PWA, Tailwind CSS, TypeScript)** | Flutter / React Native pur | Les clients sénégalais découvrent les produits via des liens WhatsApp/Instagram. Un site web mobile PWA instantané évite la friction d'un téléchargement de 60 Mo sur le Play Store, tout en offrant la fluidité d'une app native installable. |
| **Application Mobile (Option MVP+)** | **React Native avec Expo** | Flutter | Partage à 100% des types TypeScript, des schémas de validation (Zod) et des hooks d'API avec le frontend Next.js. |
| **Back-Office Super Admin** | **Next.js + Shadcn UI + TanStack Table** | Filament PHP / Strapi | Interface moderne, dense, réactive avec permissions RBAC granulaires, filtrage avancé des données et exports Excel natifs. |
| **Backend & API** | **Node.js (NestJS) + TypeScript** | Laravel 11 / Go | Architecture modulaire d'entreprise (DDD/Clean Architecture), validation stricte par DTO/Pipes, WebSocket natif pour le temps réel (suivi livreur, alertes commandes). |
| **Base de Données Principale** | **PostgreSQL 16** | MySQL / MongoDB | Conformité ACID indispensable pour les finances, support JSONB pour les variantes dynamiques de produits (tailles, couleurs, pointures), verrous pessimistes (`SELECT FOR UPDATE`) contre le sur-stockage. |
| **Cache & Queue Broker** | **Redis 7 + BullMQ** | RabbitMQ | Gestion ultrarapide des sessions, cache du catalogue, verrouillage éphémère du stock au panier, traitement asynchrone des notifications (SMS, WhatsApp, emails) et relances d'abandons de panier. |
| **Passerelle de Paiement** | **Agrégateur Sous-Régional (PayDunya / InTouch / CinetPay)** + API directes Wave / Orange Money | Stripe (inadapté au Sénégal) | Prise en charge native du paiement mobile money local avec confirmation instantanée par webhooks sécurisés HMAC. |
| **Stockage Fichiers / Photos** | **Cloudflare R2 (compatible S3) + Sharp** | AWS S3 | Zéro frais de bande passante sortante (*egress fees*), compression automatique en format WebP pour alléger les photos de friperie et de vêtements téléversées par les vendeurs. |
| **Messagerie & Alertes** | **WhatsApp Business Cloud API + Twilio / Orange SMS API** | Email seul | Taux d'ouverture de 95%+ sur WhatsApp et SMS au Sénégal, indispensable pour les codes OTP et les alertes de commandes. |

### Architecture Technique Globale

```mermaid
graph TB
    subgraph Clients["📱 Clients & Vendeurs"]
        PWA["Web Mobile PWA (Next.js 15)"]
        MobileApp["App Mobile (Expo / React Native)"]
        AdminDesk["Super Admin Dashboard"]
    end

    subgraph Gateway["🌐 Reverse Proxy & Sécurité"]
        Nginx["Nginx / Cloudflare (WAF, SSL, Rate Limiting)"]
    end

    subgraph BackendApp["⚡ Core Backend (NestJS Monorepo)"]
        API["API REST & GraphQL Engine"]
        WS["WebSocket Gateway (Suivi Livraisons & Alertes)"]
        Auth["Auth Service (JWT, OTP, RBAC)"]
        OrderEngine["Order & Commission Engine (Transactions ACID)"]
        PaymentWorker["Worker Webhooks Paiements (BullMQ)"]
    end

    subgraph DataTier["💾 Persistance & Cache"]
        PG[("PostgreSQL 16 (Données Métier & Audit Logs)")]
        RedisDB[("Redis 7 (Sessions, Cache & Files BullMQ)")]
        R2Storage[("Cloudflare R2 (Photos Produits & Preuves)")]
    end

    subgraph ExternalServices["🔌 Services Tiers"]
        WaveOM["Wave & Orange Money APIs"]
        WhatsAppAPI["Meta WhatsApp Business API"]
        SMSAPI["Orange SMS / Twilio API"]
    end

    PWA --> Nginx
    MobileApp --> Nginx
    AdminDesk --> Nginx
    Nginx --> API
    Nginx --> WS

    API --> Auth
    API --> OrderEngine
    API --> PG
    API --> RedisDB
    API --> R2Storage

    OrderEngine --> PaymentWorker
    PaymentWorker --> WaveOM
    PaymentWorker --> WhatsAppAPI
    PaymentWorker --> SMSAPI
```

---

## 🗄️ 6. Modèle de Données & Schéma Relationnel

Schéma relationnel PostgreSQL conçu pour garantir l'intégrité financière et le cloisonnement multi-boutiques :

```mermaid
erDiagram
    USERS ||--o{ SHOPS : owns
    USERS ||--o{ ORDERS : places
    USERS ||--o{ ADDRESSES : has
    SHOPS ||--o{ PRODUCTS : sells
    SHOPS ||--o{ SUB_ORDERS : receives
    SHOPS ||--o{ PAYOUT_REQUESTS : requests
    PRODUCTS ||--o{ PRODUCT_VARIANTS : has
    ORDERS ||--|{ SUB_ORDERS : splits_into
    SUB_ORDERS ||--|{ ORDER_ITEMS : contains
    PRODUCT_VARIANTS ||--o{ ORDER_ITEMS : referenced_in
    SUB_ORDERS ||--o{ DELIVERIES : fulfills
    SUB_ORDERS ||--o{ DISPUTES : subject_to
    SUB_ORDERS ||--o{ COMMISSION_LEDGER : generates

    USERS {
        uuid id PK
        string full_name
        string phone_number UK
        string email
        string password_hash
        enum role "CLIENT, VENDOR, ADMIN, COURIER"
        boolean is_active
        timestamp created_at
    }

    SHOPS {
        uuid id PK
        uuid owner_id FK
        string name
        string slug UK
        string description
        string logo_url
        string banner_url
        enum status "PENDING, ACTIVE, SUSPENDED, REJECTED"
        string wave_payout_number
        string om_payout_number
        jsonb delivery_zones_config
        timestamp created_at
    }

    PRODUCTS {
        uuid id PK
        uuid shop_id FK
        uuid category_id FK
        string title
        string slug
        text description
        decimal base_price
        decimal discount_price
        string condition "NEUF, TRES_BON_ETAT, BON_ETAT"
        boolean is_published
        timestamp created_at
    }

    ORDERS {
        uuid id PK
        uuid client_id FK
        uuid shipping_address_id FK
        string order_number UK
        decimal grand_total
        enum payment_method "WAVE, ORANGE_MONEY, CASH_ON_DELIVERY"
        enum payment_status "PENDING, PAID, FAILED, REFUNDED"
        string payment_reference
        timestamp created_at
    }

    SUB_ORDERS {
        uuid id PK
        uuid order_id FK
        uuid shop_id FK
        string sub_order_number UK
        decimal subtotal_items
        decimal shipping_fee
        decimal total_amount
        decimal commission_rate_applied
        decimal commission_amount
        decimal vendor_net_earning
        enum status "PENDING, ACCEPTED, PREPARING, SHIPPED, DELIVERED, COMPLETED, CANCELLED"
        timestamp created_at
    }

    ORDER_ITEMS {
        uuid id PK
        uuid sub_order_id FK
        uuid product_variant_id FK
        string product_title_snapshot
        decimal unit_price_snapshot
        int quantity
        decimal total_line_price
    }

    COMMISSION_LEDGER {
        uuid id PK
        uuid sub_order_id FK
        uuid shop_id FK
        decimal base_amount
        decimal rate
        decimal commission_amount
        enum status "ESTIMATED, PROVISIONAL, EARNED, PAID_OUT, ADJUSTED"
        timestamp effective_date
    }
```

---

## 📂 7. Structure Complète du Projet

Le projet est structuré de façon modulaire et cloisonnée, sans aucun code superflu pour l'instant :

```
malick-221/
├── frontend/                      # Application Web Mobile-First (Client & Vendeur)
│   ├── public/                    # Assets statiques, manifest PWA, logos, icons
│   └── src/
│       ├── app/
│       │   ├── (auth)/            # Inscription, Connexion, OTP, Récupération
│       │   ├── (client)/          # Accueil, Catégories, Boutiques, Produits, Panier, Checkout, Suivi
│       │   └── (vendeur)/         # Dashboard, Produits, Commandes, Stocks, Commissions, Retraits
│       ├── components/            # Composants UI (Client, Vendeur, Layout, UI base)
│       ├── hooks/                 # Hooks React personnalisés
│       ├── services/              # Consommation API client
│       ├── stores/                # Gestion d'état (Panier, Auth, Préférences)
│       ├── types/                 # Types TypeScript frontend
│       └── utils/                 # Fonctions utilitaires
│
├── back-office/                   # Super Administration (Plateforme & Finance)
│   ├── public/
│   └── src/
│       ├── app/
│       │   ├── dashboard/         # Vue d'ensemble, métriques globales
│       │   ├── boutiques/         # Validation KYC, gestion des marchands
│       │   ├── catalogue/         # Modération des articles, gestion des catégories
│       │   ├── commissions/       # Grille tarifaire versionnée, historique
│       │   ├── finances/          # Demandes de retraits, rapprochement Wave/OM
│       │   ├── commandes/         # Supervision des commandes et sous-commandes
│       │   ├── litiges-remboursements/ # Arbitrage des réclamations
│       │   ├── utilisateurs/      # Comptes et rôles
│       │   └── parametres/        # Configuration globale de la marketplace
│       ├── components/            # Composants graphiques, tables et formulaires
│       ├── hooks/
│       ├── services/
│       └── types/
│
├── backend/                       # Core API & Moteur Métier (NestJS)
│   └── src/
│       ├── modules/
│       │   ├── auth/              # Authentification (JWT, Refresh, OTP)
│       │   ├── users/             # Utilisateurs et profils
│       │   ├── shops/             # Boutiques et gestion KYC
│       │   ├── products/          # Catalogue, variantes et photos
│       │   ├── categories/        # Arborescence des catégories
│       │   ├── cart/              # Logique panier et réservations
│       │   ├── orders/            # Commandes globales
│       │   ├── sub-orders/        # Sous-commandes par boutique
│       │   ├── payments/          # Passerelles Wave, Orange Money, Cash on Delivery
│       │   ├── commissions/       # Moteur de calcul, snapshot & ledger
│       │   ├── deliveries/        # Suivi livraison, coursiers, code OTP
│       │   ├── disputes/          # Réclamations et retours
│       │   ├── notifications/     # WhatsApp Business, SMS, Push
│       │   └── audit-logs/        # Journalisation d'audit immuable
│       ├── common/                # Décorateurs, filtres, guards, interceptors, pipes
│       ├── config/                # Configuration centralisée des environnements
│       ├── database/              # Migrations SQL & seeds initiaux
│       └── jobs/                  # Files d'attente asynchrones (BullMQ / Redis)
│
├── shared/                        # Contrats et définitions partagés
│   ├── constants/                 # Devises (FCFA), limites, configurations
│   ├── enums/                     # Statuts de commandes, rôles, modes de paiement
│   ├── types/                     # Types TypeScript transversaux
│   └── validators/                # Schémas de validation communs (Zod)
│
├── infra/                         # Déploiement et conteneurisation
│   └── docker/
│       ├── nginx/                 # Configuration reverse proxy & SSL
│       └── postgres/              # Scripts d'initialisation PostgreSQL
│
├── README.md                      # Documentation officielle du projet
└── ... (Cahiers des charges et maquettes)
```

---

## 🛠️ 8. Guide de Démarrage & Installation Rapide

### Prérequis

- **Node.js :** Version 20.x LTS ou supérieure
- **PNPM :** Version 9.x recommandée (`npm install -g pnpm`)
- **Docker & Docker Compose :** Pour la base PostgreSQL et l'instance Redis
- **Git**

### Étapes d'Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-compte/malick-buss.git
cd malick-buss

# 2. Installer l'ensemble des dépendances (Monorepo)
pnpm install

# 3. Démarrer les services d'infrastructure (PostgreSQL 16 & Redis 7)
docker-compose up -d postgres redis

# 4. Configurer les variables d'environnement
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/admin/.env.example apps/admin/.env

# 5. Exécuter les migrations de base de données et initialiser les données de test (Seeding)
pnpm db:migrate
pnpm db:seed

# 6. Lancer l'environnement de développement complet en parallèle
pnpm dev
```

### URLs Locales par Défaut

- **Boutique Web Mobile / Client :** `http://localhost:3000`
- **Dashboard Boutiquier :** `http://localhost:3000/vendeur`
- **Back-Office Super Admin :** `http://localhost:3001`
- **API Swagger Documentation :** `http://localhost:4000/docs`

---

## 🔐 9. Variables d'Environnement (.env.example)

### Backend API (`apps/api/.env`)

```ini
# Application
NODE_ENV=development
PORT=4000
APP_URL=http://localhost:4000
FRONTEND_CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001

# Base de Données & Cache
DATABASE_URL="postgresql://postgres:password@localhost:5432/malick_buss_db?schema=public"
REDIS_URL="redis://localhost:6379"

# Sécurité & Tokens
JWT_ACCESS_SECRET="votre_secret_jwt_tres_securise_256_bits"
JWT_REFRESH_SECRET="votre_secret_refresh_jwt_tres_securise"
JWT_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"

# Configuration Financière
DEFAULT_CURRENCY="XOF"
DEFAULT_COMMISSION_PERCENTAGE=10.0
AUTO_CLOSE_ORDER_HOURS=48

# Passerelles de Paiement Sénégal
WAVE_API_KEY="wave_live_secret_key"
WAVE_WEBHOOK_SECRET="whsec_wave_signature"
ORANGE_MONEY_CLIENT_ID="om_client_id"
ORANGE_MONEY_CLIENT_SECRET="om_client_secret"
ORANGE_MONEY_MERCHANT_KEY="om_merchant_key"

# Téléphonie & Notifications
SMS_PROVIDER="orange" # ou twilio
ORANGE_SMS_CLIENT_ID="your_orange_sms_id"
ORANGE_SMS_CLIENT_SECRET="your_orange_sms_secret"
WHATSAPP_CLOUD_API_TOKEN="meta_whatsapp_token"
WHATSAPP_PHONE_NUMBER_ID="meta_phone_number_id"

# Stockage Médias (Cloudflare R2 / AWS S3)
STORAGE_PROVIDER="s3"
S3_ENDPOINT="https://<account_id>.r2.cloudflarestorage.com"
S3_ACCESS_KEY_ID="r2_access_key"
S3_SECRET_ACCESS_KEY="r2_secret_key"
S3_BUCKET_NAME="malick-buss-assets"
S3_PUBLIC_DOMAIN="https://cdn.malickbuss.sn"
```

---

## 🛡️ 10. Sécurité, Audit & Conformité

1. **Validation Stricte Côté Serveur :** Tout calcul de montant, quantité, remise, frais de port et commission est exécuté et vérifié exclusivement par l'API backend. Aucune donnée financière envoyée par le frontend n'est considérée comme digne de confiance.
2. **Idempotence des Paiements & Webhooks :**
   - Chaque webhook de paiement possède un identifiant de transaction unique (`transaction_id`).
   - L'API vérifie la signature HMAC avant traitement.
   - En cas d'envois multiples par l'opérateur (Wave/Orange Money), la commande n'est créditée qu'une seule fois grâce à une table de verrou d'idempotence.
3. **Traçabilité & Journal d'Audit :**
   - Toute modification de stock, changement de prix, modification de règle de commission, bannissement de boutique ou validation de retrait est journalisée dans la table `audit_logs` avec l'empreinte de l'utilisateur, l'adresse IP et la date exacte.
4. **Protection Anti-Abus & Rate-Limiting :**
   - Protection contre le spam de SMS OTP (limité à 3 tentatives par numéro de téléphone toutes les 15 minutes).
   - Verrouillage automatique des comptes après 5 tentatives infructueuses de connexion.

---

## 📅 11. Roadmap & Plan de Recette MVP

```mermaid
gantt
    title Planning de Déploiement Malick Buss
    dateFormat  YYYY-MM-DD
    section Phase 1 : Cœur Métier & MVP
    Architecture, BDD & Auth OTP        :active, 2026-11-01, 15d
    Catalogue, Boutiques & Stocks       :2026-11-16, 20d
    Panier Multi-Boutiques & Checkout   :2026-12-06, 15d
    Paiement Wave/OM & Cash on Delivery :2026-12-21, 15d
    Dashboard Vendeur & Traitement Cdes :2027-01-05, 20d
    section Phase 2 : Validation & Tests
    Recette Scénarios A à J (UAT)       :2027-01-25, 15d
    Phase Pilote à Dakar (15 boutiques) :2027-02-10, 30d
    section Phase 3 : Scale & Croissance
    App Mobile Native Expo (Android/iOS):2027-03-12, 30d
    Système de fidélité & Parrainage    :2027-04-12, 20d
```

### 10 Scénarios de Recette Incontournables (Tests UAT)

- [ ] **Test A (Achat Nominal) :** Ajout au panier, paiement Wave réussi, acceptation par le vendeur, remise coursier, saisie code OTP par le client, commission créditée.
- [ ] **Test B (Panier Multi-Vendeurs) :** Articles de deux boutiques différentes, génération de deux sous-commandes indépendantes avec leurs propres frais de livraison, étanchéité totale des dashboards vendeurs.
- [ ] **Test C (Paiement à la Livraison - COD) :** Commande sans paiement en ligne, acceptation vendeur, encaissement par le livreur, validation et calcul de la commission due par le vendeur à la plateforme.
- [ ] **Test D (Refus Vendeur / Rupture de Stock) :** Sous-commande refusée par un boutiquier, déclenchement du remboursement automatique côté client et réintégration de l'état sans affecter les autres boutiques.
- [ ] **Test E (Litige & Remboursement Partiel) :** Réclamation client sur un article non conforme, validation par l'administrateur, écriture d'ajustement comptable de la commission sans écraser l'historique.
- [ ] **Test F (Évolution de la Grille Tarifaire) :** Modification du taux de commission en admin, vérification que les commandes antérieures conservent rigoureusement leur taux historique scellé.
- [ ] **Test G (Concurrence de Stock) :** Deux clients achetant le dernier article disponible à la même seconde, verrouillage pessimiste SQL évitant tout sur-stockage (*overselling*).
- [ ] **Test H (Double-Clic Checkout) :** Protection par token d'idempotence empêchant la création de deux commandes en double.
- [ ] **Test I (Redirection WhatsApp) :** Génération correcte du message pré-formaté avec slug de boutique et ID produit, sans aucun impact sur les stocks ni les statistiques de vente.
- [ ] **Test J (Retrait des Vendeurs) :** Demande de virement du solde disponible vers Wave, validation administrative, déduction du solde et réconciliation du virement.

---

## CI/CD et architecture de déploiement

Le pipeline GitHub Actions déploie le monorepo sur deux environnements Render isolés :

- les pull requests exécutent build, tests backend, audit npm, CodeQL et SonarCloud lorsque configuré ;
- chaque push validé sur `develop` déploie les trois services staging, applique les migrations sur la base staging, puis vérifie la santé HTTP ;
- `main` déploie automatiquement seulement si les contrôles requis passent et si le même arbre Git a déjà été déployé et vérifié en staging.

Les services, le flux de promotion, les variables/secrets nécessaires, les migrations et les limites opérationnelles sont décrits dans [le guide CI/CD Render](./docs/deployment/cicd-render.md).  
Pour l'analyse de qualité de code, les métriques SAST et la configuration du Quality Gate, consultez [le guide SonarQube & Qualité](./docs/sonarqube-guide.md). Aucune ressource cloud ni secret n’est créé par les fichiers du dépôt.

## 📄 Licence & Droits

Projet propriétaire développé pour **Malick Buss Sénégal**. Tous droits réservés © 2026.
Toute reproduction, copie ou diffusion sans accord écrit préalable de la direction de Malick Buss est strictement interdite.
