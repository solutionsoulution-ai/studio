<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package vyls
 */

get_header();
?>

<main class="flex-1">
    <div class="container mx-auto py-16 md:py-24 px-4">
        <div class="prose-content lg:prose-xl mx-auto">
            <?php
            while ( have_posts() ) :
                the_post();

                the_title( '<h1 class="font-headline">', '</h1>' );
                the_content();

            endwhile; // End of the loop.
            ?>
        </div>
    </div>
</main>

<?php
get_footer();
?>
