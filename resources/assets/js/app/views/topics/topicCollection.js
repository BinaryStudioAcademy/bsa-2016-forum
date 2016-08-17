var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var topicItem = require('./topicItem');

module.exports = Marionette.CollectionView.extend({
    childView: topicItem,
    className: 'container-fluid',

});

