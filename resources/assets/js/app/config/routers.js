var TopicController = require('../controllers/TopicController');
var IdeaHubController = require('../controllers/IdeaHubController');
var UserController = require('../controllers/UserController');

var routers = {

    routers: [
        {
            controller: new TopicController(),
            appRoutes: {
                '': 'index'
            }
        },

        {
            controller: new IdeaHubController(),
            appRoutes: {
                'votes': 'index',
                'votes/:id': 'showVote' 
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

