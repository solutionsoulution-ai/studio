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
                 * INSTRUCTIONS POUR LE FORMULAIRE DE DEMANDE :
                 * 1. Installez le plugin "Contact Form 7".
                 * 2. Créez un formulaire de demande de prêt détaillé et copiez son shortcode.
                 * 3. Remplacez ce bloc de commentaire PHP par la ligne suivante, en adaptant le shortcode :
                 *    echo do_shortcode('[contact-form-7 id="VOTRE_ID" title="VOTRE_TITRE"]');
                 *
                 * IMPORTANT: Pour que l'envoi d'e-mails fonctionne, installez et configurez le plugin WP Mail SMTP
                 * avec les informations de votre fournisseur d'e-mails.
                 */
                 echo '<div class="text-center text-red-500 font-bold p-4">INSTRUCTION : Remplacez ce bloc par le shortcode de votre plugin de formulaire (ex: Contact Form 7).</div>';
                ?>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
?>
