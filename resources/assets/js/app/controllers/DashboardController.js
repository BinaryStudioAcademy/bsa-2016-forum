var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var DashBoardLayout = require('../views/dashboard/DashboardLayout');
var CounterCollection = require('../collections/dashboardCounters');
var BookmarkCollection = require('../collections/bookmarkCollection');
var MessageCollection = require('../collections/messageCollection');
var TopicCollection = require('../collections/topicCollection');
var currentUser = require('../initializers/currentUser');
var _ = require('underscore');

module.exports = Marionette.Object.extend({
    index: function () {
        var counters = new CounterCollection();
        //counters.fetch();
        var bookmarks = new BookmarkCollection();
        bookmarks.fetch();

        var messages = new MessageCollection();
        messages.parentUrl = _.result(currentUser, 'url');
        messages.fetch();

        var topics = new TopicCollection();
        topics.fetch();

        var view = new DashBoardLayout({
            countersCollection: counters,
            bookmarks: bookmarks,
            messages: messages,
            topics: topics,

        });

        app.render(view);
    }
});
