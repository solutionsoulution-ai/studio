<?php
/**
 * Template Name: Page - Contact
 *
 * @package vyls
 */

get_header();
?>

<main class="flex-1">
    <div class="container mx-auto py-12 md:py-24 px-4">
        <div class="mx-auto max-w-5xl">
          <div class="text-center mb-10">
              <div class="flex items-center gap-3 justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  <h1 class="text-3xl md:text-4xl font-bold tracking-tight font-headline">Contactez-nous</h1>
              </div>
              <p class="mt-4 text-lg text-muted-foreground">
                Une question ? Une demande spécifique ? Notre équipe est à votre écoute.
              </p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-12 items-start">
             <div>
                <div class="rounded-lg border bg-card text-card-foreground shadow-lg p-6 md:p-8">
                    <?php echo do_shortcode('[contact-form-7 id="VOTRE_ID_CONTACT_ICI" title="Formulaire de Contact"]'); ?>
                </div>
             </div>
             <div class="space-y-6">
                <h2 class="text-2xl font-semibold">Nos Coordonnées</h2>
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div class="p-6 space-y-4 text-muted-foreground">
                        <a href="mailto:contact@vylsfond.com" class="flex items-center gap-3 group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-primary"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                            <span class="group-hover:text-primary transition-colors">contact@vylsfond.com</span>
                        </a>
                        <a href="tel:+33756986769" class="flex items-center gap-3 group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <span class="group-hover:text-primary transition-colors">+33 7 56 98 67 69</span>
                        </a>
                        <div class="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <span>Lyon, France</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 class="font-semibold mb-2">Horaires d'ouverture</h3>
                    <p class="text-muted-foreground">Lundi - Vendredi : 9h00 - 18h00</p>
                    <p class="text-muted-foreground">Samedi - Dimanche : Fermé</p>
                </div>
             </div>
          </div>
        </div>
    </div>
</main>

<?php
get_footer();
?>