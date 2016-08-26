var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var messageCollection = require('./messageCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'messageLayout',
    regions: {
        container: '#users-messages'
    },
    onRender: function () {
        this.container.show(new messageCollection({
            collection: this.collection
        }));
    }
});

