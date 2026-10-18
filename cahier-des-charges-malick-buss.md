# Cahier des charges fonctionnel - Malick Buss

## 1. Objet du projet

Malick Buss est une marketplace multi-boutiques, mobile-first, destinée à un marché de départ au Sénégal. La plateforme permet à plusieurs vendeurs de disposer d’une boutique dans un même écosystème, avec une logique de vente et de commission claire : une commande validée donne lieu à une commission calculée et traçable.

Le produit doit permettre à :
- un client de découvrir, comparer, commander et suivre ses achats ;
- un vendeur de gérer sa boutique, son catalogue, ses commandes, ses commissions et ses retraits ;
- un administrateur de superviser les boutiques, les produits, les frais, les règlements et les litiges ;
- le support/finance d’assurer le suivi administratif et la résolution des demandes.

## 2. Vision du produit

### 2.1. Principe de base
La plateforme repose sur quatre principes non négociables :
1. Une commande, une livraison, un paiement et une commission sont des éléments distincts et traçables.
2. Le navigateur ne doit jamais être la source de vérité pour les prix, les stocks, les paiements ou les commissions.
3. WhatsApp peut servir de canal de communication ou de redirection, mais ne constitue pas une preuve automatique de paiement ou de vente.
4. La commission ne doit être calculée qu’à partir d’une vente réellement validée sur la plateforme.

### 2.2. Monétisation
- La plateforme génère des revenus via une commission sur chaque vente validée.
- Le taux de commission est configurable par l’administrateur.
- La commission doit pouvoir être calculée selon une règle stable et traçable.

### 2.3. Contexte technique attendu
- Canal principal : mobile-first, compatible avec mobile web et navigateur adaptatif.
- Devise : FCFA.
- Langue principale de l’interface : français.
- Exigence de sécurité : les autorisations doivent être vérifiées côté serveur pour chaque action sensible.

---

## 3. Acteurs et rôles

### 3.1. Visiteur
- Peut consulter l’accueil public.
- Peut naviguer dans les boutiques, catégories et produits publics.
- Peut démarrer l’inscription.
- N’a pas accès aux données privées ni aux achats d’autres utilisateurs.

### 3.2. Client
- Peut chercher, parcourir et filtrer les produits.
- Peut ouvrir une boutique, consulter les offres et les promotions.
- Peut ajouter des produits au panier.
- Peut passer commande et suivre l’état de livraison.
- Peut gérer son compte, ses adresses, ses moyens de paiement masqués, ses favoris et ses commandes.
- Peut demander l’annulation, le retour, le remboursement ou l’assistance dans les cas prévus.

### 3.3. Vendeur / Propriétaire de boutique
- Crée et gère sa boutique.
- Publie, ajuste et archive des produits.
- Gère le stock et la disponibilité.
- Traite les commandes, leurs statuts et leurs livraisons.
- Suit ses ventes et ses commissions.
- Gère ses transactions de retrait.
- Peut affecter des collaborateurs avec permissions limitées si cette option est activée.

### 3.4. Collaborateur vendeur
- Accès limité selon les permissions assignées.
- Peut intervenir sur un périmètre spécifique : catalogue, commandes, support client, stock, etc.
- Ne doit pas accéder aux informations sensibles au-delà de son périmètre.

### 3.5. Administrateur plateforme
- Valide les boutiques.
- Modère les produits et les comptes.
- Définit ou configure les commissions et règles de gestion.
- Gère les litiges et les remontées de signalements.
- Peut suspendre, rejeter, modifier ou verrouiller des éléments selon les règles métier.

### 3.6. Finance / Support
- Suit les paiements, retraits et incidents.
- Vérifie les demandes de remboursement ou de litige.
- Toutes ses actions doivent être auditées.

### 3.7. Prestataire externe
- Paiement et livraison peuvent être gérés par des prestataires externes.
- Les statuts doivent être transmis via intégration sécurisée ou via traitement manuel documenté.

---

## 4. Périmètre fonctionnel

