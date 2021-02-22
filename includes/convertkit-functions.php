<?php

use calderawp\convertKit\forms;
use calderawp\convertKit\tags;

function newsletter_block_get_forms() {
	$api_key   = get_option( 'auroobamakes_newsletter_block_api_key' );
	$client    = new forms( $api_key );
	$forms     = $client->get_all();
	$form_list = array();

	foreach ( $forms->forms as $form ) {
		$form_list[ $form->id ] = $form->name;
	}

	if ( ! get_option( 'auroobamakes_newsletter_block_convertkit_forms' ) ) {
		add_option( 'auroobamakes_newsletter_block_convertkit_forms', $form_list );
	} else {
		update_option( 'auroobamakes_newsletter_block_convertkit_forms', $form_list );
	}

}

function newsletter_block_get_tags() {
	$api_key  = get_option( 'auroobamakes_newsletter_block_api_key' );
	$client   = new tags( $api_key );
	$tags     = $client->get_all();
	$tag_list = array();

	foreach ( $tags->tags as $tag ) {
		$tag_list[ $tag->id ] = $tag->name;
	}

	if ( ! get_option( 'auroobamakes_newsletter_block_convertkit_tags' ) ) {
		add_option( 'auroobamakes_newsletter_block_convertkit_tags', $tag_list );
	} else {
		update_option( 'auroobamakes_newsletter_block_convertkit_tags', $tag_list );
	}
}

add_action( 'updated_option', 'auroobamakes_api_key_updated', 10, 3 );

function auroobamakes_api_key_updated( $option, $old, $new ) {
	if ( 'auroobamakes_newsletter_block_api_key' === $option ) {
		newsletter_block_get_forms();
		newsletter_block_get_tags();
	}
}
