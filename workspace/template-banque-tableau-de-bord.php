<?php
/**
 * Template Name: Banque - Tableau de Bord
 *
 * Ce modèle de page est conçu pour être un espace client protégé.
 *
 * @package vyls
 */

// Redirige les utilisateurs non connectés vers la page de connexion.
if ( ! is_user_logged_in() ) { 
    auth_redirect(); 
}

get_header();
?>

<main class="flex-1">
    <div class="container mx-auto py-16 md:py-24">
        <div class="text-center p-8 border rounded-lg bg-card max-w-2xl mx-auto">
            <h1 class="text-2xl font-bold mb-4">Bienvenue dans votre Espace Client</h1>
            <p class="text-muted-foreground mb-6">Cette section est en cours de développement.</p>
            <p class="text-sm text-muted-foreground">Dans une future version, vous pourrez consulter ici vos soldes, vos dernières transactions, et effectuer des virements.</p>
        </div>
    </div>
</main>

<?php
get_footer();
?>
