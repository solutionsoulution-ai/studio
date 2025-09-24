
# Guide d'Intégration : De Next.js à un Thème WordPress

Ce guide vous explique comment transformer le site statique que nous avons créé en un thème WordPress fonctionnel. Ce processus est manuel mais a été grandement simplifié grâce à la préparation du code.

## Étape 0 : Prérequis - Générer le site statique

Avant de commencer, assurez-vous d'avoir la version HTML/CSS pure de votre site. Pour cela, exécutez la commande suivante à la racine de votre projet :

```bash
npm run build
```

Cela créera un dossier `out/` qui contient tous vos fichiers `.html`, ainsi que les assets (CSS, JS, images). C'est ce dossier que nous utiliserons comme source.

---

## Étape 1 : Créer la structure de base du thème

1.  Allez dans le dossier d'installation de WordPress, puis dans `wp-content/themes/`.
2.  Créez un nouveau dossier pour votre thème : `vylscapital-theme`.
3.  Ouvrez ce dossier. Nous allons y créer les fichiers essentiels.

#### A. Fichier `style.css` (Obligatoire)

Ce fichier donne à WordPress les informations sur votre thème.

1.  Créez un fichier `style.css` dans `vylscapital-theme/`.
2.  Collez-y ce bloc de commentaire :

    ```css
    /*
    Theme Name: VylsCapital Theme
    Author: Votre Nom
    Description: Thème sur mesure pour le site VylsCapital, basé sur un design statique.
    Version: 1.0
    */
    ```

3.  Maintenant, ouvrez le fichier CSS de votre site statique, qui se trouve dans `out/_next/static/css/`. Il aura un nom complexe, comme `a1b2c3d4e5f6.css`. Ouvrez-le.
4.  Copiez **tout le contenu** de ce fichier CSS et collez-le dans votre `style.css`, juste **après** le bloc de commentaire.

#### B. Fichier `functions.php`

Ce fichier permet de charger les styles et les scripts.

1.  Créez un fichier `functions.php` dans votre dossier de thème.
2.  Collez-y le code PHP suivant. Ce code dit à WordPress de charger votre fichier `style.css` et les polices Google Fonts.

    ```php
    <?php
    function vylscapital_enqueue_styles() {
        // Charger le fichier CSS principal
        wp_enqueue_style('vylscapital-main-style', get_stylesheet_uri());

        // Charger Google Fonts
        wp_enqueue_style('vylscapital-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), null);
    }
    add_action('wp_enqueue_scripts', 'vylscapital_enqueue_styles');
    ?>
    ```

#### C. Fichier `index.php`

C'est le modèle par défaut si aucun autre n'est trouvé.

1.  Créez un fichier `index.php`.
2.  Collez-y ce code de base. Il sera utilisé pour afficher les articles de blog par défaut.

    ```php
    <?php get_header(); ?>

    <main class="container mx-auto py-12">
        <h1><?php the_archive_title(); ?></h1>
        <?php if (have_posts()) : ?>
            <?php while (have_posts()) : the_post(); ?>
                <article>
                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    <div><?php the_excerpt(); ?></div>
                </article>
            <?php endwhile; ?>
        <?php else : ?>
            <p>Aucun article trouvé.</p>
        <?php endif; ?>
    </main>

    <?php get_footer(); ?>
    ```

À ce stade, vous pouvez aller dans **Apparence > Thèmes** dans votre admin WordPress et activer "VylsCapital Theme". Le site sera moche, mais c'est normal. On passe à la suite.

---

## Étape 2 : Créer l'en-tête (`header.php`) et le pied de page (`footer.php`)

Ce sont les parties réutilisables de votre site.

#### A. Fichier `header.php`

1.  Créez le fichier `header.php`.
2.  Ouvrez le fichier HTML de votre page d'accueil : `out/index.html`.
3.  Copiez tout le code depuis `<!DOCTYPE html>` jusqu'à la fin de la balise `<header>`.
4.  Collez ce code dans `header.php`.
5.  Faites les remplacements PHP suivants :
    *   Remplacez `<html lang="fr">` par `<html <?php language_attributes(); ?>>`.
    *   Remplacez le contenu de la balise `<title>` par `<title><?php wp_title('|', true, 'right'); ?></title>`.
    *   Juste avant la balise `</head>`, ajoutez `<?php wp_head(); ?>`.
    *   Juste après la balise `<body>`, ajoutez `<?php wp_body_open(); ?>`.
    *   **IMPORTANT :** Pour l'instant, laissez le menu de navigation en HTML. Vous le remplacerez plus tard par `<?php wp_nav_menu(); ?>` après l'avoir configuré dans l'admin WordPress.

#### B. Fichier `footer.php`

1.  Créez le fichier `footer.php`.
2.  Ouvrez à nouveau `out/index.html`.
3.  Copiez tout le code depuis le début de la balise `<footer>` jusqu'à la fin du fichier (`</html>`).
4.  Collez ce code dans `footer.php`.
5.  Juste avant la balise `</body>`, ajoutez `<?php wp_footer(); ?>`.

---

## Étape 3 : Créer le modèle de la page d'accueil

1.  Créez un fichier `front-page.php`.
2.  Au début du fichier, ajoutez : `<?php get_header(); ?>`.
3.  Ouvrez `out/index.html`. Copiez tout le contenu qui se trouve **entre** la balise `</header>` et la balise `<footer>`.
4.  Collez ce contenu dans `front-page.php`, après la ligne `get_header()`.
5.  À la toute fin du fichier, ajoutez : `<?php get_footer(); ?>`.

Maintenant, si vous visitez votre site WordPress, votre page d'accueil devrait s'afficher correctement !

---

## Prochaines étapes

Vous avez maintenant la base. Le processus pour les autres pages est similaire :
1.  **Pour la page "À Propos" :**
    *   Créez la page "À Propos" dans l'admin WordPress.
    *   Créez un fichier `page-a-propos.php` dans votre thème.
    *   Copiez-collez le contenu de `out/a-propos.html` entre `get_header()` et `get_footer()`.
2.  **Pour le blog :**
    *   Créez un fichier `single.php` pour l'affichage d'un article.
    *   Utilisez le HTML de `out/blog/5-strategies...html` comme modèle.
    *   Remplacez les titres/contenus statiques par les fonctions WordPress : `<?php the_title(); ?>`, `<?php the_content(); ?>`.
3.  **Pour les formulaires :**
    *   Installez un plugin comme **Contact Form 7**.
    *   Créez vos formulaires dans l'interface du plugin.
    *   Collez le shortcode du plugin (ex: `[contact-form-7 id="123"]`) dans l'éditeur de la page WordPress correspondante.

Ce guide devrait vous donner un excellent point de départ. Bon courage !
