<?php
/**
 * Template Name: Page - Merci Demande
 *
 * @package vyls
 */

get_header();
?>

<main class="flex-1 container mx-auto py-16 md:py-24 px-4">
    <div class="mx-auto max-w-2xl text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto h-16 w-16 text-green-500 mb-6"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight font-headline">Demande envoyée avec succès !</h1>
        <p class="mt-4 text-lg text-muted-foreground">
            Merci d'avoir soumis votre demande de financement. Notre équipe va l'examiner attentivement et vous contactera dans les plus brefs délais.
        </p>
        <p class="mt-2 text-muted-foreground">
            Vous recevrez une copie de votre soumission par e-mail.
        </p>
        <div class="mt-8">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                Retour à l'accueil
            </a>
        </div>
    </div>
</main>

<?php
get_footer();
?>
