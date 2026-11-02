# Guide de Déploiement : Backend sur Render & Frontend sur Vercel

Ce guide détaille la mise en production hybride recommandée pour **Malick Buss** :
- **Backend API & Base de données** hébergés sur **Render** (Node.js/NestJS, PostgreSQL 16, Redis).
- **Frontends Next.js 14** (Vitrine clients/vendeurs et Back-Office Super Admin) hébergés sur **Vercel** (Edge CDN mondial, optimisation automatique des images, preview branches).

---

## 1. Ce qui est déjà prêt dans le Code

1. **CORS Dynamique & Vercel** ([backend/src/main.ts](file:///home/pmt/Documents/malick-221/backend/src/main.ts#L18-L45)) :
   - Le backend autorise nativement tous les sous-domaines `*.vercel.app` (déploiements de preview et production).
   - Possibilité de spécifier des domaines personnalisés via la variable `CORS_ORIGINS`.

2. **Sondes de Santé HTTP** ([backend/src/api/health/health.controller.ts](file:///home/pmt/Documents/malick-221/backend/src/api/health/health.controller.ts)) :
   - `/health/live` : Vérification du runtime NestJS.
   - `/health/ready` : Vérification de la connexion active avec PostgreSQL (`SELECT 1`).

3. **Migrations Automatiques** :
   - Commande preDeploy configurée : `npx prisma migrate deploy --schema backend/prisma/schema.prisma`.

4. **Fichiers de configuration Vercel** :
   - `frontend/vercel.json` et `back-office/vercel.json` configurés avec le schéma Next.js.

---

## 2. Étape 1 : Déploiement du Backend sur Render

### A. Créer la Base de Données PostgreSQL
1. Sur votre tableau de bord [dashboard.render.com](https://dashboard.render.com), cliquez sur **New + > PostgreSQL**.
2. Nom : `malick-buss-db`.
3. Database : `malick_buss_db`, User : `malick_admin`.
4. Region : `Frankfurt (EU Central)` (latence optimale pour le Sénégal).
5. Copiez la valeur de l'**Internal Database URL** (pour les services Render) et **External Database URL** (pour vos migrations locales).

### B. Créer le Service Web Backend API
1. Cliquez sur **New + > Web Service**.
2. Connectez votre dépôt GitHub `malick-221`.
3. Paramètres de configuration :
   - **Name** : `malick-buss-api`
   - **Region** : `Frankfurt`
   - **Branch** : `main` (ou `develop` pour staging)
   - **Root Directory** : `.` (racine du dépôt)
   - **Runtime** : `Node`
   - **Build Command** :
     ```bash
     npm ci --include=dev && npm run build:shared && npm run prisma:generate --workspace=backend && npm run build:backend
     ```
   - **Pre-deploy Command** :
     ```bash
     npx prisma migrate deploy --schema backend/prisma/schema.prisma
     ```
   - **Start Command** :
     ```bash
     npm run start:prod --workspace=backend
     ```
   - **Health Check Path** : `/health/ready`

4. Variables d'Environnement obligatoires à renseigner sur Render :
   | Clé | Valeur Recommandée |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `DATABASE_URL` | `<Internal Database URL de Render>` |
   | `JWT_ACCESS_SECRET` | *(Chaîne aléatoire de 32+ caractères)* |
   | `JWT_REFRESH_SECRET` | *(Chaîne aléatoire de 32+ caractères)* |
   | `CORS_ORIGINS` | `https://*.vercel.app,https://malickbuss.sn,https://admin.malickbuss.sn` |
   | `CLOUDINARY_CLOUD_NAME` | `<Votre Cloud Name>` |
   | `CLOUDINARY_API_KEY` | `<Votre API Key>` |
   | `CLOUDINARY_API_SECRET` | `<Votre API Secret>` |
   | `DEFAULT_COMMISSION_PERCENTAGE` | `10` |
   | `DEFAULT_SHIPPING_FEE_PER_SHOP` | `3000` |

---

## 3. Étape 2 : Déploiement des Frontends sur Vercel

Sur Vercel, nous déployons deux projets indépendants à partir du même dépôt GitHub :

### Projet A : Vitrine Clients & Vendeurs (`malick-buss-storefront`)
1. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt GitHub `malick-221`.
2. Configurez le projet :
   - **Project Name** : `malick-buss-frontend`
   - **Framework Preset** : `Next.js`
   - **Root Directory** : Cliquez sur *Edit* et sélectionnez **`frontend`**.
   - Cochez : *Include source files outside of the Root Directory in the Build Step*.
   - Déroulez **Build and Output Settings** :
     - Activez l'option *Override* pour **Build Command** :
       ```bash
       cd .. && npm run build:shared && cd frontend && npm run build
       ```
     - Activez l'option *Override* pour **Install Command** :
       ```bash
       cd .. && npm install
       ```
3. Déroulez **Environment Variables** :
   - `NEXT_PUBLIC_API_URL` = `https://<votre-api-render>.onrender.com` (ou votre domaine personnalisé `https://api.malickbuss.sn`).
4. Cliquez sur **Deploy**.

---

### Projet B : Console Super Admin (`malick-buss-admin`)
1. Sur Vercel, cliquez sur **Add New... > Project** et sélectionnez à nouveau le dépôt `malick-221`.
2. Configurez le projet :
   - **Project Name** : `malick-buss-back-office`
   - **Framework Preset** : `Next.js`
   - **Root Directory** : Cliquez sur *Edit* et sélectionnez **`back-office`**.
   - Cochez : *Include source files outside of the Root Directory in the Build Step*.
   - Déroulez **Build and Output Settings** :
     - Activez l'option *Override* pour **Build Command** :
       ```bash
       cd .. && npm run build:shared && cd back-office && npm run build
       ```
     - Activez l'option *Override* pour **Install Command** :
       ```bash
       cd .. && npm install
       ```
3. Déroulez **Environment Variables** :
   - `NEXT_PUBLIC_API_URL` = `https://<votre-api-render>.onrender.com`.
4. Cliquez sur **Deploy**.

---

## 4. Vérification Post-Déploiement

1. **Test Backend** :
   Ouvrez `https://<votre-api-render>.onrender.com/health/ready` ➔ Doit renvoyer `{"status":"ok","database":"ok"}`.
2. **Test Swagger** :
   Ouvrez `https://<votre-api-render>.onrender.com/docs` ➔ La documentation OpenAPI s'affiche.
3. **Test Vitrine Vercel** :
   Ouvrez `https://<votre-front-vercel>.vercel.app/` ➔ Le catalogue et les boutiques chargent correctement sans erreur CORS.
