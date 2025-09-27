<?php
/**
 * Template Name: Banque - Tableau de Bord
 *
 * Ce modèle de page est conçu pour intégrer une application externe
 * via une iframe en plein écran.
 *
 * @package vyls
 */

// Optionnel: Décommentez la ligne suivante pour rendre cette page accessible uniquement aux utilisateurs connectés.
 if (!is_user_logged_in()) { auth_redirect(); }

get_header();
?>

<main class="flex-1">
    <div class="flex items-center justify-center h-[80vh]">
        <div class="text-center p-8">
            <h1 class="text-2xl font-bold mb-4">Espace Client</h1>
            <p class="text-muted-foreground mb-6">Cette page est un espace réservé. Vous pouvez la protéger avec un mot de passe via l'éditeur de page WordPress.</p>
            <p class="text-sm text-muted-foreground">Dans une version future, vous pourriez intégrer ici une application externe via une iframe ou utiliser des plugins pour afficher des informations client.</p>
        </div>
    </div>
</main>

<?php
get_footer();
?>
