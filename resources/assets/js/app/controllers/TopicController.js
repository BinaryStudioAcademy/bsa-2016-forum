var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var TopicCollection = require('../collections/topicCollection');
var TopicCreate = require('../views/topics/topicCreate');
var TopicModel = require('../models/TopicModel');
var TopicDetailView = require('../views/topics/topicDetail');
var Radio = require('backbone.radio');

module.exports = Marionette.Object.extend({
    initialize: function () {
        this.listenTo(Radio.channel('topics'), 'editTopic', function (id) {
            alert(id);
        });
    },//
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
    },

    edit: function (id) {
        var topicModel = new TopicModel({id: id});
        topicModel.fetch({
            success: function () {
                app.render(new TopicCreate({model: topicModel}));
            }
        });
    }
}); 