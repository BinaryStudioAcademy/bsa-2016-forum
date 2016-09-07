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
var CommentsCollectionView = require('../views/votes/VoteCommentsCollection');

var Votes = require('../instances/Votes');

var voteCollection=require('../collections/voteCollection');

module.exports = Marionette.Object.extend({
    index: function () {

        Votes.reset();
        var view = new ListVotes({vc: Votes});
        app.render(view);
        Votes.fetch();
    },
    showVote: function (id) {
        var AddCommentView = require('../views/votes/VoteCommentItemAdd');
        var view;
        var model;
        var parentUrl = '/votes/' + id;
        var myCommentsCollection = new CommentsCollection([], {parentUrl: parentUrl});
        var VoteAnswers = new VoteAICollection([], {parentUrl: parentUrl});
        VoteAnswers.fetch();
        myCommentsCollection.fetch();

        if (Votes.get(id)) {
            model = Votes.get(id);
        } else {
            model = new VoteModel({id: id});
            model.fetch();
        }
        view = new ShowVote({
            voteModel: model,
            collection: myCommentsCollection,
            answers: VoteAnswers,
            id: id
        });

        view.listenTo(Radio.channel('votesChannel'), 'showAddCommentView', function (options) {
            options.view.getRegion('addcomment').show(
                new AddCommentView({
                    parent: options.view,
                    model: new CommentModel({user_id: currentUser.get('id')}, {parentUrl: options.view.collection.parentUrl}),
                    atStart: options.atStart
                })
            );
        });

        view.listenTo(Radio.channel('votesChannel'), 'loadNestedComments', function (view) {
            var myCommentsCollection = new CommentsCollection([], {parentUrl: '/comments/' + view.model.get('id')});
            myCommentsCollection.level = view.model.collection.level + 1;
            view.collection = myCommentsCollection;
            myCommentsCollection.view = view;
            view.getRegion('answers').show(new CommentsCollectionView({
                collection: myCommentsCollection,
                parent: view
            }));
            myCommentsCollection.fetch();
        });

        view.listenTo(Radio.channel('votesChannel'), 'renderCommentsView', function (options) { //parentUrl, view
            var view = options.view;
            var myCommentsCollection = new CommentsCollection([], {parentUrl: options.parentUrl});
            myCommentsCollection.level = 1;
            view.collection = myCommentsCollection;
            view.collection.on('update', function () {
                view.updateCount();
            });
            myCommentsCollection.fetch();

            view.getRegion('comments').show(
                new CommentsCollectionView({
                    collection: view.collection,
                    parent: view
                }));
        });

        app.render(view);

    },

    showUserVotes: function() {
        var parentUrl = '/users/' + currentUser.id;
        var usersVotes = new voteCollection([], {parentUrl: parentUrl});

        usersVotes.fetch();

        app.render(new ListVotes({
            vc: usersVotes
        }));
    }
});