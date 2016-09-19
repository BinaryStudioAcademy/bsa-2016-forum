var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');
var Radio = require('backbone.radio');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    template: 'subscriptionConfirmDelete',
    ui: {
        confirm: '#unsubscribe-confirm-btn',
        modal: '.modal',
        errors: '.errors'
    },
    events: {
        'click @ui.confirm': 'unSubscribe'
    },

    modelEvents: {
        'notFound': function (model, error) {
            this.ui.errors.empty();
            this.ui.errors.html(error);
            Radio.channel('subscriptionChannel').trigger('unsubscribed');
        }
    },
    
    initialize: function () {

    },

    unSubscribe: function () {
        var view = this;
        this.model.destroy({
            success: function () {
                view.ui.modal.modal('hide');
                Radio.channel('subscriptionChannel').trigger('unsubscribed');
            }
        });

    },

    onRender: function () {
        var view = this;
        this.ui.modal.modal('show');
        this.ui.modal.on('hidden.bs.modal', function (e) {
            view.destroy();
        });
    },
        
    serializeData: function () {
        var title = "";
        var meta = this.options.meta;
        
        switch (this.model.get('subscription_type')) {
            case 'Topic':
                title = meta.name;
                break;
            case 'Vote':
                title = meta.title;
                break;
        }

        return {
            title: title
        };
    }
});