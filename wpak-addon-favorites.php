<?php
/*
  Plugin Name: WP-AppKit Offline Favorites Addon
  Description: Add favorites list management module to WP AppKit plugin
  Version: 0.1
 */

if ( !class_exists( 'WpAppKitFavorites' ) ) {

    class WpAppKitFavorites {

        const slug = 'wpak-addon-favorites';

        public static function hooks() {
            add_filter( 'wpak_addons', array( __CLASS__, 'wpak_addons' ) );
        }

        public static function wpak_addons( $addons ) {
            $addon = new WpakAddon( 'WP-AppKit Offline Favorites', self::slug, ['ios','android','pwa'] );

            $addon->set_location( __FILE__ );

            $addon->add_js( 'js/wpak-favorites.js', 'module' );
            $addon->add_js( 'js/model.js', 'module' );
            $addon->add_js( 'js/view.js', 'module' );
            $addon->add_js( 'js/wpak-favorites-app.js', 'theme', 'before' );
			$addon->add_js( 'js/wpak-favorites-functions.js', 'theme', 'before' );

            $addon->require_php( dirname(__FILE__) .'/component-type.php' );

            $addons[] = $addon;

            return $addons;
        }

    }

    WpAppKitFavorites::hooks();
}
