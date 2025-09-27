<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package vyls
 */

?>
<footer class="bg-muted/30 border-t">
    <div class="container mx-auto py-12 px-6">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div class="col-span-2 md:col-span-2">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center space-x-2 mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7 text-primary"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span class="text-xl font-bold">VylsFond</span>
                </a>
                <p class="text-sm text-muted-foreground max-w-sm">Solutions de financement rapides et flexibles pour aider votre entreprise à prospérer.</p>
                <div class="mt-6 space-y-2 text-sm text-muted-foreground">
                    <a href="mailto:contact@vylsfond.com" class="flex items-center gap-2 hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>contact@vylsfond.com</a>
                    <a href="tel:+33756986769" class="flex items-center gap-2 hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>+33 7 56 98 67 69</a>
                    <p class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>Lyon, France</p>
                </div>
            </div>
            <div>
                <h3 class="font-semibold mb-4">Navigation</h3>
                <ul class="space-y-2">
                    <li><a href="/a-propos" class="text-sm text-muted-foreground hover:text-primary">À Propos</a></li>
                    <li><a href="/blog" class="text-sm text-muted-foreground hover:text-primary">Blog</a></li>
                    <li><a href="/#calculateur" class="text-sm text-muted-foreground hover:text-primary">Calculateur</a></li>
                    <li><a href="/#faq" class="text-sm text-muted-foreground hover:text-primary">FAQ</a></li>
                    <li><a href="/contact" class="text-sm text-muted-foreground hover:text-primary">Contact</a></li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold mb-4">Nos Services</h3>
                <ul class="space-y-2">
                    <li><a href="/services/pret-entreprise" class="text-sm text-muted-foreground hover:text-primary">Prêt Entreprise</a></li>
                    <li><a href="/services/pret-personnel" class="text-sm text-muted-foreground hover:text-primary">Prêt Personnel</a></li>
                    <li><a href="/services/pret-immo" class="text-sm text-muted-foreground hover:text-primary">Prêt Immobilier</a></li>
                    <li><a href="/services/pret-auto" class="text-sm text-muted-foreground hover:text-primary">Prêt Auto</a></li>
                    <li><a href="/services/rachat-de-credit" class="text-sm text-muted-foreground hover:text-primary">Rachat de Crédit</a></li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold mb-4">Légal</h3>
                <ul class="space-y-2">
                    <li><a href="/politique-de-confidentialite" class="text-sm text-muted-foreground hover:text-primary">Politique de confidentialité</a></li>
                    <li><a href="/conditions-generales" class="text-sm text-muted-foreground hover:text-primary">Conditions d'utilisation</a></li>
                </ul>
            </div>
        </div>
        <div class="mt-12 border-t pt-6 text-center">
            <p class="text-sm text-muted-foreground">&copy; <?php echo date('Y'); ?> VylsFond. Tous droits réservés.</p>
        </div>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
