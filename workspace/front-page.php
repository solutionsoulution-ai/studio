<?php
/**
 * The template for displaying the front page
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package vyls
 */

get_header();
?>

<main class="flex-1">
    
    <!-- Section: Carrousel Principal -->
    <section class="w-full bg-background">
        <div class="relative overflow-hidden">
            <div class="flex">
                <!-- NOTE: Ceci est une version simplifiée du carrousel pour l'intégration. -->
                <!-- Pour un carrousel fonctionnel, un plugin WordPress comme 'Slider Revolution' ou 'Soliloquy' serait idéal. -->
                <!-- Pour l'instant, seule la première diapositive est affichée. -->
                <div class="min-w-0 shrink-0 grow-0 basis-full">
                    <div class="container mx-auto px-4">
                        <div class="grid md:grid-cols-2 items-center gap-8 py-12 md:py-24 min-h-[70dvh] md:min-h-[60dvh]">
                            <div class="flex flex-col items-start text-center md:text-left">
                                <h1 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-headline">
                                    Sécurisez l'avenir de votre entreprise
                                </h1>
                                <p class="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto md:mx-0">
                                    VylsCapital fournit des solutions de financement rapides et flexibles pour aider votre entreprise à prospérer. Obtenez le capital dont vous avez besoin pour grandir.
                                </p>
                                <div class="mt-8 mx-auto md:mx-0">
                                    <a href="/demande-de-pret" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8">Commencer ma demande</a>
                                </div>
                            </div>
                            <div class="relative h-64 md:h-96 w-full rounded-lg overflow-hidden order-first md:order-last">
                                <!-- Important : Créez un dossier /assets/images/ dans votre thème et placez-y cette image -->
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/home-carousel-1.png" alt="Personne travaillant sur un ordinateur portable" class="object-cover w-full h-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section: Nos Services -->
    <section id="services" class="container mx-auto py-16 md:py-24">
        <div class="text-center mb-10">
            <div class="flex items-center gap-3 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M3.8 2.3c.2-.2.5-.3.8-.3h14.8c.3 0 .6.1.8.3.2.2.3.5.3.8v14.8c0 .3-.1.6-.3.8-.2.2-.5.3-.8.3H4.7c-.3 0-.6-.1-.8-.3-.2-.2-.3-.5-.3-.8V3.1c0-.3.1-.6.3-.8z"></path><path d="M8 7h8"></path><path d="M8 12h8"></path><path d="M8 17h8"></path></svg>
                <h2 class="text-3xl font-bold tracking-tight font-headline">Explorez nos solutions de financement</h2>
            </div>
            <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Que vous soyez un particulier ou une entreprise, nous avons une solution de prêt adaptée à vos besoins. Découvrez nos offres.
            </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Remplacer les images et liens -->
            <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">...</div>
            <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">...</div>
            <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">...</div>
        </div>
    </section>

    <!-- Section: Calculateur -->
    <section id="calculateur" class="w-full py-16 md:py-24 bg-muted/30">
        <!-- NOTE IMPORTANTE SUR LE CALCULATEUR: -->
        <!-- Le calculateur est interactif et dépend de JavaScript (React), qui ne fonctionnera pas par un simple copier-coller. -->
        <!-- Pour WordPress, la meilleure solution est d'utiliser un plugin de formulaire avec calcul (ex: "Calculated Fields Form"). -->
        <!-- En attendant, le HTML ci-dessous est une version statique non-interactive. -->
        <div class="container mx-auto text-center">
             <div class="flex items-center gap-3 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path><path d="M7 15h0"></path><path d="M17 15h0"></path><path d="M17 11h0"></path><path d="M7 11h0"></path><path d="M12 15h0"></path><path d="M12 11h0"></path><path d="M12 7h0"></path></svg>
                <h2 class="text-3xl font-bold tracking-tight font-headline">Calculateur de remboursement de prêt</h2>
            </div>
            <p class="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Utilisez notre calculateur simple pour estimer vos mensualités. Ajustez les curseurs pour voir comment le montant et la durée du prêt affectent vos paiements.
            </p>
            <div class="mt-10 max-w-4xl mx-auto shadow-lg rounded-lg border bg-card p-6 md:p-8 text-left">
                <!-- Contenu statique du calculateur -->
                 <p class="text-center text-muted-foreground">Le calculateur interactif doit être recréé avec un plugin WordPress dédié (ex: Calculated Fields Form).</p>
            </div>
        </div>
    </section>

    <!-- Section: Pourquoi Nous Choisir -->
    <section id="why-us" class="w-full py-16 md:py-24 bg-muted/30">
        <!-- Contenu à copier depuis out/index.html -->
    </section>

    <!-- Section: Parcours en Bref -->
    <section class="container mx-auto py-16 md:py-24">
         <!-- Contenu à copier depuis out/index.html -->
    </section>

    <!-- Section: Derniers Articles -->
    <section class="bg-background py-16 md:py-24">
         <!-- Contenu à copier depuis out/index.html -->
    </section>

    <!-- Section: Partenaires -->
    <section class="bg-background py-16 md:py-24 sm:py-32">
        <!-- Contenu à copier depuis out/index.html -->
    </section>

    <!-- Section: Témoignages -->
    <section class="w-full py-16 md:py-24">
        <!-- NOTE: Le défilement des témoignages est interactif. -->
        <!-- Utilisez un plugin de slider/carrousel dans WordPress pour recréer cet effet. -->
        <!-- Le HTML ci-dessous n'affiche que quelques avis de manière statique. -->
        <div class="container mx-auto">
            <!-- ... contenu des témoignages ... -->
        </div>
    </section>

    <!-- Section: FAQ -->
    <section id="faq" class="container mx-auto py-16 md:py-24">
         <!-- Contenu à copier depuis out/index.html -->
    </section>

</main>

<?php
get_footer();
?>
