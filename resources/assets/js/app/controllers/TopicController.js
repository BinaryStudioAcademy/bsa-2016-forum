var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var TopicCollection = require('../collections/topicCollection');
var topicCreateView = require('../views/topics/topicCreate');
var TopicModel = require('../models/topicModel');
var TopicDetailView = require('../views/topics/topicDetail');

module.exports = Marionette.Object.extend({

    index: function () {
        var topicCollection = new TopicCollection();
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    },

    show: function (id) {
        var topicModel = new TopicModel({id: id});
        topicModel.fetch({
            wait: true,
            async: false
        });

        app.render(new TopicDetailView({model: topicModel}));

    }
});
