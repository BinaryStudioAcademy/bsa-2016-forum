var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var topicCategoryItem = require('./topicCategoryItem');

module.exports = Marionette.CollectionView.extend({
  childView: topicCategoryItem
});
