var Marionette = require('backbone.marionette');
var notificationCollection = require('./notificationCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'notificationLayout',
    regions: {
        container: '#notification-container'
    },

    onRender: function () {
        this.container.show(new notificationCollection({
            collection: this.collection
        }));
    }
});