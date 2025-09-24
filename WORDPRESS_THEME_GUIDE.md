# Guide d'Intégration WordPress : Copier-Coller

Ce guide contient les blocs de code exacts dont vous avez besoin pour créer les fichiers de base de votre thème WordPress. Suivez les étapes dans l'ordre.

---

## Étape 0 : Prérequis - Générer les fichiers statiques

Avant toute chose, vous devez générer les fichiers JavaScript et CSS nécessaires à l'interactivité et au style. Exécutez la commande suivante à la racine de votre projet :

```bash
npm run build
```

Cela crée un dossier `build/` contenant les fichiers `calculator.js`, `calculator.css` et `main.css`.

---

## Étape 1 : Structure de base du thème

Allez dans le dossier `wp-content/themes/` de votre installation WordPress et créez un nouveau dossier pour votre thème, par exemple `vylscapital-theme`. Tous les fichiers suivants seront créés à l'intérieur de ce dossier.

### A. Créez le fichier `style.css`

Copiez **tout** le contenu ci-dessous et collez-le dans votre fichier `style.css`.

**Tâche importante :** Vous devrez remplacer le commentaire `/* ... COLLEZ VOTRE CSS ICI ... */` par le contenu réel de votre fichier CSS généré.
**Où trouver le CSS ?** Après avoir lancé `npm run build`, ouvrez le fichier `build/static/css/main.css`. Ouvrez ce fichier, copiez **TOUT** son contenu et collez-le à la place du commentaire ci-dessous.

```css
/*
Theme Name: VylsCapital Theme
Author: Votre Nom
Description: Thème sur mesure pour le site VylsCapital.
Version: 1.0
*/

/* --- DÉBUT DU CSS - NE MODIFIEZ PAS CI-DESSOUS --- */
/* Après avoir lancé "npm run build", ouvrez le fichier CSS dans "build/static/css/main.css" */
/* Copiez TOUT son contenu et collez-le ici, en remplacement de ce commentaire. */
/* ... COLLEZ VOTRE CSS ICI ... */
/* --- FIN DU CSS --- */
```

### B. Créez le fichier `functions.php`

Copiez le contenu du fichier `workspace/functions.php` (qui se trouve dans la liste des fichiers de ce projet) et collez-le dans `vylscapital-theme/functions.php`. Ce fichier est crucial, il charge vos CSS, vos scripts JavaScript et active les fonctionnalités du thème comme les menus.

### C. Créez le fichier `index.php` (pour le Blog)

Copiez le contenu de `workspace/index.php` et collez-le dans `vylscapital-theme/index.php`. Ce sera la page qui listera tous vos articles de blog.

---

## Étape 2 : L'en-tête et le pied de page

### A. Créez le fichier `header.php`

Copiez le contenu de `workspace/header.php` et collez-le dans `vylscapital-theme/header.php`.

### B. Créez le fichier `footer.php`

Copiez le contenu de `workspace/footer.php` et collez-le dans `vylscapital-theme/footer.php`.

---

## Étape 3 : Créer les modèles de page

Pour chaque fichier `.php` dans le dossier `workspace/` qui commence par `template-` ou `front-page`, vous allez créer un fichier correspondant dans votre thème.

1.  **Page d'accueil** : Copiez `workspace/front-page.php` vers `vylscapital-theme/front-page.php`.
2.  **Article de blog** : Copiez `workspace/single.php` vers `vylscapital-theme/single.php`.
3.  **Page standard** : Copiez `workspace/page.php` vers `vylscapital-theme/page.php`.
4.  **Pages de remerciement** :
    *   Copiez `workspace/template-merci-contact.php` vers `vylscapital-theme/template-merci-contact.php`.
    *   Copiez `workspace/template-merci-demande.php` vers `vylscapital-theme/template-merci-demande.php`.
5.  **Page "À Propos"** : Copiez `workspace/template-a-propos.php` vers `vylscapital-theme/template-a-propos.php`.
6.  **Page "Contact"** : Copiez `workspace/template-contact.php` vers `vylscapital-theme/template-contact.php`.
7.  **Page "Demande de Prêt"** : Copiez `workspace/template-demande-de-pret.php` vers `vylscapital-theme/template-demande-de-pret.php`.
8.  **Pages de Services** :
    *   Copiez `workspace/template-pret-entreprise.php` vers `vylscapital-theme/template-pret-entreprise.php`.
    *   Copiez `workspace/template-pret-immo.php` vers `vylscapital-theme/template-pret-immo.php`.
    *   ... Faites de même pour **tous les autres fichiers de service** (`-personnel`, `-auto`, `-rachat-de-credit`).
9.  **Pages Légales** :
    *   Copiez `workspace/template-politique-de-confidentialite.php` vers `vylscapital-theme/template-politique-de-confidentialite.php`.
    *   Copiez `workspace/template-conditions-generales.php` vers `vylscapital-theme/template-conditions-generales.php`.

---

## Étape 4 : Copier les Assets (JS et Images)

### A. JavaScript

1.  **JavaScript pour l'interactivité de base (Menu/FAQ) :**
    *   Créez un dossier `assets/js/` dans votre thème `vylscapital-theme/`.
    *   Copiez le contenu du fichier `workspace/assets/js/main.js` dans `vylscapital-theme/assets/js/main.js`.

2.  **JavaScript pour le Calculateur (React) :**
    *   Après avoir lancé `npm run build`, allez dans le dossier `build/static/js/` de votre projet.
    *   Copiez le fichier `calculator.js` dans un nouveau dossier `build/static/js/` à l'intérieur de votre thème. Le chemin final doit être : `vylscapital-theme/build/static/js/calculator.js`.

3.  **CSS pour le Calculateur :**
    *   De même, copiez le fichier `build/static/css/calculator.css` dans `vylscapital-theme/build/static/css/calculator.css`.

Votre `functions.php` est déjà configuré pour charger ces scripts aux bons endroits.

### B. Images

1.  Créez un dossier `assets/images/` dans votre thème `vylscapital-theme/`.
2.  Toutes les images utilisées dans les fichiers PHP (`<img src="<?php echo get_template_directory_uri(); ?>/assets/images/nom-de-limage.jpg">`) doivent être placées dans ce dossier. Vous les trouverez dans le projet Next.js (par exemple dans `public/` ou `src/`) ou vous devrez les télécharger depuis les URLs utilisées dans les composants React.

---

## Étape 5 : Configuration dans WordPress

Une fois tous les fichiers copiés, allez dans votre admin WordPress.

1.  **Activez le thème** dans `Apparence > Thèmes`.
2.  **Créez vos pages** ("À Propos", "Contact", "Prêt Auto", etc.) dans `Pages > Ajouter`.
3.  Pour chaque page, dans l'éditeur, trouvez le panneau "Attributs de la page" et **assignez le bon "Modèle"** dans le menu déroulant (ex: assignez le modèle "Service - Prêt Auto" à la page "Prêt Auto").
4.  **Créez le menu principal** dans `Apparence > Menus` et assignez-le à l'emplacement "Menu Principal".
5.  **Installez les plugins** nécessaires pour les formulaires de contact (`template-contact.php` et `template-demande-de-pret.php`) et le carrousel si vous souhaitez cette interactivité.

Ce guide devrait couvrir tout le processus. Bon courage !
