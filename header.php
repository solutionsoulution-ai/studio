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
        <nav class="hidden lg:flex flex-1 items-center space-x-4 text-sm font-medium">
             <?php
                if ( has_nav_menu( 'main-menu' ) ) {
                    wp_nav_menu(array(
                        'theme_location' => 'main-menu',
                        'container' => false,
                        'items_wrap' => '%3$s', // Display links without ul
                        'walker' => new VylsFond_Walker_Nav_Menu_Desktop()
                    ));
                }
            ?>
        </nav>
        <div class="flex flex-1 items-center justify-end space-x-2 md:flex-none lg:flex-1 lg:justify-end">
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" class="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2">Espace Client</a>
            <a href="/demande-de-pret" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Faire une demande</a>
            
            <!-- Mobile Menu Button -->
            <div class="lg:hidden">
                <button data-mobile-menu-button aria-label="Ouvrir le menu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
        </div>
    </div>
    
    <!-- Mobile Menu Panel -->
    <div data-mobile-menu aria-expanded="false" class="lg:hidden fixed inset-0 z-50 transform -translate-x-full transition-transform duration-300 ease-in-out bg-background data-[expanded=true]:translate-x-0">
        <div class="flex h-full flex-col">
            <div class="flex items-center justify-between border-b p-4">
                <a href="<?php echo esc_url(home_url('/')); ?>" data-mobile-menu-close class="flex items-center space-x-2">
                    <span class="font-bold">VylsFond</span>
                </a>
                <button data-mobile-menu-close aria-label="Fermer le menu" class="p-2">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <nav class="flex flex-col space-y-4 p-4">
                 <a href="/demande-de-pret" data-mobile-menu-close class="text-lg font-medium transition-colors hover:text-primary">Faire une demande</a>
                 <a href="https://google.com" target="_blank" rel="noopener noreferrer" data-mobile-menu-close class="text-lg font-medium transition-colors hover:text-primary">Espace Client</a>
                 <p class="text-sm font-semibold text-muted-foreground pt-4">Menu</p>
                 <div class="flex flex-col space-y-4">
                    <?php
                        if ( has_nav_menu( 'main-menu' ) ) {
                            wp_nav_menu(array(
                                'theme_location' => 'main-menu',
                                'container' => false,
                                'items_wrap' => '%3$s', // No ul
                                'walker' => new VylsFond_Walker_Nav_Menu_Mobile() 
                            ));
                        }
                    ?>
                 </div>
            </nav>
        </div>
    </div>
</header>
