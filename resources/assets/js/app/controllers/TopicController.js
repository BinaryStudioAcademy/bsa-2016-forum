var Marionette = require('backbone.marionette');
var logger = require('../instances/logger');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');

module.exports = Marionette.Object.extend({
    index: function () {
        app.RootView.content.show(new topicLayout());
    }
});

