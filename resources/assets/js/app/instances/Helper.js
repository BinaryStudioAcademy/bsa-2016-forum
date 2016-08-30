var Handlebars = require('handlebars');
var Templates = require('../templates')(Handlebars);
var Marionette = require('backbone.marionette');
var currentUser = require('../initializers/currentUser');
alert('xx');//
Handlebars.registerHelper('ifCond', function(id, options) {
    if (id === currentUser.id) {
        return options.fn(this);
    }
    return options.inverse(this);
});

module.exports = {};


