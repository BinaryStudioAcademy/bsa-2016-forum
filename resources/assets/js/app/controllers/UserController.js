var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');

module.exports = Marionette.Object.extend({

    index: function () {
        var Users = require('../collections/userCollection');
        var UsersView = require('../views/users/userCollection');
        var users = new Users();

        users.fetch();
        app.RootView.content.show(new UsersView({
            collection: users
        }));
    }
});