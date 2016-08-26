var _ = require('underscore');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var currentUser = require('../initializers/currentUser');
var app = require('../instances/appInstance');
var MessageLayout = require('../views/messages/messageLayout');
var MessageCollection = require('../collections/messageCollection');
var MessageModel = require('../models/messageModel');
var MessageDialogLayout = require('../views/messages/messageDialogLayout');



module.exports = Marionette.Object.extend({
    index: function () {
        var messageCollection = new MessageCollection();
        messageCollection.parentUrl = _.result(currentUser, 'url');
        messageCollection.fetch();
        app.render(new MessageLayout({
            collection: messageCollection
        }));
    },
    show: function (id) {
        var messageCollection = new MessageCollection();
        messageCollection.parentUrl = _.result(currentUser, 'url');
        messageCollection.fetch({
            data: { with_user: id },
            success: function () {
                Radio.channel('messagesChannel').trigger('newMessageScroll');
            }
        });
        messageCollection.listenTo(Radio.channel('messagesChannel'), 'newMessage', function (message) {
            if(message.user_from_id == id) {
                messageCollection.add(new MessageModel(message));
                Radio.channel('messagesChannel').trigger('newMessageScroll');
            }
        });

        messageCollection.listenTo(Radio.channel('messagesChannel'), 'updatedMessage', function (message) {
            if(message.user_from_id == id) {
                messageCollection.set([new MessageModel(message)], {remove: false});
            }
        });

        messageCollection.listenTo(Radio.channel('messagesChannel'), 'saveEditedMessage', function (data) {
            var message = data.model;
            var text = data.view.ui.message.val();
            data.view.ui.save.html('Saving..');
            data.view.disableButton();
            message.parentUrl = _.result(currentUser, 'url');
            //add check on msg change
            message.save({message: text}, {
                success: function () {
                    data.view.$('.modal').modal('hide');
                },
                error: function () {
                    data.view.enableButton();
                    data.view.ui.save.html('Save');
                }
            });
        });

        var DialogView = new MessageDialogLayout({
            currentUser: currentUser,
            collection: messageCollection
        });

        DialogView.listenTo(Radio.channel('messagesChannel'),'sendMessage', function (ui) {
            var message = new MessageModel ({
                message: ui.message.val(),
                user_from_id: currentUser.get('id'),
                user_to_id: messageCollection.getMeta().with_user.id,
                is_read: 0
            });
            ui.button.html('Sending..');
            ui.button.prop('disabled', true);
            message.parentUrl = _.result(currentUser, 'url');
            message.save(null, {
                success: function (model) {
                    ui.button.html('Send');
                    ui.button.prop('disabled', false);
                    ui.message.val('');
                    messageCollection.add(model);
                    Radio.channel('messagesChannel').trigger('newMessageScroll');
                },
                error: function () {
                    ui.button.html('ReSend');
                    ui.button.prop('disabled', false);
                }
            });
        });

        DialogView.listenTo(Radio.channel('messagesChannel'),'deleteMessage', function (message){
            message.parentUrl = _.result(currentUser, 'url');
            message.destroy();
        });

        DialogView.listenTo(Radio.channel('messagesChannel'),'editMessage', function (message){
            var EditView = require('../views/messages/messageDialogEditItem');
            DialogView.editModal.show(new EditView({model: message}));
        });

        app.render(DialogView);
    }
});