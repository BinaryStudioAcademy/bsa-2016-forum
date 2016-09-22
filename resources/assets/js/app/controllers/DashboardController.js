var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var DashBoardLayout = require('../views/dashboard/DashboardLayout');
var CounterCollection = require('../collections/dashboardCounters');
var BookmarkCollection = require('../collections/bookmarkCollection');
var SubscriptionCollection = require('../collections/subscriptionCollection');
var MessageCollection = require('../collections/messageCollection');
var TopicCollection = require('../collections/topicCollection');
var VotesCollection = require('../collections/voteCollection');
var UserCollection = require('../collections/userCollection');
var currentUser = require('../initializers/currentUser');
var _ = require('underscore');

module.exports = Marionette.Object.extend({
    index: function () {
        var counters = new CounterCollection();
        //counters.fetch();

        var bookmarks = new BookmarkCollection();
        bookmarks.fetch({ data: { limit: 5 } });
        
        var subscriptions = new SubscriptionCollection();
        subscriptions.parentUrl = _.result(currentUser, 'url');
        subscriptions.fetch({ data: { limit: 5 } });

        var messages = new MessageCollection();
        messages.parentUrl = _.result(currentUser, 'url');
        messages.fetch({
            data: { limit: 5 }
        });

        var topics = new TopicCollection();
        topics.fetch({
            data: { limit: 5 }
        });

        var votes = new VotesCollection();
        votes.fetch({
            data: { limit: 5 }
        });

        var users = new UserCollection();
        users.fetch({
            data: { status: 'online' }
        });

        var view = new DashBoardLayout({
            countersCollection: counters,
            bookmarks: bookmarks,
            subscriptions: subscriptions,
            messages: messages,
            votes: votes,
            users: users,
            topics: topics
        });

        app.render(view);
    }
});
