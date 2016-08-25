var TopicController = require('../controllers/TopicController');
var IdeaHubController = require('../controllers/IdeaHubController');
var UserController = require('../controllers/UserController');
var BookmarkController = require('../controllers/BookmarkController');
var DashBoardController = require('../controllers/DashboardController');

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
            controller: new BookmarkController(),
            appRoutes: {
                'bookmarks': 'index'
            }
        }
    ],

    getRouters: function () {
        return this.routers;
    }
};


