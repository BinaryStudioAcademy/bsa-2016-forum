var Backbone = require('backbone');
var _ = require('underscore');
var App = require('../instances/appInstance');
var config = require('../config');

module.exports = Backbone.Collection.extend({

  _getRequestUrl: function () {
    return config.baseUrl;
  },

  sync: function (method, collection, options) {
    if (!options.url) {
      options.url = this._getRequestUrl(collection);
    }

    return Backbone.sync(method, collection, options);
  },
});
