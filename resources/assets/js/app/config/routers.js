var ForumController = require('../controllers/ForumController.js');
var IdeaHubController = require('../controllers/IdeaHubController.js');

var routers = {

  routers: [
    {
      controller: ForumController,
      appRoutes: {
        '': 'index'
      },
    },

    {
      controller: IdeaHubController,
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

