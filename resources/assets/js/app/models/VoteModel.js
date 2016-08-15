var Backbone = require('backbone');
var _ = require('underscore');
var app = require('../app');
var BaseModel = require('../instances/Model');

module.exports = BaseModel.extend({
    urlRoot: '/votes',
    parse: function (response, options) {

        this._meta = response._meta;
        debugger;
        //if (!options.collection) {
        if (_.isObject(response.data)) {
            return response.data;
        }
        else {
            return response;
        }
    }
});