### 4.1. Enjeux principaux
Le produit couvre les parcours suivants :
- accueil public ;
- recherche et navigation ;
- boutiques et catégories ;
- fiches produits ;
- panier et commande multi-boutiques ;
- paiement ;
- livraison ;
- suivi de commande ;
- historique client ;
- gestion de boutique ;
- gestion catalogue ;
- gestion commandes ;
- gestion stock ;
- gestion commissions ;
- gestion retraits ;
- avis, litiges, notifications et support ;
- administration plateforme.

### 4.2. Règle de ventilation multi-boutiques
Le panier peut contenir des produits issus de plusieurs boutiques, mais chaque commande doit être ventilée par vendeur afin de permettre :
- une expédition séparée ;
- un statut de commande par vendeur ;
- une commission par vente validée ;
- un traitement distinct des litiges, retours et remboursements.

---

## 5. Règles métiers transverses

### 5.1. Sécurité et autorisations
- Les autorisations doivent être contrôlées côté serveur.
- Masquer un bouton dans l’UI ne doit pas être considéré comme une sécurité.
- Chaque action sensible doit être associée à un rôle ou à une permission explicite.

### 5.2. Données financières et opérationnelles
- Les prix, stocks, paiements, commissions et soldes doivent être calculés côté serveur.
- Le navigateur ne peut pas déterminer ces valeurs de manière définitive.
- Toute opération financière ou de stock doit être traçable.
- Les corrections doivent passer par des écritures compensatrices, jamais par suppression silencieuse.

### 5.3. État des objets
Les états métier suivants doivent être formalisés et documentés dans le code et la base de données :

#### Compte
- brouillon
- vérification
- actif
- limité
- suspendu
- fermé

#### Boutique
- brouillon
- soumise
- en vérification
- approuvée
- active
- refusée
- suspendue

#### Produit
- brouillon
- soumis
- en revue
- actif
- rejeté
- masqué
- épuisé
- archivé

#### Commande
- créée
- paiement en attente
- confirmée
- en préparation
- expédiée
- livrée
- refusée
- annulée
- retour
- remboursement
- litige

#### Commission
- estimée
- acquise
- payable
- payée
- bloquée
- ajustée
- inversée

#### Retrait
- brouillon
- soumis
- vérification
- approuvé
- en traitement
- payé
- rejeté
- échoué
- annulé

---

## 6. Exigences fonctionnelles détaillées

## 6.1. Espace public

### 6.1.1. Accueil
Le site doit proposer une page d’accueil comprenant :
- présentation de la plateforme ;
- catégories et boutiques phares ;
- suggestions de produits ;
- promotions et campagnes ;
- CTA d’inscription et d’ouverture de boutique ;
- accès rapide vers recherche et catégories.

### 6.1.2. Recherche et navigation
- Recherche par mot-clé, catégorie et boutique.
- Filtres par prix, disponibilité, note, catégorie, promotion, localité ou attributs du produit selon les exigences commerce.
- Affichage de résultats avec image, nom, prix, note, boutique et disponibilité.

### 6.1.3. Catégories et boutiques
- Affichage des catégories principales et sous-catégories.
- Affichage des fiches boutiques avec description, coordonnées, produits phares et note.
- Possibilité d’ouvrir une boutique depuis la plateforme.

---

## 6.2. Espace client

### 6.2.1. Inscription et connexion
Le client doit pouvoir :
- créer un compte avec informations minimales ;
- valider son identité ou ses coordonnées selon les règles de sécurité ;
- se connecter avec des identifiants sécurisés ;
- récupérer son mot de passe ;
- gérer les préférences de compte.

### 6.2.2. Catalogue produit
Le client doit pouvoir :
- consulter la fiche produit ;
- voir les images, description, prix, stock, caractéristiques et boutique vendeuse ;
- comparer plusieurs produits si le besoin existe ;
- vérifier l’état de disponibilité ;
- ajouter un produit au panier.

### 6.2.3. Panier
Le panier doit permettre :
- ajouter plusieurs produits de différentes boutiques ;
- modifier quantités ;
- calculer les sous-totaux, frais de livraison, remises et total ;
- retirer un article ;
- conserver les prix confirmés par le serveur ;
- éviter les manipulations du navigateur pour modifier les montants.

