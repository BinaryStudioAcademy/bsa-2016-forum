var app = require('../instances/appInstance');
var Backbone = require('backbone');
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
            var success = true;
            if (!view.model.save({
                    user_id: currentUser.get('id'),
                    finished_at: moment(view.ui.finished.val(), view.dateFormats, true).format("YYYY-MM-DD HH:mm:ss"),
                    is_single: view.ui.isSingle.prop('checked'),
                    is_public: view.ui.isPublic.prop('checked'),
                    is_saved: 0
                }, {
                    async: false,
                    success: function (data) {
                        view.model.trigger('saved', data.get('id'));
                    }
                })) {
                success = false;
            }

            if (view.model.get('id')) {
                view.options.answers.each(function (model, index) {
                    if (model.hasChanged('name'))
                        if (!model.save({
                                user_id: currentUser.get('id'),
                                vote_id: view.model.get('id')
                            }, {
                                success: function () {
                                    model.trigger('saved');
                                }
                            })) {
                            success = false;
                        }
                });

                if (view.model.get('is_public') == 0) {

                    var permission = new UserModel({}, {parentUrl: '/votes/' + view.model.get('id')});
                    var users = [];
                    view.options.accessedUsers.each(function (model, index) {
                        users.push(model.get('id'));
                    });
                    debugger;
                    permission.save({users: users}, {
                        async: false, error: function () {
                            success = false;
                        }
                    });
                }
            }
            if (success && view.model.get('id')) {
                //view.$('.vote-new *').prop('disabled', true);
                setTimeout(function () {
                    //Backbone.history.navigate('votes/' + view.model.get('id'), {trigger: true});
                }, 1000);
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

        UsersCollection.opposite = accessedUsers;
        accessedUsers.opposite = UsersCollection;

        var model = new VoteModel();

        app.render(new CreateVote({
            model: model,
            answers: VoteAnswers,
            users: UsersCollection,
            accessedUsers: accessedUsers
        }));
    }
});