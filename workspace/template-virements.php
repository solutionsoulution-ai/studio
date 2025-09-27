<?php
/**
 * Template Name: Banque - Virements
 *
 * @package vyls
 */

// Sécurité de base : redirige si l'utilisateur n'est pas connecté
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

get_header();
?>

<main class="flex-1">
    <div class="container mx-auto py-12 px-4 max-w-2xl">
        <h1 class="text-3xl font-bold font-headline mb-8">Effectuer un Virement</h1>

        <!--
        ====================================================================================================
        INSTRUCTIONS POUR L'ADMINISTRATEUR
        ====================================================================================================
        
        Ce formulaire est une maquette pour la banque fictive. Il ne réalise PAS de vraies transactions.
        Pour que les clients puissent vous soumettre une "demande de virement", vous pouvez utiliser un plugin de formulaire comme WPForms.

        1. INSTALLEZ WPFORMS :
           - Dans votre admin WordPress : "Extensions" > "Ajouter" > Recherchez, installez et activez "WPForms".

        2. CRÉEZ LE FORMULAIRE DANS WPFORMS :
           - Allez dans le menu "WPForms" et créez un nouveau formulaire.
           - Recréez les champs ci-dessous :
             - Nom du bénéficiaire -> Champ "Texte"
             - IBAN du bénéficiaire -> Champ "Texte"
             - Montant (€) -> Champ "Nombre"
             - Motif du virement -> Champ "Texte"
           - Dans "Réglages" > "Notifications", mettez VOTRE adresse e-mail pour recevoir les demandes.
           - Dans "Réglages" > "Confirmation", vous pouvez afficher un message comme "Votre demande de virement a été prise en compte."
           - Enregistrez le formulaire.

        3. REMPLACEZ LE CODE CI-DESSOUS :
           - WPForms vous donnera un "shortcode" (ex: [wpforms id="456"]). Copiez-le.
           - Supprimez tout le bloc <div class="rounded-lg..."> qui se trouve juste en dessous (jusqu'au commentaire de fin).
           - À la place, collez votre shortcode comme ceci :
             <?php echo do_shortcode('[wpforms id="456"]'); ?>
        
        ====================================================================================================
        -->
        
        <!-- ▼▼▼ DÉBUT DU FORMULAIRE À REMPLACER PAR VOTRE SHORTCODE ▼▼▼ -->
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <form onsubmit="alert('Ceci est une simulation. Le formulaire doit être géré par un plugin WordPress pour fonctionner.'); return false;">
                <div class="p-6 space-y-4">
                    <div class="space-y-2">
                        <label for="beneficiary-name" class="text-sm font-medium">Nom du bénéficiaire</label>
                        <input id="beneficiary-name" type="text" placeholder="John Doe" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    </div>
                    <div class="space-y-2">
                        <label for="iban" class="text-sm font-medium">IBAN du bénéficiaire</label>
                        <input id="iban" type="text" placeholder="FR76..." required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label for="amount" class="text-sm font-medium">Montant (€)</label>
                            <input id="amount" type="number" placeholder="100.00" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        </div>
                        <div class="space-y-2">
                            <label for="reason" class="text-sm font-medium">Motif du virement</label>
                            <input id="reason" type="text" placeholder="Facture N°123" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        </div>
                    </div>
                </div>
                <div class="flex items-center p-6 border-t">
                    <button type="submit" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        Effectuer le virement
                    </button>
                </div>
            </form>
        </div>
        <!-- ▲▲▲ FIN DU FORMULAIRE À REMPLACER ▲▲▲ -->

    </div>
</main>

<?php
get_footer();
?>
