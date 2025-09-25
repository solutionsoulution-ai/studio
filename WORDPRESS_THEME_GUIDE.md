# Guide d'Intégration WordPress : Copier-Coller

Ce guide contient les blocs de code exacts et les étapes à suivre pour créer les fichiers de base de votre thème WordPress à partir de ce projet.

---

## Étape 1 : Préparation de la structure du thème

1.  Quelque part sur votre ordinateur, créez un nouveau dossier que vous nommerez `vylscapital-theme`. C'est ce dossier qui contiendra votre thème final.
2.  Copiez **TOUT** le contenu du dossier `workspace/` (qui se trouve dans ce projet) et collez-le à l'intérieur de votre dossier `vylscapital-theme`.

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
3.  Maintenant, allez dans votre dossier de thème `vylscapital-theme` et ouvrez le fichier `style.css`.
4.  À l'intérieur de `style.css`, collez tout le contenu que vous venez de copier, juste **en dessous** du bloc de commentaire d'en-tête. **Ne supprimez pas l'en-tête existant.**

---

## Étape 4 : Gérer le JavaScript

1.  **JavaScript pour le Calculateur (React) :**
    *   Allez dans `build/static/js/`.
    *   Créez les dossiers `build/static/js/` à l'intérieur de votre thème `vylscapital-theme/`.
    *   Copiez le fichier `calculator.js` depuis `build/static/js/calculator.js` vers `vylscapital-theme/build/static/js/calculator.js`.

Le fichier `functions.php` est déjà configuré pour charger `main.js` (déjà présent dans `assets/js`) et `calculator.js`. Il n'y a rien d'autre à faire.

---

## Étape 5 : Gérer les Images

1.  Créez un dossier `assets/images/` dans votre thème `vylscapital-theme/`.
2.  Vous devez trouver les images utilisées dans le projet Next.js (principalement dans `src/components/site/` et `public/`) et les copier dans `vylscapital-theme/assets/images/`. Les fichiers PHP font référence à des noms comme `pret-auto.jpg`, `home-carousel-1.png`, etc.

---

## Étape 6 : Créer l'archive .ZIP (La bonne méthode)

C'est l'étape qui cause l'erreur "feuille de style manquante". Suivez-la attentivement.

1.  **N'archivez PAS le dossier `vylscapital-theme` lui-même.**
2.  **Ouvrez** le dossier `vylscapital-theme`.
3.  À l'intérieur, sélectionnez **tous les fichiers et dossiers** (`style.css`, `index.php`, `assets/`, `build/`, etc.).
4.  Faites un clic droit sur votre sélection et choisissez :
    *   Sur **Windows** : `Envoyer vers` > `Dossier compressé (.zip)`.
    *   Sur **macOS** : `Compresser X éléments`.
5.  Renommez le fichier `.zip` nouvellement créé en `vylscapital-theme.zip`.

**Ce nouveau fichier .zip est celui que vous devez téléverser sur WordPress.** Il a maintenant la bonne structure, avec `style.css` directement à la racine.

---

## Étape 7 : Configuration dans WordPress

1.  Allez dans `Apparence > Thèmes > Ajouter > Téléverser un thème` et téléversez votre `vylscapital-theme.zip`.
2.  Activez le thème.
3.  Créez les pages ("À Propos", "Contact", "Prêt Auto", etc.) et assignez le bon **"Modèle"** de page dans l'éditeur.
4.  Créez le menu dans `Apparence > Menus`.
5.  Installez un plugin de formulaire de contact (ex: WPForms, Contact Form 7) et remplacez les formulaires statiques dans les fichiers `template-contact.php` et `template-demande-de-pret.php` par le shortcode du plugin.
