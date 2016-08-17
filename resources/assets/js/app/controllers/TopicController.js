var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var TopicCollection = require('../collections/topicCollection');
var TopicCreate = require('../views/topics/topicCreate');
var TopicModel = require('../models/TopicModel');
var TopicDetailView = require('../views/topics/topicDetail');
var Radio = require('backbone.radio');

module.exports = Marionette.Object.extend({

    index: function () {
        var topicCollection = new TopicCollection();
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    },

    show: function (id) {
        var topicModel = new TopicModel({
            id: id,
        });

        topicModel.fetch({
            wait: true,
            async: false
        });

        var view = new TopicDetailView({ model: topicModel });

        view.listenTo(Radio.channel('newComment'), 'showCommentForm', view.newCommentForm);

        app.render(view);
    },

    create: function () {
        app.getInstance().RootView.content.show(new TopicCreate());
    }
});