var Marionette = require('backbone.marionette');
var TagBehavior = require('../../behaviors/tagBehavior');

module.exports = Marionette.LayoutView.extend({
    template: 'topicCreateHeader',
    ui: {
        tagsInput: '.tags'
    },

    modelEvents: {
        'sync': 'render'
    },

    behaviors: [{
        behaviorClass: TagBehavior
    }],

    initialize: function (options) {
        this.tags = options.tags;
    }
});