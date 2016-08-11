var app = require('../instances/appInstance');
var Topics = require('../views/topics/topics.js');
var Marionette = require('backbone.marionette');

module.exports = Marionette.Object.extend({

    index: function () {
        app.getInstance().RootView.content.show(new Topics());
    }
});