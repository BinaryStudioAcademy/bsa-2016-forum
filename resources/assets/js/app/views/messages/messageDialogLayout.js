var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var logger = require('../../instances/logger');
var messageDialogCollection = require('./messageDialogCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'messageDialogLayout',
    regions: {
        container: '#dialog-messages'
    },
    events: {
        'submit form': function (e) {
            e.preventDefault();
            Radio.channel('messagesChannel').trigger('sendMessage', this.ui.message[0].value);
            this.ui.message[0].value = '';
        }
    },
    ui: {
        message: '#messages-new-text'
    },
    onRender: function () {
        this.container.show(new messageDialogCollection({
            collection: this.collection,
            currentUser: this.options.currentUser
        }));
    }
});
