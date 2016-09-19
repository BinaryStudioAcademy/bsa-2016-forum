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

    sync: function (method, model, options) {
        if (!options.url) {
            options.url = this._getRequestUrl(model);
        }

        if (!options.statusCode) options.statusCode = {};

        options.statusCode['400'] = function (xhr, textStatus, errorThrown) {
            if (xhr.responseJSON) {
                model.validationError = xhr.responseJSON;
                console.log(xhr.responseJSON);
                model.trigger('invalid', model, model.validationError);
            }
        };

        options.statusCode['403'] = function (xhr, textStatus, errorThrown) {
            model.trigger('notFound')
        };

        options.statusCode['404'] = function (xhr, textStatus, errorThrown) {
            model.trigger('notFound')
        };
        
        return Backbone.sync(method, model, options);
    },

    getMeta: function () {
        return (_.result(this, '_meta') || _.result(this.collection, '_meta'));
    },

    setMeta: function (meta) {
        this._meta = meta;
    },

    parse: function (response, options) {
        if (!options.collection) {
            this._meta = response._meta;
            return response.data;
        } else {
            return response;
        }
    },

    getMetaById: function () {
        if (this.getMeta())
            return this.getMeta()[this.get('id')] || this.getMeta() || null;
    },

    initialize: function (data, options) {
        if (options && options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    }
});
