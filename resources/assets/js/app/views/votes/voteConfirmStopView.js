var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'voteConfirmStop',
    ui: {
        confirm: '#stop-confirm-btn',
        modal: '.modal',
        errors: '.errors',
        summary: '#summary_modal'
    },
    events: {
        'click @ui.confirm': 'stopVote'
    },

    modelEvents: {
        'notFound': function (model, error) {
            this.ui.modal.modal('hide');
        }
    },

    initialize: function () {

    },

    stopVote: function () {
        var view = this;
        this.model.save({
            finished_at: dateHelper.getCurrentDate,
            summary: this.ui.summary.val(),
        }, {
            wait: true,
            success: function () {
                view.ui.modal.modal('hide');
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