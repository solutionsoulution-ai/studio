<?php
/**
 * Template Name: Banque - Transactions
 *
 * @package vyls
 */

// Sécurité de base : redirige si l'utilisateur n'est pas connecté
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url());
    exit;
}

get_header();
?>

<main class="flex-1">
    <div class="container mx-auto py-12 px-4">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold font-headline">Historique des Transactions</h1>
        </div>

        <!-- NOTE POUR L'ADMINISTRATEUR DU SITE -->
        <!-- Le contenu de ce tableau est statique. Il ne se mettra pas à jour automatiquement. -->
        <!-- Un développement WordPress personnalisé serait nécessaire pour le connecter à de vraies données. -->

        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="w-full overflow-auto">
                <table class="w-full caption-bottom text-sm">
                    <thead class="[&_tr]:border-b">
                        <tr class="border-b transition-colors hover:bg-muted/50">
                            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                            <th class="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Montant</th>
                        </tr>
                    </thead>
                    <tbody class="[&_tr:last-child]:border-0">
                        <!-- MODIFIER ICI : LISTE DES TRANSACTIONS -->
                        <tr>
                            <td class="p-4 align-middle"><?php echo date_i18n('j M Y', strtotime('-1 day')); ?></td>
                            <td class="p-4 align-middle font-medium">Paiement CB - Amazon.fr</td>
                            <td class="p-4 align-middle text-right font-medium">- 49,99 €</td>
                        </tr>
                         <tr class="bg-muted/50">
                            <td class="p-4 align-middle"><?php echo date_i18n('j M Y', strtotime('-2 days')); ?></td>
                            <td class="p-4 align-middle font-medium text-green-600">Virement - Salaire</td>
                            <td class="p-4 align-middle text-right font-medium text-green-600">+ 2,500.00 €</td>
                        </tr>
                        <tr>
                            <td class="p-4 align-middle"><?php echo date_i18n('j M Y', strtotime('-3 days')); ?></td>
                            <td class="p-4 align-middle font-medium">Prélèvement - Loyer</td>
                            <td class="p-4 align-middle text-right font-medium">- 850,00 €</td>
                        </tr>
                        <tr class="bg-muted/50">
                            <td class="p-4 align-middle"><?php echo date_i18n('j M Y', strtotime('-4 days')); ?></td>
                            <td class="p-4 align-middle font-medium">Paiement CB - Super U</td>
                            <td class="p-4 align-middle text-right font-medium">- 78,50 €</td>
                        </tr>
                        <tr>
                            <td class="p-4 align-middle"><?php echo date_i18n('j M Y', strtotime('-5 days')); ?></td>
                            <td class="p-4 align-middle font-medium">Virement à - John Doe</td>
                            <td class="p-4 align-middle text-right font-medium">- 100,00 €</td>
                        </tr>
                        <tr class="bg-muted/50">
                            <td class="p-4 align-middle"><?php echo date_i18n('j M Y', strtotime('-6 days')); ?></td>
                            <td class="p-4 align-middle font-medium">Paiement CB - SNCF</td>
                            <td class="p-4 align-middle text-right font-medium">- 124,00 €</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
?>
