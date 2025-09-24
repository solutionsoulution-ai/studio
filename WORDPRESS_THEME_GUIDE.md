# Guide d'Intégration WordPress : Copier-Coller

Ce guide contient les blocs de code exacts dont vous avez besoin pour créer les fichiers de base de votre thème WordPress. Suivez les étapes dans l'ordre.

---

## Étape 0 : Prérequis - Générer le site statique

Avant toute chose, vous devez générer la version HTML/CSS pure de votre site. Exécutez la commande suivante à la racine de votre projet :

```bash
npm run build
```

Cela crée un dossier `out/` contenant tous vos fichiers `.html` et assets (CSS, JS, images). **Tous les extraits de code HTML ci-dessous proviennent de ces fichiers.**

---

## Étape 1 : Structure de base du thème

Allez dans le dossier `wp-content/themes/` de votre installation WordPress et créez un nouveau dossier `vylscapital-theme`. Tous les fichiers suivants seront créés à l'intérieur de ce dossier.

### A. Créez le fichier `style.css`

Copiez **tout** le contenu ci-dessous et collez-le dans votre fichier `style.css`.

**Tâche importante :** Vous devrez remplacer le commentaire `/* ... COLLEZ VOTRE CSS ICI ... */` par le contenu réel de votre fichier CSS généré, que vous trouverez dans `out/_next/static/css/`.

```css
/*
Theme Name: VylsCapital Theme
Author: Votre Nom
Description: Thème sur mesure pour le site VylsCapital.
Version: 1.0
*/

/* --- DÉBUT DU CSS - NE MODIFIEZ PAS CI-DESSOUS --- */
/* Après avoir lancé "npm run build", ouvrez le fichier CSS dans "out/_next/static/css/" */
/* Copiez TOUT son contenu et collez-le ici, en remplacement de ce commentaire. */
/* ... COLLEZ VOTRE CSS ICI ... */
/* --- FIN DU CSS --- */
```

### B. Créez le fichier `functions.php`

Copiez le code ci-dessous et collez-le dans `functions.php`. Ce fichier charge votre `style.css` et la police Google Fonts.

```php
<?php
function vylscapital_enqueue_styles() {
    // Charger le fichier CSS principal qui contient les styles du thème
    wp_enqueue_style(
        'vylscapital-main-style',
        get_stylesheet_uri()
    );

    // Charger Google Fonts (Inter)
    wp_enqueue_style(
        'vylscapital-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        array(),
        null
    );
}
add_action('wp_enqueue_scripts', 'vylscapital_enqueue_styles');

// Activer les menus de navigation
function register_vylscapital_menus() {
    register_nav_menus(
        array(
            'main-menu' => __('Menu Principal'),
        )
    );
}
add_action('init', 'register_vylscapital_menus');
?>
```

### C. Créez le fichier `index.php`

C'est le modèle de base qui sera utilisé pour la page du blog. Copiez et collez ce code dans `index.php`.

```php
<?php get_header(); ?>

<main class="container mx-auto py-16 md:py-24 px-4">
    <div class="text-center mb-16">
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight font-headline"><?php single_post_title(); ?></h1>
    </div>

    <?php if (have_posts()) : ?>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php while (have_posts()) : the_post(); ?>
                <article class="flex flex-col group hover:border-primary transition-all overflow-hidden border rounded-lg bg-card">
                    <a href="<?php the_permalink(); ?>" class="block">
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="relative h-56 w-full">
                                <!-- L'image à la une sera gérée ici -->
                                <?php the_post_thumbnail('full', ['class' => 'object-cover w-full h-full']); ?>
                            </div>
                        <?php endif; ?>
                    </a>
                    <div class="flex flex-col flex-grow p-6">
                        <header class="p-0">
                            <h2 class="text-xl leading-tight group-hover:text-primary transition-colors">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <p class="pt-2 text-sm text-muted-foreground"><?php echo get_the_date(); ?> &bull; <?php the_author(); ?></p>
                        </header>
                        <div class="p-0 pt-4 flex-grow">
                            <div class="text-muted-foreground"><?php the_excerpt(); ?></div>
                        </div>
                        <footer class="p-0 pt-6">
                            <a href="<?php the_permalink(); ?>" class="text-primary hover:underline">
                                Lire la suite &rarr;
                            </a>
                        </footer>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
    <?php else : ?>
        <p>Aucun article trouvé.</p>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
```

---

## Étape 2 : L'en-tête et le pied de page

Ces fichiers définissent les parties communes de votre site.

### A. Créez le fichier `header.php`

Ouvrez le fichier `out/index.html` (généré par `npm run build`). Copiez la partie supérieure du code comme indiqué, puis collez-la dans `header.php` et faites les remplacements demandés.

**Code à copier dans `header.php` :**
```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class('font-body antialiased'); ?>>
<?php wp_body_open(); ?>
<header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 max-w-screen-2xl items-center">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="mr-6 flex items-center space-x-2">
            <!-- Remplacez par votre logo si nécessaire -->
            <span class="font-bold sm:inline-block">VylsCapital</span>
        </a>
        <nav class="hidden lg:flex flex-1 items-center space-x-4 text-sm font-medium">
             <?php
                wp_nav_menu(array(
                    'theme_location' => 'main-menu',
                    'container' => false,
                    'items_wrap' => '%3$s', // Affiche les liens sans <ul>
                    'walker' => new VylsCapital_Walker_Nav_Menu()
                ));
            ?>
        </nav>
        <div class="flex flex-1 items-center justify-end space-x-2 md:flex-none lg:flex-1 lg:justify-end">
            <a href="/demande-de-pret" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Faire une demande</a>
            <!-- Le menu mobile sera géré par un plugin ou du JS custom si besoin -->
        </div>
    </div>
</header>
```

