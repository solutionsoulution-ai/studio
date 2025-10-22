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
 * Handle Form Submissions via Supabase.
 */
function capfinfy_handle_form_submissions() {
    $supabase_url = 'https://wgpqvepqyywlpgzbxdig.supabase.co';
    $supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncHF2ZXBxeXl3bHBnemJ4ZGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNTU5MzUsImV4cCI6MjA3NDkzMTkzNX0.cMPErrOdSYyxtuznRU0XWNcj2AQN7UrI8UnI3TFBl5k';

    $headers = [
        'apikey'        => $supabase_key,
        'Authorization' => 'Bearer ' . $supabase_key,
        'Content-Type'  => 'application/json',
        'Prefer'        => 'return=minimal',
    ];

    // Contact Form Submission
    if ( isset( $_POST['submit_contact_form'] ) && isset( $_POST['contact_form_nonce'] ) ) {
        if ( wp_verify_nonce( $_POST['contact_form_nonce'], 'capfinfy_contact_action' ) ) {
            
            $name = sanitize_text_field( $_POST['nom'] );
            $email = sanitize_email( $_POST['email'] );
            $message = sanitize_textarea_field( $_POST['message'] );

            $body = json_encode([
                'name'    => $name,
                'email'   => $email,
                'message' => $message,
            ]);

            $args = [
                'body'    => $body,
                'headers' => $headers,
                'method'  => 'POST',
            ];
            
            wp_remote_post($supabase_url . '/rest/v1/contacts', $args);
            
            wp_safe_redirect( home_url('/merci-contact') );
            exit;
        }
    }

    // Loan Application Form Submission
    if ( isset( $_POST['submit_loan_form'] ) && isset( $_POST['loan_form_nonce'] ) ) {
        if ( wp_verify_nonce( $_POST['loan_form_nonce'], 'capfinfy_loan_action' ) ) {
            
            $fields = ['firstName', 'lastName', 'loanAmount', 'loanTerm', 'email', 'phone', 'country', 'profession', 'income', 'reason'];
            $data_to_send = [];
            
            foreach ($fields as $field) {
                 $data_to_send[$field] = isset($_POST[$field]) ? sanitize_text_field($_POST[$field]) : null;
            }

            $body = json_encode([
                'first_name' => $data_to_send['firstName'],
                'last_name' => $data_to_send['lastName'],
                'email' => sanitize_email($data_to_send['email']),
                'phone' => $data_to_send['phone'],
                'country' => $data_to_send['country'],
                'profession' => $data_to_send['profession'],
                'monthly_income' => is_numeric($data_to_send['income']) ? (float)$data_to_send['income'] : null,
                'loan_amount' => is_numeric($data_to_send['loanAmount']) ? (float)$data_to_send['loanAmount'] : null,
                'loan_term' => is_numeric($data_to_send['loanTerm']) ? (int)$data_to_send['loanTerm'] : null,
                'reason' => sanitize_textarea_field($data_to_send['reason']),
            ]);

             $args = [
                'body'    => $body,
                'headers' => $headers,
                'method'  => 'POST',
            ];

            wp_remote_post($supabase_url . '/rest/v1/loan_applications', $args);

            wp_safe_redirect( home_url('/merci-demande') );
            exit;
        }
    }
}
add_action( 'init', 'capfinfy_handle_form_submissions' );
