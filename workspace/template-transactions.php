<?php
/**
 * Template Name: Banque - Transactions
 *
 * @package vyls
 */

if (!is_user_logged_in()) {
    auth_redirect();
}

get_header();

// NOTE POUR L'ADMINISTRATEUR DU SITE
// Ceci est un modèle statique. Pour simuler un historique de transactions,
// vous pouvez décommenter le bloc de transactions ci-dessous et modifier
// les valeurs (dates, descriptions, montants) directement dans l'éditeur
// de WordPress pour chaque client.

$transactions = [
    // Décommentez et personnalisez ce tableau pour afficher des transactions
    /*
    [ 'date' => '15 Juil. 2024', 'description' => 'Virement entrant - Salaire', 'amount' => 2850.75, 'type' => 'credit' ],
    [ 'date' => '14 Juil. 2024', 'description' => 'Prélèvement - Loyer', 'amount' => -850.00, 'type' => 'debit' ],
    [ 'date' => '12 Juil. 2024', 'description' => 'Paiement CB - Supermarché', 'amount' => -78.45, 'type' => 'debit' ],
    */
];
?>

<main class="flex-1">
    <div class="container mx-auto py-12 px-4">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold font-headline">Historique des Transactions</h1>
        </div>

        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <table class="w-full caption-bottom text-sm">
                <thead class="[&_tr]:border-b">
                    <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-1/4">Date</th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-1/2">Description</th>
                        <th class="h-12 px-4 text-right align-middle font-medium text-muted-foreground w-1/4">Montant</th>
                    </tr>
                </thead>
                <tbody class="[&_tr:last-child]:border-0">
                    <?php if (empty($transactions)): ?>
                        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td colspan="3" class="p-4 align-middle h-48 text-center text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                                Aucune transaction à afficher pour le moment.
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($transactions as $transaction): ?>
                            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <td class="p-4 align-middle font-medium"><?php echo esc_html($transaction['date']); ?></td>
                                <td class="p-4 align-middle"><?php echo esc_html($transaction['description']); ?></td>
                                <td class="p-4 align-middle font-semibold text-right <?php echo ($transaction['type'] === 'credit') ? 'text-green-600' : 'text-slate-800'; ?>">
                                    <span class="flex items-center justify-end gap-2">
                                        <?php if ($transaction['type'] === 'credit'): ?>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-green-500" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/></svg>
                                        <?php else: ?>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-slate-400" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg>
                                        <?php endif; ?>
                                        <?php echo number_format($transaction['amount'], 2, ',', ' '); ?> €
                                    </span>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</main>

<?php
get_footer();
?>
