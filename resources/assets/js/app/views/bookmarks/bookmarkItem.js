var Marionette = require('backbone.marionette');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    template: 'bookmarkItem',
    tagName: 'div',

    ui: {
        bookmarkDelete: '.delete-button'
    },

    events: {
        'click @ui.bookmarkDelete': 'delete'
    },

    serializeData: function () {
        var meta = this.model.getMeta();

        if (!meta) return {};

        return {
            model: this.model.toJSON(),
            meta: {
                topic: meta.topic[this.model.attributes.id]
            }
        };
    },

    delete: function() {
        this.model.destroy();
    }
});