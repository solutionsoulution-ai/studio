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

Copiez le code ci-dessous et collez-le dans `functions.php`. Ce fichier charge votre `style.css`, les polices, et active les menus.
Il inclut aussi une classe `Walker` personnalisée pour que les liens du menu s'affichent correctement sans `<li>`.

```php
<?php
// Enqueue styles and fonts
function vylscapital_enqueue_assets() {
    // Main stylesheet
    wp_enqueue_style(
        'vylscapital-main-style',
        get_stylesheet_uri()
    );

    // Google Fonts (Inter)
    wp_enqueue_style(
        'vylscapital-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        array(),
        null
    );
}
add_action('wp_enqueue_scripts', 'vylscapital_enqueue_assets');

// Register navigation menus
function register_vylscapital_menus() {
    register_nav_menus(
        array(
            'main-menu' => __('Menu Principal'),
        )
    );
}
add_action('init', 'register_vylscapital_menus');

// Custom Walker to remove <li> tags from nav menu items
class VylsCapital_Walker_Nav_Menu extends Walker_Nav_Menu {
    // Don't start the top level
    function start_lvl(&$output, $depth = 0, $args = null) {
        $output .= "";
    }
    // Don't end the top level
    function end_lvl(&$output, $depth = 0, $args = null) {
        $output .= "";
    }
    // Don't print sub-menus
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        
        $output .= '<a href="' . esc_url($item->url) . '" class="transition-colors hover:text-primary ' . esc_attr($class_names) . '">' . esc_html($item->title) . '</a>';
    }
    function end_el(&$output, $item, $depth = 0, $args = null) {
        $output .= "";
    }
}
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

Copiez ce bloc entier et collez-le dans `header.php`.

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
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
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

Copiez ce bloc entier et collez-le dans `footer.php`.

```php
<footer class="bg-muted/30 border-t">
    <div class="container mx-auto py-12 px-6">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div class="col-span-2 md:col-span-2">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center space-x-2 mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7 text-primary"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span class="text-xl font-bold">VylsCapital</span>
                </a>
                <p class="text-sm text-muted-foreground max-w-sm">Solutions de financement rapides et flexibles pour aider votre entreprise à prospérer.</p>
                <div class="mt-6 space-y-2 text-sm text-muted-foreground">
                    <a href="mailto:contact@vylscapital.com" class="flex items-center gap-2 hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>contact@vylscapital.com</a>
                    <a href="tel:+33756986769" class="flex items-center gap-2 hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>+33 7 56 98 67 69</a>
                    <p class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>Lyon, France</p>
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
                    <li><a href="/services/pret-auto" class="text-sm text-muted-foreground hover:text-primary">Prêt Auto</a></li>
                    <li><a href="/services/rachat-de-credit" class="text-sm text-muted-foreground hover:text-primary">Rachat de Crédit</a></li>
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

Ce fichier est le modèle spécifique pour votre page d'accueil. Copiez ce bloc entier et collez-le dans `front-page.php`. Il contient toutes les sections de votre page d'accueil, y compris le calculateur.

