<?php
/**
 * Template Name: Page - Merci Contact
 *
 * @package vyls
 */

get_header();
?>

<main class="flex-1">
    <div class="container mx-auto py-16 md:py-24 px-4">
        <div class="mx-auto max-w-2xl text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto h-16 w-16 text-green-500 mb-6"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
            <h1 class="text-3xl md:text-4xl font-bold tracking-tight font-headline">Message envoyé !</h1>
            <p class="mt-4 text-lg text-muted-foreground">
                Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons très prochainement.
            </p>
            <div class="mt-8">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                    Retour à l'accueil
                </a>
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <section class="bg-primary text-primary-foreground mt-16">
        <div class="container mx-auto text-center py-16 px-4">
            <h2 class="text-3xl font-bold">Prêt à démarrer votre projet ?</h2>
            <p class="mt-2 text-lg max-w-xl mx-auto opacity-90">
                Notre équipe est là pour vous aider à trouver la meilleure solution de financement.
            </p>
            <div class="mt-8">
                <a href="/demande-de-pret" class="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 rounded-md px-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    Faire une demande
                </a>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();
?>
