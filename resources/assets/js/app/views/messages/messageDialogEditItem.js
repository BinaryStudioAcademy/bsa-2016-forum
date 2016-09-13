var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var dateHelper = require('../../helpers/dateHelper');
var Behavior = require('../../behaviors/send');

module.exports = Marionette.ItemView.extend({
    behaviors: {
        Behavior: {
            behaviorClass: Behavior,
            channel: 'messagesChannel',
            trigger: 'saveEditedMessage',
            textui: 'message'
        }
    },
    template: 'messageDialogEditItem',
    ui: {
        message: '#edited-message',
        save: '#message-save',
        form: '#message-edit-form',
        hotkeyCheckbox: '#hotkey-checkbox'
    },

    onRender: function () {
        var view = this;
        this.$('.modal').modal('show');
        this.$('.modal').on('hidden.bs.modal', function (e) {
            view.destroy();
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
            edit_at: edit,
            updatedDate: dateHelper.relativeDate(dateHelper.dateWithTimezone(this.model.get('updated_at'))),
            updatedStaticDate: dateHelper.dateWithTimezone(this.model.get('updated_at'))
        }
    }
});