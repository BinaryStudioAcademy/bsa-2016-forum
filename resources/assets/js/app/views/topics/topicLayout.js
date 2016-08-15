var Marionette = require('backbone.marionette');
var logger = require('../../instances/logger');
var topicCollection = require('./topicCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'topicLayout',
    regions: {
        container: '#posts'
    },
    onShow: function () {
        this.container.show(new topicCollection({
            collection: this.collection
        }));
    }
});
