var TopicController = require('../controllers/TopicController');
var IdeaHubController = require('../controllers/IdeaHubController');
var UserController = require('../controllers/UserController');
var BookmarkController = require('../controllers/BookmarkController');
var MessageController = require('../controllers/MessageController');
var SubscriptionController = require('../controllers/SubscriptionController');
var DashboardController = require('../controllers/DashboardController');

module.exports = {

    routers: [
        {
            controller: new DashboardController(),
            appRoutes: {
                '': 'index',
                'dashboard': 'index',
            },
            navigItemName: 'dashboard'
        },
        {
            controller: new TopicController(),
            appRoutes: {
                '': 'indexCategories',
                'topics': 'index',
                'topics/:id': 'show',
                'topic/create/:categoryId': 'create',
                'topic/create/': 'create',
                'categories/:catId/topics': 'indexInCategory',
                'topicCategories': 'indexCategories',
                'topicCategories/create': 'createCategory',
                'topicCategories/:catId/edit': 'editCategory',
            },
            navigItemName: 'topics'
        },

        {
            controller: new TopicController(),
            appRoutes: {
                'mytopics': 'myTopics'
            },
            navigItemName: 'myTopics'
        },

        {
            controller: new IdeaHubController(),
            appRoutes: {
                'votes': 'index',
                'votes/create': 'createVote',
                
                'votes/:id': 'showVote',
                'votes/:id/edit': 'editVote'
            },
            navigItemName: 'votes'
        },

        {
            controller: new IdeaHubController(),
            appRoutes: {
                'userVotes':'showUserVotes'
            },
            navigItemName: 'myVotes'
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
        },

        {
            controller: new SubscriptionController(),
            appRoutes: {
                'subscriptions': 'index'
            },
            navigItemName: 'subscriptions'
        }
    ],

    getRouters: function () {
        return this.routers;
    }
};


