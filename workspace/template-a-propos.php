<?php
/**
 * Template Name: Page - À Propos
 *
 * @package vyls
 */

get_header();
?>

<main class="flex-1">
    <section class="container mx-auto py-16 md:py-24">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div class="order-2 md:order-1">
              <h1 class="text-4xl md:text-5xl font-bold font-headline mb-4">
                À Propos de VylsFond
              </h1>
              <p class="text-lg text-muted-foreground mb-6">
                Notre mission : rendre le financement plus accessible, plus rapide et plus humain en combinant le meilleur de la technologie et une expertise humaine.
              </p>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-accent"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  <span>Solutions de prêt rapides et transparentes.</span>
                </li>
                <li class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-accent"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  <span>Accompagnement par des experts dédiés.</span>
                </li>
                <li class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-accent"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  <span>Partenaire de confiance pour particuliers et entreprises.</span>
                </li>
              </ul>
              <a href="/contact" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8">Nous Contacter</a>
            </div>
            <div class="order-1 md:order-2">
              <img src="https://i.postimg.cc/Hx8SZ01Q/undraw-finance-guy-avatar-vhop-removebg-preview.png" alt="Illustration d'un conseiller financier" width="600" height="400" class="rounded-lg object-cover w-full">
            </div>
        </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="container mx-auto pb-16 md:pb-24">
        <div class="grid md:grid-cols-2 gap-12 items-start">
            <div>
                <h2 class="text-3xl font-bold font-headline mb-4">Notre Histoire</h2>
                <p class="text-muted-foreground text-base leading-relaxed">
                    Fondée en 2012, VylsFond est née d'une ambition simple : révolutionner l'accès au financement pour les particuliers et les entreprises en Europe. Frustrés par la lenteur et la complexité des systèmes bancaires traditionnels, nous avons décidé de créer une plateforme qui allie le meilleur de la technologie et une expertise humaine pour offrir des solutions de prêt rapides, transparentes et adaptées aux besoins réels de nos clients.
                </p>
            </div>
             <div>
                <h3 class="font-bold text-xl mb-2 text-primary">Notre Mission</h3>
                <p class="mb-6 text-muted-foreground">Fournir à nos clients les ressources financières dont ils ont besoin pour atteindre leurs objectifs, que ce soit pour lancer une entreprise, acheter une maison ou réaliser un projet personnel.</p>
                
                <h3 class="font-bold text-xl mb-2 text-primary">Notre Vision</h3>
                <p class="text-muted-foreground">Devenir le partenaire financier de confiance pour une génération d'entrepreneurs et de particuliers en Europe, en étant le leader du financement éthique et innovant.</p>
            </div>
        </div>
    </section>
    
    <!-- Timeline Section -->
    <section class="bg-muted/30 w-full py-16 md:py-24">
         <div class="container mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold font-headline">Notre Parcours</h2>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Les grandes étapes qui ont façonné VylsFond.
                </p>
            </div>
            <!-- NOTE: This is a static version of a carousel. Use a slider plugin for interactivity. -->
            <div class="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div class="p-1 h-full"><div class="h-full text-center rounded-lg border bg-card text-card-foreground shadow-sm"><div class="p-6"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.1-3.2-.6-1-1.6-1-2.1-1.5-1-1-1.5-2.5-1-3.5.6-1 2.1-1.1 3.2-.1 1 .9 2.4.9 3.2.1 1.2-1.5 5-2 5-2s-.5 3.74-2 5c-.84.71-2.3.7-3.2.1-1-.6-1-1.6-1.5-2.1-1-1-2.5-1.5-3.5-1-.9.6-1 2-1 3.2.1 1.1 1.2 2.1 2.1 3.2.9.6 2.1.6 3.2.1z"/></svg></div><p class="font-bold text-primary text-lg">2012</p><h3 class="text-2xl font-semibold leading-none tracking-tight">Fondation et Lancement</h3></div><div class="p-6 pt-0"><p class="text-muted-foreground">VylsFond est créé avec la mission de rendre le prêt plus simple, rapide et accessible pour tous en Europe.</p></div></div></div>
                <!-- ... Répéter pour les autres éléments de la timeline ... -->
            </div>
         </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 md:py-24">
        <div class="container mx-auto">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold font-headline">Nos Valeurs Fondamentales</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                 <div class="text-center p-6 rounded-lg border bg-card"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><path d="M22 13.4V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3"/><path d="m11.5 2 2 2 4-4"/><path d="m11.5 7 2 2 4-4"/></svg></div><h3 class="text-xl font-semibold mb-2">Transparence</h3><p class="text-muted-foreground">Nous croyons en une communication claire et honnête à chaque étape.</p></div>
                 <div class="text-center p-6 rounded-lg border bg-card"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><path d="M15 12h-5"/><path d="M12.5 14.5v-5"/><circle cx="12" cy="12" r="10"/></svg></div><h3 class="text-xl font-semibold mb-2">Innovation</h3><p class="text-muted-foreground">Nous utilisons la technologie pour simplifier et améliorer les services financiers.</p></div>
                 <div class="text-center p-6 rounded-lg border bg-card"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div><h3 class="text-xl font-semibold mb-2">Orientation Client</h3><p class="text-muted-foreground">Votre succès est notre priorité. Nous nous engageons à trouver la meilleure solution pour vous.</p></div>
            </div>
        </div>
    </section>

     <!-- Team Section -->
    <section class="container mx-auto py-16 md:py-24">
         <div class="text-center mb-12">
            <div class="flex items-center justify-center gap-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg>
                <h2 class="text-3xl font-bold font-headline">Notre Équipe Dirigeante</h2>
            </div>
            <p class="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Rencontrez les experts passionnés qui travaillent pour concrétiser vos projets.
            </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div class="text-center p-4 rounded-lg bg-card border"><h4 class="font-semibold text-lg">Alexandre Dubois</h4><p class="text-sm text-primary">Directeur Général</p></div>
            <div class="text-center p-4 rounded-lg bg-card border"><h4 class="font-semibold text-lg">David Rousseau</h4><p class="text-sm text-primary">Directeur Juridique</p></div>
            <div class="text-center p-4 rounded-lg bg-card border"><h4 class="font-semibold text-lg">Julien Moreau</h4><p class="text-sm text-primary">Directeur Financier</p></div>
            <div class="text-center p-4 rounded-lg bg-card border"><h4 class="font-semibold text-lg">Benoît Leroy</h4><p class="text-sm text-primary">Directeur d'Analyse Financière</p></div>
            <div class="text-center p-4 rounded-lg bg-card border"><h4 class="font-semibold text-lg">Isabelle Petit</h4><p class="text-sm text-primary">Directrice des Assurances</p></div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary text-primary-foreground">
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

    