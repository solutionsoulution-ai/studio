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
                        <label class="text-sm font-medium leading-none mb-2 block">Votre nom complet</label>
                        <input type="text" name="nom_complet" placeholder="Votre nom complet" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block">Montant du Prêt (€)</label>
                        <input type="number" name="montant" placeholder="Montant du Prêt" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block">Durée de remboursement (mois)</label>
                        <input type="number" name="duree" placeholder="Durée de remboursement" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block">Votre Adresse Email</label>
                        <input type="email" name="email" placeholder="Votre Adresse Email" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block">Votre Numéro de Téléphone</label>
                        <input type="tel" name="telephone" placeholder="Votre Numéro de Téléphone" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block">Votre Pays</label>
                         <select name="pays" required class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="">Sélectionnez un pays</option>
                            <option value="Albanie">Albanie</option>
                            <option value="Allemagne">Allemagne</option>
                            <option value="Andorre">Andorre</option>
                            <option value="Autriche">Autriche</option>
                            <option value="Belgique">Belgique</option>
                            <option value="Biélorussie">Biélorussie</option>
                            <option value="Bosnie-Herzégovine">Bosnie-Herzégovine</option>
                            <option value="Bulgarie">Bulgarie</option>
                            <option value="Chypre">Chypre</option>
                            <option value="Croatie">Croatie</option>
                            <option value="Danemark">Danemark</option>
                            <option value="Espagne">Espagne</option>
                            <option value="Estonie">Estonie</option>
                            <option value="Finlande">Finlande</option>
                            <option value="France">France</option>
                            <option value="Grèce">Grèce</option>
                            <option value="Hongrie">Hongrie</option>
                            <option value="Irlande">Irlande</option>
                            <option value="Islande">Islande</option>
                            <option value="Italie">Italie</option>
                            <option value="Kosovo">Kosovo</option>
                            <option value="Lettonie">Lettonie</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lituanie">Lituanie</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macédoine du Nord">Macédoine du Nord</option>
                            <option value="Malte">Malte</option>
                            <option value="Moldavie">Moldavie</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Monténégro">Monténégro</option>
                            <option value="Norvège">Norvège</option>
                            <option value="Pays-Bas">Pays-Bas</option>
                            <option value="Pologne">Pologne</option>
                            <option value="Portugal">Portugal</option>
                            <option value="République tchèque">République tchèque</option>
                            <option value="Roumanie">Roumanie</option>
                            <option value="Royaume-Uni">Royaume-Uni</option>
                            <option value="Russie">Russie</option>
                            <option value="Saint-Marin">Saint-Marin</option>
                            <option value="Serbie">Serbie</option>
                            <option value="Slovaquie">Slovaquie</option>
                            <option value="Slovénie">Slovénie</option>
                            <option value="Suède">Suède</option>
                            <option value="Suisse">Suisse</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="Vatican">Vatican</option>
                        </select>
                    </div>
                     <div>
                        <label class="text-sm font-medium leading-none mb-2 block">Votre Profession</label>
                        <input type="text" name="profession" placeholder="Votre Profession" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block">Votre Revenu mensuel</label>
                        <input type="number" name="revenu" placeholder="Votre Revenu mensuel" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block">Motif de la demande</label>
                        <textarea name="motif" rows="4" placeholder="Motif de la demande" required class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base"></textarea>
                    </div>

                    <p class="text-xs text-muted-foreground text-center pt-4">En cliquant sur "Envoyer ma demande", vous confirmez que les informations fournies sont exactes et complètes, et vous acceptez nos conditions générales et notre politique de confidentialité.</p>
                    
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
