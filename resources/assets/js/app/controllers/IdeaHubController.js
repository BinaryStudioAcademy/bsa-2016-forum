var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');
var VoteModel = require('../models/VoteModel');
var ListVotes = require('../views/votes/ListVotes');


var Helper = require('../instances/Helper');

var Votes = require('../instances/Votes');
module.exports = Marionette.Object.extend({

    index: function () {

        Votes.reset();
        app.render(new ListVotes({vc: Votes}));
        Votes.fetch();
    }
    ,
    showVote: function (id) {
        Helper.showVote(id);
    }
});