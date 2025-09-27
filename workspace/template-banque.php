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
            ====================================================================================================
            NOTE SUR LE FONCTIONNEMENT DE LA BANQUE EN LIGNE
            ====================================================================================================
            
            Cette div est le point d'entrée pour l'application de banque en ligne.
            Le fichier /build/static/js/banking.js va injecter ici une application React autonome.

            - Les données de connexion (identifiant, mot de passe) sont gérées par WordPress.
            - Les données bancaires (solde, transactions, RIB) sont des données d'exemple "en dur"
              directement dans le code de l'application React. Elles ne sont PAS stockées dans une base 
              de données et sont identiques pour tous les utilisateurs.

            Cette approche donne l'illusion d'une application fonctionnelle sans nécessiter de
            développement back-end complexe.
            
            ====================================================================================================
        -->
    </div>
</main>

<?php
get_footer();
?>