### 6.2.4. Livraison et adresse
Le client doit pouvoir :
- enregistrer plusieurs adresses ;
- choisir une adresse de livraison ;
- sélectionner les zones et options de livraison disponibles ;
- consulter les frais applicables ;
- confirmer le mode de livraison, selon les zones validées par la plateforme.

### 6.2.5. Paiement
Le système doit permettre :
- préparation d’une commande avec validation des données ;
- affichage des moyens de paiement disponibles ;
- séparation des paiements par vendeur quand nécessaire ;
- confirmation de paiement uniquement après validation côté serveur ;
- gestion des cas d’échec, d’annulation et de paiement en attente.

### 6.2.6. Confirmation de commande
Après validation :
- la commande doit être créée dans le système ;
- un identifiant unique et traçable doit être attribué ;
- le client reçoit une confirmation visible ;
- le vendeur et l’admin reçoivent une notification correspondant à l’événement.

### 6.2.7. Suivi de commande
Le client doit pouvoir voir :
- statut global de la commande ;
- statut par vendeur si commande multi-boutiques ;
- historique des étapes de traitement ;
- informations de livraison ;
- dates estimées et anomalies si applicable.

### 6.2.8. Historique et compte client
Le client doit pouvoir consulter :
- ses commandes passées ;
- ses paiements et confirmés ;
- ses retours et remboursements ;
- ses avis ;
- ses notifications ;
- ses favoris et ses adresses.

### 6.2.9. Annulation, retour et litige
Le client doit pouvoir demander :
- annulation avant validation ou selon les règles métier ;
- retour de produit selon les conditions de la plateforme ;
- remboursement partiel ou total selon les règles de retour ;
- assistance liée à une commande ou à un produit.

### 6.2.10. Avis et évaluation
Le client doit pouvoir :
- noter un produit ou une boutique selon les règles du produit ;
- laisser un avis textuel ;
- consulter les avis existants ;
- signaler un avis abusif ou incohérent selon politique de modération.

### 6.2.11. Notifications client
Le client doit recevoir des notifications pour :
- confirmation de commande ;
- changement de statut ;
- paiement et livraison ;
- support ou litige ;
- avis ou remboursement.

---

## 6.3. Espace vendeur / boutique

### 6.3.1. Création de boutique
Le vendeur doit pouvoir :
- créer une boutique ;
- renseigner les informations légales et commerciales ;
- soumettre sa boutique à validation ;
- suivre le statut de validation ;
- corriger les informations si besoin après refus.

### 6.3.2. Gestion catalogue
Le vendeur doit pouvoir :
- ajouter, modifier et retirer des produits ;
- gérer les photos, descriptions, prix, catégories et stock ;
- masquer ou réactiver des produits ;
- mettre en avant des produits pour la boutique ;
- gérer les ruptures de stock et alertes.

### 6.3.3. Gestion stock
Le vendeur doit pouvoir :
- renseigner le stock disponible ;
- gérer les ventes en quantité ;
- bloquer ou ajuster le stock en cas d’annulation, retour ou litige ;
- avoir un historique des mouvements de stock.

### 6.3.4. Gestion commandes
Le vendeur doit pouvoir :
- consulter ses commandes ;
- filtrer par statut ;
- confirmer ou préparer la commande ;
- renseigner l’état de préparation / expédition ;
- prévenir le client si une commande est retardée ou refusée.

### 6.3.5. Livraison
Le vendeur doit pouvoir :
- choisir la méthode de livraison si elle est configurable ;
- afficher les délais et zones de livraison ;
- identifier les commandes à expédier ;
- transmettre les informations de suivi à la plateforme ou au client ;
- gérer les retours quelque soit le cas métier.

### 6.3.6. Ventes et commissions
Le vendeur doit pouvoir consulter :
- ses ventes par période ;
- son chiffre d’affaires ;
- ses commissions calculées ;
- les commandes validées / non validées ;
- les montants bloqués ou à payer ;
- ses soldes et ses revenus.

### 6.3.7. Retraits
Le vendeur doit pouvoir :
- demander un retrait depuis un solde disponible ;
- choisir le moyen de paiement ou le compte cible ;
- suivre l’état de sa demande ;
- recevoir les motifs d’un refus ou d’un blocage.

