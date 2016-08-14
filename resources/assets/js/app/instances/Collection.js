var Backbone = require('backbone');
var _ = require('underscore');
var App = require('../instances/appInstance');

module.exports = Backbone.Collection.extend({

    _getRequestUrl: function () {
        return App.getBaseUrl() + _.result(this, 'url');
    },

    sync: function (method, collection, options) {
        if (!options.url) {
            options.url = this._getRequestUrl(collection);
        }

        return Backbone.sync(method, collection, options);
    },

    parse: function (response) {
        this._meta = response._meta;
        return response.data;
    }
});
