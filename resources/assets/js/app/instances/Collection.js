var Backbone = require('backbone');
var _ = require('underscore');
var App = require('../instances/appInstance');

module.exports = Backbone.Collection.extend({
    parentUrl: null,

    getEntityUrl: function () {
        return (_.result(this, 'parentUrl') || '') + _.result(this, 'url');
    },

    _getRequestUrl: function () {
        return App.getBaseUrl() + this.getEntityUrl();
    },
    
    getMeta: function () {
        return (_.result(this, '_meta'));
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

