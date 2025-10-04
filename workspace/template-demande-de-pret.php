<?php
/**
 * Template Name: Page - Demande de Prêt
 *
 * @package vyls
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

            <!-- 🔢 CALCULATEUR EN HAUT -->
            <div class="mb-10 p-6 bg-muted rounded-xl border">
                <h2 class="text-xl font-semibold mb-4 text-center">Simulateur de Mensualité</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label class="text-sm font-medium mb-2 block">Montant (€)</label>
                        <input type="number" id="calc-montant" min="1000" max="500000" value="150000" class="w-full h-10 px-3 rounded-md border border-input bg-background">
                    </div>
                    <div>
                        <label class="text-sm font-medium mb-2 block">Durée (mois)</label>
                        <input type="number" id="calc-duree" min="12" max="360" value="240" class="w-full h-10 px-3 rounded-md border border-input bg-background">
                    </div>
                    <div>
                        <label class="text-sm font-medium mb-2 block">Mensualité estimée</label>
                        <div id="calc-result" class="w-full h-10 flex items-center justify-center px-3 rounded-md bg-primary/10 text-primary font-semibold">
                            ... €
                        </div>
                    </div>
                </div>
                <p class="text-xs text-muted-foreground mt-2 text-center">
                    Taux fixe : <strong>2 % annuel</strong>
                </p>
            </div>

            <div class="mt-8 rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
                 <?php echo do_shortcode('[contact-form-7 id="VOTRE_ID_DEMANDE_ICI" title="Formulaire de Demande de Prêt"]'); ?>
            </div>
        </div>
    </div>
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // 🔢 Calculateur en temps réel
    function calculateMensualite() {
        const montantEl = document.getElementById('calc-montant');
        const dureeEl = document.getElementById('calc-duree');
        const resultEl = document.getElementById('calc-result');

        if (!montantEl || !dureeEl || !resultEl) return;

        const montant = parseFloat(montantEl.value) || 0;
        const duree = parseFloat(dureeEl.value) || 1;
        const tauxMensuel = 0.02 / 12;

        if (montant <= 0 || duree <= 0) {
            resultEl.textContent = '— €';
            return;
        }

        const numerateur = tauxMensuel * Math.pow(1 + tauxMensuel, duree);
        const denominateur = Math.pow(1 + tauxMensuel, duree) - 1;
        const mensualite = montant * (numerateur / denominateur);
        resultEl.textContent = mensualite.toFixed(2).replace('.', ',') + ' €';
    }

    // Synchronisation
    ['calc-montant', 'calc-duree'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', calculateMensualite);
    });

    // Calcul initial
    calculateMensualite();
});
</script>

<?php
get_footer();
?>