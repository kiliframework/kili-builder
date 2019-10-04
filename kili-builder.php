<?php
/**
 * that starts the plugin.
 *
 * @link              https://www.kiliframework.org/
 * @since             1.0.0
 * @package           Kili_Core
 *
 * @wordpress-plugin
 * Plugin Name:       Kili Builder
 * Plugin URI:        https://github.com/kiliframework/kili-core/
 * Description:       Advanced Page Building components for Gutenberg.
 * Version:           1.0.0
 * Author:            Kili Team
 * Author URI:        https://www.kiliframework.org/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       kili-builder
 * Domain Path:       /languages
 */
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
