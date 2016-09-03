var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'vote-create-voteitem',
    className: 'form-group',
    ui: {
        name: '.js-item-name',
        error_name: '.js-error-name'
    },
    events: {
        'change @ui.name': function () {
            this.model.set('name', this.ui.name.val());
        }
    },
    modelEvents: {
        'invalid': function (model, errors) {
            this.ui.error_name.html('<span>'+errors['name']+'</span>');
        },
        'saved': function () {
            this.ui.name.css('border', '1px solid green');
            this.ui.error_name.empty();
        }
    },
    initialize: function () {
        this.model.view = this;
    }
});