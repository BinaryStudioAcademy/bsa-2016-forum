var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');
var TopicCreate = require('../views/topics/createTopic.js');

module.exports = Marionette.Object.extend({

    create: function () {
        app.getInstance().RootView.content.show(new TopicCreate());
    }
});