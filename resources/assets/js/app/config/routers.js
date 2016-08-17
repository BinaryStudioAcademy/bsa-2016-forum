var TopicController = require('../controllers/TopicController');
var IdeaHubController = require('../controllers/IdeaHubController');
var UserController = require('../controllers/UserController');

var routers = {

    routers: [
        {
            controller: new TopicController(),
            appRoutes: {
                '': 'index',
                'topic/create': 'create',
                'topics/:id': 'show'
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
        }
    ],

    getRouters: function () {
        return this.routers;
    }
};

module.exports = routers;