### B. Créez le fichier `footer.php`

Ouvrez `out/index.html`. Copiez la partie inférieure du code (tout ce qui est dans et après `<footer>`), puis collez-la dans `footer.php`.

**Code à copier dans `footer.php` :**
```php
<footer class="bg-muted/30 border-t">
    <div class="container mx-auto py-12 px-6">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div class="col-span-2 md:col-span-2">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center space-x-2 mb-4">
                    <span class="text-xl font-bold">VylsCapital</span>
                </a>
                <p class="text-sm text-muted-foreground max-w-sm">Solutions de financement rapides et flexibles pour aider votre entreprise à prospérer.</p>
                <div class="mt-6 space-y-2 text-sm text-muted-foreground">
                    <p class="flex items-center gap-2">contact@vylscapital.com</p>
                    <p class="flex items-center gap-2">+33 7 56 98 67 69</p>
                    <p class="flex items-center gap-2">Lyon, France</p>
                </div>
            </div>
            <div>
                <h3 class="font-semibold mb-4">Navigation</h3>
                <ul class="space-y-2">
                    <li><a href="/a-propos" class="text-sm text-muted-foreground hover:text-primary">À Propos</a></li>
                    <li><a href="/blog" class="text-sm text-muted-foreground hover:text-primary">Blog</a></li>
                    <li><a href="/#calculateur" class="text-sm text-muted-foreground hover:text-primary">Calculateur</a></li>
                    <li><a href="/#faq" class="text-sm text-muted-foreground hover:text-primary">FAQ</a></li>
                    <li><a href="/contact" class="text-sm text-muted-foreground hover:text-primary">Contact</a></li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold mb-4">Nos Services</h3>
                <ul class="space-y-2">
                    <li><a href="/services/pret-entreprise" class="text-sm text-muted-foreground hover:text-primary">Prêt Entreprise</a></li>
                    <li><a href="/services/pret-personnel" class="text-sm text-muted-foreground hover:text-primary">Prêt Personnel</a></li>
                    <li><a href="/services/pret-immo" class="text-sm text-muted-foreground hover:text-primary">Prêt Immobilier</a></li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold mb-4">Légal</h3>
                <ul class="space-y-2">
                    <li><a href="/politique-de-confidentialite" class="text-sm text-muted-foreground hover:text-primary">Politique de confidentialité</a></li>
                    <li><a href="/conditions-generales" class="text-sm text-muted-foreground hover:text-primary">Conditions d'utilisation</a></li>
                </ul>
            </div>
        </div>
        <div class="mt-12 border-t pt-6 text-center">
            <p class="text-sm text-muted-foreground">&copy; <?php echo date('Y'); ?> VylsCapital. Tous droits réservés.</p>
        </div>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
```

---

## Étape 3 : Créer la page d'accueil

### A. Créez le fichier `front-page.php`

Ce fichier est le modèle spécifique pour votre page d'accueil. Ouvrez `out/index.html` et copiez tout le contenu qui se trouve **entre** la balise `</header>` et la balise `<footer>`.

**Code à copier dans `front-page.php` :**
```php
<?php get_header(); ?>

<main class="flex-1">
    <!-- Le contenu de votre page d'accueil commence ici -->
    <!-- Collez ici tout le contenu de la balise <main> de votre fichier out/index.html -->
    
    <!-- Exemple de section (Carousel) : -->
    <section class="w-full bg-background">
      <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 items-center gap-8 py-12 md:py-24 min-h-[70dvh] md:min-h-[60dvh]">
              <div class="flex flex-col items-start text-center md:text-left">
                  <h1 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-headline">
                      Sécurisez l'avenir de votre entreprise
                  </h1>
                  <p class="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto md:mx-0">
                      VylsCapital fournit des solutions de financement rapides et flexibles pour aider votre entreprise à prospérer. Obtenez le capital dont vous avez besoin pour grandir.
                  </p>
                  <div class="mt-8 mx-auto md:mx-0">
                      <a href="/demande-de-pret" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8">Commencer ma demande</a>
                  </div>
              </div>
              <div class="relative h-64 md:h-96 w-full rounded-lg overflow-hidden order-first md:order-last">
                  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/home-carousel-1.png" alt="Personne travaillant sur un ordinateur portable" class="object-cover w-full h-full">
              </div>
          </div>
      </div>
    </section>

    <!-- Vous devez copier/coller TOUTES les autres sections de out/index.html ici -->
    <!-- (Services, Calculateur, Pourquoi nous choisir, etc.) -->

</main>

<?php get_footer(); ?>
```
**Note importante sur les images :** Dans le code ci-dessus, j'ai remplacé le chemin d'une image par un exemple PHP : `<?php echo get_template_directory_uri(); ?>/assets/images/votre-image.jpg`. Vous devrez créer un dossier `assets/images` dans votre thème, y placer vos images, et mettre à jour les chemins dans votre code HTML.

---

## Prochaines Étapes

Vous avez maintenant la structure de base. Pour les autres pages ("À Propos", "Contact", etc.), le processus est similaire :
1.  Dans WordPress, créez la page correspondante (ex: "À Propos").
2.  Dans votre thème, créez un fichier `page-a-propos.php`.
3.  Copiez-collez le contenu de `out/a-propos.html` entre `get_header()` et `get_footer()`.
4.  Pour les formulaires, installez **Contact Form 7**, créez votre formulaire, et collez le shortcode dans l'éditeur de la page WordPress.

Bon courage !
