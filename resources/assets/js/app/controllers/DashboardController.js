var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var DashBoardLayout = require('../views/dashboard/DashboardLayout');
var CountersCollection = require('../collections/dashboardCounters');
var BookmarksCollection = require('../collections/bookmarkCollection');

module.exports = Marionette.Object.extend({
    index: function () {
        console.log(112);
        var counters = new CountersCollection();
        //counters.fetch();
        var bookmarks = new BookmarksCollection();
        bookmarks.fetch();

        var view = new DashBoardLayout({
            countersCollection: counters,
            bookmarks: bookmarks
        });

        app.render(view);
    }
});
