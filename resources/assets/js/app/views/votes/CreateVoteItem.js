var Marionette = require('backbone.marionette');
var currentUser = require('../../initializers/currentUser');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'vote-create-input-voteitem',
    className: 'form-group relative',
    ui: {
        name: '.js-item-name',
        deleteButton: '.delete-button',
        error_name: '.js-error-field'
    },
    events: {
        'change @ui.name': function () {
            var name = this.ui.name.val();
            if (name.trim().length > 0)
                this.model.set({name: name});
            if (this.model.get('vote_id') && this.model.hasChanged('name'))
                this.model.save();
        },
        'click @ui.deleteButton': function () {
            var collection = this.model.collection;
            this.model.destroy();
            collection.trigger('checkLengthCollection');
        }
    },
    modelEvents: {
        'invalid': function (model, errors) {
            this.ui.error_name.html('<span>' + errors['name'] + '</span>');
        },
        'sync': 'render'
    },
    initialize: function () {
        var self = this;
        this.model.view = this;
        this.model.set({user_id: currentUser.get('id')});
        if(this.getOption('parent').get('id'))
            this.model.set({vote_id: this.getOption('parent').get('id')});
        this.getOption('parent').on('change:id', function (model) {
            self.model.set({vote_id: model.get('id')});
        });
    },
    serializeData: function () {

        var meta = this.model.getMetaById() || {};

        return {
            model: this.model.toJSON(),
            meta: meta
        };
    },
    remove: function () {
        this.$el.fadeOut();
    },

    onRender: function() {
        this.listenTo(Radio.channel('votesChannel'), 'updateVoteItemDeleteButton', function (hideRemoveButton) {
            this.ui.deleteButton.prop('disabled', hideRemoveButton);
        });
    },

    onBeforeDestroy: function() {
        this.stopListening();
    }
});