var Backbone = require('backbone');
var _ = require('underscore');
var app = require('../app');
var BaseModel = require('../instances/Model');

module.exports = BaseModel.extend({
    urlRoot: '/votes'
});