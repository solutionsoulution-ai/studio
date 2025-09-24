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
                Remplissez le formulaire ci-dessous pour soumettre votre demande. C'est simple, rapide et sécurisé.
            </p>
        </div>
        
        <!-- NOTE: Remplacez tout ce qui se trouve à l'intérieur de la balise <form> par le shortcode de votre plugin de formulaire (ex: [wpforms id="456"]) -->
        <form class="space-y-8">

            <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="flex flex-col space-y-1.5 p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">Informations sur le Prêt</h3><p class="text-sm text-muted-foreground">Décrivez le financement dont vous avez besoin.</p></div>
                <div class="p-6 pt-0 space-y-4">
                    <div>
                        <label class="text-sm font-medium leading-none mb-2 block">Type de Prêt</label>
                        <select required class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="">Sélectionnez le type de projet</option>
                            <option value="immobilier">Prêt Immobilier</option>
                            <option value="personnel">Prêt Personnel</option>
                        </select>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div><label class="text-sm font-medium leading-none mb-2 block">Montant souhaité (€)</label><input type="number" placeholder="ex: 50000" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                        <div><label class="text-sm font-medium leading-none mb-2 block">Durée de remboursement (mois)</label><input type="number" placeholder="ex: 120" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                    </div>
                </div>
            </div>

            <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="flex flex-col space-y-1.5 p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">Informations Personnelles</h3></div>
                <div class="p-6 pt-0 space-y-4">
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div><label class="text-sm font-medium leading-none mb-2 block">Prénom</label><input placeholder="Jean" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                        <div><label class="text-sm font-medium leading-none mb-2 block">Nom</label><input placeholder="Dupont" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                    </div>
                    <!-- ... Autres champs personnels ... -->
                </div>
            </div>
            
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="flex flex-col space-y-1.5 p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">Documents</h3></div>
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
