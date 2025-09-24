<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package vyls
 */

get_header();
?>

<main class="flex-1">
    <?php while (have_posts()) : the_post(); ?>

        <!-- Hero Section -->
        <section class="relative h-80 md:h-96 bg-muted/30">
            <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('full', ['class' => 'object-cover w-full h-full']); ?>
            <?php endif; ?>
            <div class="absolute inset-0 bg-black/60"></div>
            <div class="relative container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
                <h1 class="text-3xl md:text-5xl font-bold font-headline max-w-4xl"><?php the_title(); ?></h1>
                <div class="mt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm">
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                        <span><?php echo get_the_date(); ?></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span><?php the_author(); ?></span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Article Content -->
        <section class="container mx-auto py-12 md:py-24 px-4">
            <div class="grid lg:grid-cols-4 gap-12">
                <article class="lg:col-span-3 prose-content lg:prose-lg max-w-none">
                    <?php the_content(); ?>
                </article>

                <!-- Sidebar -->
                <aside class="lg:col-span-1 space-y-8 sticky top-24 h-fit">
                     <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div class="flex flex-col space-y-1.5 p-6">
                            <h3 class="text-2xl font-semibold leading-none tracking-tight">À propos de l'auteur</h3>
                        </div>
                        <div class="p-6 pt-0 text-center">
                            <h4 class="font-semibold"><?php the_author_meta('display_name'); ?></h4>
                        </div>
                    </div>

                    <div class="rounded-lg border bg-primary text-primary-foreground shadow-sm">
                        <div class="flex flex-col space-y-1.5 p-6">
                            <h3 class="text-2xl font-semibold leading-none tracking-tight">Prêt à vous lancer ?</h3>
                            <p class="text-sm text-primary-foreground/80">Discutons de votre projet. Nos experts sont là pour vous aider.</p>
                        </div>
                        <div class="p-6 pt-0 space-y-4">
                             <a href="/demande-de-pret" class="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 rounded-md px-8 w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
                                Faire une demande
                            </a>
                            <a href="/contact" class="border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 rounded-md px-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                Contacter un conseiller
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </section>

        <!-- Comments Section -->
        <?php if (comments_open() || get_comments_number()) : ?>
            <section class="bg-muted/30 py-16 md:py-24">
                <div class="container mx-auto max-w-4xl px-4">
                    <?php comments_template(); ?>
                </div>
            </section>
        <?php endif; ?>

    <?php endwhile; ?>
</main>

<?php
get_footer();
?>
