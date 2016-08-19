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
        app.render(new MessageDialogLayout({
            currentUser: currentUser,
            collection: messageCollection
        }).listenTo(Radio.channel('messagesChannel'),'sendMessage', function (ui) {
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
        }));
    }
});