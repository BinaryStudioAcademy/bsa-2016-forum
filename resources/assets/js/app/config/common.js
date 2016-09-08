var build = require('configBuild');
var custom = require('./config.custom');
var _ = require('underscore');

var defaults = {
    debug: true,
    baseUrl: '/api/v1',
    socketUrl: 'http://localhost:3000',
    messageChangeOnDelay: 15,
    timeZone: 'Europe/Kiev'
};


var settings = _.extend(defaults, build);
settings = _.extend(settings, custom);

module.exports = settings;