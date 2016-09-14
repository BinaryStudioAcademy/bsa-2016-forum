var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var currentUser = require('../initializers/currentUser');
var _ = require('underscore');

var VoteAImodel = require('../models/VoteAIModel');
var VoteModel = require('../models/VoteModel');
var TopicCommentModel = require('../models/TopicCommentModel');
var UserModel = require('../models/UserModel');

var usersCollection = require('../collections/userCollection');
var CommentsCollection = require('../collections/TopicCommentsCollection');
var VoteAICollection = require('../collections/voteAICollection');
var VoteRICollection = require('../collections/voteRICollection');

var ListVotes = require('../views/votes/ListVotes');
var ShowVote = require('../views/votes/ShowVote');
var CreateVote = require('../views/votes/CreateVote');
var NewVoteCommentView = require('../views/comments/TopicCommentNew');
var CommentsCollectionView = require('../views/comments/TopicCommentsCollection');

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
        var view;
        var model;
        var parentUrl = '/votes/' + id;
        var myCommentsCollection = new CommentsCollection([], {parentUrl: parentUrl});
        var VoteAnswers = new VoteRICollection([], {parentUrl: parentUrl});
        VoteAnswers.fetch();
        myCommentsCollection.fetch({
            success: function (data) {
                Radio.trigger('votesChannel', 'setCommentsCount' + id, data.length);
            }
        });

        if (Votes.get(id)) {
            model = Votes.get(id);
        } else {
            model = new VoteModel({id: id});
            model.fetch();
        }
        view = new ShowVote({
            model: model,
            collection: myCommentsCollection,
            answers: VoteAnswers
        });

        view.listenTo(Radio.channel('comment'), 'addComment', function (parentView, commentModel, commentCollection) {
                var model = {}, childComments = {};
                if (commentModel) {
                    model = new TopicCommentModel(commentModel.toJSON());
                    model.setMeta(commentModel.getMeta());
                    model.parentUrl = _.result(commentModel, 'getParentUrl');
                } else {
                    model = new TopicCommentModel();
                    model.parentUrl = _.result(parentView.model, 'getEntityUrl');
                }

                view.getRegion('newComment').show(new NewVoteCommentView({
                    model: model,
                    commentCollection: commentCollection,
                    parentCommentView: parentView
                }));
        });

        view.listenTo(Radio.channel('comment'), 'showChildComments', function (commentItemView) {
            var childs = new CommentsCollection();
            childs.parentUrl = _.result(commentItemView.model, 'getEntityUrl');
            childs.fetch();
            commentItemView._childUpload = true;
            commentItemView._childCommentsCollection = childs;
            commentItemView.getRegion('childComments').show(new CommentsCollectionView({
                collection: childs,
                parentCommentView: commentItemView
            }));
        });

        view.listenTo(Radio.channel('votesChannel'), 'loadVoteItemsComments', function (parentView) {
            var myCommentsCollection = new CommentsCollection([], {parentUrl: parentView.model.commentsUrl});
            debugger;
            parentView.collection = myCommentsCollection;
            myCommentsCollection.fetch();
            parentView.getRegion('comments').show(new CommentsCollectionView({
                collection: myCommentsCollection
            }));
        });

        app.render(view);

    },
    createVote: function () {
        var VoteAnswers = new VoteAICollection([{name: ''}], {parentUrl: ''});
        var UsersCollection = new usersCollection();
        var accessedUsers = new usersCollection();

        UsersCollection.fetch();

        UsersCollection.opposite = accessedUsers;
        UsersCollection.glyph = 'plus';
        accessedUsers.opposite = UsersCollection;
        accessedUsers.glyph = 'minus';

        var model = new VoteModel({user_id: currentUser.get('id')});
        var view = new CreateVote({
            model: model,
            collection: VoteAnswers,
            users: UsersCollection,
            accessedUsers: accessedUsers
        });

        view.listenTo(Radio.channel('votesChannel'), 'createEmptyVoteItem', function (col) {
            col.add(new VoteAImodel());
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