<?php
/**
 * Template Name: Page - Contact
 *
 * @package vyls
 */

get_header();
?>

<main class="flex-1 container mx-auto py-12 md:py-24 px-4">
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
            <!--
            ====================================================================================================
            INSTRUCTIONS POUR RENDRE CE FORMULAIRE FONCTIONNEL (SANS DÉVELOPPEUR)
            ====================================================================================================
            
            Ce formulaire est une maquette. Pour qu'il envoie des e-mails, suivez ces étapes simples :

            1. INSTALLEZ LE PLUGIN WPFORMS :
               - Dans votre admin WordPress, allez à "Extensions" > "Ajouter".
               - Recherchez, installez et activez le plugin "WPForms".

            2. CRÉEZ LE FORMULAIRE DANS WPFORMS :
               - Allez dans le menu "WPForms" et créez un nouveau formulaire.
               - Recréez les champs ci-dessous en utilisant les types de champs suivants :
                 - Nom Complet -> Champ "Nom" (utilisez le format "Simple")
                 - Adresse E-mail -> Champ "E-mail"
                 - Votre Message -> Champ "Paragraphe de texte"
               - Dans "Réglages" > "Notifications" du formulaire, mettez VOTRE adresse e-mail pour recevoir les messages.
               - Dans "Réglages" > "Confirmation", choisissez "Rediriger vers une URL" et mettez le lien de votre page "Merci Contact".
               - Enregistrez le formulaire.

            3. REMPLACEZ LE CODE CI-DESSOUS :
               - Une fois le formulaire enregistré, WPForms vous donnera un "shortcode" qui ressemble à : [wpforms id="123"]. Copiez-le.
               - Supprimez tout le bloc HTML <div class="rounded-lg..."> qui se trouve juste en dessous de ce commentaire (jusqu'au commentaire de fin).
               - À la place, collez votre shortcode, comme ceci :
                 <?php echo do_shortcode('[wpforms id="123"]'); ?>
            
            ====================================================================================================
            -->
            
            <!-- ▼▼▼ DÉBUT DU FORMULAIRE À REMPLACER PAR VOTRE SHORTCODE ▼▼▼ -->
            <div class="rounded-lg border bg-card text-card-foreground shadow-lg">
                <div class="p-6 md:p-8">
                    <form class="space-y-6">
                        <div class="grid sm:grid-cols-2 gap-4">
                            <div><label class="text-sm font-medium leading-none mb-2 block">Nom Complet</label><input type="text" placeholder="Jean Dupont" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                            <div><label class="text-sm font-medium leading-none mb-2 block">Adresse E-mail</label><input type="email" placeholder="vous@exemple.com" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                        </div>
                        <div>
                            <label class="text-sm font-medium leading-none mb-2 block">Votre Message</label>
                            <textarea rows="5" placeholder="Comment pouvons-nous vous aider aujourd'hui ?" required class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base"></textarea>
                        </div>
                        <button type="submit" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
                            Envoyer le Message
                        </button>
                    </form>
                </div>
            </div>
            <!-- ▲▲▲ FIN DU FORMULAIRE À REMPLACER PAR VOTRE SHORTCODE ▲▲▲ -->

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
</main>

<?php
get_footer();
?>
