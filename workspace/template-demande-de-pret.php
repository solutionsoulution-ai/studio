<?php
/**
 * Template Name: Page - Demande de Prêt
 *
 * @package vyls
 */

get_header();
?>

<main class="flex-1 container mx-auto py-12 md:py-24 px-4">
    <div class="mx-auto max-w-3xl">
       <div class="text-center mb-10">
            <h1 class="text-3xl md:text-4xl font-bold tracking-tight font-headline">Demande de Financement</h1>
            <p class="mt-4 text-lg text-muted-foreground">
                Remplissez le formulaire pour soumettre votre demande. C'est simple, rapide et sécurisé.
            </p>
        </div>
        
        <!--
        INSTRUCTIONS POUR LE FORMULAIRE CI-DESSOUS :
        1. Installez un plugin de formulaire (ex: WPForms, Contact Form 7).
        2. Créez un formulaire dans le plugin avec tous les champs listés ci-dessous.
        3. Configurez le formulaire pour qu'il vous envoie un e-mail à la soumission et redirige vers la page "Merci Demande".
        4. Remplacez tout le contenu de la balise <form> ci-dessous par le shortcode fourni par votre plugin. 
           Par exemple : <?php echo do_shortcode('[wpforms id="123"]'); ?>
        -->

        <div class="container mx-auto p-0 mb-10">
            <div class="max-w-4xl mx-auto shadow-lg rounded-lg border bg-card text-card-foreground">
                <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">Estimez vos mensualités</h3><p class="text-sm text-muted-foreground">Ceci est une simulation basée sur des valeurs d'exemple.</p></div>
                <div class="p-6 pt-0 grid md:grid-cols-2 gap-8">
                    <div class="space-y-8">
                        <div>
                            <label class="text-lg">Montant du prêt</label>
                            <p class="text-2xl font-bold text-primary">50.000 €</p>
                        </div>
                        <div>
                            <label class="text-lg">Durée du prêt (Mois)</label>
                            <p class="text-2xl font-bold text-primary">120 Mois</p>
                        </div>
                    </div>
                    <div class="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col items-center justify-center text-center">
                        <p class="text-lg font-medium opacity-80">Paiement mensuel estimé</p>
                        <p class="text-5xl font-extrabold tracking-tight mt-2">460 €</p>
                        <p class="mt-4 opacity-80 text-sm flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg> Taux fixe de 2%</p>
                    </div>
                </div>
            </div>
        </div>

        <form class="space-y-8">
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">1. Informations sur le Prêt</h3></div>
                <div class="p-6 pt-0 space-y-4">
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block">Type de Prêt</label>
                        <select required class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="">Sélectionnez le type de projet</option>
                            <option value="immobilier">Prêt Immobilier</option>
                            <option value="personnel">Prêt Personnel</option>
                            <option value="auto">Prêt Auto</option>
                            <option value="entreprise">Prêt Entreprise</option>
                            <option value="rachat">Rachat de Crédit</option>
                        </select>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div><label class="text-sm font-medium leading-none mb-2 block">Montant souhaité (€)</label><input type="number" placeholder="ex: 50000" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                        <div><label class="text-sm font-medium leading-none mb-2 block">Durée de remboursement (mois)</label><input type="number" placeholder="ex: 120" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                    </div>
                </div>
            </div>

             <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">2. Informations Personnelles</h3></div>
                <div class="p-6 pt-0 space-y-4">
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div><label class="text-sm font-medium leading-none mb-2 block">Prénom</label><input placeholder="Jean" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                        <div><label class="text-sm font-medium leading-none mb-2 block">Nom</label><input placeholder="Dupont" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div><label class="text-sm font-medium leading-none mb-2 block">Email</label><input type="email" placeholder="vous@exemple.com" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                        <div><label class="text-sm font-medium leading-none mb-2 block">Numéro WhatsApp</label><input type="tel" placeholder="0612345678" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                    </div>
                     <div>
                        <label class="text-sm font-medium leading-none mb-2 block">Date de naissance</label>
                        <div class="grid grid-cols-3 gap-2">
                            <div><input type="number" placeholder="Jour" required min="1" max="31" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                            <div><input type="number" placeholder="Mois" required min="1" max="12" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                            <div><input type="number" placeholder="Année" required min="1900" max="<?php echo date('Y') - 18; ?>" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">4. Documents</h3></div>
                <div class="p-6 pt-0 space-y-4">
                    <div><label class="text-sm font-medium leading-none mb-2 block">Pièce d'identité</label><input type="file" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                    <div><label class="text-sm font-medium leading-none mb-2 block">Justificatif de domicile</label><input type="file" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                </div>
            </div>
            
            <p class="text-xs text-muted-foreground text-center">En cliquant sur "Envoyer ma demande", vous acceptez nos conditions générales.</p>
            
            <button type="submit" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
              Envoyer ma demande
            </button>
        </form>
    </div>
</main>

<?php
get_footer();
?>
