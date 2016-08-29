var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var usersVotesCollection=require('../collections/userVotesCollection');
var showUsersVotesView = require('../views/votes/ShowUsersVotesView');

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

    showUserVotes: function(id) {
        var usersVotes=new usersVotesCollection();
        usersVotes.parentUrl='/users/'+id;

        usersVotes.fetch();

        app.render(new showUsersVotesView({
            collection: usersVotes
        }));
    }
});