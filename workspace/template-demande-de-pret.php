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
        ====================================================================================================
        INSTRUCTIONS POUR RENDRE CE FORMULAIRE FONCTIONNEL
        ====================================================================================================
        
        Ce formulaire est actuellement une maquette. Pour qu'il envoie les demandes par e-mail, suivez ces étapes :

        1. INSTALLEZ UN PLUGIN DE FORMULAIRE :
           - Dans votre admin WordPress, allez à "Extensions" > "Ajouter".
           - Recherchez, installez et activez le plugin "WPForms". Il a une version gratuite puissante.

        2. CRÉEZ LE FORMULAIRE DANS WPFORMS :
           - Allez dans le menu "WPForms" et créez un nouveau formulaire.
           - Recréez les champs ci-dessous en utilisant les outils de WPForms.
           - Dans les "Réglages" > "Notifications" du formulaire, mettez votre adresse e-mail pour recevoir les demandes.
           - Dans les "Réglages" > "Confirmation", choisissez de rediriger vers votre page "Merci pour votre demande".

        3. OBTENEZ LE SHORTCODE :
           - Une fois le formulaire enregistré, WPForms vous donnera un "shortcode" qui ressemble à : [wpforms id="123"]. Copiez-le.

        4. REMPLACEZ LE CODE CI-DESSOUS :
           - Supprimez tout le code HTML qui se trouve entre les commentaires "DÉBUT DU FORMULAIRE À REMPLACER" et "FIN DU FORMULAIRE À REMPLACER".
           - À la place, collez votre shortcode WPForms, comme ceci : <?php echo do_shortcode('[wpforms id="123"]'); ?>
        
        ====================================================================================================
        -->
        
        <!-- ▼▼▼ DÉBUT DU FORMULAIRE À REMPLACER ▼▼▼ -->
        <div class="container mx-auto p-0 mb-10">
            <div class="rounded-lg border bg-card text-card-foreground shadow-lg">
                <div class="flex flex-col space-y-1.5 p-6">
                    <h3 class="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">Estimez vos mensualités</h3>
                    <p class="text-sm text-muted-foreground">Ceci est une simulation d'exemple et n'est pas interactive.</p>
                </div>
                <div class="grid md:grid-cols-2 gap-8 p-6 pt-0">
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
                        <p class="mt-4 opacity-80 text-sm flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="5" y1="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg> Taux fixe de 2%</p>
                    </div>
                </div>
            </div>
        </div>
        <form class="space-y-8" method="post" action="">
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">1. Informations sur le Prêt</h3><p class="text-sm text-muted-foreground">Décrivez le financement dont vous avez besoin.</p></div>
                <div class="p-6 pt-0 space-y-4">
                    <div>
                        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Type de Prêt</label>
                        <select required="" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"><option value="">Sélectionnez le type de projet</option><option value="immobilier">Prêt Immobilier</option><option value="personnel">Prêt Personnel</option><option value="auto">Prêt Auto</option><option value="entreprise">Prêt Entreprise</option><option value="rachat">Rachat de Crédit</option></select>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Montant souhaité (€)</label><input type="number" placeholder="ex: 50000" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Durée de remboursement (mois)</label><input type="number" placeholder="ex: 120" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                    </div>
                </div>
            </div>
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">2. Informations Personnelles</h3><p class="text-sm text-muted-foreground">Aidez-nous à mieux vous connaître.</p></div>
                <div class="p-6 pt-0 space-y-4">
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Prénom</label><input placeholder="Jean" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Nom</label><input placeholder="Dupont" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Email</label><input type="email" placeholder="vous@exemple.com" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Numéro WhatsApp</label><input type="tel" placeholder="0612345678" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Date de naissance</label>
                        <div class="grid grid-cols-3 gap-2">
                            <div><input type="number" placeholder="Jour" required="" min="1" max="31" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                            <div><input type="number" placeholder="Mois" required="" min="1" max="12" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                            <div><input type="number" placeholder="Année" required="" min="1900" max="2006" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                        </div>
                    </div>
                    <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Adresse</label><input placeholder="123 rue de Paris" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                    <div class="grid sm:grid-cols-3 gap-4">
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Ville</label><input placeholder="Paris" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Code Postal</label><input placeholder="75001" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Pays</label><input value="France" required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Situation familiale</label>
                            <select required="" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"><option value="">Sélectionnez...</option><option value="celibataire">Célibataire</option><option value="marie">Marié(e)</option><option value="divorce">Divorcé(e)</option><option value="veuf">Veuf(ve)</option></select>
                        </div>
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Nombre d'enfants</label><input type="number" placeholder="0" required="" min="0" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                    </div>
                </div>
            </div>
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">3. Situation Financière</h3><p class="text-sm text-muted-foreground">Informations sur vos revenus et charges.</p></div>
                <div class="p-6 pt-0 space-y-4">
                    <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Profession</label><input placeholder="Développeur, médecin, etc." required="" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Revenu Mensuel Net (€)</label><input type="number" placeholder="3000" required="" min="0" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                        <div><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Charges Mensuelles (€)</label><input type="number" placeholder="1200" required="" min="0" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></div>
                    </div>
                </div>
            </div>
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">4. Documents</h3><p class="text-sm text-muted-foreground">Téléchargez les documents requis (max 5Mo par fichier).</p></div>
                <div class="p-6 pt-0 space-y-4">
                    <div>
                        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Pièce d'identité (PDF, JPG, PNG)</label>
                        <input type="file" required="" accept=".pdf,.jpg,.jpeg,.png" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Justificatif de domicile de moins de 3 mois</label>
                        <input type="file" required="" accept=".pdf,.jpg,.jpeg,.png" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    </div>
                    <div>
                        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Justificatif de revenus (3 derniers bulletins)</label>
                        <input type="file" required="" accept=".pdf,.jpg,.jpeg,.png" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    </div>
                </div>
            </div>
            <p class="text-xs text-muted-foreground text-center">En cliquant sur "Envoyer ma demande", vous confirmez que les informations fournies sont exactes et complètes, et vous acceptez nos conditions générales et notre politique de confidentialité.</p>
            <button type="submit" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"></path><path d="m22 2-7 20-4-9-9-4 20-7z"></path></svg>
              Envoyer ma demande
            </button>
        </form>
        <!-- ▲▲▲ FIN DU FORMULAIRE À REMPLACER ▲▲▲ -->
    </div>
</main>

<?php
get_footer();
?>
