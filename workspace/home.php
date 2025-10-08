<?php
/**
 * The template for displaying the blog posts index
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package capfinfy
 */

get_header();
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
            <?php
            if ( have_posts() ) :
                while ( have_posts() ) : the_post();
                    ?>
                    <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                        <a href="<?php the_permalink(); ?>" class="block">
                            <div class="relative h-56 w-full">
                                <?php if (has_post_thumbnail()) : ?>
                                    <?php the_post_thumbnail('medium_large', ['class' => 'object-cover w-full h-full']); ?>
                                <?php else: ?>
                                    <div class="w-full h-full bg-muted"></div>
                                <?php endif; ?>
                            </div>
                        </a>
                        <div class="flex flex-col flex-grow p-6">
                            <div class="p-0">
                                <h3 class="leading-tight group-hover:text-primary transition-colors font-semibold text-xl"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                                <p class="pt-2 text-xs text-muted-foreground"><?php echo get_the_date(); ?> &bull; <?php the_author(); ?></p>
                            </div>
                            <div class="p-0 pt-4 flex-grow">
                                <p class="text-muted-foreground text-sm"><?php echo wp_trim_words( get_the_excerpt(), 25, '...' ); ?></p>
                            </div>
                            <div class="p-0 pt-6">
                                <a href="<?php the_permalink(); ?>" class="text-sm font-medium text-primary underline-offset-4 hover:underline inline-flex items-center">
                                    Lire la suite
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <?php
                endwhile;
            else :
                ?>
                <p class="col-span-3 text-center text-muted-foreground">Aucun article trouvé.</p>
                <?php
            endif;
            ?>
        </div>
        
        <div class="mt-16">
            <?php the_posts_pagination(); ?>
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
