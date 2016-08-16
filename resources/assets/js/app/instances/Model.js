var Backbone = require('backbone');
var _ = require('underscore');
var App = require('../instances/appInstance');

module.exports = Backbone.Model.extend({
    parentUrl: null,

    getEntityUrl: function () {
        return (_.result(this, 'parentUrl') || '') + (_.result(this, 'url') || _.result(this, 'urlRoot'));
    },

    _getRequestUrl: function () {
        return App.getBaseUrl() + this.getEntityUrl();
    },

    sync: function (method, collection, options) {
        if (!options.url) {
            options.url = this._getRequestUrl(collection);
        }
        return Backbone.sync(method, collection, options);
    },

    getMeta: function () {
        return (_.result(this, '_meta') || _.result(this.collection, '_meta'));
    },

    parse: function (response, options) {
        if (!options.collection) {
            this._meta = response._meta;
            return response.data;
        } else {
            return response;
        }
    }

});
