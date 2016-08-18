var TopicController = require('../controllers/TopicController');
var IdeaHubController = require('../controllers/IdeaHubController');
var UserController = require('../controllers/UserController');
var DashBoardController = require('../controllers/DashboardController');
var MessageController = require('../controllers/MessageController');

module.exports = {

    routers: [
        {
            controller: new DashBoardController(),
            appRoutes: {
                '': 'index',
                'dashboard': 'index'
            }
        },
        {
            controller: new TopicController(),
            appRoutes: {
                'topics': 'index',
                'topics/:id' : 'show',
                'topic/create': 'create'
            }
        },

        {
            controller: new IdeaHubController(),
            appRoutes: {
                'ideahub': 'index'
            }
        },

        {
            controller: new UserController(),
            appRoutes: {
                'users': 'index'
            }
        },

        {
            controller: new MessageController(),
            appRoutes: {
                'messages': 'index',
                'messages/user/:user': 'show'
            }
        }

    ],

    getRouters: function () {
        return this.routers;
    }
};


