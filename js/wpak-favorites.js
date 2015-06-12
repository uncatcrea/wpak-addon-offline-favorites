define(function (require) {

    "use strict";

    var _                   = require( 'underscore' ),
        App                 = require( 'core/app' ),
        Favorites           = require( 'addons/wpak-addon-favorites/js/model' );

    var wpak_favorites = {};

    wpak_favorites.favorites = new Favorites;

    /**
     * Add a post to the favorites list.
     * Refresh the current view in order to reflect this addition (the link/button should be updated).
     *
     * @param   int         id              The post id.
     * @param   callable    callback        The callback to call after favorite has been added.
     * @param   string      default_global  The default value to use as global key for this post id.
     */
    wpak_favorites.addToFavorites = function( id, callback, default_global ) {
        var item_global = App.getPostGlobal( id, default_global );
        var item = App.getGlobalItem( item_global, id );
        var saved = false;

        if( null !== item ) {
            wpak_favorites.favorites.add( _.extend( { global: item_global }, item ) );
            wpak_favorites.favorites.saveAll();
            saved = true;
        }

        if( undefined !== callback ) {
            callback( saved, id );
        }
    };

    /**
     * Remove a post from the favorites list.
     * Refresh the current view in order to reflect this removal (the link/button should be updated).
     *
     * @param   int     id              The post id.
     */
    wpak_favorites.removeFromFavorites = function( id, callback ) {
        var item = App.getGlobalItem( App.getPostGlobal( id ), id );
        var saved = false;

        if( null !== item ) {
            wpak_favorites.favorites.remove( item );
            wpak_favorites.favorites.saveAll();
            saved = true;
        }

        if( undefined !== callback ) {
            callback( saved, id );
        }
    };

    /**
     * Reset the list of favorites.
     */
    wpak_favorites.resetFavorites = function( callback ) {
        wpak_favorites.favorites.resetAll();

        if( undefined !== callback ) {
            callback();
        }
    };

    /**
     * Return true or false whether the post is in the favorites list or not.
     *
     * @param   int     post_id     The post id.
     * @return  bool    isFavorite  The HTML for the button.
     */
    wpak_favorites.isFavorite = function( post_id ) {
        var isFavorite = false;

        if( undefined !== post_id ) {
            isFavorite = undefined !== wpak_favorites.favorites.get( post_id );
        }

        return isFavorite;
    };

    return wpak_favorites;
});