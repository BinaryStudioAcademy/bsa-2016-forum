var ForumController = require('../controllers/ForumController.js');
var IdeaHubController = require('../controllers/IdeaHubController.js');
var TopicController = require('../controllers/TopicController.js');

var routers = {

  routers: [
    {
      controller: new ForumController(),
      appRoutes: {
        '': 'index'
      }
    },

    {
      controller: new IdeaHubController(),
      appRoutes: {
        'ideahub': 'index'
      }
    },

    {
      controller: new TopicController(),
      appRoutes: {
        'topic/create': 'create'
      }
    }
  ],

  getRouters: function () {
    return this.routers;
  }
};

module.exports = routers;

