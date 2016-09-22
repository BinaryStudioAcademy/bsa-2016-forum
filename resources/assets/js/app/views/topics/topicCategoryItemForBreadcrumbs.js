var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'topicCategoryForBreadcrumbs',
    tagName: 'h3',

    modelEvents: {
        'change': 'render'
    }
});