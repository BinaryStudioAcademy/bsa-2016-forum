var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var topicCategoryLayout = require('../views/topics/topicCategoryLayout');
var TopicCategoryCollection = require('../collections/topicCategoryCollection');
var TopicCollection = require('../collections/topicCollection');
var TopicCreate = require('../views/topics/topicCreate');
var TopicModel = require('../models/TopicModel');
var TopicDetailView = require('../views/topics/topicDetail');

module.exports = Marionette.Object.extend({

    index: function () {
        var topicCollection = new TopicCollection();
        topicCollection.url = '/topics';
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    },

    indexInCategory: function (catId) {
        var topicCollection = new TopicCollection({catId: catId});
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    },

    indexCategories: function () {
        var topicCategoryCollection = new TopicCategoryCollection();
        topicCategoryCollection.fetch();
        app.render(new topicCategoryLayout({collection: topicCategoryCollection}));
    },

    create: function () {
        var topicCategoryCollection = new TopicCategoryCollection();
        topicCategoryCollection.fetch();

        var topicModel = new TopicModel();
        app.render(new TopicCreate({model: topicModel, collection: topicCategoryCollection}));
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