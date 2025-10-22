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
                    Remplissez le formulaire pour soumettre votre demande. C'est simple et sécurisé.
                </p>
            </div>
            
            <div class="p-4 border rounded-lg bg-muted/50 mb-8">
                <div class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                    <div>
                        <h3 class="font-semibold text-foreground">Transparence et Sécurité</h3>
                        <p class="text-sm text-muted-foreground mt-1">
                            Les informations que vous nous confiez sont précieuses. Elles sont utilisées exclusivement pour l'étude de votre dossier de financement. Toutes vos données sont transmises de manière sécurisée (cryptage SSL) et stockées sur des serveurs en Europe, conformément au RGPD.
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="mt-12 rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
                <!-- Le formulaire React sera rendu ici. Cette partie PHP est juste un placeholder. -->
                <div id="loan-application-form-root"></div>
                 <!-- Vous devrez vous assurer que le JS de React est chargé sur cette page -->
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
?>
