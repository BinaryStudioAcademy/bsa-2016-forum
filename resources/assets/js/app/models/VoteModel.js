var Backbone = require('backbone');
var _ = require('underscore');
var app = require('../app');
var BaseModel = require('../instances/Model');

module.exports = BaseModel.extend({
    urlRoot: '/votes',
    parse: function (response) {

        this.set('_meta', response._meta ? response._meta : (this.collection._meta ? this.collection._meta : []));
        //if (!options.collection) {
        if (_.isObject(response.data)) {
            //this.set('_meta', response._meta ? response._meta : []);
            return response.data;
        }
        else {
            //this.set('_meta', this.collection._meta ? this.collection._meta : []);
            return response;
        }
    }
});