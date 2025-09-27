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
// if (!is_user_logged_in()) { auth_redirect(); }

get_header();
?>

<style>
/* 
    Ces styles garantissent que l'iframe remplit tout l'espace disponible
    pour une intégration transparente.
*/
body.page-template-template-banque-tableau-de-bord {
    overflow: hidden; /* Empêche le défilement de la page WordPress elle-même */
}
body.page-template-template-banque-tableau-de-bord #wpadminbar {
    position: relative; /* Assure que la barre d'admin reste visible */
    z-index: 100000;
}
body.page-template-template-banque-tableau-de-bord .iframe-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 32px; /* Laisse de la place pour la barre d'admin si elle est présente */
}
@media screen and (max-width: 782px) {
    body.page-template-template-banque-tableau-de-bord .iframe-container {
        padding-top: 46px;
    }
}
body:not(.admin-bar) .iframe-container {
    padding-top: 0;
}
</style>

<div class="iframe-container">
    <!-- 
    ====================================================================================================
    INSTRUCTIONS POUR L'INTÉGRATION
    ====================================================================================================
    
    1.  DÉPLOYEZ VOTRE APPLICATION BANCAIRE :
        Hébergez votre application (Next.js, React, etc.) sur un service comme Vercel, Netlify,
        ou votre propre serveur. Vous obtiendrez une URL publique (ex: https://mon-app-bancaire.com).

    2.  MODIFIEZ L'URL CI-DESSOUS :
        Remplacez "https://METTRE_VOTRE_LIEN_ICI.com" par l'URL réelle de votre application.
    
    ====================================================================================================
    -->
    <iframe 
        src="https://METTRE_VOTRE_LIEN_ICI.com"
        class="w-full h-full border-0"
        title="Application Bancaire VylsFond"
        allow="fullscreen"
    >
        Votre navigateur ne supporte pas les iframes. Veuillez le mettre à jour pour accéder à votre espace client.
    </iframe>
</div>

<?php
// On n'inclut pas le footer standard pour une intégration en plein écran.
// get_footer(); 
?>
