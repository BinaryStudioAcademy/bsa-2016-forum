var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'vote-create-input-voteitem',
    className: 'form-group',
    ui: {
        name: '.js-item-name',
        error_name: '.js-error-field'
    },
    events: {
        'change @ui.name': function () {
            this.model.set('name', this.ui.name.val());
        }
    },
    modelEvents: {
        'invalid': function (model, errors) {
            this.ui.error_name.html('<span>' + errors['name'] + '</span>');
        },
        'saved': function () {
            var collection = this.model.collection;
            this.ui.error_name.empty();
            if (collection.itemsToSave == 0)
                collection.trigger('voteItemsSaved');
        }
    },
    initialize: function () {
        this.model.view = this;
    }
});