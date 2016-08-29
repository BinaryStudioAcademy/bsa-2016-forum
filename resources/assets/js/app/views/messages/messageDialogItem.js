var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'messageDialogItem',
    ui: {
        delete: '.delete',
        edit: '.edit'
    },
    events: {
        'click @ui.delete' : 'clickedDeleteMessage',
        'click @ui.edit' : 'clickedEditMessage'
    },
    clickedDeleteMessage: function () {
        Radio.channel('messagesChannel').trigger('deleteMessage', this.model);
    },

    clickedEditMessage: function () {
        Radio.channel('messagesChannel').trigger('editMessage', this.model);
    },

    serializeData: function () {
        var direction = '';
        var with_user = {};
        var edit = '';
        var deleted = '';
        if(this.model.get('user_from_id') == this.options.currentUser.get('id')) {
            with_user = this.options.currentUser.toJSON();
            direction = 'from';
        } else {
            with_user = this.options.withUser;
            direction = 'to';
        }
        if(this.model.get('created_at') != this.model.get('updated_at')) {
            edit = 'Edit at';
        }
        
        if(this.model.get('deleted_at') != null) {
            deleted = 'deleted';
            edit = 'Removed at';
        }

        return {
            message: this.model.toJSON(),
            messageDirection: direction,
            edit_at: edit,
            user: with_user,
            user_name: with_user.first_name + " " + with_user.last_name,
            deleted: deleted
        }
    }
});