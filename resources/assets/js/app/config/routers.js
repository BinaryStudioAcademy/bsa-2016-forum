var TopicController = require('../controllers/TopicController');
var IdeaHubController = require('../controllers/IdeaHubController');
var UserController = require('../controllers/UserController');
var DashBoardController = require('../controllers/DashboardController');

module.exports = {

    routers: [
        {
            controller: new DashBoardController(),
            appRoutes: {
                '': 'index',
                'dashboard': 'index'
            },
            navigItemName: 'dashboard'
        },
        {
            controller: new TopicController(),
            appRoutes: {
                'topics': 'index',
                'categories/:catId/topics': 'indexInCategory',
                'topicCategories': 'indexCategories',
                'topics/:id' : 'show',
                'topic/create': 'create'
            },
            navigItemName: 'topics'
        },

        {
            controller: new IdeaHubController(),
            appRoutes: {
                'ideahub': 'index'
            },
            navigItemName: 'votes'
        },

        {
            controller: new UserController(),
            appRoutes: {
                'users': 'index'
            },
            navigItemName: 'users'
        }
    ],

    getRouters: function () {
        return this.routers;
    }
};


