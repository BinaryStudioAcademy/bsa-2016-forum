var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');

module.exports = Marionette.Object.extend({

    index: function () {
        var Users = require('../collections/userCollection');
        var UsersView = require('../views/users/userCollection');
        var users = new Users();

        users.fetch();

        app.render(new UsersView({
            collection: users
        }));
    },
    mytopics: function () {
        var topicCollection = new TopicCollection({ parentUrl: '/topics/' + 2 });
        topicCollection.fetch();
        console.log(topicCollection);
        app.render(new topicLayout({collection: topicCollection}));
    }
});