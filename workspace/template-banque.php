<?php
/**
 * Template Name: Banque - Application
 *
 * @package vyls
 */

// Sécurité : Redirige les utilisateurs non connectés vers la page de connexion de WordPress.
if (!is_user_logged_in()) {
    auth_redirect();
}

get_header();
?>

<main class="flex-1">
    <div id="banking-app-root" class="min-h-screen">
        <!-- 
            Cette div est le point d'entrée pour l'application de banque en ligne.
            Le fichier /build/static/js/banking.js sera chargé sur cette page
            et injectera l'interface complète de la banque (tableau de bord, transactions, etc.) ici.
            L'application est autonome et visuelle.
        -->
    </div>
</main>

<?php
get_footer();
?>
