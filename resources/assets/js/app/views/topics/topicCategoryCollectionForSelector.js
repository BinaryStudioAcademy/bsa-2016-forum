var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var topicCategoryItemForSelector = require('./topicCategoryItemForSelector');

module.exports = Marionette.CollectionView.extend({
  childView: topicCategoryItemForSelector,
  tagName: 'select'
});
