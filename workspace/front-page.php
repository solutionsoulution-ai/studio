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
                <!-- NOTE: Ceci est une version simplifiée du carrousel. Pour un carrousel fonctionnel, un plugin WordPress serait idéal. Seule la première diapositive est affichée. -->
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
                                <!-- Important : Créez un dossier /assets/images/ dans votre thème et placez-y cette image. Mettez à jour le chemin si nécessaire. -->
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/></svg>
                <h2 class="text-3xl font-bold tracking-tight font-headline">Explorez nos solutions de financement</h2>
            </div>
            <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Que vous soyez un particulier ou une entreprise, nous avons une solution de prêt adaptée à vos besoins. Découvrez nos offres.
            </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="relative h-48 w-full">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/pret-entreprise.jpg" alt="Image pour Prêt Entreprise" class="object-cover w-full h-full">
                </div>
                <div class="flex flex-col flex-grow p-6">
                    <div class="p-0 mb-4">
                        <h3 class="text-2xl font-semibold leading-none tracking-tight">Prêt Entreprise</h3>
                        <p class="text-sm text-muted-foreground">Des solutions pour financer vos investissements, votre croissance et votre trésorerie.</p>
                    </div>
                    <div class="p-0 flex-grow flex items-end">
                        <a href="/services/pret-entreprise" class="text-primary underline-offset-4 hover:underline inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium">En savoir plus <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
                    </div>
                </div>
            </div>
            <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="relative h-48 w-full">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/pret-immo.jpg" alt="Image pour Prêt Immobilier" class="object-cover w-full h-full">
                </div>
                <div class="flex flex-col flex-grow p-6">
                    <div class="p-0 mb-4">
                        <h3 class="text-2xl font-semibold leading-none tracking-tight">Prêt Immobilier</h3>
                        <p class="text-sm text-muted-foreground">Devenez propriétaire de votre résidence principale ou réalisez un investissement locatif.</p>
                    </div>
                    <div class="p-0 flex-grow flex items-end">
                        <a href="/services/pret-immo" class="text-primary underline-offset-4 hover:underline inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium">En savoir plus <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
                    </div>
                </div>
            </div>
            <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="relative h-48 w-full">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/pret-personnel.jpg" alt="Image pour Prêt Personnel" class="object-cover w-full h-full">
                </div>
                <div class="flex flex-col flex-grow p-6">
                    <div class="p-0 mb-4">
                        <h3 class="text-2xl font-semibold leading-none tracking-tight">Prêt Personnel</h3>
                        <p class="text-sm text-muted-foreground">Financez un projet, un voyage, des travaux, ou un besoin de trésorerie sans justificatif.</p>
                    </div>
                    <div class="p-0 flex-grow flex items-end">
                        <a href="/services/pret-personnel" class="text-primary underline-offset-4 hover:underline inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium">En savoir plus <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section: Calculateur -->
    <section id="calculateur" class="w-full py-16 md:py-24 bg-muted/30">
        <div class="container mx-auto">
            <div class="mx-auto max-w-3xl text-center">
                <div class="flex items-center gap-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path><path d="M7 15h0"></path><path d="M17 15h0"></path><path d="M17 11h0"></path><path d="M7 11h0"></path><path d="M12 15h0"></path><path d="M12 11h0"></path><path d="M12 7h0"></path></svg>
                    <h2 class="text-3xl font-bold tracking-tight font-headline">Calculateur de remboursement de prêt</h2>
                </div>
                <p class="mt-4 text-lg text-muted-foreground">Utilisez notre calculateur simple pour estimer vos mensualités. Ajustez les curseurs pour voir comment le montant et la durée du prêt affectent vos paiements.</p>
            </div>
            <!-- NOTE: Le calculateur est interactif. Recréez-le avec un plugin WordPress comme "Calculated Fields Form" et collez le shortcode ici. -->
            <div class="mt-10 max-w-4xl mx-auto shadow-lg rounded-lg border bg-card p-6 md:p-8">
                 <p class="text-center text-muted-foreground">Le calculateur interactif doit être recréé avec un plugin WordPress dédié.</p>
            </div>
        </div>
    </section>

    <!-- Section: Pourquoi Nous Choisir -->
    <section id="why-us" class="w-full py-16 md:py-24 bg-muted/30">
        <div class="container mx-auto">
            <div class="text-center mb-10">
                <div class="flex items-center gap-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M12 17.5 7.5 20l1-5.2-4-3.6 5.3-.6L12 6l2.2 5.2 5.3.6-4 3.6 1 5.2z"/></svg>
                    <h2 class="text-3xl font-bold tracking-tight font-headline">Pourquoi nous choisir ?</h2>
                </div>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Chez VylsCapital, nous combinons technologie et expertise humaine pour vous offrir une expérience de prêt inégalée.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="text-center border-transparent shadow-md hover:shadow-xl hover:border-primary transition-all rounded-lg border bg-card text-card-foreground">
                    <div class="p-6">
                        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><path d="M13 3v7h6l-8 11v-7H5l8-11z"/></svg></div>
                        <h3 class="text-2xl font-semibold leading-none tracking-tight">Processus 100% en ligne</h3>
                    </div>
                    <div class="p-6 pt-0"><p class="text-sm text-muted-foreground">Effectuez votre demande de n'importe où, n'importe quand, grâce à notre plateforme en ligne simple et sécurisée.</p></div>
                </div>
                <div class="text-center border-transparent shadow-md hover:shadow-xl hover:border-primary transition-all rounded-lg border bg-card text-card-foreground">
                    <div class="p-6">
                        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                        <h3 class="text-2xl font-semibold leading-none tracking-tight">Conseils d'experts</h3>
                    </div>
                    <div class="p-6 pt-0"><p class="text-sm text-muted-foreground">Nos conseillers financiers vous accompagnent à chaque étape pour trouver la solution la mieux adaptée à votre projet.</p></div>
                </div>
                <div class="text-center border-transparent shadow-md hover:shadow-xl hover:border-primary transition-all rounded-lg border bg-card text-card-foreground">
                    <div class="p-6">
                        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z"/><path d="m9 12-2 2 4 4 6-6-2-2"/></svg></div>
                        <h3 class="text-2xl font-semibold leading-none tracking-tight">Taux fixe avantageux de 2%</h3>
                    </div>
                    <div class="p-6 pt-0"><p class="text-sm text-muted-foreground">Profitez d'un taux d'intérêt fixe et transparent de 2% pour tous nos produits de financement, sans surprise.</p></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section: Parcours en Bref -->
    <section class="container mx-auto py-16 md:py-24">
        <div class="text-center mb-16">
            <h2 class="text-3xl font-bold tracking-tight font-headline">Notre parcours en bref</h2>
            <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">De l'idée à la réalité, les étapes qui ont fait de VylsCapital ce que nous sommes aujourd'hui.</p>
        </div>
        <div class="relative">
            <div class="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" aria-hidden="true"></div>
            <div class="relative grid grid-cols-2 md:grid-cols-5 gap-y-10">
                <div class="flex flex-col items-center text-center px-4">
                    <div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-primary text-primary mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.1-3.2-.6-1-1.6-1-2.1-1.5-1-1-1.5-2.5-1-3.5.6-1 2.1-1.1 3.2-.1 1 .9 2.4.9 3.2.1 1.2-1.5 5-2 5-2s-.5 3.74-2 5c-.84.71-2.3.7-3.2.1-1-.6-1-1.6-1.5-2.1-1-1-2.5-1.5-3.5-1-.9.6-1 2-1 3.2.1 1.1 1.2 2.1 2.1 3.2.9.6 2.1.6 3.2.1z"/></svg></div>
                    <p class="font-bold text-primary">2012</p><h3 class="text-xl font-bold mb-2">Fondation</h3>
                </div>
                <div class="flex flex-col items-center text-center px-4">
                    <div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-primary text-primary mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M8 6h10"/><path d="M6 12h12"/><path d="M4 18h14"/></svg></div>
                    <p class="font-bold text-primary">2015</p><h3 class="text-xl font-bold mb-2">100M€ Prêtés</h3>
                </div>
                <div class="flex flex-col items-center text-center px-4">
                    <div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-primary text-primary mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg></div>
                    <p class="font-bold text-primary">2018</p><h3 class="text-xl font-bold mb-2">Expansion</h3>
                </div>
                <div class="flex flex-col items-center text-center px-4">
                    <div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-primary text-primary mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M12 17.5 7.5 20l1-5.2-4-3.6 5.3-.6L12 6l2.2 5.2 5.3.6-4 3.6 1 5.2z"/></svg></div>
                    <p class="font-bold text-primary">2021</p><h3 class="text-xl font-bold mb-2">Innovation IA</h3>
                </div>
                <div class="flex flex-col items-center text-center px-4">
                    <div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-primary text-primary mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
                    <p class="font-bold text-primary">2024+</p><h3 class="text-xl font-bold mb-2">Avenir</h3>
                </div>
            </div>
        </div>
        <div class="mt-16 text-center"><a class="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2" href="/a-propos">Découvrir notre histoire complète</a></div>
    </section>

    <!-- Section: Derniers Articles -->
    <section class="bg-background py-16 md:py-24">
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
                <!-- Article 1 -->
                <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                    <a href="/blog/5-strategies-pour-ameliorer-votre-dossier-de-pret-entreprise" class="block"><div class="relative h-48 w-full"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/blog-1.jpg" alt="Un entrepreneur examinant des graphiques de croissance." class="object-cover w-full h-full"></div></a>
                    <div class="flex flex-col flex-grow p-6">
                        <div class="p-0">
                            <h3 class="text-xl leading-tight group-hover:text-primary transition-colors text-2xl font-semibold tracking-tight"><a href="/blog/5-strategies-pour-ameliorer-votre-dossier-de-pret-entreprise">5 stratégies pour améliorer votre dossier de prêt entreprise</a></h3>
                            <p class="pt-2 text-xs text-sm text-muted-foreground">18 Juil 2024 • Julien Moreau, Directeur Financier</p>
                        </div>
                        <div class="p-0 pt-3 flex-grow"><p class="text-sm text-muted-foreground">Mettez toutes les chances de votre côté. Découvrez nos conseils pour présenter un dossier de financement solide et convaincant.</p></div>
                        <div class="p-0 pt-4"><a class="p-0 text-sm text-primary underline-offset-4 hover:underline inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium" href="/blog/5-strategies-pour-ameliorer-votre-dossier-de-pret-entreprise">Lire la suite <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></div>
                    </div>
                </div>
                <!-- Répéter pour les autres articles -->
            </div>
            <div class="mt-12 text-center"><a class="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2" href="/blog">Voir tous les articles</a></div>
         </div>
    </section>

    <!-- Section: Partenaires -->
    <section class="bg-background py-16 md:py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:max-w-none text-center">
                <div class="flex items-center gap-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M22 13.4V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3"/><path d="m11.5 2 2 2 4-4"/><path d="m11.5 7 2 2 4-4"/></svg>
                    <h2 class="text-3xl font-bold tracking-tight font-headline">Nos partenaires de confiance</h2>
                </div>
                <p class="mt-4 text-lg text-muted-foreground">Nous collaborons avec des institutions financières de premier plan pour vous offrir les meilleures conditions.</p>
            </div>
            <div class="mx-auto mt-16 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:mx-0 lg:grid-cols-6">
                <div class="col-span-1 flex justify-center"><p class="text-xl font-semibold text-muted-foreground/60 transition-opacity hover:opacity-100">Global Finance</p></div>
                <div class="col-span-1 flex justify-center"><p class="text-xl font-semibold text-muted-foreground/60 transition-opacity hover:opacity-100">Innovate Capital</p></div>
                <div class="col-span-1 flex justify-center"><p class="text-xl font-semibold text-muted-foreground/60 transition-opacity hover:opacity-100">Secure Funds</p></div>
                <div class="col-span-1 flex justify-center"><p class="text-xl font-semibold text-muted-foreground/60 transition-opacity hover:opacity-100">Equity Partners</p></div>
                <div class="col-span-1 flex justify-center"><p class="text-xl font-semibold text-muted-foreground/60 transition-opacity hover:opacity-100">VentureNet</p></div>
                <div class="col-span-1 flex justify-center"><p class="text-xl font-semibold text-muted-foreground/60 transition-opacity hover:opacity-100">Trust Capital</p></div>
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
            <!-- NOTE: Le carrousel est interactif. Utilisez un plugin WordPress pour recréer cet effet. Voici une version statique. -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="h-full flex flex-col p-1">
                    <div class="h-full flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div class="flex flex-col items-start gap-4 p-6 flex-grow">
                             <div class="flex items-center gap-0.5"><svg>...</svg></div>
                             <p class="text-muted-foreground italic flex-grow">"Le processus de prêt a été incroyablement simple et rapide. VylsCapital a vraiment compris mes besoins d'entrepreneur."</p>
                             <div class="pt-4 border-t w-full">
                                 <p class="font-semibold">Marie Dubois</p>
                                 <p class="text-sm text-muted-foreground">Paris, France</p>
                             </div>
                        </div>
                    </div>
                </div>
                 <!-- Répéter pour d'autres témoignages -->
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
            <!-- NOTE: L'accordéon est interactif. Il sera fonctionnel si votre thème charge un JS de base, mais un plugin peut offrir plus de contrôle. -->
            <div class="w-full">
                <div class="border-b">
                    <h3 class="flex flex-1 items-center justify-between py-4 font-medium">Quelles sont les exigences minimales pour un prêt ?</h3>
                    <div class="overflow-hidden text-sm"><div class="pb-4 pt-0"><p class="text-base text-muted-foreground">Généralement, nous recherchons une situation financière stable...</p></div></div>
                </div>
                <!-- Répéter pour les autres questions -->
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
?>
