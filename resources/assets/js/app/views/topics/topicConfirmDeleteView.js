var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'topicConfirmDelete',
    ui: {
        confirm: '.delete-confirm-btn',
        modal: '.modal'
    },

    events: {
        'click @ui.confirm': 'deleteTopic'
    },

    modelEvents: {
        'notFound': function (model, error) {
            this.ui.modal.modal('hide');
        }
    },

    deleteTopic: function () {
        var view = this;
        this.model.destroy({
            wait: true,
            success: function () {
                view.ui.modal.modal('hide');
                Backbone.history.navigate('topics', {trigger: true});
            }
        });
    },

    onRender: function () {
        var view = this;
        this.ui.modal.modal('show');
        this.ui.modal.on('hidden.bs.modal', function (e) {
            view.destroy();
        });
    }
});