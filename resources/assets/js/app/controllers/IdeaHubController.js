var app = require('../instances/appInstance');

var Marionette = require('backbone.marionette');
var VoteModel = require('../models/VoteModel');
var ListVotes = require('../views/votes/ListVotes');

var CommentsCollection = require('../collections/commentCollection');
var ShowVote = require('../views/votes/ShowVote');

var Radio = require('backbone.radio');
var Votes = require('../instances/Votes');
module.exports = Marionette.Object.extend({
    
    index: function () {

        Votes.reset();
        var view = new ListVotes({vc: Votes});
        app.render(view);
        Votes.fetch();
    },
    showVote: function (id) {
        var model = undefined;
        var myCommentsCollection = new CommentsCollection([], {parentUrl: '/votes/' + id});
        myCommentsCollection.fetch({success: function(data) {Radio.trigger('votesChannel', 'setCommentsCount', data.length);}});

        if (Votes.get(id)) {
            model = Votes.get(id);
            app.render(new ShowVote({
                voteModel: model,
                collection: myCommentsCollection
            }));
        } else {
            model = new VoteModel({id: id});
            model.fetch();

            app.render(new ShowVote({
                voteModel: model,
                collection: myCommentsCollection
            }));

        }
    }
});