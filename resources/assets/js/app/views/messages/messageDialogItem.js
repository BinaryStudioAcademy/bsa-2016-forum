var Marionette = require('backbone.marionette');
var messageModel = require('../../models/MessageModel');

module.exports = Marionette.ItemView.extend({
    template: 'messageDialogItem'
});