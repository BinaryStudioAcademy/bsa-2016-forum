var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'vote-create-voteitem',
    className: 'form-group',
    ui: {
        name: '.js-item-name',
        errors: '.js-errors'
    },
    events: {
        'change @ui.name': function () {
            this.model.set('name', this.ui.name.val());
        }
    },
    printErrors: function (errors) {
        this.ui.errors.empty();
        this.ui.errors.append('<span>' + errors.name + '</span>');
    },
    initialize: function () {
        this.model.view = this;
    }
});