var TopicController = require('../controllers/TopicController');
var IdeaHubController = require('../controllers/IdeaHubController');
var UserController = require('../controllers/UserController');
var BookmarkController = require('../controllers/BookmarkController');
var MessageController = require('../controllers/MessageController');

module.exports = {

    routers: [
        {
            controller: new TopicController(),
            appRoutes: {
                '': 'index',
                'topics': 'index',
                'topics/:id': 'show',
                'topic/create': 'create',
                'categories/:catId/topics': 'indexInCategory',
                'topicCategories': 'indexCategories',
                'topic/:id/edit':'edit'
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


