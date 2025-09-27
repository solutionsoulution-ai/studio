<?php
/**
 * Template Name: Service - Rachat de Crédit
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
                Rachat de Crédit
              </h1>
              <p class="text-lg text-muted-foreground mb-6">
                Regroupez tous vos crédits en un seul pour réduire vos mensualités et simplifier la gestion de votre budget. Respirez et reprenez le contrôle de vos finances.
              </p>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-accent"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  <span>Une seule mensualité, un seul interlocuteur.</span>
                </li>
                <li class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-accent"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  <span>Baisse potentielle de votre taux d'endettement.</span>
                </li>
                <li class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-accent"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  <span>Possibilité de financer un nouveau projet en même temps.</span>
                </li>
              </ul>
              <a href="/demande-de-pret" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8">Commencer ma demande</a>
            </div>
            <div class="order-1 md:order-2">
              <img src="<?php echo get_template_directory_uri(); ?>/assets/images/rachat-de-credit.jpg" alt="Plusieurs cartes de crédit et factures organisées sur un bureau." width="600" height="400" class="rounded-lg shadow-lg object-cover w-full">
            </div>
        </div>
    </section>

    <section class="w-full py-16 md:py-24 bg-muted/30">
        <div class="container mx-auto">
            <div class="text-center mb-10">
                <div class="flex items-center gap-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M12 17.5 7.5 20l1-5.2-4-3.6 5.3-.6L12 6l2.2 5.2 5.3.6-4 3.6 1 5.2z"/></svg>
                    <h2 class="text-3xl font-bold tracking-tight font-headline">Pourquoi faire un Rachat de Crédit ?</h2>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="text-center border-transparent shadow-md hover:shadow-xl hover:border-primary transition-all rounded-lg border bg-card text-card-foreground"><div class="p-6"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div><h3 class="text-2xl font-semibold leading-none tracking-tight">Réduire vos mensualités</h3></div><div class="p-6 pt-0"><p class="text-sm text-muted-foreground">Allégez votre charge de remboursement mensuelle en regroupant vos prêts et en allongeant la durée, et gagnez en pouvoir d'achat.</p></div></div>
                <div class="text-center border-transparent shadow-md hover:shadow-xl hover:border-primary transition-all rounded-lg border bg-card text-card-foreground"><div class="p-6"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/><path d="M3 10h18"/></svg></div><h3 class="text-2xl font-semibold leading-none tracking-tight">Simplifier votre budget</h3></div><div class="p-6 pt-0"><p class="text-sm text-muted-foreground">Ne gérez plus qu'un seul prélèvement et un seul interlocuteur. La gestion de vos finances personnelles devient plus claire et plus simple.</p></div></div>
                <div class="text-center border-transparent shadow-md hover:shadow-xl hover:border-primary transition-all rounded-lg border bg-card text-card-foreground"><div class="p-6"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-primary"><path d="M15 12h-5"/><path d="M12.5 14.5v-5"/><circle cx="12" cy="12" r="10"/></svg></div><h3 class="text-2xl font-semibold leading-none tracking-tight">Financer un nouveau projet</h3></div><div class="p-6 pt-0"><p class="text-sm text-muted-foreground">Profitez du regroupement pour inclure le financement d'un nouveau projet (voiture, travaux...) sans alourdir votre endettement.</p></div></div>
            </div>
        </div>
    </section>

    <section class="w-full py-16 md:py-24">
        <div class="container mx-auto">
            <div class="text-center mb-10"><h2 class="text-3xl font-bold tracking-tight font-headline">Comment ça marche ?</h2><p class="mt-4 text-lg text-muted-foreground">Suivez ces étapes simples pour obtenir votre financement.</p></div>
            <div class="relative"><div class="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-border -translate-y-1/2 hidden md:block" aria-hidden="true"></div><div class="relative grid md:grid-cols-3 gap-12"><div class="flex flex-col items-center text-center"><div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-4 ring-8 ring-background"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></div><h3 class="text-xl font-bold mb-2">1. Simulation Gratuite</h3><p class="text-muted-foreground">Listez vos crédits en cours et simulez votre nouvelle mensualité unique en quelques minutes.</p></div><div class="flex flex-col items-center text-center"><div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-4 ring-8 ring-background"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div><h3 class="text-xl font-bold mb-2">2. Étude de votre Dossier</h3><p class="text-muted-foreground">Un expert analyse votre situation financière pour construire la meilleure offre de regroupement.</p></div><div class="flex flex-col items-center text-center"><div class="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-4 ring-8 ring-background"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M2 12v3c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-3"/><path d="M12 16v-1"/><path d="m15 12-3-3-3 3"/><path d="M12 3v1"/></svg></div><h3 class="text-xl font-bold mb-2">3. Simplifiez vos Finances</h3><p class="text-muted-foreground">Nous remboursons vos anciens créanciers. Vous n'avez plus qu'une seule mensualité, plus facile à gérer.</p></div></div></div>
        </div>
    </section>

    <section id="faq" class="container mx-auto py-16 md:py-24">
        <div class="max-w-3xl mx-auto">
            <div class="text-center mb-10">
                <div class="flex items-center gap-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                    <h2 class="text-3xl font-bold tracking-tight font-headline">Questions Fréquentes - Rachat de Crédit</h2>
                </div>
            </div>
            <div class="w-full">
                <div data-state="closed" class="border-b">
                    <h3 data-accordion-trigger class="flex flex-1 items-center justify-between py-4 font-medium text-lg cursor-pointer">Quels types de crédits peuvent être rachetés ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0 transition-transform duration-200"><path d="m6 9 6 6 6-6"/></svg></h3>
                    <div data-accordion-content class="overflow-hidden text-sm transition-all" style="max-height: 0px;"><div class="pb-4 pt-0 text-base text-muted-foreground">Nous pouvons regrouper la plupart de vos crédits à la consommation : prêts personnels, crédits renouvelables, prêts auto, etc. Les prêts immobiliers peuvent aussi être inclus dans l'opération sous certaines conditions.</div></div>
                </div>
                <div data-state="closed" class="border-b">
                    <h3 data-accordion-trigger class="flex flex-1 items-center justify-between py-4 font-medium text-lg cursor-pointer">Le rachat de crédit entraîne-t-il des frais ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0 transition-transform duration-200"><path d="m6 9 6 6 6-6"/></svg></h3>
                    <div data-accordion-content class="overflow-hidden text-sm transition-all" style="max-height: 0px;"><div class="pb-4 pt-0 text-base text-muted-foreground">L'opération peut inclure des frais de dossier. De plus, le remboursement anticipé de vos anciens crédits peut engendrer des pénalités. Cependant, l'objectif est que le gain sur vos mensualités compense largement ces frais.</div></div>
                </div>
                <div data-state="closed" class="border-b">
                    <h3 data-accordion-trigger class="flex flex-1 items-center justify-between py-4 font-medium text-lg cursor-pointer">Est-ce que le rachat de crédit va vraiment améliorer mon taux d'endettement ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0 transition-transform duration-200"><path d="m6 9 6 6 6-6"/></svg></h3>
                    <div data-accordion-content class="overflow-hidden text-sm transition-all" style="max-height: 0px;"><div class="pb-4 pt-0 text-base text-muted-foreground">Oui, c'est l'un des principaux objectifs. En allongeant la durée de remboursement et en négociant un taux unique, nous réduisons le montant total de vos mensualités, ce qui diminue mécaniquement votre taux d'endettement.</div></div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();
?>
