var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');
var mock = require('../instances/Mock');
var ListVotes = require('../views/votes/ListVotes');

var VotesCollection = require('../collections/voteCollection');
var ViewVotesCollection  = require('../views/votes/ListVotesCollection');
module.exports = Marionette.Object.extend({

    index: function () {
        lw = new ListVotes();
        app.getInstance().RootView.content.show(lw);
        collection = new VotesCollection(mock.votes);
        lw.items.show(new ViewVotesCollection({collection: collection}));
    }
});