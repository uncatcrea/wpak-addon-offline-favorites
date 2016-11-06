define(function (require) {

    "use strict";

    var _                   = require( 'underscore' ),
        App                 = require( 'core/app' ),
        Utils               = require( 'core/app-utils' ),
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
    wpak_favorites.addToFavorites = function( id, default_global ) {
        var item_global = App.getPostGlobal( id, default_global );
        var item = App.getGlobalItem( item_global, id );

        if( null !== item ) {
            wpak_favorites.favorites.add( _.extend( { global: item_global }, item ) );
            wpak_favorites.favorites.saveAll();
            Utils.log( 'Favorite added', item );
        }

    };

    /**
     * Remove a post from the favorites list.
     * Refresh the current view in order to reflect this removal (the link/button should be updated).
     *
     * @param   int     id              The post id.
     */
    wpak_favorites.removeFromFavorites = function( id ) {
        var item = App.getGlobalItem( App.getPostGlobal( id ), id );

        if( null !== item ) {
            wpak_favorites.favorites.remove( item );
            wpak_favorites.favorites.saveAll();
            Utils.log( 'Favorite removed', item );
        }
    };

    /**
     * Reset the list of favorites.
     */
    wpak_favorites.resetFavorites = function() {
        wpak_favorites.favorites.resetAll();
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

    /**
     * Return true or false whether the post is in the favorites list or not.
     *
     * @param   int     post_id         The post id.
     * @return  string  favorite_class  'is-favorite' if post is favorite, empty string if not.
     */
    wpak_favorites.getIsFavoriteClass = function( post_id ) {
        return this.isFavorite( post_id ) ? 'is-favorite' : '';
    };

    /**
     * Add favorite posts objects to the core's global var.
     * This ensures that an user still can see a single post that has been removed from the sync webservice.
     */
    wpak_favorites.addFavoritesToGlobals = function() {
        _.each( wpak_favorites.favorites.toJSON(), function( item, index ) {
            App.addGlobalItem( item.global, item );
        });

        Utils.log( 'Favorites added to globals', { globals: App.globals } );
    };

    return wpak_favorites;
});
