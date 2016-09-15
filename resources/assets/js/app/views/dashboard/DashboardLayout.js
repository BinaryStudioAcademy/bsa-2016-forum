var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var _ = require('underscore');
var CountersCollectionView = require('./CountersCollection');
var DashBoardProfileView = require('./DashboardProfile');
var DashBoardMainView = require('./DashboardMain');

module.exports = Marionette.LayoutView.extend({
    template: 'DashboardLayout',
    regions: {
        counters: '.counters',
        sidebar: '.sidebar',
        content: '.content'
    },

    onRender: function () {
        this.getRegion('counters').show(new CountersCollectionView({
            collection: this.options.countersCollection
        }));
        this.getRegion('content').show(new DashBoardMainView({
            topics: this.options.topics,
            users: this.options.users,
            votes: this.options.votes
        }));
        this.getRegion('sidebar').show(new DashBoardProfileView({
            bookmarks: this.options.bookmarks,
            subscriptions: this.options.subscriptions,
            messages: this.options.messages
        }));
    }
});
