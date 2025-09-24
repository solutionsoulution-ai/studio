<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <main>
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package vyls
 */

?>
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
