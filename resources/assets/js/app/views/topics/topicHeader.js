var Marionette = require('backbone.marionette');
var _ = require('underscore');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'topicHeader',

    modelEvents: {
        'change': 'render'
    },

    serializeData: function () {
        var meta = this.model.getMeta();

        if (!meta) return {};

        var id = this.model.get('id');

        return {
            model: this.model.toJSON(),
            meta: {
                user: meta.user,
                likes: meta.likes,
                comments: meta.comments,
                tags: meta.tags
            }
        };
    }
});