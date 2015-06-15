define( [ 'core/lib/hooks', 'addons/wpak-addon-favorites/js/wpak-favorites' ], function( Hooks, WpakFavorites ) {

    Hooks.addFilter( 'component-data', function( component_data, component ) {
        var component_type = component.get( 'type' );

        if( 'favorites' === component_type ) {
            var data = component.get('data');

            component_data = {
                  type: component_type,
                  view_data: { posts: WpakFavorites.favorites, title: component.get( 'label' ), total: WpakFavorites.favorites.length },
                  data: data
            };
        }

        return component_data;
    });

    Hooks.addFilter( 'template-args', function( template_args ) {
        template_args.WpakFavorites = WpakFavorites;

        return template_args;
    });

    Hooks.addFilter( 'component-custom-type', function( screen_view_data, component ) {
        if( 'favorites' === component.type ) {
            screen_view_data = {
                view_type: 'favorites',
                view_data: component.view_data,
                screen_data: { screen_type: 'list', component_id: component.id, item_id: 0, global: component.global, data: component.data, label: component.label }
            };
        }

        return screen_view_data;
    });

    Hooks.addFilter( 'custom-view', function( customView, view_type ) {
        if( 'favorites' === view_type ) {
            customView = 'addons/wpak-addon-favorites/js/view';
        }

        return customView;
    });

});