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
                <!-- NOTE: Ce formulaire doit être géré par un plugin de formulaires comme WPForms ou Contact Form 7 pour fonctionner. -->
                <!-- Le shortcode du plugin doit remplacer la balise <form> ci-dessous. -->
                <!-- Ex: <?php echo do_shortcode('[wpforms id="123"]'); ?> -->

                <form class="space-y-6" action="/merci-demande" method="post">
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block" for="nom_complet">Votre nom complet</label>
                        <input type="text" name="nom_complet" id="nom_complet" placeholder="Votre nom complet" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block" for="montant">Montant du Prêt (€)</label>
                        <input type="number" name="montant" id="montant" placeholder="Montant du Prêt" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block" for="duree">Durée de remboursement (mois)</label>
                        <input type="number" name="duree" id="duree" placeholder="Durée de remboursement" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block" for="email">Votre Adresse Email</label>
                        <input type="email" name="email" id="email" placeholder="Votre Adresse Email" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block" for="telephone">Votre Numéro de Téléphone</label>
                        <input type="tel" name="telephone" id="telephone" placeholder="Votre Numéro de Téléphone" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block" for="pays">Votre Pays</label>
                         <select name="pays" id="pays" required class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="">Sélectionnez un pays</option>
                             <option value="Albanie">Albanie</option>
                            <option value="Allemagne">Allemagne</option>
                            <!-- ... all other countries ... -->
                            <option value="Vatican">Vatican</option>
                        </select>
                    </div>
                     <div>
                        <label class="text-sm font-medium leading-none mb-2 block" for="profession">Votre Profession</label>
                        <input type="text" name="profession" id="profession" placeholder="Votre Profession" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block" for="revenu">Votre Revenu mensuel</label>
                        <input type="number" name="revenu" id="revenu" placeholder="Votre Revenu mensuel" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block" for="motif">Motif de la demande</label>
                        <textarea name="motif" id="motif" rows="4" placeholder="Motif de la demande" required class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base"></textarea>
                    </div>

                    <div class="pt-4 space-y-4">
                        <div class="flex items-start space-x-3">
                            <input type="checkbox" id="terms" name="terms" required class="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <div class="grid gap-1.5 leading-none">
                                <label for="terms" class="text-sm font-medium leading-none">J'accepte les termes et la politique de confidentialité.</label>
                                <p class="text-xs text-muted-foreground">
                                En soumettant ce formulaire, je consens à ce que Capfinfy collecte et traite mes données personnelles pour l'étude de ma demande de financement, conformément à la <a href="/politique-de-confidentialite" class="underline">Politique de Confidentialité</a>.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p class="text-xs text-muted-foreground text-center pt-2">Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</p>
                    
                    <button type="submit" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
                      Envoyer ma demande
                    </button>
                </form>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
?>
