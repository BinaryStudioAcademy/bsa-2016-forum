var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var TopicCollection = require('../collections/topicCollection');
var TopicCreate = require('../views/topics/topicCreate');
var TopicModel = require('../models/TopicModel');
var TopicDetailView = require('../views/topics/topicDetail');
var Radio = require('backbone.radio');
var NewTopicCommentView = require('../views/comments/TopicCommentNew');
var TopicCommentModel = require('../models/TopicCommentModel');
var CommentsCollection = require('../collections/TopicCommentsCollection');
var _ = require('underscore');
var Topics = require('../instances/TopicCollection');

module.exports = Marionette.Object.extend({

    index: function () {
        var topicCollection = new TopicCollection();
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    },
    create: function () {
        var topicModel = new TopicModel();
        app.render(new TopicCreate({model: topicModel}));
    },

    show: function (id) {
        var topicModel = {};

        if (Topics.get(id)) {
            console.log(id);
            topicModel = Topics.get(id);
        } else {
            topicModel = new TopicModel({
                id: id,
            });

            topicModel.fetch();
        }

        var collection = new CommentsCollection();
        collection.parentUrl = _.result(topicModel, 'url');
        collection.fetch();

        var view = new TopicDetailView({
            model: topicModel,
            collection: collection
        });

        view.listenTo(Radio.channel('comment'), 'addComment', function (parentView, childCommentId) {
            var model = new TopicCommentModel();

            // maybe choose some better method to get child comment url
            childCommentId ? model.parentUrl = _.result(topicModel, 'url') + _.result(model, 'url') +
                    '/' + childCommentId :
                model.parentUrl = _.result(topicModel, 'url');

            parentView.getRegion('newComment').show(new NewTopicCommentView({
                model: model
            }));
        });

        view.listenTo(Radio.channel('comment'), 'editComment', function (parentView, commentModel) {
            if (!commentModel.parentUrl) commentModel.parentUrl = collection.parentUrl;
            //console.log(commentModel);
            parentView.getRegion('newComment').show(new NewTopicCommentView({
                model: commentModel
            }));
        });

        view.listenTo(Radio.channel('comment'), 'removeComment', function (commentModel) {
            //console.log(commentModel);
            commentModel.parentUrl = _.result(topicModel, 'url');
            commentModel.destroy();
        });

        app.render(view);
    },
});
