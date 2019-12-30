<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function get_scripts_array() {
	return array(
		[
			'block_id' => 'kili/section',
			'editor_script_key' => 'kili/kili-section-editor-script',
			'name' => __( 'Section', 'kili-builder' ),
		],
	);
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function kili_builder_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'kili-blocks-style',
		plugins_url( 'dist/main.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' )
	);

	$scripts_array = get_scripts_array();
	foreach ($scripts_array as $script) {
		wp_register_script(
			$script['editor_script_key'],
			plugins_url( 'dist/blocks.js', dirname( __FILE__ ) ),
			array(
				'wp-blocks',
				'wp-i18n',
				'wp-element',
				'wp-block-editor',
				'wp-components',
				'wp-compose',
			)
		);
		register_block_type(
			$script['block_id'],
			array(
				'editor_script' => $script['editor_script_key'],
				'editor_style' => 'kili-blocks-style',
			)
		);
	}
}

// Hook: Block assets.
add_action( 'init', 'kili_builder_cgb_block_assets' );
