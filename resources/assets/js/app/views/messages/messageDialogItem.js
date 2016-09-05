var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var App = require('../../instances/appInstance');

module.exports = Marionette.ItemView.extend({
    template: 'messageDialogItem',
    ui: {
        delete: '.delete',
        edit: '.edit',
        msgFrom: '.from'
    },
    events: {
        'click @ui.delete' : 'clickedDeleteMessage',
        'click @ui.edit' : 'clickedEditMessage',
        'mouseenter @ui.msgFrom' : 'mouseenterMsgFrom',
        'mouseleave @ui.msgFrom' : 'mouseleaveMsgFrom',
    },
    clickedDeleteMessage: function () {
        Radio.channel('messagesChannel').trigger('deleteMessage', this.model);
    },

    clickedEditMessage: function () {
        Radio.channel('messagesChannel').trigger('editMessage', this.model);
    },
    mouseenterMsgFrom: function (e) {
        var intervalMinutes = App.getConfigAttr('messageChangeOnDelay');
        var intervalMilliseconds = intervalMinutes * 60 * 1000;
        var now = new Date();
        var nowUTC = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds()
        );
        var currentTime = nowUTC.getTime();
        var createdAt = Date.parse(this.model.get('created_at'));
        if (!isNaN(createdAt)) {
            var passedMilliseconds = currentTime - createdAt;
            if (passedMilliseconds <= intervalMilliseconds) {
                $(e.currentTarget).find('.delete').css('visibility', 'visible');
                $(e.currentTarget).find('.edit').css('visibility', 'visible');
            }
        }
    },
    mouseleaveMsgFrom: function (e) {
        $(e.currentTarget).find('.delete').css('visibility', 'hidden');
        $(e.currentTarget).find('.edit').css('visibility', 'hidden');
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
            deleted: deleted
        }
    }
});