var Marionette = require('backbone.marionette');
var BookmarksLayout = require('../views/bookmarks/bookmarkLayout');

module.exports = Marionette.LayoutView.extend({
    template: 'DashboardProfile',

    regions: {
        'bookmarks': '.bookmarks',
        'messages': '.messages'
    },

    onRender: function() {
        this.getRegion('bookmarks').show(new new BookmarksLayout({
            collection: this.options.messages,
        }));
        this.getRegion('bookmarks').show(new new BookmarksLayout({
            collection: this.options.bookmarks,
        }));
    }
});