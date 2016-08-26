var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'messageDialogEditItem',
    ui: {
        message: '#edited-message',
        save: '#message-save'
    },
    events: {
        'click @ui.save' : 'clickedSaveEditMessage'
    },

    onRender: function () {
        var view = this;
        this.$('.modal').modal('show');
        this.$('.modal').on('hidden.bs.modal', function (e) {
            view.destroy();
        });
    },

    clickedSaveEditMessage: function () {
        Radio.channel('messagesChannel').trigger('saveEditedMessage', {
            model: this.model,
            view: this
        });
    },

    disableButton: function () {
        this.$('button').prop('disabled', true);
    },

    enableButton: function () {
        this.$('button').prop('disabled', false);
    },
    
    serializeData: function () {
        var edit = '';
        if(this.model.get('created_at') != this.model.get('updated_at')) {
            edit = 'Edit at';
        }

        return {
            message: this.model.toJSON(),
            edit_at: edit
        }
    }
});