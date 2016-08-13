var Marionette = require('backbone.marionette');

module.exports = Marionette.Object.extend({

    index: function () {
        var Users = require('../collections/userCollection');
        var UsersView = require('../views/users/userCollection');
        var users = new Users;

        users.fetch({
            success: function (items) {
                App.RootView.content.show(new UsersView({
                   collection: items
                }));
            }
        });

    }
});