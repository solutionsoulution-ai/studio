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
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		*/
	load_theme_textdomain( 'capfinfy', get_template_directory() . '/languages' );

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
			'main-menu' => esc_html__( 'Menu Principal', 'capfinfy' ),
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
add_action( 'after_setup_theme', 'capfinfy_setup' );


/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function capfinfy_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'capfinfy' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'capfinfy' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'capfinfy_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function capfinfy_enqueue_assets() {
    // Main theme stylesheet from style.css
    wp_enqueue_style(
        'capfinfy-theme-style',
        get_stylesheet_uri(),
        array(),
        _S_VERSION
    );

    // Google Fonts (Inter)
    wp_enqueue_style(
        'capfinfy-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    // Main JavaScript file (for animations, etc.)
    wp_enqueue_script(
        'capfinfy-main-js',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        _S_VERSION,
        true
    );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'capfinfy_enqueue_assets' );


/**
 * Handle Form Submissions centrally.
 * Using the 'init' hook ensures this runs before any headers are sent, preventing redirection issues.
 */
function capfinfy_handle_form_submissions() {
    // Contact Form Submission
    if ( isset( $_POST['submit_contact_form'] ) && isset( $_POST['contact_form_nonce'] ) ) {
        if ( wp_verify_nonce( $_POST['contact_form_nonce'], 'capfinfy_contact_action' ) ) {
            
            $to = 'contact@capfinfy.com';
            $subject = 'Nouveau message - Formulaire de Contact Capfinfy';
            
            $name = sanitize_text_field( $_POST['nom'] );
            $email = sanitize_email( $_POST['email'] );
            $message = sanitize_textarea_field( $_POST['message'] );

            $body = "<h2>Nouveau message de contact - Capfinfy</h2>";
            $body .= "<p><strong>Nom :</strong> " . esc_html($name) . "</p>";
            $body .= "<p><strong>Email :</strong> " . esc_html($email) . "</p>";
            $body .= "<p><strong>Message :</strong><br>" . nl2br(esc_html($message)) . "</p>";

            $headers = array('Content-Type: text/html; charset=UTF-8', 'From: Capfinfy <' . $to . '>', 'Reply-To: ' . $name . ' <' . $email . '>');

            // Let WP Mail SMTP handle the sending
            wp_mail( $to, $subject, $body, $headers );

            $redirect_url = home_url('/merci-contact');
            wp_safe_redirect( $redirect_url );
            exit;
        }
    }

    // Loan Application Form Submission
    if ( isset( $_POST['submit_loan_form'] ) && isset( $_POST['loan_form_nonce'] ) ) {
        if ( wp_verify_nonce( $_POST['loan_form_nonce'], 'capfinfy_loan_action' ) ) {
            
            $fields = ['firstName', 'lastName', 'loanAmount', 'loanTerm', 'email', 'phone', 'country', 'profession', 'income', 'reason'];
            $sanitized_data = [];
            
            foreach ($fields as $field) {
                if (isset($_POST[$field])) {
                    if ($field === 'email') {
                        $sanitized_data[$field] = sanitize_email($_POST[$field]);
                    } elseif ($field === 'reason') {
                        $sanitized_data[$field] = sanitize_textarea_field($_POST[$field]);
                    } else {
                        $sanitized_data[$field] = sanitize_text_field($_POST[$field]);
                    }
                }
            }
            
            $to = 'contact@capfinfy.com';
            $subject = 'Nouvelle demande de financement - ' . $sanitized_data['firstName'] . ' ' . $sanitized_data['lastName'];
            $headers = array('Content-Type: text/html; charset=UTF-8', 'From: Capfinfy <' . $to . '>', 'Reply-To: ' . $sanitized_data['firstName'] . ' ' . $sanitized_data['lastName'] . ' <' . $sanitized_data['email'] . '>');
            
            $body = "<h2>Nouvelle demande de financement - Capfinfy</h2>";
            foreach ($sanitized_data as $key => $value) {
                $label = str_replace(['firstName', 'lastName', 'loanAmount', 'loanTerm', 'profession', 'income', 'reason', 'country', 'phone'], ['Prénom', 'Nom', 'Montant du prêt (€)', 'Durée (mois)', 'Profession', 'Revenu mensuel (€)', 'Motif de la demande', 'Pays de résidence', 'Téléphone'], $key);
                $body .= "<p><strong>" . esc_html(ucfirst($label)) . ":</strong> " . esc_html($value) . "</p>";
            }

            wp_mail( $to, $subject, $body, $headers );
            
            $redirect_url = home_url('/merci-demande');
            wp_safe_redirect( $redirect_url );
            exit;
        }
    }
}
add_action( 'init', 'capfinfy_handle_form_submissions' );