### 6.3.8. Support et litige
Le vendeur doit pouvoir :
- gérer les messages du client ;
- réagir à une demande de retour ou d’annulation ;
- répondre à un litige ;
- tracer les échanges et décisions.

### 6.3.9. Notifications vendeur
Le vendeur doit recevoir des notifications pour :
- nouvelle commande ;
- achat confirmé ;
- retour ou litige ;
- commission calculée ;
- retrait demandé ou validé ;
- alerte de stock.

---

## 6.4. Espace administrateur

L’admin doit pouvoir :
- gérer les boutiques approuvées et refusées ;
- valider ou suspendre un vendeur ;
- contrôler les produits signalés ou rejetés ;
- gérer les commissions et paramètres globaux ;
- traiter les litiges et évaluer les demandes de remboursement ;
- consulter les statistiques de plateforme ;
- assurer la modération des contenus et profils.

### 6.4.1. Paramétrage global
L’admin doit pouvoir configurer :
- taux de commission ;
- seuil minimum de retrait ;
- frais et règles de paiement ;
- zones et méthodes de livraison ;
- délais et politiques de retour ;
- règles métier de validation.

### 6.4.2. Audit et traçabilité
- Toute action critique doit être journalisée.
- Les décisions de validation, suspension, remboursement ou refus doivent être traçables.
- L’historique des modifications doit être accessible aux profils autorisés.

---

## 7. Cas d’usage principaux

### 7.1. Cas d’usage client
1. Le client consulte l’accueil et recherche un produit.
2. Le client ouvre une fiche produit et vérifie le prix, stock et boutique.
3. Le client ajoute des produits au panier depuis plusieurs boutiques.
4. Le client valide le panier et choisit l’adresse et le mode de livraison.
5. Le client confirme le paiement.
6. Le client reçoit la confirmation de commande.
7. Le client suit la commande jusqu’à la livraison.
8. Le client peut demander un retour, un remboursement ou un litige.
9. Le client consulte son historique et ses notifications.

### 7.2. Cas d’usage vendeur
1. Le vendeur crée sa boutique et soumet une demande d’approbation.
2. Le vendeur ajoute des produits et configure les stocks.
3. Le vendeur reçoit une commande et valide ou prépare la livraison.
4. Le vendeur inspecte ses ventes et commissions.
5. Le vendeur demande un retrait.
6. Le vendeur répond aux demandes d’assistance et litiges.

### 7.3. Cas d’usage administrateur
1. L’admin reçoit une demande de boutique ou de produit.
2. L’admin approuve ou refuse la demande suivant les critères définis.
3. L’admin vérifie les litiges, remboursements et commissions.
4. L’admin ajuste les paramètres globaux et les règles commerciales.

---

## 8. Règles de calcul métier

### 8.1. Commission
La commission doit être calculée sur une vente confirmée, conformément à la règle de validation adoptée par la plateforme.

Règle générale à retenir :
- une vente validée sur Malick Buss déclenche le calcul de commission ;
- le taux peut être unique ou paramétrable selon catégorie, boutique ou règle de produit ;
- le calcul doit tenir compte des règles définies par l’administrateur et les politiques commerciales.

### 8.2. Retrait vendeur
- Le retrait est autorisé uniquement si le solde est disponible et conforme au seuil minimum configuré.
- La demande suit un workflow de validation.
- Un retrait refusé ou bloqué doit être explicité au vendeur.

### 8.3. Paiement et livraison
- Les méthodes de paiement et de livraison doivent être activées uniquement si elles sont confirmées techniquement et juridiquement.
- Les intégrations non confirmées ne doivent pas apparaître comme disponibles à l’utilisateur.

---

## 9. Exigences UX/UI

### 9.1. Mobile-first
La plateforme doit être conçue pour une expérience mobile prioritaire, avec :
- navigation simple ;
- boutons clairs et actionnables ;
- écrans de parcours court ;
- états vides, chargements et erreurs explicites ;
- structure cohérente entre espace client, vendeur et admin.

