var build = require('config');
var custom = require('./config.custom');
var $ = require('jquery');

var defaults = {
    debug: true,
    baseUrl: '/api/v1',
    socketUrl: 'http://localhost:3000',
    messageChangeOnDelay: 15,
    timeZone: 'Europe/Kiev'
};


var settings = $.extend(defaults, build);
settings = $.extend(settings, custom);

module.exports = settings;