var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'voteAnswerItem',
    ui: {
        deleteButton: '.delete-button'
    },
    events: {
        'click @ui.deleteButton': function () {
            this.model.destroy();
        }
    },
    serializeData: function () {
        var tempmeta = this.model.getMeta()[this.model.get('id')];
        return {
            model: this.model.toJSON(),
            meta: tempmeta
        };
    },
    remove: function () {
        this.$el.fadeOut();
    }
});