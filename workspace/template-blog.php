<?php
/**
 * Template Name: Page - Blog
 *
 * @package capfinfy
 */

get_header();

$blog_posts = [
    [
        'slug' => 'blog/5-strategies-pour-ameliorer-votre-dossier-de-pret-entreprise',
        'title' => '5 stratégies pour améliorer votre dossier de prêt entreprise',
        'description' => 'Mettez toutes les chances de votre côté. Découvrez nos conseils pour présenter un dossier de financement solide et convaincant.',
        'date' => '18 Juil 2024',
        'author' => 'Julien Moreau, Directeur Financier',
        'imageUrl' => 'https://i.postimg.cc/cJzS4fKP/austin-distel-w-D1-LRb9-Oe-Eo-unsplash.jpg',
        'imageAlt' => "Un entrepreneur examinant des graphiques de croissance."
    ],
    [
        'slug' => 'blog/rachat-de-credit-quand-et-pourquoi-regrouper-ses-dettes',
        'title' => 'Rachat de crédit : quand et pourquoi regrouper ses dettes ?',
        'description' => 'Le rachat de crédit peut être une solution puissante pour simplifier vos finances. Est-ce le bon moment pour vous ?',
        'date' => '15 Juil 2024',
        'author' => 'Isabelle Petit, Directrice des Assurances',
        'imageUrl' => 'https://i.postimg.cc/kgn9jJ3Y/samuel-regan-asante-u-Rcbqai-Kk-Ko-unsplash.jpg',
        'imageAlt' => "Des factures et des cartes de crédit sont organisées en une seule pile ordonnée."
    ],
    [
        'slug' => 'blog/pret-immobilier-les-7-erreurs-a-eviter',
        'title' => 'Prêt immobilier : les 7 erreurs à éviter pour un primo-accédant',
        'description' => "L'achat de votre première maison est une étape majeure. Évitez ces pièges courants pour une expérience sereine.",
        'date' => '12 Juil 2024',
        'author' => 'Alexandre Dubois, Directeur Général',
        'imageUrl' => 'https://i.postimg.cc/kG03FCNs/hiveboxx-de-X-KChubo-Y-unsplash.jpg',
        'imageAlt' => "Un jeune couple regarde avec optimisme les plans de leur future maison."
    ],
    [
        'slug' => 'blog/le-pret-personnel-un-outil-flexible',
        'title' => 'Le prêt personnel : un outil flexible pour concrétiser vos projets',
        'description' => "Un voyage, des travaux, un événement ? Découvrez comment le prêt personnel peut vous aider à réaliser vos envies sans contraintes.",
        'date' => '10 Juil 2024',
        'author' => 'David Rousseau, Directeur Juridique',
        'imageUrl' => 'https://i.postimg.cc/Dz6hVtFf/walls-io-8mxs2-EDYGKQ-unsplash.jpg',
        'imageAlt' => "Une personne souriante planifie un projet sur une table de travail."
    ]
];
?>

<main class="flex-1">
    <section class="container mx-auto py-16 md:py-24 px-4">
       <div class="text-center mb-16">
          <div class="flex items-center gap-3 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              <h1 class="text-3xl md:text-4xl font-bold tracking-tight font-headline">Notre Blog</h1>
          </div>
          <p class="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Nos experts partagent leurs analyses et conseils pour vous aider à naviguer dans le monde du financement.
          </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <?php foreach ($blog_posts as $post) : ?>
          <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
            <a href="/<?php echo esc_attr($post['slug']); ?>" class="block">
              <div class="relative h-56 w-full">
                <img
                  src="<?php echo esc_url($post['imageUrl']); ?>"
                  alt="<?php echo esc_attr($post['imageAlt']); ?>"
                  class="object-cover w-full h-full"
                />
              </div>
            </a>
             <div class="flex flex-col flex-grow p-6">
                <div class="p-0">
                  <h3 class="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    <a href="/<?php echo esc_attr($post['slug']); ?>"><?php echo esc_html($post['title']); ?></a>
                  </h3>
                  <p class="pt-2 text-xs text-muted-foreground"><?php echo esc_html($post['date']); ?> &bull; <?php echo esc_html($post['author']); ?></p>
                </div>
                <div class="p-0 pt-4 flex-grow">
                  <p class="text-sm text-muted-foreground"><?php echo esc_html($post['description']); ?></p>
                </div>
                <div class="p-0 pt-6">
                    <a href="/<?php echo esc_attr($post['slug']); ?>" class="text-sm font-medium text-primary underline-offset-4 hover:underline inline-flex items-center">
                        Lire la suite
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                </div>
             </div>
          </div>
        <?php endforeach; ?>
      </div>

    </section>
    
    <section class="bg-primary text-primary-foreground">
        <div class="container mx-auto text-center py-16 px-4">
            <h2 class="text-3xl font-bold">Prêt à démarrer votre projet ?</h2>
            <p class="mt-2 text-lg max-w-xl mx-auto opacity-90">
                Notre équipe est là pour vous aider à trouver la meilleure solution de financement.
            </p>
            <div class="mt-8">
                <a href="/demande-de-pret" class="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 rounded-md px-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
                    Faire une demande
                </a>
            </div>
        </div>
    </section>
</main>
<?php
get_footer();
?>