### 9.2. États d’écran requis
Chaque écran doit gérer au moins :
- état vide ;
- état en chargement ;
- état succès ;
- état erreur ;
- accès refusé ;
- action en attente.

### 9.3. Navigation
La navigation doit être intuitive, avec une logique claire entre :
- accueil ;
- catalogue ;
- panier ;
- commande ;
- compte ;
- notifications ;
- historique ;
- support.

---

## 10. Exigences non fonctionnelles

### 10.1. Performance
- Les écrans doivent se charger rapidement sur mobile.
- Les listes et résultats doivent être paginés ou filtrés selon le volume.
- L’expérience doit rester fluide même avec un grand nombre de produits ou de boutiques.

### 10.2. Sécurité
- Authentification et autorisation côté serveur.
- Protection des données sensibles et transactions financières.
- Journalisation des actions critiques.
- Séparation claire des rôles et permissions.

### 10.3. Fiabilité
- Les états de commande, paiement, livraison et commission doivent être cohérents.
- Les erreurs doivent être gérées sans perte de données.
- Les workflows de correction doivent passer par un état explicite de compensation.

### 10.4. Traçabilité
- Toutes les opérations clés doivent être historisées.
- Les statuts doivent être modifiables uniquement selon les règles métier prévues.

---

## 11. Données métier clés

Les éléments suivants doivent être modélisés dans le système :
- utilisateur ;
- rôle / permission ;
- boutique ;
- produit ;
- catégorie ;
- stock ;
- panier ;
- ligne de panier ;
- commande ;
- sous-commande par vendeur ;
- paiement ;
- livraison ;
- commission ;
- retrait ;
- litige ;
- notification ;
- avis ;
- support ticket ;
- action d’audit/log.

---

## 12. Exigences de qualité et de test

Le développement doit être validé via des tests sur :
- création et validation de boutique ;
- ajout de produit ;
- validation de stock ;
- création de commande multi-boutiques ;
- calcul de commission ;
- paiement en attente / confirmée / refusée ;
- statut de livraison ;
- demande de retrait ;
- gestion de retour / litige ;
- autorisations et accès refusé ;
- notifications déclenchées.

---

## 13. Décisions à valider avant développement final

Les points suivants doivent être confirmés par le propriétaire du produit avant mise en production :
- mode de paiement exact à implémenter ;
- politiques de commission : taux unique, par boutique, par catégorie ou hybride ;
- moment exact où la commission devient due ;
- politique de retour et remboursement ;
- seuils et frais de retrait ;
- zones de livraison et règles d’expédition ;
- obligations légales, fiscales et RGPD ;
- gestion des collaborateurs venders et de leurs permissions ;
- mécanisme de notification exact (in-app, email, SMS, WhatsApp).

---

## 14. Livrables attendus

### 14.1. Version MVP
L’objectif initial de la plateforme doit couvrir :
- inscription et connexion ;
- recherche et catalogue ;
- boutique et produit ;
- panier multi-boutiques ;
- commande et paiement ;
- suivi de livraison ;
- dashboard vendeur ;
- commissions ;
- retraits ;
- notifications ;
- admin modération.

### 14.2. Version évoluée
Les fonctions complémentaires suivantes peuvent être ajoutées selon la maturité du produit :
- fidélité et promos avancées ;
- avis plus riches ;
- gestion avancée des livraisons ;
- intégrations bancaires et wallet ;
- API pour partenaires et intégrations externes ;
- support plus avancé avec chat/WhatsApp ;
- reporting analytique pour administrateur et vendeur.

---

## 15. Conclusion

Malick Buss est une marketplace multi-boutiques conçue pour un contexte mobile-first et un marché sénégalais. Son cœur de métier repose sur une séparation nette entre produit, commande, paiement, livraison, commission et retrait, avec des règles de traçabilité et de sécurité strictes.

Le système doit être pensé comme une plateforme commerciale fiable, auditable et configurable, plutôt qu’un simple catalogue en ligne. La mise en œuvre devra respecter les principes de validation du vendeur, de calcul serveur, de traçabilité des statuts et de sécurité des rôles.

Cette spécification constitue une base fonctionnelle complète pour la conception, le développement, les tests et la validation du produit.
