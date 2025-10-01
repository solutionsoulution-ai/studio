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
    <?php wp_head(); ?>
</head>
<body <?php body_class('font-body antialiased'); ?>>
<?php wp_body_open(); ?>
<header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 max-w-screen-2xl items-center">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="mr-6 flex items-center space-x-2">
            <span class="font-bold sm:inline-block">VylsFond</span>
        </a>
        
        <!-- L'espace pour le menu est laissé vide pour être géré par un plugin -->
        <div class="flex-1"></div>

        <div class="flex items-center justify-end space-x-2">
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" class="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2">Espace Client</a>
            <a href="/demande-de-pret" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Faire une demande</a>
        </div>
    </div>
</header>
