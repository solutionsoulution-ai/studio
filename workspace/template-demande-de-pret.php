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
                 * 1. Installez un plugin de formulaire (ex: WPForms).
                 * 2. Créez votre formulaire de demande de prêt dans le plugin.
                 * 3. Copiez le shortcode du formulaire (ex: [wpforms id="456"]).
                 * 4. Remplacez ce bloc de commentaire PHP par la ligne suivante, en adaptant le shortcode :
                 *    echo do_shortcode('[VOTRE_SHORTCODE_ICI]');
                 */
                echo '<p class="text-center text-red-500 font-bold">NOTE : Un plugin de formulaire (ex: WPForms) est requis. Veuillez remplacer le code dans ce template par le shortcode de votre formulaire.</p>';
                ?>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
?>
