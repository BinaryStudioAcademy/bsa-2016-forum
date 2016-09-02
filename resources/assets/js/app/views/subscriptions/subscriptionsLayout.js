var Marionette = require('backbone.marionette');
var subscriptionCollection = require('./subscriptionsCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'subscriptionLayout',
    regions: {
        container: '#subscriptions'
    },

    onRender: function () {
        this.container.show(new subscriptionCollection({
            collection: this.collection
        }));
    }
});