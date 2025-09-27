<?php
/**
 * Template Name: Banque - Virements
 *
 * @package vyls
 */

if (!is_user_logged_in()) {
    auth_redirect();
}

get_header();

?>

<main class="flex-1">
    <div class="container mx-auto py-12 px-4 max-w-2xl">
        <h1 class="text-3xl font-bold font-headline mb-8">Effectuer un Virement</h1>

        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <!-- 
            NOTE POUR L'ADMINISTRATEUR DU SITE
            Ceci est une maquette de formulaire. Pour le rendre fonctionnel, vous devez utiliser
            un plugin comme WPForms ou Contact Form 7.
            1. Créez un formulaire avec les champs ci-dessous.
            2. Configurez les notifications pour envoyer les détails à votre email d'administration.
            3. Remplacez le contenu de la balise <form> par le shortcode de votre plugin.
               Ex: <?php echo do_shortcode('[wpforms id="789"]'); ?>
            La simulation de la barre de progression n'est pas incluse dans cette version PHP
            car elle est purement visuelle et gérée par JavaScript dans l'application autonome.
            -->
            <form>
                <div class="p-6"><h3 class="text-lg font-semibold leading-none tracking-tight">Détails du virement</h3></div>
                <div class="p-6 pt-0 space-y-4">
                    <div class="space-y-2">
                        <label for="beneficiary-name" class="text-sm font-medium">Nom du bénéficiaire</label>
                        <input id="beneficiary-name" placeholder="John Doe" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    </div>
                    <div class="space-y-2">
                        <label for="iban" class="text-sm font-medium">IBAN du bénéficiaire</label>
                        <input id="iban" placeholder="FR76..." required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label for="amount" class="text-sm font-medium">Montant (€)</label>
                            <input id="amount" type="number" placeholder="100.00" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        </div>
                        <div class="space-y-2">
                            <label for="reason" class="text-sm font-medium">Motif du virement</label>
                            <input id="reason" placeholder="Facture N°123" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        </div>
                    </div>
                </div>
                <div class="border-t p-6">
                    <button type="submit" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/></svg>
                        Effectuer le virement
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>

<?php
get_footer();
?>
