
var config = require('./config/config');

config.setEnv('debug');

//console.log(config.getConfig(), config);
var appInstance = require('./initializers/app');

var App = new appInstance();

App.start(config.getConfig());
