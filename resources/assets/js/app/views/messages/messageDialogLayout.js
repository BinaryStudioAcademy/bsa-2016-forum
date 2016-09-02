var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var logger = require('../../instances/logger');
var messageDialogCollection = require('./messageDialogCollection');
var $ = require('jquery');
var MessageDate = require('../../initializers/messageDateFormatting');

module.exports = Marionette.LayoutView.extend({
    template: 'messageDialogLayout',
    regions: {
        container: '#dialog-messages',
        editModal: '#edit-msg-modal'
    },
    events: {
        'submit @ui.form': function (e) {
            e.preventDefault();
            Radio.channel('messagesChannel').trigger('sendMessage', this.ui);
        }
    },
    ui: {
        message: '#messages-new-text',
        button: '#messages-new-submit',
        messageContainer: '#dialog-messages',
        form: '#message-new-form'
    },
    onRender: function () {
        this.container.show(new messageDialogCollection({
            collection: this.collection,
            currentUser: this.options.currentUser
        }));
    },
    onBeforeDestroy: function () {
        this.collection.stopListening();
    },
    onShow: function () {
        setInterval(function() {
            $('.messageDate').each(function() {
                var date = $(this).attr('realdate');
                $(this).html(MessageDate(date));
            });
        }, 10000);
    }
});
