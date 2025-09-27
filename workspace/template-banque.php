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
    <div id="banking-app-root">
        <!-- 
            =========================================================================================
            POINT D'INJECTION DE L'APPLICATION REACT
            =========================================================================================
            
            Cette div est le point d'entrée unique pour notre application de banque en ligne.
            Le processus est le suivant :
            
            1. COMPILATION : Dans le projet Next.js, la commande `npm run build` compile toute 
               l'application bancaire (qui se trouve dans /src/app/banque/) en un seul 
               fichier JavaScript optimisé : /build/static/js/banking.js.

            2. INJECTION PHP : Le fichier `functions.php` de ce thème contient une logique qui
               détecte si un utilisateur est connecté et s'il visite une page utilisant ce
               template. Si c'est le cas, il charge le script `banking.js` dans la page.

            3. HYDRATATION REACT : Une fois chargé, le script `banking.js` s'exécute. Son rôle est
               de trouver cette div (grâce à son ID "banking-app-root") et d'y "dessiner" 
               l'interface interactive de l'application bancaire.

            4. INJECTION DE DONNÉES : `functions.php` utilise également `wp_localize_script` pour
               passer des données spécifiques à l'utilisateur (définies dans la "base de données"
               fictive) à l'application React. C'est ce qui permet d'afficher le bon solde, 
               les bonnes transactions, etc., pour chaque client.
            
            Cette approche "micro-frontend" permet de bénéficier de la puissance de React pour
            l'interface utilisateur tout en s'appuyant sur WordPress pour la gestion des
            utilisateurs et des pages.
            
            =========================================================================================
        -->
        <div class="flex items-center justify-center min-h-[50vh]">
            <p>Chargement de votre espace bancaire sécurisé...</p>
        </div>
    </div>
</main>

<?php
get_footer();
?>
