var Marionette = require('backbone.marionette');
var TopicsCollectionView = require('../topics/topicCollection');
var VotesCollectionView = require('../votes/ListVotesCollection');
var UsersCollectionView = require('../users/userCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'DashboardMain',

    regions: {
        'topics': '.topics',
        'votes': '.votes',
        'users': '.users'
    },

    onRender: function() {
        this.getRegion('topics').show(new TopicsCollectionView({
            paginate: false,
            collection: this.options.topics
        }));
        this.getRegion('votes').show(new VotesCollectionView({
            collection: this.options.votes,
            paginate: false,
        }));
        this.getRegion('users').show(new UsersCollectionView({
            collection: this.options.users,
        }));
    }

});