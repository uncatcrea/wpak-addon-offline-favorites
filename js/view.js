define(function (require) {

    "use strict";

    var ArchiveView         = require('core/views/archive');

    return ArchiveView.extend({

        initialize : function( args ) {
            // Call parent initialize()
            ArchiveView.prototype.initialize.apply( this, [args] );

            this.setTemplate('archive-favorites');
        },

    });

});
