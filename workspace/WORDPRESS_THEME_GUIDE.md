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

2.  **Configurer la Page d'Accueil (Très Important) :**
    *   Allez dans `Pages > Ajouter`. Créez une page simple que vous nommerez `Accueil`. Laissez le contenu vide, puis publiez-la.
    *   Allez dans `Réglages > Lecture`.
    *   À côté de "La page d'accueil affiche", cochez **"Une page statique"**.
    *   Dans le menu déroulant "Page d'accueil", sélectionnez la page **"Accueil"** que vous venez de créer.
    *   Cliquez sur **"Enregistrer les modifications"**. WordPress saura maintenant utiliser `index.php` pour l'accueil.

3.  **Configurer la Page des Articles (Blog) :**
    *   Allez dans `Pages > Ajouter`. Créez une page que vous nommerez `Blog`.
    *   **IMPORTANT :** Dans la colonne de droite, sous `Résumé > Modèle`, sélectionnez le modèle **"Page - Blog"**.
    *   Publiez la page.
    *   Retournez dans `Réglages > Lecture`.
    *   Dans le menu déroulant "Page des articles", sélectionnez la page **"Blog"** que vous venez de créer.
    *   Enregistrez les modifications.

4.  **Permaliens (L'ÉTAPE LA PLUS IMPORTANTE POUR CORRIGER LES ERREURS 403/404) :**
    *   Allez dans `Réglages > Permaliens`.
    *   Assurez-vous que l'option `Titre de la publication` est cochée.
    *   Cliquez sur le bouton **`Enregistrer les modifications`** en bas de la page.
    *   **Même si l'option était déjà cochée, cliquez quand même sur le bouton.** Cette action force WordPress à rafraîchir ses règles de liens (le fichier `.htaccess`) et résout la majorité des problèmes.

5.  **Créer les Autres Pages avec les Modèles :**
    *   `À Propos` -> `Page - À Propos`
    *   `Contact` -> `Page - Contact`
    *   `Demande de Financement` -> `Page - Demande de Prêt`
    *   `Prêt Entreprise` -> `Service - Prêt Entreprise`
    *   `Prêt Immobilier` -> `Service - Prêt Immobilier`
    *   `Prêt Personnel` -> `Service - Prêt Personnel`
    *   `Prêt Auto` -> `Service - Prêt Auto`
    *   `Rachat de Crédit` -> `Service - Rachat de Crédit`
    *   `Politique de Confidentialité` -> `Page - Politique de Confidentialité`
    *   `Conditions Générales` -> `Page - Conditions Générales`
    *   `Tableau de Bord` -> `Banque - Tableau de Bord`
    
6.  **Créer le Menu :**
    *   Allez dans `Apparence > Menus`, créez un nouveau menu, ajoutez vos pages (y compris la page "Blog"), et assignez-le à l'emplacement "Menu Principal".

---

## Étape 8 : Rendre les formulaires fonctionnels

Pour que les formulaires de contact et de demande de prêt envoient des e-mails avec pièces jointes, suivez ces étapes.

1.  **Installez le plugin "WP Mail SMTP" (gratuit) :**
    *   Dans `Extensions > Ajouter`, recherchez, installez et activez `WP Mail SMTP`.
    *   Suivez l'assistant de configuration. Choisissez `Autre SMTP` et entrez les informations de votre compte e-mail (`mail.spacemail.com`, `contact@vylscapital.com`, etc.). C'est **crucial** pour la fiabilité de l'envoi.

2.  **Vérifiez que les formulaires fonctionnent :**
    *   Le code PHP pour l'envoi des e-mails est déjà intégré dans `template-contact.php` et `template-demande-de-pret.php`.
    *   Faites un test en envoyant un message depuis chaque formulaire pour confirmer que vous recevez bien les e-mails.

Votre site est maintenant entièrement fonctionnel !
