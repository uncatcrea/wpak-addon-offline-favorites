# WP-AppKit Offline Favorites Addon
Addon to manage offline favorites with WP-AppKit: set some posts as favorite to read them later, even if all app content has been refreshed in the meantime.

Install this addon as you would install any WordPress Plugin, then in your WP-AppKit App
edit panel, check the "WP-AppKit Favorites" addon checkbox in the "Addons" panel
(at the bottom of the screen), then save the App.

Once the addon is activated for your app, a **new component type** is available:
the _Favorites_ component type that allows to display a list of all posts marked as _Favorites_ in your app. Create a _Favorites_ component and add it to your app navigation.

Once activated for an App, the _Favorites_ addon handles all the "Add/Remove/List" favorites
features automatically, provided that the theme uses the right css classes on the elements that handle the _Favorites_ feature.

Here are the css classes that have to be used by the theme so that the _Favorites_ addon works well:
- the element that toggles the favorite state of each post must have the **favorite-toggle** class.
- this "toggle favorite" element must also have the WP-AppKit post "data" attributes that are retrieved automatically by the function `TemplateTags.getPostDataAttributes( post.id )`.
- this "toggle favorite" element must have the **is-favorite** class when the post is "favorite". This class can be auto-set in template by calling the function `<%= WpakFavorites.getIsFavoriteClass( post.id ) %>`
- if you implement a "Reset favorite" button in the _archive-favorites.html_ template, it should have the class **favorite-reset** to be recognized by the addon.

For an implementation example, see the [Favorites Demo version of Q For Android theme](https://github.com/mleroi/q-android/tree/feat-favorites).
