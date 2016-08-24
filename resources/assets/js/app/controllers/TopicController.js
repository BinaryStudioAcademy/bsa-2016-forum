var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var topicCategoryLayout = require('../views/topics/topicCategoryLayout');
var topicCategoryCollection = require('../collections/topicCategoryCollection');
//var TopicCollection = require('../collections/topicCollection');
var TopicCreate = require('../views/topics/topicCreate');
var TopicModel = require('../models/TopicModel');
var TopicDetailView = require('../views/topics/topicDetail');

module.exports = Marionette.Object.extend({

    index: function () {
        var topicCategoryCollection = new topicCategoryCollection();
        topicCategoryCollection.fetch();
        app.render(new topicCategoryLayout({collection: topicCategoryCollection}));
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