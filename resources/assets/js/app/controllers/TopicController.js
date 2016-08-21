var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var TopicCollection = require('../collections/topicCollection');
var TopicCreate = require('../views/topics/topicCreate');
var TopicModel = require('../models/TopicModel');
var TopicDetailView = require('../views/topics/topicDetail');

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
        var topicModel = new TopicModel({id: id});
        topicModel.fetch({
            success: function () {
                app.render(new TopicDetailView({model: topicModel}));
            }
        });
    }
});
