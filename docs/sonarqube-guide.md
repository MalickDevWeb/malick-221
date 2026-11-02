# Guide d'Intégration SonarQube & Déploiement Continu (CI/CD)

Ce guide détaille la mise en place, la configuration et l'utilisation de **SonarQube** (ou **SonarCloud**) pour l'analyse de qualité de code, la sécurité statique (SAST), la couverture de tests et le déploiement continu sur **Malick Buss**.

---

## 1. Vue d'Ensemble & Fonctionnement

```
[ Développeur ]
      │
      ▼ (git push / Pull Request)
[ GitHub Actions CI/CD ]
      │
      ├─► 1. Build & Test (npm run build:*, npm test)
      ├─► 2. Sécurité des dépendances (npm audit, CodeQL)
      │
      ▼
[ Analyse SonarQube / SonarCloud ]
  - Analyse statique (Bugs, Vulnérabilités, Code Smells, Duplications)
  - Analyse de la couverture de tests (LCOV backend)
  - Évaluation du Quality Gate (Porte de Qualité)
      │
      ├─► ❌ Quality Gate Échoué : Blocage immédiat du pipeline et du déploiement
      │
      └─► ✅ Quality Gate Validé : Autorisation du déploiement
            │
            ├─► Branche `develop` ──► Déploiement Staging (Render)
            └─► Branche `main`    ──► Déploiement Production (Render)
```

---

## 2. Configuration Déjà en Place dans le Projet

1. **`sonar-project.properties`** (à la racine du monorepo) :
   - `sonar.projectKey=malick-buss`
   - Analyse des répertoires `backend/src`, `frontend/src`, `back-office/src`, `shared/src`
   - Détection des tests dans `backend/test`
   - Exclusion automatique des artefacts de build (`.next`, `dist`, `coverage`, `node_modules`, `migrations`)
   - Importation du rapport de couverture LCOV (`backend/coverage/lcov.info`).

2. **`.github/workflows/ci-cd.yml`** :
   - Job SonarCloud exécuté sur les pushes et les pull requests internes vers `develop` et `main` (les PR issues de forks sont exclues car elles ne reçoivent pas les secrets GitHub).
   - Génération préalable de la couverture de tests avec Node 20.
   - Vérification obligatoire des variables `SONAR_ORGANIZATION`, `SONAR_PROJECT_KEY` et du secret `SONAR_TOKEN`.
   - Attente synchrone du Quality Gate (`-Dsonar.qualitygate.wait=true`); les déploiements staging et production sont bloqués sans résultat réussi.

3. **`docker-compose.sonar.yml`** :
   - Stack Docker prête à l'emploi avec conteneur `sonarqube:community` et base dédiée PostgreSQL 16.

---

## 3. Choix du Mode d'Utilisation

### Option A : SonarCloud (Recommandé pour GitHub)

SonarCloud est la version SaaS gérée de SonarQube, directement intégrée à GitHub.

1. Connectez-vous sur [sonarcloud.io](https://sonarcloud.io) avec votre compte GitHub.
2. Cliquez sur **+ > Analyze new project** et sélectionnez le dépôt `malick-221`.
3. Récupérez votre **Token** dans *Mon Compte > Sécurité > Générer un jeton*.
4. Sur GitHub, dans votre dépôt :
   - Allez dans **Settings > Secrets and variables > Actions > Secrets**.
   - Ajoutez le secret :
     - `SONAR_TOKEN` : `<votre-token-sonarcloud>`
   - Allez dans **Settings > Secrets and variables > Actions > Variables**.
     - `SONAR_ORGANIZATION` : `<votre-organisation-sonarcloud>`
     - `SONAR_PROJECT_KEY` : `<votre-cle-projet>` (ex: `malick-buss`)

---

### Option B : SonarQube Server en Local (via Docker)

Pour tester la qualité de votre code sur votre machine avant de pousser sur GitHub :

#### 1. Démarrer SonarQube
```bash
npm run sonar:up
```
*(ou `docker compose -f docker-compose.sonar.yml up -d`)*

#### 2. Accéder à l'interface
- Ouvrez votre navigateur sur : **`http://localhost:9000`**
- Identifiants par défaut :
  - **Login** : `admin`
  - **Mot de passe** : `admin` (il vous sera demandé de le changer à la première connexion).

#### 3. Créer le projet local
1. Cliquez sur **Create Project > Manually**.
2. Nom du projet : `malick-buss`, Clé du projet : `malick-buss`.
3. Cliquez sur **Locally**, puis générez un token (ex: `sqp_local_token`).

#### 4. Lancer une analyse manuelle
Pour exécuter le scanner en local sur votre machine avec Docker :
```bash
# 1. Générer le rapport de couverture backend
npm run test:coverage

# 2. Lancer l'analyse via le conteneur sonar-scanner
docker run --rm \
  --network host \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=<VOTRE_TOKEN_LOCAL>
```

#### 5. Arrêter le serveur local
```bash
npm run sonar:down
```

---

### Option C : SonarQube Auto-Hébergé (Serveur VPS / Cloud)

Si vous hébergez votre propre instance SonarQube (sur VPS Debian/Ubuntu, AWS EC2 ou Kubernetes) :
1. Configurez votre nom de domaine sécurisé (ex: `https://sonar.malickbuss.sn`).
2. Dans GitHub **Settings > Secrets and variables > Actions** :
   - **Secret** : `SONAR_TOKEN` = `<token-du-bot-ci>`
   - **Variable** : `SONAR_HOST_URL` = `https://sonar.malickbuss.sn`
   - **Variable** : `SONAR_PROJECT_KEY` = `malick-buss`

---

## 4. Règles du Quality Gate & Déploiement Continu

Le Quality Gate définit les conditions minimales pour autoriser une mise en production :

| Métrique | Seuil Recommandé | Action en cas de non-respect |
| :--- | :---: | :--- |
| **Nouvelles Vulnérabilités (Security)** | **0** | Blocage immédiat du déploiement |
| **Nouveaux Bugs (Reliability)** | **0** | Blocage immédiat du déploiement |
| **Nouveaux Hotspots de Sécurité** | **100% audités** | Blocage immédiat du déploiement |
| **Dette technique (Maintainability)** | **Grade A (< 5%)** | Alerte / Blocage selon paramétrage |
| **Couverture de code sur le nouveau code** | **>= 80%** | Rejet de la Pull Request |
| **Code dupliqué sur le nouveau code** | **< 3%** | Rejet de la Pull Request |

---

## 5. Résumé des Commandes Utiles

| Commande | Action |
| :--- | :--- |
| `npm run test:coverage` | Exécute les tests unitaires et génère le fichier `lcov.info` |
| `npm run sonar:up` | Démarre SonarQube et sa base PostgreSQL locale |
| `npm run sonar:logs` | Affiche les logs en direct du conteneur SonarQube |
| `npm run sonar:down` | Arrête la stack SonarQube locale |
