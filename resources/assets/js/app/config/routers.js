var TopicController = require('../controllers/TopicController');
var IdeaHubController = require('../controllers/IdeaHubController');
var UserController = require('../controllers/UserController');
var DashBoardController = require('../controllers/DashboardController');
var BookMarkController = require('../controllers/BookMarkController');

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
                'topics/create': 'create'
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
            controller: new BookMarkController(),
            appRoutes: {
                'bookmarks': 'index'
            }
        },

    ],

    getRouters: function () {
        return this.routers;
    }
};


