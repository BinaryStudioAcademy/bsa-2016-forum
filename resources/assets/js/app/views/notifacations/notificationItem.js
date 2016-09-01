var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'notificationItem',
    tagName: 'div',
    ui: {
        delete: '.delete-button'
    },
    events: {
        'click @ui.delete': 'delete'
    },
    serializeData: function () {
        var meta = this.model.getMeta();
        if (!meta) return {};
        return {
            model: this.model.toJSON(),
            meta: {
                topic: meta.topic[this.model.get('id')]
            }
        };
    },
    delete: function () {
        this.model.destroy();
    }
});