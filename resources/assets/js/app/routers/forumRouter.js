var Marionette = require('backbone.marionette');
var forumRouter = require('../config/Routers').forumRouter;

module.exports = Marionette.AppRouter.extend(forumRouter);

