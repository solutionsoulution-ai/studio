# Guide d'Intégration WordPress : Copier-Coller

Ce guide contient les blocs de code exacts et les étapes à suivre pour créer les fichiers de base de votre thème WordPress à partir de ce projet.

---

## Étape 1 : Préparation de la structure du thème

1.  Quelque part sur votre ordinateur, créez un nouveau dossier que vous nommerez `capfinfy-theme`. C'est ce dossier qui contiendra votre thème final.
2.  Copiez **TOUT** le contenu du dossier `workspace/` (qui se trouve dans ce projet) et collez-le à l'intérieur de votre dossier `capfinfy-theme`.

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
3.  Maintenant, allez dans votre dossier de thème `capfinfy-theme` et ouvrez le fichier `style.css`.
4.  À l'intérieur de `style.css`, collez tout le contenu que vous venez de copier, juste **en dessous** du bloc de commentaire d'en-tête. **Ne supprimez pas l'en-tête existant.**

---

## Étape 4 : Gérer le JavaScript

Le fichier `functions.php` est déjà configuré pour charger `main.js` (déjà présent dans `assets/js`) et `calculator.js`. Il n'y a rien d'autre à faire.

---

## Étape 5 : Gérer les Images

1.  Créez un dossier `assets/images/` dans votre thème `capfinfy-theme/`.
2.  Vous devez trouver les images utilisées dans le projet Next.js (principalement dans `src/components/site/` et `public/`) et les copier dans `capfinfy-theme/assets/images/`. Les fichiers PHP font référence à des noms comme `pret-auto.jpg`, `home-carousel-1.png`, etc.

---

## Étape 6 : Créer l'archive .ZIP (La bonne méthode)

C'est l'étape qui cause l'erreur "feuille de style manquante". Suivez-la attentivement.

1.  **N'archivez PAS le dossier `capfinfy-theme` lui-même.**
2.  **Ouvrez** le dossier `capfinfy-theme`.
3.  À l'intérieur, sélectionnez **tous les fichiers et dossiers** (`style.css`, `index.php`, `assets/`, `build/`, etc.).
4.  Faites un clic droit sur votre sélection et choisissez :
    *   Sur **Windows** : `Envoyer vers` > `Dossier compressé (.zip)`.
    *   Sur **macOS** : `Compresser X éléments`.
5.  Renommez le fichier `.zip` nouvellement créé en `capfinfy-theme.zip`.

**Ce nouveau fichier .zip est celui que vous devez téléverser sur WordPress.** Il a maintenant la bonne structure, avec `style.css` directement à la racine.

---

## Étape 7 : Configuration du contenu dans WordPress (Étape Finale)

Une fois le thème activé, votre site peut afficher des erreurs "Page non trouvée". C'est normal. Vous devez maintenant créer les pages dans WordPress.

1.  **Activer le Thème :**
    *   Allez dans `Apparence > Thèmes > Ajouter > Téléverser un thème` et téléversez votre `capfinfy-theme.zip`.
    *   Activez le thème.

2.  **Configurer la Page d'Accueil (Très Important) :**
    *   Allez dans `Pages > Ajouter`. Créez une page simple que vous nommerez `Accueil`. Laissez le contenu vide et le modèle sur "Défaut", puis publiez-la.
    *   Allez dans `Réglages > Lecture`.
    *   À côté de "La page d'accueil affiche", cochez **"Une page statique"**.
    *   Dans le menu déroulant "Page d'accueil", sélectionnez la page **"Accueil"** que vous venez de créer.
    *   Cliquez sur **"Enregistrer les modifications"**.

3.  **Créer les Pages :**
    Pour chaque page de votre site, vous devez créer une page dans WordPress et lui assigner le bon "Modèle".
    *   Allez dans `Pages > Ajouter`.
    *   Donnez un titre à la page (ex: "Contact").
    *   Dans la colonne de droite, sous `Résumé > Modèle`, sélectionnez le modèle correspondant (ex: "Page - Contact").
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
    
4.  **Créer le Menu :**
    *   Allez dans `Apparence > Menus`.
    *   Créez un nouveau menu.
    *   Ajoutez les pages que vous venez de créer au menu.
    *   En bas, dans "Emplacements du menu", cochez la case "Menu Principal".
    *   Enregistrez le menu.

5.  **Permaliens (Très Important) :**
    *   Allez dans `Réglages > Permaliens`.
    *   Choisissez la structure `Titre de la publication`.
    *   Cliquez sur `Enregistrer les modifications`. Cela rafraîchit les règles de liens de WordPress et résout beaucoup de problèmes de "page non trouvée".

6.  **Installer les Plugins (Crucial pour les formulaires) :**
    *   Pour que les formulaires de contact et de demande de prêt fonctionnent de manière fiable, installez le plugin **WP Mail SMTP** pour configurer l'envoi d'e-mails via un service externe (utilisez `contact@vylscapital.com` comme email d'envoi).
    *   Installez le plugin **Contact Form 7**.
    *   Créez vos formulaires dans `Contact Form 7`.
    *   Modifiez les fichiers `template-contact.php` et `template-demande-de-pret.php` en remplaçant les commentaires d'instructions par le shortcode du plugin (ex: `<?php echo do_shortcode('[contact-form-7 id="123"]'); ?>`).
    *   Pour les carrousels, vous pouvez installer un plugin de slider comme **Smart Slider 3** et remplacer le code HTML statique par le shortcode du slider.

---

### Nettoyage du Thème (Optionnel mais recommandé)

Votre thème contient des fichiers de base dont nous n'avons plus besoin. Vous pouvez les supprimer pour garder votre thème propre :
*   `404.php` (gardez-le, il est utile)
*   `archive.php` (gardez-le)
*   `comments.php` (gardez-le)
*   `search.php` (gardez-le)
*   `screenshot.png` (à garder ou à remplacer par votre propre capture d'écran)
