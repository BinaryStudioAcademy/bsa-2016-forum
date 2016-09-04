var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var messageDialogCollection = require('./messageDialogCollection');
var Behavior = require('../../behaviors/send');

module.exports = Marionette.LayoutView.extend({
    behaviors: {
        Behavior: {
            behaviorClass: Behavior,
            channel: 'messagesChannel',
            trigger: 'sendMessage',
            textui: 'message'
        }
    },

    template: 'messageDialogLayout',
    regions: {
        container: '#dialog-messages',
        editModal: '#edit-msg-modal'
    },
    ui: {
        message: '#messages-new-text',
        button: '#messages-new-submit',
        messageContainer: '#dialog-messages',
        form: '#message-new-form',
        hotkeyCheckbox: '#hotkey-checkbox'
    },
    onRender: function () {
        this.container.show(new messageDialogCollection({
            collection: this.collection,
            currentUser: this.options.currentUser
        }));
    },
    onBeforeDestroy: function () {
        this.collection.stopListening();
    }
});
