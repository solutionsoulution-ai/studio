# Guide d'Intégration WordPress : Copier-Coller

Ce guide contient les blocs de code exacts et les étapes à suivre pour créer les fichiers de base de votre thème WordPress à partir de ce projet.

---

## Étape 0 : Prérequis - Générer les fichiers statiques

Avant toute chose, vous devez générer les fichiers JavaScript et CSS. Exécutez la commande suivante à la racine de votre projet :

```bash
npm run build
```

Cela crée un dossier `build/` contenant `calculator.js` et `main.css`.

---

## Étape 1 : Structure de base du thème

1.  Allez dans le dossier `wp-content/themes/` de votre installation WordPress.
2.  Créez un nouveau dossier pour votre thème, par exemple `vylscapital-theme`.
3.  Si vous utilisez une base comme "Underscores", copiez tous ses fichiers dans `vylscapital-theme`.

---

## Étape 2 : Copier les fichiers PHP principaux

Copiez les fichiers suivants depuis le dossier `workspace/` de ce projet et utilisez-les pour **remplacer** les fichiers du même nom dans votre thème `vylscapital-theme/`.

*   `workspace/functions.php` -> `vylscapital-theme/functions.php`
*   `workspace/header.php` -> `vylscapital-theme/header.php`
*   `workspace/footer.php` -> `vylscapital-theme/footer.php`
*   `workspace/index.php` -> `vylscapital-theme/index.php` (pour le blog)
*   `workspace/page.php` -> `vylscapital-theme/page.php` (pour les pages simples)
*   `workspace/single.php` -> `vylscapital-theme/single.php` (pour les articles de blog)

---

## Étape 3 : Copier les modèles de page personnalisés

Copiez **tous les fichiers** du dossier `workspace/` qui commencent par `template-` ou `front-page` dans votre thème `vylscapital-theme/`.

*   `workspace/front-page.php` -> `vylscapital-theme/front-page.php`
*   `workspace/template-a-propos.php` -> `vylscapital-theme/template-a-propos.php`
*   `workspace/template-contact.php` -> `vylscapital-theme/template-contact.php`
*   `workspace/template-demande-de-pret.php` -> `vylscapital-theme/template-demande-de-pret.php`
*   `workspace/template-merci-contact.php` -> `vylscapital-theme/template-merci-contact.php`
*   `workspace/template-merci-demande.php` -> `vylscapital-theme/template-merci-demande.php`
*   `workspace/template-politique-de-confidentialite.php` -> `vylscapital-theme/template-politique-de-confidentialite.php`
*   `workspace/template-conditions-generales.php` -> `vylscapital-theme/template-conditions-generales.php`
*   **Et tous les modèles de services** (`template-pret-auto.php`, `template-pret-immo.php`, etc.).

---

## Étape 4 : Gérer le CSS

1.  Ouvrez le fichier `vylscapital-theme/style.css`.
2.  Assurez-vous que l'en-tête du thème est correct :
    ```css
    /*
    Theme Name: VylsCapital Theme
    Author: Votre Nom
    Description: Thème sur mesure pour le site VylsCapital.
    Version: 1.0
    */
    ```
3.  **Action cruciale :** Après l'en-tête, supprimez tout le reste du CSS par défaut.
4.  Ouvrez le fichier `build/static/css/main.css` généré par `npm run build`.
5.  Copiez **TOUT** son contenu et collez-le dans votre `vylscapital-theme/style.css` (juste après l'en-tête).

---

## Étape 5 : Gérer le JavaScript

1.  **JavaScript pour l'interactivité de base (Menu/FAQ) :**
    *   Créez le chemin de dossiers `assets/js/` dans votre thème `vylscapital-theme/`.
    *   Copiez le fichier `workspace/assets/js/main.js` dans `vylscapital-theme/assets/js/main.js`.

2.  **JavaScript pour le Calculateur (React) :**
    *   Après `npm run build`, allez dans `build/static/js/`.
    *   Créez le chemin de dossiers `build/static/js/` à l'intérieur de votre thème.
    *   Copiez le fichier `calculator.js` à cet endroit. Le chemin final sera : `vylscapital-theme/build/static/js/calculator.js`.

Votre `functions.php` est déjà configuré pour charger ces scripts. **Il n'y a pas de fichier `calculator.css` à copier.**

---

## Étape 6 : Copier les Images

1.  Créez un dossier `assets/images/` dans votre thème `vylscapital-theme/`.
2.  Les fichiers PHP font référence à des images (ex: `pret-auto.jpg`, `home-carousel-1.png`). Vous devez trouver ces images dans le projet Next.js (`src/components/site/` ou `public/`) et les copier dans `vylscapital-theme/assets/images/`.

---

## Étape 7 : Nettoyage des fichiers Underscores (Optionnel mais recommandé)

Les fichiers suivants du thème Underscores ne sont plus nécessaires car nos propres fichiers les remplacent. Vous pouvez les supprimer pour garder un thème propre :
*   Le dossier `template-parts/` et tout son contenu.
*   Le dossier `js/` (nous utilisons notre propre `assets/js/`).

**Fichiers à conserver d'Underscores :**
*   `404.php` (page d'erreur)
*   `search.php` (résultats de recherche)
*   `archive.php` (archives par date/catégorie)
*   `comments.php` (affichage des commentaires)
*   `screenshot.png`

---

## Étape 8 : Configuration dans WordPress

Une fois tous les fichiers en place :
1.  **Activez le thème** dans `Apparence > Thèmes`.
2.  **Créez les pages** ("À Propos", "Contact", "Prêt Auto", etc.) dans l'admin WordPress.
3.  Pour chaque page, dans l'éditeur, assignez le bon **"Modèle"** dans le panneau "Attributs de la page".
4.  **Créez le menu** dans `Apparence > Menus` et assignez-le à l'emplacement "Menu Principal".
5.  **Installez les plugins** nécessaires pour les formulaires de contact et le carrousel si vous souhaitez cette interactivité.

Bon courage !
