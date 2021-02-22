<?php

add_action( 'admin_init', 'auroobamakes_newsetter_block_register_settings' );

/*
 * Register settings
 */
function auroobamakes_newsetter_block_register_settings() {
	register_setting(
		'general',
		'auroobamakes_newsletter_block_api_key',
		array(
			'string',
			'',
			'',
			true,
			'',
		)
	);

	add_settings_section(
		'auroobamakes-newsletter-block',
		'Newsletter Block',
		'__return_false',
		'general'
	);
	add_settings_field(
		'auroobamakes_newsletter_block_api_key',
		'Convertkit API Key',
		'auroobamakes_newsletter_block_print_api_key',
		'general',
		'auroobamakes-newsletter-block',
	);
}

/*
 * Print settings field content
 */
function auroobamakes_newsletter_block_print_api_key() {
	$api_key = get_option( 'auroobamakes_newsletter_block_api_key' );
	echo "<input type='text' class='regular-text'  name='auroobamakes_newsletter_block_api_key' value='$api_key' />";
}
