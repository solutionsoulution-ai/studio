# Guide d'Intégration WordPress : Copier-Coller

Ce guide contient les blocs de code exacts et les étapes à suivre pour créer les fichiers de base de votre thème WordPress à partir de ce projet.

---

## Étape 1 : Préparation de la structure du thème

1.  Quelque part sur votre ordinateur, créez un nouveau dossier que vous nommerez `vylsfond-theme`. C'est ce dossier qui contiendra votre thème final.
2.  Copiez **TOUT** le contenu du dossier `workspace/` (qui se trouve dans ce projet) et collez-le à l'intérieur de votre dossier `vylsfond-theme`.

---

## Étape 2 : Générer les fichiers statiques (CSS & JS)

Ouvrez votre terminal à la racine de **ce projet Next.js** (pas votre dossier de thème) et exécutez la commande suivante :

```bash
npm run build
```

Cette commande va créer un dossier `build/` qui contient les fichiers `main.css` et `calculator.js` dont nous avons besoin.

---

## Étape 3 : Gérer le CSS (Étape cruciale)

1.  Ouvrez le fichier `build/static/css/main.css` qui vient d'être créé.
2.  Sélectionnez et copiez **TOUT** le contenu de ce fichier.
3.  Maintenant, allez dans votre dossier de thème `vylsfond-theme` et ouvrez le fichier `style.css`.
4.  À l'intérieur de `style.css`, collez tout le contenu que vous venez de copier, juste **en dessous** du bloc de commentaire d'en-tête. **Ne supprimez pas l'en-tête existant.**

---

## Étape 4 : Gérer le JavaScript

Le fichier `functions.php` est déjà configuré pour charger `main.js` (déjà présent dans `assets/js`). Il n'y a rien d'autre à faire.

---

## Étape 5 : Gérer les Images

1.  Créez un dossier `assets/images/` dans votre thème `vylsfond-theme/`.
2.  Vous devez trouver les images utilisées dans le projet Next.js (principalement dans `src/components/site/` et `public/`) et les copier dans `vylsfond-theme/assets/images/`. Les fichiers PHP font référence à des noms comme `pret-auto.jpg`, `home-carousel-1.png`, etc.

---

## Étape 6 : Créer l'archive .ZIP (La bonne méthode)

C'est l'étape qui cause l'erreur "feuille de style manquante". Suivez-la attentivement.

1.  **N'archivez PAS le dossier `vylsfond-theme` lui-même.**
2.  **Ouvrez** le dossier `vylsfond-theme`.
3.  À l'intérieur, sélectionnez **tous les fichiers et dossiers** (`style.css`, `index.php`, `assets/`, etc.).
4.  Faites un clic droit sur votre sélection et choisissez :
    *   Sur **Windows** : `Envoyer vers` > `Dossier compressé (.zip)`.
    *   Sur **macOS** : `Compresser X éléments`.
5.  Renommez le fichier `.zip` nouvellement créé en `vylsfond-theme.zip`.

**Ce nouveau fichier .zip est celui que vous devez téléverser sur WordPress.** Il a maintenant la bonne structure, avec `style.css` directement à la racine.

---

## Étape 7 : Configuration du contenu dans WordPress (Étape Finale)

Une fois le thème activé, votre site peut afficher des erreurs "Page non trouvée" ou "403 Forbidden". C'est normal. Vous devez maintenant créer et configurer les pages dans WordPress.

1.  **Activer le Thème :**
    *   Allez dans `Apparence > Thèmes > Ajouter > Téléverser un thème` et téléversez votre `vylsfond-theme.zip`.
    *   Activez le thème.

2.  **Créer les pages de base :**
    *   Allez dans `Pages > Ajouter`. Créez une page nommée `Accueil`. Laissez le contenu vide. Publiez.
    *   Allez dans `Pages > Ajouter`. Créez une page nommée `Blog`. Laissez le contenu vide. Publiez.

3.  **Configurer la lecture (TRÈS IMPORTANT) :**
    *   Allez dans `Réglages > Lecture`.
    *   À côté de "La page d'accueil affiche", cochez **"Une page statique"**.
    *   Dans le menu déroulant "Page d'accueil", sélectionnez la page **"Accueil"** que vous venez de créer.
    *   Dans le menu déroulant "Page des articles", sélectionnez la page **"Blog"** que vous venez de créer.
    *   Cliquez sur **"Enregistrer les modifications"**. WordPress saura maintenant utiliser `front-page.php` (ou `index.php`) pour l'accueil et `home.php` pour le blog.

