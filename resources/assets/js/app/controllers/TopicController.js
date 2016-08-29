var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var topicCategoryLayout = require('../views/topics/topicCategoryLayout');
var TopicCategoryCollection = require('../collections/topicCategoryCollection');
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
var currentUser = require('../initializers/currentUser');

module.exports = Marionette.Object.extend({

    index: function () {
        var topicCollection = new TopicCollection();
        topicCollection.url = '/topics';
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    },

    indexInCategory: function (catId) {
        var topicCollection = new TopicCollection({catId: catId});
        topicCollection.url = '/categories/' + catId + '/topics';
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
            if (childCommentId) {
                model.parentUrl = _.result(topicModel, 'url') + _.result(model, 'url') + '/' + childCommentId;
            } else {
                model.parentUrl = _.result(topicModel, 'url');
            }

            parentView.getRegion('newComment').show(new NewTopicCommentView({
                model: model
            }));
        });

        view.listenTo(Radio.channel('comment'), 'editComment', function (view) {
            if (!view.model.parentUrl) view.model.parentUrl = collection.parentUrl;
            view.getRegion('newComment').show(new NewTopicCommentView({
                model: view.model,
                attachs: view._attachs
            }));
        });

        view.listenTo(Radio.channel('comment'), 'removeComment', function (view) {
            //console.log(commentModel);
            view.model.parentUrl = _.result(topicModel, 'url');
            view.model.destroy({
                success: function () {

                },
                error: function (model, response) {
                    view.$('.errors').text(response.responseText);
                },
                wait: true
            });
        });

        app.render(view);
    },

    myTopics: function () {
        var parentUrl = '/users/' + currentUser.id;
        var topicCollection = new TopicCollection({parentUrl: parentUrl});
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    }

});
