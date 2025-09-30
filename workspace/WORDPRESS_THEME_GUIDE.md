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

3.  **Permaliens (L'ÉTAPE LA PLUS IMPORTANTE POUR CORRIGER LES ERREURS 403) :**
    *   Allez dans `Réglages > Permaliens`.
    *   Assurez-vous que l'option `Titre de la publication` est cochée.
    *   Cliquez sur le bouton **`Enregistrer les modifications`** en bas de la page.
    *   **Même si l'option était déjà cochée, cliquez quand même sur le bouton.** Cette action force WordPress à rafraîchir ses règles de liens (le fichier `.htaccess`) et résout la majorité des erreurs 403 et 404.

4.  **Créer les Pages avec les Modèles :**
    Pour chaque autre page, vous devez créer une page et lui assigner le bon "Modèle".
    *   Allez dans `Pages > Ajouter`.
    *   Donnez un titre à la page (ex: "Rachat de Crédit").
    *   Dans la colonne de droite, sous `Résumé > Modèle`, sélectionnez le modèle correspondant (ex: "Service - Rachat de Crédit").
    *   Cliquez sur `Publier`.

    **Répétez cette opération pour les pages suivantes :**
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
    
5.  **Créer le Menu :**
    *   Allez dans `Apparence > Menus`, créez un nouveau menu, ajoutez vos pages, et assignez-le à l'emplacement "Menu Principal".

---

## Étape 8 : Rendre les formulaires fonctionnels (100% Gratuit)

Pour que les formulaires de contact et de demande de prêt envoient des e-mails avec pièces jointes.

### Principe :
Nous allons utiliser deux plugins gratuits :
1.  **Contact Form 7** : Pour créer les formulaires (il gère les pièces jointes gratuitement).
2.  **WP Mail SMTP** : Pour s'assurer que les e-mails envoyés par votre site arrivent bien dans votre boîte de réception.

### Instructions :

1.  **Installez les plugins gratuits :**
    *   Dans votre admin WordPress, allez dans `Extensions > Ajouter`.
    *   Recherchez `Contact Form 7`, puis installez et activez-le.
    *   Recherchez `WP Mail SMTP`, puis installez et activez-le.

2.  **Configurez WP Mail SMTP (Crucial) :**
    *   Allez dans le nouveau menu `WP Mail SMTP`.
    *   Suivez l'assistant de configuration pour le connecter à votre service d'e-mail (ex: Gmail, Outlook). **Cette étape est indispensable, sinon vos e-mails de formulaires n'arriveront jamais.**

3.  **Créez vos formulaires dans Contact Form 7 :**
    *   Allez dans le nouveau menu `Contact` sur la gauche.
    *   Créez un nouveau formulaire pour la **page Contact** et un autre pour la **Demande de Prêt**.
    *   **Pour le formulaire de Demande de Prêt**, ajoutez les champs `file` pour les documents. La syntaxe ressemble à ceci :
        ```
        <label> Pièce d'identité
        [file your-id limit:5mb filetypes:pdf|jpg|png] </label>
        ```
    *   Dans l'onglet **"E-mail"** de la configuration du formulaire, assurez-vous d'ajouter les balises de vos fichiers (ex: `[your-id]`) dans la section **"Pièces jointes"** en bas.
    *   Enregistrez les deux formulaires et copiez leurs **shortcodes**.

4.  **Intégrez les formulaires dans votre thème :**
    *   **Pour le formulaire de Contact :** Modifiez le fichier `template-contact.php` et remplacez la maquette HTML (la balise `<form>...</form>`) par le shortcode du formulaire de contact :
        `<?php echo do_shortcode('[contact-form-7 id="VOTRE_ID_CONTACT"]'); ?>`
    *   **Pour la Demande de Prêt :** Modifiez le fichier `template-demande-de-pret.php` et remplacez la maquette HTML par le shortcode du formulaire de demande :
        `<?php echo do_shortcode('[contact-form-7 id="VOTRE_ID_DEMANDE"]'); ?>`

Votre site est maintenant entièrement fonctionnel !

    