var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');
var TopicCollection = require('../collections/topicCollection');

module.exports = Marionette.Object.extend({
    index: function () {
        var topicCollection = new TopicCollection();
        topicCollection.fetch();
        app.render(new topicLayout({collection: topicCollection}));
    }
});
