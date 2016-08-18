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

    sync: function (method, model, options) {
        if (!options.url) {
            options.url = this._getRequestUrl(model);
        }
        options.error = function (xhr, status, error) {
            if (xhr.status == 400) {
                model.trigger('invalid', this, xhr.responseJSON)
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
