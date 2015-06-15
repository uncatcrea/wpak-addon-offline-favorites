<?php
/*
  Plugin Name: WP AppKit Favorites Addon
  Description: Add favorites list management module to WP AppKit plugin
  Version: 0.1
 */

if ( !class_exists( 'WpAppKitFavorites' ) ) {

    class WpAppKitFavorites {

        const slug = 'wp-appkit-favorites';

        public static function hooks() {
            add_filter( 'wpak_addons', array( __CLASS__, 'wpak_addons' ) );

            // 11 to pass after WP-AppKit components declaration
            add_action( 'plugins_loaded', array( __CLASS__, 'plugins_loaded' ), 11 );
        }

        public static function wpak_addons( $addons ) {
            $addon = new WpakAddon( 'WP AppKit Favorites', self::slug );

            $addon->set_location( __FILE__ );

            $addon->add_js( 'js/wpak-favorites.js', 'module' );
            $addon->add_js( 'js/wpak-favorites-app.js', 'theme', 'before' );

            $addons[] = $addon;

            return $addons;
        }

        public static function plugins_loaded() {
            require_once dirname( __FILE__ ) . '/component-type.php';
        }

    }

    WpAppKitFavorites::hooks();
}