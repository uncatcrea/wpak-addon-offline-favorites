<?php
/*
  Plugin Name: Offline Favorites for WP-AppKit
  Description: Add offline favorites management to WP-AppKit plugin
  Author: Uncategorized Creations
  Author URI:  http://getwpappkit.com
  Version: 1.0.0
  License:     GPL-2.0+
  License URI: http://www.gnu.org/licenses/gpl-2.0.txt
  Copyright:   2013-2018 Uncategorized Creations

  This plugin, like WordPress, is licensed under the GPL.
  Use it to make something cool, have fun, and share what you've learned with others.
 */

if ( !class_exists( 'WpAppKitFavorites' ) ) {

    class WpAppKitFavorites {

        const slug = 'wpak-addon-favorites';

        public static function hooks() {
            add_filter( 'wpak_addons', array( __CLASS__, 'wpak_addons' ) );
            add_filter( 'wpak_licenses', array( __CLASS__, 'add_license' ) );
        }

        public static function wpak_addons( $addons ) {
            $addon = new WpakAddon( 'Offline Favorites for WP-AppKit', self::slug, ['ios','android','pwa','android-cordova','android-voltbuilder'] );

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

        public static function add_license( $licenses ) {
            $licenses[] = array(
                'file' => __FILE__,
                'item_name' => 'Offline Favorites for WP-AppKit',
                'version' => '1.0.1',
                'author' => 'Uncategorized Creations',
            );
            return $licenses;
        }

    }

    WpAppKitFavorites::hooks();
}
