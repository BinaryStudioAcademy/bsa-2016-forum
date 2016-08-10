var app = require('./app.js');
var Marionette = require('backbone.marionette');
var ForumRouterController = require('./controllers/ForumRouter.js');
var IdeaHubRouterController = require('./controllers/IdeaHubRouter.js');

module.exports = Marionette.AppRouter.extend(
    {
        controller: ForumRouterController,
        appRoutes: {
            'forum': 'index'
        }
    },
    {
        controller: IdeaHubRouterController,
        appRoutes: {
            
        }
    }
);

