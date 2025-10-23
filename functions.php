<?php
/**
 * capfinfy functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package capfinfy
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function capfinfy_setup() {
	load_theme_textdomain( 'capfinfy', get_template_directory() . '/languages' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );

	register_nav_menus(
		array(
			'main-menu' => esc_html__( 'Menu Principal', 'capfinfy' ),
		)
	);

	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);
	add_theme_support( 'customize-selective-refresh-widgets' );
}
add_action( 'after_setup_theme', 'capfinfy_setup' );

/**
 * Enqueue scripts and styles.
 */
function capfinfy_enqueue_assets() {
    wp_enqueue_style( 'capfinfy-theme-style', get_stylesheet_uri(), array(), _S_VERSION );
    wp_enqueue_style( 'capfinfy-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), null );
    wp_enqueue_script( 'capfinfy-main-js', get_template_directory_uri() . '/assets/js/main.js', array(), _S_VERSION, true );
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'capfinfy_enqueue_assets' );
