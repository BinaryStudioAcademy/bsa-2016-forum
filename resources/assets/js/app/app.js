$ = require('jquery');
jQuery = $;
require('bootstrap-sass');

var config = require('config');

var appInstance = require('./initializers/App');

App = new appInstance();

App.start(config);
