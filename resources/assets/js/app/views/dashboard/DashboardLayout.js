var Marionette = require('backbone.marionette');
var TopicsCollectionView = require('../topics/topicCollection');
var VotesCollectionView = require('../votes/ListVotesCollection');
var BookmarksCollection = require('../bookmarks/bookmarkCollection');
var SubscriptionsCollections = require('../subscriptions/subscriptionsCollection');
var MessagesCollection = require('../messages/messageCollection');
var logger = require('../../instances/logger');
var CountersCollectionView = require('./CountersCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'DashboardLayout',
    regions: {
        counters: '.counters',
        bookmarks: '.bookmarks',
        messages: '.messages',
        topics: '.topics',
        votes: '.votes',
        subscriptions: '.subscriptions'
    },

    onRender: function () {
        this.getRegion('counters').show(new CountersCollectionView({
            collection: this.options.countersCollection
        }));
        this.getRegion('topics').show(new TopicsCollectionView({
            paginate: false,
            collection: this.options.topics
        }));
        this.getRegion('votes').show(new VotesCollectionView({
            collection: this.options.votes,
            paginate: false
        }));
        this.getRegion('messages').show(new MessagesCollection({
            collection: this.options.messages
        }));
        this.getRegion('bookmarks').show(new BookmarksCollection({
            collection: this.options.bookmarks
        }));
        this.getRegion('subscriptions').show(new SubscriptionsCollections({
            collection: this.options.subscriptions
        }));
    }
});
