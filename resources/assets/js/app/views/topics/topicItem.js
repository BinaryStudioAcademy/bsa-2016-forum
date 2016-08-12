var Marionette = require('backbone.marionette');

var topicItemView = Marionette.ItemView.extend({
  template: 'topicItem',
});

module.exports = topicItemView;