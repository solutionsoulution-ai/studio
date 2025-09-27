<?php
/**
 * Template Name: Banque - Tableau de Bord
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
    <div class="container mx-auto py-12 px-4">
        <h1 class="text-3xl font-bold font-headline mb-8">Tableau de Bord</h1>

        <!-- NOTE POUR L'ADMINISTRATEUR DU SITE -->
        <!-- Les informations ci-dessous sont statiques (données d'exemple). Elles sont ici pour la démonstration visuelle. -->
        <!-- Pour un client spécifique, vous pouvez dupliquer ce modèle de page (Pages > Ajouter, puis choisir ce modèle), et modifier manuellement les valeurs ci-dessous dans l'éditeur de code de la page. -->
        <!-- Un développement WordPress personnalisé serait nécessaire pour rendre ces données dynamiques et les lier à chaque utilisateur. -->

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
                                <p class="text-xs text-muted-foreground">Solde au <?php echo date_i18n('j F Y'); ?></p>
                            </div>
                            <!-- MODIFIER ICI : RIB DU CLIENT (PARTIEL) -->
                            <div class="text-sm font-semibold text-primary">FR76 ... 1234</div>
                        </div>
                    </div>
                </div>

                <!-- Transactions Récentes -->
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div class="p-6 flex justify-between items-center">
                        <h3 class="text-lg font-semibold">Transactions Récentes</h3>
                        <a href="/transactions" class="text-sm font-medium text-primary hover:underline">Voir tout</a>
                    </div>
                    <div class="p-6 pt-0 text-center text-muted-foreground">
                        <p>Aucune transaction pour le moment.</p>
                    </div>
                </div>

            </div>

            <!-- Colonne latérale -->
            <div class="space-y-8">

                <!-- Actions Rapides -->
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div class="p-6"><h3 class="text-lg font-semibold">Actions Rapides</h3></div>
                    <div class="p-6 pt-0 space-y-4">
                        <a href="/virements" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 17 5-5-5-5"/><path d="M7 7v10h15"/></svg>
                           Faire un virement
                        </a>
                        <a href="/contact" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                           Aide et Support
                        </a>
                    </div>
                </div>

                <!-- Mes Prêts en cours -->
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div class="p-6"><h3 class="text-lg font-semibold">Mes Prêts en Cours</h3></div>
                    <div class="p-6 pt-0 space-y-6">
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="font-semibold flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Prêt Immobilier</span>
                                <!-- MODIFIER ICI : ID DU PRÊT -->
                                <span class="text-sm font-mono text-muted-foreground">#IMMO-789</span>
                            </div>
                            <!-- MODIFIER ICI : PROGRESSION (valeur de 0 à 100) et libellé aria-label -->
                            <div class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                                <div class="h-full w-full flex-1 bg-primary transition-transform" style="transform: translateX(-40%);"></div>
                            </div>
                            <div class="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                                <!-- MODIFIER ICI : REMBOURSEMENT -->
                                <span>150/300 mois</span>
                                <!-- MODIFIER ICI : MONTANT RESTANT -->
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
