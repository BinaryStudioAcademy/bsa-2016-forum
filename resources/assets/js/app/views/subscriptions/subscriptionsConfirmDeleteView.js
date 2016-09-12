var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'subscriptionConfirmDelete',
    ui: {
        yes: '#subscribe-cancel-btn'
    },
    events: {
        'click @ui.yes': 'cancelSubscribe'
    },

    cancelSubscribe: function () {
        Radio.channel('subscriptionChannel').trigger('cancel', this.model);
        this.$('.modal').modal('hide');
    },

    onRender: function () {
        var view = this;
        this.$('.modal').modal('show');
        this.$('.modal').on('hidden.bs.modal', function (e) {
            view.destroy();
        });
    },
        
    serializeData: function () {
        var edit = '';
        if(this.model.get('created_at') != this.model.get('updated_at')) {
            edit = 'Edit at';
        }

        return {
            message: this.model.toJSON(),
            edit_at: edit,
            updatedDate: dateHelper.relativeDate(dateHelper.dateWithTimezone(this.model.get('updated_at'))),
            updatedStaticDate: dateHelper.dateWithTimezone(this.model.get('updated_at'))
        }
    }
});