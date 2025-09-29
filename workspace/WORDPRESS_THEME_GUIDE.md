# Guide d'Intégration WordPress : Copier-Coller

Ce guide contient les blocs de code exacts et les étapes à suivre pour créer les fichiers de base de votre thème WordPress à partir de ce projet.

---

## Étape 1 : Préparation de la structure du thème

1.  Quelque part sur votre ordinateur, créez un nouveau dossier que vous nommerez `vylsfond-theme`. C'est ce dossier qui contiendra votre thème final.
2.  Copiez **TOUT** le contenu du dossier `workspace/` (qui se trouve dans ce projet) et collez-le à l'intérieur de votre dossier `vylsfond-theme`.

---

## Étape 2 : Générer les fichiers statiques (CSS)

Ouvrez votre terminal à la racine de **ce projet Next.js** (pas votre dossier de thème) et exécutez la commande suivante :

```bash
npm run build
```

Cette commande va créer un dossier `build/` qui contient le fichier `main.css` dont nous avons besoin.

---

## Étape 3 : Gérer le CSS (Étape cruciale)

1.  Ouvrez le fichier `build/static/css/main.css` qui vient d'être créé.
2.  Sélectionnez et copiez **TOUT** le contenu de ce fichier.
3.  Maintenant, allez dans votre dossier de thème `vylsfond-theme` et ouvrez le fichier `style.css`.
4.  À l'intérieur de `style.css`, collez tout le contenu que vous venez de copier, juste **en dessous** du bloc de commentaire d'en-tête. **Ne supprimez pas l'en-tête existant.**

---

## Étape 4 : Gérer les Images

1.  Créez un dossier `assets/images/` dans votre thème `vylsfond-theme/`.
2.  Vous devez trouver les images utilisées dans le projet Next.js et les copier dans `vylsfond-theme/assets/images/`. Les fichiers PHP font référence à des noms comme `pret-auto.jpg`, `home-carousel-1.png`, etc. Assurez-vous que les noms correspondent.

---

## Étape 5 : Créer l'archive .ZIP (La bonne méthode)

C'est l'étape qui cause souvent l'erreur "feuille de style manquante". Suivez-la attentivement.

1.  **N'archivez PAS le dossier `vylsfond-theme` lui-même.**
2.  **Ouvrez** le dossier `vylsfond-theme`.
3.  À l'intérieur, sélectionnez **tous les fichiers et dossiers** (`style.css`, `index.php`, `assets/`, etc.).
4.  Faites un clic droit sur votre sélection et choisissez :
    *   Sur **Windows** : `Envoyer vers` > `Dossier compressé (.zip)`.
    *   Sur **macOS** : `Compresser X éléments`.
5.  Renommez le fichier `.zip` nouvellement créé en `vylsfond-theme.zip`.

**Ce nouveau fichier .zip est celui que vous devez téléverser sur WordPress.** Il a maintenant la bonne structure, avec `style.css` directement à la racine.

---

## Étape 6 : Configuration du contenu dans WordPress (Étape Finale)

Une fois le thème activé, votre site peut afficher des erreurs "Page non trouvée" ou ne pas afficher la bonne page d'accueil. C'est normal. Suivez ces étapes pour tout configurer.

1.  **Activer le Thème :**
    *   Allez dans `Apparence > Thèmes > Ajouter > Téléverser un thème` et téléversez votre `vylsfond-theme.zip`.
    *   Activez le thème.

2.  **Configurer la Page d'Accueil (ACTION REQUISE ET TRÈS IMPORTANTE) :**
    *   **C'est l'étape la plus importante pour que votre page d'accueil s'affiche correctement.**
    *   Allez dans `Pages > Ajouter`. Créez une page simple que vous nommerez `Accueil`. Laissez le contenu vide, puis publiez-la.
    *   Allez dans `Réglages > Lecture`.
    *   À côté de "La page d'accueil affiche", cochez **"Une page statique"**.
    *   Dans le menu déroulant "Page d'accueil", sélectionnez la page **"Accueil"** que vous venez de créer.
    *   Cliquez sur **"Enregistrer les modifications"**.

3.  **Permaliens (TRÈS IMPORTANT) :**
    *   Allez dans `Réglages > Permaliens`.
    *   Choisissez la structure `Titre de la publication`.
    *   Cliquez sur `Enregistrer les modifications`. Cela rafraîchit les règles de liens de WordPress et résout beaucoup de problèmes de "page non trouvée".

4.  **Créer les Pages :**
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
    *   **Titre :** `Espace Client` -> **Modèle :** `Banque - Espace Client` (Ce modèle est protégé)
    
5.  **Créer le Menu :**
    *   Allez dans `Apparence > Menus`.
    *   Créez un nouveau menu.
    *   Ajoutez les pages que vous venez de créer au menu.
    *   En bas, dans "Emplacements du menu", cochez la case "Menu Principal".
    *   Enregistrez le menu.

6.  **Installer les Plugins :**
    *   Pour que les formulaires de contact et de demande de prêt fonctionnent, installez un plugin comme **WPForms** ou **Contact Form 7**.
    *   Créez vos formulaires dans le plugin.
    *   Modifiez les fichiers `template-contact.php` et `template-demande-de-pret.php` en remplaçant les formulaires HTML statiques par le shortcode du plugin (ex: `<?php echo do_shortcode('[wpforms id="123"]'); ?>`). Les instructions sont dans les fichiers.
    *   Pour les carrousels (témoignages, etc.), installez un plugin de slider comme **Smart Slider 3** et recréez les carrousels, puis insérez leur shortcode dans les fichiers PHP correspondants.

---
