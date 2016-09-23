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
var TagCollection = require('../collections/tagCollection');

module.exports = Marionette.Object.extend({

    index: function (tags) {
        var topicCollection = new TopicCollection();
        var data = {
            'tags': tags,
            'page': 1
        };
        topicCollection.url = '/topics';
        topicCollection.fetch({data: data});
        app.render(new topicLayout({collection: topicCollection}));
    },

    indexInCategory: function (catId) {
        var topicCollection = new TopicCollection();
        topicCollection.parentUrl = '/categories/' + catId;

        topicCollection.fetch({data: {page: 1}});
        var topicCategoryModel = new TopicCategoryModel({id:catId});
        topicCategoryModel.fetch();
        app.render(new topicLayout({
            collection: topicCollection,
            categoryId: catId,
            model:topicCategoryModel
        }));
    },

    indexCategories: function () {
        var topicCategoryCollection = new TopicCategoryCollection();
        topicCategoryCollection.fetch();
        app.render(new topicCategoryLayout({collection: topicCategoryCollection}));
    },

    create: function (categoryId) {
        var topicCategoryCollection = new TopicCategoryCollection();
        var tagCollection = new TagCollection();
        var topicModel = new TopicModel();

        app.render(new TopicCreate({
            model: topicModel,
            collection: topicCategoryCollection,
            tags: tagCollection
        }));

        tagCollection.fetch();

        topicCategoryCollection.fetch({
            success: function(collection){
                var category = collection.findWhere({slug: categoryId})

                if (category != undefined) {
                    topicModel.set("category_id", category.get("id"));
                }
        }});

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

        view.listenTo(Radio.channel('comment'), 'addComment', function (parentView, commentModel, commentCollection) {
            var model = {}, childComments = {};
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
                commentCollection: commentCollection,
                parentCommentView: parentView._isTopicView ? null : parentView
            }));
        });

        view.listenTo(Radio.channel('comment'), 'showChildComments', function (commentItemView) {
            var childs = commentItemView._childCommentsCollection;
            childs.parentUrl = _.result(commentItemView.model, 'getEntityUrl');
            childs.fetch();
            commentItemView._childUpload = true;
            //commentItemView._childCommentsCollection = childs;
            commentItemView.getRegion('childComments').show(new CommentsCollectionView({
                collection: childs,
                parentCommentView: commentItemView
            }));
        });

        app.render(view);
    },

    myTopics: function () {
        var parentUrl = '/users/' + currentUser.id;
        var topicCollection = new UserTopicCollection();
        topicCollection.parentUrl = parentUrl;
        topicCollection.fetch({data: {page: 1}});
        app.render(new topicLayout({collection: topicCollection, blockhide: true}));
    },
    
    editTopic: function (slug) {
        var topicCategoryCollection = new TopicCategoryCollection();
        var tagCollection = new TagCollection();

        topicCategoryCollection.fetch();
        tagCollection.fetch();

        var topicModel = new TopicModel({slug: slug, user_id: currentUser.get('id')});
        topicModel.fetchBySlag();
        app.render(new TopicCreate({model: topicModel, collection: topicCategoryCollection, tags: tagCollection}));

    }
});
