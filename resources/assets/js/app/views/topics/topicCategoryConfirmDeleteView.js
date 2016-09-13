var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'topicCategoryConfirmDelete',
    ui: {
        confirm: '#delete-confirm-btn',
        modal: '.modal',
        errors: '.errors'
    },
    events: {
        'click @ui.confirm': 'deleteCategory'
    },

    modelEvents: {
        'notFound': function (model, error) {
            this.ui.modal.modal('hide');
        }
    },
    
    initialize: function () {
        
    },

    deleteCategory: function () {
        var view = this;
        this.model.destroy({
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