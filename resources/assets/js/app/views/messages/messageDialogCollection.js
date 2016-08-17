var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var messageDialogItem = require('./messageDialogItem');

module.exports = Marionette.CollectionView.extend({
    childView: messageDialogItem
});
