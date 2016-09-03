var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'voteAnswerItem',
    className: 'vote-question-item',
    ui: {
        deleteButton: '.delete-button'
    },
    events: {
        'click @ui.deleteButton': function () {
            this.model.destroy();
        }
    },
    serializeData: function () {
        var meta = this.model.getMetaById();
        return {
            model: this.model.toJSON(),
            meta: meta
        };
    },
    remove: function () {
        this.$el.fadeOut();
    }
});