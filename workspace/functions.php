<?php
/**
 * vyls functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package vyls
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function vyls_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		*/
	load_theme_textdomain( 'vyls', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'main-menu' => esc_html__( 'Menu Principal', 'vyls' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );
}
add_action( 'after_setup_theme', 'vyls_setup' );


/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function vyls_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'vyls' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'vyls' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'vyls_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function vylsfond_enqueue_assets() {
    // Main theme stylesheet from style.css (which will contain the built CSS from main.css)
    wp_enqueue_style(
        'vylsfond-theme-style',
        get_stylesheet_uri(),
        array(),
        _S_VERSION
    );

    // Google Fonts (Inter)
    wp_enqueue_style(
        'vylsfond-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    // Main JavaScript file (for simple interactions like menu/FAQ)
    wp_enqueue_script(
        'vylsfond-main-js',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        _S_VERSION,
        true
    );

    // Conditionally load the React calculator app
    if ( is_front_page() || is_page_template( 'template-pret-auto.php' ) || is_page_template( 'template-pret-immo.php' ) || is_page_template( 'template-pret-personnel.php' ) || is_page_template( 'template-rachat-de-credit.php' ) || is_page_template( 'template-pret-entreprise.php' ) ) {
        wp_enqueue_script(
            'vylsfond-calculator-app',
            get_template_directory_uri() . '/build/static/js/calculator.js',
            array('wp-element'), // Dependency for React in WP
            null,
            true
        );
    }

    // Conditionally load the React banking app
    if ( is_page_template( 'template-banque.php' ) ) {
        wp_enqueue_script(
            'vylsfond-banking-app',
            get_template_directory_uri() . '/build/static/js/banking.js',
            array('wp-element'), // Dependency for React in WP
            null,
            true
        );
    }


	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'vylsfond_enqueue_assets' );

/**
 * Custom Walker to remove <li> tags from nav menu items for desktop
 */
class VylsFond_Walker_Nav_Menu_Desktop extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        
        // Gérer le cas où le menu de service est un dropdown
        $is_service_parent = in_array('menu-item-has-children', $classes);
        $link_class = 'transition-colors hover:text-primary ' . esc_attr(join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args)));
        
        if ($is_service_parent) {
             $output .= '<div class="relative group">';
             $output .= '<a href="' . esc_url($item->url) . '" class="' . $link_class . ' flex items-center gap-1"> ' . esc_html($item->title);
             $output .= '<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
             $output .= '</a>';
        } else {
             $output .= '<a href="' . esc_url($item->url) . '" class="' . $link_class . '">' . esc_html($item->title) . '</a>';
        }
    }

    function end_el(&$output, $item, $depth = 0, $args = null) {
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        if (in_array('menu-item-has-children', $classes)) {
            $output .= "</div>";
        }
        $output .= "";
    }

    function start_lvl( &$output, $depth = 0, $args = null ) {
        $output .= '<div class="absolute top-full left-0 mt-2 w-56 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-1">';
    }

    function end_lvl( &$output, $depth = 0, $args = null ) {
        $output .= '</div>';
    }
}


/**
 * Custom Walker for the mobile menu to keep a simpler structure
 */
class VylsFond_Walker_Nav_Menu_Mobile extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        
        $output .= '<a data-mobile-menu-close href="' . esc_url($item->url) . '" class="text-lg font-medium transition-colors hover:text-primary pl-2 ' . esc_attr($class_names) . '">' . esc_html($item->title) . '</a>';
    }
    function end_el(&$output, $item, $depth = 0, $args = null) {
        $output .= "";
    }
}
