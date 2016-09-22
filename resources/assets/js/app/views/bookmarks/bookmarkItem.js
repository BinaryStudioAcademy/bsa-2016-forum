var Marionette = require('backbone.marionette');
var app = require('../../instances/appInstance');
var ConfirmDeleteView = require('./bookmarkConfirmDeleteView');

module.exports = Marionette.ItemView.extend({
    template: 'bookmarkItem',
    tagName: 'li',

    ui: {
        bookmarkDelete: '.delete-bookmark-button'
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
        app.renderModal(new ConfirmDeleteView({
            model: this.model,
            meta: this.model.getMeta().topic[this.model.get('id')],
            target_type: "Topic"
        }));
    }
});