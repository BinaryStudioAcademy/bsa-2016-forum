var _ = require('underscore');
var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var topicCategoryLayout = require('../views/topics/topicCategoryLayout');
var TopicCategoryCollection = require('../collections/topicCategoryCollection');
var TopicCollection = require('../collections/topicCollection');
var UserTopicCollection = require('../collections/userTopicCollection');
var TopicCreate = require('../views/topics/topicCreate');
var TopicModel = require('../models/TopicModel');
var TopicCategoryModel = require('../models/TopicCategoryModel');
var TopicDetailView = require('../views/topics/topicDetail');
var currentUser = require('../initializers/currentUser');
var TopicCategoryCreate = require('../views/topics/topicCategoryCreate');

module.exports = Marionette.Object.extend({

    index: function () {
        var topicCollection = new TopicCollection();
        topicCollection.url = '/topics';
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    },

    indexInCategory: function (catId) {
        var topicCollection = new TopicCollection();
        topicCollection.parentUrl = '/categories/' + catId;
        topicCollection.fetch();
        app.render(new topicLayout({
            collection: topicCollection,
            categoryId: catId
        }));
    },

    indexCategories: function () {
        var topicCategoryCollection = new TopicCategoryCollection();
        topicCategoryCollection.fetch();
        app.render(new topicCategoryLayout({collection: topicCategoryCollection}));
    },

    create: function (categoryId) {
        var topicCategoryCollection = new TopicCategoryCollection();
        topicCategoryCollection.fetch();

        var topicModel = new TopicModel({category_id: categoryId});
        app.render(new TopicCreate({
            model: topicModel,
            collection: topicCategoryCollection
        }));
    },

    createCategory: function () {
        var topicCategoryModel = new TopicCategoryModel();
        topicCategoryModel.fetch();

        app.render(new TopicCategoryCreate({model: topicCategoryModel}));
    },

    editCategory: function (catId) {
        var topicCategoryModel = new TopicCategoryModel({id: catId});
        topicCategoryModel.fetch();

        app.render(new TopicCategoryCreate({model: topicCategoryModel}));
    },

    show: function (slug)  {
        var topicModel = new TopicModel({slug: slug});
        topicModel.fetchBySlag();
        app.render(new TopicDetailView({model: topicModel}));
    },

    myTopics: function () {
        var parentUrl = '/users/' + currentUser.id;
        var topicCollection = new UserTopicCollection({parentUrl: parentUrl});
        topicCollection.fetch({data: {page: 1}});
        app.render(new topicLayout({collection: topicCollection, blockhide: true}));
    }
});
