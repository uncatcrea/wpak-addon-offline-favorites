require( [ 'jquery', 'addons/wpak-addon-favorites/js/wpak-favorites', 'core/theme-app', 'core/theme-tpl-tags', 'core/lib/hooks' ], function( $, WpakFavorites, ThemeApp, TemplateTags, Hooks ) {

	/**
	 * Add/Remove from favorites buttons
	 */

	$( '#app-layout' ).on( 'click', '.favorite-toggle', function ( e ) {
		e.preventDefault();

		var $toggle_el = $(this);
		var id = $toggle_el.data( 'id' );
		var global = $toggle_el.data( 'global' );

		if ( WpakFavorites.isFavorite( id ) ) {
			WpakFavorites.removeFromFavorites( id );
		}
		else {
			WpakFavorites.addToFavorites( id, global );
		}

		var render = true;

		var current_screen = TemplateTags.getCurrentScreen();
		if( current_screen.component_id.length ) {
		 	var component = TemplateTags.getComponent( current_screen.component_id );
			if( component.type === 'favorites' ) { //We are on favorites list screen

				var is_favorite = WpakFavorites.isFavorite( id );

				/**
				* When removing a favorite directly from the favorites list, the default behavior is to keep
				* the post in the favorite list in case we want to re-add this post to the favorites right away.
				* Use this hook (in the functions.js of your theme) to remove directly the post from the favorites list,
				* by returning true: this will re-render the favorite list, thus removing the post from the list immediately
				*/
				render = Hooks.applyFilters('favorites:list:render-on-change',false,[$toggle_el,is_favorite]);

				if ( !render ) {
					if ( is_favorite ) {
		        $toggle_el.addClass('is-favorite');
		      } else {
		        $toggle_el.removeClass('is-favorite');
		      }
				}

		 	}
		}

		if ( render ) {
			ThemeApp.rerenderCurrentScreen();
		}

	} );

	/**
	 * Reset favorites button
	 */
	$( '#app-content-wrapper' ).on( 'click', '.favorite-reset', function ( e ) {
		e.preventDefault();
		WpakFavorites.resetFavorites();
		ThemeApp.rerenderCurrentScreen();
	} );

} );
