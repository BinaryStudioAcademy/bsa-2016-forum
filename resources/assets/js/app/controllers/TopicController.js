var app = require('../instances/appInstance');
var Topics = require('../views/topics/topicCollection.js');
var Marionette = require('backbone.marionette');
var myTopicCollection = require('../collections/topicCollection');
var logger = require('../instances/logger');
var topics = require('../instances/mock').topics;
var Backbone = require('backbone');

module.exports = Marionette.Object.extend({

  index: function () {
    var topicCollection = myTopicCollection();

    //logger(collection);
    var collection = new topicCollection(topics);

    app.getInstance().RootView.content.show(new Topics({
      collection: collection,
    }));
  }
});