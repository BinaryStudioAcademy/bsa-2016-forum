var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var topicLayout = require('../views/topics/topicLayout');

module.exports = Marionette.Object.extend({
    index: function () {
        alert('XxX');
        app.render(new topicLayout());
    }
});
