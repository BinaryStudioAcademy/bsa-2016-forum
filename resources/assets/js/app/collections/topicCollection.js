var baseCollection = require('../instances/Collection');
var topicModel = require('../models/TopicModel');
var Backbone = require("backbone");
var PageableCollection = require("backbone.paginator");

module.exports = Backbone.PageableCollection.extend({
    //start add parent collection
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
    //END add parent collection
    initialize: function (options) {
        this.prototype = baseCollection;
        if (options && options.parentUrl) {
            this.parentUrl = options.parentUrl;
        }
    },

    //url: '/categories/:catId/topics',
    model: topicModel,

    // Any `state` or `queryParam` you override in a subclass will be merged with
    // the defaults in `Backbone.PageableCollection` 's prototype.
    state: {

        // You can use 0-based or 1-based indices, the default is 1-based.
        // You can set to 0-based by setting ``firstPage`` to 0.
        firstPage: 1,
        pageSize: null,

        // Set this to the initial page index if different from `firstPage`. Can
        // also be 0-based or 1-based.
        // currentPage: 2,

        // Required under server-mode
        //totalRecords: 200
    },

    // You can configure the mapping from a `Backbone.PageableCollection#state`
    // key to the query string parameters accepted by your server API.
    queryParams: {
        totalPages: null,
        totalRecords: null,
        sortKey: "sort",
        order: "direction",
        directions: {
            "-1": "asc",
            "1": "desc"
        }
    }
});

// module.exports = baseCollection.extend({
//     url: '/categories/:catId/topics',
//     model: topicModel,
//
//     initialize: function (options) {
//         if (options && options.parentUrl) {
//             this.parentUrl = options.parentUrl;
//         }
//     }
//
// });