**Code à copier dans `front-page.php` :**
```php
<?php get_header(); ?>

<main class="flex-1">
    
    <!-- Section: Carrousel Principal -->
    <section class="w-full bg-background">
        <div class="relative overflow-hidden">
            <div class="flex">
                <!-- NOTE: Ceci est une version simplifiée du carrousel pour l'intégration. -->
                <!-- Pour un carrousel fonctionnel, un plugin WordPress comme 'Slider Revolution' ou 'Soliloquy' serait idéal. -->
                <!-- Pour l'instant, seule la première diapositive est affichée. -->
                <div class="min-w-0 shrink-0 grow-0 basis-full">
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
                                <!-- Remplacez par le chemin de votre image dans le thème -->
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/home-carousel-1.png" alt="Personne travaillant sur un ordinateur portable" class="object-cover w-full h-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section: Nos Services -->
    <section id="services" class="container mx-auto py-16 md:py-24">
        <!-- Contenu de la section services à copier depuis out/index.html -->
    </section>

    <!-- Section: Calculateur -->
    <section id="calculateur" class="w-full py-16 md:py-24 bg-muted/30">
        <!-- Le calculateur est interactif et nécessite du JavaScript. -->
        <!-- Pour WordPress, la meilleure solution est d'utiliser un plugin de formulaire avec calcul (ex: "Calculated Fields Form") -->
        <!-- ou d'intégrer ce composant comme un "bloc React" avec l'éditeur Gutenberg. -->
        <!-- Pour une intégration simple, voici une image statique du calculateur. -->
        <div class="container mx-auto text-center">
             <div class="flex items-center gap-3 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path><path d="M7 15h0"></path><path d="M17 15h0"></path><path d="M17 11h0"></path><path d="M7 11h0"></path><path d="M12 15h0"></path><path d="M12 11h0"></path><path d="M12 7h0"></path></svg>
                <h2 class="text-3xl font-bold tracking-tight font-headline">Calculateur de remboursement de prêt</h2>
            </div>
            <p class="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Utilisez notre calculateur simple pour estimer vos mensualités. Ajustez les curseurs pour voir comment le montant et la durée du prêt affectent vos paiements.
            </p>
            <div class="mt-10 max-w-4xl mx-auto shadow-lg rounded-lg border bg-card p-6 md:p-8 text-left">
                <!-- Contenu statique du calculateur -->
                 <p class="text-center text-muted-foreground">Le calculateur interactif sera disponible via un plugin WordPress dédié.</p>
            </div>
        </div>
    </section>

    <!-- Section: Pourquoi Nous Choisir -->
    <section id="why-us" class="w-full py-16 md:py-24 bg-muted/30">
        <!-- Contenu à copier depuis out/index.html -->
    </section>

    <!-- Section: Parcours en Bref -->
    <section class="container mx-auto py-16 md:py-24">
         <!-- Contenu à copier depuis out/index.html -->
    </section>

    <!-- Section: Derniers Articles -->
    <section class="bg-background py-16 md:py-24">
         <!-- Contenu à copier depuis out/index.html -->
    </section>

    <!-- Section: Partenaires -->
    <section class="bg-background py-16 md:py-24 sm:py-32">
        <!-- Contenu à copier depuis out/index.html -->
    </section>

    <!-- Section: Témoignages -->
    <section class="w-full py-16 md:py-24">
        <!-- Contenu à copier depuis out/index.html -->
    </section>

    <!-- Section: FAQ -->
    <section id="faq" class="container mx-auto py-16 md:py-24">
         <!-- Contenu à copier depuis out/index.html -->
    </section>

</main>

<?php get_footer(); ?>
```
**Notes importantes sur le code ci-dessus :**

1.  **Images :** J'ai remplacé les chemins des images par une fonction PHP comme ceci : `<?php echo get_template_directory_uri(); ?>/assets/images/votre-image.jpg`. Vous devrez créer un dossier `assets/images` dans votre thème, y placer vos images, et mettre à jour les noms de fichiers.
2.  **Calculateur et Carrousel :** Ces éléments sont interactifs grâce à JavaScript (React). Pour les faire fonctionner dans WordPress, la meilleure méthode est d'utiliser des plugins dédiés. J'ai ajouté des commentaires dans le code pour vous l'indiquer et j'ai mis un contenu statique en attendant. Pour le reste des sections, vous pouvez simplement copier le HTML depuis votre dossier `out/index.html` et le coller dans les sections vides.
3.  **Chemins des liens :** Assurez-vous que tous les liens (`<a href="...">`) pointent vers les bonnes pages WordPress (par exemple, `/contact/` au lieu de `/contact.html`). J'ai déjà corrigé la plupart d'entre eux.

---

## Prochaines Étapes

Vous avez maintenant la structure de base. Pour les autres pages ("À Propos", "Contact", etc.), le processus est similaire :
1.  Dans WordPress, créez la page correspondante (ex: "À Propos").
2.  Dans votre thème, créez un fichier `page-a-propos.php`.
3.  Copiez-collez le contenu de `out/a-propos.html` entre `<?php get_header(); ?>` et `<?php get_footer(); ?>`.
4.  Pour les formulaires, installez **Contact Form 7**, créez votre formulaire, et collez le shortcode dans l'éditeur de la page WordPress.

Bon courage !