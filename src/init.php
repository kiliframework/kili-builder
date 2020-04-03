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
		[
			'block_id' => 'carousel',
		],
		[
			'block_id' => 'heading',
		],
		[
			'block_id' => 'paragraph',
		],
	);
}

function kili_blocks_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'kili-builder',
				'title' => __('Kili Category', 'kili-builder'),
				'icon' => 'wordpress',
			)
		)
	);
}

add_filter( 'block_categories', 'kili_blocks_category', 10, 2 );

function kili_blocks_register_block_type( $block, $options = array() ) {
	register_block_type( 'kili/' . $block,
		array_merge(
			array(
				'editor_script' => 'kili-editor-script',
				'style' => 'kili-style',
			),
			$options
		)
	);
}

function kili_blocks_register() {
	wp_register_script( 'kili-editor-script',
		plugins_url( 'dist/blocks.js', dirname( __FILE__ ) ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-block-editor',
			'wp-components',
			'wp-editor',
			'wp-blob',
			'wp-data',
		)
	);

	wp_register_style( 'kili-style',
		plugins_url( 'dist/main.css', dirname( __FILE__ ) )
	);

	$scripts_array = get_scripts_array();
	foreach ($scripts_array as $script) {
		kili_blocks_register_block_type( $script['block_id'] );
	}
}

function array_flatten( $array ) {
	if ( ! is_array( $array ) ) {
		return [ $array ];
	}

	return array_reduce( $array, function ( $carry, $item ) {
		return array_merge( $carry, array_flatten( $item ) );
	}, [] );
}

function kili_search_gutblocks_styles( $post_id ) {
	remove_action( 'save_post', 'kili_search_gutblocks_styles' );
	$current_post = get_post( $post_id );
	if ( ! has_blocks( $current_post->post_content ) ) {
		add_action( 'save_post', 'kili_search_gutblocks_styles' );
		return;
	}
	$blocks = parse_blocks( $current_post->post_content );
	$regex = '/class="\w[\w-_]+(\s+\w[\w-_#]+)*"/mi';
	$blocks = array_filter( $blocks, function ( $block ) {
		return stripos( $block['blockName'], 'kili') !== false;
	} );
	$styles = '';
	foreach ( $blocks as $block ) {
		$matches = [];
		preg_match_all($regex, $block['innerHTML'], $matches, PREG_SET_ORDER, 0);
		if ( count( $matches ) < 1 ) {
			continue;
		}
		$classes = array_map(function ( $item ) {
			$str = str_ireplace(['class="', '"'], '', $item[0]);
			$str = explode( ' ', $str );
			return $str;
		}, $matches);
		$classes = array_flatten( $classes );
		$classes = array_unique( $classes );
		$classes = array_filter( $classes, function ( $item ) {
			return strcasecmp( '', $item ) !== 0 && ( strpos( $item, '__' ) !== false || strpos( $item, '--' ) !== false );
		});
		if ( count( $classes ) < 1 ) {
			continue;
		}
		$css = array_reduce( $classes, function ( $carry, $item ) {
			$split1 = explode( '--', $item );
			$split2 = explode( '__', $split1[1] );
			return "{$split1[0]} {{$split2[0]}: {$split2[1]}}";
		}, '' );
		$styles .= $css;
	}
	$post_content = $current_post->post_content;
	$post_content = preg_replace('/\w+--\w+__\w+/', '', $post_content);
	$post_content = preg_replace('/<style>.*<\/style>/', '', $post_content);
	if ( strcasecmp( '', $styles ) !== 0 ) {
		$styles = "<style>{$styles}</style>";
	}
	wp_update_post( array( 'ID' => $post_id, 'post_content' => $post_content . $styles ) );
	add_action( 'save_post', 'kili_search_gutblocks_styles' );
}

add_action( 'init', 'kili_blocks_register' );
add_action( 'save_post', 'kili_search_gutblocks_styles' );
