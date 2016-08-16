var Marionette = require('backbone.marionette');
var topicModel = require('../../models/TopicModel');

module.exports = Marionette.ItemView.extend({
    template: 'topicItem',
    className: 'row',
    tagName: 'div'
});