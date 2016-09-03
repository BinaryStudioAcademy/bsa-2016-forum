var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var $ = require('jquery');

var currentUser = require('../initializers/currentUser');

var VoteModel = require('../models/VoteModel');
var CommentModel = require('../models/CommentModel');

var CommentsCollection = require('../collections/commentCollection');
var VoteAICollection = require('../collections/voteAICollection');

var ListVotes = require('../views/votes/ListVotes');
var ShowVote = require('../views/votes/ShowVote');

var Votes = require('../instances/Votes');

module.exports = Marionette.Object.extend({
    initialize: function () {
        this.listenTo(Radio.channel('votesChannel'), 'createComment', function (view) {
            var model = new CommentModel({user_id: currentUser.get('id')}, {parentUrl: view.options.collection.parentUrl});

            var errorContainer = $('.errors');
            errorContainer.empty();

            if (!model.save({content_origin: view.ui.text.val()}, {
                    success: function (data) {
                        view.ui.text.val('');
                        //view.options.collection.fetch({async: false});
                        view.options.collection.add(data);
                        Radio.trigger('votesChannel', 'setCommentsCount', view.options.collection.length);
                    }
                })) {
                errorContainer.html(model.validationError.content_origin);
            }
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
        
        var addedCommentsCollection = new CommentsCollection([], {parentUrl: ''});
        myCommentsCollection.listenTo(Radio.channel('commentsChannel'), 'newComment', function (comment) {
            // TODO: replace == by !=
            if ((comment.commentable_id == id) && (comment.user_id == currentUser.id)
                && (comment.commentable_type == 'App\\Models\\Vote')) {
                $('.new-comment-notification').show(300);

                addedCommentsCollection.add(new CommentModel(comment), {parentUrl: ''});

                var count = addedCommentsCollection.length + myCommentsCollection.length;
                Radio.trigger('votesChannel', 'setCommentsCount', count);
            }
        });

        if (Votes.get(id)) {
            model = Votes.get(id);
            app.render(new ShowVote({
                voteModel: model,
                collection: myCommentsCollection,
                answers: VoteAnswers,
                addedCommentsCollection: addedCommentsCollection
            }));
        } else {
            model = new VoteModel({id: id});
            model.fetch();

            app.render(new ShowVote({
                voteModel: model,
                collection: myCommentsCollection,
                answers: VoteAnswers,
                addedCommentsCollection: addedCommentsCollection
            }));
        }
    }
});