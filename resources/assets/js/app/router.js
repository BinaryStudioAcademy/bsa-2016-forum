var Marionette = require('backbone.marionette');
var ForumController = require('./controllers/ForumController.js');
var IdeaHubController = require('./controllers/IdeaHubController.js');
var logger = require('./instances/logger');

module.exports = Marionette.AppRouter.extend({
    onRoute: function (name, path, arguments) {
       logger('route ' + name + ' start');
    }
});

