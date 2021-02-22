<?php
/**
 * Plugin Name:     Newsletter Block
 * Description:     A native newsletter block that currently integrates with Convertkit.
 * Version:         0.1.0
 * Author:          Aurooba Ahmed
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     newsletter-block
 *
 * @package         newsletter-block
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/includes/convertkit-functions.php';
require_once __DIR__ . '/admin-settings.php';

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function newsletter_block_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "newsletter-block" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require $script_asset_path;
	wp_register_script(
		'newsletter-block-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);
	wp_localize_script(
		'newsletter-block-block-editor',
		'auroobamakes_newsletter_block_vars',
		[
			'convertkit_api'           => get_option( 'auroobamakes_newsletter_block_api_key' ),
			'convertkit_forms'         => get_option( 'auroobamakes_newsletter_block_convertkit_forms' ),
			'convertkit_tags'          => get_option( 'auroobamakes_newsletter_block_convertkit_tags' ),
			'plugin_settings_page_url' => esc_url( admin_url( 'options-general' ) ),
		]
	);
	wp_set_script_translations( 'newsletter-block-block-editor', 'newsletter-block' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'newsletter-block-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'newsletter-block-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type_from_metadata(
		__DIR__ . '/src',
		array(
			'editor_script' => 'newsletter-block-block-editor',
			'editor_style'  => 'newsletter-block-block-editor',
			'style'         => 'newsletter-block-block',
		)
	);
}
add_action( 'init', 'newsletter_block_block_init' );
