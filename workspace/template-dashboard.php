<?php
/**
 * Template Name: Banque - Tableau de Bord
 *
 * @package vyls
 */

if (!is_user_logged_in()) {
    auth_redirect();
}

get_header();

// NOTE POUR L'ADMINISTRATEUR DU SITE
// Ceci est un modèle statique. Pour simuler des données différentes pour chaque client,
// vous pouvez dupliquer cette page dans WordPress pour chaque client et modifier les valeurs
// directement dans l'éditeur de WordPress.
// Exemple : changez "0,00 €" par un autre montant, ou modifiez les détails du prêt.

?>

<main class="flex-1">
    <div class="container mx-auto py-12 px-4">
        <h1 class="text-3xl font-bold font-headline mb-8">Tableau de Bord</h1>

        <div class="grid lg:grid-cols-3 gap-8">
            <!-- Colonne principale -->
            <div class="lg:col-span-2 space-y-8">
                <!-- Carte du Compte Courant -->
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div class="p-6">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="text-sm font-medium text-muted-foreground">Compte Courant</p>
                                <!-- MODIFIER ICI : SOLDE DU COMPTE -->
                                <p class="text-4xl font-bold tracking-tight">0,00 €</p>
                                <p class="text-xs text-muted-foreground">
                                    Solde au <?php echo date_i18n('j F Y'); ?>
                                </p>
                            </div>
                            <!-- MODIFIER ICI : RIB/IDENTIFIANT DU COMPTE -->
                            <div class="text-sm font-semibold text-primary">FR76 ... 1234</div>
                        </div>
                    </div>
                </div>

                <!-- Transactions Récentes -->
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div class="p-6 flex flex-row justify-between items-center">
                        <h3 class="text-lg font-semibold leading-none tracking-tight">Transactions Récentes</h3>
                        <a href="/transactions" class="text-sm font-medium text-primary hover:underline">Voir tout</a>
                    </div>
                    <div class="p-6 pt-0">
                        <!-- MODIFIER ICI : MESSAGE SI PAS DE TRANSACTIONS -->
                        <div class="text-center py-8 text-muted-foreground">
                            <p>Aucune transaction pour le moment.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Colonne latérale -->
            <div class="space-y-8">
                <!-- Actions Rapides -->
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div class="p-6"><h3 class="text-lg font-semibold leading-none tracking-tight">Actions Rapides</h3></div>
                    <div class="p-6 pt-0 space-y-4">
                        <a href="/virements" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/></svg>
                            Faire un virement
                        </a>
                        <a href="/contact" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-1.057 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/></svg>
                            Aide et Support
                        </a>
                    </div>
                </div>

                <!-- Mes Prêts en cours -->
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div class="p-6"><h3 class="text-lg font-semibold leading-none tracking-tight">Mes Prêts en Cours</h3></div>
                    <div class="p-6 pt-0 space-y-6">
                        <div>
                            <!-- MODIFIER ICI : DÉTAILS DU PRÊT -->
                            <div class="flex justify-between items-center mb-2">
                                <span class="font-semibold flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-primary" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L8.707 1.5Z"/><path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/></svg> Prêt Immobilier</span>
                                <span class="text-sm font-mono text-muted-foreground">#IMMO-789</span>
                            </div>
                            <div class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                                <!-- MODIFIER ICI : PROGRESSION DU REMBOURSEMENT (width en %) -->
                                <div class="h-full w-full flex-1 bg-primary transition-transform" style="transform: translateX(-40%);"></div>
                            </div>
                            <div class="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                                <!-- MODIFIER ICI : DURÉE ET MONTANT RESTANT -->
                                <span>180/300 mois</span>
                                <span class="font-semibold">125,450.12 € restants</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
?>
