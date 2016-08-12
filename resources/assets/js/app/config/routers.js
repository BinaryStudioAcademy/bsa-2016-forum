var TopicController = require('../controllers/TopicController.js');
var IdeaHubController = require('../controllers/IdeaHubController.js');

var routers = {

  routers: [
    {
      controller: new TopicController(),
      appRoutes: {
        '': 'index'
      },
    },

    {
      controller: new IdeaHubController(),
      appRoutes: {
        'ideahub': 'index'
      },
    }
  ],

  getRouters: function () {
    return this.routers;
  }
};

module.exports = routers;

