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

/**
 * Register Custom Post Types for form submissions.
 */
function capfinfy_register_post_types() {
    // CPT for Loan Applications
    register_post_type('loan_application', [
        'labels' => [
            'name' => __('Demandes de Prêt'),
            'singular_name' => __('Demande de Prêt'),
        ],
        'public' => false, // Not publicly queryable
        'show_ui' => true, // Show in admin UI
        'menu_icon' => 'dashicons-money-alt',
        'supports' => ['title', 'editor', 'custom-fields'],
        'capability_type' => 'post',
        'capabilities' => array(
            'create_posts' => 'do_not_allow', // Prevents users from creating new posts in the UI
        ),
        'map_meta_cap' => true,
    ]);

    // CPT for Contact Form Submissions
    register_post_type('contact_submission', [
        'labels' => [
            'name' => __('Messages de Contact'),
            'singular_name' => __('Message de Contact'),
        ],
        'public' => false,
        'show_ui' => true,
        'menu_icon' => 'dashicons-email-alt',
        'supports' => ['title', 'editor', 'custom-fields'],
        'capability_type' => 'post',
        'capabilities' => array(
            'create_posts' => 'do_not_allow',
        ),
        'map_meta_cap' => true,
    ]);
}
add_action('init', 'capfinfy_register_post_types');


/**
 * Handle all form submissions.
 */
function capfinfy_handle_all_form_submissions() {
    // Handle Loan Application Form
    if ( isset($_POST['submit_loan_form']) && wp_verify_nonce($_POST['loan_form_nonce'], 'capfinfy_loan_action') ) {
        
        $post_title = 'Demande de ' . sanitize_text_field($_POST['firstName']) . ' ' . sanitize_text_field($_POST['lastName']);
        $post_content = 'Motif de la demande : ' . sanitize_textarea_field($_POST['reason']);

        $post_data = [
            'post_title' => $post_title,
            'post_content' => $post_content,
            'post_status' => 'private',
            'post_type' => 'loan_application',
        ];

        $post_id = wp_insert_post($post_data);

        if ($post_id) {
            // Save all form fields as post meta
            $meta_fields = [
                'first_name' => sanitize_text_field($_POST['firstName']),
                'last_name' => sanitize_text_field($_POST['lastName']),
                'email' => sanitize_email($_POST['email']),
                'phone' => sanitize_text_field($_POST['phone']),
                'country' => sanitize_text_field($_POST['country']),
                'profession' => sanitize_text_field($_POST['profession']),
                'monthly_income' => sanitize_text_field($_POST['income']),
                'loan_amount' => sanitize_text_field($_POST['loanAmount']),
                'loan_term' => sanitize_text_field($_POST['loanTerm']),
            ];
            foreach ($meta_fields as $key => $value) {
                update_post_meta($post_id, $key, $value);
            }
            
            // Redirect to thank you page
            wp_safe_redirect(home_url('/demande-de-pret/merci'));
            exit;
        }
    }

    // Handle Contact Form
    if ( isset($_POST['submit_contact_form']) && wp_verify_nonce($_POST['contact_form_nonce'], 'capfinfy_contact_action') ) {
        
        $post_title = 'Message de ' . sanitize_text_field($_POST['nom']);
        $post_content = sanitize_textarea_field($_POST['message']);

        $post_data = [
            'post_title' => $post_title,
            'post_content' => $post_content,
            'post_status' => 'private',
            'post_type' => 'contact_submission',
        ];

        $post_id = wp_insert_post($post_data);

        if ($post_id) {
            // Save email as post meta
            update_post_meta($post_id, 'email', sanitize_email($_POST['email']));

            // Redirect to thank you page
            wp_safe_redirect(home_url('/contact/merci'));
            exit;
        }
    }
}
add_action('init', 'capfinfy_handle_all_form_submissions');
