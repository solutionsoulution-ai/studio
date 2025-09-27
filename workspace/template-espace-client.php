<?php
/**
 * Template Name: Espace Client (Iframe)
 *
 * @package vyls
 */

// Redirige l'utilisateur vers la page de connexion s'il n'est pas connecté.
if (!is_user_logged_in()) {
    auth_redirect();
}

get_header();
?>

<main class="flex-1">
    <div class="iframe-container h-full w-full">
        <!-- 
        ====================================================================================================
        INSTRUCTIONS POUR L'INTÉGRATION DE VOTRE APPLICATION EXTERNE
        ====================================================================================================
        
        Cette page est conçue pour afficher votre application bancaire externe dans une "iframe".
        Une iframe est comme une fenêtre de navigateur intégrée directement dans votre page WordPress.

        Pour que cela fonctionne :

        1. HÉBERGEZ VOTRE APPLICATION BANCAIRE :
           - Vous devez d'abord déployer votre application (conçue avec Next.js, React, Vue, etc.) sur un 
             service d'hébergement comme Vercel, Netlify, ou un serveur personnel. Vous obtiendrez une URL 
             publique (par exemple : https://mon-app-bancaire.vercel.app).

        2. MODIFIEZ L'URL CI-DESSOUS :
           - Dans la ligne `src="..."` de la balise `<iframe>` ci-dessous, remplacez 
             "https://votre-app-bancaire-externe.com" par l'URL réelle de votre application hébergée.

        3. STYLE PLEIN ÉCRAN :
           - Le fichier header.php contient des styles CSS spécifiques pour ce modèle de page afin que
             l'iframe prenne 100% de la hauteur et de la largeur de la fenêtre, sans barres de défilement
             gênantes, pour une intégration transparente.
        
        ====================================================================================================
        -->
        <iframe 
            src="https://votre-app-bancaire-externe.com"
            class="w-full h-full border-0"
            title="Application Bancaire VylsFond"
            allow="fullscreen"
        >
            Votre navigateur ne supporte pas les iframes.
        </iframe>
    </div>
</main>

<?php
get_footer();
?>
