$ = require('jquery');
jQuery = $;
require('bootstrap-sass');
CKEDITOR_BASEPATH = '/ckeditor/';
require('ckeditor');
require('ckeditor/adapters/jquery');

var config = require('config');

var appInstance = require('./initializers/App');

var App = new appInstance();

App.start(config);