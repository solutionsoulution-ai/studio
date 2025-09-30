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
    
    <!-- Section: Héros Statique -->
    <section class="w-full">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-2 items-center gap-8 py-12 md:py-24 min-h-[70vh] md:min-h-[60vh]">
                <div class="flex flex-col items-start text-center md:text-left">
                    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-headline">
                        Le financement que vous méritez, simplifié
                    </h1>
                    <p class="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto md:mx-0">
                        Crédits, prêts et solutions financières pour particuliers et professionnels. Rapide, transparent et humain.
                    </p>
                    <div class="mt-8 mx-auto md:mx-0">
                        <a href="/demande-de-pret" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8">Commencer ma demande</a>
                    </div>
                </div>
                <div class="relative h-64 md:h-96 w-full rounded-lg overflow-hidden order-first md:order-last">
                    <img src="https://i.postimg.cc/JnYy9vXy/arturo-portillo-NRy3-WM22-Sw-Q-unsplash-removebg-preview.png" alt="Personne travaillant sur un ordinateur portable" class="object-cover w-full h-full">
                </div>
            </div>
        </div>
    </section>

    <!-- Section: Nos Services -->
    <section id="services" class="container mx-auto py-16 md:py-24">
        <div class="text-center mb-10">
            <div class="flex items-center gap-3 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/></svg>
                <h2 class="text-3xl font-bold tracking-tight font-headline">Explorez nos solutions de financement</h2>
            </div>
            <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Que vous soyez un particulier ou une entreprise, nous avons une solution de prêt adaptée à vos besoins. Découvrez nos offres.
            </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm fade-in-item">
                <a href="/pret-entreprise" class="block"><div class="relative h-48 w-full"><img src="https://i.postimg.cc/Fzj4LTfS/pret-entreprise.jpg" alt="Image pour Prêt Entreprise" class="object-cover w-full h-full"></div></a>
                <div class="flex flex-col flex-grow p-6">
                    <div class="p-0 mb-4"><h3 class="text-2xl font-semibold leading-none tracking-tight">Prêt Entreprise</h3><p class="text-sm text-muted-foreground">Des solutions pour financer vos investissements, votre croissance et votre trésorerie.</p></div>
                    <div class="p-0 flex-grow flex items-end"><a href="/pret-entreprise" class="text-primary underline-offset-4 hover:underline inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium">En savoir plus <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></div>
                </div>
            </div>
            <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm fade-in-item">
                <a href="/pret-immobilier" class="block"><div class="relative h-48 w-full"><img src="https://i.postimg.cc/SxmyWbfx/pexels-jakubzerdzicki-29799518.jpg" alt="Image pour Prêt Immobilier" class="object-cover w-full h-full"></div></a>
                <div class="flex flex-col flex-grow p-6">
                    <div class="p-0 mb-4"><h3 class="text-2xl font-semibold leading-none tracking-tight">Prêt Immobilier</h3><p class="text-sm text-muted-foreground">Devenez propriétaire de votre résidence principale ou réalisez un investissement locatif.</p></div>
                    <div class="p-0 flex-grow flex items-end"><a href="/pret-immobilier" class="text-primary underline-offset-4 hover:underline inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium">En savoir plus <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></div>
                </div>
            </div>
            <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm fade-in-item">
                <a href="/pret-personnel" class="block"><div class="relative h-48 w-full"><img src="https://i.postimg.cc/bvVGdwbn/service-personal-loan.jpg" alt="Image pour Prêt Personnel" class="object-cover w-full h-full"></div></a>
                <div class="flex flex-col flex-grow p-6">
                    <div class="p-0 mb-4"><h3 class="text-2xl font-semibold leading-none tracking-tight">Prêt Personnel</h3><p class="text-sm text-muted-foreground">Financez un projet, un voyage, des travaux, ou un besoin de trésorerie sans justificatif.</p></div>
                    <div class="p-0 flex-grow flex items-end"><a href="/pret-personnel" class="text-primary underline-offset-4 hover:underline inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium">En savoir plus <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section: Calculateur -->
    <section id="calculateur" class="w-full py-16 md:py-24">
        <?php 
        $calculator_args = [
            'title' => 'Calculateur de Prêt',
            'description' => 'Simulez vos mensualités pour n\'importe quel projet.',
        ];
        set_query_var('calculator_args', $calculator_args);
        get_template_part('template-parts/calculator'); 
        ?>
    </section>

    <!-- Section: Pourquoi Nous Choisir -->
    <section id="why-us" class="w-full py-16 md:py-24">
        <div class="container mx-auto">
            <div class="text-center mb-10">
                <div class="flex items-center gap-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M12 17.5 7.5 20l1-5.2-4-3.6 5.3-.6L12 6l2.2 5.2 5.3.6-4 3.6 1 5.2z"/></svg>
                    <h2 class="text-3xl font-bold tracking-tight font-headline">Pourquoi nous choisir ?</h2>
                </div>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Chez VylsFond, nous combinons technologie et expertise humaine pour vous offrir une expérience de prêt inégalée.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="text-center border-transparent shadow-md hover:shadow-xl hover:border-primary transition-all rounded-lg border bg-card text-card-foreground fade-in-item">
                    <div class="p-6"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><path d="M13 3v7h6l-8 11v-7H5l8-11z"/></svg></div><h3 class="text-2xl font-semibold leading-none tracking-tight">Processus 100% en ligne</h3></div>
                    <div class="p-6 pt-0"><p class="text-sm text-muted-foreground">Effectuez votre demande de n'importe où, n'importe quand, grâce à notre plateforme en ligne simple et sécurisée.</p></div>
                </div>
                <div class="text-center border-transparent shadow-md hover:shadow-xl hover:border-primary transition-all rounded-lg border bg-card text-card-foreground fade-in-item">
                    <div class="p-6"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><h3 class="text-2xl font-semibold leading-none tracking-tight">Conseils d'experts</h3></div>
                    <div class="p-6 pt-0"><p class="text-sm text-muted-foreground">Nos conseillers financiers vous accompagnent à chaque étape pour trouver la solution la mieux adaptée à votre projet.</p></div>
                </div>
                <div class="text-center border-transparent shadow-md hover:shadow-xl hover:border-primary transition-all rounded-lg border bg-card text-card-foreground fade-in-item">
                    <div class="p-6"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg></div><h3 class="text-2xl font-semibold leading-none tracking-tight">Taux fixe avantageux de 2%</h3></div>
                    <div class="p-6 pt-0"><p class="text-sm text-muted-foreground">Profitez d'un taux d'intérêt fixe et transparent de 2% pour tous nos produits de financement, sans surprise.</p></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section: Parcours en Bref -->
    <section class="container mx-auto py-16 md:py-24">
        <div class="text-center mb-16">
            <h2 class="text-3xl font-bold tracking-tight font-headline">Notre parcours en bref</h2>
            <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">De l'idée à la réalité, les étapes qui ont fait de VylsFond ce que nous sommes aujourd'hui.</p>
        </div>
        <div class="relative">
            <div class="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" aria-hidden="true"></div>
            <div class="relative grid grid-cols-2 md:grid-cols-5 gap-y-10">
                <div class="flex flex-col items-center text-center px-4 fade-in-item">
                    <div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-primary text-primary mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.1-3.2-.6-1-1.6-1-2.1-1.5-1-1-1.5-2.5-1-3.5.6-1 2.1-1.1 3.2-.1 1 .9 2.4.9 3.2.1 1.2-1.5 5-2 5-2s-.5 3.74-2 5c-.84.71-2.3.7-3.2.1-1-.6-1-1.6-1.5-2.1-1-1-2.5-1.5-3.5-1-.9.6-1 2-1 3.2.1 1.1 1.2 2.1 2.1 3.2.9.6 2.1.6 3.2.1z"/></svg></div>
                    <p class="font-bold text-primary">2012</p><h3 class="text-xl font-bold mb-2">Fondation</h3>
                </div>
                <div class="flex flex-col items-center text-center px-4 fade-in-item">
                    <div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-primary text-primary mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
                    <p class="font-bold text-primary">2015</p><h3 class="text-xl font-bold mb-2">100M€ Prêtés</h3>
                </div>
                <div class="flex flex-col items-center text-center px-4 fade-in-item">
                    <div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-primary text-primary mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg></div>
                    <p class="font-bold text-primary">2018</p><h3 class="text-xl font-bold mb-2">Expansion</h3>
                </div>
                <div class="flex flex-col items-center text-center px-4 fade-in-item">
                    <div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-primary text-primary mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M12 17.5 7.5 20l1-5.2-4-3.6 5.3-.6L12 6l2.2 5.2 5.3.6-4 3.6 1 5.2z"/></svg></div>
                    <p class="font-bold text-primary">2021</p><h3 class="text-xl font-bold mb-2">Innovation IA</h3>
                </div>
                <div class="flex flex-col items-center text-center px-4 fade-in-item">
                    <div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-primary text-primary mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></div>
                    <p class="font-bold text-primary">2024+</p><h3 class="text-xl font-bold mb-2">Avenir</h3>
                </div>
            </div>
        </div>
        <div class="mt-16 text-center"><a class="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2" href="/a-propos">Découvrir notre histoire complète</a></div>
    </section>

    <!-- Section: Derniers Articles -->
    <section class="py-16 md:py-24">
         <div class="container mx-auto">
            <div class="text-center mb-10">
                <div class="flex items-center gap-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    <h2 class="text-3xl font-bold tracking-tight font-headline">Nos derniers articles</h2>
                </div>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Suivez nos conseils d'experts pour prendre les meilleures décisions financières.</p>
            </div>
            <!-- NOTE: Ce contenu est dynamique. Il faudra le remplacer par une boucle WordPress (WP_Query) pour afficher les vrais articles du blog. -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Statique pour l'export, sera remplacé par la boucle WP -->
            </div>
            <div class="mt-12 text-center"><a class="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2" href="/blog">Voir tous les articles</a></div>
         </div>
    </section>

    <!-- Section: Partenaires -->
    <section class="py-16 md:py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:max-w-none text-center">
                <div class="flex items-center gap-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg>
                    <h2 class="text-3xl font-bold tracking-tight font-headline">
                        Nos partenaires de confiance
                    </h2>
                </div>
                <p class="mt-4 text-lg text-muted-foreground">
                    Nous collaborons avec des institutions financières de premier plan pour vous offrir les meilleures conditions.
                </p>
            </div>
            <div class="mx-auto mt-16 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:mx-0 lg:grid-cols-6">
                <!-- Noms statiques des partenaires -->
                <p class="col-span-1 text-center text-xl font-semibold text-muted-foreground/60">Global Finance</p>
                <p class="col-span-1 text-center text-xl font-semibold text-muted-foreground/60">Innovate Capital</p>
                <p class="col-span-1 text-center text-xl font-semibold text-muted-foreground/60">Secure Funds</p>
                <p class="col-span-1 text-center text-xl font-semibold text-muted-foreground/60">Equity Partners</p>
                <p class="col-span-1 text-center text-xl font-semibold text-muted-foreground/60">VentureNet</p>
                <p class="col-span-1 text-center text-xl font-semibold text-muted-foreground/60">Trust Capital</p>
            </div>
        </div>
    </section>

    <!-- Section: Témoignages -->
    <section class="w-full py-16 md:py-24">
        <div class="container mx-auto">
             <div class="text-center mb-10">
                <div class="flex items-center gap-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M3 21h18L12 3 3 21z"/><path d="M12 3v18"/></svg>
                    <h2 class="text-3xl font-bold tracking-tight font-headline">Ce que disent nos clients</h2>
                </div>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Découvrez les expériences de particuliers et d'entrepreneurs à travers l'Europe qui nous ont fait confiance.</p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-item">
                <?php
                $testimonials = [
                    ["name" => "Marie Dubois", "location" => "Paris, France", "quote" => "Le processus de prêt a été incroyablement simple et rapide. VylsFond a vraiment compris mes besoins d'entrepreneur."],
                    ["name" => "Lukas Schmidt", "location" => "Berlin, Allemagne", "quote" => "J'ai pu financer mon nouvel équipement sans tracas. Leur équipe est professionnelle et très réactive. Je recommande vivement."],
                    ["name" => "Sofia Rossi", "location" => "Rome, Italie", "quote" => "Grâce à VylsFond, j'ai consolidé mes dettes avec un rachat de crédit avantageux. Ma situation financière est bien meilleure maintenant."],
                ];
                foreach ($testimonials as $testimonial) : ?>
                    <div class="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div class="flex flex-col items-start gap-4 p-6 flex-grow">
                            <p class="text-muted-foreground italic flex-grow">"<?php echo esc_html($testimonial['quote']); ?>"</p>
                            <div class="pt-4 border-t w-full">
                                <p class="font-semibold"><?php echo esc_html($testimonial['name']); ?></p>
                                <p class="text-sm text-muted-foreground"><?php echo esc_html($testimonial['location']); ?></p>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Section: FAQ -->
    <section id="faq" class="container mx-auto py-16 md:py-24">
        <div class="max-w-3xl mx-auto">
            <div class="text-center mb-10">
                <div class="flex items-center gap-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                    <h2 class="text-3xl font-bold tracking-tight font-headline">Foire aux questions</h2>
                </div>
                <p class="mt-4 text-lg text-muted-foreground">Vous avez des questions ? Nous avons des réponses. Trouvez des informations sur nos services et processus ci-dessous.</p>
            </div>
            <div class="space-y-6">
                <div class="border-b pb-4">
                    <h3 class="font-medium text-lg">Quelles sont les exigences minimales pour un prêt ?</h3>
                    <p class="text-muted-foreground mt-2">Généralement, nous recherchons une situation financière stable et une capacité de remboursement démontrable. Chaque dossier est unique, et notre vérificateur d'éligibilité peut fournir une évaluation personnalisée.</p>
                </div>
                <div class="border-b pb-4">
                    <h3 class="font-medium text-lg">Combien de temps dure le processus de demande ?</h3>
                    <p class="text-muted-foreground mt-2">Notre vérification d'éligibilité initiale est instantanée. Un examen complet de la demande prend généralement entre 24 et 72 heures. Une fois approuvés, les fonds peuvent être débloqués rapidement.</p>
                </div>
                <div class="border-b pb-4">
                    <h3 class="font-medium text-lg">Quels types de prêts offrez-vous ?</h3>
                    <p class="text-muted-foreground mt-2">VylsFond se spécialise dans une variété d'options de financement, y compris les prêts immobiliers, les prêts à la consommation, les prêts auto, le rachat de crédit et les financements pour entreprises.</p>
                </div>
                <div class="border-b pb-4">
                    <h3 class="font-medium text-lg">Puis-je rembourser mon prêt par anticipation ?</h3>
                    <p class="text-muted-foreground mt-2">Oui, la plupart de nos produits de prêt permettent un remboursement anticipé sans pénalité. Nous croyons en la fourniture d'options flexibles qui soutiennent votre santé financière.</p>
                </div>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
?>
