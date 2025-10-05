<?php
/**
 * Template Name: Page - Blog
 *
 * @package vyls
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
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
            $args = array(
                'post_type' => 'post',
                'post_status' => 'publish',
                'posts_per_page' => 9,
                'paged' => $paged,
            );
            $blog_posts = new WP_Query($args);

            if ($blog_posts->have_posts()) :
                while ($blog_posts->have_posts()) : $blog_posts->the_post();
            ?>
                    <div class="flex flex-col group hover:border-primary transition-all overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                        <a href="<?php the_permalink(); ?>" class="block">
                            <div class="relative h-56 w-full">
                                <?php if (has_post_thumbnail()) : ?>
                                    <?php the_post_thumbnail('medium_large', ['class' => 'object-cover w-full h-full']); ?>
                                <?php else: ?>
                                    <div class="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">Image non disponible</div>
                                <?php endif; ?>
                            </div>
                        </a>
                        <div class="flex flex-col flex-grow p-6">
                            <div class="p-0">
                                <h3 class="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>
                                <p class="pt-2 text-xs text-muted-foreground"><?php echo get_the_date(); ?> &bull; <?php the_author(); ?></p>
                            </div>
                            <div class="p-0 pt-4 flex-grow">
                                <p class="text-sm text-muted-foreground"><?php echo wp_trim_words( get_the_excerpt(), 20, '...' ); ?></p>
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
                <p class="col-span-full text-center text-muted-foreground">Aucun article trouvé.</p>
            <?php
            endif;
            ?>
        </div>

        <div class="mt-16">
            <?php
            $big = 999999999;
            echo paginate_links(array(
                'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                'format' => '?paged=%#%',
                'current' => max(1, get_query_var('paged')),
                'total' => $blog_posts->max_num_pages,
                'prev_text' => __('&laquo; Précédent'),
                'next_text' => __('Suivant &raquo;'),
            ));
            wp_reset_postdata();
            ?>
        </div>
    </section>
</main>

<?php
get_footer();
?>
