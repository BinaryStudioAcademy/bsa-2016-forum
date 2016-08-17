var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var messageItem = require('./messageItem');

module.exports = Marionette.CollectionView.extend({
    childView: messageItem
});
