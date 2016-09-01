var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var moment = require('moment');
var Handlebars = require('handlebars');

var currentUser = require('../initializers/currentUser');

var VoteAImodel = require('../models/VoteAImodel');
var VoteModel = require('../models/VoteModel');
var CommentModel = require('../models/CommentModel');
var UserModel = require('../models/UserModel');

var usersCollection = require('../collections/userCollection');
var CommentsCollection = require('../collections/commentCollection');
var VoteAICollection = require('../collections/voteAICollection');

var ListVotes = require('../views/votes/ListVotes');
var ShowVote = require('../views/votes/ShowVote');
var CreateVote = require('../views/votes/CreateVote');

var Votes = require('../instances/Votes');

module.exports = Marionette.Object.extend({
    initialize: function () {
        this.listenTo(Radio.channel('vo' +
            'tesChannel'), 'createComment', function (view) {
            var model = new CommentModel({user_id: currentUser.get('id')}, {parentUrl: view.options.collection.parentUrl});
            model.save({content_origin: view.ui.text.val()}, {
                success: function (data) {
                    view.ui.text.val('');
                    //view.options.collection.fetch({async: false});
                    view.options.collection.add(data);
                    Radio.trigger('votesChannel', 'setCommentsCount', view.options.collection.length);
                }
            });
        });

        this.listenTo(Radio.channel('votesChannel'), 'createEmptyVoteItem', function (col) {
            col.add(new VoteAImodel({}, {parentUrl: col.parentUrl}));
        });

        this.listenTo(Radio.channel('votesChannel'), 'createVote', function (view) {
            if(!view.model.save({
                user_id: currentUser.get('id'),
                finished_at: moment(view.ui.finished.val(), view.model.dateFormats, true).format("YYYY-MM-DD HH:mm:ss"),
                is_single: view.ui.isSingle.prop('checked'),
                is_public: view.ui.radiobuttons.prop('checked'),
                is_saved: 0
            }, {
                async: false,
                success: function (data) {
                    view.ui.title.css('border', '1px solid green');
                    view.ui.errors.empty();
                    view.ui.dateerrors.empty();
                    view.options.answers.parentUrl = '/votes/' + data.get('id');
                }
            })) {
                view.printErrors(view.model.validationError);
            }

            if (view.model.get('id')) {
                view.options.answers.each(function (model, index) {
                    if(!model.save({
                        user_id: currentUser.get('id'),
                        vote_id: view.model.get('id')
                    }, {success: function () {
                            model.view.ui.name.css('border', '1px solid green');
                            model.view.ui.errors.empty();
                        }})) {
                        model.view.printErrors(model.validationError);
                    }
                });

                var permission = new UserModel({}, {parentUrl: '/votes/' + view.model.get('id')});
                var users = [];
                view.options.accessedUsers.each(function (model, index) {
                    users.push(model.get('id'));
                });
                permission.save({users: users});
            }
        });

        Handlebars.registerHelper('addDate', function (options) {
            return moment().add(30, 'd').format('DD/MM/YYYY HH/mm/ss');
        });
    },

    index: function () {

        Votes.reset();
        var view = new ListVotes({vc: Votes});
        app.render(view);
        Votes.fetch();
    },
    showVote: function (id) {
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
            app.render(new ShowVote({
                voteModel: model,
                collection: myCommentsCollection,
                answers: VoteAnswers
            }));
        } else {
            model = new VoteModel({id: id});
            model.fetch();

            app.render(new ShowVote({
                voteModel: model,
                collection: myCommentsCollection,
                answers: VoteAnswers
            }));

        }
    },
    createVote: function () {
        var VoteAnswers = new VoteAICollection([{}, {}], {parentUrl: ''});
        var UsersCollection = new usersCollection();
        var accessedUsers = new usersCollection();
        UsersCollection.fetch();
        UsersCollection.accessedCollection = accessedUsers;
        var model = new VoteModel();
        app.render(new CreateVote({
            model: model,
            answers: VoteAnswers,
            users: UsersCollection,
            accessedUsers: accessedUsers
        }));
    }
});