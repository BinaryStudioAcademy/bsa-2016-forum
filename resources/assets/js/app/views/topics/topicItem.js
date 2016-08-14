var Marionette = require('backbone.marionette');
var topicModel = require('../../Models/TopicModel');

module.exports = Marionette.ItemView.extend({
    template: 'topicItem',
    className: 'row post-item',
    tagName: 'div'
});