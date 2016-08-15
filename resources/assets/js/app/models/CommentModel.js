var BaseModel = require('../instances/Model');
var _ = require('underscore');

module.exports = BaseModel.extend({
    urlRoot: '/comments',
    parse: function (response, options) {

        this._meta = response._meta;
        //if (!options.collection) {
        if (_.isObject(response.data)) {
            return response.data;
        }
        else {
            return response;
        }
    }
});