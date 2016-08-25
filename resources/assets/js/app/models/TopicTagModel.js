var baseModel = require('../instances/Model');
var logger = require('../instances/logger');

module.exports = baseModel.extend({
    urlRoot: '/tags',

    initialize: function(options) {

    },

    validate: function (attrs, options) {
    }
});
