<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package vyls
 */

get_header();
?>

<main class="container mx-auto py-16 md:py-24 px-4">
    <div class="text-center mb-16">
        <div class="flex items-center gap-3 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <h1 class="text-3xl md:text-4xl font-bold tracking-tight font-headline"><?php
                if ( is_home() && ! is_front_page() ) {
                    single_post_title();
                } else {
                    echo 'Blog';
                }
            ?></h1>
        </div>
         <p class="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Nos experts partagent leurs analyses et conseils pour vous aider à naviguer dans le monde du financement.
        </p>
    </div>

    <?php if (have_posts()) : ?>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php while (have_posts()) : the_post(); ?>
                <article class="flex flex-col group hover:border-primary transition-all overflow-hidden border rounded-lg bg-card text-card-foreground shadow-sm">
                    <a href="<?php the_permalink(); ?>" class="block">
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="relative h-56 w-full">
                                <?php the_post_thumbnail('large', ['class' => 'object-cover w-full h-full']); ?>
                            </div>
                        <?php else: ?>
                            <div class="relative h-56 w-full bg-muted"></div>
                        <?php endif; ?>
                    </a>
                    <div class="flex flex-col flex-grow p-6">
                        <header class="p-0">
                            <h2 class="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <p class="pt-2 text-sm text-muted-foreground"><?php echo get_the_date(); ?> &bull; <?php the_author(); ?></p>
                        </header>
                        <div class="p-0 pt-4 flex-grow">
                            <div class="text-sm text-muted-foreground"><?php the_excerpt(); ?></div>
                        </div>
                        <footer class="p-0 pt-6">
                            <a href="<?php the_permalink(); ?>" class="text-primary font-semibold hover:underline inline-flex items-center gap-2 text-sm">
                                Lire la suite <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </a>
                        </footer>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <div class="mt-16">
        <?php
            the_posts_pagination( array(
                'mid_size'  => 2,
                'prev_text' => __( '&larr; Précédent', 'vyls' ),
                'next_text' => __( 'Suivant &rarr;', 'vyls' ),
                'screen_reader_text' => ' ',
                'before_page_number' => '<span class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">',
                'after_page_number' => '</span>',
                'current_item_class' => 'border-primary text-primary border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium',
            ) );
        ?>
        </div>

    <?php else : ?>
