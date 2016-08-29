var TopicController = require('../controllers/TopicController');
var IdeaHubController = require('../controllers/IdeaHubController');
var UserController = require('../controllers/UserController');
var BookmarkController = require('../controllers/BookmarkController');
var DashBoardController = require('../controllers/DashboardController');
var MessageController = require('../controllers/MessageController');

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
                'topics/:id': 'show',
                'topic/create': 'create',
                'mytopics': 'myTopics',
                'categories/:catId/topics': 'indexInCategory',
                'topicCategories': 'indexCategories'
            },
            navigItemName: 'topics'
        },

        {
            controller: new IdeaHubController(),
            appRoutes: {
                'votes': 'index',
                'votes/:id': 'showVote'
            },
            navigItemName: 'votes'
        },

        {
            controller: new UserController(),
            appRoutes: {
                'users': 'index'
            },
            navigItemName: 'users'
        },

        {
            controller: new BookmarkController(),
            appRoutes: {
                'bookmarks': 'index'
            },
            navigItemName: 'bookmarks'
        },

        {
            controller: new MessageController(),
            appRoutes: {
                'messages': 'index',
                'messages/user/:user': 'show'
            },
            navigItemName: 'messages'
        }
    ],

    getRouters: function () {
        return this.routers;
    }
};


