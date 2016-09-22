var Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView.extend({
    template: 'topicCreateHeader',
    modelEvents: {
        'sync': 'render'
    }
});