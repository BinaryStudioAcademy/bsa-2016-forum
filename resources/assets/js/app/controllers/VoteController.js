var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var voteLayout = require('../views/votes/VoteLayout');
var voteCollection = require('../collections/VoteCollection');
var voteModel = require('../models/VoteModel');
var voteDetailView = require('../views/votes/VoteDetail');
var userModel=require('../models/');

module.exports = Marionette.Object.extend({
    index: function () {
        var voteCollection = new voteCollection();
        voteCollection.fetch();
        app.render(new voteLayout({collection: voteCollection}));
    },
    show: function (id) {
        var voteModel = new voteModel({id: id});
        voteModel.fetch({
            success: function () {
                app.render(new voteDetailView({model: voteModel}));
            }
        });
    }
});
