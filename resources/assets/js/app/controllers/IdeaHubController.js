var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var currentUser = require('../initializers/currentUser');
var _ = require('underscore');

var VoteAImodel = require('../models/VoteAIModel');
var VoteModel = require('../models/VoteModel');
var CommentModel = require('../models/CommentModel');
var UserModel = require('../models/UserModel');

var usersCollection = require('../collections/userCollection');
var CommentsCollection = require('../collections/commentCollection');
var VoteAICollection = require('../collections/voteAICollection');
var VoteRICollection = require('../collections/voteRICollection');

var ListVotes = require('../views/votes/ListVotes');
var ShowVote = require('../views/votes/ShowVote');
var CreateVote = require('../views/votes/CreateVote');

var Votes = require('../instances/Votes');

var voteCollection = require('../collections/voteCollection');

module.exports = Marionette.Object.extend({
    index: function () {

        Votes.reset();
        var view = new ListVotes({vc: Votes});
        app.render(view);
        Votes.fetch({data: {page: 1}});
    },

    showVote: function (slug) {
        var AddCommentView = require('../views/votes/VoteCommentItemAdd');
        var view;
        var model;
        var parentUrl = '/votes/' + slug;
        var myCommentsCollection = new CommentsCollection([], {parentUrl: parentUrl});
        var VoteAnswers = new VoteRICollection([], {parentUrl: parentUrl});
        VoteAnswers.fetch();
        myCommentsCollection.fetch({
            success: function (data) {
                Radio.trigger('votesChannel', 'setCommentsCount' + slug, data.length);
            }
        });

        model = new VoteModel({ slug: slug });
        model.fetchBySlag();

        view = new ShowVote({
            model: model,
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
    createVote: function () {
        var VoteAnswers = new VoteAICollection([{}, {}], {parentUrl: ''});
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
    },
    
    editVote: function (slug) {
        var VoteAnswers = new VoteAICollection([], {parentUrl: '/votes/' + slug});
        
        VoteAnswers.fetch();
        var UsersCollection = new usersCollection();
        var accessedUsers = new usersCollection();

        UsersCollection.opposite = accessedUsers;
        UsersCollection.glyph = 'plus';
        accessedUsers.opposite = UsersCollection;
        accessedUsers.glyph = 'minus';

        var model = new VoteModel({slug: slug, user_id: currentUser.get('id')});
        model.fetchBySlag();
        var view = new CreateVote({
            model: model,
            collection: VoteAnswers,
            users: UsersCollection,
            accessedUsers: accessedUsers
        });

        view.listenTo(Radio.channel('votesChannel'), 'createEmptyVoteItem', function (col) {
            var t = (new VoteAImodel());
            col.add(t);
        });
        
        view.listenTo(Radio.channel('votesChannel'), 'loadAccessedUsers', function (parentView) {
            var naUsers =  parentView.getOption('users');
            var aUsers = parentView.getOption('accessedUsers');
            naUsers.remove(naUsers.models);
            aUsers.remove(aUsers.models);
            if (model.get('id')) {
                naUsers.fetch({
                    success: function (response) {
                        aUsers.add(response.remove(_.pluck(model._meta[model.get('id')].accessedUsers, 'user_id')));
                    }
                });
            } else {
                naUsers.fetch();
            }
        });

        app.render(view);
    }
});