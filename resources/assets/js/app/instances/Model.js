var Backbone = require('backbone');
var _ = require('underscore');
var App = require('../instances/appInstance');

module.exports = Backbone.Collection.extend({

  _getRequestUrl: function () {
    return App.getBaseUrl() + (_.result(this, 'url') || _.result(this, 'urlRoot') || _.result(this.collection, 'url'));
  },

  sync: function (method, collection, options) {
    if (!options.url) {
      options.url = this._getRequestUrl(collection);
    }

    return Backbone.sync(method, collection, options);
  },
});
