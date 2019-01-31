# Addon "Offline Favorites for WP-AppKit"
This addon allows to manage offline favorites in your WP-AppKit app: set some posts as favorite to read them later, even if all app content has been refreshed in the meantime.

This addon is compatible out of the box with the **Q for Android** theme (as of version 1.2.0 of the theme). If you need to use it in an other theme, see the following section "Use the Offline Favorites addon feature in your own theme".

## Install
Install this addon as you would install any WordPress Plugin, then in your WP-AppKit App edit panel, check the "Offline Favorites for WP-AppKit" addon checkbox in the "Addons" panel (at the bottom of the screen), then save the App.

Once the addon is activated for your app, a **new component type** is available: the **Favorites** component type that allows to display a list of all posts marked as _Favorites_ in your app. 

Add a _Favorites_ component to the app.

Then add this component to your app menu and save the app.

If you preview or build your app (with Q for Android theme), you'll see you can now:
- set posts as favorite by clicking the "stars" icons in post list and post detail,
- see the list of your favorites by going to your app menu and clicking the favorites menu item,
- "un-favorite" a post from its single screen or from the favorites list  

Posts that are marked as favorites will stay in the app as long as you don't un-favorite them, even when app content is refreshed.

## Use the Offline Favorites addon feature in your own theme

Once activated for an app, the _Favorites_ addon handles all the "Add/Remove/List" favorites features automatically, provided that the theme defines the corresponding template and uses the right css classes on the elements that handle the _Favorites_ feature. The theme "Q for Android" already implements those 

### Custom template archive-favorites.html 

The addon uses a custom archive template to render the favorites list: _archive-favorites.html_. 
The theme must have this _archive-favorites.html_ template for the addon to work. You can create this template based on your _archive.html_ template, then for example:
- replace the "Get More Posts" button by a "Reset Favorites" button, 
- and replace _TemplateTags.getPostLink(post.id)_ by _TemplateTags.getPostLink(post.id, **post.global**)_ because we are in a custom template where post global is not automatically set.

### Custom CSS classes

Here are the css classes that have to be used by the theme (in archive, single and archive-favorites templates) so that the _Favorites_ addon works well:
- the element that toggles the favorite state of each post (a star icon for example) must have the **favorite-toggle** class.
- this "toggle favorite" element must also have the WP-AppKit post "data" attributes that are retrieved automatically by the function `TemplateTags.getPostDataAttributes( post.id )`.
- this "toggle favorite" element must have the **is-favorite** class when the post is "favorite". This class can be auto-set in template by calling the function `<%= WpakFavorites.getIsFavoriteClass( post.id ) %>`
- if you implement a "Reset favorite" button in the _archive-favorites.html_ template, it should have the class **favorite-reset** to be recognized by the addon.

For an implementation example of this custom _archive-favorites.html_ template and CSS classes, see the [Q For Android theme](https://github.com/uncatcrea/q-android).
