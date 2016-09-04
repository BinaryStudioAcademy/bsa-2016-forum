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
var currentUser = require('../initializers/currentUser');
var TopicAddLikeModel = require('../models/TopicAddLikeModel');
var TopicRemoveLikeModel = require('../models/TopicRemoveLikeModel');

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
        var topicModel = new TopicModel({id: id});
        topicModel.fetch({
            success: function () {
                app.render(new TopicDetailView({model: topicModel}));
            }
        });
    },

    myTopics: function () {
        var parentUrl = '/users/' + currentUser.id;
        var topicCollection = new UserTopicCollection({parentUrl: parentUrl});
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    },

    addLike: function(idTopic){
        alert("addLikeFunction"+idTopic);
        var parentUrl = '/topics/'+idTopic;
        var topicAddLikeModel=new TopicAddLikeModel({parentUrl: parentUrl});
        topicAddLikeModel.save();
    },

    removeLike: function(idTopic,idLike){
        alert("removeLikeFunction"+idTopic+'***'+idLike);
        var parentUrl = '/topics/'+idTopic+'/likes/'+idLike;
        var topicRemoveLikeModel = new TopicRemoveLikeModel({parentUrl: parentUrl,id:idLike});
        topicRemoveLikeModel.destroy({success: function(model, response) {
            alert("model deleted");
        },
        error:function(){
            alert("ooops");
        }});
    }
});
