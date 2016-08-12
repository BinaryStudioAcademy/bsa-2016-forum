var Handlebars = require('handlebars');
var Templates = require('../templates')(Handlebars);
var Marionette = require('backbone.marionette');
var col = require('../collections/voteCollection');
var mock = require('../instances/Mock');

module.exports = {
    retisterHelpers: function () {
        Handlebars.registerHelper('showasd', function(context, options) {
        });
    }
};