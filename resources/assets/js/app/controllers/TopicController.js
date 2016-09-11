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
var Radio = require('backbone.radio');
var NewTopicCommentView = require('../views/comments/TopicCommentNew');
var TopicCommentModel = require('../models/TopicCommentModel');
var CommentsCollection = require('../collections/TopicCommentsCollection');
var CommentsCollectionView = require('../views/comments/TopicCommentsCollection');
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
        var comments = new CommentsCollection();
        comments.parentUrl = _.result(topicModel, 'url') + '/' + slug;
        comments.fetch();
        topicModel.fetchBySlag();

        var view = new TopicDetailView({
            model: topicModel,
            collection: comments
        });

        view.listenTo(Radio.channel('comment'), 'addComment', function (parentView, commentModel) {
            var model = {}, attachCollection = {}, childComments = {};

            if (commentModel) {
                model = new TopicCommentModel(commentModel.toJSON());
                model.setMeta(commentModel.getMeta());
                model.parentUrl = _.result(commentModel, 'getParentUrl');
            } else {
                model = new TopicCommentModel();
                model.parentUrl = _.result(parentView.model, 'getEntityUrl');
            }

            view.getRegion('newComment').show(new NewTopicCommentView({
                model: model,
                commentCollection: parentView.collection,
                parentView: parentView
            }));
        });

        view.listenTo(Radio.channel('comment'), 'showChildComments', function (commentItemView) {
            var childs = new CommentsCollection();
            childs.parentUrl = _.result(commentItemView.model, 'getEntityUrl');
            childs.fetch();
            commentItemView._childUpload = true;
            commentItemView.collection = childs;
            commentItemView.getRegion('childComments').show(new CommentsCollectionView({
                collection: childs,
                parentCommentView: commentItemView
            }));
        });

        app.render(view);
    },

    myTopics: function () {
        var parentUrl = '/users/' + currentUser.id;
        var topicCollection = new UserTopicCollection({parentUrl: parentUrl});
        topicCollection.fetch({data: {page: 1}});
        app.render(new topicLayout({collection: topicCollection, blockhide: true}));
    }
});
