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

1.  **JavaScript pour le Calculateur (React) :**
    *   Créez les dossiers `build/static/js/` à l'intérieur de votre thème `vylsfond-theme/`.
    *   Copiez le fichier `calculator.js` depuis `build/static/js/calculator.js` vers `vylsfond-theme/build/static/js/calculator.js`.

Le fichier `functions.php` est déjà configuré pour charger `main.js` (déjà présent dans `assets/js`) et `calculator.js`. Il n'y a rien d'autre à faire.

---

## Étape 5 : Gérer les Images

1.  Créez un dossier `assets/images/` dans votre thème `vylsfond-theme/`.
2.  Vous devez trouver les images utilisées dans le projet Next.js (principalement dans `src/components/site/` et `public/`) et les copier dans `vylsfond-theme/assets/images/`. Les fichiers PHP font référence à des noms comme `pret-auto.jpg`, `home-carousel-1.png`, etc.

---

## Étape 6 : Créer l'archive .ZIP (La bonne méthode)

C'est l'étape qui cause l'erreur "feuille de style manquante". Suivez-la attentivement.

1.  **N'archivez PAS le dossier `vylsfond-theme` lui-même.**
2.  **Ouvrez** le dossier `vylsfond-theme`.
3.  À l'intérieur, sélectionnez **tous les fichiers et dossiers** (`style.css`, `index.php`, `assets/`, `build/`, etc.).
4.  Faites un clic droit sur votre sélection et choisissez `Compresser` ou `Envoyer vers > Dossier compressé`.
5.  Renommez le fichier `.zip` en `vylsfond-theme.zip`.

**Ce nouveau fichier .zip est celui que vous devez téléverser sur WordPress.**

---

## Étape 7 : Configuration du contenu dans WordPress

Une fois le thème activé, vous devez créer les pages dans WordPress.

1.  **Activer le Thème :**
    *   Allez dans `Apparence > Thèmes > Ajouter > Téléverser un thème` et téléversez votre `vylsfond-theme.zip`.
    *   Activez le thème.

2.  **Configurer la Page d'Accueil :**
    *   Allez dans `Pages > Ajouter`, créez une page `Accueil`.
    *   Allez dans `Réglages > Lecture`, cochez **"Une page statique"** et sélectionnez la page "Accueil".
    *   Enregistrez.

3.  **Créer les Pages avec les bons Modèles :**
    Pour chaque page, allez dans `Pages > Ajouter`, donnez un titre, et dans la colonne de droite `Résumé > Modèle`, sélectionnez le modèle correspondant.

    *   **Titre :** `Espace Client` -> **Modèle :** `Banque - Iframe`
    *   **Titre :** `À Propos` -> **Modèle :** `Page - À Propos`
    *   **Titre :** `Contact` -> **Modèle :** `Page - Contact`
    *   ... (et toutes les autres pages)

4.  **Configurer la page Iframe :**
    *   Ouvrez le fichier `template-iframe.php` dans votre thème.
    *   Remplacez `"https://VOTRE_APP_BANCAIRE_ICI.com"` par l'URL réelle de votre application bancaire hébergée.

5.  **Créer le Menu :**
    *   Allez dans `Apparence > Menus`, créez un nouveau menu et ajoutez-y vos pages.
    *   Cochez "Menu Principal" comme emplacement.

6.  **Permaliens :**
    *   Allez dans `Réglages > Permaliens` et choisissez `Titre de la publication`. Enregistrez.

7.  **Installer les Plugins de Formulaire :**
    *   Installez un plugin comme **WPForms**.
    *   Créez vos formulaires dans le plugin.
    *   Modifiez les fichiers `template-contact.php` et `template-demande-de-pret.php` en remplaçant les formulaires HTML par le shortcode du plugin (ex: `<?php echo do_shortcode('[wpforms id="123"]'); ?>`).
