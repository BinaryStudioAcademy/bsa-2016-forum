var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var UserCollection = require('../collections/userCollection');

module.exports = Marionette.Object.extend({

    index: function () {
        var Users = new UserCollection();
        var UsersView = require('../views/users/userCollection');
        var users = new Users();

        users.fetch();

        app.render(new UsersView({
            collection: users
        }));
    },
    mytopics: function () {
        var topicCollection = new UserCollection([], { parentUrl: '/topics/' + 2 });
        topicCollection.fetch();
        console.log(topicCollection);

    }
});