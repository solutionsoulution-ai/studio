<?php
/**
 * Template Name: Banque - Transactions
 *
 * @package vyls
 */

get_header();
?>

<main class="flex-1 container mx-auto py-16 md:py-24 px-4">
    <div class="text-center">
        <h1 class="text-3xl font-bold font-headline mb-4">Transactions</h1>
        <p class="text-lg text-muted-foreground">La liste de vos transactions est disponible dans votre espace client principal.</p>
        <div class="mt-8">
            <a href="/espace-client" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Accéder à mon espace client
            </a>
        </div>
    </div>
</main>

<?php
get_footer();
?>
