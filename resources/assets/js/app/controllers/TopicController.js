var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var TopicCollection = require('../collections/topicCollection');
var TopicModel = require('../models/TopicModel');
var TopicDetailView = require('../views/topics/topicDetail');
var Radio = require('backbone.radio');
var NewTopicCommentView = require('../views/comments/TopicCommentNew');
var TopicCommentModel = require('../models/TopicCommentModel');
var CommentsCollection = require('../collections/TopicCommentsCollection');
var _ = require('underscore');

module.exports = Marionette.Object.extend({
    initialize: function (options) {
    },

    index: function () {
        var topicCollection = new TopicCollection();
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    },

    show: function (id) {
        var topicModel = new TopicModel({
            id: id,
        });

        topicModel.fetch();

        var collection = new CommentsCollection();
        collection.parentUrl = _.result(topicModel, 'url');
        collection.fetch();

        var view = new TopicDetailView({
            model: topicModel,
            collection: collection
        });

        view.listenTo(Radio.channel('newComment'), 'showCommentForm', function (parentView) {
            var model = new TopicCommentModel();
            model.parentUrl = _.result(this.model, 'url');
            parentView.getRegion('newComment').show(new NewTopicCommentView({
                model: model
            }));
        });

        app.render(view);
    },
});