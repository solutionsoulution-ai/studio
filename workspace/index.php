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

<main class="flex-1">
    <div class="container mx-auto py-16 md:py-24 px-4">
        <div class="prose-content lg:prose-xl mx-auto">
            <?php
            if ( have_posts() ) :
                while ( have_posts() ) : the_post();
                    the_title( '<h1 class="font-headline">', '</h1>' );
                    the_content();
                endwhile;
            else :
                echo '<p>Aucun contenu trouvé.</p>';
            endif;
            ?>
        </div>
    </div>
</main>

<?php
get_footer();
?>