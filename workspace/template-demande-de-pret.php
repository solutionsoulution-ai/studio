<?php
/**
 * Template Name: Page - Demande de Prêt
 *
 * @package vyls
 */

if ( $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_loan_form']) ) {
    $to = 'contact@vylscapital.com';
    $subject = sanitize_text_field($_POST['_subject']);
    $email = sanitize_email($_POST['email']);
    $name = sanitize_text_field($_POST['prenom']) . ' ' . sanitize_text_field($_POST['nom']);

    $attachments = array();
    $upload_dir = wp_upload_dir();
    $upload_path = $upload_dir['path'] . '/';

    if (isset($_FILES['piece_identite']) && $_FILES['piece_identite']['error'] == 0) {
        $file_tmp = $_FILES['piece_identite']['tmp_name'];
        $file_name = sanitize_file_name($_FILES['piece_identite']['name']);
        if (move_uploaded_file($file_tmp, $upload_path . $file_name)) {
            $attachments[] = $upload_path . $file_name;
        }
    }
    if (isset($_FILES['justificatif_domicile']) && $_FILES['justificatif_domicile']['error'] == 0) {
        $file_tmp = $_FILES['justificatif_domicile']['tmp_name'];
        $file_name = sanitize_file_name($_FILES['justificatif_domicile']['name']);
        if (move_uploaded_file($file_tmp, $upload_path . $file_name)) {
            $attachments[] = $upload_path . $file_name;
        }
    }
    if (isset($_FILES['justificatif_revenus']) && $_FILES['justificatif_revenus']['error'] == 0) {
        $file_tmp = $_FILES['justificatif_revenus']['tmp_name'];
        $file_name = sanitize_file_name($_FILES['justificatif_revenus']['name']);
        if (move_uploaded_file($file_tmp, $upload_path . $file_name)) {
            $attachments[] = $upload_path . $file_name;
        }
    }

    $body = "Nouvelle demande de prêt :\n\n";
    $body .= "--- Informations sur le prêt ---\n";
    $body .= "Type de prêt: " . sanitize_text_field($_POST['type_pret']) . "\n";
    $body .= "Montant souhaité: " . sanitize_text_field($_POST['montant']) . " €\n";
    $body .= "Durée: " . sanitize_text_field($_POST['duree_mois']) . " mois\n\n";

    $body .= "--- Informations Personnelles ---\n";
    $body .= "Nom complet: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "WhatsApp: " . sanitize_text_field($_POST['whatsapp']) . "\n";
    $body .= "Date de naissance: " . sanitize_text_field($_POST['jour_naissance']) . "/" . sanitize_text_field($_POST['mois_naissance']) . "/" . sanitize_text_field($_POST['annee_naissance']) . "\n";
    $body .= "Adresse: " . sanitize_text_field($_POST['adresse']) . ", " . sanitize_text_field($_POST['code_postal']) . " " . sanitize_text_field($_POST['ville']) . ", " . sanitize_text_field($_POST['pays']) . "\n";
    $body .= "Situation familiale: " . sanitize_text_field($_POST['situation_familiale']) . "\n";
    $body .= "Nombre d'enfants: " . sanitize_text_field($_POST['nb_enfants']) . "\n\n";
    
    $body .= "--- Situation Financière ---\n";
    $body .= "Profession: " . sanitize_text_field($_POST['profession']) . "\n";
    $body .= "Revenu mensuel net: " . sanitize_text_field($_POST['revenu_mensuel']) . " €\n";
    $body .= "Charges mensuelles: " . sanitize_text_field($_POST['charges_mensuelles']) . " €\n\n";

    $headers = array('Content-Type: text/plain; charset=UTF-8', 'From: VylsFond <no-reply@' . preg_replace('/^www\./', '', $_SERVER['SERVER_NAME']) . '>', 'Reply-To: ' . $name . ' <' . $email . '>');
    
    $sent = wp_mail($to, $subject, $body, $headers, $attachments);

    // Supprimer les fichiers temporaires après l'envoi
    foreach ($attachments as $file) {
        unlink($file);
    }
    
    if ($sent) {
        wp_redirect(home_url('/merci-demande'));
        exit;
    } else {
        wp_redirect(home_url('/merci-demande')); // Redirige même en cas d'échec pour une meilleure UX
        exit;
    }
}

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

            <!-- 🔢 CALCULATEUR EN HAUT -->
            <div class="mb-10 p-6 bg-muted rounded-xl border">
                <h2 class="text-xl font-semibold mb-4 text-center">Simulateur de Mensualité</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label class="text-sm font-medium mb-2 block">Montant (€)</label>
                        <input type="number" id="calc-montant" min="1000" max="500000" value="150000" class="w-full h-10 px-3 rounded-md border border-input bg-background">
                    </div>
                    <div>
                        <label class="text-sm font-medium mb-2 block">Durée (mois)</label>
                        <input type="number" id="calc-duree" min="12" max="360" value="240" class="w-full h-10 px-3 rounded-md border border-input bg-background">
                    </div>
                    <div>
                        <label class="text-sm font-medium mb-2 block">Mensualité estimée</label>
                        <div id="calc-result" class="w-full h-10 flex items-center justify-center px-3 rounded-md bg-primary/10 text-primary font-semibold">
                            746,22 €
                        </div>
                    </div>
                </div>
                <p class="text-xs text-muted-foreground mt-2 text-center">
                    Taux fixe : <strong>2 % annuel</strong>
                </p>
            </div>

            <div class="mt-8">
                <form class="space-y-8" action="<?php echo esc_url( get_permalink() ); ?>" method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="_subject" value="Nouvelle demande de prêt - VylsFond">
                    <input type="hidden" name="submit_loan_form" value="1">

                    <!-- 1. Informations sur le prêt -->
                    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div class="p-6">
                            <h3 class="flex items-center gap-2 text-2xl font-semibold">1. Informations sur le Prêt</h3>
                            <p class="text-sm text-muted-foreground">Décrivez le financement dont vous avez besoin.</p>
                        </div>
                        <div class="p-6 pt-0 space-y-4">
                            <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Type de Prêt</label>
                                <select name="type_pret" required class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="">Sélectionnez le type de projet</option>
                                    <option value="immobilier">Prêt Immobilier</option>
                                    <option value="personnel">Prêt Personnel</option>
                                    <option value="auto">Prêt Auto</option>
                                    <option value="entreprise">Prêt Entreprise</option>
                                    <option value="rachat">Rachat de Crédit</option>
                                </select>
                            </div>
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Montant souhaité (€)</label>
                                    <input type="number" name="montant" id="form-montant" placeholder="ex: 50000" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Durée de remboursement (mois)</label>
                                    <input type="number" name="duree_mois" id="form-duree" placeholder="ex: 120" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Informations personnelles -->
                    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div class="p-6">
                            <h3 class="flex items-center gap-2 text-2xl font-semibold">2. Informations Personnelles</h3>
                            <p class="text-sm text-muted-foreground">Aidez-nous à mieux vous connaître.</p>
                        </div>
                        <div class="p-6 pt-0 space-y-4">
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Prénom</label>
                                    <input name="prenom" placeholder="Jean" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Nom</label>
                                    <input name="nom" placeholder="Dupont" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                            </div>
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Email</label>
                                    <input type="email" name="email" placeholder="vous@exemple.com" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Numéro WhatsApp</label>
                                    <input type="tel" name="whatsapp" placeholder="0612345678" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                            </div>
                            <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Date de naissance</label>
                                <div class="grid grid-cols-3 gap-2">
                                    <div>
                                        <input type="number" name="jour_naissance" placeholder="Jour" required min="1" max="31" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                    </div>
                                    <div>
                                        <input type="number" name="mois_naissance" placeholder="Mois" required min="1" max="12" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                    </div>
                                    <div>
                                        <input type="number" name="annee_naissance" placeholder="Année" required min="1900" max="<?php echo date('Y') - 18; ?>" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Adresse</label>
                                <input name="adresse" placeholder="123 rue de Paris" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                            </div>
                            <div class="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Ville</label>
                                    <input name="ville" placeholder="Paris" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Code Postal</label>
                                    <input name="code_postal" placeholder="75001" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Pays</label>
                                    <input name="pays" value="France" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                            </div>
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Situation familiale</label>
                                    <select name="situation_familiale" required class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="">Sélectionnez...</option>
                                        <option value="celibataire">Célibataire</option>
                                        <option value="marie">Marié(e)</option>
                                        <option value="divorce">Divorcé(e)</option>
                                        <option value="veuf">Veuf(ve)</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Nombre d'enfants</label>
                                    <input type="number" name="nb_enfants" placeholder="0" required min="0" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 3. Situation financière -->
                    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div class="p-6">
                            <h3 class="flex items-center gap-2 text-2xl font-semibold">3. Situation Financière</h3>
                            <p class="text-sm text-muted-foreground">Informations sur vos revenus et charges.</p>
                        </div>
                        <div class="p-6 pt-0 space-y-4">
                            <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Profession</label>
                                <input name="profession" placeholder="Développeur, médecin, etc." required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                            </div>
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Revenu Mensuel Net (€)</label>
                                    <input type="number" name="revenu_mensuel" placeholder="3000" required min="0" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                                <div>
                                    <label class="text-sm font-medium leading-none mb-2 block">Charges Mensuelles (€)</label>
                                    <input type="number" name="charges_mensuelles" placeholder="1200" required min="0" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Documents (obligatoires) -->
                    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div class="p-6">
                            <h3 class="flex items-center gap-2 text-2xl font-semibold">4. Documents</h3>
                            <p class="text-sm text-muted-foreground">Téléchargez les documents requis (max 10Mo par fichier).</p>
                        </div>
                        <div class="p-6 pt-0 space-y-4">
                            <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Pièce d'identité (PDF, JPG, PNG) *</label>
                                <input type="file" name="piece_identite" accept=".pdf,.jpg,.jpeg,.png" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                            </div>
                            <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Justificatif de domicile de moins de 3 mois *</label>
                                <input type="file" name="justificatif_domicile" accept=".pdf,.jpg,.jpeg,.png" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                            </div>
                            <div>
                                <label class="text-sm font-medium leading-none mb-2 block">Justificatif de revenus (3 derniers bulletins) *</label>
                                <input type="file" name="justificatif_revenus" accept=".pdf,.jpg,.jpeg,.png" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                            </div>
                        </div>
                    </div>

                    <p class="text-xs text-muted-foreground text-center">
                        En cliquant sur "Envoyer ma demande", vous confirmez que les informations fournies sont exactes et complètes, et vous acceptez nos conditions générales et notre politique de confidentialité.
                    </p>
                    
                    <button type="submit" class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/>
                      </svg>
                      Envoyer ma demande
                    </button>
                </form>
            </div>
        </div>
    </div>
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
    function calculateMensualite() {
        const montantEl = document.getElementById('calc-montant');
        const dureeEl = document.getElementById('calc-duree');
        const resultEl = document.getElementById('calc-result');

        if (!montantEl || !dureeEl || !resultEl) return;

        const montant = parseFloat(montantEl.value) || 0;
        const duree = parseFloat(dureeEl.value) || 1;
        const tauxMensuel = 0.02 / 12;

        if (montant <= 0 || duree <= 0) {
            resultEl.textContent = '— €';
            return;
        }

        const numerateur = tauxMensuel * Math.pow(1 + tauxMensuel, duree);
        const denominateur = Math.pow(1 + tauxMensuel, duree) - 1;
        const mensualite = montant * (numerateur / denominateur);
        resultEl.textContent = mensualite.toFixed(2).replace('.', ',') + ' €';
        
        // Mettre à jour les champs du formulaire principal
        const formMontant = document.getElementById('form-montant');
        const formDuree = document.getElementById('form-duree');
        if(formMontant) formMontant.value = montant;
        if(formDuree) formDuree.value = duree;
    }

    function syncFromForm() {
        const formMontant = document.getElementById('form-montant');
        const formDuree = document.getElementById('form-duree');
        const calcMontant = document.getElementById('calc-montant');
        const calcDuree = document.getElementById('calc-duree');

        if(formMontant && calcMontant) calcMontant.value = formMontant.value;
        if(formDuree && calcDuree) calcDuree.value = formDuree.value;
        calculateMensualite();
    }

    ['calc-montant', 'calc-duree'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', calculateMensualite);
    });

    ['form-montant', 'form-duree'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', syncFromForm);
    });

    calculateMensualite();
});
</script>

<?php
get_footer();
?>
