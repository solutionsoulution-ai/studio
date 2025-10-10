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
                <form class="space-y-6" action="" method="post">
                    <?php wp_nonce_field( 'capfinfy_loan_form' ); ?>
                    <input type="hidden" name="capfinfy_form_submission" value="loan_application">
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none mb-2 block" for="firstName">Prénom</label>
                            <input type="text" name="firstName" id="firstName" placeholder="Jean" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none mb-2 block" for="lastName">Nom</label>
                            <input type="text" name="lastName" id="lastName" placeholder="Dupont" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                        </div>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none mb-2 block" for="loanAmount">Montant du Prêt (€)</label>
                            <input type="number" name="loanAmount" id="loanAmount" placeholder="50000" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none mb-2 block" for="loanTerm">Durée (mois)</label>
                            <input type="number" name="loanTerm" id="loanTerm" placeholder="120" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                        </div>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none mb-2 block" for="email">Adresse Email</label>
                            <input type="email" name="email" id="email" placeholder="vous@exemple.com" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none mb-2 block" for="phone">Numéro de Téléphone</label>
                            <input type="tel" name="phone" id="phone" placeholder="+33 6 12 34 56 78" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                        </div>
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block" for="country">Pays de résidence</label>
                         <select name="country" id="country" required class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
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
                     <div class="grid sm:grid-cols-2 gap-4">
                         <div>
                            <label class="text-sm font-medium leading-none mb-2 block" for="profession">Profession</label>
                            <input type="text" name="profession" id="profession" placeholder="Développeur" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                        </div>
                         <div>
                            <label class="text-sm font-medium leading-none mb-2 block" for="income">Revenu mensuel net</label>
                            <input type="number" name="income" id="income" placeholder="3000" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                        </div>
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block" for="reason">Motif de la demande</label>
                        <textarea name="reason" id="reason" rows="4" placeholder="Décrivez brièvement votre projet (ex: Achat d'un véhicule, rénovation, etc.)" required class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base"></textarea>
                    </div>

                    <div class="pt-4 space-y-4">
                        <div class="flex items-start space-x-3">
                            <input type="checkbox" id="terms" name="terms" required class="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <div class="grid gap-1.5 leading-none">
                                <label for="terms" class="text-sm font-medium leading-none">J'accepte les termes et la politique de confidentialité.</label>
                                <p class="text-xs text-muted-foreground">
                                En soumettant ce formulaire, je consens à ce que Capfinfy collecte et traite mes données personnelles pour l'étude de ma demande de financement, conformément à la <a href="/politique-de-confidentialite" class="underline" target="_blank">Politique de Confidentialité</a>.
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
