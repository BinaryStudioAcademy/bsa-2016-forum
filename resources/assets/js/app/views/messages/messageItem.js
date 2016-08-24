var Marionette = require('backbone.marionette');
var messageModel = require('../../models/MessageModel');

module.exports = Marionette.ItemView.extend({
    template: 'messageItem',
    serializeData: function () {
        return {
            model: this.model.toJSON(),
            user: this.options.user
        }
    }
});