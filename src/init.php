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
    [
      'block_id' => 'banner',
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
  
  wp_localize_script(
    'kili-editor-script',
    'kili_images',
    array(
        'waves' => plugins_url( 'assets/images/waves.svg', __FILE__ ),
        'koombea-banner-img' => plugins_url( 'assets/images/koombea-banner-img.svg', __FILE__ ),
    )
  );
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
	$blocks = array_filter( $blocks, function ( $block ) {
		return stripos( $block['blockName'], 'kili') !== false;
	} );
	$styles = kili_get_blocks_styles( $blocks );
	$post_content = $current_post->post_content;
	if ( strcasecmp( '', $styles ) !== 0 ) {
		$post_content = preg_replace("/<style id='kili-custom-style'>.*<\/style>/", '', $post_content);
		$styles = str_ireplace('\\', '\\\\', $styles);
		$styles = "<style id='kili-custom-style'>{$styles}</style>";
		wp_update_post( array( 'ID' => $post_id, 'post_content' => $styles . $post_content ) );
	}
	add_action( 'save_post', 'kili_search_gutblocks_styles' );
}

function kili_get_blocks_styles( $blocks ) {
	$styles = '';
	$regex = '/\s*\w+--\w[\w-]*__[\w.%()#-]*\s*/mi';
	foreach ( $blocks as $block ) {
		$matches = [];
		if ( count($block['innerBlocks']) > 0 ) {
			$styles .= kili_get_blocks_styles( $block['innerBlocks'] );
		}
		preg_match_all($regex, $block['innerHTML'], $matches, PREG_SET_ORDER, 0);
		if ( count( $matches ) < 1 ) {
			continue;
		}
		$classes = kili_get_item_classes_array( $matches );
		if ( count( $classes ) < 1 ) {
			continue;
		}
		$styles .= kili_get_classes_css( $classes );
	}
	return $styles;
}

function kili_get_item_classes_array( $matches ) {
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
	return $classes;
}

function kili_get_classes_css( $classes ) {
	return array_reduce( $classes, function ( $carry, $item ) {
		$split1 = explode( '--', $item );
		$split2 = explode( '__', isset( $split1[1] ) ? $split1[1] : $split1[0] );
		$rule = '';
		if ( isset( $split1[1] ) ) {
			$rule = kili_get_rule_breakpoint( $split1[0] );
		}
		$item = addcslashes($item, ".%");
		$rule .= ".{$item}{{$split2[0]}: {$split2[1]}}" . ( strcasecmp( '', $rule ) != 0 ? '}' : '' );
		return $carry . $rule;
	}, '' );
}

function kili_get_rule_breakpoint( $breakpoint_key ) {
	if ( strcasecmp( '', $breakpoint_key ) == 0 ) {
		return '';
	}
	$breakpoints = [
		'sm' => '320px',
		'md' => '760px',
	];
	if ( ! isset( $breakpoints[ $breakpoint_key ] ) ) {
		return '';
	}
	return '@media all and (max-width: ' . $breakpoints[ $breakpoint_key ] . '){';
}

add_action( 'init', 'kili_blocks_register' );
add_action( 'save_post', 'kili_search_gutblocks_styles' );
