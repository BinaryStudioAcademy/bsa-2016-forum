var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var topicCategoryLayout = require('../views/topics/topicCategoryLayout');
var TopicCategoryCollection = require('../collections/topicCategoryCollection');
var TopicCollection = require('../collections/topicCollection');
var UserTopicCollection = require('../collections/userTopicCollection');
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
var AttachmentCollection = require('../collections/AttachmentCollection');
var CommentsCollectionView = require('../views/comments/TopicCommentsCollection');

module.exports = Marionette.Object.extend({

    index: function () {
        var topicCollection = new TopicCollection();
        topicCollection.url = '/topics';
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    },

    indexInCategory: function (catId) {
        var topicCollection = new TopicCollection({catId: catId});
        topicCollection.parentUrl = '/categories/' + catId;
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
            topicModel = Topics.get(id);
        } else {
            topicModel = new TopicModel({
                id: id,
            });
            topicModel.fetch();
        }

        var comments = new CommentsCollection();
        comments.parentUrl = _.result(topicModel, 'url');
        comments.fetch();

        var view = new TopicDetailView({
            model: topicModel,
            collection: comments
        });

        view.listenTo(Radio.channel('comment'), 'addComment', function (parentView, commentModel) {
            var model = {}, attachCollection = {}, childComments = {};

            if (commentModel) {
                //model = new TopicCommentModel(commentModel.toJSON());
                //model.setMeta(commentModel.getMeta());
                model = commentModel;
                model.parentUrl = _.result(commentModel, 'getParentUrl');
                var modelAttachs = commentModel.getMeta()[commentModel.get('id')].attachments;
                attachCollection = new AttachmentCollection(modelAttachs);
            } else {
                model = new TopicCommentModel();
                model.parentUrl = _.result(parentView.model, 'getEntityUrl');
                attachCollection = new AttachmentCollection();
            }

            //console.log(model, 'model');
            //console.log(parentView.collection);

            view.getRegion('newComment').show(new NewTopicCommentView({
                model: model,
                attachs: attachCollection,
                commentCollection: parentView.collection
            }));
        });

        view.listenTo(Radio.channel('comment'), 'showChildComments', function (commentItemView) {
            var childs = new CommentsCollection();
            childs.parentUrl = _.result(commentItemView.model, 'getEntityUrl');
            childs.fetch({
                success: function () {
                    commentItemView._childUpload = true;
                }
            });
            commentItemView.getRegion('childComments').show(new CommentsCollectionView({
                collection: childs
            }));
        });

        app.render(view);
    },

    myTopics: function () {
        var parentUrl = '/users/' + currentUser.id;
        var topicCollection = new UserTopicCollection({parentUrl: parentUrl});
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    }

});
