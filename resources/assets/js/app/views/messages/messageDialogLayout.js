var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var messageDialogCollection = require('./messageDialogCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'messageDialogLayout',
    events: {
        'submit form': 'sendEvent'
    },
    regions: {
        container: '#dialog-messages'
    },
    onRender: function () {
        this.container.show(new messageDialogCollection({
            collection: this.collection,
            currentUser: this.options.currentUser
        }));
    },
    
    sendEvent: function (e) {
        e.preventDefault();
        this.options.sendMessageEvent(e.target);
    }
});