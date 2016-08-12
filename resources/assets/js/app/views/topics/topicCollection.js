var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var topicItemView = require('./topicItem');

module.exports = Marionette.CompositeView.extend({
    template: '#topicCollection.tpl',
    childViewContainer: "#posts",
    childView: topicItemView
});