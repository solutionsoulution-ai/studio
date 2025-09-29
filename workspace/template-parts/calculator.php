<?php
$args = get_query_var('calculator_args', [
    'title' => 'Calculateur de remboursement de prêt',
    'description' => "Utilisez notre calculateur simple pour estimer vos mensualités.",
    'default_amount' => 50000,
    'max_amount' => 500000,
    'default_term' => 60,
    'max_term' => 360,
]);
?>
<div class="loan-calculator container mx-auto">
    <div class="mx-auto max-w-3xl text-center">
        <div class="flex items-center gap-3 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M7 11h10"/><path d="M7 15h2"/><path d="M15 15h2"/></svg>
            <h2 class="text-3xl font-bold tracking-tight font-headline"><?php echo esc_html($args['title']); ?></h2>
        </div>
        <p class="mt-4 text-lg text-muted-foreground">
            <?php echo esc_html($args['description']); ?>
        </p>
    </div>

    <div class="mt-10 max-w-4xl mx-auto shadow-lg rounded-lg border bg-card text-card-foreground">
        <div class="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            <div class="space-y-8">
                <div>
                    <label for="loanAmount" class="text-lg">Montant du prêt</label>
                    <p class="text-2xl font-bold text-primary loan-amount-value"><?php echo number_format($args['default_amount'], 0, ',', ' '); ?> €</p>
                    <input type="range" class="loan-amount-slider w-full mt-2" min="1000" max="<?php echo esc_attr($args['max_amount']); ?>" step="1000" value="<?php echo esc_attr($args['default_amount']); ?>">
                </div>
                <div>
                    <label for="loanTerm" class="text-lg">Durée du prêt (Mois)</label>
                    <p class="text-2xl font-bold text-primary loan-term-value"><?php echo esc_html($args['default_term']); ?> Mois</p>
                    <input type="range" class="loan-term-slider w-full mt-2" min="12" max="<?php echo esc_attr($args['max_term']); ?>" step="1" value="<?php echo esc_attr($args['default_term']); ?>">
                </div>
                <div class="p-4 rounded-md bg-secondary/50">
                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-primary"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                         <div>
                            <label class="text-lg">Taux d'intérêt fixe</label>
                            <p class="text-2xl font-bold text-primary">2%</p>
                         </div>
                    </div>
                </div>
            </div>

            <div class="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col items-center justify-center text-center">
                <p class="text-lg font-medium opacity-80">Paiement mensuel estimé</p>
                <p class="text-5xl font-extrabold tracking-tight mt-2 monthly-payment-value">
                    ...
                </p>
                <p class="mt-4 opacity-80 text-sm">
                    Ceci est une estimation et ne constitue pas une offre de prêt.
                </p>
            </div>
        </div>
    </div>
</div>
