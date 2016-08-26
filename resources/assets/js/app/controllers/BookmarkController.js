var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var BookmarksCollection = require('../collections/bookmarkCollection');
var BookmarksLayout = require('../views/bookmarks/bookmarkLayout');

module.exports = Marionette.Object.extend({

    index: function () {
        var bookmarksCollection = new BookmarksCollection();

        bookmarksCollection.fetch();

        app.render(new BookmarksLayout({
            collection: bookmarksCollection
        }));
    }
});