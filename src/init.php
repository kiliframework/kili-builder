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
			'block_id' => 'container',

		],
		[
			'block_id' => 'k-section',

		],
		[
			'block_id' => 'row-section',

		],
		[
			'block_id' => 'k-column',

		],
	);
}

function kili_blocks_category( $categories, $post ){
  return array_merge(
    $categories,
    array(
      array(
        'slug' => 'kili-builder',
        'title'=> __('Kili Category', 'kili-builder'),
        'icon'=>'wordpress'
      )
    )
  );
}

add_filter( 'block_categories', 'kili_blocks_category', 10, 2 );

function kili_blocks_register_block_type( $block, $options=array() ){
  register_block_type( 'kili/' . $block,
    array_merge(
      array(
        'editor_script' => 'kili-editor-script',
        'editor_style' => 'kili-editor-style',
      ),
      $options
    )
  );

}

function kili_blocks_register() {
	wp_register_script( 'kili-editor-script',
		plugins_url( 'dist/blocks.js', dirname(__FILE__) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-editor', 'wp-blob', 'wp-data')
	);

  	wp_register_style( 'kili-style',
  		plugins_url( 'dist/style.css', dirname( __FILE__ ) )
	);

	$scripts_array = get_scripts_array();
	foreach ($scripts_array as $script) {
		kili_blocks_register_block_type( $script['block_id'] );
	}
}

add_action( 'init', 'kili_blocks_register' );
