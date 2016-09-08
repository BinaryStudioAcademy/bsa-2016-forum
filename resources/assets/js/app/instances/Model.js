var Backbone = require('backbone');
var _ = require('underscore');
var App = require('../instances/appInstance');

module.exports = Backbone.Model.extend({
    parentUrl: null,

    getEntityUrl: function () {
        return (_.result(this, 'parentUrl') || _.result(this.collection, 'parentUrl') || '') + _.result(this, 'url');
    },

    getParentUrl: function () {
        return (_.result(this, 'parentUrl') || _.result(this.collection, 'parentUrl') || '');
    },

    _getRequestUrl: function () {
        return App.getBaseUrl() + this.getEntityUrl();
    },

    getMeta: function() {
        return (_.result(this, '_meta')) || _.result(this.collection, '_meta');
    },

    setMeta: function(meta) {
        this._meta = meta;
    },

    sync: function (method, model, options) {
        if (!options.url) {
            options.url = this._getRequestUrl(model);
        }
        
        if (!options.statusCode) options.statusCode = {};

        options.statusCode['400'] = function (xhr, textStatus, errorThrown) {
            if (xhr.responseJSON) {
                model.validationError = xhr.responseJSON;
                model.trigger('invalid', model, model.validationError);
            }
        };
        return Backbone.sync(method, model, options);
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
