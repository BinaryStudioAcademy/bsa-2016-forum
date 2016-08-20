var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var baseCollection = require('../instances/Collection');

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
        // var usersVotesCollection = require('../collections/UsersVotesCollection');
        // var showUsersVotesView = require('../views/votes/ShowUsersVotesView');
        // alert('id='+id);
        // var usersVotes = new usersVotesCollection({url:'/users/'+id+'/votes'});
        
        var showUsersVotesView = require('../views/votes/ShowUsersVotesView');
        var usersVoteModel=require('../models/UsersVoteModel');
        var usersVotesCollection=baseCollection.extend({
            url: '/users/'+id+'/votes',
            model: usersVoteModel,
        });

        var usersVotes=new usersVotesCollection();

        usersVotes.fetch();

        app.render(new showUsersVotesView({
            collection: usersVotes
        }));
    }
});