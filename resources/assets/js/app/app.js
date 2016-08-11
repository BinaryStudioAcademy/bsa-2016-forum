var config = require('./config/config');

var appInstance = require('./initializers/app');

var App = new appInstance();

App.start(config);
