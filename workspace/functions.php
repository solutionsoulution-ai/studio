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
    if ( is_page_template( 'template-banque.php' ) && is_user_logged_in() ) {
        wp_enqueue_script(
            'vylsfond-banking-app',
            get_template_directory_uri() . '/build/static/js/banking.js',
            array('wp-element'), // Dependency for React in WP
            null,
            true
        );

        // =========================================================================================
        // INJECTION DES DONNÉES DU CLIENT DANS L'APPLICATION REACT
        // =========================================================================================
        $current_user = wp_get_current_user();
        
        // On récupère le nom d'utilisateur qui sert de clé
        $user_login = $current_user->user_login;

        // On récupère les données de la "base de données" fictive définie plus bas.
        $customer_database = get_fictive_customer_database();

        // On cherche si l'utilisateur connecté existe dans notre base de données fictive.
        $customer_data = isset($customer_database[$user_login]) ? $customer_database[$user_login] : null;

        // Si on a trouvé des données pour ce client, on les prépare.
        if ($customer_data) {
            $initial_banking_data = array(
                'user' => array(
                    'name' => $current_user->display_name,
                    'email' => $current_user->user_email,
                    'memberSince' => date_i18n('d M Y', strtotime($current_user->user_registered)),
                ),
                'account' => array(
                    'iban' => $customer_data['iban'],
                    'bic' => $customer_data['bic'],
                    'initialBalance' => $customer_data['balance'],
                    'initialTransactions' => $customer_data['transactions']
                )
            );
        } else {
            // Sinon, on prépare un compte vierge pour cet utilisateur.
             $initial_banking_data = array(
                'user' => array(
                    'name' => $current_user->display_name,
                    'email' => $current_user->user_email,
                    'memberSince' => date_i18n('d M Y', strtotime($current_user->user_registered)),
                ),
                'account' => array(
                    'iban' => 'FR00 0000 0000 0000 0000 0000 000',
                    'bic' => 'VYLSFRPP',
                    'initialBalance' => 0,
                    'initialTransactions' => []
                )
            );
        }

        wp_localize_script( 'vylsfond-banking-app', 'vylsBankingData', $initial_banking_data );
        // =========================================================================================
    }


	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'vylsfond_enqueue_assets' );

/**
 * =======================================================================================
 * "BASE DE DONNÉES" FICTIVE DES CLIENTS
 * =======================================================================================
 * INSTRUCTIONS : Pour ajouter ou modifier les informations d'un client, suivez ce modèle.
 * Le nom d'utilisateur ('client1', 'client2') doit correspondre EXACTEMENT au nom 
 * d'utilisateur que vous avez créé dans l'admin WordPress.
 */
function get_fictive_customer_database() {
    return array(
        // -- EXEMPLE 1 POUR L'UTILISATEUR "client1" --
        'client1' => array(
            'iban' => 'FR76 1234 5678 9012 3456 7890 123',
            'bic' => 'VYLFFR21XXX',
            'balance' => 12345.67,
            'transactions' => array(
                array( 'id' => 'tx1-c1', 'date' => '20 Juil 2024', 'description' => 'Virement entrant - Salaire Juillet', 'amount' => 2850.00, 'type' => 'credit' ),
                array( 'id' => 'tx2-c1', 'date' => '21 Juil 2024', 'description' => 'Paiement CB - FNAC', 'amount' => -129.99, 'type' => 'debit' ),
                array( 'id' => 'tx3-c1', 'date' => '22 Juil 2024', 'description' => 'Prélèvement - Loyer', 'amount' => -850.00, 'type' => 'debit' ),
            )
        ),
        // -- EXEMPLE 2 POUR L'UTILISATEUR "client2" --
        'client2' => array(
            'iban' => 'FR76 9876 5432 1098 7654 3210 987',
            'bic' => 'VYLFFR21XXX',
            'balance' => 750.25,
            'transactions' => array(
                array( 'id' => 'tx1-c2', 'date' => '18 Juil 2024', 'description' => 'Dépôt Chèque', 'amount' => 500.00, 'type' => 'credit' ),
                array( 'id' => 'tx2-c2', 'date' => '19 Juil 2024', 'description' => 'Retrait DAB', 'amount' => -100.00, 'type' => 'debit' ),
            )
        ),
        
        // -- MODÈLES VIDES POUR LES 98 CLIENTS SUIVANTS --
        // -- Pour utiliser, enlevez les '//' et remplacez les valeurs. --

        // 'client3' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client4' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client5' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client6' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client7' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client8' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client9' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client10' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client11' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client12' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client13' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client14' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client15' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client16' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client17' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client18' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client19' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client20' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client21' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client22' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client23' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client24' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client25' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client26' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client27' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client28' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client29' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client30' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client31' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client32' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client33' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client34' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client35' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client36' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client37' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client38' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client39' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client40' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client41' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client42' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client43' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client44' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client45' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client46' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client47' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client48' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client49' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client50' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client51' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client52' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client53' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client54' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client55' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client56' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client57' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client58' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client59' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client60' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client61' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client62' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client63' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client64' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client65' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client66' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client67' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client68' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client69' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client70' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client71' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client72' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client73' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client74' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client75' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client76' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client77' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client78' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client79' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client80' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client81' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client82' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client83' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client84' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client85' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client86' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client87' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client88' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client89' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client90' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client91' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client92' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client93' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client94' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client95' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client96' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client97' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client98' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client99' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
        // 'client100' => array('iban' => '', 'bic' => '', 'balance' => 0, 'transactions' => array()),
    );
}

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
