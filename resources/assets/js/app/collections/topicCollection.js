var Backbone = require('backbone');
var logger = require('../instances/logger');
var app = require('../instances/appInstance');

var topicCollection = function () {
  return Backbone.Collection.extend({

  });
};

module.exports = topicCollection;
