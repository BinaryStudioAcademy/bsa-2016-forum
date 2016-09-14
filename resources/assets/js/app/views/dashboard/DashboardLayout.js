var Marionette = require('backbone.marionette');
var TopicsCollectionView = require('../topics/topicCollection');
var VotesCollectionView = require('../votes/ListVotesCollection');
var UsersCollectionView = require('../users/userCollection');
var BookmarksCollection = require('../bookmarks/bookmarkCollection');
var MessagesCollection = require('../messages/messageCollection');
var logger = require('../../instances/logger');
var _ = require('underscore');
var CountersCollectionView = require('./CountersCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'DashboardLayout',
    regions: {
        counters: '.counters',
        bookmarks: '.bookmarks',
        messages: '.messages',
        topics: '.topics',
        votes: '.votes',
        users: '.users'
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
        this.getRegion('users').show(new UsersCollectionView({
            collection: this.options.users
        }));
        this.getRegion('messages').show(new MessagesCollection({
            collection: this.options.messages
        }));
        this.getRegion('bookmarks').show(new BookmarksCollection({
            collection: this.options.bookmarks
        }));
    }
});
