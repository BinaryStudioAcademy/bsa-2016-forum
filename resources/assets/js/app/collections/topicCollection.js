var baseCollection = require('../instances/Collection');
var topicModel = require('../models/TopicModel');
var Backbone = require("backbone");
var PageableCollection = require("backbone.paginator");


module.exports = PageableCollection.extend({

    //from base collection START
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
    },
    //from base collection END

    model: topicModel,

    initialize: function (options) {
        if (options && options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    },

    state: {
        firstPage: 1
    },

    queryParams: {
        pageSize: null
    }

});