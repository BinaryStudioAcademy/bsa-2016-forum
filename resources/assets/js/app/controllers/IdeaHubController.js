var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

var currentUser = require('../initializers/currentUser');

var VoteModel = require('../models/VoteModel');
var CommentModel = require('../models/CommentModel');

var CommentsCollection = require('../collections/commentCollection');
var VoteAICollection = require('../collections/voteAICollection');

var ListVotes = require('../views/votes/ListVotes');
var ShowVote = require('../views/votes/ShowVote');

var Votes = require('../instances/Votes');

var voteCollection = require('../collections/voteCollection');

module.exports = Marionette.Object.extend({
    index: function () {

        Votes.reset();
        var view = new ListVotes({vc: Votes});
        app.render(view);
        Votes.fetch({data: {page: 1}});
    },
    showVote: function (id) {
        var AddCommentView = require('../views/votes/VoteCommentItemAdd');
        var view;
        var model;
        var parentUrl = '/votes/' + id;
        var myCommentsCollection = new CommentsCollection([], {parentUrl: parentUrl});
        var VoteAnswers = new VoteAICollection([], {parentUrl: parentUrl});
        VoteAnswers.fetch();
        myCommentsCollection.fetch({
            success: function (data) {
                Radio.trigger('votesChannel', 'setCommentsCount', data.length);
            }
        });

        if (Votes.get(id)) {
            model = Votes.get(id);
        } else {
            model = new VoteModel({id: id});
            model.fetch();
        }
        view = new ShowVote({
            voteModel: model,
            collection: myCommentsCollection,
            answers: VoteAnswers
        });

        view.listenTo(Radio.channel('votesChannel'), 'showAddCommentView', function (view) {

            view.getRegion('addcomment').show(
                new AddCommentView({
                    parent: view,
                    model: new CommentModel({user_id: currentUser.get('id')}, {parentUrl: view.collection.parentUrl})
                })
            );
        });

        app.render(view);

    },

    showUserVotes: function () {
        var parentUrl = '/users/' + currentUser.id;
        var usersVotes = new voteCollection([], {parentUrl: parentUrl});

        usersVotes.fetch();

        app.render(new ListVotes({
            vc: usersVotes
        }));
    }
});