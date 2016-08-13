var baseModel = require('../instances/Model');
var Backbone = require('Backbone');

module.exports = baseModel.extend({
    urlRoot: '/topics'
});