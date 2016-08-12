var TopicController = require('../controllers/TopicController');
var IdeaHubController = require('../controllers/IdeaHubController');

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

