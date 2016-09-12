var _ = require('underscore');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var currentUser = require('../initializers/currentUser');
var app = require('../instances/appInstance');
var MessageLayout = require('../views/messages/messageLayout');
var MessageCollection = require('../collections/messageCollection');
var MessageModel = require('../models/MessageModel');
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

        messageCollection.listenTo(Radio.channel('messagesChannel'), 'saveEditedMessage', function (view) {
            var message = view.model;
            var text = view.ui.message.val();
            view.ui.save.html('Saving..');
            view.disableButton();
            message.parentUrl = _.result(currentUser, 'url');
            //add check on msg change
            message.save({message: text}, {
                success: function () {
                    view.$('.modal').modal('hide');
                },
                error: function () {
                    view.enableButton();
                    view.ui.save.html('Save');
                }
            });
        });

        var DialogView = new MessageDialogLayout({
            currentUser: currentUser,
            collection: messageCollection
        });

        DialogView.listenTo(Radio.channel('messagesChannel'),'sendMessage', function (view) {
            var message = new MessageModel ({
                message: view.ui.message.val(),
                user_from_id: currentUser.get('id'),
                user_to_id: messageCollection.getMeta().with_user.id,
                is_read: 0
            });
            view.ui.button.html('Sending..');
            view.ui.button.prop('disabled', true);
            message.parentUrl = _.result(currentUser, 'url');
            message.save(null, {
                success: function (model) {
                    view.ui.button.html('Send');
                    view.ui.button.prop('disabled', false);
                    view.ui.message.val('');
                    messageCollection.add(model);
                    Radio.channel('messagesChannel').trigger('newMessageScroll');
                },
                error: function () {
                    view.ui.button.html('ReSend');
                    view.ui.button.prop('disabled', false);
                }
            });
        });

        DialogView.listenTo(Radio.channel('messagesChannel'),'deleteMessage', function (message){
            var toRemove = new MessageModel({id: message.get('id')});
            message.parentUrl = _.result(currentUser, 'url');
            toRemove.parentUrl = _.result(currentUser, 'url');
            toRemove.destroy({
                success: function () {
                    message.fetch();
                }
            });
        });

        DialogView.listenTo(Radio.channel('messagesChannel'),'editMessage', function (message){
            var EditView = require('../views/messages/messageDialogEditItem');
            app.renderModal(new EditView({model: message}));
        });

        app.render(DialogView);
    }
});