4.  **Permaliens (L'ÉTAPE LA PLUS IMPORTANTE POUR CORRIGER LES ERREURS 403) :**
    *   Allez dans `Réglages > Permaliens`.
    *   Assurez-vous que l'option `Titre de la publication` est cochée.
    *   Cliquez sur le bouton **`Enregistrer les modifications`** en bas de la page.
    *   **Même si l'option était déjà cochée, cliquez quand même sur le bouton.** Cette action force WordPress à rafraîchir ses règles de liens (le fichier `.htaccess`) et résout la majorité des erreurs 403 et 404. Si vous créez une nouvelle page et qu'elle affiche une erreur 403, revenez ici et cliquez à nouveau sur ce bouton.

5.  **Créer le reste des pages avec les modèles :**
    Pour chaque autre page, vous devez créer une page et lui assigner le bon "Modèle".
    *   Allez dans `Pages > Ajouter`.
    *   Donnez un titre à la page (ex: "Rachat de Crédit").
    *   Dans la colonne de droite, sous `Résumé > Modèle`, sélectionnez le modèle correspondant (ex: "Service - Rachat de Crédit").
    *   Cliquez sur `Publier`.

    **Répétez cette opération pour les pages suivantes :**
    *   **Titre :** `À Propos` -> **Modèle :** `Page - À Propos`
    *   **Titre :** `Contact` -> **Modèle :** `Page - Contact`
    *   **Titre :** `Demande de Financement` -> **Modèle :** `Page - Demande de Prêt`
    *   **Titre :** `Prêt Entreprise` -> **Modèle :** `Service - Prêt Entreprise`
    *   **Titre :** `Prêt Immobilier` -> **Modèle :** `Service - Prêt Immobilier`
    *   **Titre :** `Prêt Personnel` -> **Modèle :** `Service - Prêt Personnel`
    *   **Titre :** `Prêt Auto` -> **Modèle :** `Service - Prêt Auto`
    *   **Titre :** `Rachat de Crédit` -> **Modèle :** `Service - Rachat de Crédit`
    *   **Titre :** `Politique de Confidentialité` -> **Modèle :** `Page - Politique de Confidentialité`
    *   **Titre :** `Conditions Générales` -> **Modèle :** `Page - Conditions Générales`
    *   **Titre :** `Tableau de Bord` -> **Modèle :** `Banque - Tableau de Bord`
    
6.  **Créer le Menu :**
    *   Allez dans `Apparence > Menus`.
    *   Créez un nouveau menu, ajoutez vos pages, et assignez-le à l'emplacement "Menu Principal".

7.  **Installer les Plugins pour les Formulaires (ESSENTIEL) :**
    *   Pour que les formulaires de contact et de demande de prêt fonctionnent, installez un plugin comme **WPForms** ou **Contact Form 7**.
    *   Allez dans `Extensions > Ajouter` et recherchez `WPForms`. Installez et activez-le.
    *   Utilisez le constructeur de WPForms pour créer vos formulaires (un pour le contact, un pour la demande de prêt).
    *   Une fois un formulaire créé, WPForms vous donnera un **shortcode** (ex: `[wpforms id="123"]`).
    *   Modifiez les fichiers `template-contact.php` et `template-demande-de-pret.php` dans votre thème : remplacez les formulaires HTML statiques par le shortcode du plugin. Les instructions exactes sont dans les fichiers.
    *   Pour la demande de prêt, vous aurez peut-être besoin de la version Pro de WPForms pour gérer les téléversements de fichiers.

---

### Si l'erreur 403 persiste...

Si après avoir suivi scrupuleusement ces étapes (surtout l'étape des Permaliens) l'erreur 403 est toujours présente sur certaines pages, le problème vient de votre **hébergement**.

*   **Contactez votre hébergeur :** C'est la solution la plus rapide. Expliquez-leur la situation : "Bonjour, j'ai installé un nouveau thème WordPress et les pages qui utilisent des modèles de page personnalisés (template-....php) me renvoient une erreur 403. J'ai déjà essayé de réinitialiser les permaliens. Pouvez-vous vérifier les **permissions des fichiers/dossiers** de mon thème et les **logs d'erreurs du serveur (Apache/Nginx)** ?"
*   **Vérifiez les permissions vous-même :** Si vous avez un accès FTP ou via un gestionnaire de fichiers (cPanel, Plesk), assurez-vous que les **dossiers** de votre thème sont en `755` et les **fichiers** (tous les fichiers .php) sont en `644`. Des permissions incorrectes sont la cause principale des erreurs 403 que les permaliens ne règlent pas.
