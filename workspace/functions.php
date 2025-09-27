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
        
        $user_login = $current_user->user_login;

        $customer_database = get_fictive_customer_database();

        $customer_data = isset($customer_database[$user_login]) ? $customer_database[$user_login] : null;

        if ($customer_data) {
            $initial_banking_data = array(
                'user' => array(
                    'login' => $user_login, // Très important pour la persistance locale
                    'name' => $current_user->display_name,
                    'email' => $current_user->user_email,
                    'memberSince' => date_i18n('d M Y', strtotime($current_user->user_registered)),
                ),
                'account' => array(
                    'iban' => $customer_data['iban'],
                    'bic' => $customer_data['bic'],
                    'initialBalance' => $customer_data['balance'],
                    'initialTransactions' => $customer_data['transactions'],
                    'isTransferBlocked' => $customer_data['isTransferBlocked'],
                    'transferBlockReason' => $customer_data['transferBlockReason'],
                    'transferDurationSeconds' => $customer_data['transferDurationSeconds'],
                )
            );
        } else {
             $initial_banking_data = array(
                'user' => array(
                    'login' => $user_login,
                    'name' => $current_user->display_name,
                    'email' => $current_user->user_email,
                    'memberSince' => date_i18n('d M Y', strtotime($current_user->user_registered)),
                ),
                'account' => array(
                    'iban' => 'FR00 0000 0000 0000 0000 0000 000',
                    'bic' => 'VYLSFRPP',
                    'initialBalance' => 0,
                    'initialTransactions' => [],
                    'isTransferBlocked' => false,
                    'transferBlockReason' => '',
                    'transferDurationSeconds' => 5,
                )
            );
        }

        wp_localize_script( 'vylsfond-banking-app', 'vylsBankingData', $initial_banking_data );
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
            'isTransferBlocked' => false, // Mettez `true` pour bloquer les virements pour ce client
            'transferBlockReason' => "Pour votre sécurité, les virements sont temporairement désactivés. Veuillez contacter votre conseiller.",
            'transferDurationSeconds' => 10, // Durée d'un virement en secondes
            'transactions' => array(
                array( 'id' => 'tx1-c1', 'date' => '20 Juil 2024', 'description' => 'Virement entrant - Salaire Juillet', 'amount' => 2850.00, 'type' => 'credit' ),
                array( 'id' => 'tx2-c1', 'date' => '21 Juil 2024', 'description' => 'Paiement CB - FNAC', 'amount' => -129.99, 'type' => 'debit' ),
                array( 'id' => 'tx3-c1', 'date' => '22 Juil 2024', 'description' => 'Prélèvement - Loyer', 'amount' => -850.00, 'type' => 'debit' ),
            )
        ),
        // -- EXEMPLE 2 POUR L'UTILISATEUR "client2" (Virements bloqués) --
        'client2' => array(
            'iban' => 'FR76 9876 5432 1098 7654 3210 987',
            'bic' => 'VYLFFR21XXX',
            'balance' => 750.25,
            'isTransferBlocked' => true,
            'transferBlockReason' => "Opération suspecte détectée. Vos virements sont suspendus. Contactez le support au +33123456789.",
            'transferDurationSeconds' => 5,
            'transactions' => array(
                array( 'id' => 'tx1-c2', 'date' => '18 Juil 2024', 'description' => 'Dépôt Chèque', 'amount' => 500.00, 'type' => 'credit' ),
                array( 'id' => 'tx2-c2', 'date' => '19 Juil 2024', 'description' => 'Retrait DAB', 'amount' => -100.00, 'type' => 'debit' ),
            )
        ),
        
        // -- MODÈLES VIDES POUR 98 CLIENTS --
        // Pour utiliser, décommentez et remplacez les valeurs.
        // 'client3' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client4' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client5' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client6' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client7' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client8' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client9' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client10' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client11' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client12' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client13' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client14' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client15' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client16' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client17' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client18' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client19' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client20' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client21' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client22' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client23' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client24' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client25' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client26' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client27' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client28' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client29' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client30' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client31' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client32' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client33' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client34' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client35' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client36' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client37' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client38' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client39' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client40' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client41' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client42' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client43' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client44' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client45' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client46' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client47' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client48' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client49' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client50' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client51' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client52' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client53' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client54' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client55' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client56' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client57' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client58' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client59' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client60' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client61' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client62' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client63' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client64' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client65' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client66' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client67' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds' => 5, 'transactions' => array()),
        // 'client68' => array('iban' => '', 'bic' => '', 'balance' => 0, 'isTransferBlocked' => false, 'transferBlockReason' => '', 'transferDurationSeconds'