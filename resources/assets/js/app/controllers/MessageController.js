var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var MessageLayout = require('../views/messages/messageLayout');
var MessageCollection = require('../collections/messageCollection');
var MessageDialogLayout = require('../views/messages/messageDialogLayout');



module.exports = Marionette.Object.extend({
    index: function () {
        var messageCollection = new MessageCollection();
        messageCollection.parentUrl = '/users/2';
        messageCollection.fetch();
        app.render(new MessageLayout({
            collection: messageCollection
        }));
    },
    show: function (id) {
        var messageCollection = new MessageCollection();
        messageCollection.parentUrl = '/users/2';
        messageCollection.fetch({
            data: { with_user: id }
        });
        app.render(new MessageDialogLayout({
            collection: messageCollection
        }));
    }
});
