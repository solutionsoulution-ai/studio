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
                Simulez votre prêt puis remplissez le formulaire pour soumettre votre demande. C'est simple, rapide et sécurisé.
            </p>
        </div>

        <section class="mb-12">
            <div id="calculator-root">
                <!-- Le calculateur React sera monté ici. Assurez-vous que le script `calculator.js` est bien chargé sur cette page via functions.php -->
                <p class="text-center text-muted-foreground">Chargement du calculateur...</p>
            </div>
        </section>
        
        <!--
        INSTRUCTIONS POUR LE FORMULAIRE CI-DESSOUS :
        1. Installez un plugin de formulaire (ex: WPForms, Contact Form 7).
        2. Créez un formulaire dans le plugin avec les champs correspondants (Type de prêt, Montant, Durée, Prénom, Nom, etc.).
        3. Configurez le formulaire pour qu'il vous envoie un e-mail à la soumission.
        4. Remplacez tout le contenu de la balise <form> ci-dessous par le shortcode fourni par votre plugin. Par exemple : <?php echo do_shortcode('[wpforms id="123"]'); ?>
        -->
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
