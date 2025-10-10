<?php
/**
 * Template Name: Page - Demande de Prêt
 *
 * @package capfinfy
 */

get_header();
?>

<main class="flex-1">
    <div class="container mx-auto py-12 md:py-24 px-4">
        <div class="mx-auto max-w-3xl">
           <div class="text-center mb-10">
                <h1 class="text-3xl md:text-4xl font-bold tracking-tight font-headline">Demande de Financement</h1>
                <p class="mt-4 text-lg text-muted-foreground">
                    Remplissez le formulaire pour soumettre votre demande. C'est simple, rapide et sécurisé.
                </p>
            </div>
            
            <div class="mt-12 rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
                <?php
                /**
                 * INSTRUCTION POUR LE FORMULAIRE DE DEMANDE :
                 * 1. Installez les plugins "Contact Form 7" et "WP Mail SMTP".
                 * 2. Créez votre formulaire de demande de prêt dans "Contact Form 7".
                 * 3. Copiez le shortcode du formulaire (ex: [contact-form-7 id="456" title="Demande de prêt"]).
                 * 4. Remplacez ce bloc de commentaire PHP par la ligne suivante, en adaptant le shortcode :
                 *    echo do_shortcode('[VOTRE_SHORTCODE_ICI]');
                 */
                echo '<p class="text-center text-red-500 font-bold">NOTE : Le plugin "Contact Form 7" est requis. Veuillez remplacer ce code par le shortcode de votre formulaire.</p>';
                ?>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
?>
