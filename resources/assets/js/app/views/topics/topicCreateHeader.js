var Marionette = require('backbone.marionette');
var TagBehavior = require('../../behaviors/tagBehavior');
var _ = require('underscore');

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
    },

    serializeData: function () {
        this.model.set({'tags':(_.pluck(this.model.get('tags'), 'name')).join(',') });
        return {
            model: this.model.toJSON()
        }
    }
});