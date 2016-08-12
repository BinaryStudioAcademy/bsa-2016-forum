$ = require('jquery');
jQuery = $;
require('bootstrap-sass');

var config = require('./config/config');

var appInstance = require('./initializers/App');

var App = new appInstance();

App.start(config);
