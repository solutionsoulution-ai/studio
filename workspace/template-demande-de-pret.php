<?php
/**
 * Template Name: Page - Demande de Prêt
 *
 * @package vyls
 */

get_header();
?>

<main class="flex-1">
    <div class="container mx-auto py-12 md:py-24 px-4">
        <div class="mx-auto max-w-3xl">
           <div class="text-center mb-10">
                <h1 class="text-3xl md:text-4xl font-bold tracking-tight font-headline">Demande de Financement</h1>
                <p class="mt-4 text-lg text-muted-foreground">
                    Remplissez le formulaire pour soumettre votre demande. C'est simple, rapide et sécurisé.
                </p>
            </div>

            <div class="mb-12">
                <?php 
                $calculator_args = [
                    'title' => 'Estimez vos mensualités',
                    'description' => "Ceci est une simulation. Ajustez les curseurs ou entrez les valeurs pour voir l'impact sur vos paiements.",
                ];
                set_query_var('calculator_args', $calculator_args);
                get_template_part('template-parts/calculator'); 
                ?>
            </div>
            
            <div class="mt-12">
                <!--
                ====================================================================================================
                INSTRUCTIONS POUR LE FORMULAIRE DE DEMANDE
                ====================================================================================================
                
                Ce formulaire est une maquette complexe. La meilleure façon de le gérer dans WordPress est
                d'utiliser un plugin de formulaire avancé comme WPForms (la version Pro peut être nécessaire
                pour les champs de téléversement de fichiers et la logique complexe).

                1. INSTALLEZ WPFORMS :
                   - Installez et activez le plugin depuis le menu "Extensions" de WordPress.

                2. CRÉEZ LE FORMULAIRE DE DEMANDE :
                   - Dans WPForms, créez un nouveau formulaire.
                   - Ajoutez tous les champs nécessaires : Type de prêt, Montant, Durée, Informations personnelles,
                     Situation financière, et surtout les champs de "Téléversement de fichier".
                   - Configurez les notifications pour recevoir les demandes complètes par e-mail.
                   - Dans "Réglages" > "Confirmation", redirigez vers votre page "Merci pour la demande".

                3. REMPLACEZ LE CODE CI-DESSOUS PAR LE SHORTCODE :
                   - Copiez le shortcode généré par WPForms.
                   - Supprimez toute la balise <form> ci-dessous (entre les commentaires DEBUT et FIN).
                   - Collez le shortcode à la place :
                     <?php echo do_shortcode('[wpforms id="456"]'); ?>
                
                ====================================================================================================
                -->

                <!-- ▼▼▼ DÉBUT DU FORMULAIRE À REMPLACER PAR VOTRE SHORTCODE ▼▼▼ -->
                <form class="space-y-8" action="/merci-demande" method="post">
                    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">1. Informations sur le Prêt</h3><p class="text-sm text-muted-foreground">Décrivez le financement dont vous avez besoin.</p></div>
                        <div class="p-6 pt-0 space-y-4">
                             <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Type de Prêt</label>
                                <select required class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">Sélectionnez le type de projet</option><option value="immobilier">Prêt Immobilier</option><option value="personnel">Prêt Personnel</option><option value="auto">Prêt Auto</option><option value="entreprise">Prêt Entreprise</option><option value="rachat">Rachat de Crédit</option></select>
                            </div>
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div><label class="text-sm font-medium leading-none mb-2 block">Montant souhaité (€)</label><input type="number" placeholder="ex: 50000" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                                <div><label class="text-sm font-medium leading-none mb-2 block">Durée de remboursement (mois)</label><input type="number" placeholder="ex: 120" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                            </div>
                        </div>
                    </div>

                    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">2. Informations Personnelles</h3><p class="text-sm text-muted-foreground">Aidez-nous à mieux vous connaître.</p></div>
                        <div class="p-6 pt-0 space-y-4">
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div><label class="text-sm font-medium leading-none mb-2 block">Prénom</label><input placeholder="Jean" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                                <div><label class="text-sm font-medium leading-none mb-2 block">Nom</label><input placeholder="Dupont" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                            </div>
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div><label class="text-sm font-medium leading-none mb-2 block">Email</label><input type="email" placeholder="vous@exemple.com" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                                <div><label class="text-sm font-medium leading-none mb-2 block">Numéro WhatsApp</label><input type="tel" placeholder="0612345678" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                            </div>
                            <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Date de naissance</label>
                                <div class="grid grid-cols-3 gap-2">
                                    <div><input type="number" placeholder="Jour" required min="1" max="31" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                                    <div><input type="number" placeholder="Mois" required min="1" max="12" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                                    <div><input type="number" placeholder="Année" required min="1900" max="<?php echo date('Y') - 18; ?>" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                                </div>
                            </div>
                            <div><label class="text-sm font-medium leading-none mb-2 block">Adresse</label><input placeholder="123 rue de Paris" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                            <div class="grid sm:grid-cols-3 gap-4">
                                <div><label class="text-sm font-medium leading-none mb-2 block">Ville</label><input placeholder="Paris" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                                <div><label class="text-sm font-medium leading-none mb-2 block">Code Postal</label><input placeholder="75001" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                                <div><label class="text-sm font-medium leading-none mb-2 block">Pays</label><input value="France" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                            </div>
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Situation familiale</label>
                                    <select required class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">Sélectionnez...</option><option value="celibataire">Célibataire</option><option value="marie">Marié(e)</option><option value="divorce">Divorcé(e)</option><option value="veuf">Veuf(ve)</option></select>
                                </div>
                                <div><label class="text-sm font-medium leading-none mb-2 block">Nombre d'enfants</label><input type="number" placeholder="0" required min="0" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                            </div>
                        </div>
                    </div>

                    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">3. Situation Financière</h3><p class="text-sm text-muted-foreground">Informations sur vos revenus et charges.</p></div>
                        <div class="p-6 pt-0 space-y-4">
                            <div><label class="text-sm font-medium leading-none mb-2 block">Profession</label><input placeholder="Développeur, médecin, etc." required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div><label class="text-sm font-medium leading-none mb-2 block">Revenu Mensuel Net (€)</label><input type="number" placeholder="3000" required min="0" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                                <div><label class="text-sm font-medium leading-none mb-2 block">Charges Mensuelles (€)</label><input type="number" placeholder="1200" required min="0" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"></div>
                            </div>
                        </div>
                    </div>

                    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div class="p-6"><h3 class="flex items-center gap-2 text-2xl font-semibold">4. Documents</h3><p class="text-sm text-muted-foreground">Téléchargez les documents requis (max 5Mo par fichier).</p></div>
                        <div class="p-6 pt-0 space-y-4">
                            <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Pièce d'identité (PDF, JPG, PNG)</label>
                                <input type="file" required accept=".pdf,.jpg,.jpeg,.png" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                            </div>
                            <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Justificatif de domicile de moins de 3 mois</label>
                                <input type="file" required accept=".pdf,.jpg,.jpeg,.png" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                            </div>
                            <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Justificatif de revenus (3 derniers bulletins)</label>
                                <input type="file" required accept=".pdf,.jpg,.jpeg,.png" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                            </div>
                        </div>
                    </div>

                    <p class="text-xs text-muted-foreground text-center">En cliquant sur "Envoyer ma demande", vous confirmez que les informations fournies sont exactes et complètes, et vous acceptez nos conditions générales et notre politique de confidentialité.</p>
                    
                    <button type="submit" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
                      Envoyer ma demande
                    </button>
                </form>
                <!-- ▲▲▲ FIN DU FORMULAIRE À REMPLACER PAR VOTRE SHORTCODE ▲▲▲ -->
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
?>
