var Marionette = require('backbone.marionette');
var app = require('../instances/appInstance');
var voteLayout = require('../views/votes/MyVoteLayout');
var myVoteCollection = require('../collections/MyVoteCollection');
var myVoteModel = require('../models/MyVoteModel');
var myVoteDetailView = require('../views/votes/MyVoteDetail');

module.exports = Marionette.Object.extend({
    index: function () {
        var myVoteCollection = new myVoteCollection();
        myVoteCollection.fetch();
        app.render(new voteLayout({collection: myVoteCollection}));
    },
    show: function (id) {
        var myVoteModel = new myVoteModel({id: id});
        myVoteModel.fetch({
            success: function () {
                app.render(new myVoteDetailView({model: myVoteModel}));
            }
        });
    }
});

/**
 * Created by lyudmila on 18.08.16.
 */
